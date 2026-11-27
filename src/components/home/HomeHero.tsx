"use client";

import { useEffect, useRef } from "react";

/**
 * Homepage hero (Figma "Hero" → "Hero" scroll states, reference Hero_reference.mov)
 *  - a skewed field of game videos fills the screen
 *  - moving the cursor pans the field, revealing more videos
 *  - scrolling pushes the videos out toward the left/right edges while the
 *    headline + body fade in; scrolling further sends them fully off-screen
 */

const GAMES = [
  "window-pane-ting", "runespell", "papercut-io", "odd-things", "tiny-planet-chopper",
  "zombie-miner", "one-little-push", "impact-pong", "pottery-master-3d", "drift-market",
  "horizen", "frozen-harbor", "daydream-arena",
];

// Figma grid: 250 × 444 tiles, column pitch 410, row pitch 588, odd columns offset by -295
const TW = 250;
const TH = 444;
const COL = 410;
const ROW = 588;
// a wider field than the screen so the cursor can reveal more
const COLS = [-1, 0, 1, 2, 3, 4]; // ×410 from x=-20
const ROWS = [-1, 0, 1, 2];

export default function HomeHero() {
  const section = useRef<HTMLElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const sec = section.current!;
    const fld = field.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tiles = [...fld.querySelectorAll<HTMLElement>("[data-tile]")];
    const vids = tiles.map((t) => t.querySelector("video")!);

    let mx = 0, my = 0; // cursor target (-1..1)
    let cx = 0, cy = 0; // eased cursor
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / innerWidth) * 2 - 1;
      my = (e.clientY / innerHeight) * 2 - 1;
    };
    addEventListener("pointermove", onMove, { passive: true });

    const frame = () => {
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - innerHeight; // scroll distance while pinned
      const p = Math.min(1, Math.max(0, -rect.top / total)); // 0 → 1

      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      const panX = reduce ? 0 : -cx * 260 * (1 - p);
      const panY = reduce ? 0 : -cy * 180 * (1 - p);
      fld.style.translate = `${panX}px ${panY}px`;

      // split: tiles left of centre slide left, right of centre slide right
      const vw = innerWidth;
      const push = Math.pow(p, 1.4) * vw * 0.95;
      tiles.forEach((t, i) => {
        const side = Number(t.dataset.side); // -1 | 1
        const lane = Number(t.dataset.lane); // 0 = closest to centre
        const k = 1 + lane * 0.18;
        t.style.translate = `${side * push * k}px 0`;
        t.style.opacity = String(1 - Math.max(0, (p - 0.7) / 0.3));
        const v = vids[i];
        if (p > 0.98) { if (!v.paused) v.pause(); } else if (v.paused) v.play().catch(() => {});
      });

      // copy + navy glow fade in during the first part of the scroll
      const t = Math.min(1, Math.max(0, (p - 0.12) / 0.3));
      if (copy.current) {
        copy.current.style.opacity = String(t);
        copy.current.style.translate = `0 ${(1 - t) * 30}px`;
      }
      if (glow.current) glow.current.style.opacity = String(t);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
    };
  }, []);

  let n = 0;
  return (
    <section ref={section} className="relative h-[260svh] bg-dark-navy">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* skewed video field */}
        <div className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transform: "rotate(-14deg) skewX(10deg) scale(var(--hero-scale, 1))" }}>
          <div ref={field} className="absolute left-0 top-0 will-change-transform">
            {COLS.map((c) =>
              ROWS.map((r) => {
                const x = -720 - 20 + c * COL; // centred on the 1440 frame
                const y = -415 - 101 + r * ROW + (((c % 2) + 2) % 2 === 0 ? 0 : -295);
                const cxTile = x + TW / 2;
                const side = cxTile < 0 ? -1 : 1;
                const lane = Math.floor(Math.abs(cxTile) / COL);
                const game = GAMES[n++ % GAMES.length];
                return (
                  <div
                    key={`${c}-${r}`}
                    data-tile
                    data-side={side}
                    data-lane={lane}
                    className="absolute overflow-hidden rounded-[20px] bg-navy will-change-transform"
                    style={{ left: x, top: y, width: TW, height: TH }}
                  >
                    <video
                      src={`/video/games/${game}.mp4`}
                      poster={`/video/games/${game}.jpg`}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                      className="size-full object-cover"
                    />
                  </div>
                );
              }),
            )}
          </div>
        </div>

        {/* navy glow + copy (Figma Ellipse 1 + Content) */}
        <img
          ref={glow}
          src="/img/hero-glow.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 w-[1655px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-0"
        />
        <div
          ref={copy}
          className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-6 px-5 text-center opacity-0 drop-shadow-[0_4px_42px_#040e22] lg:gap-10"
        >
          <h1 className="text-[48px] font-medium leading-[0.95] tracking-[-0.035em] sm:text-[64px] lg:text-[88px]">
            Where the Internet
            <span className="grad-text -mb-[0.2em] block pb-[0.2em]" style={{ backgroundImage: "linear-gradient(253.26deg, #c42fed 0.94%, #ff4288 98.94%)" }}>
              comes to play.
            </span>
          </h1>
          <p className="max-w-[520px] text-[17px] leading-[1.55] text-white lg:text-[20px]">
            Astrocade is where anyone can create, share, and play games and interactive content
          </p>
        </div>
      </div>
    </section>
  );
}
