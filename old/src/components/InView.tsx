"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Fraction of the element that must be visible before animations start. */
  threshold?: number;
  rootMargin?: string;
  /** Play once (default) or replay every time it re-enters the viewport. */
  once?: boolean;
  onChange?: (inView: boolean) => void;
};

/**
 * Adds `.is-in` to itself when scrolled into view. CSS animation classes
 * (`a-up`, `a-pop`, `a-wipe-ltr`, …) on descendants start at that moment.
 */
export default function InView({
  children,
  className = "",
  style,
  threshold = 0.25,
  rootMargin = "0px 0px -8% 0px",
  once = true,
  onChange,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          onChange?.(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
          onChange?.(false);
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once, onChange]);

  return (
    <div ref={ref} className={`${className} ${inView ? "is-in" : ""}`} style={style}>
      {children}
    </div>
  );
}
