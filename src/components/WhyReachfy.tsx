import { content } from "@/content";
import { NavIcon } from "./NavIcon";

/*
  "Why Reachfy": four reasons as rows in one white panel, each with a
  small product visual. Only claims about
  Reachfy itself; no comparisons with named competitors. Static.
*/

const t = content.why;
const v = t.visuals;
const s = content.sample;

function Bubble({ children, rtl = false }: { children: React.ReactNode; rtl?: boolean }) {
  return (
    <div
      dir={rtl ? "rtl" : undefined}
      lang={rtl ? "ar" : undefined}
      className={`max-w-[17rem] rounded-2xl bg-white p-3 text-[13px] leading-snug text-ink shadow-md ${
        rtl ? "rounded-ee-md" : "rounded-es-md"
      }`}
    >
      {children}
    </div>
  );
}

export function WhyVisual({ kind }: { kind: string }) {
  if (kind === "whatsapp") {
    return (
      <div className="space-y-2">
        <p className="flex items-center gap-2 text-xs font-medium text-ink-2">
          <span className="grid size-6 place-items-center rounded-full text-[11px] font-semibold text-white" style={{ backgroundImage: "var(--logo-gradient)" }}>
            {s.business.charAt(0)}
          </span>
          {s.business}
        </p>
        <Bubble>
          {s.message}
          <span className="mt-1.5 flex items-center justify-between border-t border-line pt-1.5">
            <span className="font-semibold text-brand">{s.cta}</span>
            <span className="text-[10px] text-muted">{s.time}</span>
          </span>
        </Bubble>
      </div>
    );
  }
  if (kind === "languages") {
    return (
      <div className="space-y-2">
        <Bubble>{s.message}</Bubble>
        <div className="flex justify-end">
          <Bubble rtl>
            {v.arabicMessage}
            <span className="mt-1.5 block font-semibold text-brand">{v.arabicCta}</span>
          </Bubble>
        </div>
      </div>
    );
  }
  if (kind === "store") {
    return (
      <ul className="w-full max-w-[17rem] space-y-2">
        {["shopify", "odoo"].map((name) => (
          <li key={name} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 shadow-md">
            <NavIcon name={name} />
            <span className="text-sm font-medium capitalize text-ink">{name}</span>
            <span className="ms-auto inline-flex items-center gap-1 rounded-md bg-tint px-2 py-0.5 text-xs font-medium text-brand-deep">
              <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3.5 8.5l3 3 6-7" />
              </svg>
              {v.connected}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  // agent
  return (
    <div className="flex max-w-[17rem] gap-2.5 rounded-xl bg-white p-3 shadow-md">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="" className="mt-0.5 size-6 shrink-0" />
      <div>
        <p className="text-[13px] leading-snug text-ink">{v.agentNote}</p>
        <span className="btn-primary mt-2.5 inline-block rounded-lg px-3 py-1.5 text-xs font-medium text-white">
          {v.agentAction}
        </span>
      </div>
    </div>
  );
}

export function WhyReachfy() {
  return (
    <section id="why-reachfy" aria-labelledby="why-title" className="scroll-mt-20 px-4 pb-24 sm:px-6 sm:pb-32">
      <header className="mx-auto max-w-[680px] text-center">
        <p className="text-sm font-medium text-brand">{t.label}</p>
        <h2
          id="why-title"
          className="mt-3 text-balance text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink"
        >
          {t.title}
        </h2>
        <p className="mx-auto mt-5 max-w-[36rem] text-lg leading-relaxed text-ink-2">{t.sub}</p>
      </header>

      <div className="mx-auto mt-14 max-w-[1040px] overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-line">
        <ol className="divide-y divide-line">
          {t.items.map((item, i) => (
            <li key={item.title} className="grid md:grid-cols-[1fr_minmax(0,22rem)]">
              <div className="flex gap-4 p-6 sm:p-8">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-brand shadow-sm">
                  <NavIcon name={item.icon} />
                </span>
                <div>
                  <p className="text-xs font-medium text-muted">0{i + 1}</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-[-0.015em] text-ink">{item.title}</h3>
                  <p className="mt-2 max-w-[30rem] leading-relaxed text-ink-2">{item.body}</p>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="flex items-center justify-center border-t border-line bg-soft p-6 md:border-s md:border-t-0"
                style={{
                  backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              >
                <WhyVisual kind={item.visual} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
