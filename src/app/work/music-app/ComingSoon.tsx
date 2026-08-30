import Link from "next/link";
import Image from "next/image";

// Stands in for the Music App case on the deployed site while the case itself
// is still being worked on. See SHOW_MUSIC_APP_CASE: the case is not removed or
// hidden away on a branch, it simply is not what production renders yet.
//
// It borrows the page furniture from About Me rather than the case pages — the
// back arrow at the same 48 square in the same place — so arriving here from a
// home page card still feels like the same site, and the way out is where the
// eye already expects it.
export default function ComingSoon() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-6 pt-8 pb-16 md:px-11">
      <Link
        href="/"
        className="flex size-12 items-center justify-center rounded-[28px] transition-colors hover:bg-[#f5f5f5]"
        aria-label="Back to all works"
      >
        <Image src="/icons/back-arrow.svg" alt="" width={24} height={24} unoptimized />
      </Link>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 pb-24 text-center">
        <p
          className="text-[16px] text-black/50"
          style={{ fontFamily: "var(--font-inter-tight)", fontWeight: 500 }}
        >
          Music App — case study
        </p>
        <h1
          className="max-w-[560px] text-[32px] leading-[40px] text-[#171716] md:text-[40px] md:leading-[48px]"
          style={{ fontFamily: "var(--font-inter-tight)", fontWeight: 500, letterSpacing: "-1px" }}
        >
          This page is coming soon.
        </h1>
        <p
          className="max-w-[420px] text-[16px] leading-[24px] text-black/50"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          We&apos;ll build it together next.
        </p>
      </div>
    </main>
  );
}
