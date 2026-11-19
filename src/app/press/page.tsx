import type { Metadata } from "next";
import Link from "next/link";
import Stage from "@/components/Stage";
import InView from "@/components/InView";
import Footer from "@/components/Footer";
import { DesktopNav, MobileNav } from "@/components/Nav";
import { GRAD, StatPill } from "@/components/bits";

export const metadata: Metadata = { title: "Press" };

const d = (s: number, extra: Record<string, string> = {}) => ({ ["--d" as string]: `${s}s`, ...extra });

const ABOUT_COPY = [
  "Astrocade is building a new platform for content, where anyone can create, share, and play interactive content, starting with games. Dream up an idea, and Astrocade turns it into something playable leveraging AI. A personalized feed then brings it to the players most likely to love it. Astrocade has 15M+ monthly players and 350M+ monthly plays. Co-founded by Amir and Ali Sadeghian with Fei-Fei Li and based in Palo Alto, the company is backed by Sequoia, Peak XV, Sea, Google's AI Futures Fund, NVIDIA and others.",
  "Astrocade is where the internet comes to play: anyone can create, share, and play games and more. Based in Palo Alto, 15M+ monthly players, $130M in total funding, backed by Sequoia, Peak XV Google and NVIDIA.",
];

// Replace "#" with links to the real asset bundles.
const KIT_LINKS = { brand: "#", logo: "#" };

const STATS = {
  players: { label: "Monthly players", value: "15M+", grad: GRAD.magenta },
  available: { label: "Available on", value: "iOS, Android, & Web", grad: GRAD.ocean },
  plays: { label: "Plays every month", value: "350M+", grad: GRAD.sunset },
  hq: { label: "Headquarter", value: "Palo Alto", grad: "linear-gradient(to left, #c42fed, #5578ff)" },
};

