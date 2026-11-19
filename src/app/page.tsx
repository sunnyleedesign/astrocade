import Stage from "@/components/Stage";
import InView from "@/components/InView";
import InlineSvg from "@/components/InlineSvg";
import LazyVideo from "@/components/LazyVideo";
import Footer from "@/components/Footer";
import PlayCreateShare from "@/components/PlayCreateShare";
import { DesktopNav, MobileNav } from "@/components/Nav";
import { GRAD, LogoRow, StatPill } from "@/components/bits";

const d = (s: number) => ({ ["--d" as string]: `${s}s` });

const STATS = [
  { label: "Monthly players", value: "15M+", grad: GRAD.ocean },
  { label: "Plays every month", value: "350M+", grad: GRAD.sunset },
  { label: "Creators", value: "2M+", grad: GRAD.violet },
];

const starDelays = (i: number) => `--d:${0.25 + i * 0.22}s`;

export default function HomePage() {
  return (
    <main>
      <DesktopNav />
      {/* ═════════════ Desktop (Figma: Homepage, 1440 × 3619) ═════════════ */}
      <Stage height={3551} className="hidden lg:block">

        {/* Hero video + fade overlay */}
        <InView className="absolute left-0 top-[697px] h-[713px] w-[1440px]" threshold={0}>
          <div className="a-fade size-full" style={d(0.5)}>
            <LazyVideo
              src="/video/landing-hero.mp4"
              poster="/video/landing-hero-poster.jpg"
              className="size-full object-cover"
            />
          </div>
        </InView>
        <div
          className="pointer-events-none absolute left-0 top-0 h-[1280px] w-[1440px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #040e22 35%, rgba(4,14,34,0) 55%, rgba(4,14,34,0) 85%, #040e22 98%)",
          }}
        />

        {/* Hero copy */}
        <InView className="absolute left-[135.9px] top-[231px] flex w-[1168px] flex-col items-center gap-10 text-center" threshold={0}>
          <h1 className="w-full text-[104px] font-medium leading-[0.95] tracking-[-0.035em]">
            <span className="a-up block" style={d(0.1)}>
              Where the Internet
            </span>
            <span className="a-up grad-text block pb-[0.25em] -mb-[calc(0.25em-8px)]" style={{ ...d(0.25), backgroundImage: "linear-gradient(255.7deg, #ff4288 0.94%, #ffaa5d 98.94%)" }}>
              comes to play.
            </span>
          </h1>
          <p className="a-up w-[520px] text-[20px] leading-[1.55] text-muted" style={d(0.4)}>
            Astrocade is where anyone can create, share, and play games and interactive content
          </p>
        </InView>

        {/* Stars + stats: symbol spins in, 5 stars pop one by one, stats slide up */}
        <InView className="absolute left-0 top-[1530px] h-[740px] w-[1440px]" threshold={0.35}>
          <InlineSvg
            src="img/home/stars.svg"
            className="svg-anim absolute left-[351.5px] top-[14px] h-[696.5px] w-[757px]"
            pathClass="a-pop"
            pathStyle={starDelays}
          />
          <img src="/img/home/symbol-big.svg" alt="" className="a-spin absolute left-[642.9px] top-[248.4px] h-[168px] w-[174.9px]" />
          <StatPill {...STATS[0]} className="a-up absolute left-[97px] top-[265px] px-10 py-6" style={{ ...d(0.5), ["--y" as string]: "24px" }} />
          <StatPill {...STATS[1]} className="a-up absolute left-[921.5px] top-[115.4px] px-10 py-6" style={{ ...d(0.7), ["--y" as string]: "24px" }} />
          <StatPill {...STATS[2]} className="a-up absolute left-[765.5px] top-[544px] px-10 py-6" style={{ ...d(0.9), ["--y" as string]: "24px" }} />
        </InView>

        {/* Backed by */}
        <InView className="absolute left-[207px] top-[2374px] flex w-[1027px] flex-col items-center gap-10">
          <p className="a-up text-[32px] font-medium leading-[1.12] tracking-[-0.025em] text-blue">Backed by</p>
          <LogoRow />
        </InView>

        {/* Ending: headline + Play / Create / Share */}
        <section className="absolute left-0 top-[2706px] h-[845px] w-[1440px] overflow-x-clip">
          <InView className="absolute left-[146.5px] top-0 z-20 w-[1143px] text-center text-[72px] font-medium leading-[0.92] tracking-[-0.06em]">
            <h2>
              <span className="a-up block">and the people who built the</span>
              <span className="a-up grad-text block pb-[0.25em] -mb-[calc(0.25em-8px)]" style={{ ...d(0.15), backgroundImage: GRAD.violet }}>
                Internet’s biggest platforms
              </span>
            </h2>
          </InView>
          <PlayCreateShare
            swooshSrc="/img/home/swoosh.svg"
            swooshBox={{ left: 207, top: 11, width: 3546, height: 721 }}
            swooshImg={{ width: 3521.4, height: 471.5 }}
            tagTop={360}
          />
          <Footer className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2" />
        </section>
      </Stage>

      {/* ═════════════ Mobile (Figma: Mobile, 375 × 2407) ═════════════ */}
      <div className="overflow-hidden lg:hidden">
        <MobileNav />

        <InView className="mx-auto mt-16 flex max-w-[480px] flex-col items-center gap-8 px-5 text-center" threshold={0}>
          <h1 className="text-[56px] font-medium leading-[0.95] tracking-[-0.035em]">
            <span className="a-up block" style={d(0.1)}>
              Where the Internet
            </span>
            <span className="a-up grad-text block pb-[0.25em] -mb-[calc(0.25em-4px)]" style={{ ...d(0.25), backgroundImage: "linear-gradient(266deg, #ff4288 0.94%, #ffaa5d 98.94%)" }}>
              comes to play.
            </span>
          </h1>
          <p className="a-up text-[17px] leading-[1.55] text-muted" style={d(0.4)}>
            Astrocade is where anyone can create, share, and play games and interactive content
          </p>
        </InView>

        <div className="relative mt-[86px] flex h-[320px] justify-center">
          <LazyVideo
            src="/video/landing-hero.mp4"
            poster="/video/landing-hero-poster.jpg"
            className="h-[320px] w-[646.6px] max-w-none shrink-0 object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: "linear-gradient(180deg, #040e22 0%, rgba(4,14,34,0) 18%, rgba(4,14,34,0) 75%, #040e22 100%)" }}
          />
        </div>

        <InView className="relative mx-auto mt-[84px] w-[335px]" threshold={0.2}>
          <div className="relative left-1/2 h-[348px] w-[378.5px] -translate-x-1/2">
            <InlineSvg
              src="img/home/stars.svg"
              className="svg-anim absolute inset-0"
              pathClass="a-pop"
              pathStyle={starDelays}
            />
            <img src="/img/home/symbol-big.svg" alt="" className="a-spin absolute left-[145.7px] top-[117.2px] h-[84px] w-[87.4px]" />
          </div>
          {/* pills have their own trigger so they pop in one by one when they reach the screen */}
          <InView className="relative -mt-[26px] flex flex-col gap-6" threshold={0.35}>
            {[STATS[1], STATS[0], STATS[2]].map((s, i) => (
              <StatPill key={s.label} {...s} size="sm" className="a-up w-full" style={{ ...d(0.1 + i * 0.25), ["--y" as string]: "28px" }} />
            ))}
          </InView>
        </InView>

        <InView className="mt-[103px] flex flex-col items-center gap-6">
          <p className="a-up text-[24px] font-medium leading-[1.12] tracking-[-0.025em] text-blue">Backed by</p>
          <div className="w-full overflow-hidden">
            <div className="marquee flex w-max">
              <div className="pr-6">
                <LogoRow scale={0.833} gap={24} dot={4} animate={false} />
              </div>
              <div className="pr-6" aria-hidden>
                <LogoRow scale={0.833} gap={24} dot={4} animate={false} />
              </div>
            </div>
          </div>
        </InView>

        <section className="relative mt-[96px] h-[590px]">
          <InView className="relative z-20 mx-auto w-[335px] text-center text-[40px] font-medium leading-[0.92] tracking-[-0.06em]">
            <h2>
              <span className="a-up block">and the people who built the</span>
              <span className="a-up grad-text block pb-[0.25em] -mb-[calc(0.25em-4px)]" style={{ ...d(0.15), backgroundImage: GRAD.violet }}>
                Internet’s biggest platforms
              </span>
            </h2>
          </InView>
          <div className="absolute inset-0 left-1/2 w-[375px] -translate-x-1/2">
            <PlayCreateShare
              mobile
              swooshSrc="/img/mobile/swoosh.svg"
              swooshBox={{ left: -100, top: 210, width: 1707, height: 347.5 }}
              swooshImg={{ width: 1695.5, height: 227 }}
              tagTop={259}
            />
          </div>
          <Footer className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2" />
        </section>
      </div>
    </main>
  );
}
