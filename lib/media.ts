/**
 * ⚠ HERO VIDEOS ARE PLACEHOLDER-WEIGHT. The four files currently in
 * /public/media are the original cuts: 31-37 MB each (138 MB total),
 * each still carrying an unused AAC audio track. They are fine for
 * review and must not ship. Web exports are being produced from the
 * masters at ~5 MB with no audio; swap the files in place (same names)
 * and replace the posters with the frame-1 stills that come with them.
 *
 * hero-home.jpg is a true frame-0 capture, so that one starts cleanly.
 * The other three were pulled with the macOS thumbnailer, which grabs a
 * representative frame rather than frame 1, so those start with a
 * visible jump until the real posters land.
 */

/**
 * Media manifest.
 *
 * Every image and video slot on the site is declared here. To fill one:
 *   1. drop the file in /public/media
 *   2. set `video` + `poster`, or `photo`
 *   3. write the `alt` text
 * Nothing else changes. An empty slot renders a labelled art-direction
 * placeholder showing `brief`, so the layout keeps its proportions.
 *
 * Hero slots take video. The poster is not optional when `video` is set:
 * it is what shows during download, when autoplay is blocked, on small
 * screens, and for anyone with reduced motion enabled. For a meaningful
 * share of visitors the poster IS the hero, so it should be a frame that
 * stands on its own.
 *
 * `focal` maps to CSS object-position and controls what stays in frame
 * when a slot crops.
 */

export type MediaSlot = {
  /** Looping background video. Hero slots only. */
  video: string | null;
  /** Frame from that video. Required whenever `video` is set. */
  poster: string | null;
  /** Still image, for slots that do not take video. */
  photo: string | null;
  alt: string;
  /** Art direction for whoever shoots or sources this. */
  brief: string;
  focal: string;
};

export const media = {
  /* ── Hero slots (video) ─────────────────────────────────────── */
  homeHero: {
    video: "/media/hero-home.mp4",
    poster: "/media/hero-home.jpg",
    photo: null,
    /* Decorative background behind the headline, so the alt stays empty:
       the h1 already carries the meaning and a description here would
       only add noise for screen reader users. */
    alt: "",
    brief: "Aerial: loaded hoppers queued along the approach road to a grain terminal",
    focal: "50% 45%",
  },
  carriersHero: {
    video: "/media/hero-carriers.mp4",
    poster: "/media/hero-carriers.jpg",
    photo: null,
    /* Decorative background behind the headline, so the alt stays empty:
       the h1 already carries the meaning and a description here would
       only add noise for screen reader users. */
    alt: "",
    brief: "Yellow Peterbilt with pneumatic tanker running highway, low front three-quarter",
    focal: "50% 45%",
  },
  brokersHero: {
    video: "/media/hero-brokers.mp4",
    poster: "/media/hero-brokers.jpg",
    photo: null,
    /* Decorative background behind the headline, so the alt stays empty:
       the h1 already carries the meaning and a description here would
       only add noise for screen reader users. */
    alt: "",
    brief: "Aerial: line of loaded hoppers holding on the scale approach",
    focal: "50% 40%",
  },
  shippersHero: {
    video: "/media/hero-shippers.mp4",
    poster: "/media/hero-shippers.jpg",
    photo: null,
    /* Decorative background behind the headline, so the alt stays empty:
       the h1 already carries the meaning and a description here would
       only add noise for screen reader users. */
    alt: "",
    brief: "Aerial: trucks moving through a terminal, elevator and rail in frame",
    focal: "50% 45%",
  },

  /* ── Still slots ────────────────────────────────────────────── */
  homeCta: {
    video: null,
    poster: null,
    photo: null,
    alt: "",
    brief: "Dusk, truck on a rural highway, room for text on the left",
    focal: "70% 50%",
  },
  carriers: {
    video: null,
    poster: null,
    photo: "/media/card-carriers.jpg",
    alt: "An owner operator standing beside his tractor and hopper trailer on a farm lane",
    brief: "Blue Peterbilt with black hopper trailer, driver standing at the cab, farm behind (supplied)",
    focal: "50% 52%",
  },
  brokers: {
    video: null,
    poster: null,
    photo: "/media/card-brokers.jpg",
    alt: "Two brokers talking between desks in a freight office",
    brief: "Two brokers talking in the office, company polos, cubicles behind (supplied)",
    focal: "50% 38%",
  },
  shippers: {
    video: null,
    poster: null,
    photo: "/media/card-shippers.jpg",
    alt: "Grain augering onto the pile at an origin facility as a truck unloads alongside",
    brief: "Aerial: grain augering onto the pile, truck unloading alongside, conveyor in frame (supplied)",
    focal: "50% 32%",
  },
} satisfies Record<string, MediaSlot>;

export type MediaKey = keyof typeof media;

/** Back-compat alias: existing still slots are read through this. */
export const photos = media;
export type PhotoKey = MediaKey;
