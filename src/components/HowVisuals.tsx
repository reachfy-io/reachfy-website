import { content } from "@/content";
import { NavIcon } from "./NavIcon";

/*
  The product mockups for "How it works", one per step. Plain HTML/CSS,
  sized to fill the pinned stage on desktop and to stack on phones.
  Every number here is illustrative and sits under a "Demo" tag.
*/

const v = content.how.visuals;

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl bg-white p-4 shadow-md ${className}`}>{children}</div>;
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

function Sparkle({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden="true">
      <path d="M10 2l1.8 4.7L16.5 8.5l-4.7 1.8L10 15l-1.8-4.7L3.5 8.5l4.7-1.8z" />
    </svg>
  );
}

function SourceRow({ icon, name, status, detail }: { icon: string; name: string; status: string; detail?: string }) {
  const on = status !== "Connect";
  return (
    <li className="flex items-center gap-3 py-2.5">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-white text-ink-2">
        <NavIcon name={icon} />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-sm font-medium text-ink">{name}</span>
        {detail && <span className="block truncate text-xs text-muted">{detail}</span>}
      </span>
      <span
        className={`ms-auto inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${
          on ? "bg-tint text-brand-deep" : "border border-line text-ink-2"
        }`}
      >
        {on && <Check />}
        {status}
      </span>
    </li>
  );
}

export function ConnectVisual() {
  const c = v.connect;
  return (
    <div className="flex h-full flex-col gap-3">
      <Card>
        <p className="text-xs font-medium text-muted">{c.title}</p>
        <ul className="mt-1 divide-y divide-line">
          {c.sources.map((s) => (
            <SourceRow key={s.name} {...s} />
          ))}
        </ul>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-tint">
          <div className="h-full w-full rounded-full" style={{ backgroundImage: "var(--logo-gradient)" }} />
        </div>
        <p className="mt-2 text-xs text-muted">{c.imported}</p>

        <p className="mt-5 text-xs font-medium text-muted">{c.channelsTitle}</p>
        <ul className="mt-1 divide-y divide-line">
          {c.channels.map((ch) => (
            <SourceRow key={ch.name} {...ch} />
          ))}
        </ul>
      </Card>

      <Card>
        <p className="text-xs font-medium text-muted">{c.profileTitle}</p>
        <div className="mt-2.5 flex items-center gap-3">
          <span
            className="grid size-9 place-items-center rounded-full text-sm font-semibold text-white"
            style={{ backgroundImage: "var(--logo-gradient)" }}
          >
            {c.profileName.charAt(0)}
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-ink">{c.profileName}</span>
            <span className="block text-xs text-muted">{c.profileMeta}</span>
          </span>
        </div>
        <dl className="mt-3 grid grid-cols-3 gap-2">
          {c.profileStats.map((s) => (
            <div key={s.label} className="rounded-lg bg-soft px-2.5 py-2">
              <dt className="text-[11px] text-muted">{s.label}</dt>
              <dd className="mt-0.5 text-[13px] font-semibold text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  );
}

export function SegmentsVisual() {
  const s = v.segments;
  return (
    <Card>
      <p className="text-xs font-medium text-muted">{s.title}</p>
      <ul className="mt-2 space-y-1.5">
        {s.rows.map((r) => (
          <li
            key={r.name}
            className={`rounded-lg px-3 py-2.5 ${r.suggested ? "bg-tint ring-1 ring-brand/20" : ""}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-ink">{r.name}</span>
              {r.suggested && (
                <span className="inline-flex items-center gap-1 rounded-md bg-white px-1.5 py-0.5 text-[11px] font-medium text-brand shadow-sm">
                  <Sparkle className="size-3" />
                  {s.suggested}
                </span>
              )}
              <span className="ms-auto text-sm font-semibold tabular-nums text-ink">{r.count}</span>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <span className="text-xs text-muted">{r.detail}</span>
              <span className="ms-auto h-1 w-20 shrink-0 overflow-hidden rounded-full bg-line">
                <span
                  className={`block h-full rounded-full ${r.suggested ? "" : "bg-line-strong"}`}
                  style={{
                    width: `${r.share * 100}%`,
                    backgroundImage: r.suggested ? "var(--logo-gradient)" : undefined,
                  }}
                />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function CampaignVisual() {
  const c = v.campaign;
  return (
    <Card className="flex h-full flex-col">
      <p className="text-sm font-semibold text-ink">{c.title}</p>
      <dl className="mt-3 divide-y divide-line border-y border-line">
        {c.fields.map((f) => (
          <div key={f.label} className="flex items-start gap-3 py-2">
            <dt className="w-20 shrink-0 text-xs text-muted">{f.label}</dt>
            <dd className="text-[13px] font-medium text-ink">
              {f.value}
              {"note" in f && f.note && (
                <span className="mt-0.5 flex items-center gap-1 text-[11px] font-normal text-brand">
                  <Sparkle className="size-3" />
                  {f.note}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex gap-1.5">
        {c.languages.map((l, i) => (
          <span
            key={l}
            className={`rounded-md px-2 py-0.5 text-xs font-medium ${
              i === 0 ? "bg-ink text-white" : "border border-line text-ink-2"
            }`}
          >
            {l}
          </span>
        ))}
      </div>
      <div className="mt-2 rounded-xl rounded-es-md bg-soft p-3 text-[13px] leading-snug text-ink">
        {content.sample.message}
        <span className="mt-1.5 block font-semibold text-brand">{content.sample.cta}</span>
      </div>
      <span className="btn-primary mt-auto block rounded-lg px-4 py-2.5 text-center text-sm font-medium text-white">
        {c.approve}
      </span>
    </Card>
  );
}

export function ReportVisual() {
  const r = v.report;
  const max = Math.max(...r.bars);
  const peak = r.bars.indexOf(max);
  return (
    <div className="flex h-full flex-col gap-3">
      <Card>
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-semibold text-ink">{r.title}</p>
          <p className="text-xs text-muted">{r.range}</p>
        </div>
        <dl className="mt-3 grid grid-cols-3 gap-2">
          {r.stats.map((s) => (
            <div key={s.label} className="rounded-lg bg-soft px-2.5 py-2">
              <dt className="text-[11px] text-muted">{s.label}</dt>
              <dd className="mt-0.5 text-base font-semibold tabular-nums text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs text-muted">{r.chartLabel}</p>
        <div className="mt-2 flex h-20 items-end gap-2" aria-hidden="true">
          {r.bars.map((b, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-md ${i === peak || i === peak + 1 ? "" : "bg-line-strong"}`}
                style={{
                  height: `${(b / max) * 64}px`,
                  backgroundImage: i === peak || i === peak + 1 ? "var(--logo-gradient)" : undefined,
                }}
              />
              <span className="text-[10px] text-muted">{r.days[i]}</span>
            </div>
          ))}
        </div>
      </Card>
      {/* own surface (not <Card>) so the tint doesn't fight Card's white */}
      <div className="rounded-xl border border-brand/15 bg-tint p-4">
        <p className="flex items-center gap-1.5 text-xs font-medium text-brand">
          <Sparkle />
          {r.insightLabel}
        </p>
        <p className="mt-1.5 text-[13px] leading-snug text-ink">{r.insight}</p>
      </div>
    </div>
  );
}

export const howVisuals = [ConnectVisual, SegmentsVisual, CampaignVisual, ReportVisual];
