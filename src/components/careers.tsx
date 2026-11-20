"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Filters from "./Filters";
import { BENEFITS, JOBS, JOB_FILTERS, MCP_COMMAND, PEOPLE } from "@/content/careers";

/* ───────────── Copy button in the "Run this in your terminal" card ───────────── */
export function CopyButton() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(MCP_COMMAND);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {}
      }}
      className="flex items-center justify-center gap-[2px] rounded-full bg-white px-4 py-[6px] text-[16px] font-semibold text-dark-navy transition-transform hover:scale-105 active:scale-95"
    >
      <img src="/img/career/copy-icon.svg" alt="" className="size-4" />
      <span className="leading-none">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

/* ───────────── People carousel (Figma: Quote + 3 alternate states) ───────────── */
// Slot centres, back → front, relative to the 1440×762 section.
const SLOTS = [
  { x: 333.78, y: 342.66 },
  { x: 390.6, y: 368.24 },
  { x: 447.41, y: 393.82 },
  { x: 504.22, y: 419.4 },
];
const CARD_TRANSFORM = "rotate(-15deg) scale(1, 0.97) skewX(-15deg)";

function ArrowButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous person" : "Next person"}
      className="group relative flex size-16 items-center justify-center overflow-hidden rounded-full border-[0.75px] border-[rgba(202,202,202,0.26)] bg-[rgba(4,14,34,0.15)] transition-[border-color] hover:border-transparent"
    >
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundImage: "linear-gradient(64.55deg, #5578ff 18.56%, #2be1a2 74.35%)" }}
      />
      <span className={`relative size-[13.5px] ${dir === "prev" ? "rotate-180" : ""}`}>
        <img src="/img/career/arrow-right.svg" alt="" className="absolute inset-0 size-full transition-opacity group-hover:opacity-0" />
        <img src="/img/career/arrow-right-dark.svg" alt="" className="absolute inset-0 size-full opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
    </button>
  );
}