function KitCards({ mobile = false }: { mobile?: boolean }) {
  const label = `font-semibold text-white text-center ${mobile ? "text-[18px]" : "text-[24px]"}`;
  const card = "relative aspect-[4/3] w-full overflow-hidden rounded-[20px] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5";
  const items = [
    {
      name: "Company logos",
      body: (
        <div className={`${card} bg-violet`}>
          <img src="/img/home/symbol-big.svg" alt="" className="absolute left-[28%] top-[22%] h-[56.4%] w-[44.1%]" />
        </div>
      ),
    },
    {
      name: "Product photography",
      body: (
        <div className={`${card} bg-neon`}>
          <img src="/img/press/product-photo.webp" alt="" className="absolute inset-0 size-full object-cover" />
        </div>
      ),
    },
    {
      name: "Founder headshots",
      body: (
        <div className={`${card} bg-blue`}>
          <div className="absolute inset-0 flex items-center justify-center gap-[3.7%]">
            {[
              { src: "/img/about/ceo1.webp", style: { left: "-12.5%", top: 0, width: "125%", height: "125%" } },
              { src: "/img/about/ceo2.webp", style: { left: "-19.49%", top: 0, width: "139.21%", height: "139.21%" } },
              { src: "/img/press/ceo3-head.webp", style: { inset: 0, width: "100%", height: "100%" } },
            ].map((a) => (
              <span key={a.src} className="relative aspect-square w-[24.9%] overflow-hidden rounded-full bg-cloud">
                <img src={a.src} alt="" className="absolute max-w-none object-cover object-bottom" style={a.style} />
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      name: "Brand guidelines",
      body: (
        <div className={`${card} bg-peach`}>
          <span className="absolute left-[17%] top-[50%] -translate-y-1/2 text-[min(173.6px,13vw)] font-medium leading-none tracking-[-0.1em] text-white lg:text-[173.6px]">
            Aa
          </span>
        </div>
      ),
    },
  ];
  return (
    <div className={mobile ? "grid grid-cols-2 gap-4" : "flex gap-[25px]"}>
      {items.map((it, i) => (
        <a key={it.name} href={KIT_LINKS.brand} className={`a-up group flex flex-col items-center gap-6 ${mobile ? "" : "w-[321px]"}`} style={d(0.08 * i, { "--y": "30px" })}>
          {it.body}
          <p className={label}>{it.name}</p>
        </a>
      ))}
    </div>
  );
}

function KitButtons({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={`flex gap-4 text-[18px] font-medium tracking-[-0.01em] ${mobile ? "flex-col" : ""}`}>
      <a
        href={KIT_LINKS.brand}
        className="flex h-[69px] items-center justify-center rounded-full px-8 text-dark-navy transition-[background-position] duration-500 hover:[background-position:0_100%]"
        style={{ backgroundImage: "linear-gradient(180deg, #2be1a2 0%, #5578ff 50%, #5578ff 100%)", backgroundSize: "100% 200%" }}
      >
        Download brand assets
      </a>
      <a href={KIT_LINKS.logo} className="flex h-[69px] items-center justify-center rounded-full border border-neon px-8 text-white transition-colors hover:bg-neon hover:text-dark-navy">
        Download logo kit
      </a>
    </div>
  );
}

function MediaContact({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-10 text-center font-medium">
      <p className={`a-up leading-[1.12] tracking-[-0.025em] text-neon ${mobile ? "text-[24px]" : "text-[32px]"}`}>Media Contact</p>
      <div className={`a-up leading-[0.95] tracking-[-0.06em] ${mobile ? "text-[32px]" : "text-[48px]"}`} style={d(0.15)}>
        <p>For media inquiries please contact</p>
        <a
          href="mailto:press@astrocade.com"
          className="grad-text inline-block pb-2 underline decoration-neon decoration-from-font underline-offset-[0.12em] transition-opacity hover:opacity-80"
          style={{ backgroundImage: "url(/img/press/media-texture.png), linear-gradient(90deg, #2be1a2, #2be1a2)", backgroundSize: "cover, auto", backgroundPosition: "center" }}
        >
          press@astrocade.com
        </a>
      </div>
    </div>
  );
}

/** 5 stars pop around the spinning symbol while the stats slide up (Figma comment on Press). */
function StarField({ className = "" }: { className?: string }) {
  // positions relative to a 1440 × 840 box starting at page y = 2180
  const stars = [
    { src: "/img/press/star1.svg", box: [482.7, 113.1, 180.5, 187.8], inner: [139.9, 151.3], rot: 18.44 },
    { src: "/img/press/star4.svg", box: [835.7, 134.3, 155.3, 145.4], inner: [155.3, 145.4], rot: 0 },
    { src: "/img/press/star3.svg", box: [372.5, 426, 179.6, 168.9], inner: [152.1, 137.7], rot: 13.24 },
    { src: "/img/press/star2.svg", box: [891.9, 518.2, 206.1, 199.3], inner: [159.6, 131.3], rot: -35.28 },
    { src: "/img/press/star5.svg", box: [634, 675.2, 172.6, 150.1], inner: [160.1, 135], rot: -5.66 },
  ];
  return (
    <div className={className}>
      {stars.map((s, i) => (
        <div
          key={s.src}
          className="a-pop absolute flex items-center justify-center"
          style={{ left: s.box[0], top: s.box[1], width: s.box[2], height: s.box[3], ...d(0.25 + i * 0.22) }}
        >
          <img src={s.src} alt="" className="max-w-none shrink-0" style={{ width: s.inner[0], height: s.inner[1], rotate: `${s.rot}deg` }} />
        </div>
      ))}
      <img src="/img/press/symbol.svg" alt="" className="a-spin absolute left-[632px] top-[335px] h-[168.4px] w-[175.3px]" />
    </div>
  );
}

export default function PressPage() {
  return (
    <main>
      {/* ═════════════ Desktop (Figma: Press - D, 1440 × 3184) ═════════════ */}
      <Stage height={3192} className="hidden lg:block">
        <DesktopNav />

        {/* Hero art — blurred stars appear, swoosh sweeps through and leaves */}
        <InView className="absolute inset-x-0 top-0 h-[1260px]" threshold={0}>
          <img src="/img/press/star-violet-r.webp" alt="" className="a-pop absolute left-[982.9px] top-[78.3px] h-[287px] w-[262px] max-w-none mix-blend-lighten" style={d(0.3)} />
          <img src="/img/press/star-green-r.webp" alt="" className="a-grow absolute left-[-46.1px] top-[327.8px] h-[667.5px] w-[612.5px] max-w-none mix-blend-lighten" style={d(0)} />
          <div className="a-up absolute left-[238px] top-[392px] h-[473.5px] w-[255px] overflow-hidden" style={d(0.2, { "--y": "60px" })}>
            <img src="/img/press/pencil.webp" alt="" className="absolute left-0 top-[-30.53%] h-[130.54%] w-[147.56%] max-w-none" />
          </div>
          <div className="a-wipe-ltr pointer-events-none absolute left-[-1466px] top-[430.2px] flex h-[796.9px] w-[2437.1px] items-center justify-center" style={d(0.5)}>
            <img src="/img/press/swoosh.svg" alt="" className="h-[637px] w-[2399.7px] max-w-none shrink-0 rotate-[3.86deg]" />
          </div>
          <img src="/img/press/star-peach-r.webp" alt="" className="a-pop absolute left-[1221px] top-[183.6px] h-[212px] w-[212.5px] max-w-none mix-blend-lighten" style={d(0.55)} />

          <h1 className="a-up absolute left-8 top-[149px] w-[562px] text-[72px] font-medium leading-[0.92] tracking-[-0.06em]" style={d(0.05)}>
            Astrocade news, facts and assets.
          </h1>
          <div className="a-up absolute left-[730px] top-[417px] flex w-[562px] flex-col gap-[29px] text-[17px] leading-[1.7] text-muted" style={d(0.2)}>
            {ABOUT_COPY.map((p) => (
              <p key={p.slice(0, 16)}>{p}</p>
            ))}
          </div>
          <Link
            href="/about"
            className="a-up absolute left-[732px] top-[887px] flex h-[69px] items-center rounded-full border-[0.75px] border-neon bg-dark-navy px-8 text-[18px] font-medium tracking-[-0.01em] transition-colors hover:bg-neon hover:text-dark-navy"
            style={d(0.3)}
          >
            Read more about us here
          </Link>
        </InView>

        {/* Press kit */}
        <InView className="absolute left-10 top-[1347px] w-[1360px]">
          <div className="a-up flex items-center justify-between">
            <h2 className="text-[48px] font-medium leading-[0.95] tracking-[-0.06em]">Press kit</h2>
            <KitButtons />
          </div>
          <div className="mt-10">
            <KitCards />
          </div>
        </InView>

        <InView className="absolute left-[326px] top-[1900px] w-[789px]">
          <MediaContact />
        </InView>

        {/* Stats */}
        <InView className="absolute left-0 top-[2180px] h-[840px] w-[1440px]" threshold={0.3}>
          <StarField className="absolute inset-0" />
          <StatPill {...STATS.plays} className="a-up absolute left-[845px] top-[32px] p-10" style={d(0.5, { "--y": "24px" })} />
          <StatPill {...STATS.players} className="a-up absolute left-[148px] top-[216px] p-10" style={d(0.65, { "--y": "24px" })} />
          <StatPill {...STATS.hq} className="a-up absolute left-[970px] top-[378px] p-10" style={d(0.8, { "--y": "24px" })} />
          <StatPill {...STATS.available} className="a-up absolute left-[31px] top-[583px] p-10" style={d(0.95, { "--y": "24px" })} />
        </InView>

        <Footer className="absolute bottom-12 left-1/2 -translate-x-1/2" />
      </Stage>

      {/* ═════════════ Mobile / tablet ═════════════ */}
      <div className="overflow-hidden lg:hidden">
        <MobileNav />
        <InView className="relative px-5 pt-14" threshold={0}>
          <img src="/img/press/star-violet-r.webp" alt="" className="a-pop absolute -right-10 -top-6 w-[170px] mix-blend-lighten" style={d(0.3)} />
          <h1 className="a-up relative text-[40px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[56px]">Astrocade news, facts and assets.</h1>
          <div className="relative mt-10 h-[340px]">
            <img src="/img/press/star-green-r.webp" alt="" className="a-grow absolute -left-12 -top-10 h-[400px] w-auto max-w-none mix-blend-lighten" />
            <div className="a-up absolute left-[110px] top-0 h-[300px] w-[160px] overflow-hidden" style={d(0.2)}>
              <img src="/img/press/pencil.webp" alt="" className="absolute left-0 top-[-30.53%] h-[130.54%] w-[147.56%] max-w-none" />
            </div>
          </div>
          <div className="a-up mt-6 flex flex-col gap-6 text-[17px] leading-[1.7] text-muted" style={d(0.2)}>
            {ABOUT_COPY.map((p) => (
              <p key={p.slice(0, 16)}>{p}</p>
            ))}
          </div>
          <Link href="/about" className="a-up mt-8 inline-flex h-[60px] items-center rounded-full border-[0.75px] border-neon px-7 text-[16px] font-medium" style={d(0.3)}>
            Read more about us here
          </Link>
        </InView>

        <InView className="mt-20 flex flex-col gap-8 px-5">
          <h2 className="a-up text-[32px] font-medium leading-[0.95] tracking-[-0.06em]">Press kit</h2>
          <KitCards mobile />
          <KitButtons mobile />
        </InView>

        <InView className="mt-20 px-5">
          <MediaContact mobile />
        </InView>

        <InView className="mt-20 px-5" threshold={0.2}>
          <div className="relative mx-auto h-[310px] w-[378px] max-w-none left-1/2 -translate-x-1/2">
            <div className="absolute left-0 top-0 h-[840px] w-[1440px] origin-top-left scale-[0.32] translate-x-[-45px] translate-y-[-30px]">
              <StarField className="absolute inset-0" />
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-4">
            {[STATS.plays, STATS.players, STATS.hq, STATS.available].map((s, i) => (
              <StatPill key={s.label} {...s} size="sm" className="a-up w-full !gap-2 !px-4 [&>span:last-child]:!text-[26px]" style={d(0.4 + i * 0.15, { "--y": "20px" })} />
            ))}
          </div>
        </InView>
        <Footer className="mt-16 pb-6" />
      </div>
    </main>
  );
}
