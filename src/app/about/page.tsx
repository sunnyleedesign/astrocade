import type { Metadata } from "next";
import Stage from "@/components/Stage";
import InView from "@/components/InView";
import LazyVideo from "@/components/LazyVideo";
import Footer from "@/components/Footer";
import { DesktopNav, MobileNav } from "@/components/Nav";
import { LeaderCard } from "@/components/LeaderCards";
import { LEADERS } from "@/content/leaders";

export const metadata: Metadata = { title: "About" };

const d = (s: number, extra: Record<string, string> = {}) => ({ ["--d" as string]: `${s}s`, ...extra });

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

const WHY_NOW = [
  "First, came text. Then photos, and videos. Each was a new way to create, and each took off only when technology could put it in everyone’s hands. Once everyone’s phone had a camera, photos and videos became the dominant forms of expression. Today, AI is doing the same for interactive content. For the first time in more than a decade, a truly new content category is emerging.",
  "Making something people can play, explore, or even just chat with used to take an entire team of coders, artists, musicians, and designers. Now all it takes is an idea —and Astrocade is where people share it.",
];
const WHAT_WE_ARE =
  "We’re starting with games. Today, anyone can describe an idea on Astrocade and play it minutes later. Our algorithm presents it to players most likely to enjoy it, and creators earn every time someone plays. But games are just the start: creators across our platform are exploring new categories of interactive play, from simulations to AI companions to educational games to memes";
const WHY_WIN =
  "AI can be used to make games, but only from models trained on code. At Astrocade, we’re developing the first frontier model trained on fun: built from the ground up within our platform, with each step of creation and every moment of play helping to make both better. Every day, our models learn from real-world experience how to make things more fun, while every player gets a feed more finely personalized to them, from tested classics to games created just minutes ago. It’s how we empower more creators, bring more players, and ensure the next creation is always better than the last.";

function Investors({ mobile = false }: { mobile?: boolean }) {
  const s = mobile ? 0.75 : 1;
  const dot = <img src="/img/shared/dot.svg" alt="" className="size-[6px] shrink-0" />;
  const mask = (src: string, w: number, h: number, alt: string) => (
    <span
      role="img"
      aria-label={alt}
      className="block shrink-0 bg-white"
      style={{ width: w * s, height: h * s, maskImage: `url(${src})`, maskSize: "100% 100%", WebkitMaskImage: `url(${src})`, WebkitMaskSize: "100% 100%" }}
    />
  );
  const img = (src: string, w: number, h: number, alt: string) => (
    <img src={src} alt={alt} className="shrink-0 object-cover" style={{ width: w * s, height: h * s }} />
  );
  return (
    <div className={`flex flex-wrap items-center justify-center ${mobile ? "gap-4" : "w-[909px] gap-6"}`}>
      {img("/img/shared/sequoia.png", 175.7, 23.2, "Sequoia")}
      {dot}
      {mask("/img/about/peakxv-mask.png", 138.3, 48, "Peak XV")}
      {dot}
      {img("/img/shared/sea.png", 121.3, 48, "Sea")}
      {dot}
      {img("/img/shared/google.png", 107.2, 35.4, "Google")}
      {dot}
      {mask("/img/about/g-mask.png", 63.8, 42, "Google AI Futures Fund")}
      {img("/img/shared/nvidia.png", 156, 29, "NVIDIA")}
      {dot}
      {img("/img/shared/conviction.png", 160.7, 31.3, "Conviction")}
    </div>
  );
}

function Angels({ cols = 4 }: { cols?: number }) {
  return (
    <div className="grid gap-x-2 gap-y-9 text-center" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {ANGELS.map(([name, title], i) => (
        <div key={name} className="a-up flex flex-col gap-[2px]" style={d(0.05 * i, { "--y": "20px" })}>
          <p className="text-[24px] font-semibold text-white">{name}</p>
          <p className="text-[17px] leading-[1.7] text-cloud">{title}</p>
        </div>
      ))}
    </div>
  );
}

function CommunityHeadline({ className = "" }: { className?: string }) {
  return (
    <h2 className={`font-medium leading-[0.92] tracking-[-0.06em] ${className}`}>
      and <span className="text-violet">a community of funds, founders</span> and{" "}
      <span className="text-violet">operators</span> who’ve believed in{" "}
      <span className="grad-text" style={{ backgroundImage: "linear-gradient(85.55deg, #ff4288 0.69%, #c42fed 75.56%)" }}>
        Astrocade
      </span>{" "}
      <br className="hidden lg:block" />
      from day one.
    </h2>
  );
}

