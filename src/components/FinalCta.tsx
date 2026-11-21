import { content } from "@/content";

/*
  Closing call to action. A calm tinted panel (no dark sections), with a
  small static echo of the dot field's last state: customers back in a
  ring around Reachfy, a few still drifting outside.
*/

const t = content.finalCta;

// ring of returned customers + a few still scattered, on a 200x200 grid
const RING = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2 - Math.PI / 2;
  return [100 + Math.cos(a) * 46, 100 + Math.sin(a) * 46];
});
const DRIFT = [
  [22, 40], [174, 30], [186, 120], [30, 150], [150, 182], [62, 186], [12, 96], [120, 14],
];

function ReturnedRing() {
  return (
    <svg viewBox="0 0 200 200" className="mx-auto size-40" aria-hidden="true">
      <defs>
        <radialGradient id="cta-glow">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#cta-glow)" />
      {DRIFT.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.4" fill="var(--line-strong)" />
      ))}
      {RING.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.4" fill="var(--accent)" />
      ))}
      <image href="/logo.svg" x="85" y="85" width="30" height="30" />
    </svg>
  );
}

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="px-4 pb-24 sm:px-6 sm:pb-32">
      <div
        className="mx-auto max-w-[1040px] rounded-3xl border border-line bg-soft px-6 py-14 text-center sm:px-10 sm:py-20"
        style={{
          backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        <ReturnedRing />
        <h2
          id="cta-title"
          className="mx-auto mt-6 max-w-[36rem] text-balance text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink"
        >
          {t.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[32rem] text-lg leading-relaxed text-ink-2">{t.sub}</p>
        <a
          href={content.cta.href}
          className="btn-primary mt-8 inline-block rounded-xl px-6 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
        >
          {content.cta.label}
        </a>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-[13px] text-muted">
          <svg viewBox="0 0 16 16" className="size-3.5 text-brand" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3.5 8.5l3 3 6-7" />
          </svg>
          {content.cta.note}
        </p>
      </div>
    </section>
  );
}
