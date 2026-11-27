import type { Metadata } from "next";
import Nav from "@/components/Nav";
import HeroIntro from "@/components/HeroIntro";

export const metadata: Metadata = { title: "Hero Alt" };

/** Hero alt exploration: game videos glide + twinkle, then the headline appears. */
export default function HeroAlt() {
  return (
    <main>
      <Nav />
      <HeroIntro />
    </main>
  );
}
