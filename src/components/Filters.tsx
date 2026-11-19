"use client";

/**
 * Pill filters (Figma: "Filter interactive" — active / hover / deactive).
 */
export default function Filters<T extends string>({
  options,
  value,
  onChange,
  className = "",
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`} role="tablist">
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o)}
            className={`group relative overflow-hidden whitespace-nowrap rounded-full border-[1.5px] px-[18px] py-3 text-[18px] font-medium leading-none tracking-[-0.01em] transition-colors duration-300 ${
              active
                ? "border-neon bg-neon text-dark-navy"
                : "border-white text-white hover:border-transparent hover:text-dark-navy"
            }`}
          >
            {!active && (
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ backgroundImage: "linear-gradient(0deg, #5578ff 0%, #2be1a2 119.61%)" }}
              />
            )}
            <span className="relative">{o}</span>
          </button>
        );
      })}
    </div>
  );
}
