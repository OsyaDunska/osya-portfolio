import Link from "next/link";
import Image from "next/image";
import SocialButtons from "@/components/SocialButtons";

const mentoraHero = "/mockups/mentora-hero.png";
const musicAppHero = "/mockups/music-app-hero.png";
const auraHero = "/mockups/aura-hero.png";

const arrowIcon = "https://www.figma.com/api/mcp/asset/a0386daa-201d-4dec-92d6-4ce4741e2d4e.svg";

function ArrowButton() {
  return (
    <span className="absolute top-6 right-6 flex items-center justify-center w-14 h-14 rounded-[28px] bg-[#171716]">
      <Image src={arrowIcon} alt="" width={24} height={24} />
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
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative aspect-square squircle bg-[#292621] overflow-hidden block"
    >
      <div className="absolute left-8 right-8 top-[100px] flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="text-white text-2xl font-medium" style={{ letterSpacing: "-0.8992px" }}>
            {title}
          </span>
          <span className="text-white/60 text-sm" style={{ letterSpacing: "-0.48px" }}>
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
            description="Idea to create a learning platform that keeps students consistent and motivated. The goal was to design a clear course structure, adaptive scheduling, and visible progress— so learners always know where they are and what's next."
          />
          <Link
            href="/work/mentora"
            className="relative aspect-square squircle overflow-hidden bg-[#e9e9e9] block"
          >
            <Image src={mentoraHero} alt="Mentora preview" fill className="object-cover" />
          </Link>

          {/* Row 2: Music App phone-in-hand + Music App text */}
          <Link
            href="/work/music-app"
            className="relative aspect-square squircle overflow-hidden bg-[#f7f7f7] block"
          >
            <Image
              src={musicAppHero}
              alt="Music App preview"
              fill
              className="object-cover"
              style={{ transform: "scale(0.96)" }}
            />
          </Link>
          <CaseTextCard
            title="Music App"
            year="2025"
            href="/work/music-app"
            description="Idea to create a music app that simplifies access to content and reduces the time to the first play. The goal was to make interaction as effortless as possible: with minimal steps, adaptive recommendations, and a clear, intuitive structure."
          />

          {/* Row 3: Aura text + Coming soon (hover on description reveals pill on cover) */}
          <div className="group contents">
            <div className="relative aspect-square squircle bg-[#292621] overflow-hidden">
              <div className="absolute left-8 right-8 top-[100px] flex flex-col gap-6">
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
              <ArrowButton />
            </div>
            <div className="relative aspect-square squircle overflow-hidden bg-[#f7f7f7]">
              <Image src={auraHero} alt="" fill className="object-cover" />
              <span
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-14 px-10 rounded-full bg-[#f9f9f9] text-[#292621] text-[17px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ top: "calc(50% + 50px)", letterSpacing: "-0.79px" }}
              >
                Coming soon
              </span>
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
