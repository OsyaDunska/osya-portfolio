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
      className="absolute top-6 right-6 size-14 overflow-hidden rounded-full bg-[#171716]"
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
}: {
  title: string;
  year: string;
  description: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative aspect-square squircle bg-[#292621] overflow-hidden block"
    >
      {/* Figma 6643:2655 — left 32, w 426 inside the 512 card, gap 24.
          right-[54px] rather than a fixed width so the block still flexes when
          the card is narrower than 512: 512 - 32 - 54 = 426 at design size. */}
      <div className="absolute left-8 right-[54px] top-[100px] flex flex-col gap-6">
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
    <main className="max-w-[1440px] w-full mx-auto px-6 md:px-11 pt-8 pb-16">
      {/* Top strip: About Me (left, top-46.5) + social buttons (right, top-32) */}
      <div className="flex items-start justify-between mb-8">
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
        <div className="md:w-[312px] shrink-0">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 mt-8 md:mt-0">
          {/* Row 1: Mentora text + Mentora monitor screenshot */}
          <CaseTextCard
            title="Mentora"
            year="2026"
            href="/work/mentora"
            // Figma I6643:2671;6643:2659 carries a newline after "to design",
            // so the text node comes back as two runs rather than one.
            description={
              <>
                Idea to create a learning platform that keeps students consistent and
                motivated. The goal was to design
                <br />
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
            className="group relative aspect-square squircle overflow-hidden bg-[#e9e9e9] block"
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

          {/* Row 2: Music App phone-in-hand + Music App text */}
          {/* Figma 6643:2644, Default -> Variant2. Here it is one box, so the
              move is exact: the mockup goes 507.94 -> 574.692 wide, a uniform
              1.1314, and its centre shifts 189/318 -> 172/328. Solving those
              together puts the scale origin at 321.5/241.1, i.e. 62.8%/47.1%.
              The resting 0.96 was already here, so the hover is 0.96 x 1.1314. */}
          <Link
            href="/work/music-app"
            className="group relative aspect-square squircle overflow-hidden bg-[#f7f7f7] block"
          >
            <Image
              src={musicAppHero}
              // the card is 512 from md up, full width below. Without this the
              // browser sized off the viewport and picked a ~529px file for a
              // ~480px slot — nothing was retina.
              sizes="(min-width: 768px) 512px, 100vw"
              alt="Music App preview"
              fill
              className="origin-[62.8%_47.1%] scale-[0.96] object-cover transition-transform duration-[750ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.0862] motion-reduce:transition-none"
            />
          </Link>
          <CaseTextCard
            title="Music App"
            year="2025"
            href="/work/music-app"
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
            <div className="group relative aspect-square squircle bg-[#292621] overflow-hidden">
              <div className="absolute left-8 right-[54px] top-[100px] flex flex-col gap-6">
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
                className="absolute left-8 top-8 flex h-10 items-center rounded-[12px] bg-[#413c34] px-3 text-[14px] font-semibold text-white opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100 motion-reduce:transition-none"
              >
                # Coming soon
              </span>
            </div>
            <div className="relative aspect-square squircle overflow-hidden bg-[#f7f7f7]">
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

      <div className="flex flex-col md:flex-row mt-20">
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
