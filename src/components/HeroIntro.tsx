"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Hero intro (Figma "Hero Alt" → "Hero", reference 1.mp4):
 *  1. three rows of game videos glide sideways — row 1 right→left, row 2
 *     left→right, row 3 right→left — while individual tiles flicker on and off
 *     with a quick glitchy jitter
 *  2. every tile clears
 *  3. the headline + body copy fade up and stay
 */

const GAMES = [
  "window-pane-ting", "runespell", "papercut-io", "odd-things", "tiny-planet-chopper",
  "zombie-miner", "one-little-push", "impact-pong", "pottery-master-3d", "drift-market",
  "horizen", "frozen-harbor", "daydream-arena",
];

// Figma grid (1440 × 830 frame): 187 × 333 tiles, 40px gaps
const W = 187;
const H = 333;
const PITCH = W + 40;
const ROWS = [-124, 249, 622];
const DIRS = [-1, 1, -1]; // -1 = right→left
const PER_ROW = 9; // 9 × 227 = 2043px > 1440 viewport, doubled for a seamless loop
const SPEED = 130; // px/s (measured from the reference, scaled to the 1440 grid)

const TWINKLE_MS = 6000;
const TICK_MS = 240; // one tile toggles every tick
const FADE_STEP_MS = 280; // exit: one tile disappears per step

