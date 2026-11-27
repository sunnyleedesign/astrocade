import fs from "node:fs";
import path from "node:path";

let counter = 0;

/**
 * Inlines an SVG from /public so its individual paths can be animated.
 * - `pathClass` / `pathStyle(i)` are applied to each top-level <path>
 * - gradient ids are prefixed so several SVGs can live on one page
 */
export default function InlineSvg({
  src,
  className = "",
  pathClass,
  pathStyle,
}: {
  src: string;
  className?: string;
  pathClass?: string;
  pathStyle?: (index: number) => string;
}) {
  const file = path.join(process.cwd(), "public", src);
  let svg = fs.readFileSync(file, "utf8");
  const prefix = `s${(counter++).toString(36)}_`;

  svg = svg
    .replace(/\sstyle="display: block;"/, "")
    .replace(/\swidth="[^"]*"\sheight="[^"]*"/, ' width="100%" height="100%"')
    .replace(/id="([^"]+)"/g, (_m, id) => `id="${prefix}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_m, id) => `url(#${prefix}${id})`);

  if (pathClass || pathStyle) {
    let i = 0;
    svg = svg.replace(/<path /g, () => {
      const idx = i++;
      const cls = pathClass ? ` class="${pathClass}"` : "";
      const st = pathStyle ? ` style="${pathStyle(idx)}"` : "";
      return `<path${cls}${st} `;
    });
  }

  return (
    <span
      aria-hidden
      className={`block ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
