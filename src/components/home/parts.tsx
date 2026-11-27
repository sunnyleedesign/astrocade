"use client";

import Swoosh from "./Swoosh";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Glue the last two words together so a paragraph never ends on a lone word
 *  (backs up `text-wrap: pretty`, which not every browser supports yet). */
const noOrphan = (text: string) => text.replace(/\s+(\S+)\s*$/, "\u00a0$1");

/* ───────────── Stat number: ticks up while its gradient sweeps in ───────────── */
export function StatTicker({ value, suffix, grad, delay = 0, className = "" }: { value: number; suffix: string; grad: string; delay?: number; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [n, setN] = useState(0);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current!;
    let raf = 0;
    let t: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setN(value);
        setOn(true);
        return;
      }
      t = setTimeout(() => {
        setOn(true);
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1800);
          setN(Math.round((1 - Math.pow(1 - p, 4)) * value));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }, delay);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [value, delay]);
  return (
    <p
      ref={ref}
      aria-label={`${value}${suffix}`}
      className={`grad-text tabular-nums ${className}`}
      style={{
        backgroundImage: `${grad}, linear-gradient(#fff, #fff)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: on ? "100% 100%, 100% 100%" : "0% 100%, 100% 100%",
        opacity: on ? 1 : 0.15,
        transition: "background-size 1.8s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease",
      }}
    >
      {n}
      {suffix}
    </p>
  );
}

/* ───────────── Why now / What we are / Why we win ───────────── */
const STORY = [
  {
    title: ["Why now."],
    body: [
      "First, came text. Then photos, and videos. Each was a new way to create, and each took off only when technology could put it in everyone’s hands. Once everyone’s phone had a camera, photos and videos became the dominant forms of expression. Today, AI is doing the same for interactive content. For the first time in more than a decade, a truly new content category is emerging.",
      "Making something people can play, explore, or even just chat with used to take an entire team of coders, artists, musicians, and designers. Now all it takes is an idea —and Astrocade is where people share it.",
    ],
    video: "daydream-arena",
    swoosh: { name: "whynow" as const, box: { left: 602, top: 295, width: 3398, height: 631 }, img: { width: 3379, height: 452 }, rot: 3.04, flip: true },
  },
  {
    title: ["What we are and", "where we’re headed."],
    body: [
      "We’re starting with games. Today, anyone can describe an idea on Astrocade and play it minutes later. Our algorithm presents it to players most likely to enjoy it, and creators earn every time someone plays. But games are just the start: creators across our platform are exploring new categories of interactive play, from simulations to AI companions to educational games to memes",
    ],
    video: "papercut-io",
    swoosh: { name: "violet" as const, box: { left: 472, top: 29, width: 2032, height: 805 }, img: { width: 2032, height: 805 }, rot: 0, flip: false },
  },
  {
    title: ["Why we win."],
    body: [
      "AI can be used to make games, but only from models trained on code. At Astrocade, we’re developing the first frontier model trained on fun: built from the ground up within our platform, with each step of creation and every moment of play helping to make both better. Every day, our models learn from real-world experience how to make things more fun, while every player gets a feed more finely personalized to them, from tested classics to games created just minutes ago. It’s how we empower more creators, bring more players, and ensure the next creation is always better than the last.",
    ],
    video: "frozen-harbor",
    swoosh: { name: "blue" as const, box: { left: 637, top: 528, width: 2465, height: 342 }, img: { width: 2465, height: 342 }, rot: 0, flip: false },
  },
];
const STEP_MS = 7000;
const CARD = "rotate(20deg) scale(1, 0.94) skewX(20deg)";

export function WhyNow() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const restart = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setActive((a) => (a + 1) % STORY.length), STEP_MS);
  };

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting);
      if (e.isIntersecting) restart();
      else if (timer.current) clearInterval(timer.current);
    }, { threshold: 0.35 });
    io.observe(root.current!);
    return () => {
      io.disconnect();
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <div ref={root} className="absolute inset-0">
      {/* phone cards (back: blue, front: video that swipes up like a feed) */}
      <div className="absolute left-[1013px] top-[120px] flex h-[592.9px] w-[222.2px] items-center justify-center">
        <div className="h-[512px] w-[236.4px] shrink-0 rounded-[14.8px] bg-[#122346]" style={{ transform: CARD }} />
      </div>
      <div className="absolute left-[947px] top-[179px] flex h-[592.9px] w-[222.2px] items-center justify-center">
        <div className="relative h-[512px] w-[236.4px] shrink-0 overflow-hidden rounded-[14.8px] bg-navy" style={{ transform: CARD }}>
          {STORY.map((s, i) => {
            const offset = ((i - active) % STORY.length + STORY.length) % STORY.length; // 0 = current
            const pos = offset === 0 ? "0%" : offset === 1 ? "100%" : "-100%";
            return (
              <video
                key={s.video}
                src={`/video/games/${s.video}.mp4`}
                poster={`/video/games/${s.video}.jpg`}
                muted
                loop
                playsInline
                autoPlay
                className="absolute inset-0 size-full object-cover"
                style={{ translate: `0 ${pos}`, transition: offset === 1 ? "none" : "translate 0.8s cubic-bezier(0.65,0,0.35,1)" }}
              />
            );
          })}
        </div>
      </div>

      {/* swoosh for the active step: draws in and wipes out, in sync with the copy */}
      {STORY.map((s, i) => (
        <div
          key={s.swoosh.name}
          className={`pointer-events-none absolute flex items-center justify-center ${visible && i === active ? "is-in" : ""}`}
          style={s.swoosh.box}
        >
          <Swoosh
            name={s.swoosh.name}
            className="max-w-none shrink-0"
            style={{
              width: s.swoosh.img.width,
              height: s.swoosh.img.height,
              rotate: `${s.swoosh.rot}deg`,
              scale: s.swoosh.flip ? "-1 1" : undefined,
              ["--cycle" as string]: `${STEP_MS}ms`,
            }}
          />
        </div>
      ))}

      {/* accordion copy */}
      <div className="absolute left-[148px] top-[150px] w-[562px]">
        {STORY.map((s, i) => {
          const open = i === active;
          return (
            <div key={s.title[0]} className={i ? "border-t border-white/20" : ""}>
              <button
                type="button"
                onClick={() => {
                  setActive(i);
                  restart();
                }}
                aria-expanded={open}
                className={`block w-full text-left text-[40px] font-medium leading-[0.95] tracking-[-0.06em] transition-opacity duration-500 ${i ? "pt-12" : ""} ${open ? "opacity-100" : "opacity-20 hover:opacity-50"} ${open ? "pb-10" : "pb-12"}`}
              >
                {s.title.map((t) => (
                  <span key={t} className="block">
                    {t}
                  </span>
                ))}
              </button>
              <div className="grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out-expo)]" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <div
                    className="flex w-[446px] flex-col gap-[1.2em] pb-12 text-[17px] leading-[1.7] text-muted transition-[opacity,translate] duration-700"
                    style={{ opacity: open ? 1 : 0, translate: open ? "0 0" : "0 16px", transitionDelay: open ? "200ms" : "0ms" }}
                  >
                    {s.body.map((p) => (
                      <p key={p.slice(0, 16)}>{noOrphan(p)}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────── Founders: + reveals the bio under the card ───────────── */
const FOUNDERS = [
  { name: "Amir Sadeghian", role: "Chief Executive Officer", bio: "Founding Director of AI at Aibee, a unicorn AI company (backed by Sequoia China) providing AI solutions for different business verticals. PhD, Stanford University.", img: "/img/home/bio-amir.webp", imgStyle: { inset: 0, width: "100%", height: "100%", objectFit: "cover" as const } },
  { name: "Ali Sadeghian", role: "Chief Technology Officer", bio: "AI at Google Research. PhD, University of Florida.", img: "/img/home/bio-ali.webp", imgStyle: { height: "111.37%", left: "-19.49%", top: 0, width: "139.21%" } },
  { name: "Fei-Fei Li", role: "Co-Founder & AI Strategist", bio: "Godmother of AI. Sequoia Professor of Computer Science at Stanford University.", img: "/img/home/bio-feifei.webp", imgStyle: { height: "140.39%", left: "-84.59%", top: "-7.06%", width: "258.23%" } },
];

export function Founders() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="absolute left-[148px] top-0 flex w-[1144px] justify-between">
      {FOUNDERS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.name} className="a-up w-[329px]" style={{ ["--d" as string]: `${i * 0.12}s` }}>
            <div className="group relative h-[411px] overflow-hidden rounded-[20px] bg-navy">
              <img src={f.img} alt={f.name} className="absolute max-w-none transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" style={f.imgStyle} />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex flex-col text-white">
                <span className="-mb-1 text-[24px] font-semibold">{f.name}</span>
                <span className="text-[17px] leading-[1.7]">{f.role}</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-label={`${isOpen ? "Hide" : "Show"} bio: ${f.name}`}
                className="flex size-10 shrink-0 items-center justify-center rounded-full border-[0.25px] border-white backdrop-blur-[14px] transition-colors hover:bg-white/10"
              >
                <span aria-hidden className="relative block size-4">
                  <span className="absolute left-[3.33px] top-[7px] h-[2px] w-[9.33px] rounded-full bg-white" />
                  <span className={`absolute left-[7px] top-[3.33px] h-[9.33px] w-[2px] rounded-full bg-white transition-transform duration-300 ${isOpen ? "rotate-90 scale-y-0" : ""}`} />
                </span>
              </button>
            </div>
            <div className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="pt-8 text-[17px] leading-[1.45] text-muted transition-opacity duration-500" style={{ opacity: isOpen ? 1 : 0 }}>
                  {noOrphan(f.bio)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ───────────── End module: 3 boxes resize through 3 storyboard states, on repeat ───────────── */
type Box = { x: number; y: number; s: number };
const END_STATES: Box[][] = [
  // [raft video, domino video, green image]
  [{ x: 1079, y: -21, s: 450 }, { x: 730, y: 429, s: 349 }, { x: 560, y: 429, s: 150 }],
  [{ x: 1235, y: 51, s: 294 }, { x: 730, y: 345, s: 505 }, { x: 560, y: 673, s: 150 }],
  [{ x: 1235, y: -49, s: 435 }, { x: 1035, y: 386, s: 200 }, { x: 619, y: 386, s: 396 }],
];

export function EndBoxes() {
  const [state, setState] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !id) id = setInterval(() => setState((s) => (s + 1) % END_STATES.length), 3000);
      else if (!e.isIntersecting && id) {
        clearInterval(id);
        id = undefined;
      }
    });
    io.observe(root.current!);
    return () => {
      io.disconnect();
      if (id) clearInterval(id);
    };
  }, []);
  const boxes = END_STATES[state];
  const content: ReactNode[] = [
    <video key="raft" src="/video/games/drift-market.mp4" poster="/video/games/drift-market.jpg" muted loop playsInline autoPlay className="size-full object-cover" />,
    <video key="domino" src="/video/games/one-little-push.mp4" poster="/video/games/one-little-push.jpg" muted loop playsInline autoPlay className="size-full object-cover" />,
    <img key="green" src="/img/home/end-grid1.webp" alt="" className="absolute left-1/2 top-[calc(50%-7%)] h-[244%] w-[137%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover" />,
  ];
  return (
    <div ref={root} className="absolute inset-0">
      {boxes.map((b, i) => (
        <div
          key={i}
          className={`absolute overflow-hidden rounded-[20px] ${i === 2 ? "bg-neon" : "bg-navy"}`}
          style={{ left: b.x, top: b.y, width: b.s, height: b.s, transition: "left 1.1s cubic-bezier(0.65,0,0.35,1), top 1.1s cubic-bezier(0.65,0,0.35,1), width 1.1s cubic-bezier(0.65,0,0.35,1), height 1.1s cubic-bezier(0.65,0,0.35,1)" }}
        >
          {content[i]}
        </div>
      ))}
    </div>
  );
}
