export type Job = {
  title: string;
  team: "Engineering" | "Growth" | "Product";
  location: string;
  type: string;
  href: string;
};

// Placeholder roles from the Figma file — replace with real listings / ATS links.
export const JOBS: Job[] = Array.from({ length: 6 }, () => ({
  title: "Member of Technical Staff (Frontend)",
  team: "Engineering" as const,
  location: "Palo Alto",
  type: "Full-time",
  href: "#",
}));

export const JOB_FILTERS = ["All", "Engineering", "Growth", "Product"] as const;

export const PEOPLE = [
  {
    name: "Muyang",
    photo: "/img/career/quote1.webp",
    bg: "linear-gradient(64.55deg, #5578ff 18.56%, #2be1a2 74.35%)",
    quote:
      "Astrocade had everything I was looking for: cutting-edge AI, a mission to share fun with the world, and people who are as friendly as they are talented. I work across the backend: distributed infrastructure serving millions of players, the data pipelines behind our analytics, and the agentic systems that generate and refine games.",
  },
  {
    name: "Olivia",
    photo: "/img/career/quote2.webp",
    bg: "linear-gradient(211.85deg, #5578ff 23.53%, #c42fed 99.2%)",
    quote:
      "When I first met Amir, he told me Astrocade was a place where I could grow. I didn’t realize just how much, or how fast. People here are super smart, but nobody guards what they know, and everybody wants the person next to them to succeed. As design and product lead, I get to figure out what our users need, design it, ship it, dig into the data, and keep building on what we learn.",
  },
  {
    name: "Akhil",
    photo: "/img/career/quote3.webp",
    bg: "linear-gradient(247.93deg, #ff4288 20.82%, #ffaa5d 91.7%)",
    quote:
      "I joined Astrocade because I loved the idea that anyone could make a game that captivates other people. Figuring out what draws people in, whether they’re creating or playing, felt like a new and important problem. As a product manager, I work on connecting creators with the players who’ll love their games: what gets made, how players find it, and how the game brings them together.",
  },
  {
    name: "Katie",
    photo: "/img/career/quote4.webp",
    bg: "linear-gradient(31.5deg, #ff4288 16.23%, #c42fed 65.75%)",
    quote:
      "What stood out right away was how much everyone here cares about the work, and how little ego comes with it. People are honest with each other and humble about what they don’t know, which is rare on a team this talented. I work alongside Amir on the company’s top priorities, from product and growth to hiring and fundraising.",
  },
];

export const BENEFITS = [
  { text: "Competitive salary and equity", grad: "linear-gradient(90deg, #5578ff 0%, #2be1a2 95.81%)" },
  { text: "Health, dental and vision insurance", grad: "linear-gradient(270deg, #5578ff 0%, #c42fed 100%)" },
  { text: "Unlimited PTO", grad: "linear-gradient(83.38deg, #ff4288 0.69%, #c42fed 75.56%)" },
  { text: "401(k)", grad: "linear-gradient(90deg, #5578ff 0%, #2be1a2 95.81%)" },
  { text: "Team fun and events", grad: "linear-gradient(270deg, #5578ff 0%, #c42fed 100%)" },
  { text: "Free breakfast, lunch and dinner in the office every day", grad: "linear-gradient(83.38deg, #ff4288 0.69%, #c42fed 75.56%)" },
];

export const VALUES = [
  { title: ["Users", "Above All"], body: "Everything we build starts and ends with the people who play and create on Astrocade. Know who you’re building for, and earn their trust." },
  { title: ["Obsess Over", "Impact"], body: "Be high-agency and always know your why. Hold a high bar, bet big, and own the problems you see." },
  { title: ["Honest", "and Humble"], body: "Be radically transparent. Check your ego at the door and help each other win." },
  { title: ["Fast and", "Focused"], body: "Focus. Prototype. Test. Repeat. A prototype beats a plan, and fewer things done better beats more." },
  { title: ["Inspire Fun", "and Joy"], body: "We started Astrocade to share fun with the world. Build what’s fun, and have fun building it." },
];

export const PILLARS = [
  {
    word: "Own.",
    grad: "linear-gradient(90deg, #2be1a2 0%, #5578ff 95.81%)",
    title: "Own the hard problems",
    body: "Core model and RecSys work, end to end",
  },
  {
    word: "Ship.",
    grad: "linear-gradient(270deg, #c42fed 0%, #5578ff 100%)",
    title: "Ship in days",
    body: "Small team, real users testing on every release",
  },
  {
    word: "Build.",
    grad: "linear-gradient(87.78deg, #c42fed 24.38%, #ff4288 99.26%)",
    title: "Build with the best",
    body: "A team from Google Research, Meta, TikTok, FAIR, Character.ai and Stanford, co-founded with Fei-Fei Li and backed by world class investors",
  },
];

export const MCP_COMMAND = "claude mcp add --transport http --scope user astrocade https://mcp.astrocade.com/mcp";
