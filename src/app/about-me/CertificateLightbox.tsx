"use client";

import { useState } from "react";
import Image from "next/image";

// Тут 3 сертифікати. Поки що всі використовують один і той самий файл —
// коли будуть готові інші два, просто заміни шлях у відповідному рядку
// (наприклад на /certificates/ux-research.jpg тощо).
const CERTIFICATES = [
  { id: 1, src: "/certificates/ui-ux-po-lyudsky.jpg", alt: "UI/UX Design po-ludski certificate" },
  { id: 2, src: "/certificates/ui-ux-po-lyudsky.jpg", alt: "Certificate 2" },
  { id: 3, src: "/certificates/ui-ux-po-lyudsky.jpg", alt: "Certificate 3" },
];

// Exported from Figma and kept in the repo — the MCP asset URLs expire.
const crossIconDefault = "/icons/close.svg";
const crossIconHover = "/icons/close-hover.svg";

export default function CertificateLightbox() {
  const [openId, setOpenId] = useState<number | null>(null);
  const openCertificate = CERTIFICATES.find((c) => c.id === openId);

  return (
    <>
      <div className="flex gap-4 items-center">
        {CERTIFICATES.map((cert) => (
          <button
            key={cert.id}
            type="button"
            onClick={() => setOpenId(cert.id)}
            className="relative h-[224px] w-[162px] overflow-hidden bg-[#bcbcbc] shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#589cf9]"
            aria-label={`Open ${cert.alt}`}
          >
            <Image src={cert.src} alt={cert.alt} fill className="object-cover" />
          </button>
        ))}
      </div>

      {openCertificate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#292621]/40 p-6"
          onClick={() => setOpenId(null)}
        >
          <div
            className="relative w-full max-w-[506px] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[506/700] overflow-hidden bg-white">
              <Image
                src={openCertificate.src}
                alt={openCertificate.alt}
                fill
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => setOpenId(null)}
              className="group absolute top-full left-1/2 -translate-x-1/2 mt-6 flex items-center justify-center w-12 h-12 rounded-[24px] bg-white hover:bg-[#292621] transition-colors drop-shadow-[0px_4px_2px_rgba(133,131,131,0.25)]"
              aria-label="Close"
            >
              <span className="relative w-4 h-4">
                <Image
                  src={crossIconDefault}
                  alt=""
                  fill
                  unoptimized
                  className="opacity-100 group-hover:opacity-0 transition-opacity"
                />
                <Image
                  src={crossIconHover}
                  alt=""
                  fill
                  unoptimized
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
