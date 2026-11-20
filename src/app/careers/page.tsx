import type { Metadata } from "next";
import Stage from "@/components/Stage";
import InView from "@/components/InView";
import Footer from "@/components/Footer";
import { DesktopNav, MobileNav } from "@/components/Nav";
import { Benefits, CopyButton, OpenRoles, PeopleCarousel } from "@/components/careers";
import { PILLARS, VALUES } from "@/content/careers";

export const metadata: Metadata = { title: "Careers" };

const d = (s: number, extra: Record<string, string> = {}) => ({ ["--d" as string]: `${s}s`, ...extra });

const HERO_GRAD = "linear-gradient(to left, #c42fed, #ff4288)";

function ProductUI({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`flex flex-col gap-7 rounded-[20px] border-[0.737px] border-white bg-[rgba(11,25,54,0.95)] ${className}`} style={style}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[24px] font-semibold tracking-[-0.02em] text-white max-sm:text-[18px]">Run this in your terminal</p>
        <CopyButton />
      </div>
      <div className="overflow-x-auto rounded-[20px] bg-dark-navy p-5 font-mono text-[12.5px] text-cloud">
        <p className="whitespace-nowrap">claude mcp add --transport http --scope user astrocade</p>
        <p className="mt-1 whitespace-nowrap">https://mcp.astrocade.com/mcp</p>
      </div>
      <div className="flex items-start gap-3 text-[14px] text-white">
        <span className="flex size-[23.6px] shrink-0 items-center justify-center rounded-full bg-neon text-[11px] font-semibold text-dark-navy">1</span>
        <p>
          In Claude Code, run{" "}
          <code className="rounded-[6px] bg-dark-navy px-[6px] py-px font-mono text-[12px] text-neon">/mcp</code>, pick astrocade and choose
          Authenticate.
        </p>
      </div>
      <div className="flex items-center gap-3 text-[14px] text-white">
        <span className="flex size-[23.6px] shrink-0 items-center justify-center rounded-full bg-neon text-[11px] font-semibold text-dark-navy">2</span>
        <p>Sign in to Astrocade and click Allow.</p>
      </div>
    </div>
  );
}

