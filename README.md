# Astrocade website

Next.js 15 (App Router) + Tailwind CSS v4 + Motion. Five pages: `/`, `/about`, `/careers`, `/blog`, `/press`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## How it's built

- **Desktop (≥1024px)** is laid out on the 1440px Figma canvas (`components/Stage.tsx`) using the exact
  Figma coordinates, and scales down to the viewport (`--vs`, set in `app/layout.tsx`).
- **Mobile (<1024px)** is a separate stacked layout per page; the homepage follows the Figma "Mobile" frame,
  the mobile menu follows "Nav Open".
- **Animations** are scroll-triggered: wrap a block in `<InView>` and give children `a-up`, `a-pop`, `a-spin`,
  `a-grow`, `a-tile`, `a-wipe-ltr`, `a-wipe-rtl` or `a-grad`; stagger with `style={{ "--d": "0.2s" }}`
  (see `app/globals.css`). Reduced-motion users get the final state.
- **Editable content** lives in `src/content/` (blog posts, jobs, people quotes, benefits, leaders).
- Fonts: Poppins Regular / Medium / SemiBold (self-hosted from `src/app/fonts`).
