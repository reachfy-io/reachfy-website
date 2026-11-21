// Renders the social share card (Open Graph / Twitter) into
// public/og.png at 1200x630, using the site's own font and copy.
//
//   npm run og
//
// Re-run it whenever the headline or sample message changes.
// Needs Google Chrome installed (it drives your local Chrome, no download).

import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { content: t } = await import(pathToFileURL(join(root, "src/content.ts")).href);

// font is inlined as a data URL so the card renders with no file access
const inter = readFileSync(
  join(root, "node_modules/@fontsource-variable/inter/files/inter-latin-opsz-normal.woff2"),
).toString("base64");
const logo = readFileSync(join(root, "public/logo.svg"), "utf8");

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<style>
  @font-face { font-family: Inter; src: url(data:font/woff2;base64,${inter}); font-weight: 100 900; }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #fff; font-family: Inter, sans-serif; color: #120d24;
         display: grid; grid-template-columns: 1fr 400px; overflow: hidden; }
  .copy { padding: 72px 64px; display: flex; flex-direction: column; }
  .brand { display: flex; align-items: center; gap: 14px; font-size: 30px; font-weight: 600; letter-spacing: -0.02em; }
  .brand svg { width: 46px; height: 46px; }
  h1 { margin-top: auto; font-size: 80px; line-height: 1.02; font-weight: 600; letter-spacing: -0.04em; text-wrap: balance; }
  .side { background: #f8f7fc; border-left: 1px solid #ebe8f2; display: grid; place-items: center;
          background-image: radial-gradient(#dcd6ea 1.5px, transparent 1.5px); background-size: 22px 22px; }
  .bubble { width: 300px; background: #fff; border-radius: 22px; border-bottom-left-radius: 8px; padding: 22px;
            box-shadow: 0 2px 4px -1px rgba(18,13,36,.03), 0 16px 32px -8px rgba(18,13,36,.08), 0 40px 80px -20px rgba(76,56,145,.22), 0 0 0 1px rgba(18,13,36,.06); }
  .who { display: flex; align-items: center; gap: 12px; font-size: 19px; font-weight: 600; }
  .av { width: 40px; height: 40px; border-radius: 50%; color: #fff; display: grid; place-items: center; font-size: 18px;
        background: linear-gradient(135deg, #000 0%, #1c1434 55%, #3a2a6a 100%); }
  .msg { margin-top: 16px; font-size: 21px; line-height: 1.45; }
  .cta { margin-top: 16px; padding-top: 14px; border-top: 1px solid #ebe8f2; color: #4c3891; font-weight: 600; font-size: 20px;
         display: flex; justify-content: space-between; }
  .cta span { color: #7d7794; font-weight: 400; font-size: 15px; }
</style></head>
<body>
  <div class="copy">
    <div class="brand">${logo}Reachfy</div>
    <h1>${t.hero.title}</h1>
  </div>
  <div class="side">
    <div class="bubble">
      <div class="who"><span class="av">${t.sample.business.charAt(0)}</span>${t.sample.business}</div>
      <p class="msg">${t.sample.message}</p>
      <div class="cta">${t.sample.cta}<span>${t.sample.time}</span></div>
    </div>
  </div>
</body></html>`;

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
const out = join(root, "public/og.png");
await page.screenshot({ path: out });
console.log("wrote", out);
await browser.close();
