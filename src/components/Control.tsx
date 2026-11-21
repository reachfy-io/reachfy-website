import Link from "next/link";
import { content } from "@/content";
import { NavIcon } from "./NavIcon";

/*
  "You stay in control": a bento of one large card (approval, with a
  small product mockup) and three smaller cards. Static: the page's
  motion lives in the hero and How it works.
*/

const t = content.control;

function ApprovalMock() {
  const m = t.approve.mock;
  return (
    <div className="rounded-xl bg-white p-4 shadow-md">
      <p className="flex items-center gap-1.5 text-xs font-medium text-brand">
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="8" cy="8" r="6" />
          <path d="M8 5v3.25l2 1.25" />
        </svg>
        {m.status}
      </p>
      <p className="mt-2 text-sm font-semibold text-ink">{m.campaign}</p>
      <p className="text-xs text-muted">{m.meta}</p>
      <div className="mt-3 rounded-xl rounded-es-md bg-soft p-3 text-[13px] leading-snug text-ink">
        {content.sample.message}
        <span className="mt-1.5 block font-semibold text-brand">{content.sample.cta}</span>
      </div>
      <div className="mt-4 flex gap-2">
        <span className="btn-primary flex-1 rounded-lg px-3 py-2 text-center text-sm font-medium text-white">
          {m.approve}
        </span>
        <span className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-ink-2 shadow-sm ring-1 ring-line">
          {m.decline}
        </span>
      </div>
    </div>
  );
}

export function Control() {
  return (
    <section id="control" aria-labelledby="control-title" className="scroll-mt-20 px-4 pb-24 sm:px-6 sm:pb-32">
      <header className="mx-auto max-w-[640px] text-center">
        <p className="text-sm font-medium text-brand">{t.label}</p>
        <h2
          id="control-title"
          className="mt-3 text-balance text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink"
        >
          {t.title}
        </h2>
        <p className="mx-auto mt-5 max-w-[34rem] text-lg leading-relaxed text-ink-2">{t.sub}</p>
      </header>

      <div className="mx-auto mt-14 grid max-w-[1040px] gap-5 lg:grid-cols-[1.25fr_1fr] lg:grid-rows-3">
        {/* Large card: approval */}
        <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md lg:row-span-3">
          <div className="p-6 sm:p-8">
            <span className="grid size-9 place-items-center rounded-lg border border-line bg-white text-brand shadow-sm">
              <NavIcon name="approve" />
            </span>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-ink">{t.approve.title}</h3>
            <p className="mt-2 max-w-[28rem] leading-relaxed text-ink-2">{t.approve.body}</p>
          </div>
          <div
            aria-hidden="true"
            className="mt-auto flex flex-1 flex-col justify-center border-t border-line bg-soft p-4 sm:p-8"
            style={{
              backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          >
            <div className="mb-2.5 flex justify-end">
              <span className="rounded-md border border-line bg-white px-2 py-0.5 text-[11px] font-medium text-muted">
                {t.tag}
              </span>
            </div>
            <div className="mx-auto w-full max-w-[400px]">
              <ApprovalMock />
            </div>
          </div>
        </article>

        {/* Smaller cards */}
        {t.cards.map((c) => (
          <article key={c.title} className="flex gap-4 rounded-2xl bg-white p-6 shadow-md">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-brand shadow-sm">
              <NavIcon name={c.icon} />
            </span>
            <div>
              <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink">{c.title}</h3>
              <p className="mt-1.5 leading-relaxed text-ink-2">{c.body}</p>
              {"link" in c && c.link && (
                <Link
                  href={c.link.href}
                  className="mt-2 inline-block text-sm font-medium text-brand underline-offset-2 hover:underline"
                >
                  {c.link.label}
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
