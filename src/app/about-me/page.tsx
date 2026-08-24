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
