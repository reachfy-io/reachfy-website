# Reachfy website

Next.js + Tailwind + Motion + GSAP, exported as a static site for Cloudflare Pages.
English only, served at `/`.

## Run it locally
    npm install
    npm run dev        # http://localhost:3000/

## Where things are
- `src/app/globals.css`: brand colors (taken from the logo)
- `src/content.ts`: every word on the site
- `src/components/Hero.tsx`: headline and buttons
- `src/components/HowItWorks.tsx` + `HowVisuals.tsx`: the scroll-driven "How it works" section
- `src/components/AgentModes.tsx`: the two ways to work with the agent
- `public/logo.svg`, `public/icon.png`: logo and favicon

## Deploy on Cloudflare Pages
Push to GitHub, then in Cloudflare: Workers & Pages > Create > Pages > connect the repo.
- Build command: `npm run build`
- Build output directory: `out`
Every push to main then goes live automatically.
