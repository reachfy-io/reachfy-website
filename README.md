# Reachfy website

Next.js + Tailwind + Motion + GSAP, exported as a static site for Cloudflare Pages.
English lives at `/en/`, Arabic (right-to-left) at `/ar/`; the bare domain picks one from the browser language.

## Run it locally
    npm install
    npm run dev        # http://localhost:3000/en/

## Where things are
- `src/app/globals.css`: brand colors (taken from the logo)
- `src/i18n/dictionaries.ts`: every word on the site, English and Arabic
- `src/components/Hero.tsx`: headline and buttons
- `src/components/AgentDemo.tsx`: the animated agent demo and phone
- `public/logo.svg`, `public/icon.png`: logo and favicon

## Deploy on Cloudflare Pages
Push to GitHub, then in Cloudflare: Workers & Pages > Create > Pages > connect the repo.
- Build command: `npm run build`
- Build output directory: `out`
Every push to main then goes live automatically.
