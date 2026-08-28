"use client";

import Image from "next/image";

const VIDEO_PLAYBACK_RATE = 1.5;

// The "New" screen's top gallery (Figma 6460:23145) is a horizontal carousel:
// four 370px cards with a 16px gap, so ~1390px of content inside a 371px
// window. The PNG export flattens it to the first card and a sliver of the
// second, so it's rebuilt here to actually scroll — and because the first two
// cards are video fills in Figma, which a PNG can't carry.
//
// The instance renders its children at 336.715/370 of design size; every
// number below is a design value times that scale.
const S = 336.7154541015625 / 370;

const px = (design: number) => design * S;

export const GALLERY = {
  /** Offsets inside the phone-screen container, measured off the export. */
  left: 14.53,
  top: 131.27,
  /** Runs to the screen's right edge (400) rather than the instance's own
   *  width — the cards overflow the instance and are clipped by the screen. */
  width: 400 - 14.53,
  height: 287.81,
  cardWidth: px(370),
  gap: px(16),
  /** Titles block sits above the artwork; artwork starts here. */
  artTop: 287.81 - px(240),
  artHeight: px(240),
  radius: px(16),
};

type Card = {
  eyebrow: string;
  heading: string;
  caption: string;
  title: string;
  subtitle: string;
  dimEyebrow?: boolean;
  video?: string;
  image?: string;
  imageOverlay?: string;
};

const CARDS: Card[] = [
  {
    eyebrow: "Acoustic bliss",
    heading: "Mellow instruments",
    caption: "Soft instrumental mix",
    title: "Mellow Vibes",
    subtitle: "Lenny Strings, Akara, Key Notes, and more",
    video: "/videos/music-app-mellow-vibes.mp4",
  },
  {
    eyebrow: "Indie gems",
    heading: "Hidden treasures",
    caption: "Curated indie pop",
    title: "Indie Aquarium",
    subtitle: "Dream Coast, The Glass, Desert Skies",
    dimEyebrow: true,
    video: "/videos/music-app-indie-aquarium.mp4",
  },
  {
    eyebrow: "Soulful sounds",
    heading: "Rhythmic grooves",
    caption: "Neo-soul collection",
    title: "Soul Serenity",
    subtitle: "Honey Drip, Jade, The Sandman",
    dimEyebrow: true,
    image: "/mockups/music-app/card-soul-serenity.png",
    imageOverlay: "/mockups/music-app/card-soul-serenity-overlay.png",
  },
  {
    // Figma fills this one with video too, but no footage was supplied — it
    // falls back to the card's own gradient, same as the Figma export does.
    eyebrow: "Rock anthems",
    heading: "Guitar legends",
    caption: "Classic rock hits",
    title: "Rock Royalty",
    subtitle: "Crimson Riot, Iron Maiden, Led Zepplin",
    dimEyebrow: true,
  },
];

// A phone UI, so the platform UI font is the faithful choice here (Figma uses
// SF Pro / Mulish, neither of which the site loads).
const UI_FONT = '-apple-system, "SF Pro Text", system-ui, sans-serif';

export default function NewScreenGallery() {
  return (
    <div
      className="absolute overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{
        left: GALLERY.left,
        top: GALLERY.top,
        width: GALLERY.width,
        height: GALLERY.height,
        background: "linear-gradient(180deg, rgb(4,15,31) 0%, rgb(2,13,28) 100%)",
        fontFamily: UI_FONT,
      }}
    >
      <div className="flex h-full" style={{ gap: GALLERY.gap, paddingRight: GALLERY.left }}>
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="relative h-full shrink-0"
            style={{ width: GALLERY.cardWidth }}
          >
            <div
              className="flex flex-col"
              style={{ width: px(219), gap: px(12) }}
            >
              <p
                className="uppercase"
                style={{
                  fontSize: px(16),
                  color: card.dimEyebrow ? "#9d9d9d" : "rgba(255,255,255,0.6)",
                }}
              >
                {card.eyebrow}
              </p>
              <p className="text-white" style={{ fontSize: px(20), fontWeight: 510 }}>
                {card.heading}
              </p>
              <p
                className="capitalize"
                style={{ fontSize: px(16), color: card.dimEyebrow ? "#9d9d9d" : "rgba(255,255,255,0.6)" }}
              >
                {card.caption}
              </p>
            </div>

            <div
              className="absolute flex w-full flex-col justify-end overflow-hidden"
              style={{
                top: GALLERY.artTop,
                height: GALLERY.artHeight,
                borderRadius: GALLERY.radius,
                border: "1px solid rgba(98,108,160,0.8)",
              }}
            >
              {card.video && (
                <video
                  className="absolute inset-0 size-full object-cover"
                  src={card.video}
                  // The source footage runs slower than the motion in the
                  // design; 1.5x brings it back in line. Set via ref because
                  // playbackRate has no JSX attribute.
                  ref={(el) => {
                    if (el) el.playbackRate = VIDEO_PLAYBACK_RATE;
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              )}
              {card.image && (
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="337px"
                  className="absolute inset-0 object-cover"
                />
              )}
              {card.imageOverlay && (
                <Image
                  src={card.imageOverlay}
                  alt=""
                  width={337}
                  height={219}
                  className="absolute left-0 w-full max-w-none"
                  style={{ height: "101.77%", top: "-1.77%" }}
                />
              )}

              <div
                className="relative flex flex-col text-white"
                style={{
                  gap: px(12),
                  padding: `${px(20)}px ${px(16)}px`,
                  backdropFilter: `blur(${px(10)}px)`,
                  WebkitBackdropFilter: `blur(${px(10)}px)`,
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255,255,255,0) 1.61%, rgba(255,249,249,0.016) 3.55%)",
                }}
              >
                <p style={{ fontSize: px(20), fontWeight: 900 }}>{card.title}</p>
                <p style={{ fontSize: px(14), fontWeight: 300 }}>{card.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
