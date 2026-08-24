import Link from "next/link";
import Image from "next/image";
import SocialButtons from "@/components/SocialButtons";
import CertificateLightbox from "./CertificateLightbox";

const backArrowIcon =
  "https://www.figma.com/api/mcp/asset/72acbeaa-38bd-413b-81f6-75d144f51a67.svg";
const heartsVector =
  "https://www.figma.com/api/mcp/asset/8efb2a83-2727-4157-b131-e023d5d75ad4.svg";
const portraitPhoto = "/photos/osya-portrait.png";
const littleMePhoto = "/photos/little-me.png";

const tags = [
  "Design Systems",
  "UX Research",
  "Prototyping",
  "AI-first Workflow",
  "UI/UX Design",
];

const experience = [
  {
    period: "Jan 2026 — Aug 2026",
    role: "UI/UX Designer at an Eyewear E-commerce Brand (NDA)",
    text: "Built a prescription lens configurator guiding customers step-by-step through lens selection. Designed the landing page driving paid traffic straight into the configurator. Built admin panels and client dashboards for order management and tracking.",
  },
  {
    period: "Jan 2025 — Sep 2025",
    role: "UI/UX Designer at a Medical Cannabis Marketplace (NDA, Agency)",
    text: "Led a full redesign of the homepage, marketplace, and checkout flow. Simplified the onboarding quiz for new patients, cutting completion time from 12 minutes to 6. Redesigned the shopping cart with a progress bar tracking the 100g legal limit, showing which pharmacy would fulfill each order in this multi-pharmacy marketplace, with quick links to switch pharmacies or add more products before checkout. Added a post-purchase feedback flow, rewarding reviews with a discount on the next order. Designed the patient personal account, including video-consultation scheduling and reorder flow.",
  },
  {
    period: "2025",
    role: "E-commerce Designer — Online Gallery & Diamond Retail Site",
    text: "Designed the e-commerce experience for an online art gallery selling a private collection of Damien Hirst spin paintings. Built the catalog structure with category-based filtering by painting type, individual product pages for each artwork, and a \"How to Buy\" flow addressing trust concerns typical for high-value art purchases. Redesigned a diamond e-commerce website — including the homepage, product catalog, and filtering system — helping customers navigate and compare diamonds by key specifications more intuitively.",
  },
];

const tools = {
  "Design & Prototyping": [
    "Figma (component libraries, Auto Layout, Variants, Figma Variables, design tokens)",
    "FigJam",
    "Photoshop",
    "Illustrator (icons & banner assets — working knowledge)",
    "Figma Make",
    "Motion Design (Figma)",
    "Maze",
  ],
  "AI-first workflow": ["Claude", "ChatGPT", "Midjourney", "Krea AI", "Freepik / Magnific", "Adobe Firefly"],
  "Development & Deployment": ["GitHub", "Vercel"],
};

