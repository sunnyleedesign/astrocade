"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
  { href: "/press", label: "Press" },
];

export const PLAY_URL = "https://www.astrocade.com";

type Tone = "dark" | "light";

export function Logo({ tone = "dark", className = "" }: { tone?: Tone; className?: string }) {
  return (
    <Link href="/" aria-label="Astrocade home" className={`relative block h-[30px] w-[169.4px] ${className}`}>
      <img src="/img/shared/logo-mark.svg" alt="" className="absolute left-0 top-0 h-[30px] w-[31.2px]" />
      <img
        src={tone === "dark" ? "/img/shared/logo-wordmark.svg" : "/img/about/logo-wordmark-dark.svg"}
        alt="Astrocade"
        className="absolute left-[41.5px] top-[6.5px] h-[18.5px] w-[127.9px]"
      />
    </Link>
  );
}

/** "Play Astrocade" pill — gradient slides to solid blue on hover (Figma: CTA Hover). */
export function PlayCta({ className = "", large = false }: { className?: string; large?: boolean }) {
  return (
    <a
      href={PLAY_URL}
      className={`group inline-flex items-center justify-center gap-1 rounded-full px-4 text-[15px] font-medium text-dark-navy transition-[background-position] duration-500 ease-out hover:[background-position:0_100%] ${
        large ? "py-5" : "h-[47px]"
      } ${className}`}
      style={{
        backgroundImage: "linear-gradient(180deg, #2be1a2 0%, #5578ff 50%, #5578ff 100%)",
        backgroundSize: "100% 200%",
        backgroundPosition: "0 0",
      }}
    >
      <img
        src="/img/shared/symbol-small.svg"
        alt=""
        className="h-5 w-[20.8px] transition-transform duration-500 ease-[var(--ease-back)] group-hover:rotate-[20deg] group-hover:scale-110"
      />
      <span>Play Astrocade</span>
    </a>
  );
}

function useActive() {
  const pathname = usePathname();
  return (href: string) => pathname === href || pathname?.startsWith(href + "/");
}

/** Desktop nav, positioned in 1440 canvas coordinates (place at top:24 left:32). */
export function DesktopNav({ tone = "dark" }: { tone?: Tone }) {
  const isActive = useActive();
  return (
    <header className="absolute left-[32.37px] top-[24px] z-30 h-[47px] w-[1374px]">
      <Logo tone={tone} className="absolute left-0 top-[9px]" />
      <nav
        className={`absolute left-[calc(50%+1.13px)] top-[6px] flex w-[339px] -translate-x-1/2 items-center justify-center gap-8 rounded-full border-[0.75px] border-[rgba(202,202,202,0.26)] px-6 py-[6px] text-[15px] font-medium ${
          tone === "dark" ? "bg-[rgba(4,14,34,0.15)] text-white" : "bg-white text-dark-navy"
        }`}
      >
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={
              isActive(l.href)
                ? "grad-text bg-gradient-to-l from-violet to-pink"
                : "transition-opacity hover:opacity-60"
            }
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <PlayCta className="absolute left-[1205.63px] top-0 w-[170.8px]" />
    </header>
  );
}

/** Mobile header + full-screen menu (Figma: Mobile / Nav Open). */
export function MobileNav({ tone = "dark" }: { tone?: Tone }) {
  const [open, setOpen] = useState(false);
  const isActive = useActive();
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="relative z-30 flex items-center justify-between px-5 pt-4">
        <Logo tone={tone} />
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className={`flex size-10 items-center justify-center rounded-full border-[0.75px] border-[rgba(202,202,202,0.26)] ${
            tone === "dark" ? "bg-[rgba(4,14,34,0.15)]" : "bg-dark-navy"
          }`}
        >
          <img src="/img/shared/menu.svg" alt="" className="h-[7.5px] w-[16.7px]" />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-50 flex flex-col bg-navy transition-[opacity,visibility] duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between px-5 pt-4">
          <Logo />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex size-10 items-center justify-center rounded-full border-[0.75px] border-[rgba(202,202,202,0.26)] bg-[rgba(4,14,34,0.15)]"
          >
            <img src="/img/shared/close.svg" alt="" className="size-[11px]" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col items-center justify-center gap-14 pb-10 text-[32px] font-medium leading-[0.95] tracking-[-0.06em]">
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`transition-all duration-500 ease-[var(--ease-out-expo)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              } ${isActive(l.href) ? "grad-text bg-gradient-to-l from-violet to-pink" : "text-white"}`}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="px-10 pb-10">
          <PlayCta large className="w-full" />
        </div>
      </div>
    </>
  );
}
