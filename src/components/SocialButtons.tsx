import Image from "next/image";
import { socialLinks } from "@/lib/links";

const linkedinIcon = "https://www.figma.com/api/mcp/asset/4db6bb36-0ca5-47d1-b19b-0135f6bdc145.svg";
const telegramIcon = "https://www.figma.com/api/mcp/asset/4a3fd38e-9da8-49ab-abe7-666bdc756efb.svg";
const whatsappIcon = "https://www.figma.com/api/mcp/asset/62480547-d7b6-46a3-be65-dd11f928ab9f.svg";

export default function SocialButtons({ className = "" }: { className?: string }) {
  const buttons = [
    { href: socialLinks.linkedin, label: "LinkedIn", icon: linkedinIcon, w: 16.667, h: 16.667, offsetY: -1.5 },
    { href: socialLinks.telegram, label: "Telegram", icon: telegramIcon, w: 19.2, h: 16, offsetY: 0 },
    { href: socialLinks.whatsapp, label: "Whatsapp", icon: whatsappIcon, w: 20.5, h: 20.6, offsetY: 0 },
  ];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {buttons.map(({ href, label, icon, w, h, offsetY }) => (
        
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 h-12 px-5 rounded-full bg-[#292621] text-white text-[15px] font-medium hover:bg-[#171716] transition-colors"
        >
          <span className="relative w-5 h-[31px] shrink-0">
            <span
              className="absolute left-1/2"
              style={{
                width: w,
                height: h,
                top: `calc(50% + ${offsetY}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Image src={icon} alt="" fill unoptimized />
            </span>
          </span>
          {label}
        </a>
      ))}
    </div>
  );
}
