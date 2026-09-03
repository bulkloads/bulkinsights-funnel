"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MediaPlaceholder } from "@/components/portal/Photo";
import { media, type MediaKey } from "@/lib/media";

/** How many times the hero loop plays before it settles on the still. */
const HERO_LOOP_PLAYS = 3;

/**
 * Background media for a hero.
 *
 * The still is always the base layer: it is the server-rendered output, the
 * LCP image, and what anyone without JS (or with reduced motion, or on a
 * narrow screen) keeps. On a wide desktop that wants motion, the video loop
 * fades in over it, plays a few times, then fades back out to leave the still
 * on screen. So the page ends where it started, deliberately, rather than
 * looping forever.
 *
 * Two guards decide whether the video is wanted at all, both before the
 * <video> is rendered because CSS cannot stop playback:
 *  - prefers-reduced-motion: an autoplaying loop is exactly the ambient motion
 *    that setting exists to suppress.
 *  - narrow viewports: not worth the bytes on cell data, so under 768px the
 *    poster is the whole hero.
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
  // The video is faded in only while it is actually playing, so the still
  // shows through during load and again once the loops are done.
  const [videoShown, setVideoShown] = useState(false);
  const playsRef = useRef(0);

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

  // Start each playthrough clean whenever the video (re)enters: a resize back
  // to wide, a reduced-motion toggle, or a slot change must reset the loop
  // count and re-hide the video, or it would inherit a finished count and
  // flash once instead of playing its loops.
  useEffect(() => {
    if (!useVideo) return;
    playsRef.current = 0;
    setVideoShown(false);
  }, [useVideo, item.video]);

  const overlay = scrim ? (
    <div className="absolute inset-0" style={{ background: scrim }} />
  ) : null;

  const still = item.poster ?? item.photo;

  return (
    <div className="absolute inset-0">
      {still ? (
        <Image
          src={still}
          alt={item.alt}
          fill
          priority={priority}
          sizes="100vw"
          className={`object-cover ${className}`}
          style={{ objectPosition: item.focal }}
        />
      ) : (
        <MediaPlaceholder brief={item.brief} tone="dark" kind="Hero video" className={className} />
      )}

      {item.video && useVideo ? (
        <video
          key={item.video}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoShown ? "opacity-100" : "opacity-0"
          } ${className}`}
          style={{ objectPosition: item.focal }}
          src={item.video}
          autoPlay
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setVideoShown(true)}
          onError={() => setVideoShown(false)}
          onEnded={(e) => {
            playsRef.current += 1;
            if (playsRef.current < HERO_LOOP_PLAYS) {
              void e.currentTarget.play().catch(() => setVideoShown(false));
            } else {
              // Fade back to the still, which has been underneath all along.
              setVideoShown(false);
            }
          }}
        />
      ) : null}

      {overlay}
    </div>
  );
}
