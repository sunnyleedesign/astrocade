import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Poppins-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Astrocade — Where the Internet comes to play",
    template: "%s · Astrocade",
  },
  description:
    "Astrocade is where anyone can create, share, and play games and interactive content.",
};

/**
 * Desktop pages are laid out on the 1440px Figma canvas and scaled to the
 * viewport. This sets --vs (viewport scale) before first paint so there is no
 * layout jump on load.
 */
const scaleScript = `(function(){var d=document.documentElement;function u(){d.style.setProperty('--vs',String(Math.min(d.clientWidth,1440)/1440))}u();addEventListener('resize',u)})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scaleScript }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
