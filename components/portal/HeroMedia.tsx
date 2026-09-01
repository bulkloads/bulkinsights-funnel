"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MediaPlaceholder } from "@/components/portal/Photo";
import { media, type MediaKey } from "@/lib/media";

/**
 * Background media for a hero.
 *
 * Renders the poster first and only upgrades to video once the client
 * confirms it is wanted. Two guards, both deliberate:
 *
 *  - prefers-reduced-motion: an autoplaying loop is exactly the kind of
 *    ambient motion that setting exists to suppress. CSS alone cannot
 *    stop playback, so the decision has to happen before the <video>
 *    element is rendered.
 *  - narrow viewports: a 5 MB ambient loop is not worth it on cell data,
 *    so under 768px the poster is the hero.
 *
 * Because the upgrade happens after mount, the server-rendered output is
 * always the still. That is also what anyone without JS keeps.
 */
export default function HeroMedia({
  slot,
  className = "",
  priority = false,
  scrim,
}: {
  slot: MediaKey;
  className?: string;
  priority?: boolean;
  /** Gradient laid over real media so headline type stays legible. Not
      applied to an empty slot, where it would only hide the brief. */
  scrim?: string;
}) {
  const item = media[slot];
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    if (!item.video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 768px)");
    const decide = () => setUseVideo(!motion.matches && wide.matches);

    decide();
    motion.addEventListener("change", decide);
    wide.addEventListener("change", decide);
    return () => {
      motion.removeEventListener("change", decide);
      wide.removeEventListener("change", decide);
    };
  }, [item.video]);

  const overlay = scrim ? (
    <div className="absolute inset-0" style={{ background: scrim }} />
  ) : null;

  if (item.video && useVideo) {
    return (
      <div className="absolute inset-0">
        <video
          className={`h-full w-full object-cover ${className}`}
          style={{ objectPosition: item.focal }}
          src={item.video}
          poster={item.poster ?? undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
        {overlay}
      </div>
    );
  }

  const still = item.poster ?? item.photo;
  if (still) {
    return (
      <div className="absolute inset-0">
        <Image
          src={still}
          alt={item.alt}
          fill
          priority={priority}
          sizes="100vw"
          className={`object-cover ${className}`}
          style={{ objectPosition: item.focal }}
        />
        {overlay}
      </div>
    );
  }

  // Same `absolute inset-0` wrapper as both filled branches above, so an
  // empty slot occupies the hero background rather than joining the flow.
  return (
    <div className="absolute inset-0">
      <MediaPlaceholder brief={item.brief} tone="dark" kind="Hero video" className={className} />
    </div>
  );
}
