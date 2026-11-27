"use client";

import { useEffect, useRef } from "react";

/**
 * Homepage hero (references Hero_reference.mov + 706922fd-2.mp4)
 *  - an endless wall of game-video tiles, curved like the inside of a sphere:
 *    tiles tilt toward the viewer (and grow) the further they sit from the
 *    centre, which gives the skewed look
 *  - the wall drifts on its own; moving the cursor pans it to reveal more
 *  - scrolling pushes the tiles out toward the left/right edges while the
 *    headline + body fade in; scrolling further sends them fully off-screen
 */

const GAMES = [
  "window-pane-ting", "runespell", "papercut-io", "odd-things", "tiny-planet-chopper",
  "zombie-miner", "one-little-push", "impact-pong", "pottery-master-3d", "drift-market",
  "horizen", "frozen-harbor", "daydream-arena",
];

// layout on the 1440 × 830 design frame
const TW = 168; // tile width  (9:16 phone ratio, like the game videos)
const TH = 298; // tile height
const PX = 268; // column pitch
const PY = 372; // row pitch
const NC = 7; // columns (wrap width = NC * PX)
const NR = 4; // rows (wrap height = NR * PY)
const WW = NC * PX;
const WH = NR * PY;
const DRIFT_X = -26; // px/s auto drift
const DRIFT_Y = -9;
const PERSPECTIVE = 1100;

const wrap = (v: number, size: number) => ((((v + size / 2) % size) + size) % size) - size / 2;

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
    const base = tiles.map((t) => ({ x: Number(t.dataset.x), y: Number(t.dataset.y) }));
    const vids = tiles.map((t) => t.querySelector("video")!);

    let mx = 0, my = 0; // cursor target (-1..1)
    let cx = 0, cy = 0; // eased cursor
    let ox = 0, oy = 0; // drift offset
    let last = performance.now();
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / innerWidth) * 2 - 1;
      my = (e.clientY / innerHeight) * 2 - 1;
    };
    addEventListener("pointermove", onMove, { passive: true });

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - innerHeight; // scroll distance while pinned
      const p = Math.min(1, Math.max(0, -rect.top / total)); // 0 → 1
      const visible = rect.bottom > 0;

      if (visible) {
        // fit the 1440 × 830 design frame to cover the viewport
        const s = Math.max(innerWidth / 1440, innerHeight / 830);
        const hw = innerWidth / 2 / s; // half viewport, in design px
        const hh = innerHeight / 2 / s;

        if (!reduce) {
          ox += DRIFT_X * dt * (1 - p);
          oy += DRIFT_Y * dt * (1 - p);
          cx += (mx - cx) * 0.05;
          cy += (my - cy) * 0.05;
        }
        // cursor pans the wall: look toward where the pointer is
        const panX = -cx * 380 * (1 - p);
        const panY = -cy * 240 * (1 - p);
        const push = Math.pow(p, 1.3) * (hw + 400) * 1.15;
        const fade = 1 - Math.max(0, (p - 0.72) / 0.28);

        tiles.forEach((t, i) => {
          let x = wrap(base[i].x + ox + panX, WW);
          const y = wrap(base[i].y + oy + panY, WH);
          // scroll: split away from the centre line
          const side = x < 0 ? -1 : 1;
          x += side * push * (1 + Math.abs(x) / hw * 0.35);
          // concave wall: tilt + bring forward with distance from centre
          const nx = Math.max(-1.8, Math.min(1.8, x / hw));
          const ny = Math.max(-1.8, Math.min(1.8, y / hh));
          const z = Math.min(nx * nx + ny * ny, 3) * 85;
          const ry = -nx * 30;
          const rx = ny * 22;
          t.style.transform =
            `translate3d(${x * s - TW / 2}px, ${y * s - TH / 2}px, ${z * s}px) rotateY(${ry}deg) rotateX(${rx}deg) scale(${s})`;
          t.style.opacity = String(fade);
          const v = vids[i];
          if (p > 0.98) { if (!v.paused) v.pause(); } else if (v.paused) v.play().catch(() => {});
        });
      }

      // copy + navy glow fade in during the first part of the scroll
      const k = Math.min(1, Math.max(0, (p - 0.12) / 0.3));
      if (copy.current) {
        copy.current.style.opacity = String(k);
        copy.current.style.translate = `0 ${(1 - k) * 30}px`;
      }
      if (glow.current) glow.current.style.opacity = String(k);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
    };
  }, []);

  const cells: { key: string; x: number; y: number; game: string }[] = [];
  for (let c = 0; c < NC; c++)
    for (let r = 0; r < NR; r++)
      cells.push({
        key: `${c}-${r}`,
        x: -WW / 2 + PX / 2 + c * PX,
        // alternate columns sit half a row lower, like the reference
        y: -WH / 2 + PY / 2 + r * PY + (c % 2 ? PY / 2 : 0),
        game: GAMES[(c * NR + r) % GAMES.length],
      });

  return (
    <section ref={section} className="relative h-[260svh] bg-dark-navy">
      <div className="sticky top-0 h-svh overflow-hidden" style={{ perspective: PERSPECTIVE }}>
        {/* curved video wall */}
        <div ref={field} aria-hidden className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transformStyle: "preserve-3d" }}>
          {cells.map((cell) => (
            <div
              key={cell.key}
              data-tile
              data-x={cell.x}
              data-y={cell.y}
              className="absolute left-0 top-0 origin-center overflow-hidden rounded-[16px] bg-navy will-change-transform"
              style={{ width: TW, height: TH }}
            >
              <video
                src={`/video/games/${cell.game}.mp4`}
                poster={`/video/games/${cell.game}.jpg`}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                className="size-full object-cover"
              />
            </div>
          ))}
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
