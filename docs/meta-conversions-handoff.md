# Meta conversions: what Insights needs to do

The marketing site (`bulkfreightinsights.com`) runs the Meta pixel and reports
the three things it can see. It **cannot** report the purchase, because the
purchase happens in Insights on another domain. Without the Insights half,
Meta can count clicks but not sales, which means campaigns cannot optimise for
revenue and the ad spend is guesswork.

This is the Insights half.

Pixel id: **1753815372362379**. The same one. Two pixels would split one funnel
across two learners and neither would optimise.

---

## 1. What already arrives at `/upgrade`

Every sign-up control on the marketing site hands off through
`https://insights.bulkloads.com/api/auth/sign-up?next=<encoded>`, and the
handoff forwards exactly one thing: `next`. Everything below is inside it.

| parameter | meaning |
|---|---|
| `package` | plan key, e.g. `pricing_analytics_procurement` |
| `seats` | seat count chosen on the marketing side |
| `org_type` | `carrier`, `broker` or `shipper`, when the page established one |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_id` | campaign attribution from the visitor's arrival |
| `gclid`, `fbclid` | ad click ids from the visitor's arrival |
| `ga_cid` | GA4 client id, so the GA session spans both domains |
| `fbp` | Meta browser id (`_fbp` cookie on the marketing domain) |
| `fbc` | Meta click id (`_fbc` cookie), present only when the visitor arrived from a Meta ad |

Attribution is also written onto the auth URL itself, but **only `next`
survives the WorkOS redirect**. Read campaign attribution from `next`.

**`fbp` and `fbc` are the exception: they are on the auth URL itself as well.**
`next` is only built when the page knows a plan or an org type, which is true
of the ICP and procurement pages and false of the home page, the header and
the footer. Since those are the busiest sign-up controls on the site, read
`fbp` and `fbc` from **both** places and prefer whichever is present:

```
/api/auth/sign-up?fbp=...&fbc=...&next=%2Fupgrade%3F...%26fbp%3D...%26fbc%3D...
```

A sign-up from the home page carries them on the auth URL and has no `next` at
all. Reading only from `next` would lose the majority of ad-driven signups.

`fbp` and `fbc` are first-party cookies on `bulkfreightinsights.com`. Insights
cannot read them, which is the entire reason they are forwarded. They are the
join key between an ad click and a sale.

---

## 2. Persist the identifiers at signup

**This is the requirement everything else depends on.**

When an account or subscription is created, store on that record:

- `fbp`, `fbc`
- `fbclid` (fallback, see below)
- `utm_*`, `gclid`, `ga_cid`
- the timestamp of first arrival

A purchase can complete days after the click, in a new session, on a different
device, or through a Stripe webhook with no browser attached. If these live
only in a cookie or a session, they are gone by the time the money event fires
and the sale is unattributable.

If `fbc` is absent but `fbclid` is present, reconstruct it:

```
fb.1.<unix_ms_when_the_click_landed>.<fbclid>
```

Use the timestamp of arrival, not of purchase.

---

## 3. Send `Purchase` through the Conversions API

Browser-side purchase tracking is not sufficient here, and this is not a
preference:

- iOS restrictions and ad blockers drop a large share of browser events
- a subscription that renews, or that is completed by a Stripe webhook, never
  had a browser event to begin with
- the most reliable trigger you have is the payment confirmation itself

**Fire `Purchase` server-side from the Stripe webhook**, not from a success
page. A success page is not reached by every paying customer.

Minimum payload:

```json
{
  "event_name": "Purchase",
  "event_time": 1792000000,
  "event_id": "<your order or subscription id>",
  "action_source": "website",
  "event_source_url": "https://insights.bulkloads.com/upgrade",
  "user_data": {
    "em": ["<sha256 of lowercased, trimmed email>"],
    "fbp": "<stored _fbp>",
    "fbc": "<stored _fbc>",
    "client_ip_address": "<from signup request>",
    "client_user_agent": "<from signup request>"
  },
  "custom_data": {
    "currency": "USD",
    "value": 299.00,
    "content_name": "pricing_analytics_procurement",
    "content_type": "product",
    "num_items": 1
  }
}
```

### `value` and `currency` are not optional

Without them Meta can only optimise for conversion **count**, so it will
happily chase the cheaper plan. With a broker at $299 and a shipper at $399
per user per month, that is a real misallocation.

**Decide once and be consistent:** is `value` the first payment, or expected
annual contract value? Both are defensible. Mixing them, or changing mid-flight,
corrupts the bidding model and the damage is not visible for weeks. Write the
decision down. If you send first-payment value, consider `predicted_ltv` as a
separate field rather than inflating `value`.

Multiply by `seats` where the plan is per-seat, and say in the code comment
whether `value` is net or gross of any discount.

### Deduplication

If you ever send `Purchase` from the browser **and** the server, both must carry
the **same `event_id`**. Otherwise Meta counts the sale twice, reported ROAS is
double the truth, and the optimiser learns from fiction.

Use the order or subscription id. Never a random value per call.

---

## 4. Advanced Matching

Include hashed customer data in `user_data` on every server event: email at
minimum, plus phone, first and last name, and country where you hold them.

- SHA-256, lowercased and trimmed first
- never send them in the clear
- these are B2B signups, so the match rate gain is large

`fbp` / `fbc` / IP / user agent are **not** hashed.

---

## 5. Earlier events worth sending

`Purchase` is the one that matters. These make the funnel legible and give the
optimiser mid-funnel signal while purchase volume is still low:

| event | when |
|---|---|
| `CompleteRegistration` | account created, before payment |
| `StartTrial` | if a trial exists |
| `Subscribe` | recurring subscription begins, with `value` and `currency` |

`PageView`, `InitiateCheckout` and `Lead` are already sent by the marketing
site. Do not send them again from Insights; you would double-count the top of
the funnel.

---

## 6. Business Manager setup

Not code, but the ads underperform badly without it:

1. **Verify both domains**: `bulkfreightinsights.com` and
   `insights.bulkloads.com`
2. **Aggregated Event Measurement**: rank `Purchase` as the top priority event.
   Unverified domains cannot set event priority, and iOS traffic degrades hard
   without it.
3. **Check the Events Manager event quality score** after the first week.
   It will tell you directly if `fbp`/`fbc` are missing or match rates are poor.

---

## 7. How to test before trusting it

1. Events Manager → **Test Events**, grab the test code
2. Run a real signup from a Meta ad click so `fbclid` is genuinely present
3. Confirm on the Insights side that `fbp` and `fbc` were **stored**, not just
   received
4. Complete a test payment, confirm one `Purchase` arrives with `value`,
   `currency`, and non-empty `fbp`/`fbc`
5. If browser and server both send, confirm Meta shows them **deduplicated**
   rather than as two purchases

Step 3 is the one that usually fails, and it fails silently.

---

## Division of labour

| | marketing site | Insights |
|---|---|---|
| `PageView` | done | — |
| `InitiateCheckout` | done | — |
| `Lead` | done | — |
| forward `fbp`/`fbc` | done | — |
| **persist** `fbp`/`fbc` | — | **required** |
| `CompleteRegistration` | — | recommended |
| `Purchase` via CAPI | — | **required** |
| deduplication `event_id` | — | required if also sending browser-side |
| Advanced Matching | — | recommended |
| domain verification, AEM | — | required (Business Manager) |

Questions about what the marketing site forwards: see `lib/brand.ts`
(`upgradeNext`) and `components/portal/AccountLink.tsx`.
