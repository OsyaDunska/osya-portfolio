import Image from "next/image";
import { socialLinks } from "@/lib/links";

// Exported from Figma and kept in the repo. The MCP asset URLs these came
// from expire seven days after they are issued, which would have taken the
// icons off both pages that use this component with no change to the code.
const linkedinIcon = "/icons/linkedin.svg";
const telegramIcon = "/icons/telegram.svg";
const whatsappIcon = "/icons/whatsapp.svg";

export default function SocialButtons({ className = "" }: { className?: string }) {
  const buttons = [
    { href: socialLinks.linkedin, label: "LinkedIn", icon: linkedinIcon, w: 16.667, h: 16.667, offsetY: -1.5 },
    { href: socialLinks.telegram, label: "Telegram", icon: telegramIcon, w: 19.2, h: 16, offsetY: 0 },
    { href: socialLinks.whatsapp, label: "Whatsapp", icon: whatsappIcon, w: 20.5, h: 20.6, offsetY: 0 },
  ];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {buttons.map(({ href, label, icon, w, h, offsetY }) => (
        <a
          
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          // Three of these with their labels come to 424, and a 390 phone has
          // 342 between the gutters — so the row pushed the document wider than
          // the window and the whole page slid sideways. The mobile draft,
          // 6942:5321, drops the labels and keeps everything else: 20 of
          // padding either side of a 20 icon is 60, three of them on 10 of gap
          // is 200, centred in the 390. So only the label moves.
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#292621] px-5 text-[15px] font-medium text-white transition-colors hover:bg-[#171716]"
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
          <span className="hidden md:inline">{label}</span>
        </a>
      ))}
    </div>
  );
}
