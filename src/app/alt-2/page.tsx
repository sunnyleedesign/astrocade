import type { Metadata } from "next";
import Stage from "@/components/Stage";
import InView from "@/components/InView";
import StatTicker from "@/components/alt/StatTicker";

export const metadata: Metadata = { title: "Alt 2", robots: { index: false } };

const STATS = [
  { value: 15, suffix: "M+", label: "Monthly Players", grad: "linear-gradient(90deg, #2be1a2 0%, #5578ff 95.81%)" },
  { value: 350, suffix: "M+", label: "Plays Every Month", grad: "linear-gradient(270deg, #c42fed 0%, #5578ff 100%)" },
  { value: 2, suffix: "M+", label: "Creators", grad: "linear-gradient(86.37deg, #c42fed 24.38%, #ff4288 99.26%)" },
];

/** Alt 2 (Figma page "Alt 2"): stat tickers count up with their gradients; stars slide in from the sides. */
export default function Alt2Page() {
  return (
    <main className="flex min-h-svh items-start">
      <Stage height={810} innerClassName="overflow-hidden">
        {/* top-right star: slides in from the right */}
        <InView className="absolute inset-0" threshold={0}>
          <div className="alt-star-from-right absolute left-[1187px] top-[33px] h-[326px] w-[349px]" style={{ ["--d" as string]: "0.2s" }}>
            <img src="/img/alt2/star-tr.svg" alt="" className="absolute inset-[-14.77%_-13.8%] max-w-none" />
          </div>
          {/* bottom-left star: slides in from the left */}
          <div
            className="alt-star-from-left absolute left-[-51px] top-[503px] flex h-[297.7px] w-[287.7px] items-center justify-center"
            style={{ ["--d" as string]: "0.45s" }}
          >
            <div className="relative h-[250.1px] w-[236.7px] shrink-0 rotate-[13.24deg]">
              <img src="/img/alt2/star-bl.svg" alt="" className="absolute inset-[-14.69%_-15.52%] max-w-none" />
            </div>
          </div>
        </InView>


        <InView className="absolute left-[265px] top-[174px] flex w-[1027px] flex-col gap-20 font-medium" threshold={0}>
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-[136px]">
              <StatTicker
                value={s.value}
                suffix={s.suffix}
                grad={s.grad}
                delay={300 + i * 250}
                className="w-[445px] pb-2 text-[112px] leading-[0.95] tracking-[-0.06em]"
              />
              {/* label slides up subtly, in step with its number */}
              <p
                className="a-up text-[32px] leading-[1.12] tracking-[-0.025em] text-white"
                style={{ ["--d" as string]: `${0.3 + i * 0.25}s`, ["--y" as string]: "20px" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </InView>
      </Stage>
    </main>
  );
}
