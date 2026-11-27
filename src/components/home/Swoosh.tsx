import type { CSSProperties } from "react";
import { SWOOSHES } from "./swooshes";

/**
 * Trim-path swoosh (reference trim-path-sequence.mp4): the line draws along its
 * own path from where it enters the screen, holds, then erases along the path
 * — on repeat while an ancestor has `.is-in`.
 *
 * The artwork is a filled outline, so the "stroke" is faked with a mask: a thick
 * stroke that follows one edge of the outline, animated with stroke-dasharray.
 */
export default function Swoosh({ name, className = "", style }: { name: keyof typeof SWOOSHES; className?: string; style?: CSSProperties }) {
  const s = SWOOSHES[name];
  const id = `swoosh-${name}`;
  return (
    <svg viewBox={`0 0 ${s.w} ${s.h}`} preserveAspectRatio="none" overflow="visible" aria-hidden className={`trim-swoosh ${className}`} style={style}>
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x={-200} y={-200} width={s.w + 400} height={s.h + 400}>
          {s.pieces.map((p, i) => (
            <path
              key={i}
              className="trim-path"
              d={p.full.slice(0, p.full.indexOf("Z") + 1)}
              pathLength={3000}
              fill="none"
              stroke="#fff"
              strokeWidth={p.w}
              strokeLinejoin="round"
              style={{
                ["--len" as string]: `${p.len}px`,
                ["--gap" as string]: `${p.gap}px`,
                ["--o0" as string]: `${p.o0}px`,
                ["--o1" as string]: `${p.o1}px`,
                ["--o2" as string]: `${p.o2}px`,
              }}
            />
          ))}
        </mask>
      </defs>
      <g mask={`url(#${id})`} fill={s.fill}>
        {s.pieces.map((p, i) => (
          <path key={i} d={p.full} />
        ))}
      </g>
    </svg>
  );
}