export default function AboutMe() {
  return (
    <main className="max-w-[1440px] w-full mx-auto px-6 md:px-11 pt-8 pb-16">
      <div className="flex items-center justify-between mb-16">
        <Link
          href="/"
          className="flex items-center justify-center w-12 h-12 p-4 rounded-[28px] bg-transparent hover:bg-[#f5f5f5] transition-colors"
          aria-label="Back to all works"
        >
          <Image src={backArrowIcon} alt="" width={24} height={24} unoptimized />
        </Link>
        <SocialButtons />
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="relative w-[140px] mx-auto">
          <div className="relative w-[140px] h-[160px] rounded-2xl overflow-hidden bg-[#e9e9e9]">
            <Image src={portraitPhoto} alt="Osya Dunska" fill className="object-cover" />
          </div>
          <p
            className="absolute -bottom-3 -right-16 text-[#589cf9] text-[40px] -rotate-6"
            style={{ fontFamily: "var(--font-alex-brush)" }}
          >
            Osya
          </p>
        </div>

        <h1
          className="mt-8 text-[28px] md:text-[40px] font-semibold"
          style={{ letterSpacing: "-1.2px", lineHeight: "48px" }}
        >
          <span className="text-[#171716]/40">
            I own the full design
            <br />
            process —{" "}
          </span>
          <span className="text-[#171716]">
            from the <span className="italic">first sketch</span> to
            <br />a dev-ready screen
          </span>
        </h1>

        <p className="mt-6 text-[16px] leading-[1.6] text-[#111]/60 max-w-[600px]">
          Hi, I&apos;m Osya — a UI/UX &amp; Product Designer with 2 years of hands-on experience
          across e-commerce, SaaS, and healthtech products.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#f5f5f5] text-[#111] text-sm px-3 py-2 rounded-full"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              # {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-20 mt-20 max-w-[740px] mx-auto text-[16px] leading-[1.6] text-[#292621]/80">
        <div className="flex flex-col gap-14">
        <div className="flex flex-col gap-4">
          <p>
            I work primarily in Figma (component libraries,{" "}
            <span className="font-semibold italic text-[#292621]">design tokens</span>, Auto
            Layout, Variants), and I apply an{" "}
            <span className="font-semibold italic text-[#292621]">
              AI-first approach — Claude, Figma Make, Midjourney
            </span>{" "}
            — to move faster through research and prototyping without losing quality. I even
            built this very site myself, together with Claude — from structure to final
            details.
          </p>
          <p>
            I genuinely love design — I can sit for hours just creating and experimenting, and
            I always put my heart into it. I&apos;m always open to learning and new knowledge,
            and I love that about myself — if I didn&apos;t need to earn a living, I&apos;d
            probably just spend all my time learning and creating in design.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-[18px] font-semibold text-[#292621]">How I Work</h2>
          <p>
            I start every project by understanding the problem before touching a single pixel.
            I talk to stakeholders when possible, research users, and do my best to understand
            the needs of both business owners and users — to find the most beneficial solution
            for both sides. I also benchmark competitors, to make sure I&apos;m solving the
            right problem, not just the obvious one.
          </p>
        </div>
        </div>

        <div className="flex flex-col gap-10">
          <h2 className="text-[18px] font-semibold text-[#292621] uppercase">Experience</h2>
          {experience.map((job) => (
            <div key={job.role} className="flex flex-col gap-2">
              <p>{job.period}</p>
              <p className="text-[18px] font-semibold text-[#292621]">{job.role}</p>
              <p>{job.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-[18px] font-semibold text-[#292621] uppercase">Tools I Use</h2>
          {Object.entries(tools).map(([group, items]) => (
            <div key={group} className="flex flex-col gap-4">
              <p className="text-[18px] font-semibold text-[#292621]">{group}:</p>
              <ul className="list-disc pl-6 flex flex-col gap-1.5 text-black">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-[18px] font-semibold text-[#292621] uppercase">Certifications</h2>
          <CertificateLightbox />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-[18px] font-semibold text-[#292621] uppercase">Languages</h2>
          <p>Ukrainian &amp; Russian (native), English (working proficiency)</p>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-[18px] font-semibold text-[#292621]">Beyond Design</h2>
          <p>
            When I&apos;m not designing, I&apos;m probably planning my next trip — exploring
            new places inspires me to create. Music has been a constant in my life for as
            long as I can remember, and dancing is where I go to fully switch off — no
            screens, just movement. I started dancing when I was five or six, and it&apos;s
            stayed part of who I am ever since — probably why I feel music so deeply, even
            outside the studio.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center text-center mt-24">
        <div className="relative w-[140px] h-[160px]">
          <div className="absolute inset-0 rounded-2xl overflow-hidden bg-[#e9e9e9]">
            <Image src={littleMePhoto} alt="Little me" fill className="object-cover" />
          </div>
          <p
            className="absolute -top-5 -right-10 text-[#589cf9] text-[24px] -rotate-6"
            style={{ fontFamily: "var(--font-alex-brush)" }}
          >
            little me
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center text-center gap-8 mt-20 mb-4">
        <p className="text-[14px] text-[#292621]">
          &ldquo;The determination hasn&apos;t changed. Only the skill set has.&rdquo;
        </p>
        <p
          className="text-[16px] text-[rgba(41,38,33,0.6)] font-semibold"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Made with love by{" "}
          <span className="underline">Osya Dunska</span>
        </p>
        <Image src={heartsVector} alt="" width={55} height={24} unoptimized />
      </div>
    </main>
  );
}
