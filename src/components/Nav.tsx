"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const NAV_LINKS = [
  { href: "/our-story", label: "Our Story" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
  { href: "/press", label: "Press" },
];
export const PLAY_URL = "https://www.astrocade.com";

const PILL = "rounded-full border-[0.75px] border-[rgba(202,202,202,0.26)] bg-[rgba(4,14,34,0.55)] backdrop-blur-[14px]";

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`relative block h-6 w-[135.5px] ${className}`}>
      <img src="/img/logo-mark.svg" alt="" className="absolute left-0 top-0 h-6 w-[25px]" />
      <img src="/img/logo-wordmark.svg" alt="Astrocade" className="absolute left-[33.2px] top-[5.2px] h-[14.9px] w-[102.3px]" />
    </span>
  );
}

function PlayCta({ className = "" }: { className?: string }) {
  return (
    <a
      href={PLAY_URL}
      className={`flex h-12 items-center justify-center rounded-full px-4 text-[15px] font-medium text-dark-navy transition-[background-position] duration-500 hover:[background-position:0_100%] ${className}`}
      style={{ backgroundImage: "linear-gradient(180deg, #2be1a2 0%, #5578ff 50%, #5578ff 100%)", backgroundSize: "100% 200%" }}
    >
      Play Astrocade
    </a>
  );
}

/** Figma "Hero Alt" nav: logo pill · link pill · Play CTA. Fixed to the top. */
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 pt-4 lg:px-8 lg:pt-6">
        <Link href="/" aria-label="Astrocade home" className={`${PILL} flex h-12 items-center pb-2 pl-3 pr-5 pt-[5px]`}>
          <Logo />
        </Link>

        <nav className={`${PILL} absolute left-1/2 top-6 hidden h-12 -translate-x-1/2 items-center gap-8 px-6 text-[15px] font-medium text-white lg:flex`}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "grad-text bg-gradient-to-l from-violet to-pink" : "transition-opacity hover:opacity-60"}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <PlayCta className="hidden lg:flex" />
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className={`${PILL} flex size-12 items-center justify-center lg:hidden`}
        >
          <span className="flex w-4 flex-col gap-[5px]">
            <span className="h-[1.5px] rounded bg-white" />
            <span className="h-[1.5px] rounded bg-white" />
          </span>
        </button>
      </header>

      {/* mobile menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-[60] flex flex-col bg-navy transition-[opacity,visibility] duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="flex items-center justify-between px-5 pt-4">
          <span className={`${PILL} flex h-12 items-center pb-2 pl-3 pr-5 pt-[5px]`}>
            <Logo />
          </span>
          <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className={`${PILL} flex size-12 items-center justify-center text-xl text-white`}>
            ✕
          </button>
        </div>
        <nav className="flex flex-1 flex-col items-center justify-center gap-12 text-[32px] font-medium tracking-[-0.06em]">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="px-10 pb-10">
          <PlayCta className="w-full" />
        </div>
      </div>
    </>
  );
}
