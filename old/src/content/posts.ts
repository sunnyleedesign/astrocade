import type { CSSProperties } from "react";

export type Post = {
  title: string;
  date: string;
  category: "Announcements" | "Research" | "Product" | "Culture";
  href: string;
  image?: { src: string; bg: string; style: CSSProperties };
};

export const BLOG_FILTERS = ["All", "Announcements", "Research", "Product", "Culture"] as const;

export const FEATURED: Post = {
  title: "Introducing the Astrocade MCP: Make Games With Your AI Agent",
  date: "October 12th, 2026",
  category: "Announcements",
  href: "#",
  image: {
    src: "/img/blog/featured.webp",
    bg: "#ff8e47",
    style: { height: "87.25%", left: "-9.25%", top: "8.17%", width: "117.3%" },
  },
};

// Categories match the Figma file (all "Announcements") — update as real posts are tagged.
export const POSTS: Post[] = [
  {
    title: "Introducing the $100K Creator Competition",
    date: "November 5th, 2026",
    category: "Announcements",
    href: "#",
    image: { src: "/img/blog/post1.webp", bg: "#887bd0", style: { height: "167%", left: "-59.78%", top: "-67%", width: "215.65%" } },
  },
  {
    title: "Astrocade Is Now on iOS",
    date: "November 2nd, 2026",
    category: "Announcements",
    href: "#",
    image: { src: "/img/blog/post2.webp", bg: "#bad731", style: { height: "75.15%", left: "-35.98%", top: "24.85%", width: "184.23%" } },
  },
  {
    title: "The World Cup Comes to Astrocade",
    date: "June 15th, 2026",
    category: "Announcements",
    href: "#",
    image: { src: "/img/blog/post3.webp", bg: "#3fc4f4", style: { height: "115.45%", left: "-8.52%", top: "-13.64%", width: "153.86%" } },
  },
  { title: "Game Jams Are the Heart of Astrocade's Creator Culture", date: "June 8th, 2026", category: "Announcements", href: "#" },
  { title: "How Analytics Are Transforming Game Creation on Astrocade", date: "May 30th, 2026", category: "Announcements", href: "#" },
  { title: "The Missing Link in World Models: AI Needs Causality, Not Just Observation", date: "May 20th, 2026", category: "Announcements", href: "#" },
  { title: "Astrocade Raises $56M in New Funding to Build a New Era of Interactive Entertainment", date: "May 5th, 2026", category: "Announcements", href: "#" },
  { title: "De[v]sign: Blurring the Lines Between Development and Design", date: "April 28th, 2026", category: "Announcements", href: "#" },
  { title: "Introducing Astrocade", date: "April 8th, 2025", category: "Announcements", href: "#" },
];

export const POSTS_PER_PAGE = 9;