function ValueCard({ title, body, mobile = false }: { title: string[]; body: string; mobile?: boolean }) {
  return (
    <div
      className={`group relative flex flex-col gap-6 overflow-hidden rounded-[20px] bg-navy px-8 text-white transition-[height,padding,color] duration-500 ease-[var(--ease-out-expo)] hover:text-dark-navy ${
        mobile ? "py-10" : "h-[427px] flex-1 pt-16 hover:h-[459px] hover:pt-20"
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundImage: "linear-gradient(-52.2deg, #c42fed 10.98%, #ff4288 95.52%)" }}
      />
      <p className="relative text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] text-violet transition-colors duration-500 group-hover:text-dark-navy">
        {title[0]}
        <br />
        {title[1]}
      </p>
      <p className="relative text-[17px] leading-[1.7]">{body}</p>
    </div>
  );
}

export default function CareersPage() {
  return (
    <main className="relative">
      <DesktopNav tone="light" />
      <div data-nav-light className="absolute inset-x-0 top-0 hidden h-[calc(946px*var(--vs))] bg-cloud lg:block" />

      {/* ═════════════ Desktop (Figma: Career, 1440 × 5884) ═════════════ */}
      <Stage height={5714} className="hidden lg:block" innerClassName="overflow-hidden">
        {/* Hero — colour blocks pop in one by one while the product UI slides up */}
        <InView className="absolute left-0 top-[2px] h-[944px] w-[1440px] overflow-hidden bg-cloud" threshold={0}>
          {/* boxes appear one by one, then the product UI; afterwards the boxes
              keep resizing through the 3 storyboard states while the UI stays put */}
          <div className="career-box career-box-1 absolute"><div className="a-tile size-full rounded-[20px] bg-neon" style={d(0.15)} /></div>
          <div className="career-box career-box-2 absolute"><div className="a-tile size-full rounded-[20px] bg-blue" style={d(0.35)} /></div>
          <div className="career-box career-box-3 absolute"><div className="a-tile size-full rounded-[20px] bg-violet" style={d(0.55)} /></div>
          <ProductUI className="a-up absolute left-[776px] top-[345px] w-[594px] p-10" style={d(0.9, { "--y": "120px" })} />

          <h1 className="absolute left-8 top-[151px] w-[678px] text-[72px] font-medium leading-[0.92] tracking-[-0.06em] text-dark-navy">
            <span className="a-up block" style={d(0.05)}>
              Frontier models are trained on code.
            </span>
            <span className="a-up grad-text block pb-2" style={{ ...d(0.2), backgroundImage: HERO_GRAD }}>
              Help us train
              <br />
              ours on fun.
            </span>
          </h1>
          <p className="a-up absolute left-8 top-[455px] w-[465px] text-[20px] leading-[1.55] text-dark-navy" style={d(0.3)}>
            Astrocade is where anyone can create, share, and play games and interactive content.
          </p>
          <div className="a-up absolute left-8 top-[573px] flex gap-4 text-[18px] font-medium tracking-[-0.01em] text-dark-navy" style={d(0.4)}>
            <a
              href="#open-roles"
              className="rounded-full px-8 py-5 transition-[background-position] duration-500 hover:[background-position:0_100%]"
              style={{ backgroundImage: "linear-gradient(180deg, #2be1a2 0%, #5578ff 50%, #5578ff 100%)", backgroundSize: "100% 200%" }}
            >
              See open roles
            </a>
            <a href="/about" className="grad-outline on-light rounded-full px-8 py-5">
              Our story
            </a>
          </div>
        </InView>

        {/* Intro */}
        <InView className="absolute left-[148px] top-[1146px] w-[1173px]">
          <div className="flex gap-[136px]">
            <h2 className="a-up w-[562px] shrink-0 text-[48px] font-medium leading-[0.95] tracking-[-0.06em]">
              On <img src="/img/career/symbol-inline.svg" alt="" className="mx-1 inline-block h-[64px] w-[66.6px] align-[-0.32em]" />{" "}
              <span className="text-violet">Astrocade</span>
            </h2>
            <p className="a-up text-[17px] leading-[1.7] text-muted" style={d(0.1)}>
              Anyone can turn an idea into something playable in minutes, while a personalized feed presents it to the players most likely to love it across a global audience.
            </p>
          </div>
          <div className="mt-[80px] flex gap-[136px]">
            <h2 className="a-up w-[562px] shrink-0 text-[48px] font-medium leading-[0.95] tracking-[-0.06em]" style={d(0.15)}>
              We build the <span className="text-neon">AI</span>
              <br />
              behind both
            </h2>
            <p className="a-up w-[475px] text-[17px] leading-[1.7] text-muted" style={d(0.25)}>
              The models that turn a sentence into a game, and the recommendation system that decides what millions of players should experience next. With each next game made and played, we’re learning to make both better.
            </p>
          </div>
        </InView>

        {/* Own / Ship / Build — gradients sweep in */}
        <div className="absolute left-[148px] top-[1629px] flex w-[1144px] flex-col gap-[73px]">
          {PILLARS.map((p) => (
            <InView key={p.word} className="flex items-center justify-between" threshold={0.5}>
              <p
                className="a-grad grad-text whitespace-nowrap pb-2 text-[112px] font-medium leading-[0.95] tracking-[-0.06em]"
                style={{ backgroundImage: `${p.grad}, linear-gradient(#fff, #fff)`, ...d(0.1) }}
              >
                {p.word}
              </p>
              <div className="a-up flex w-[562px] flex-col gap-4" style={d(0.2)}>
                <p className="text-[32px] font-medium leading-[1.12] tracking-[-0.025em] text-white">{p.title}</p>
                <p className="text-[17px] leading-[1.7] text-muted">{p.body}</p>
              </div>
            </InView>
          ))}
        </div>

        {/* Values — gradient on hover */}
        <InView className="absolute left-8 top-[2290px] flex h-[459px] w-[1376px] items-center gap-[2px]">
          {VALUES.map((v, i) => (
            <div key={v.body} className="a-up flex h-full flex-1 items-center" style={d(0.08 * i, { "--y": "30px" })}>
              <div className="flex w-full items-center">
                <ValueCard {...v} />
              </div>
            </div>
          ))}
        </InView>

        {/* People carousel */}
        <section className="absolute left-0 top-[2869px] h-[762px] w-[1440px] overflow-hidden bg-navy">
          <PeopleCarousel />
        </section>

        {/* Benefits */}
        <InView className="absolute left-0 top-[3550px] h-[1000px] w-[1440px]" threshold={0.1}>
          {/* supplied star images */}
          <img src="/img/career/star-big-img.webp" alt="" className="a-pop absolute left-[1028px] top-[6px] h-[396px] w-[412px] max-w-none" style={d(0.1)} />
          <img src="/img/career/star-peach-img.webp" alt="" className="a-pop absolute left-[127.2px] top-[637.9px] h-[285px] w-[287px] max-w-none" style={d(0.4)} />
          <p className="a-up absolute left-0 top-[257px] w-[1440px] text-center text-[32px] font-medium leading-[1.12] tracking-[-0.025em]">Benefits</p>
          <div className="absolute left-0 top-[373px] w-[1440px]">
            <Benefits />
          </div>
        </InView>

        {/* Open roles */}
        <div className="absolute left-10 top-[4568px] w-[1360px]">
          <OpenRoles />
        </div>

        <Footer className="absolute bottom-6 left-1/2 -translate-x-1/2" />
      </Stage>

      {/* ═════════════ Mobile / tablet ═════════════ */}
      <div className="overflow-hidden lg:hidden">
        <InView className="relative overflow-hidden bg-cloud pb-16" threshold={0}>
          <div data-nav-light aria-hidden className="pointer-events-none absolute inset-0" />
          <div className="a-tile absolute -right-16 -top-24 size-[220px] rounded-[20px] bg-neon" style={d(0.15)} />
          <MobileNav tone="light" />
          <div className="relative flex flex-col gap-6 px-5 pt-14">
            <h1 className="text-[40px] font-medium leading-[0.92] tracking-[-0.06em] text-dark-navy sm:text-[56px]">
              <span className="a-up block">Frontier models are trained on code.</span>
              <span className="a-up grad-text block pb-1" style={{ ...d(0.15), backgroundImage: HERO_GRAD }}>
                Help us train ours on fun.
              </span>
            </h1>
            <p className="a-up text-[17px] leading-[1.55] text-dark-navy" style={d(0.25)}>
              Astrocade is where anyone can create, share, and play games and interactive content.
            </p>
            <div className="a-up flex flex-wrap gap-3 text-[16px] font-medium text-dark-navy" style={d(0.35)}>
              <a href="#open-roles" className="rounded-full px-6 py-4" style={{ backgroundImage: "linear-gradient(180deg, #2be1a2 0%, #5578ff 100%)" }}>
                See open roles
              </a>
              <a href="/about" className="grad-outline on-light rounded-full px-6 py-4">
                Our story
              </a>
            </div>
          </div>
          <div className="relative mt-16 px-5">
            <div className="a-tile absolute -left-6 -top-8 h-[260px] w-[260px] rounded-[20px] bg-blue" style={d(0.3)} />
            <div className="a-tile absolute -bottom-10 -right-10 size-[140px] rounded-[20px] bg-violet" style={d(0.45)} />
            <ProductUI className="a-up relative p-6" style={d(0.45, { "--y": "80px" })} />
          </div>
        </InView>

        <section className="flex flex-col gap-20 px-5 py-20">
          <InView className="flex flex-col gap-10">
            <div className="a-up flex flex-col gap-4">
              <h2 className="text-[32px] font-medium leading-[0.95] tracking-[-0.06em]">
                On <img src="/img/career/symbol-inline.svg" alt="" className="inline-block h-[44px] w-auto align-[-0.32em]" /> <span className="text-violet">Astrocade</span>
              </h2>
              <p className="text-[17px] leading-[1.7] text-muted">
                Anyone can turn an idea into something playable in minutes, while a personalized feed presents it to the players most likely to love it across a global audience.
              </p>
            </div>
            <div className="a-up flex flex-col gap-4" style={d(0.15)}>
              <h2 className="text-[32px] font-medium leading-[0.95] tracking-[-0.06em]">
                We build the <span className="text-neon">AI</span> behind both
              </h2>
              <p className="text-[17px] leading-[1.7] text-muted">
                The models that turn a sentence into a game, and the recommendation system that decides what millions of players should experience next. With each next game made and played, we’re learning to make both better.
              </p>
            </div>
          </InView>

          <div className="flex flex-col gap-12">
            {PILLARS.map((p) => (
              <InView key={p.word} className="flex flex-col gap-3" threshold={0.5}>
                <p className="a-grad grad-text pb-1 text-[72px] font-medium leading-[0.95] tracking-[-0.06em]" style={{ backgroundImage: `${p.grad}, linear-gradient(#fff, #fff)` }}>
                  {p.word}
                </p>
                <p className="a-up text-[24px] font-medium text-white" style={d(0.15)}>
                  {p.title}
                </p>
                <p className="a-up text-[17px] leading-[1.7] text-muted" style={d(0.2)}>
                  {p.body}
                </p>
              </InView>
            ))}
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {VALUES.map((v) => (
              <ValueCard key={v.body} {...v} mobile />
            ))}
          </div>
        </section>

        <section className="bg-navy px-5 py-16">
          <PeopleCarousel mobile />
        </section>

        <InView className="relative px-5 py-24" threshold={0.1}>
          <img src="/img/career/star-big-img.webp" alt="" className="a-pop absolute -right-10 top-4 w-[170px]" />
          <p className="a-up mb-10 text-center text-[24px] font-medium">Benefits</p>
          <Benefits mobile />
        </InView>

        <section className="px-5 pb-20">
          <OpenRoles mobile />
        </section>
        <Footer className="pb-6" />
      </div>
    </main>
  );
}
