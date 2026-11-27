"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero intro (Figma "Hero Alt" → "Hero", reference 1.mp4):
 *  1. game videos twinkle in and out at random spots on a 4 × 3 grid
 *  2. every tile clears
 *  3. the headline + body copy fade up and stay
 */

const GAMES = [
  "window-pane-ting", "runespell", "papercut-io", "odd-things",
  "tiny-planet-chopper", "zombie-miner", "one-little-push", "impact-pong",
  "pottery-master-3d", "drift-market", "horizen", "frozen-harbor",
  "daydream-arena",
];

// Figma grid (1440 × 830 frame): 187 × 333 tiles, 40px gaps
const COLS = [286, 513, 740, 967];
const ROWS = [-124, 249, 622];
const W = 187;
const H = 333;

const TWINKLE_MS = 5200; // how long tiles twinkle before clearing
const TICK_MS = 260; // one tile changes every tick
const CLEAR_MS = 500;

type Phase = "twinkle" | "clear" | "text";

// deterministic pseudo-random so server and client render the same first frame
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function HeroIntro() {
  const [phase, setPhase] = useState<Phase>("twinkle");
  // which game each of the 12 slots shows, and whether it's visible
  const [slots, setSlots] = useState(() => GAMES.slice(0, 12).map((g, i) => ({ game: g, on: [1, 3, 5, 6, 8, 11].includes(i) })));
  const [scale, setScale] = useState(1);
  const box = useRef<HTMLDivElement>(null);

  // fit the 1440 × 830 grid to the hero (cover width, keep tiles readable on phones)
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
    const rand = rng(7);
    let next = 12; // next game to swap in (cycles through all 13)
    const tick = setInterval(() => {
      setSlots((prev) => {
        const i = Math.floor(rand() * 12);
        const s = [...prev];
        if (s[i].on) s[i] = { ...s[i], on: false };
        else {
          s[i] = { game: GAMES[next % GAMES.length], on: true };
          next++;
        }
        return s;
      });
    }, TICK_MS);
    const clear = setTimeout(() => {
      clearInterval(tick);
      setPhase("clear");
      setSlots((prev) => prev.map((s) => ({ ...s, on: false })));
    }, TWINKLE_MS);
    const text = setTimeout(() => setPhase("text"), TWINKLE_MS + CLEAR_MS);
    return () => {
      clearInterval(tick);
      clearTimeout(clear);
      clearTimeout(text);
    };
  }, []);

  return (
    <section ref={box} className="relative h-svh min-h-[640px] w-full overflow-hidden bg-dark-navy">
      {/* video tiles */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[830px] w-[1440px] origin-center"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        {slots.map((s, i) => (
          <Tile key={i} game={s.game} on={s.on && phase === "twinkle"} left={COLS[i % 4]} top={ROWS[Math.floor(i / 4)]} />
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

function Tile({ game, on, left, top }: { game: string; on: boolean; left: number; top: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (on) v.play().catch(() => {});
    else {
      const t = setTimeout(() => v.pause(), 400);
      return () => clearTimeout(t);
    }
  }, [on, game]);
  return (
    <div
      className="absolute overflow-hidden rounded-[20px] bg-navy"
      style={{
        left,
        top,
        width: W,
        height: H,
        opacity: on ? 1 : 0,
        scale: on ? "1" : "0.9",
        transition: "opacity 0.35s ease, scale 0.45s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      <video
        ref={ref}
        key={game}
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