export function PeopleCarousel({ mobile = false }: { mobile?: boolean }) {
  // stack[i] = index into PEOPLE at slot i (0 = back, 3 = front)
  const [stack, setStack] = useState([3, 2, 1, 0]);
  const [dir, setDir] = useState<1 | -1>(1);
  const front = stack[3];

  const busy = useRef(false);
  const [leaving, setLeaving] = useState<number | null>(null);
  const markLeaving = (idx: number) => {
    setLeaving(idx);
    setTimeout(() => setLeaving(null), 420);
  };
  const lock = () => {
    if (busy.current) return false;
    busy.current = true;
    setTimeout(() => (busy.current = false), 900);
    return true;
  };

  const next = () => {
    if (!lock()) return;
    markLeaving(stack[3]);
    setDir(1);
    setStack((s) => [s[3], s[0], s[1], s[2]]);
  };
  const prev = () => {
    if (!lock()) return;
    markLeaving(stack[0]);
    setDir(-1);
    setStack((s) => [s[1], s[2], s[3], s[0]]);
  };

  const cards = (
    <div className={mobile ? "relative mx-auto h-[420px] w-[340px]" : "absolute inset-0"}>
      <div className={mobile ? "absolute left-[-130px] top-[-200px] origin-top-left scale-[0.62]" : "contents"}>
        {PEOPLE.map((p, i) => {
          const slot = stack.indexOf(i);
          const pos = SLOTS[slot];
          // Like the reference: the leaving card slides one step further out and fades,
          // then fades back in at the other end of the stack while the rest shift by one.
          const wrapping = (dir === 1 && slot === 0) || (dir === -1 && slot === 3);
          const step = { x: SLOTS[1].x - SLOTS[0].x, y: SLOTS[1].y - SLOTS[0].y };
          const from = dir === 1 ? SLOTS[3] : SLOTS[0];
          const out = dir === 1 ? { x: from.x + step.x, y: from.y + step.y } : { x: from.x - step.x, y: from.y - step.y };
          const pre = dir === 1 ? { x: pos.x - step.x, y: pos.y - step.y } : { x: pos.x + step.x, y: pos.y + step.y };
          return (
            <motion.div
              key={p.name}
              className="absolute flex h-[536.36px] w-[411.57px] items-center justify-center"
              style={{
                marginLeft: -205.78,
                marginTop: -268.18,
                // while fading out it stays on its old layer (front, or back for "prev")
                zIndex: leaving === i ? (dir === 1 ? 10 : 0) : slot + 1,
              }}
              initial={false}
              animate={
                wrapping
                  ? {
                      left: [from.x, out.x, pre.x, pos.x],
                      top: [from.y, out.y, pre.y, pos.y],
                      opacity: [1, 0, 0, 1],
                    }
                  : { left: pos.x, top: pos.y, opacity: 1 }
              }
              transition={
                wrapping
                  ? { duration: 0.9, times: [0, 0.45, 0.5, 1], ease: "easeInOut" }
                  : { duration: 0.8, ease: [0.65, 0, 0.35, 1] }
              }
            >
              <div className="relative size-[426.085px] shrink-0 overflow-hidden rounded-[15.55px]" style={{ transform: CARD_TRANSFORM, backgroundImage: p.bg }}>
                <img src={p.photo} alt={slot === 3 ? p.name : ""} className="absolute inset-0 size-full object-cover" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const copy = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={front}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-8"
        aria-live="polite"
      >
        <p className={`font-medium leading-[1.12] tracking-[-0.025em] text-white ${mobile ? "text-[24px]" : "text-[32px]"}`}>{PEOPLE[front].name}</p>
        <p className="text-[17px] leading-[1.7] text-muted">{PEOPLE[front].quote}</p>
      </motion.div>
    </AnimatePresence>
  );

  const arrows = (
    <div className="flex gap-4">
      <ArrowButton dir="prev" onClick={prev} />
      <ArrowButton dir="next" onClick={next} />
    </div>
  );

  if (mobile)
    return (
      <div className="flex flex-col gap-8">
        {cards}
        <div className="min-h-[300px]">{copy}</div>
        {arrows}
      </div>
    );

  return (
    <>
      {cards}
      <div className="absolute left-[899px] top-[160px] min-h-[420px] w-[418px]">{copy}</div>
      <div className="absolute left-[899px] top-[602.5px]">{arrows}</div>
    </>
  );
}

/* ───────────── Benefits: each line turns from faint white to gradient as you scroll ───────────── */
export function Benefits({ mobile = false }: { mobile?: boolean }) {
  const refs = useRef<(HTMLParagraphElement | null)[]>([]);
  // 0 = faint, 1 = gradient sweeping in, 2 = settled to white (Figma storyboard)
  const [state, setState] = useState<number[]>(() => BENEFITS.map(() => 0));
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    const set = (i: number, v: number) => setState((a) => (a[i] === v ? a : a.map((x, j) => (j === i ? v : x))));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const i = Number((e.target as HTMLElement).dataset.i);
          // a line activates once it has scrolled above ~60% of the viewport
          const on = e.isIntersecting || e.boundingClientRect.top < 0;
          clearTimeout(timers.current[i]);
          if (on) {
            setState((a) => (a[i] ? a : a.map((x, j) => (j === i ? 1 : x))));
            timers.current[i] = setTimeout(() => set(i, 2), 1100);
          } else set(i, 0);
        });
      },
      { rootMargin: "0px 0px -40% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    const t = timers.current;
    return () => {
      io.disconnect();
      Object.values(t).forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={`flex flex-col items-center text-center font-semibold leading-[0.95] ${mobile ? "gap-4 text-[28px]" : "gap-[22px] text-[48px]"}`}>
      {BENEFITS.map((b, i) => {
        const st = state[i];
        return (
          <p
            key={b.text}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-i={i}
            className={`grad-text px-2 ${i === BENEFITS.length - 1 ? (mobile ? "" : "max-w-[721px]") : mobile ? "" : "whitespace-nowrap"}`}
            style={{
              // layers: white (final) · gradient · faint white base
              backgroundImage: `linear-gradient(#fff, #fff), ${b.grad}, linear-gradient(#fff, #fff)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: st === 2 ? "100% 100%, 100% 100%, 100% 100%" : st === 1 ? "0% 100%, 100% 100%, 100% 100%" : "0% 100%, 0% 100%, 100% 100%",
              opacity: st ? 1 : 0.12,
              translate: st ? "0 0" : "0 16px",
              transition:
                "background-size 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease, translate 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {b.text}
          </p>
        );
      })}
    </div>
  );
}

/* ───────────── Open roles with filters + hover rows ───────────── */
export function OpenRoles({ mobile = false }: { mobile?: boolean }) {
  const [filter, setFilter] = useState<(typeof JOB_FILTERS)[number]>("All");
  const jobs = JOBS.filter((j) => filter === "All" || j.team === filter);

  return (
    <div className="flex flex-col gap-10">
      <div className={`flex ${mobile ? "flex-col gap-6" : "items-center justify-between"}`}>
        <h2 id="open-roles" className={`font-medium leading-[0.95] tracking-[-0.06em] ${mobile ? "text-[32px]" : "text-[48px]"}`}>
          Open roles
        </h2>
        <Filters options={JOB_FILTERS} value={filter} onChange={setFilter} />
      </div>
      <div className="flex flex-col gap-2">
        {jobs.length === 0 && <p className="rounded-[20px] bg-navy px-14 py-10 text-[17px] text-muted">No open roles in {filter} right now — check back soon.</p>}
        {jobs.map((j, i) => (
          <a
            key={i}
            href={j.href}
            className={`group relative flex items-center justify-between overflow-hidden rounded-[20px] bg-navy text-white transition-colors duration-300 hover:text-dark-navy ${
              mobile ? "gap-4 px-6 py-6" : "px-14 py-10"
            }`}
          >
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ backgroundImage: "linear-gradient(270deg, #2be1a2 0%, #5578ff 100%)" }}
            />
            <span className="relative flex flex-col gap-1">
              <span className={`font-semibold ${mobile ? "text-[18px]" : "text-[24px]"}`}>{j.title}</span>
              <span className={`leading-[1.7] ${mobile ? "text-[15px]" : "text-[17px]"}`}>
                {j.team} • {j.location} • {j.type}
              </span>
            </span>
            <span
              className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full ${mobile ? "size-12" : "size-16"}`}
              style={{ backgroundImage: "linear-gradient(180deg, #2be1a2 0%, #5578ff 100%)" }}
            >
              <span aria-hidden className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <img src="/img/career/arrow-up-right.svg" alt="" className="relative size-6" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
