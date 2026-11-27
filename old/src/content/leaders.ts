import type { CSSProperties } from "react";

export type Leader = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  /** card background behind the cut-out photo */
  bg: string;
  /** bio panel background (Figma: "CEO n click") */
  bioBg: string;
  imgStyle?: CSSProperties;
  imgClass?: string;
};

export const LEADERS: Leader[] = [
  {
    name: "Amir Sadeghian",
    role: "Chief Executive Officer",
    bio: "Founding Director of AI at Aibee, a unicorn AI company (backed by Sequoia China) providing AI solutions for different business verticals. PhD, Stanford University.",
    photo: "/img/about/ceo1.webp",
    bg: "linear-gradient(245.36deg, #5578ff 17.6%, #2be1a2 80.85%)",
    bioBg: "linear-gradient(247.23deg, #5578ff 0%, #2be1a2 80.24%)",
    imgClass: "size-full object-cover",
  },
  {
    name: "Ali Sadeghian",
    role: "Chief Technology Officer",
    bio: "AI at Google Research. PhD, University of Florida.",
    photo: "/img/about/ceo2.webp",
    bg: "linear-gradient(32.04deg, #5578ff 39.38%, #c42fed 120.95%)",
    bioBg: "linear-gradient(31.51deg, #5578ff 55.99%, #c42fed 133.95%)",
    imgStyle: { position: "absolute", height: "111.37%", left: "-19.49%", top: 0, width: "139.21%", maxWidth: "none" },
  },
  {
    name: "Fei-Fei Li",
    role: "Co-Founder & AI Strategist",
    bio: "Godmother of AI. Sequoia Professor of Computer Science at Stanford University.",
    photo: "/img/about/ceo3.webp",
    bg: "linear-gradient(239.52deg, #ff4288 12.59%, #ffaa5d 91.23%)",
    bioBg: "linear-gradient(237.23deg, #ff4288 0%, #ffaa5d 49.96%)",
    imgClass: "size-full object-cover",
  },
];

