// Verbatim Terms of Service text, sliced from the canonical source documents
// (the BulkLoads and BulkInsights ToS held by legal), not paraphrased; only
// whitespace and block structure were added for typographic hierarchy. Do not
// reword the prose. To update, replace the affected blocks here to match the
// source document exactly. The initial import was a one-off conversion, so
// there is no checked-in generator to re-run.

export type LegalBlock =
  | { readonly kind: "heading"; readonly text: string }
  | { readonly kind: "subheading"; readonly text: string }
  | { readonly kind: "paragraph"; readonly text: string };

export type LegalDocKey = "bulkinsights" | "bulkloads";

export type LegalDoc = {
  readonly key: LegalDocKey;
  readonly navLabel: string;
  readonly entity: string;
  readonly entityNote: string;
  readonly title: string;
  readonly lastUpdated: string;
  readonly summary: string;
  readonly blocks: ReadonlyArray<LegalBlock>;
};

export const legalDocs: Readonly<Record<LegalDocKey, LegalDoc>> = {
  "bulkinsights": {
    "key": "bulkinsights",
    "navLabel": "BulkInsights",
    "entity": "BulkInsights, LLC",
    "entityNote": "a Missouri limited liability company",
    "title": "BULKINSIGHTS, LLC — TERMS OF SERVICE",
    "lastUpdated": "4/7/2026",
    "summary": "The terms for the BulkInsights data and analytics product — the market intelligence platform this site is for.",
    "blocks": [
      {
        "kind": "heading",
        "text": "1. ACCEPTANCE OF TERMS"
      },
      {
        "kind": "paragraph",
        "text": "These Terms of Service (\"Terms\") govern your access to and use of the BulkInsights data analytics and insights platform, including the website, APIs, dashboards, reports, and all related services (collectively, the \"Platform\"), operated by BulkInsights, LLC (\"BulkInsights,\" \"we,\" \"us,\" or \"our\")."
      },
      {
        "kind": "paragraph",
        "text": "By creating an account, subscribing to a data product, accessing an API, or otherwise using the Platform, you (\"Subscriber,\" \"you,\" or \"your\") agree to be bound by these Terms. If you are accepting on behalf of a company or other legal entity, you represent that you have the authority to bind that entity."
      },
      {
        "kind": "paragraph",
        "text": "IF YOU DO NOT AGREE TO THESE TERMS, DO NOT ACCESS OR USE THE PLATFORM."
      },
      {
        "kind": "heading",
        "text": "2. DEFINITIONS"
      },
      {
        "kind": "paragraph",
        "text": "\"Affiliated Entities\" means BulkTMS, LLC, Smart Freight Funding, LLC (d/b/a Smart Freight Factoring), Bulk Loads Now, LLC (d/b/a BulkLoads), and any entity that directly or indirectly controls, is controlled by, or is under common control with BulkInsights."
      },
      {
        "kind": "paragraph",
        "text": "\"Aggregated Data\" means data that has been compiled from multiple sources, aggregated, and de-identified such that it does not identify any individual person, company, or transaction. Aggregated Data is the primary product of the BulkInsights Platform."
      },
      {
        "kind": "paragraph",
        "text": "\"API\" means the application programming interfaces provided by BulkInsights for programmatic access to Data Products."
      },
      {
        "kind": "paragraph",
        "text": "\"Data Products\" means the analytics, reports, dashboards, data feeds, indices, benchmarks, and other information products made available through the Platform."
      },
      {
        "kind": "paragraph",
        "text": "\"Derived Works\" means any analysis, report, model, visualization, or other work created by Subscriber using Data Products as an input or basis."
      },
      {
        "kind": "paragraph",
        "text": "\"Source Data\" means the raw, underlying data collected by Affiliated Entities from their respective platforms and services, before aggregation and de-identification by BulkInsights."
      },
      {
        "kind": "paragraph",
        "text": "\"Subscriber Data\" means information submitted by Subscriber through the Platform, including account information and query/usage data."
      },
      {
        "kind": "heading",
        "text": "3. THE PLATFORM"
      },
      {
        "kind": "subheading",
        "text": "3.1 Description"
      },
      {
        "kind": "paragraph",
        "text": "BulkInsights provides data analytics, market intelligence, and insights derived from the bulk freight transportation ecosystem. Data Products are created by aggregating and de-identifying operational data from Affiliated Entities' platforms, including BulkLoads (load board marketplace) and Smart Freight Factoring (freight factoring), as well as from publicly available sources."
      },
      {
        "kind": "subheading",
        "text": "3.2 Data Sources"
      },
      {
        "kind": "paragraph",
        "text": "Subscriber acknowledges that Data Products are derived from:"
      },
      {
        "kind": "paragraph",
        "text": "(a) Aggregated platform data from Affiliated Entities' users, which has been de-identified so that no individual user, shipper, carrier, or transaction can be identified"
      },
      {
        "kind": "paragraph",
        "text": "(b) Publicly available data from government sources (e.g., USDA, FMCSA, DOT) and industry publications"
      },
      {
        "kind": "paragraph",
        "text": "(c) Third-party data licensed from external providers, subject to applicable terms"
      },
      {
        "kind": "paragraph",
        "text": "(d) BulkInsights proprietary models that generate derived metrics, forecasts, and indices"
      },
      {
        "kind": "paragraph",
        "text": "Nothing in this section transfers ownership of original Content from the user to BulkInsights or affiliated entities."
      },
      {
        "kind": "subheading",
        "text": "3.3 De-Identification Standards"
      },
      {
        "kind": "paragraph",
        "text": "All data derived from Affiliated Entity platforms undergoes de-identification before inclusion in Data Products. BulkInsights's de-identification process ensures that:"
      },
      {
        "kind": "paragraph",
        "text": "(a) No individual person, company, carrier, or shipper can be identified from the Data Products"
      },
      {
        "kind": "paragraph",
        "text": "(b) Transaction-level data is aggregated to a minimum threshold before inclusion"
      },
      {
        "kind": "paragraph",
        "text": "(c) Geographic data is aggregated to regional or lane-level granularity"
      },
      {
        "kind": "paragraph",
        "text": "(d) Rate data is presented as lows, averages, and highs"
      },
      {
        "kind": "heading",
        "text": "4. SUBSCRIPTION AND ACCESS"
      },
      {
        "kind": "subheading",
        "text": "4.1 Account Registration"
      },
      {
        "kind": "paragraph",
        "text": "To access the Platform, you must create an account and provide accurate and complete information."
      },
      {
        "kind": "subheading",
        "text": "4.2 Subscription Plans"
      },
      {
        "kind": "paragraph",
        "text": "Access to Data Products is available through subscription plans as described on the Platform or in a separate Order Form. Subscription plans may vary in scope, access level, API limits, and pricing."
      },
      {
        "kind": "subheading",
        "text": "4.3 Sublicense Grant"
      },
      {
        "kind": "paragraph",
        "text": "By submitting or uploading Content to the Services, you grant BulkInsights, LLC a worldwide, perpetual, irrevocable, transferable, sublicensable, royalty-free license to host, store, reproduce, modify, adapt, display, publish, distribute, and create derivative works from such Content as reasonably necessary to operate, maintain, improve, promote, and commercialize the Services and related products and technologies."
      },
      {
        "kind": "paragraph",
        "text": "BulkInsights, LLC may aggregate, anonymize, de-identify, combine, or otherwise process Content and Service Data to create statistical, analytical, or other datasets (“Derived Data”). Such Derived Data does not identify individual users where reasonably practicable and may be used, licensed, transferred, sold, or otherwise commercialized by BulkInsights, LLC for any lawful business purpose."
      },
      {
        "kind": "paragraph",
        "text": "Nothing in this section transfers ownership of original Content from the user to BulkInsights, LLC."
      },
      {
        "kind": "subheading",
        "text": "4.4 API Access"
      },
      {
        "kind": "paragraph",
        "text": "If your subscription includes API access, your use of the API is subject to the API rate limits, usage guidelines, and technical documentation provided by BulkInsights."
      },
      {
        "kind": "heading",
        "text": "5. USE RESTRICTIONS"
      },
      {
        "kind": "paragraph",
        "text": "You shall not:"
      },
      {
        "kind": "paragraph",
        "text": "(a) Redistribute, resell, sublicense, or otherwise make Data Products available to any third party"
      },
      {
        "kind": "paragraph",
        "text": "(b) Attempt to re-identify, de-anonymize, or reverse-engineer the identity of any individual, company, or transaction from the Data Products"
      },
      {
        "kind": "paragraph",
        "text": "(c) Represent Data Products as your own original data or remove BulkInsights attribution"
      },
      {
        "kind": "paragraph",
        "text": "(d) Use Data Products for any unlawful purpose or in violation of any applicable law"
      },
      {
        "kind": "paragraph",
        "text": "(e) Use Data Products to engage in price-fixing, market manipulation, or any anti-competitive conduct"
      },
      {
        "kind": "paragraph",
        "text": "(f) Scrape, crawl, or use automated means to access the Platform beyond authorized API access"
      },
      {
        "kind": "paragraph",
        "text": "(g) Share account credentials with unauthorized users"
      },
      {
        "kind": "paragraph",
        "text": "(h) Use Data Products to directly compete with BulkInsights or Affiliated Entities without prior written consent"
      },
      {
        "kind": "paragraph",
        "text": "(i) Exceed API rate limits or usage quotas specified in your subscription plan"
      },
      {
        "kind": "heading",
        "text": "6. INTELLECTUAL PROPERTY"
      },
      {
        "kind": "subheading",
        "text": "6.1 BulkInsights IP"
      },
      {
        "kind": "paragraph",
        "text": "All Data Products, the Platform, and related intellectual property are owned by BulkInsights (or, with respect to Source Data, by the applicable Affiliated Entity). Nothing in these Terms grants you any ownership interest."
      },
      {
        "kind": "subheading",
        "text": "6.2 Feedback"
      },
      {
        "kind": "paragraph",
        "text": "Any feedback you provide may be used by BulkInsights without restriction or compensation."
      },
      {
        "kind": "heading",
        "text": "7. FEES AND PAYMENT"
      },
      {
        "kind": "subheading",
        "text": "7.1 Subscription Fees"
      },
      {
        "kind": "paragraph",
        "text": "Fees are specified in the applicable subscription plan or Order Form. All fees are non-refundable except as expressly stated."
      },
      {
        "kind": "subheading",
        "text": "7.2 Payment Terms"
      },
      {
        "kind": "paragraph",
        "text": "Fees are due in accordance with the payment schedule specified in the subscription plan or Order Form. If a payment is missed or form of payment is denied, service will be frozen until made current."
      },
      {
        "kind": "subheading",
        "text": "7.3 Taxes"
      },
      {
        "kind": "paragraph",
        "text": "You are responsible for all applicable taxes or payment processing fees."
      },
      {
        "kind": "heading",
        "text": "8. DATA AND DISCLAIMERS"
      },
      {
        "kind": "subheading",
        "text": "8.1 Not Financial or Legal Advice"
      },
      {
        "kind": "paragraph",
        "text": "DATA PRODUCTS DO NOT CONSTITUTE FINANCIAL, LEGAL, INVESTMENT, OR BUSINESS ADVICE. YOU ARE SOLELY RESPONSIBLE FOR YOUR DECISIONS BASED ON DATA PRODUCTS."
      },
      {
        "kind": "subheading",
        "text": "8.2 Disclaimer of Warranties"
      },
      {
        "kind": "paragraph",
        "text": "THE PLATFORM AND DATA PRODUCTS ARE PROVIDED \"AS IS\" AND \"AS AVAILABLE.\" BULKINSIGHTS DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT."
      },
      {
        "kind": "subheading",
        "text": "8.3 Data Latency"
      },
      {
        "kind": "paragraph",
        "text": "Data Products may reflect data with inherent latency."
      },
      {
        "kind": "heading",
        "text": "9. LIMITATION OF LIABILITY"
      },
      {
        "kind": "paragraph",
        "text": "IN NO EVENT SHALL BULKINSIGHTS OR ITS AFFILIATED ENTITIES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES. BULKINSIGHTS'S TOTAL LIABILITY SHALL NOT EXCEED THE FEES PAID BY SUBSCRIBER DURING THE TWELVE (12) MONTHS PRECEDING THE CLAIM."
      },
      {
        "kind": "heading",
        "text": "10. INDEMNIFICATION"
      },
      {
        "kind": "paragraph",
        "text": "You agree to indemnify and hold harmless BulkInsights and its Affiliated Entities from claims arising from: (a) your use of the Platform or Data Products; (b) your Derived Works; (c) your violation of these Terms; (d) your violation of applicable law; or (e) any allegation that your use of Data Products infringes the rights of a third party."
      },
      {
        "kind": "heading",
        "text": "11. CONFIDENTIALITY"
      },
      {
        "kind": "subheading",
        "text": "11.1 Confidential Information"
      },
      {
        "kind": "paragraph",
        "text": "Each party may receive Confidential Information from the other. Confidential Information shall be protected with commercially reasonable measures and shall not be disclosed except as necessary to perform under these Terms."
      },
      {
        "kind": "subheading",
        "text": "11.2 Exclusions"
      },
      {
        "kind": "paragraph",
        "text": "Confidential Information does not include information that is: (a) publicly available; (b) known to the recipient prior to disclosure; (c) rightfully received from a third party; or (d) independently developed."
      },
      {
        "kind": "subheading",
        "text": "11.3 Data Products"
      },
      {
        "kind": "paragraph",
        "text": "For the avoidance of doubt, Data Products themselves are not Confidential Information of BulkInsights (as they are intended for Subscriber's use), but the pricing, methodologies, algorithms, and models used to create Data Products are BulkInsights's Confidential Information."
      },
      {
        "kind": "heading",
        "text": "12. TERM AND TERMINATION"
      },
      {
        "kind": "subheading",
        "text": "12.1 Subscription Term"
      },
      {
        "kind": "paragraph",
        "text": "The subscription term is specified in the applicable plan or Order Form. Subscriptions automatically renew for successive terms unless either party provides thirty (30) days written notice of non-renewal."
      },
      {
        "kind": "subheading",
        "text": "12.2 Termination for Cause"
      },
      {
        "kind": "paragraph",
        "text": "Either party may terminate for material breach with thirty (30) days written notice and opportunity to cure."
      },
      {
        "kind": "subheading",
        "text": "12.3 Termination by BulkInsights"
      },
      {
        "kind": "paragraph",
        "text": "BulkInsights may terminate or suspend access immediately if: (a) Subscriber attempts to re-identify data; (b) Subscriber redistributes Data Products in violation of these Terms; or (c) Subscriber fails to pay fees when due."
      },
      {
        "kind": "subheading",
        "text": "12.4 Effect of Termination"
      },
      {
        "kind": "paragraph",
        "text": "Upon termination: (a) Subscriber's access to the Platform ceases; (b) Subscriber shall cease using Data Products, (c) Subscriber shall delete or return any cached or stored Data Products; and (d) Sections 5, 6, 7, 8, 9, 10, 11, 12, and 13 survive termination."
      },
      {
        "kind": "heading",
        "text": "13. GENERAL PROVISIONS"
      },
      {
        "kind": "subheading",
        "text": "13.1 Governing Law"
      },
      {
        "kind": "paragraph",
        "text": "These Terms are governed by the laws of the State of Missouri, without giving effect to conflict of law provisions."
      },
      {
        "kind": "subheading",
        "text": "13.2 Jurisdiction"
      },
      {
        "kind": "paragraph",
        "text": "Exclusive jurisdiction in the federal or state courts located in Springfield, Greene County, Missouri."
      },
      {
        "kind": "subheading",
        "text": "13.3 Entire Agreement"
      },
      {
        "kind": "paragraph",
        "text": "These Terms, together with any Order Form and the Privacy Policy, constitute the entire agreement."
      },
      {
        "kind": "subheading",
        "text": "13.4 Amendment"
      },
      {
        "kind": "paragraph",
        "text": "BulkInsights may modify these Terms. Material changes will be communicated in writing. Continued use constitutes acceptance."
      },
      {
        "kind": "subheading",
        "text": "13.5 Severability"
      },
      {
        "kind": "paragraph",
        "text": "Invalid provisions do not affect remaining provisions."
      },
      {
        "kind": "subheading",
        "text": "13.6 Assignment"
      },
      {
        "kind": "paragraph",
        "text": "Subscriber may not assign without consent. BulkInsights may assign to Affiliated Entities or successors."
      },
      {
        "kind": "subheading",
        "text": "13.7 Force Majeure"
      },
      {
        "kind": "paragraph",
        "text": "BulkInsights is not liable for failure caused by circumstances beyond its reasonable control."
      },
      {
        "kind": "subheading",
        "text": "13.8 No Waiver"
      },
      {
        "kind": "paragraph",
        "text": "Failure to enforce any provision does not constitute a waiver."
      },
      {
        "kind": "heading",
        "text": "14. CONTACT"
      },
      {
        "kind": "paragraph",
        "text": "BulkInsights, LLC"
      },
      {
        "kind": "paragraph",
        "text": "1340 E Woodhurst Dr"
      },
      {
        "kind": "paragraph",
        "text": "STE B"
      },
      {
        "kind": "paragraph",
        "text": "Springfield, MO 65804"
      }
    ]
  },
  "bulkloads": {
    "key": "bulkloads",
    "navLabel": "BulkLoads",
    "entity": "Bulk Loads Now, LLC",
    "entityNote": "operator of BulkLoads.com",
    "title": "BulkLoads.com Terms of Service",
    "lastUpdated": "February 20th, 2026",
    "summary": "The platform account terms for BulkLoads.com — the account you sign in with to reach BulkInsights.",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "Welcome to the BulkLoads.com website (the “Website”) and/or mobile applications (the “Apps”) provided to you by Bulk Loads Now, LLC (“BulkLoads.com”, “we”, “us”, “our”). The Website, the Apps, and other features of the Service (as hereinafter defined) were created in order to provide you a much easier way to find loads and move more freight. These BulkLoads.com terms of service (the “Terms of Service”) govern your access to and use of the Service, including any content, functionality or any other feature of the Service, whether as a guest or registered user."
      },
      {
        "kind": "heading",
        "text": "ACCEPTANCE OF TERMS OF SERVICE"
      },
      {
        "kind": "paragraph",
        "text": "BulkLoads.com provides the Service to you, subject to the following Terms of Service and our privacy policy found at https://www.bulkloads.com/sign_up/privacy_policy/, incorporated herein by reference, (the “Privacy Policy”). Your use of the Website, the Apps, application programming interfaces (“APIs”) or other feature of the Service constitutes your agreement to be bound by all terms, conditions and notices contained in these Terms of Service. IF YOU DO NOT AGREE TO BE FULLY BOUND BY ALL OF THESE TERMS OF SERVICE, DO NOT ACCESS THE SITE, THE APPS AND DO NOT USE THE SERVICE. You should read all the Terms of Service carefully as they constitute a legally binding agreement between you and BulkLoads.com."
      },
      {
        "kind": "heading",
        "text": "CHANGES TO TERMS OF SERVICE"
      },
      {
        "kind": "paragraph",
        "text": "BulkLoads.com may update the Terms of Service to reflect changes in the Service and customer feedback. All changes are effective immediately when we post them, and apply to all access to and use of the Service thereafter. However, any changes to the dispute resolution provisions set out in these Terms of Service will not apply to any disputes for which the parties have actual notice on or before the date the change is posted on the Website and/or the Apps. Your continued use of the Service following the posting of revised Terms of Service means that you accept and agree to the changes. You are expected to review this page from time to time so you are aware of any changes, as they are binding on you."
      },
      {
        "kind": "heading",
        "text": "DESCRIPTION OF SERVICE"
      },
      {
        "kind": "paragraph",
        "text": "BulkLoads.com currently provides North American (USA and Canada) users with an online freight matching service which allows users to post and search for available loads and trucks and use any other freely offered services integrated within the Website and the Apps, in addition to any related services, modules, functions, software or platforms (all of the foregoing, including the Website and the Apps, the “Service”). You also understand and agree that the Service may include certain communications from BulkLoads.com, such as service announcements, administrative messages, and that these communications are considered part of the Service, and that you will not be able to opt out of receiving them. Unless explicitly stated otherwise, any new features that augment or enhance the current Service, including the release of new BulkLoads.com properties, shall be subject to these Terms of Service. You understand and agree that the Service is provided “AS-IS” and that BulkLoads.com assumes no responsibility for the timeliness, deletion, misdelivery or failure to store any user communications or personalization settings. You are responsible for obtaining access to the Service and that access may involve third-party fees (such as Internet service provider or airtime charges). In addition, you must provide and are responsible for all equipment necessary to access the Service."
      },
      {
        "kind": "heading",
        "text": "SMS/TEXT MESSAGING TERMS"
      },
      {
        "kind": "paragraph",
        "text": "By opting in to SMS communications from BulkLoads.com, you agree to the following terms:"
      },
      {
        "kind": "paragraph",
        "text": "Program Description: BulkLoads.com may send you SMS/MMS text messages related to your account and use of our services, including but not limited to: load notifications, dispatch communications, delivery and pickup updates, account alerts, and service announcements."
      },
      {
        "kind": "paragraph",
        "text": "Opt-In: You may opt in to receive SMS messages from BulkLoads.com by checking the SMS consent checkbox during account registration at https://www.bulkloads.com/sign_up/create_account/ or by enabling SMS messaging within your account settings. Opting in to SMS is not a condition of purchasing any goods or services from BulkLoads.com."
      },
      {
        "kind": "paragraph",
        "text": "Message Frequency: Message frequency varies based on your account activity and notification preferences."
      },
      {
        "kind": "paragraph",
        "text": "Message and Data Rates: Message and data rates may apply. Please contact your wireless carrier for details about your messaging plan."
      },
      {
        "kind": "paragraph",
        "text": "Opt-Out: You may opt out of receiving SMS messages at any time by replying STOP to any message you receive from us. After opting out, you will receive a one-time confirmation message. You will no longer receive SMS messages from BulkLoads.com unless you re-opt in."
      },
      {
        "kind": "paragraph",
        "text": "Help: For help or questions about our SMS program, reply HELP to any message or contact us at support@bulkloads.com or 1-800-518-9240."
      },
      {
        "kind": "paragraph",
        "text": "Carriers Supported: SMS messaging is supported on all major US carriers."
      },
      {
        "kind": "paragraph",
        "text": "Privacy: Your mobile phone number and opt-in data will not be shared with or sold to third parties or affiliates for marketing or promotional purposes. See our Privacy Policy for additional information on how we handle your data."
      },
      {
        "kind": "heading",
        "text": "MODIFICATIONS TO SERVICE"
      },
      {
        "kind": "paragraph",
        "text": "BulkLoads.com reserves the right at any time and from time to time to modify, temporarily or permanently, the Service (or any part thereof) with or without notice. We may also impose limits or restrictions on certain services, features or content or restrict your access to parts or all of our Website, the Apps, or the Service without notice. BulkLoads.com shall not be liable to you or any third party should BulkLoads.com exercise its right to modify the Service."
      },
      {
        "kind": "heading",
        "text": "INTERRUPTIONS, SUSPENSIONS, DISCONTINUANCE OF SERVICE"
      },
      {
        "kind": "paragraph",
        "text": "BulkLoads.com strives for continuous service uptime. However BulkLoads.com reserves the right to suspend or discontinue the Service with or without notice. All users of the Service acknowledge and accept that BulkLoads.com does not guarantee continued, uninterrupted, or secured access to the Service, and that that BulkLoads.com shall not be liable to you or to any third party for any interruption, suspension or discontinuance of the Service."
      },
      {
        "kind": "heading",
        "text": "USE OF WEBSITE OR APPS WHILE OPERATING A MOTOR VEHICLE"
      },
      {
        "kind": "paragraph",
        "text": "Using our Website or Apps for iOS, Android or other devices while driving a truck or other motor vehicle can cause serious injury, death, or property damage to you or others. DO NOT USE OUR APPS UNLESS YOUR VEHICLE IS STATIONARY AND PARKED. YOU ASSUME ALL RISKS AND RESPONSIBILITIES FOR YOUR USE OF THE WEBSITE AND APPS AT ALL TIMES."
      },
      {
        "kind": "heading",
        "text": "SUBSCRIBER REQUIREMENTS"
      },
      {
        "kind": "paragraph",
        "text": "Each person who creates a BulkLoads.com account, whether through the Website or the Apps (a “Subscriber”), makes the following representations and warranties:"
      },
      {
        "kind": "paragraph",
        "text": "1. Subscriber is no less than eighteen (18) years old;"
      },
      {
        "kind": "paragraph",
        "text": "2. Subscriber is or represents a bona fide owner-operator, carrier, shipper, freight broker, 3PL, freight forwarder or trucking industry consultant;"
      },
      {
        "kind": "paragraph",
        "text": "3. Subscriber’s access to BulkLoads.com is for commercial purposes only and is limited to finding loads and/or trucks through the use of our freight matching service and/or taking advantage of the other services offered by BulkLoads.com;"
      },
      {
        "kind": "paragraph",
        "text": "4. Subscriber’s commercial purpose in accessing and using BulkLoads.com is not to directly or indirectly compete with or gain competitive advantage in relation to BulkLoads.com;"
      },
      {
        "kind": "paragraph",
        "text": "5. Subscriber will not allow non-registered users to use subscriber’s password and/or username to access subscriber’s account without the express written consent of BulkLoads.com;"
      },
      {
        "kind": "paragraph",
        "text": "6. When submitting content to the BulkLoads.com’s Website or through the Apps, subscriber represents and warrants that the information is accurate, that Subscriber is authorized to submit the information, and that the information content, format and delivery method are appropriate."
      },
      {
        "kind": "paragraph",
        "text": "Should a user violate any provisions for Subscriber qualification, BulkLoads.com may terminate the Subscriber’s account without notice or warning, in addition to being subjected to any and all other legal remedies that may be available to BulkLoads.com under these Terms of Service, including but not limited to civil and/or criminal actions under state/provincial and/or federal law. Should BulkLoads.com be forced to institute legal action against subscriber to enforce these Terms of Service or for any other violations of state and/or federal law not specifically enunciated herein, subscriber expressly agrees to bear any and all costs associated with such action, including but not limited to attorney’s fees incurred by BulkLoads.com."
      },
      {
        "kind": "heading",
        "text": "MILEAGE"
      },
      {
        "kind": "paragraph",
        "text": "As an added benefit for users of the Service, BulkLoads.com displays the mileage of posted loads. This display of mileage is meant only to give users an estimate as to the distance between the starting and destination points of the load. BulkLoads.com makes no claim, representation, or warranty as to the accuracy of such mileage and in no way is the broker/shipper/carrier/trucker bound to such displayed mileage. The broker/shipper/carrier/trucker makes the final determination as to the mileage he/she will pay for."
      },
      {
        "kind": "heading",
        "text": "NO RESALE OR OUTSIDE USE OF SERVICE OR DATA"
      },
      {
        "kind": "paragraph",
        "text": "You agree not to reproduce, duplicate, scrape, copy, sell, trade, resell or exploit for any commercial purposes, any portion of the Service, use of the Service, or access to the Service."
      },
      {
        "kind": "heading",
        "text": "COMPLAINT HANDLING PROCEDURES"
      },
      {
        "kind": "paragraph",
        "text": "If a problem is attributed to Service, our objective is to resolve the problem promptly, equitably and amicably. All complaints must be sent by email to support@BulkLoads.com. Please include your name, subscription information, and complete description of your complaint. We strive to respond to all inquiries within 24 hours."
      },
      {
        "kind": "heading",
        "text": "TERMINATION"
      },
      {
        "kind": "paragraph",
        "text": "You agree that BulkLoads.com may, under certain circumstances and without prior notice, in its sole and absolute discretion, immediately terminate your BulkLoads.com account and access to the Service. Cause for such termination shall include, but not be limited to:"
      },
      {
        "kind": "paragraph",
        "text": "1. Breaches or violations of the Terms of Service or other incorporated agreements or guidelines;"
      },
      {
        "kind": "paragraph",
        "text": "2. Requests by law enforcement or other government agencies;"
      },
      {
        "kind": "paragraph",
        "text": "3. A request by you (self-initiated account deletions);"
      },
      {
        "kind": "paragraph",
        "text": "4. Discontinuance or material modification to the Service (or any part thereof);"
      },
      {
        "kind": "paragraph",
        "text": "5. Unexpected technical or security issues or problems; and"
      },
      {
        "kind": "paragraph",
        "text": "6. Extended periods of inactivity."
      },
      {
        "kind": "paragraph",
        "text": "Termination of your BulkLoads.com account includes:"
      },
      {
        "kind": "paragraph",
        "text": "1. Removal of access to all offerings within the Service;"
      },
      {
        "kind": "paragraph",
        "text": "2. Deletion of your password and all related information, files and content associated with or inside your account (or any part thereof); and"
      },
      {
        "kind": "paragraph",
        "text": "3. Barring further use of the Service."
      },
      {
        "kind": "paragraph",
        "text": "Further, you agree that all account terminations shall be made in BulkLoads.com’s sole and absolute discretion, and that BulkLoads.com shall not be liable to you or any third party for any termination of your account or access to the Service, including for claimed damages of any nature whatsoever resulting from such termination."
      },
      {
        "kind": "heading",
        "text": "CONTENT SUBMISSION"
      },
      {
        "kind": "paragraph",
        "text": "If you are submitting content to our Website or through the Apps, you represent and warrant that the information is consistent with the Terms of Service, accurate, that you are authorized to submit the information, and that the information content, format and delivery method is appropriate. By submitting content to our Website or through the Apps, you agree that BulkLoads.com, its affiliates, and assigns are licensed to use, reproduce, display, perform, adapt, modify, distribute, and promote the information in a manner we deem reasonable in our sole and absolute discretion. We have the right to (a) remove or refuse to post any user content for any or no reason in our sole discretion; (b) take any action with respect to any user content submission that we deem necessary or appropriate in our sole discretion, including if we believe that such user content violates the Terms of Service, infringes any intellectual property right or other right of any person or entity, threatens the personal safety of users of the Service or the public, or could create liability for BulkLoads.com; (c) disclose your identity or other information about you to any third party who claims that material posted by you violates their rights, including their intellectual property rights or their right to privacy; (d) take appropriate legal action, including without limitation, referral to law enforcement, for any illegal or unauthorized use of the Services; (e) terminate or suspend your access to all or part of the Services for any or no reason, including, without limitation, any violation of these Terms of Service.Without limiting the foregoing, we have the right to cooperate fully with any law enforcement authorities or court order requesting or directing us to disclose the identity or other information of anyone posting any materials on or through the Website. YOU WAIVE AND HOLD HARMLESS BULKLOADS.COM, ITS SUBSIDIARIES, AFFILIATES, MEMBERS, OFFICERS, AGENTS, CO-BRANDERS OR OTHER PARTNERS, AND EMPLOYEES FROM ANY CLAIMS RESULTING FROM ANY ACTION TAKEN BY ANY OF THE FOREGOING PARTIES DURING, OR TAKEN AS A CONSEQUENCE OF, INVESTIGATIONS BY LAW ENFORCEMENT AUTHORITIES.However, and notwithstanding anything seemingly to the contrary in these Terms of Service, we do not undertake to review all material before it is posted on the Website or the Apps, and cannot ensure prompt removal of objectionable material after it has been posted. Accordingly, we assume no liability for any action or inaction regarding transmissions, communications, or content provided by any user or third party. We have no liability or responsibility to anyone for performance or nonperformance of the activities described in this section."
      },
      {
        "kind": "heading",
        "text": "RELIANCE ON INFORMATION POSTED"
      },
      {
        "kind": "paragraph",
        "text": "The information presented on or through the Website or the Apps is made available solely for general information purposes. We do not warrant the accuracy, completeness, or usefulness of this information. Any reliance you place on such information is strictly at your own risk. We disclaim all liability and responsibility arising from any reliance placed on such materials by you or any other visitor to the Website or the Apps, or by anyone who may be informed of any of its contents.The Website and the Apps include content provided by third parties, including materials provided by other users. All statements and/or opinions expressed in these materials are solely the opinions and the responsibility of the person providing those materials. These materials do not necessarily reflect the opinion of the BulkLoads.com. We are not responsible, or liable to you or any third party, for the content or accuracy of any materials provided by any third parties."
      },
      {
        "kind": "heading",
        "text": "LINKS FROM THE WEBSITE OR THE APPS"
      },
      {
        "kind": "paragraph",
        "text": "If the Website or the Apps contain links to other sites and resources provided by third parties, these links are provided for your convenience only. We accept no responsibility for the content of other sites and resources provided by third parties, or for any loss or damage that may arise from your use of them. If you decide to access any of the third-party websites linked to this Website or the Apps, you do so entirely at your own risk and subject to the terms and conditions of use for such websites."
      },
      {
        "kind": "heading",
        "text": "TECHNOLOGY"
      },
      {
        "kind": "paragraph",
        "text": "You acknowledge that BulkLoads.com is an Internet-based business and that our Service is available through the Internet. To maintain an account with us, you will need to be able to access our Website or the Apps through the internet, which requires appropriate technology, including, without limitation, computer equipment or a mobile device, internet access, a web browser, and an e-mail account. You acknowledge and understand that you may incur certain operational costs in connection with your use of the Internet, such as monthly fees for a service provider, airtime charges, data charges, etc., for which you are solely responsible."
      },
      {
        "kind": "heading",
        "text": "PROPRIETARY RIGHTS"
      },
      {
        "kind": "paragraph",
        "text": "The content and software used on the Website and in the Apps, including, without limitation, layout and design, are the exclusive property of BulkLoads.com and are protected by copyrights, trademarks, service marks, patents, trade secrets, and other proprietary rights and laws. Users may not copy or retrieve data or other content from the Website or the Apps, either manually or through the use of automatic devices, for any purpose not provided in these Term of Service without the express written permission of BulkLoads.com. Users may not use meta tags or other hidden text utilizing the BulkLoads.com name, trademarks or other intellectual property, nor may a user use framing techniques to enclose any portion of the Website or the Apps, without the express written permission of BulkLoads.com. Unless expressly authorized in writing by BulkLoads.com, no user may reproduce, modify, distribute, transmit, republish, display, rent, sell, license, edit, or create derivative works from any of the content or other material available through the Service.You acknowledge and agree that the Service and any necessary software used in connection with the Service contain proprietary and confidential information that is protected by applicable intellectual property and other laws. You further acknowledge and agree that content contained in sponsor advertisements or information presented to you through the Service or advertisers is protected by copyrights, trademarks, service marks, patents or other proprietary rights and laws. Except as expressly authorized by BulkLoads.com or advertisers, you agree not to modify, rent, lease, loan, sell, distribute or create derivative works based on the Service or the software used in connection with the Service, in whole or in part."
      },
      {
        "kind": "heading",
        "text": "DISCLAIMER OF WARRANTIES"
      },
      {
        "kind": "paragraph",
        "text": "BulkLoads.com maintains an online freight matching service for use by carriers and shippers in order to communicate and do business with each other. BulkLoads.com does not handle funds, control the users of the Service in any way, or arrange for the movement of freight. All such arrangements are made by the users of the Website and the Apps, and any terms and conditions of such freight movement are solely between the carrier and the shipper.You understand that we cannot and do not guarantee or warrant that files available for downloading from the Internet, including the Website and the Apps, will be free of viruses or other destructive code. You are responsible for implementing sufficient procedures and checkpoints to satisfy your particular requirements for anti-virus protection and accuracy of data input and output, and for maintaining a means external to our site for any reconstruction of any lost data.TO THE FULLEST EXTENT PROVIDED BY LAW, WE WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE CAUSED BY A DISTRIBUTED DENIAL-OF-SERVICE ATTACK, VIRUSES, OR OTHER TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT YOUR COMPUTER EQUIPMENT, MOBILE DEVICES, COMPUTER PROGRAMS, DATA, OR OTHER PROPRIETARY MATERIAL DUE TO YOUR USE OF THE SERVICE.YOUR USE OF THE SERVICE IS AT YOUR OWN RISK. THE SERVICE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE BULKLOADS.COM NOR ANY PERSON ASSOCIATED WITH BULKLOADS.COM MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICE. WITHOUT LIMITING THE FOREGOING, NEITHER BULKLOADS.COM NOR ANYONE ASSOCIATED WITH BULKLOADS.COM REPRESENTS OR WARRANTS THAT THE WEBSITE, THE APPS, THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE OR THE APPS WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT THE WEBSITE, THE APPS, OR THE SERVER(S) THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT THE WEBSITE, THE APPS, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE OR THE APPS WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.TO THE FULLEST EXTENT PROVIDED BY LAW, BULKLOADS.COM DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE. IN NO EVENT SHALL BULKLOADS.COM BE LIABLE FOR LOST PROFITS OR ANY SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES (INCLUDING, WITHOUT LIMITATION, INDIRECT, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES FOR LOSS OF BUSINESS, LOSS OF PROFITS, BUSINESS INTERRUPTION, OR LOSS OF BUSINESS INFORMATION OR DATA) HOWEVER ARISING, INCLUDING NEGLIGENCE, ARISING OUT OF OR IN CONNECTION WITH THE SERVICES. THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW."
      },
      {
        "kind": "heading",
        "text": "LIMITATION ON LIABILITY"
      },
      {
        "kind": "paragraph",
        "text": "TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COLLECTIVE LIABILITY OF BULKLOADS.COM, ITS SUBSIDIARIES, AFFILIATES, MEMBERS, OFFICERS, AGENTS, CO-BRANDERS OR OTHER PARTNERS, AND EMPLOYEES, TO ANY PARTY (REGARDLESS OF THE FORM OF ACTION, WHETHER IN CONTRACT, TORT, OR OTHERWISE) EXCEED THE AMOUNT YOU HAVE PAID TO BULKLOADS.COM FOR THE SERVICE FOR THE MONTH DURING WHICH THE LIABILITY AROSE.THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW."
      },
      {
        "kind": "heading",
        "text": "INDEMNIFICATION"
      },
      {
        "kind": "paragraph",
        "text": "All users of the Website and the Apps agree to indemnify, defend, and hold BulkLoads.com, and its subsidiaries, affiliates, members, officers, agents, co-branders or other partners, and employees, harmless from any claim or demand, including reasonable attorneys’ fees, due to or arising out of your use of the Service, your connection to the Service, your violation of the Terms of Service, including, without limitation, your use of the Service while operating a motor vehicle, content you submit, post, transmit or make available through the Service, or your violation of applicable law or any civil claim, action, or litigation of any kind. BulkLoads.com functions solely as an intermediary for the trucking business. You may notify us of a violation of these Terms of Service by a user or fraud or misconduct on the part of a user, which BulkLoads.com may, but has no obligation, to investigate. You covenant and agree that you will not seek to join BulkLoads.com in any dispute with another user, whether or not that dispute results in any claim, action, or litigation. You agree to indemnify, defend, hold harmless and release BulkLoads.com, its subsidiaries, affiliates, members, officers, agents, co-branders or other partners, and employees from all claims, demands, and damages, actual, consequential, special, or punitive, of every kind and nature, known or unknown, in any way connected with such disputes between you and any other user or any third-party."
      },
      {
        "kind": "heading",
        "text": "NO THIRD PARTY BENEFICIARIES"
      },
      {
        "kind": "paragraph",
        "text": "You agree that, unless otherwise expressly provided in these Terms of Service, there shall be no third-party beneficiaries to these Terms of Service or the Service."
      },
      {
        "kind": "heading",
        "text": "GENERAL INFORMATION"
      },
      {
        "kind": "paragraph",
        "text": "The Terms of Service constitute the entire agreement between you and BulkLoads.com and govern your use of the Service, superseding any prior agreements (oral, written, or electronic) between you and BulkLoads.com. You also may be subject to additional terms and conditions that may apply when you use or purchase certain other BulkLoads.com services, affiliate services, third-party content or third-party software. You acknowledge that by registering with us, submitting information to us for posting or any other purposes, or by using the Service, including the Website and the Apps, no fiduciary, confidential, contractually implied, partnership, joint venture, employer-employee, agency, or other relationship is created between you and BulkLoads.com, other than the express contractual relationship set forth in these Terms of Service."
      },
      {
        "kind": "heading",
        "text": "GOVERNING LAW AND JURISDICTION"
      },
      {
        "kind": "paragraph",
        "text": "All matters relating to the Service and these Terms of Service, and any dispute or claim arising therefrom or related thereto (in each case, including non-contractual disputes or claims), shall be governed by and construed in accordance with the internal laws of the State of Missouri without giving effect to any choice or conflict of law provision or rule (whether of the State of Missouri or any other jurisdiction).Without limiting the applicability of the binding arbitration provision of these Terms of Service, in the event that any legal suit, action, or proceeding arising out of, or related to, the Service or these Terms of Service is instituted, the same shall be instituted exclusively in the federal courts of the United States or the courts of the State of Missouri, in each case located in the City of Springfield and County of Greene. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts."
      },
      {
        "kind": "heading",
        "text": "WAIVER OF JURY TRIAL"
      },
      {
        "kind": "paragraph",
        "text": "WITHOUT LIMITING THE APPLICABILITY OF THE BINDING ARBITRATION PROVISION OF THESE TERMS OF SERVICE, IN THE EVENT THAT ANY LEGAL SUIT, ACTION, OR PROCEEDING ARISING OUT OF, OR RELATED TO, THE SERVICE OR THESE TERMS OF SERVICE IS INSTITUTED, YOU AND BULKLOADS.COM IRREVOCABLY WAIVE ANY AND ALL RIGHT TO TRIAL BY JURY IN ANY LEGAL PROCEEDING ARISING OUT OF OR RELATING TO THE SERVICE OR THESE TERMS OF SERVICE."
      },
      {
        "kind": "heading",
        "text": "WAIVER OF CLASS ACTION"
      },
      {
        "kind": "paragraph",
        "text": "ANY PROCEEDINGS TO RESOLVE OR LITIGATE ANY DISPUTE ARISING OUT OF OR IN ANY WAY IN CONNECTION WITH THE SERVICE SHALL BE CONDUCTED SOLELY ON AN INDIVIDUAL BASIS. NO USER OF THE SERVICE SHALL SEEK TO HAVE ANY DISPUTE HEARD IN A CLASS, COLLECTIVE, OR JOINT ACTION, OR IN ANY OTHER PROCEEDING IN WHICH ANY PARTY ACTS OR PROPOSES TO ACT IN A REPRESENTATIVE CAPACITY. NO ARBITRATION OR PROCEEDING WILL BE COMBINED WITH ANOTHER WITHOUT THE PRIOR WRITTEN CONSENT OF ALL PARTIES TO ALL AFFECTED ARBITRATION OR PROCEEDINGS."
      },
      {
        "kind": "heading",
        "text": "BINDING ARBITRATION"
      },
      {
        "kind": "paragraph",
        "text": "ANY CONTROVERSY OR CLAIM ARISING OUT OF OR RELATING TO THE SERVICE OR THESE TERMS OF SERVICE SHALL BE SETTLED BY ARBITRATION PURSUANT TO THE COMMERCIAL ARBITRATION RULES OF THE AMERICAN ARBITRATION ASSOCIATION APPLYING THE LAW OF THE STATE OF MISSOURI WITHOUT GIVING EFFECT TO ANY CHOICE OR CONFLICT OF LAW PROVISION OR RULE (WHETHER OF THE STATE OF MISSOURI OR ANY OTHER JURISDICTION), AND JUDGMENT ON THE AWARD RENDERED BY THE ARBITRATOR(S) SHALL BE BINDING, CONCLUSIVE AND NON-APPEALABLE AND MAY BE ENTERED IN ANY COURT HAVING JURISDICTION THEREOF."
      },
      {
        "kind": "heading",
        "text": "LIMITATION ON TIME TO FILE CLAIMS"
      },
      {
        "kind": "paragraph",
        "text": "ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING TO THESE TERMS OF SERVICE OR THE SERVICE MUST BE COMMENCED WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES; OTHERWISE, SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED."
      },
      {
        "kind": "heading",
        "text": "WAIVER AND SEVERABILITY"
      },
      {
        "kind": "paragraph",
        "text": "No waiver by BulkLoads.com of any term or condition set out in these Terms of Service shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of BulkLoads.com to assert a right or provision under these Terms of Service shall not constitute a waiver of such right or provision.If any provision of these Terms of Service is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms of Service will continue in full force and effect."
      },
      {
        "kind": "heading",
        "text": "ASSIGNMENT"
      },
      {
        "kind": "paragraph",
        "text": "We reserve the right to assign our rights and obligations under these Terms of Service to one or more of our affiliates or to any successor entity by way of merger, consolidation, or otherwise. You are not entitled to assign your account registration or any of your rights or responsibilities under these Terms of Service without our express written consent. These Terms of Service will inure to the benefit of, be binding upon, and be enforceable by our successors and assigns."
      },
      {
        "kind": "heading",
        "text": "NOTICES"
      },
      {
        "kind": "paragraph",
        "text": "BulkLoads.com may provide you with notices, including those regarding changes to the Terms of Service, by email, regular mail, or postings on the Service, in BulkLoads.com’s sole discretion."
      },
      {
        "kind": "heading",
        "text": "HEADINGS FOR CONVENIENCE ONLY"
      },
      {
        "kind": "paragraph",
        "text": "The section headings in the Terms of Service are for convenience only and have no legal or contractual effect."
      },
      {
        "kind": "heading",
        "text": "VIOLATIONS"
      },
      {
        "kind": "paragraph",
        "text": "Please report any violations of the Terms of Service to us by email at support@bulkloads.com."
      }
    ]
  }
} as const;

export const legalDocList: ReadonlyArray<LegalDoc> = [legalDocs.bulkinsights, legalDocs.bulkloads];
