"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import InView from "./InView";

const TAGS = [
  { label: "Play", bg: "linear-gradient(267.5deg, #ff4288 0.94%, #ffaa5d 98.94%)" },
  { label: "Create", bg: "linear-gradient(270deg, #5578ff 0%, #c42fed 100%)" },
  { label: "Share", bg: "linear-gradient(-59.79deg, #2be1a2 4.03%, #5578ff 152.72%)" },
];

/**
 * Landing ending (Figma storyboard "landing ending"):
 * swoosh sweeps in and out right→left, then Play / Create / Share slide in
 * from the right one at a time; the centered tag is highlighted and the next
 * one peeks in at 20% opacity.
 */
export default function PlayCreateShare({
  mobile = false,
  swooshSrc,
  swooshBox,
  swooshImg,
  tagTop,
}: {
  mobile?: boolean;
  swooshSrc: string;
  /** Unrotated bounding box of the swoosh (design px, relative to section) */
  swooshBox: { left: number; top: number; width: number; height: number };
  /** Rotated swoosh image size */
  swooshImg: { width: number; height: number };
  tagTop: number;
}) {
  const [step, setStep] = useState(-1);
  const [started, setStarted] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const onChange = useCallback((v: boolean) => {
    if (v) setStarted(true);
  }, []);

  useEffect(() => {
    if (!started) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(0);
      return;
    }
    // swoosh takes ~1.8s; tags begin as it leaves
    const start = setTimeout(() => {
      setStep(0);
      timer.current = setInterval(() => setStep((s) => s + 1), 2000);
    }, 1500);
    return () => {
      clearTimeout(start);
      if (timer.current) clearInterval(timer.current);
    };
  }, [started]);

  const spacing = mobile ? 300 : 800;
  const visible = [step - 1, step, step + 1, step + 2];

  return (
    <InView className="absolute inset-0" threshold={0.35} onChange={onChange}>
      <div
        className="a-wipe-rtl pointer-events-none absolute flex items-center justify-center"
        style={{ ...swooshBox, ["--dur" as string]: "1.8s" }}
      >
        <img
          src={swooshSrc}
          alt=""
          className="max-w-none shrink-0"
          style={{ width: swooshImg.width, height: swooshImg.height, rotate: "-4.1deg" }}
        />
      </div>

      <div className="absolute left-1/2 w-0" style={{ top: tagTop }} aria-live="polite">
        {visible.map((abs) => {
          const tag = TAGS[((abs % 3) + 3) % 3];
          const offset = abs - step;
          const opacity = offset === 0 ? 1 : offset === 1 ? 0.2 : 0;
          return (
            <div
              key={abs}
              className={`absolute left-0 top-0 flex items-center justify-center whitespace-nowrap rounded-full font-semibold capitalize text-white ${
                mobile ? "px-[57px] py-[36px] text-[50px] tracking-[-2px]" : "px-[114px] py-[71.5px] text-[100px] tracking-[-4px]"
              }`}
              style={{
                backgroundImage: tag.bg,
                translate: `calc(-50% + ${offset * spacing}px) 0`,
                opacity,
                transition:
                  "translate 1s cubic-bezier(0.65,0,0.35,1), opacity 1s cubic-bezier(0.65,0,0.35,1)",
              }}
              aria-hidden={offset !== 0}
            >
              <span className="block leading-none [text-box:trim-both_cap_alphabetic]">{tag.label}</span>
            </div>
          );
        })}
      </div>
    </InView>
  );
}
