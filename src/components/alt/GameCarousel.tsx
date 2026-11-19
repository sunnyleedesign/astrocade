"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Alt 1 — rotating game carousel (Figma "Alt 1").
 * Cards rotate right → left. The center card is largest and plays its video;
 * only the cards at the left/right edges show their colour gradient overlay.
 */

type Card = { src: string; video?: string; overlay: string };

const CARDS: Card[] = [
  { src: "/img/alt1/bce44.webp", overlay: "linear-gradient(180deg, rgba(0,180,235,0.8), rgba(183,71,255,0.8))" },
  { src: "/img/alt1/6a868.webp", overlay: "linear-gradient(269.42deg, rgba(255,66,136,0.8) 0.94%, rgba(255,170,93,0.8) 98.94%)" },
  { src: "/video/nose-fishing-poster.jpg", video: "/video/nose-fishing.mp4", overlay: "linear-gradient(180deg, rgba(43,225,162,0.8), rgba(85,120,255,0.8))" },
  { src: "/video/app-poster.jpg", video: "/video/app.mp4", overlay: "linear-gradient(90deg, rgba(85,120,255,0.8), rgba(196,47,237,0.8))" },
  { src: "/img/alt1/3e474.webp", overlay: "linear-gradient(269.42deg, rgba(255,170,93,0.8) 0.94%, rgba(255,66,136,0.8) 98.94%)" },
  { src: "/img/alt1/db11b.webp", overlay: "linear-gradient(90deg, rgba(85,120,255,0.8), rgba(43,225,162,0.8) 95.81%)" },
  { src: "/img/alt1/add58.webp", overlay: "linear-gradient(4.2deg, rgba(255,66,136,0.8) 2.43%, rgba(196,47,237,0.8) 75.94%)" },
];

// Slot geometry from Figma (1440 canvas, 127px gaps, centred on x=720)
const SIZE: Record<number, { w: number; h: number; r: number }> = {
  0: { w: 252, h: 536.5, r: 20 },
  1: { w: 200, h: 425.8, r: 15.87 },
  2: { w: 160, h: 340.6, r: 12.7 },
  3: { w: 160, h: 340.6, r: 12.7 },
};
const CENTER_X: Record<number, number> = { 0: 720, 1: 1073, 2: 1380, 3: 1667 };

const N = CARDS.length; // 7 → slots -3 … 3
const START = 3; // Figma shows card index 3 (Mimic Madness) in the centre
const INTERVAL = 3200;

function slotOf(i: number, step: number) {
  let s = (((i - step) % N) + N) % N; // 0 … 6
  if (s > 3) s -= N; // -3 … 3
  return s;
}

export default function GameCarousel({ top = 177, rowHeight = 536.5 }: { top?: number; rowHeight?: number }) {
  const [step, setStep] = useState(START);
  const [entered, setEntered] = useState(false);
  const prevSlots = useRef<number[]>(CARDS.map((_, i) => slotOf(i, START)));
  const videos = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 50);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = reduce ? undefined : setInterval(() => setStep((s) => s + 1), INTERVAL);
    return () => {
      clearTimeout(t);
      if (id) clearInterval(id);
    };
  }, []);

  const slots = CARDS.map((_, i) => slotOf(i, step));

  // Only the centre card plays
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (slots[i] === 0) {
        if (prevSlots.current[i] !== 0) v.currentTime = 0; // start fresh as it reaches the centre
        v.play().catch(() => {});
      } else v.pause();
    });
    prevSlots.current = slots;
  });

  return (
    <div className="absolute inset-x-0" style={{ top, height: rowHeight }}>
      {CARDS.map((c, i) => {
        const s = slots[i];
        const size = SIZE[Math.abs(s)];
        const cx = s >= 0 ? CENTER_X[s] : 1440 - CENTER_X[-s];
        // a card wrapping from far left to far right jumps instantly (it's off-screen)
        const wrapped = Math.abs(s - prevSlots.current[i]) > 1;
        const isEdge = Math.abs(s) >= 2;
        // entrance: cards slide in from the right, one after another
        const order = 3 - s; // right-most first
        return (
          <div
            key={i}
            className="absolute top-1/2 overflow-hidden bg-[#354ea7]"
            style={{
              left: cx - size.w / 2,
              width: size.w,
              height: size.h,
              borderRadius: size.r,
              translate: entered ? "0 -50%" : "160px -50%",
              opacity: entered ? 1 : 0,
              zIndex: 10 - Math.abs(s),
              transition: wrapped
                ? "none"
                : `left 0.9s cubic-bezier(0.65,0,0.35,1), width 0.9s cubic-bezier(0.65,0,0.35,1), height 0.9s cubic-bezier(0.65,0,0.35,1), border-radius 0.9s, translate 0.9s cubic-bezier(0.16,1,0.3,1) ${order * 0.08}s, opacity 0.6s ease ${order * 0.08}s`,
            }}
          >
            {c.video ? (
              <video
                ref={(el) => {
                  videos.current[i] = el;
                }}
                src={c.video}
                poster={c.src}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              <img src={c.src} alt="" className="absolute inset-0 size-full object-cover" />
            )}
            <div
              aria-hidden
              className="absolute inset-0 transition-opacity duration-700"
              style={{ backgroundImage: c.overlay, opacity: isEdge ? 1 : 0 }}
            />
          </div>
        );
      })}
    </div>
  );
}