export default function AboutPage() {
  return (
    <main className="relative">
      {/* full-bleed cream band behind the hero */}
      <div className="absolute inset-x-0 top-0 hidden h-[calc(944px*var(--vs))] bg-cloud lg:block" />

      {/* ═════════════ Desktop (Figma: About, 1440 × 6059) ═════════════ */}
      <Stage height={5827} className="hidden lg:block" innerClassName="overflow-hidden">
        {/* ── Hero ── star spins + zooms in, then tiles grow out of their shared corner (reference video) */}
        <InView className="absolute left-0 top-0 h-[944px] w-[1440px] overflow-hidden bg-cloud" threshold={0}>
          <div className="absolute left-[-145.6px] top-[42.1px] flex h-[1696px] w-[1607.5px] items-center justify-center">
            <img src="/img/about/hero-star.svg" alt="" className="hero-star-in h-[1469.75px] w-[1358.66px] max-w-none shrink-0 rotate-[10.68deg] origin-[52%_30%]" style={d(0.1)} />
          </div>
          <img src="/img/about/grid2.svg" alt="" className="tile-grow absolute left-[875.25px] top-[305.75px] h-[319.5px] w-[320.25px] origin-bottom-left" style={d(0.75)} />
          <img src="/img/about/grid1.svg" alt="" className="tile-grow absolute left-[557.34px] top-[624.22px] size-[319.46px] origin-top-right" style={d(1.15)} />
          <div className="tile-grow absolute left-[1194.85px] top-[305.75px] size-[319.46px] origin-bottom-left overflow-hidden bg-[#071738]" style={d(0.95)}>
            <div className="absolute left-[-218.8px] top-[-253.3px] flex h-[962.6px] w-[869.1px] items-center justify-center">
              <img src="/img/about/grid3-lines.svg" alt="" className="h-[848.4px] w-[733.1px] max-w-none shrink-0 rotate-[-9.98deg]" />
            </div>
            <img src="/img/about/grid3-star.svg" alt="" className="absolute left-[-0.1px] top-[70.5px] h-[256.5px] w-[319.5px] max-w-none rotate-180" />
          </div>

          <div className="absolute left-8 top-[151px] flex w-[678px] flex-col gap-10">
            <h1 className="text-[72px] font-medium leading-[0.92] tracking-[-0.06em] text-dark-navy">
              <span className="a-up block" style={d(0.1)}>
                We’re on a mission to share{" "}
                <span className="text-violet">
                  fun{" "}
                  <img src="/img/about/symbol-inline.svg" alt="" className="inline-block h-[64px] w-[66.6px] align-[-0.12em]" /> with the
                  world
                </span>
              </span>
            </h1>
            <p className="a-up w-[465px] text-[20px] leading-[1.55] text-dark-navy" style={d(0.25)}>
              Astrocade is where anyone can create, share, and play games and interactive content.
            </p>
          </div>
        </InView>
        <DesktopNav tone="light" />

        {/* ── Why now ── swoosh L→R while 3 artworks slide up one by one */}
        <InView className="absolute left-0 top-[990px] h-[800px] w-[1440px]" threshold={0.3}>
          <div className="a-up absolute left-[218px] top-[99.4px] size-[186.2px] overflow-hidden rounded-[16px] bg-cloud" style={d(0.35, { "--y": "80px" })}>
            <img src="/img/about/art-food.webp" alt="" className="absolute left-[17.15px] top-[17.15px] size-[151.9px] object-cover" />
          </div>
          <div className="a-wipe-ltr loop pointer-events-none absolute left-[-286.8px] top-[114.2px] flex h-[522.9px] w-[3386.4px] items-center justify-center" style={d(0)}>
            <img src="/img/about/swoosh1.svg" alt="" className="h-[452.3px] w-[3377.7px] max-w-none shrink-0 -scale-x-100 rotate-[1.2deg]" />
          </div>
          <div className="a-up absolute left-[404.3px] top-[50.4px] size-[186.2px] overflow-hidden rounded-[16px] bg-[#2ddaa7]" style={d(0.6, { "--y": "80px" })}>
            <img src="/img/about/art-mascot.webp" alt="" className="absolute left-[21.6px] top-[21.7px] size-[142.7px] object-cover" />
          </div>
          <div className="a-up absolute left-8 top-[148.4px] size-[186.2px] overflow-hidden rounded-[16px] bg-[#1739c7]" style={d(0.1, { "--y": "80px" })}>
            <img src="/img/about/art-skate.webp" alt="" className="absolute left-[28.5px] top-[2.5px] h-[181.1px] w-[128.9px] object-cover" />
          </div>
          <h2
            className="a-up grad-text absolute left-[730px] top-[114.4px] text-[48px] font-medium leading-[0.95] tracking-[-0.06em] pb-1"
            style={{ ...d(0.1), backgroundImage: "linear-gradient(90deg, #5578ff 0%, #2be1a2 87.39%)" }}
          >
            Why now.
          </h2>
          <div className="a-up absolute left-[846px] top-[200.4px] w-[446px] text-[17px] leading-[1.7] text-muted" style={d(0.25)}>
            <p>{WHY_NOW[0]}</p>
            <p className="mt-[1.2em]">{WHY_NOW[1]}</p>
          </div>
        </InView>

        {/* ── What we are ── swoosh R→L while the app video slides up and plays */}
        <InView className="absolute left-0 top-[1810px] h-[950px] w-[1440px]" threshold={0.3}>
          <h2 className="a-up absolute left-[148px] top-[67.4px] w-[554px] text-[48px] font-medium leading-[0.95] tracking-[-0.06em]">
            What we are and
            <span className="grad-text block pb-1" style={{ backgroundImage: "linear-gradient(270deg, #c42fed 0%, #ff4288 100%)" }}>
              where we’re headed.
            </span>
          </h2>
          <p className="a-up absolute left-[148px] top-[199.4px] w-[446px] text-[17px] leading-[1.7] text-muted" style={d(0.15)}>
            {WHAT_WE_ARE}
          </p>
          <div className="a-up absolute left-[980.4px] top-[31.4px] flex h-[800px] w-[299.8px] items-center justify-center" style={d(0.2, { "--y": "120px" })}>
            <div
              className="h-[690.9px] w-[319.1px] shrink-0 rounded-[20px]"
              style={{ transform: "rotate(20deg) scale(1, 0.94) skewX(20deg)", backgroundImage: "linear-gradient(234.53deg, #2be1a2 27.74%, #5578ff 91.32%)" }}
            />
          </div>
          <div className="a-up absolute left-[936px] top-[67px] flex h-[800px] w-[299.8px] items-center justify-center" style={d(0.35, { "--y": "120px" })}>
            <div className="h-[690.9px] w-[319.1px] shrink-0 overflow-hidden rounded-[20px] bg-navy" style={{ transform: "rotate(20deg) scale(1, 0.94) skewX(20deg)" }}>
              <LazyVideo src="/video/app.mp4" poster="/video/app-poster.jpg" className="size-full object-cover" />
            </div>
          </div>
          <img src="/img/about/swoosh2.svg" alt="" className="a-wipe-rtl loop pointer-events-none absolute left-[95px] top-[217.6px] h-[707.7px] w-[2096.9px] max-w-none" style={d(0)} />
        </InView>

        {/* ── Why we win ── star grows outward, art 1 then art 2 slide up */}
        <InView className="absolute left-0 top-[2810px] h-[620px] w-[1440px]" threshold={0.3}>
          <div className="a-grow absolute left-[96px] top-[79.2px] h-[498.6px] w-[449px]" style={d(0)}>
            <img src="/img/about/art4-star.svg" alt="" className="size-full -scale-x-100" />
          </div>
          <div className="a-up absolute left-[-178px] top-[170px] h-[315px] w-[548px] overflow-hidden" style={d(0.35, { "--y": "60px" })}>
            <img src="/img/about/art-sprite.webp" alt="" className="absolute left-0 top-0 h-[158.93%] w-[137.03%] max-w-none" />
          </div>
          <div className="a-up absolute left-[370px] top-[135px] h-[186px] w-[321px] overflow-hidden" style={d(0.7, { "--y": "60px" })}>
            <img src="/img/about/art-sprite.webp" alt="" className="absolute left-[-133.96%] top-[-169.35%] h-[269.15%] w-[233.93%] max-w-none" />
          </div>
          <h2
            className="a-up grad-text absolute left-[730px] top-[39.4px] pb-1 text-[48px] font-medium leading-[0.95] tracking-[-0.06em]"
            style={{ ...d(0.1), backgroundImage: "linear-gradient(270deg, #ffaa5d 0%, #ff4288 100%)" }}
          >
            Why we win.
          </h2>
          <p className="a-up absolute left-[846px] top-[125.4px] w-[466px] text-[17px] leading-[1.7] text-muted" style={d(0.25)}>
            {WHY_WIN}
          </p>
        </InView>

        {/* ── Leadership ── */}
        <InView className="absolute left-0 top-[3510px] h-[600px] w-[1440px]" threshold={0.25}>
          {LEADERS.map((l, i) => (
            <div
              key={l.name}
              className="a-up absolute h-[411px] w-[329px]"
              style={{ left: [148, 556, 964][i], top: [135.4, 55.4, 135.4][i], ...d(0.15 * i, { "--y": "60px" }) }}
            >
              <LeaderCard leader={l} className="size-full" />
            </div>
          ))}
        </InView>

        {/* ── Investors ── */}
        <InView className="absolute left-[207px] top-[4216.7px] flex w-[1027px] flex-col items-center gap-10">
          <p className="a-up text-[32px] font-medium leading-[1.12] tracking-[-0.025em] text-blue">Investors</p>
          <div className="a-up" style={d(0.15, { "--y": "20px" })}>
            <Investors />
          </div>
        </InView>

        {/* ── Angels ── */}
        <InView className="absolute left-8 top-[4565.4px] flex w-[1376px] flex-col items-center gap-10">
          <p className="a-up text-[32px] font-medium leading-[1.12] tracking-[-0.025em] text-neon">Angels</p>
          <div className="w-[1142px]">
            <Angels />
          </div>
        </InView>

        {/* ── Community ── stars appear one by one */}
        <InView className="absolute left-0 top-[4910px] h-[917px] w-[1440px]" threshold={0.2}>
          <div className="a-pop absolute left-[606.5px] top-[429.4px] flex h-[319.7px] w-[309px] items-center justify-center" style={d(0.3)}>
            <div className="relative h-[268.6px] w-[254.3px] shrink-0 rotate-[13.24deg]">
              <img src="/img/about/star-a.svg" alt="" className="absolute inset-[-13.68%_-14.45%] max-w-none" />
            </div>
          </div>
          <div className="a-pop absolute left-[907px] top-[64.4px] h-[526px] w-[562px]" style={d(0.1)}>
            <img src="/img/about/star-b.svg" alt="" className="absolute inset-[-9.15%_-8.57%] max-w-none" />
          </div>
          <div className="a-pop absolute left-[1173.3px] top-[626.4px] flex h-[232.2px] w-[220px] items-center justify-center" style={d(0.5)}>
            <div className="relative h-[201.2px] w-[185.9px] shrink-0 rotate-[10.68deg]">
              <img src="/img/about/star-c.svg" alt="" className="absolute inset-[-20.76%_-22.46%] max-w-none" />
            </div>
          </div>
          <div className="a-up absolute left-10 top-[99.4px] w-[1019px]" style={d(0)}>
            <CommunityHeadline className="text-[72px]" />
          </div>
          <Footer className="absolute bottom-12 left-1/2 -translate-x-1/2" />
        </InView>
      </Stage>

      {/* ═════════════ Mobile / tablet ═════════════ */}
      <div className="overflow-hidden lg:hidden">
        <InView className="relative overflow-hidden bg-cloud pb-[420px]" threshold={0}>
          <MobileNav tone="light" />
          <div className="relative z-10 flex flex-col gap-6 px-5 pt-14">
            <h1 className="a-up text-[40px] font-medium leading-[0.92] tracking-[-0.06em] text-dark-navy sm:text-[56px]" style={d(0.1)}>
              We’re on a mission to share{" "}
              <span className="text-violet">
                fun <img src="/img/about/symbol-inline.svg" alt="" className="inline-block h-[0.9em] w-auto align-[-0.12em]" /> with the world
              </span>
            </h1>
            <p className="a-up max-w-[465px] text-[17px] leading-[1.55] text-dark-navy" style={d(0.25)}>
              Astrocade is where anyone can create, share, and play games and interactive content.
            </p>
          </div>
          <div className="absolute bottom-0 left-1/2 h-[440px] w-[560px] -translate-x-[40%]">
            <img src="/img/about/hero-star.svg" alt="" className="hero-star-in absolute left-[-120px] top-[10px] h-[640px] w-[592px] max-w-none rotate-[10.68deg]" style={d(0.1)} />
            <img src="/img/about/grid2.svg" alt="" className="tile-grow absolute left-[260px] top-[60px] size-[150px] origin-bottom-left" style={d(0.75)} />
            <img src="/img/about/grid1.svg" alt="" className="tile-grow absolute left-[110px] top-[210px] size-[150px] origin-top-right" style={d(0.95)} />
          </div>
        </InView>

        <section className="flex flex-col gap-24 px-5 py-24">
          <InView className="flex flex-col gap-6">
            <div className="flex gap-3">
              {[
                ["/img/about/art-skate.webp", "#1739c7"],
                ["/img/about/art-food.webp", "#f0f1ea"],
                ["/img/about/art-mascot.webp", "#2ddaa7"],
              ].map(([src, bg], i) => (
                <div key={src} className="a-up aspect-square flex-1 overflow-hidden rounded-[16px] p-2" style={{ background: bg, ...d(0.1 + i * 0.2, { "--y": "40px" }) }}>
                  <img src={src} alt="" className="size-full object-contain" />
                </div>
              ))}
            </div>
            <h2 className="a-up grad-text pb-1 text-[32px] font-medium leading-[0.95] tracking-[-0.06em]" style={{ backgroundImage: "linear-gradient(90deg, #5578ff 0%, #2be1a2 87.39%)", ...d(0.2) }}>
              Why now.
            </h2>
            <div className="a-up flex flex-col gap-6 text-[17px] leading-[1.7] text-muted" style={d(0.3)}>
              {WHY_NOW.map((p) => (
                <p key={p.slice(0, 12)}>{p}</p>
              ))}
            </div>
          </InView>

          <InView className="flex flex-col gap-6">
            <h2 className="a-up text-[32px] font-medium leading-[0.95] tracking-[-0.06em]">
              What we are and
              <span className="grad-text block pb-1" style={{ backgroundImage: "linear-gradient(270deg, #c42fed 0%, #ff4288 100%)" }}>
                where we’re headed.
              </span>
            </h2>
            <p className="a-up text-[17px] leading-[1.7] text-muted" style={d(0.15)}>
              {WHAT_WE_ARE}
            </p>
            <div className="a-up mx-auto mt-4 aspect-[9/16] w-[240px] overflow-hidden rounded-[20px] shadow-[16px_16px_0_#2be1a2]" style={d(0.3, { "--y": "80px" })}>
              <LazyVideo src="/video/app.mp4" poster="/video/app-poster.jpg" className="size-full object-cover" />
            </div>
          </InView>

          <InView className="flex flex-col gap-6">
            <div className="relative mx-auto h-[240px] w-full max-w-[400px]">
              <div className="a-grow absolute left-[10%] top-0 h-full">
                <img src="/img/about/art4-star.svg" alt="" className="h-full -scale-x-100" />
              </div>
              <div className="a-up absolute bottom-0 left-0 h-[150px] w-[260px] overflow-hidden" style={d(0.35)}>
                <img src="/img/about/art-sprite.webp" alt="" className="absolute left-0 top-0 h-[158.93%] w-[137.03%] max-w-none" />
              </div>
            </div>
            <h2 className="a-up grad-text pb-1 text-[32px] font-medium leading-[0.95] tracking-[-0.06em]" style={{ backgroundImage: "linear-gradient(270deg, #ffaa5d 0%, #ff4288 100%)" }}>
              Why we win.
            </h2>
            <p className="a-up text-[17px] leading-[1.7] text-muted" style={d(0.15)}>
              {WHY_WIN}
            </p>
          </InView>

          <InView className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center">
            {LEADERS.map((l, i) => (
              <div key={l.name} className="a-up h-[411px] w-full max-w-[329px]" style={d(0.15 * i)}>
                <LeaderCard leader={l} className="size-full" compact />
              </div>
            ))}
          </InView>

          <InView className="flex flex-col items-center gap-8">
            <p className="a-up text-[24px] font-medium text-blue">Investors</p>
            <div className="a-up" style={d(0.15)}>
              <Investors mobile />
            </div>
          </InView>

          <InView className="flex flex-col items-center gap-8">
            <p className="a-up text-[24px] font-medium text-neon">Angels</p>
            <Angels cols={2} />
          </InView>

          <InView className="relative pb-40">
            <img src="/img/about/star-b.svg" alt="" className="a-pop absolute -right-16 top-24 w-[260px] max-w-none opacity-90" style={d(0.1)} />
            <img src="/img/about/star-a.svg" alt="" className="a-pop absolute bottom-0 left-1/4 w-[150px] rotate-[13deg]" style={d(0.3)} />
            <div className="a-up relative">
              <CommunityHeadline className="text-[40px]" />
            </div>
          </InView>
        </section>
        <Footer className="pb-6" />
      </div>
    </main>
  );
}
