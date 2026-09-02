import Link from "next/link";
import Image from "next/image";
import SocialButtons from "@/components/SocialButtons";

// The Mentora cover is two layers in Figma (6647:11889 "Cover Saas-case"), and
// its hover moves them in opposite directions — so it cannot be one flattened
// image.
//   Both carry the same pixels as the sources in that component, repacked from
// PNG into lossless WebP: 4634KB became 2811KB with a measured difference of
// zero across every channel. They are the two heaviest things on the page and
// they load unoptimised, so the container was the only place left to win.
const mentoraCoverBack = "/mockups/mentora-cover-back.webp";
const mentoraCoverMonitor = "/mockups/mentora-cover-monitor.webp";
const musicAppHero = "/mockups/music-app-hero.png";
const auraHero = "/mockups/aura-hero.png";

// Figma 6643:2620 / 6643:2626 — the card's 56px button, Default and Variant2.
//
// Read side by side the two variants are one animation, not two pictures:
//   circle  r 0.5 -> r 28, white     the disc grows out of the centre
//   arrow   white -> #171716
//   arrow   rotated -90 degrees      confirmed by rasterising both and
//                                    comparing: -90 differs by 0.15 of an
//                                    alpha level, every other angle by 4-5
// Tailwind v4 drives -rotate-90 through the standalone `rotate` property, not
// `transform`, and the two do not transition together: a transition on
// `transform` leaves the rotation snapping. Hence transition-[rotate,color]
// here, and transition-transform on the disc, which v4 expands to cover
// transform, translate, scale and rotate.
//
// So this is one path plus three CSS transitions rather than a pair of icons,
// and the arrow is inline rather than fetched — the previous version pointed
// at a figma.com/api/mcp/asset URL, which expires after seven days and would
// have taken the arrows off the live site on its own.
const CARD_ARROW =
  "M32.9541 22.2432C33.3959 22.2432 33.7539 22.6011 33.7539 23.043V31.543C33.7538 31.9847 33.3959 " +
  "32.3428 32.9541 32.3428C32.5124 32.3427 32.1544 31.9847 32.1543 31.543V24.9893L31.8125 " +
  "25.3301L23.6201 33.5225C23.3077 33.8349 22.8017 33.8348 22.4893 33.5225C22.1768 33.21 22.1768 " +
  "32.704 22.4893 32.3916L30.6963 24.1846L31.0371 23.8428H24.4541C24.0124 23.8427 23.6544 23.4846 " +
  "23.6543 23.043C23.6543 22.6012 24.0123 22.2432 24.4541 22.2432H32.9541ZM33.2754 32.4883C33.2425 " +
  "32.4995 33.2092 32.5098 33.1748 32.5176C33.2092 32.5098 33.2425 32.4995 33.2754 32.4883ZM32.3184 " +
  "32.3145C32.3604 32.3491 32.4057 32.3797 32.4531 32.4072C32.4057 32.3797 32.3604 32.3491 32.3184 " +
  "32.3145ZM33.5898 32.3145C33.5478 32.3491 33.5025 32.3797 33.4551 32.4072C33.5025 32.3797 33.5478 " +
  "32.3491 33.5898 32.3145ZM33.875 31.9326C33.8624 31.9624 33.8483 31.9913 33.833 32.0195C33.8483 " +
  "31.9913 33.8624 31.9624 33.875 31.9326Z";

function ArrowButton() {
  return (
    <span
      aria-hidden
      // 24/24 at the design width; 6943:14374 keeps the 56 on a phone and
      // brings it in to 16/16 against the 342 card.
      className="absolute top-4 right-4 size-14 overflow-hidden rounded-full bg-[#171716] md:top-6 md:right-6"
    >
      <span className="absolute inset-0 scale-0 rounded-full bg-white transition-transform duration-[250ms] ease-out group-hover:scale-100 motion-reduce:transition-none" />
      <svg
        viewBox="0 0 56 56"
        className="relative size-full text-white transition-[rotate,color] duration-[250ms] ease-out group-hover:-rotate-90 group-hover:text-[#171716] motion-reduce:transition-none"
      >
        <path d={CARD_ARROW} fill="currentColor" />
      </svg>
    </span>
  );
}

