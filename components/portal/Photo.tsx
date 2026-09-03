import Image from "next/image";
import { media, type MediaKey } from "@/lib/media";
import { brand } from "@/lib/brand";

/**
 * Renders a still media slot. Until a real image is supplied in
 * lib/media.ts, this draws a labelled placeholder carrying the art
 * direction, so the layout holds its proportions and the brief stays
 * visible. Hero slots use HeroMedia instead, which can play video.
 */
export default function Photo({
  slot,
  className = "",
  priority = false,
  tone = "dark",
}: {
  slot: MediaKey;
  className?: string;
  priority?: boolean;
  tone?: "dark" | "light";
}) {
  const item = media[slot];
  const src = item.photo ?? item.poster;

  if (src) {
    return (
      <Image
        src={src}
        alt={item.alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 60vw"
        className={`object-cover ${className}`}
        style={{ objectPosition: item.focal }}
      />
    );
  }

  // Wrapped to match the filled branch. `Image fill` is absolutely
  // positioned; a bare placeholder is not, so without this the slot
  // changes layout behaviour the moment real art lands — correct in
  // review, wrong in production, or the reverse.
  return (
    <div className="absolute inset-0">
      <MediaPlaceholder brief={item.brief} tone={tone} className={className} />
    </div>
  );
}

/**
 * Shared empty state. A diagonal hatch so a slot reads unmistakably as a
 * placeholder rather than as dead space in the layout.
 */
export function MediaPlaceholder({
  brief,
  tone = "dark",
  className = "",
  kind = "Photo",
}: {
  brief: string;
  tone?: "dark" | "light";
  className?: string;
  kind?: string;
}) {
  const dark = tone === "dark";
  const hatch = dark
    ? "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 11px)"
    : "repeating-linear-gradient(135deg, rgba(19,19,18,0.05) 0 1px, transparent 1px 11px)";

  return (
    <div
      aria-hidden="true"
      className={`flex h-full w-full items-end ${className}`}
      style={{
        backgroundImage: dark
          ? `${hatch}, linear-gradient(135deg, #3a352f 0%, #1c1b18 100%)`
          : `${hatch}, linear-gradient(135deg, #eceae4 0%, #dedbd3 100%)`,
      }}
    >
      <div
        className="w-full border-t px-5 py-3"
        style={{
          borderColor: dark ? "rgba(255,255,255,0.14)" : "rgba(19,19,18,0.1)",
          background: dark ? "rgba(19,19,18,0.45)" : "rgba(255,255,255,0.5)",
        }}
      >
        <div className="t-eyebrow" style={{ color: dark ? brand.orange : brand.textMuted }}>
          {kind}
        </div>
        <p
          className="mt-1 text-[13px] leading-snug"
          style={{ color: dark ? "rgba(255,255,255,0.68)" : brand.textMuted }}
        >
          {brief}
        </p>
      </div>
    </div>
  );
}
