import type { Metadata } from "next";
import Stage from "@/components/Stage";
import InView from "@/components/InView";
import BlogStar from "@/components/BlogStar";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import { DesktopNav, MobileNav } from "@/components/Nav";

export const metadata: Metadata = { title: "Blog" };

const BLOG_GRAD = "linear-gradient(111.65deg, #5578ff 6.54%, #f956d1 49%)";


export default function BlogPage() {
  return (
    <main>
      <DesktopNav />
      {/* ═════════════ Desktop (Figma: Blog - D, 1440 × 3105) ═════════════ */}
      <Stage height={3161} className="hidden lg:block">
        <InView className="absolute left-[487px] top-[-123px] flex h-[1300.4px] w-[1258.7px] items-center justify-center" threshold={0}>
          <BlogStar className="h-[1158px] w-[1109.26px] shrink-0 rotate-[7.95deg]" />
        </InView>

        <InView className="absolute left-8 top-[151px] w-[562px]" threshold={0}>
          <h1 className="a-up grad-text pb-[0.25em] -mb-[calc(0.25em-12px)] text-[104px] font-medium leading-[0.95] tracking-[-0.035em]" style={{ backgroundImage: BLOG_GRAD }}>
            Blog
          </h1>
          <p className="a-up mt-[94px] text-[48px] font-medium leading-[0.95] tracking-[-0.06em]" style={{ ["--d" as string]: "0.15s" }}>
            Research and stories from the team building Astrocade.
          </p>
        </InView>

        <div className="absolute left-[42px] top-[635px] w-[1360px]">
          <BlogList />
        </div>

        <Footer className="absolute bottom-20 left-1/2 -translate-x-1/2" />
      </Stage>

      {/* ═════════════ Mobile / tablet ═════════════ */}
      <div className="overflow-hidden lg:hidden">
        <MobileNav />
        <InView className="relative px-5 pb-10 pt-14" threshold={0}>
          <div className="pointer-events-none absolute -right-[260px] -top-[120px] h-[620px] w-[600px]">
            <BlogStar className="size-full rotate-[7.95deg] opacity-80" />
          </div>
          <h1 className="a-up grad-text relative pb-[0.25em] -mb-[calc(0.25em-8px)] text-[72px] font-medium leading-[0.95] tracking-[-0.035em]" style={{ backgroundImage: BLOG_GRAD }}>
            Blog
          </h1>
          <p className="a-up relative mt-10 max-w-[420px] text-[32px] font-medium leading-[0.95] tracking-[-0.06em]" style={{ ["--d" as string]: "0.15s" }}>
            Research and stories from the team building Astrocade.
          </p>
        </InView>
        <section className="px-5 pb-20">
          <BlogList mobile />
        </section>
        <Footer className="pb-10" />
      </div>
    </main>
  );
}
