"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Rotating game-card carousel (homepage hero + Alt 1).
 * Cards rotate right → left with a springy ease-in/ease-out, the centre card
 * lifts and plays its video, and every move gets a subtle random jitter
 * (tilt + bob) that settles — so it feels alive rather than mechanical.
 * Only the cards at the far left/right show their colour gradient overlay.
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

// Centre card is 252 × 536.5 (radius 20); others are scaled copies of it.
const W = 252;
const H = 536.5;
const SCALE = [1, 200 / 252, 160 / 252, 160 / 252];
const N = CARDS.length; // 7 → slots -3 … 3
const INTERVAL = 3200;

function slotOf(i: number, step: number) {
  let s = (((i - step) % N) + N) % N;
  if (s > 3) s -= N;
  return s;
}

/** Horizontal offset of each slot's centre from the carousel centre, for a given gap. */
function offsets(gap: number) {
  const w = SCALE.map((k) => W * k);
  const o1 = w[0] / 2 + gap + w[1] / 2;
  const o2 = o1 + w[1] / 2 + gap + w[2] / 2;
  const o3 = o2 + w[2] / 2 + gap + w[3] / 2;
  return [0, o1, o2, o3];
}

// deterministic pseudo-random so server and client agree
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export default function GameCarousel({
  top = 177,
  gap = 127,
  centerX = 720,
  scale = 1,
  start = 3,
}: {
  /** top of the 536.5px-tall row, in design px */
  top?: number;
  /** gap between cards (Figma: 127 on Alt 1, 72 on the homepage) */
  gap?: number;
  /** horizontal centre in design px */
  centerX?: number;
  /** overall size multiplier (mobile uses ~0.5) */
  scale?: number;
  /** index of the card that starts in the centre (2 = nose-fishing, 3 = Mimic Madness) */
  start?: number;
}) {
  const START = start;
  const reduce = useReducedMotion();
  const [step, setStep] = useState(START);
  const [entered, setEntered] = useState(false);
  const prevSlots = useRef<number[]>(CARDS.map((_, i) => slotOf(i, START)));
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const OFF = offsets(gap);

  // start once on screen; pause rotation while off screen
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setEntered(true);
        if (!reduce && !id) id = setInterval(() => setStep((s) => s + 1), INTERVAL);
      } else if (id) {
        clearInterval(id);
        id = undefined;
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      if (id) clearInterval(id);
    };
  }, [reduce]);

  const slots = CARDS.map((_, i) => slotOf(i, step));

  // Only the centre card plays; it restarts as it arrives
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (slots[i] === 0) {
        if (prevSlots.current[i] !== 0) v.currentTime = 0;
        v.play().catch(() => {});
      } else v.pause();
    });
    prevSlots.current = slots;
  });

  return (
    <div ref={root} className="pointer-events-none absolute inset-x-0" style={{ top, height: H * scale }}>
      {CARDS.map((c, i) => {
        const s = slots[i];
        const a = Math.abs(s);
        const k = SCALE[a] * scale;
        const x = centerX + Math.sign(s) * OFF[a] * scale - W / 2;
        const wrapped = Math.abs(s - prevSlots.current[i]) > 1; // jumped across the back, off-screen
        const isEdge = a >= 2;
        // per-move jitter: a small random tilt + bob that springs back to rest
        const r = rand(i * 31 + step * 7);
        const tilt = (r - 0.5) * (a === 0 ? 3 : 5);
        const bob = (rand(i * 17 + step * 13) - 0.5) * 14 * scale;
        const order = 3 - s; // entrance: right-most card first

        return (
          <motion.div
            key={i}
            className="absolute left-0 top-1/2 origin-center overflow-hidden bg-[#354ea7]"
            style={{
              width: W,
              height: H,
              marginTop: -H / 2,
              borderRadius: 20,
              zIndex: 10 - a,
              boxShadow: a === 0 ? "0 30px 60px -20px rgba(0,0,0,0.6)" : "none",
            }}
            initial={{ x: x + 160 * scale, scale: k, opacity: 0, rotate: 0, y: 0 }}
            animate={
              !entered
                ? { x: x + 160 * scale, scale: k, opacity: 0 }
                : reduce
                  ? { x, scale: k, opacity: 1, rotate: 0, y: 0 }
                  : {
                      x,
                      scale: a === 0 ? [k * 0.97, k * 1.03, k] : k,
                      opacity: 1,
                      rotate: [tilt, -tilt * 0.4, 0],
                      y: [bob, -bob * 0.5, 0],
                    }
            }
            transition={
              wrapped
                ? { duration: 0 }
                : {
                    x: { type: "spring", stiffness: 70, damping: 13, mass: 1, delay: entered && step === START ? order * 0.07 : 0 },
                    scale: { duration: 0.9, ease: [0.34, 1.56, 0.64, 1] },
                    rotate: { duration: 1.1, ease: "easeInOut", times: [0, 0.55, 1] },
                    y: { duration: 1.1, ease: "easeInOut", times: [0, 0.55, 1] },
                    opacity: { duration: 0.6, delay: entered && step === START ? order * 0.07 : 0 },
                  }
            }
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
          </motion.div>
        );
      })}
    </div>
  );
}
