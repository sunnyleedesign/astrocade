"use client";

import { useEffect, useRef } from "react";

/**
 * Muted looping video that only downloads/plays while on screen.
 * Hidden copies (e.g. the desktop layout on a phone) never load.
 */
export default function LazyVideo({
  src,
  poster,
  className = "",
  loop = true,
}: {
  src: string;
  poster?: string;
  className?: string;
  loop?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = src;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop={loop}
      playsInline
      preload="none"
      aria-hidden
    />
  );
}
