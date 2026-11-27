import type { CSSProperties, ReactNode } from "react";

export function StatPill({
  label,
  value,
  grad,
  className = "",
  style,
  size = "lg",
}: {
  label: string;
  value: string;
  grad: string;
  className?: string;
  style?: CSSProperties;
  size?: "lg" | "sm";
}) {
  return (
    <div
      className={`flex items-center justify-center whitespace-nowrap rounded-full bg-white text-center drop-shadow-[0_-3px_13.5px_rgba(0,0,0,0.15)] ${
        size === "lg" ? "gap-[18px]" : "gap-3 p-6"
      } ${className}`}
      style={style}
    >
      <span className={`leading-[1.55] text-dark-navy ${size === "lg" ? "text-[20px]" : "text-[17px]"}`}>{label}</span>
      <span
        className={`grad-text font-semibold leading-[0.95] ${size === "lg" ? "text-[48px]" : "text-[32px] tracking-[-0.06em]"}`}
        style={{ backgroundImage: grad }}
      >
        {value}
      </span>
    </div>
  );
}

export const GRAD = {
  ocean: "linear-gradient(270deg, #2be1a2 0%, #5578ff 100%)",
  sunset: "linear-gradient(270deg, #ffaa5d 0%, #ff4288 100%)",
  violet: "linear-gradient(270deg, #c42fed 0%, #5578ff 100%)",
  magenta: "linear-gradient(87.67deg, #ff4288 0.69%, #c42fed 75.56%)",
};

const LOGOS = [
  { src: "/img/shared/sequoia.png", alt: "Sequoia", w: 175.7, h: 23.2 },
  { src: "/img/shared/sea.png", alt: "Sea", w: 121.3, h: 48 },
  { src: "/img/shared/google.png", alt: "Google", w: 107.2, h: 35.4 },
  { src: "/img/shared/nvidia.png", alt: "NVIDIA", w: 155.5, h: 28.6 },
  { src: "/img/shared/conviction.png", alt: "Conviction", w: 160.7, h: 31.3 },
];

/** "Backed by" investor logo row. `scale` shrinks logos for mobile. */
export function LogoRow({ scale = 1, gap = 40, dot = 6, animate = true }: { scale?: number; gap?: number; dot?: number; animate?: boolean }) {
  const items: ReactNode[] = [];
  LOGOS.forEach((l, i) => {
    if (i > 0)
      items.push(
        <img key={`d${i}`} src="/img/shared/dot.svg" alt="" className={`shrink-0 ${animate ? "a-fade" : ""}`} style={{ width: dot, height: dot, ["--d" as string]: `${0.15 + i * 0.1}s` }} />,
      );
    items.push(
      <img
        key={l.alt}
        src={l.src}
        alt={l.alt}
        className={`shrink-0 object-cover ${animate ? "a-up" : ""}`}
        style={{ width: l.w * scale, height: l.h * scale, ["--d" as string]: `${0.1 + i * 0.1}s`, ["--y" as string]: "16px" }}
      />,
    );
  });
  return (
    <div className="flex items-center" style={{ gap }}>
      {items}
    </div>
  );
}
