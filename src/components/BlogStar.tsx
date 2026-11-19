import fs from "node:fs";
import path from "node:path";

const RIPPLES = 5;

/**
 * Blog hero star (reference: star_reference.mp4).
 * The solid star scales in once, then outline copies of the star keep
 * rippling out of its edge toward the top-left — a seamless loop.
 */
export default function BlogStar({ className = "" }: { className?: string }) {
  const svg = fs.readFileSync(path.join(process.cwd(), "public/img/blog/hero-art.svg"), "utf8");
  const star = svg.match(/<path[^>]*d="([^"]+)"/)![1];

  return (
    <svg viewBox="0 0 1109.26 1158" className={`blog-star overflow-visible ${className}`} aria-hidden>
      <defs>
        <linearGradient id="blogStarFill" x1="685.81" y1="473.689" x2="614.078" y2="1067.98" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5578FF" />
          <stop offset="0.908654" stopColor="#F956D1" />
        </linearGradient>
      </defs>
      {Array.from({ length: RIPPLES }, (_, i) => (
        <path
          key={i}
          d={star}
          className="blog-ripple"
          fill="none"
          stroke="#5578FF"
          strokeWidth={2.5}
          vectorEffect="non-scaling-stroke"
          style={{ ["--i" as string]: i }}
        />
      ))}
      <path d={star} fill="url(#blogStarFill)" className="blog-star-solid" />
    </svg>
  );
}
