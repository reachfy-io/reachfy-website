import { content } from "@/content";
import { CampaignVisual } from "./HowVisuals";

/*
  Hero visual: the approval moment, so the agent is seen before anyone
  scrolls. The agent's weekly note on the left, the campaign it prepared
  on the right, ending in "Approve and send". Illustrative numbers under
  a "Demo" tag. Static on purpose: the bold motion lives in How it works.
*/

const v = content.hero.visual;

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 rotate-90 md:rotate-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto mt-14 max-w-[880px] rounded-2xl border border-line bg-soft p-5 shadow-md sm:p-8"
      style={{
        backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <span className="absolute end-3 top-3 rounded-md border border-line bg-white px-2 py-0.5 text-[11px] font-medium text-muted">
        {content.how.tag}
      </span>

      <div className="grid items-center gap-4 text-start md:grid-cols-[1fr_auto_1.15fr] md:gap-6">
        {/* The agent's suggestion */}
        <div className="rounded-xl bg-white p-4 shadow-md">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" className="size-7" />
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-ink">{v.agent}</span>
              <span className="block text-xs text-muted">{v.when}</span>
            </span>
          </div>
          <p className="mt-3 text-[15px] leading-snug text-ink">{v.note}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-tint px-2 py-1 text-xs font-medium text-brand-deep">
            <span className="size-1.5 rounded-full bg-brand" />
            {v.ready}
          </p>
        </div>

        <span className="grid place-items-center text-line-strong">
          <Arrow />
        </span>

        {/* The campaign it prepared */}
        <CampaignVisual />
      </div>
    </div>
  );
}
