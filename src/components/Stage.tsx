import type { CSSProperties, ReactNode } from "react";

/**
 * A 1440px-wide Figma canvas, scaled to the viewport width (max 1:1).
 * Children are positioned in design pixels, exactly as in the Figma file.
 */
export default function Stage({
  height,
  children,
  className = "",
  innerClassName = "",
  style,
}: {
  height: number;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`stage ${className}`}
      style={{ height: `calc(${height}px * var(--vs))`, ...style }}
    >
      <div className={`stage-inner ${innerClassName}`} style={{ height }}>
        {children}
      </div>
    </div>
  );
}
