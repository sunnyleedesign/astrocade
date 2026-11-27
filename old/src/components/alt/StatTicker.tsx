"use client";

import { useEffect, useRef, useState } from "react";

/** Alt 2 — number counts up from 0 while its gradient sweeps in. */
export default function StatTicker({
  value,
  suffix,
  grad,
  delay = 0,
  duration = 1800,
  className = "",
}: {
  value: number;
  suffix: string;
  grad: string;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const [n, setN] = useState(0);
  const [on, setOn] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      setOn(true);
      return;
    }
    const t = setTimeout(() => {
      setOn(true);
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 4);
        setN(Math.round(eased * value));
        if (p < 1) raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf.current);
    };
  }, [value, delay, duration]);

  return (
    <p
      className={`grad-text tabular-nums ${className}`}
      aria-label={`${value}${suffix}`}
      style={{
        backgroundImage: `${grad}, linear-gradient(#fff, #fff)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: on ? "100% 100%, 100% 100%" : "0% 100%, 100% 100%",
        opacity: on ? 1 : 0,
        transition: `background-size ${duration}ms cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease`,
      }}
    >
      {n}
      {suffix}
    </p>
  );
}