type Phase = "twinkle" | "clear" | "text";

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function HeroIntro() {
  const [phase, setPhase] = useState<Phase>("twinkle");
  // on/off per tile: rows × PER_ROW (the duplicated half mirrors it so the loop stays seamless)
  const initial = useMemo(() => {
    const r = rng(3);
    return ROWS.map(() => Array.from({ length: PER_ROW }, () => r() < 0.3));
  }, []);
  const [on, setOn] = useState(initial);
  // latest on/off grid for the interval callbacks
  const onRef = useRef(initial);
  useEffect(() => {
    onRef.current = on;
  }, [on]);
  const [scale, setScale] = useState(1);
  const box = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(Math.max(el.clientWidth / 1440, el.clientHeight / 830, 0.42));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("text");
      return;
    }
    const rand = rng(11);
    const section = box.current!;
    // measure where each tile is right now: distance from the horizontal centre (0 = centre, 1 = edge)
    const measure = () => {
      const w = section.clientWidth;
      const h = section.clientHeight;
      const rect = section.getBoundingClientRect();
      return [...section.querySelectorAll<HTMLElement>("[data-tile]")].map((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2 - rect.left;
        const cy = r.top + r.height / 2 - rect.top;
        return {
          ri: Number(el.dataset.r),
          ci: Number(el.dataset.c),
          dist: Math.abs(cx - w / 2) / (w / 2),
          inView: cx > -r.width / 2 && cx < w + r.width / 2 && cy > -r.height / 2 && cy < h + r.height / 2,
        };
      });
    };
    const set = (ri: number, ci: number, v: boolean) =>
      setOn((prev) => prev.map((row, i) => (i === ri ? row.map((x, j) => (j === ci ? v : x)) : row)));

    // twinkle: keep a handful of tiles lit, mostly around the middle; edges stay empty
    const TARGET = 6;
    const cur = () => onRef.current;
    const tick = setInterval(() => {
      const tiles = measure();
      const lit = tiles.filter((t) => t.inView && cur()[t.ri][t.ci]);
      // anything drifting toward the edges flickers out
      const edge = lit.find((t) => t.dist > 0.72);
      if (edge) return set(edge.ri, edge.ci, false);
      if (lit.length < TARGET || rand() < 0.35) {
        const pool = tiles.filter((t) => t.inView && !cur()[t.ri][t.ci] && t.dist < 0.55);
        if (pool.length) {
          const t = pool[Math.floor(rand() * pool.length)];
          return set(t.ri, t.ci, true);
        }
      }
      if (lit.length) {
        const t = lit[Math.floor(rand() * lit.length)];
        set(t.ri, t.ci, false);
      }
    }, TICK_MS);

    // exit: tiles fade out one by one, the headline comes in as the last ones go
    let fade: ReturnType<typeof setInterval> | undefined;
    let text: ReturnType<typeof setTimeout> | undefined;
    const clear = setTimeout(() => {
      clearInterval(tick);
      setPhase("clear");
      fade = setInterval(() => {
        const lit = measure().filter((t) => cur()[t.ri][t.ci]);
        if (lit.length <= 2 && !text) text = setTimeout(() => setPhase("text"), 250);
        if (!lit.length) return clearInterval(fade);
        const t = lit[Math.floor(rand() * lit.length)];
        set(t.ri, t.ci, false);
      }, FADE_STEP_MS);
    }, TWINKLE_MS);

    return () => {
      clearInterval(tick);
      clearTimeout(clear);
      if (fade) clearInterval(fade);
      if (text) clearTimeout(text);
    };
  }, [initial]);


  const loopSec = (PER_ROW * PITCH) / SPEED;

  return (
    <section ref={box} className="relative h-svh min-h-[640px] w-full overflow-hidden bg-dark-navy">
      {/* gliding video rows */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[830px] w-[1440px] origin-center"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        {ROWS.map((top, ri) => (
          <div
            key={ri}
            className="hero-row absolute left-0 flex"
            style={{
              top,
              gap: 40,
              animationDuration: `${loopSec}s`,
              animationDirection: DIRS[ri] === -1 ? "normal" : "reverse",
              // start the row offset so tiles don't line up column-to-column
              animationDelay: `${-loopSec * (ri * 0.37)}s`,
            }}
          >
            {[0, 1].map((half) =>
              Array.from({ length: PER_ROW }, (_, ci) => {
                const game = GAMES[(ri * 5 + ci * 3) % GAMES.length];
                return (
                  <Tile
                    key={`${half}-${ci}`}
                    game={game}
                    on={on[ri][ci] && phase !== "text"}
                    r={ri}
                    c={ci}
                    seed={ri * 31 + ci * 7 + half}
                  />
                );
              }),
            )}
          </div>
        ))}
      </div>

      {/* navy glow behind the copy (Figma Ellipse 1) */}
      <img
        src="/img/hero-glow.svg"
        alt=""
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-[calc(50%+40px)] w-[1655px] max-w-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${phase === "text" ? "opacity-100" : "opacity-0"}`}
      />

      {/* headline + body: appear after the tiles clear, then stay */}
      <div className="absolute inset-x-0 top-[calc(50%+40px)] flex -translate-y-1/2 flex-col items-center gap-6 px-5 text-center lg:gap-10">
        <h1 className="text-[48px] font-medium leading-[0.95] tracking-[-0.035em] sm:text-[72px] lg:text-[104px]">
          <Reveal show={phase === "text"} delay={0}>
            Where the Internet
          </Reveal>
          <Reveal show={phase === "text"} delay={150}>
            <span className="grad-text block pb-[0.2em] -mb-[0.2em]" style={{ backgroundImage: "linear-gradient(255.7deg, #c42fed 0.94%, #ff4288 98.94%)" }}>
              comes to play.
            </span>
          </Reveal>
        </h1>
        <Reveal show={phase === "text"} delay={300} className="max-w-[520px] text-[17px] leading-[1.55] text-white lg:text-[20px]">
          Astrocade is where anyone can create, share, and play games and interactive content
        </Reveal>
      </div>
    </section>
  );
}

function Tile({ game, on, seed, r, c }: { game: string; on: boolean; seed: number; r: number; c: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (on) v.play().catch(() => {});
    else {
      const t = setTimeout(() => v.pause(), 400);
      return () => clearTimeout(t);
    }
  }, [on]);
  return (
    <div
      data-tile
      data-r={r}
      data-c={c}
      className={`relative shrink-0 overflow-hidden rounded-[20px] bg-navy ${on ? "tile-on" : "tile-off"}`}
      style={{ width: W, height: H, ["--jx" as string]: `${((seed * 37) % 7) - 3}px`, ["--jy" as string]: `${((seed * 53) % 7) - 3}px` }}
    >
      <video
        ref={ref}
        src={`/video/games/${game}.mp4`}
        poster={`/video/games/${game}.jpg`}
        muted
        loop
        playsInline
        preload="auto"
        className="size-full object-cover"
      />
    </div>
  );
}

function Reveal({ show, delay, className = "", children }: { show: boolean; delay: number; className?: string; children: React.ReactNode }) {
  return (
    <span
      className={`block ${className}`}
      style={{
        opacity: show ? 1 : 0,
        translate: show ? "0 0" : "0 32px",
        transition: `opacity 0.8s ease ${delay}ms, translate 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </span>
  );
}
