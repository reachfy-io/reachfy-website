@AGENTS.md

# Reachfy website

Marketing site for Reachfy (reachfy.io; always spelled "Reachfy"). Next.js 16 App Router, Tailwind v4, Motion, static export (`output: "export"`, `trailingSlash: true`) for Cloudflare Pages. The site is **English only**: no language prefixes in URLs, no language switch. Copy lives in `src/content.ts` (home page, nav, footer), `src/productPages.ts` (the /product, /channels and /integrations pages; add a page by adding an entry there), `src/pricing.ts` (the /pricing page; source: the Lean Canvas 2027 revenue streams) and `src/legal.ts` (policies, word for word; change only with legal review).

These three rules apply to every change.

## 1. Always design to match the value proposition

**"We bring your customers back."**

- Every section must answer one question: how does this help a store win back customers who stopped buying? If it doesn't, cut it or reframe it.
- Lead with the outcome (customers return, orders come back), then explain how (the AI agent picks customers, writes the message in Arabic or English, and sends on WhatsApp and email after the business approves). The product writes Arabic messages for MENA stores; only the website itself is English.
- Product visuals should show win-back moments: lapsed customers found, a message written, the customer replying or ordering again.
- Be honest. The agent always waits for approval, so never claim it sends on its own. Don't use fake customer logos, testimonials, or usage stats; we have no customers yet. Label any illustrative numbers as "Demo".

## 2. Make sure SEO works with every change

All SEO plumbing lives in `src/lib/seo.ts`. Check these before calling any change done:

- **Metadata per page.** Every page exports `metadata = pageMetadata({ path, title, description })`, with the title and description taken from `src/content.ts`. That one call sets the title, description, robots, canonical, Open Graph, and Twitter tags. Never hand-write these per page. Site-wide defaults (`metadataBase`, title template, icons) live in `src/app/layout.tsx`.
- **Sitemap and robots.** Add every new page's path to the `pages` list in `src/app/sitemap.ts`. `src/app/robots.ts` allows crawling and points to the sitemap. Both are generated at build time.
- **Share image.** `public/og.png` (1200×630) is rendered from `src/content.ts` by `npm run og` (`scripts/og-images.mjs`, which uses your installed Chrome). Re-run it whenever the hero title or sample message changes, and look at the result.
- **Structured data.** Use `homeJsonLd()` in `seo.ts` (Organization, WebSite, WebPage) via `<JsonLd>`. Never add ratings, reviews, or prices we can't back up; Google penalizes fake structured data.
- **404.** `src/app/not-found.tsx` becomes `out/404.html`. Next marks it noindex, so don't add robots tags to it or to the layout.
- **Semantic HTML.** One `<h1>` per page, then `h2`/`h3` in order. Use real `<a href>` for links (not click handlers), `<section>` for page sections, `alt` text on every meaningful image, and `alt=""` on decorative ones.
- **Key copy must be in the HTML.** Text that matters for search must be server-rendered. Only animated demo text may depend on client JS.
- **No broken links.** If a URL changes or is removed, add a 301 redirect in both `public/_redirects` (Cloudflare Pages) and `vercel.json` (the current production host), until the move to Cloudflare is done.
- **Performance is SEO.** Self-host fonts (fontsource), avoid layout shift (reserve space for animated content), keep images small, and lazy-load anything below the fold.
- **Verify.** After `npm run build`, check `out/index.html` (and any new page) for the title, description, canonical, robots, OG tags, and JSON-LD, and that each page has exactly one `<h1>`. Check that `out/sitemap.xml` lists every page and that `out/robots.txt` exists.
- **Keep** `public/144fc473b47344079fee0356e1e54c68.txt`. It's the IndexNow key (Bing/Yandex instant indexing).

## 3. Follow the design properly

The style is white and clean, in the spirit of attio.com. Colors come only from the Reachfy icon.

- **Use the tokens in `src/app/globals.css`, never raw hex values in components:** `bg`, `soft`, `tint`, `line`, `line-strong`, `ink`, `ink-2`, `muted`, `brand` (#4c3891), `brand-deep`, `brand-night`, plus `--logo-gradient` and the `shadow-sm`/`md`/`lg` scale. If a color is missing, add a token; don't invent a one-off color. The only exception is third-party brand colors in their own logos (Shopify, Odoo, WhatsApp).
- **Surfaces.** White page with hairline borders (`border-line`) and soft layered shadows. Don't use dark sections, neon glows, or heavy outlines. Tinted panels (`bg-soft`, dotted grid) frame product UI.
- **Type.** Inter (self-hosted, optical-size build). Headings are `font-semibold` with tight tracking (`tracking-[-0.03em]` range) and `text-balance`. Use sentence case; no ALL-CAPS labels.
- **Buttons.** The primary button uses the `.btn-primary` class (the logo gradient, white text). The secondary button is white with `shadow-md`. Corner radius is `rounded-xl` for page CTAs and `rounded-lg` inside product UI.
- **Layout.** The content sits in a centered `max-w-[1200px]` container with no side borders (no vertical frame lines). Use a 16px side gutter on phones (`px-4`). Hero and section headings are centered; product UI is shown as real HTML/CSS mockups, not screenshots.
- **Motion.** Put the boldness in one place (the scroll-driven "How it works" section). On desktop its pinned dot field (`DataField.tsx`: each dot is a customer; messy data becomes profiles, segments, a targeted campaign, then customers coming back) must always match the step being read, and stay beside the text, never behind it. Elsewhere, keep motion calm and purposeful: don't add a fade-up to every section. Always respect `useReducedMotion`.
- **Verify visually.** Screenshot every changed section at 1440px and 390px wide. Check there's no horizontal scroll and no console errors, and fix anything that looks off before moving on.

## Workflow

- Build one section at a time. Lint (`npx eslint src`) and type-check (`npx tsc --noEmit`) after each change.
- Pushing to `main` deploys to production. Push only when asked.
