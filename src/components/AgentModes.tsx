import { content } from "@/content";
import { NavIcon } from "./NavIcon";

/*
  "Two ways to work with the agent": brainstorm in a chat, or get
  campaign suggestions from the weekly background run. Two equal cards,
  each with copy on top and a product mockup underneath. No motion here;
  the page spends its motion in the hero and "How it works".
*/

const t = content.modes;

function Sparkle({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden="true">
      <path d="M10 2l1.8 4.7L16.5 8.5l-4.7 1.8L10 15l-1.8-4.7L3.5 8.5l4.7-1.8z" />
    </svg>
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 16 16" className="mt-1 size-3.5 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

export function ChatMock() {
  const c = t.chat;
  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-4 shadow-md">
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl rounded-ee-md border border-line bg-soft px-3.5 py-2 text-[13px] text-ink">
          {c.question}
        </p>
      </div>
      <div className="mt-3 flex gap-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="" className="mt-0.5 size-6 shrink-0" />
        <div className="min-w-0">
          <p className="text-[13px] leading-snug text-ink">{c.answer}</p>
          <div className="mt-3 rounded-xl border border-brand/15 bg-tint p-3">
            <p className="flex items-center gap-1 text-[11px] font-medium text-brand">
              <Sparkle className="size-3" />
              {c.ideaLabel}
            </p>
            <p className="mt-1 text-sm font-semibold text-ink">{c.idea}</p>
            <p className="text-xs text-muted">{c.ideaMeta}</p>
            <span className="btn-primary mt-2.5 inline-block rounded-lg px-3 py-1.5 text-xs font-medium text-white">
              {c.ideaAction}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-4">
        <div className="flex items-center gap-2 rounded-lg border border-line px-3 py-2">
          <span className="flex-1 text-[13px] text-muted">{c.placeholder}</span>
          <span className="grid size-6 place-items-center rounded-md text-white" style={{ backgroundImage: "var(--logo-gradient)" }}>
            <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 12.5v-9M4 7.5l4-4 4 4" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

function WeeklyMock() {
  const w = t.weekly;
  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-4 shadow-md">
      <div className="flex items-baseline justify-between gap-3">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
          <Sparkle className="size-3.5 text-brand" />
          {w.title}
        </p>
        <p className="shrink-0 text-xs text-muted">{w.when}</p>
      </div>
      <ul className="mt-3 divide-y divide-line border-y border-line">
        {w.rows.map((r) => (
          <li key={r.name} className="flex items-center gap-3 py-2.5">
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-medium text-ink">{r.name}</span>
              <span className="block text-xs text-muted">{r.meta}</span>
            </span>
            <span className="ms-auto shrink-0 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-ink shadow-sm ring-1 ring-line">
              {w.review}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-muted">
        <svg viewBox="0 0 16 16" className="size-3.5 text-brand" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="7" width="10" height="7" rx="1.5" />
          <path d="M5.5 7V5a2.5 2.5 0 015 0v2" />
        </svg>
        {w.footer}
      </p>
    </div>
  );
}

const mocks = [ChatMock, WeeklyMock];

export function AgentModes() {
  return (
    <section id="agent-modes" aria-labelledby="modes-title" className="scroll-mt-20 px-4 pb-24 sm:px-6 sm:pb-32">
      <header className="mx-auto max-w-[640px] text-center">
        <p className="text-sm font-medium text-brand">{t.label}</p>
        <h2
          id="modes-title"
          className="mt-3 text-balance text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink"
        >
          {t.title}
        </h2>
        <p className="mx-auto mt-5 max-w-[34rem] text-lg leading-relaxed text-ink-2">{t.sub}</p>
      </header>

      {/* two rows (copy, mockup) shared by both cards via subgrid, so the
          copy blocks and the mockup panels line up side by side */}
      <div className="mx-auto mt-14 grid max-w-[1040px] gap-5 md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-y-0">
        {t.items.map((item, i) => {
          const Mock = mocks[i];
          return (
            <article
              key={item.name}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md md:row-span-2 md:grid md:grid-rows-subgrid"
            >
              <div className="p-6 sm:p-8">
                <p className="inline-flex items-center gap-2 text-sm font-medium text-ink-2">
                  <span className="grid size-7 place-items-center rounded-lg border border-line bg-white text-brand shadow-sm">
                    <NavIcon name={item.icon} />
                  </span>
                  {item.name}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{item.body}</p>
                <ul className="mt-4 space-y-1.5">
                  {item.points.map((p) => (
                    <li key={p} className="flex gap-2 text-[15px] text-ink-2">
                      <Tick />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                aria-hidden="true"
                className="flex flex-col border-t border-line bg-soft p-4 sm:p-6"
                style={{
                  backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              >
                {/* grows with its content; the min height keeps both cards even */}
                <div className="flex min-h-[18rem] flex-1 [&>*]:w-full">
                  <Mock />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
