import Link from "next/link";
import Nav from "@/components/Nav";
import Stage from "@/components/Stage";
import InView from "@/components/InView";
import HomeHero from "@/components/home/HomeHero";
import Swoosh from "@/components/home/Swoosh";
import StoryLines from "@/components/home/StoryLines";
import { EndBoxes, Founders, StatTicker, WhyNow } from "@/components/home/parts";

/** Figma "Homepage" y-coordinates minus the 830px hero (rendered separately above). */
const Y = (v: number) => v - 830;
const d = (s: number, extra: Record<string, string> = {}) => ({ ["--d" as string]: `${s}s`, ...extra });

const GRAD_A = "linear-gradient(90deg, #2be1a2 0%, #5578ff 95.81%)";
const STATS = [
  { value: 15, suffix: "M+", label: "Monthly Players", grad: GRAD_A, left: 148, top: 906, w: 244 },
  { value: 350, suffix: "M+", label: "Plays Every Month", grad: GRAD_A, left: 588, top: 910, w: 310 },
  { value: 2, suffix: "M+", label: "Creators", grad: GRAD_A, left: 1094, top: 906, w: 198 },
];

const BACKERS = [
  { src: "/img/home/sequoia.png", alt: "Sequoia", w: 175.7, h: 23.2 },
  { src: "/img/home/sea.png", alt: "Sea", w: 121.3, h: 48 },
  { src: "/img/home/google.png", alt: "Google", w: 107.2, h: 35.4 },
  { src: "/img/home/nvidia.png", alt: "NVIDIA", w: 155.5, h: 28.6 },
  { src: "/img/home/conviction.png", alt: "Conviction", w: 160.7, h: 31.3 },
];

const ANGELS = [
  ["Eric Schmidt", "Former CEO of Google"],
  ["Jerry Yang", "Co-founder of Yahoo"],
  ["John Riccitiello", "Former CEO of EA"],
  ["Martin Lau", "President of Tencent"],
  ["Forrest Li", "CEO of Sea"],
  ["Niccolo de Masi", "CEO of IonQ"],
  ["Mike Abbott", "Former VP of Eng at Twitter"],
  ["Silvio Savarese", "Chief Scientist Salesforce AI Research"],
];

function Mask({ src, w, h, alt }: { src: string; w: number; h: number; alt: string }) {
  return (
    <span
      role="img"
      aria-label={alt}
      className="block shrink-0 bg-white"
      style={{ width: w, height: h, maskImage: `url(${src})`, maskSize: "100% 100%", WebkitMaskImage: `url(${src})`, WebkitMaskSize: "100% 100%" }}
    />
  );
}