function CaseTextCard({
  title,
  year,
  description,
  href,
  className = "",
}: {
  title: string;
  year: string;
  description: React.ReactNode;
  href: string;
  /** For the mobile ordering — see the grid. */
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative aspect-square squircle bg-[#292621] overflow-hidden block ${className}`}
    >
      {/* Figma 6643:2655 — left 32, w 426 inside the 512 card, gap 24.
          right-[54px] rather than a fixed width so the block still flexes when
          the card is narrower than 512: 512 - 32 - 54 = 426 at design size.
            Below md the mobile draft 6941:1238 gives its own three against a
          342 card — in 24, out 32, and 80 down — and they are what make the
          text fit. At the desktop numbers the measure narrows to 256 and the
          description runs to nine lines: 354 of block inside a 327 card at 375,
          which the card clips. At 24/32/80 it is 286 wide and seven lines, the
          207 the draft draws, and it clears the foot at both 375 and 390.
            The type is untouched — 24 on the name, 16 on the year, 16 on 22 on
          the text — because the measure was the problem, not the size. */}
      <div className="absolute top-[88px] right-8 left-6 flex flex-col gap-6 md:top-[100px] md:right-[54px] md:left-8">
        <div className="flex items-center gap-2">
          <span className="text-white text-2xl font-medium" style={{ letterSpacing: "-0.8992px" }}>
            {title}
          </span>
          <span className="text-white/60 text-base" style={{ letterSpacing: "-0.48px" }}>
            / {year}
          </span>
        </div>
        <p className="text-white/50 text-base leading-[22px]" style={{ letterSpacing: "-0.176px" }}>
          {description}
        </p>
      </div>
      <ArrowButton />
    </Link>
  );
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pt-10 pb-16 md:px-11 md:pt-8">
      {/* Top strip: About Me (left, top-46.5) + social buttons (right, top-32).
          6943:14369 takes both out of it on a phone: About Me goes under the
          name at 24pt, and the buttons to the foot of the page. So the strip
          only exists at the design width. */}
      <div className="mb-8 hidden items-start justify-between md:flex">
        <Link
          href="/about-me"
          className="text-[16px] text-[#292621]/60 hover:text-[#292621]"
        >
          About Me
        </Link>
        <SocialButtons />
      </div>

      {/* Name column (312px, left-44) + case grid (1040px, left-356), both top-112 */}
      <div className="flex flex-col md:flex-row md:gap-0">
        {/* 6943:14370 and 6943:14403 sit at 48 on the phone draft where the
              cards stay at 24, so the name and the link under it take another
              24 of their own below md. */}
          <div className="shrink-0 pl-6 md:w-[312px] md:pl-0">
          <p
            className="text-[32px] font-bold text-[#171716]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Osya Dunska
          </p>
          <p className="text-[16px] text-[#292621]/60 mt-4 leading-6">
            Product Designer
            <br />
            Based in Kyiv, Ukraine
          </p>
          {/* 6943:14403 — 24 rather than the strip's 16, and at full #292621
              rather than 60 per cent of it. 24 under the two lines above. */}
          <Link
            href="/about-me"
            className="mt-6 inline-block text-[24px] text-[#292621] md:hidden"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            About Me
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 mt-8 md:mt-0">
          {/* Row 1: Mentora text + Mentora monitor screenshot */}
          <CaseTextCard
            title="Mentora"
            year="2026"
            href="/work/mentora"
            className="order-1 md:order-none"
            // Figma I6643:2671;6643:2659 carries a newline after "to design",
            // so the text node comes back as two runs rather than one. It is a
            // break drawn for a 426 measure: at 286 it lands mid-paragraph and
            // leaves a short line hanging under a full one. Below md it goes
            // and the paragraph sets itself.
            description={
              <>
                Idea to create a learning platform that keeps students consistent and
                motivated. The goal was to design
                <br className="hidden md:inline" />
                a clear course structure, adaptive scheduling, and visible progress — so
                learners always know where they are and what&apos;s next.
              </>
            }
          />
          {/* Figma 6647:11889 "Cover Saas-case", Default -> Variant2.
              Figma's own code for Variant2 reports a monitor box that does not
              agree with the node's geometry, so the move was measured off the
              two rendered variants instead: a sub-pixel read of the bezel puts
              it at 666.8 tall at rest and 734.6 on hover, a uniform 1.1017,
              which agrees with the node geometry's own 1.0996 — so 1.1, about
              a point at 836/-57.3 in card coordinates. The desk behind runs the other
              way, 872x467.57 -> 708x379, a uniform 0.8113 about 434.7/609.4.
              Each origin is written against its own layer's box, because that
              is what transform-origin resolves against; positions are Figma's
              boxes over the 512 card, so the pair holds together at any width.
                 The desk is a clipped frame with a taller image inside it, not
              a bare image — the crop is part of the composition. */}
          <Link
            href="/work/mentora"
            className="group relative order-2 aspect-square squircle overflow-hidden bg-[#e9e9e9] block md:order-none"
          >
            {/* 6647:11883 "Image (Papers Combined)" */}
            <div
              aria-hidden
              className="absolute left-[-35.156%] top-[20.703%] h-[91.323%] w-[170.313%] overflow-hidden origin-[70.5%_107.66%] transition-transform duration-[750ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[0.8113] motion-reduce:transition-none"
            >
              <Image
                src={mentoraCoverBack}
                alt=""
                width={1202}
                height={1011}
                // shown at 903px on a 512 card; the optimiser picked a variant
                // off the layout width, which is softer than the source
                unoptimized
                className="absolute left-[-4.37%] top-[-48.95%] h-[162.38%] w-[103.52%] max-w-none"
              />
            </div>
            {/* 6647:11885 "Scene _2 4" */}
            <Image
              src={mentoraCoverMonitor}
              alt="Mentora preview"
              width={3680}
              height={2760}
              // the optimiser re-encodes at quality 75, which softens the small
              // type in the calendar UI; the source is already large enough
              unoptimized
              className="absolute left-[-42.236%] top-[-10.830%] h-[121.659%] w-[162.212%] max-w-none origin-[126.7%_-0.3%] transition-transform duration-[750ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.1] motion-reduce:transition-none"
            />
          </Link>

          {/* Row 2: Music App phone-in-hand + Music App text. On the desktop
              grid the picture leads and the text follows, which is what breaks
              the alternation once the grid is one column: read down, it gives
              picture, picture, text, text. The draft has it strictly text then
              picture the whole way, so the pair swaps below md and only there.
                Order has to be set on all six, not this pair alone: an item
              left at the default 0 sorts before anything given a positive one,
              so moving two would send them to the end instead of past each
              other. */}
          {/* Figma 6643:2644, Default -> Variant2. Here it is one box, so the
              move is exact: the mockup goes 507.94 -> 574.692 wide, a uniform
              1.1314, and its centre shifts 189/318 -> 172/328. Solving those
              together puts the scale origin at 321.5/241.1, i.e. 62.8%/47.1%.
              The resting 0.96 was already here, so the hover is 0.96 x 1.1314. */}
          <Link
            href="/work/music-app"
            className="group relative order-4 aspect-square squircle overflow-hidden bg-[#f7f7f7] block md:order-none"
          >
            <Image
              src={musicAppHero}
              // the card is 512 from md up, full width below. Without this the
              // browser sized off the viewport and picked a ~529px file for a
              // ~480px slot — nothing was retina.
              sizes="(min-width: 768px) 512px, 100vw"
              alt="Music App preview"
              fill
              // The 0.96 is the resting half of a hover that a touch screen never
              // plays, and on the smaller card it reads as the hand floating
              // clear of the foot. 6943:14397 has it filling the frame, so
              // below md it rests at 1 and the wrist meets the edge.
              className="origin-[62.8%_47.1%] scale-100 object-cover transition-transform duration-[750ms] ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none md:scale-[0.96] md:group-hover:scale-[1.0862]"
            />
          </Link>
          <CaseTextCard
            title="Music App"
            year="2025"
            href="/work/music-app"
            className="order-3 md:order-none"
            description="Idea to create a music app that simplifies access to content and reduces the time to the first play. The goal was to make interaction as effortless as possible: with minimal steps, adaptive recommendations, and a clear, intuitive structure."
          />

          {/* Row 3: Aura text card + its cover */}
          <div className="contents">
            {/* Aura is its own component set in Figma (6643:12017): no arrow,
                and the whole hover is the badge below fading in. The card
                ground stays #292621 in both variants — an earlier revision
                darkened it to #171716 and that is gone.
                  `group` belongs on this card and not on a wrapper around the
                pair: the badge answers to the text card alone, and hovering the
                cover beside it is not what brings it out. */}
            <div className="group relative order-5 aspect-square squircle bg-[#292621] overflow-hidden md:order-none">
              {/* Aura's text is written out here rather than through
                  CaseTextCard, so it needs the same three the card component
                  takes below md — 24, 32, 80 — or its description runs past the
                  foot the way the others did. */}
              <div className="absolute top-[88px] right-8 left-6 flex flex-col gap-6 md:top-[100px] md:right-[54px] md:left-8">
                <div className="flex items-center gap-2">
                  <span className="text-white text-2xl font-medium" style={{ letterSpacing: "-0.8992px" }}>Aura</span>
                  <span className="text-white/60 text-base" style={{ letterSpacing: "-0.48px" }}>/ 2026</span>
                </div>
                <p className="text-white/50 text-base leading-[22px]" style={{ letterSpacing: "-0.176px" }}>
                  Idea to create an AI copilot that supports emotional well-being through
                  mindful, personalized guidance. The goal was to build a calm, judgment-free
                  space — with gentle content, clear self-reflection, and a steady digital
                  rhythm that respects the user&apos;s pace.
                </p>
              </div>
              {/* Figma 6643:11989 — left 32, top 32, h 40, px 12, radius 12.
                  #413c34, a step lighter than the card, which is what makes it
                  read against the unchanged ground; it is the only thing that
                  moves on hover here.
                  No arrow button on this card — rendering the node in Figma
                  leaves that corner as flat background, unlike Mentora's. */}
              <span
                data-corner-smooth
                // A touch screen has no hover to reveal it with, so below md it
                // is simply there — which is how the mobile draft draws it,
                // 6941:1249, same #413c34 and the same 14 semibold.
                className="absolute top-6 left-6 flex h-[34px] items-center rounded-[10px] bg-[#413c34] px-3 text-[12px] font-semibold text-white opacity-100 transition-opacity duration-[250ms] motion-reduce:transition-none md:top-8 md:left-8 md:h-10 md:rounded-[12px] md:text-[14px] md:opacity-0 md:group-hover:opacity-100"
              >
                # Coming soon
              </span>
            </div>
            <div className="relative order-6 aspect-square squircle overflow-hidden bg-[#f7f7f7] md:order-none">
              <Image
                src={auraHero}
                alt=""
                // the card is 512 from md up, full width below. Without this the
                // browser sized off the viewport and picked a ~529px file for a
                // ~480px slot — nothing was retina.
                sizes="(min-width: 768px) 512px, 100vw"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 6942:5321 — the row sits at the foot on a phone, centred: 192 across,
          three 56 circles on 12 of gap, and 56 under the last card, which ends
          at 2360 against the row's 2416. */}
      <SocialButtons className="mt-14 justify-center md:hidden" />

      {/* 32 under the buttons on a phone — 6942:5321 ends at 2448 and
          6943:14399 sits at 2480 — and 80 under the cards at the design width,
          where the buttons are still up in the strip. */}
      <div className="mt-8 flex flex-col md:mt-20 md:flex-row">
        <div className="hidden md:block md:w-[312px] shrink-0" />
        <p
          className="flex-1 text-center text-[16px] text-[rgba(41,38,33,0.6)] font-semibold"
          style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.0128px" }}
        >
          Made with love by{" "}
          <span
            className="underline"
            style={{ textUnderlinePosition: "from-font", textDecorationThickness: "1px", textUnderlineOffset: "0.5px" }}
          >
            Osya Dunska
          </span>
        </p>
      </div>
    </main>
  );
}
