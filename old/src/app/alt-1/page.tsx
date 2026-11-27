import type { Metadata } from "next";
import Stage from "@/components/Stage";
import GameCarousel from "@/components/alt/GameCarousel";

export const metadata: Metadata = { title: "Alt 1", robots: { index: false } };

/** Alt 1 (Figma page "Alt 1"): rotating game-card carousel; centre card plays its video. */
export default function Alt1Page() {
  return (
    <main className="flex min-h-svh items-start">
      <Stage height={810}>
        <GameCarousel top={177} />
      </Stage>
    </main>
  );
}