export default function Home() {
  return (
    <main>
      <Nav />
      <HomeHero />

      <Stage height={7208 - 830} innerClassName="overflow-x-clip">
        {/* ── Stats: numbers tick up as their gradient sweeps in; stars pop in one by one ── */}
        <InView className="absolute inset-x-0 top-0 h-[700px]" threshold={0.2}>
          <img src="/img/home/star-tr.webp" alt="" className="a-pop absolute mix-blend-lighten" style={{ left: 1190.5, top: Y(542), width: 313, height: 358, ...d(0.2) }} />
          <img src="/img/home/star-bl.webp" alt="" className="a-pop absolute mix-blend-lighten" style={{ left: -0.3, top: Y(1026.6), width: 199, height: 231, ...d(0.6) }} />
        </InView>
        {STATS.map((s, i) => (
          <InView key={s.label} className="absolute flex flex-col items-center gap-6 text-center font-medium" style={{ left: s.left, top: Y(s.top), width: s.w }} threshold={0.6}>
            <StatTicker value={s.value} suffix={s.suffix} grad={s.grad} delay={i * 150} className="-mb-2 w-full pb-2 text-[96px] leading-[0.95] tracking-[-0.06em]" />
            <p className="a-up w-full text-[32px] leading-[1.12] tracking-[-0.025em] text-white" style={d(0.1 + i * 0.15, { "--y": "20px" })}>
              {s.label}
            </p>
          </InView>
        ))}

        {/* stat dividers */}
        <InView className="absolute inset-x-0 h-[151px]" style={{ top: Y(910) }} threshold={0.6}>
          <div className="a-fade absolute left-[490px] top-0 h-[151px] w-px bg-white/20" style={d(0.3)} />
          <div className="a-fade absolute left-[996px] top-0 h-[151px] w-px bg-white/20" style={d(0.45)} />
        </InView>

        {/* ── Backed by ── */}
        <InView className="absolute left-[207px] flex w-[1027px] flex-col items-center gap-6" style={{ top: Y(1381) }}>
          <p className="a-up text-[18px] leading-[1.55] text-white">Backed by</p>
          <div className="flex items-center gap-[72px] opacity-80">
            {BACKERS.map((b, i) => (
              <img key={b.alt} src={b.src} alt={b.alt} className="a-up shrink-0 object-cover" style={{ width: b.w, height: b.h, ...d(0.1 + i * 0.08, { "--y": "16px" }) }} />
            ))}
          </div>
        </InView>

        {/* ── "and the people…" with a swoosh that draws in and out on repeat ── */}
        <InView className="absolute inset-x-0 h-[700px]" style={{ top: Y(1631) }} threshold={0.3}>
          <div className="pointer-events-none absolute flex items-center justify-center" style={{ left: -1379, top: 0, width: 2757, height: 512 }}>
            <Swoosh name="stats" className="max-w-none shrink-0" style={{ width: 2741, height: 367, rotate: "-3.04deg", ["--cycle" as string]: "4.5s" }} />
          </div>
          <p className="a-up absolute left-[265px] w-[910px] text-center text-[64px] font-medium leading-[0.92] tracking-[-0.025em]" style={{ top: 1777 - 1631 }}>
            and the people who built the Internet’s biggest platforms
          </p>
        </InView>

        {/* ── Our Story ── */}
        <InView className="absolute left-0 h-[810px] w-[1440px] overflow-hidden bg-navy" style={{ top: Y(2191) }} threshold={0.25}>
          <div className="absolute flex items-center justify-center" style={{ left: -82.9, top: -161, width: 1810.8, height: 1622.7 }}>
            <StoryLines className="h-[1629.7px] w-[1408.4px] max-w-none shrink-0 rotate-[-81.95deg]" />
          </div>
          {/* 3 boxes grow out of their shared corner, hold, shrink back — loop (star_grid.mp4) */}
          <div className="grid-grow absolute origin-top-right overflow-hidden" style={{ left: 603, top: 490.5, width: 319.5, height: 319.5, ...d(0.4) }}>
            <video src="/video/games/tiny-planet-chopper.mp4" poster="/img/home/grid1.webp" muted loop playsInline autoPlay className="size-full object-cover" />
          </div>
          <img src="/img/home/grid2.webp" alt="" className="grid-grow absolute origin-bottom-left" style={{ left: 920.9, top: 172, width: 320.25, height: 319.5, ...d(0.6) }} />
          <div className="grid-grow absolute origin-bottom-left overflow-hidden bg-blue" style={{ left: 1240.5, top: 172, width: 319.5, height: 319.5, ...d(0.8) }}>
            <img src="/img/home/grid3-star.webp" alt="" className="absolute left-[4.15px] top-[20.25px] h-[278px] w-[311px]" />
          </div>
          <p className="a-up absolute left-[148px] top-[120px] text-[20px] font-medium leading-[1.12] tracking-[-0.025em] text-neon">Our Story</p>
          <h2 className="a-up absolute left-[148px] top-[158px] w-[581px] text-[48px] font-medium leading-none tracking-[-0.06em]" style={d(0.1)}>
            We’re on a mission to share fun with the world
          </h2>
          <p className="a-up absolute left-[148px] top-[294px] w-[465px] text-[18px] leading-[1.55] text-white" style={d(0.2)}>
            Astrocade is where anyone can create, share, and play games and interactive content.
          </p>
        </InView>

        {/* ── Why now / What we are / Why we win (auto-playing story) ── */}
        <div className="absolute left-0 h-[1150px] w-[1440px] overflow-hidden" style={{ top: Y(3124) }}>
          <WhyNow />
        </div>

        {/* ── Meet the founders ── */}
        <InView className="absolute left-0 w-[1440px]" style={{ top: Y(4380) }} threshold={0.15}>
          <h2 className="a-up text-center text-[32px] font-medium leading-[0.95] tracking-[-0.06em]">Meet the founders</h2>
          <div className="relative mt-[49px]">
            <Founders />
          </div>
        </InView>

        {/* ── Investors ── */}
        <InView className="absolute left-[207px] flex w-[1027px] flex-col items-center gap-10" style={{ top: Y(5229) }}>
          <p className="a-up text-[32px] font-medium leading-[1.12] tracking-[-0.025em]">Investors</p>
          <div className="a-up flex w-[793px] flex-wrap items-center justify-center gap-x-20 gap-y-10 opacity-80" style={d(0.15, { "--y": "20px" })}>
            <img src="/img/home/sequoia.png" alt="Sequoia" className="h-[23.2px] w-[175.7px]" />
            <Mask src="/img/home/peakxv-mask.png" w={138.3} h={48} alt="Peak XV" />
            <img src="/img/home/sea.png" alt="Sea" className="h-12 w-[121.3px]" />
            <img src="/img/home/google.png" alt="Google" className="h-[35.4px] w-[107.2px]" />
            <Mask src="/img/home/g-mask.png" w={63.8} h={42} alt="Google AI Futures Fund" />
            <img src="/img/home/nvidia.png" alt="NVIDIA" className="h-[29px] w-[156px]" />
            <img src="/img/home/conviction.png" alt="Conviction" className="h-[31.3px] w-[160.7px]" />
          </div>
        </InView>

        {/* ── Angels ── */}
        <InView className="absolute left-8 flex w-[1376px] flex-col items-center gap-10 text-center" style={{ top: Y(5595) }}>
          <p className="a-up text-[32px] font-medium leading-[1.12] tracking-[-0.025em]">Angels</p>
          <div className="grid w-[1142px] grid-cols-4 gap-x-2 gap-y-9">
            {ANGELS.map(([name, title], i) => (
              <div key={name} className="a-up flex flex-col gap-1" style={d(i * 0.05, { "--y": "20px" })}>
                <p className="text-[20px] font-semibold">{name}</p>
                <p className="whitespace-nowrap text-[15px] leading-[1.7] text-cloud">{title}</p>
              </div>
            ))}
          </div>
        </InView>

        {/* ── End module: boxes grow and shrink on repeat ── */}
        <InView className="absolute left-0 h-[810px] w-[1440px] overflow-hidden bg-navy" style={{ top: Y(6115) }} threshold={0.2}>
          <EndBoxes />
          <h2 className="a-up absolute left-[148px] top-[104px] w-[625px] text-[48px] font-medium leading-[0.95] tracking-[-0.06em]">
            ...and a community of funds, founders and operators who’ve believed in Astrocade from day one.
          </h2>
          <a
            href="https://www.astrocade.com"
            className="a-up absolute left-[148px] top-[328px] rounded-full p-6 text-[16px] font-medium leading-none text-dark-navy transition-[background-position] duration-500 hover:[background-position:0_100%]"
            style={{ ...d(0.15), backgroundImage: "linear-gradient(180deg, #2be1a2 0%, #5578ff 50%, #5578ff 100%)", backgroundSize: "100% 200%" }}
          >
            Play Astrocade
          </a>
        </InView>

        {/* ── Footer ── */}
        <footer className="absolute left-0 h-[283px] w-[1440px]" style={{ top: Y(6925) }}>
          <Link href="/" aria-label="Astrocade home" className="absolute left-10 top-10 block h-12 w-[50px] transition-opacity hover:opacity-80">
            <img src="/img/home/footer-mark.svg" alt="Astrocade" className="size-full" />
          </Link>
          <nav className="absolute left-[730px] top-12 flex gap-5 text-[14px] font-medium">
            {[
              [["Our Story", "/our-story"], ["Careers", "/careers"]],
              [["Blog", "/blog"], ["Press", "/press"]],
              [["Privacy Policy", "/privacy"], ["Terms of Services", "/terms"]],
            ].map((col) => (
              <div key={col[0][0]} className="flex w-[213px] flex-col gap-4">
                {col.map(([label, href]) => (
                  <a key={label} href={href} className="transition-opacity hover:opacity-60">
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
          <p className="absolute bottom-6 right-[31px] text-[10px] font-semibold leading-none tracking-[-0.025em]">Copyright ©2026</p>
        </footer>
      </Stage>
    </main>
  );
}
