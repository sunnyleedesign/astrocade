"use client";

import { useState, type CSSProperties } from "react";
import type { Leader } from "@/content/leaders";

/** Leadership card: photo by default, flips to the bio on click (Figma: CEO n click). */
export function LeaderCard({
  leader,
  className = "",
  style,
  compact = false,
}: {
  leader: Leader;
  className?: string;
  style?: CSSProperties;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      aria-label={`${open ? "Close" : "Read"} bio: ${leader.name}`}
      className={`group relative block overflow-hidden rounded-[20px] text-left ${className}`}
      style={style}
    >
      {/* Photo side */}
      <div className="absolute inset-0" style={{ backgroundImage: leader.bg }}>
        <img
          src={leader.photo}
          alt={leader.name}
          className={`transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04] ${leader.imgClass ?? ""}`}
          style={leader.imgStyle}
        />
        {/* name + role (Figma "Bio"); the plus button sits on the right */}
        <div className="absolute bottom-[20px] left-5 right-[68px] flex flex-col text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
          <span className={`-mb-1 font-semibold ${compact ? "text-[22px]" : "text-[24px]"}`}>{leader.name}</span>
          <span className="text-[17px] leading-[1.7]">{leader.role}</span>
        </div>
      </div>

      {/* Bio side */}
      <div
        className={`absolute inset-0 flex flex-col justify-end rounded-[16px] text-dark-navy transition-[opacity,clip-path] duration-500 ease-[var(--ease-out-expo)] ${
          compact ? "px-5 pb-6" : "px-5 pb-[24px]"
        } ${open ? "opacity-100 [clip-path:circle(150%_at_calc(100%-48px)_48px)]" : "pointer-events-none opacity-0 [clip-path:circle(0%_at_calc(100%-48px)_48px)]"}`}
        style={{ backgroundImage: leader.bioBg }}
      >
        <div
          className={`flex flex-col gap-6 transition-all delay-150 duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <div className="flex flex-col">
            <p className="-mb-1 text-[24px] font-semibold">{leader.name}</p>
            <p className="text-[17px] leading-[1.7]">{leader.role}</p>
          </div>
          <p className="text-[18px] leading-[1.4]">{leader.bio}</p>
        </div>
      </div>

      {/* Plus ↔ close toggle */}
      <span
        className={`absolute flex size-10 items-center justify-center rounded-full backdrop-blur-[14px] transition-all duration-500 ease-[var(--ease-out-expo)] ${
          open ? "right-[28px] top-[28px] bg-[rgba(4,14,34,0.2)]" : "bottom-[28px] right-5 top-auto bg-[rgba(240,241,234,0.2)] group-hover:bg-[rgba(240,241,234,0.35)]"
        }`}
        style={open ? { bottom: "auto" } : undefined}
      >
        <img
          src="/img/about/plus.svg"
          alt=""
          className={`size-4 transition-transform duration-500 ${open ? "rotate-45" : "rotate-0"}`}
        />
      </span>
    </button>
  );
}
