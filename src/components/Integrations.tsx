import Link from "next/link";
import { content } from "@/content";
import { NavIcon } from "./NavIcon";

/*
  Integrations: a static flow diagram (your store -> Reachfy -> your
  channels) drawn with CSS connector lines, then a developer strip.

  Desktop connectors: every node has a fixed height (h-[4.5rem]), so a
  column's bracket can run from the first node's center to the last one's
  (inset 2.25rem top and bottom). Short stubs join nodes to the bracket,
  and the bracket to the hub. Phones stack the three groups with a short
  vertical line between them.
*/

const t = content.integrations;
const NODE = "h-[4.5rem]";

function Node({ icon, name, detail }: { icon: string; name: string; detail: string }) {
  return (
    <div className={`flex ${NODE} items-center gap-3 rounded-xl bg-white px-4 shadow-md`}>
      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-ink-2">
        <NavIcon name={icon} />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-sm font-semibold text-ink">{name}</span>
        <span className="mt-0.5 block truncate text-xs text-muted">{detail}</span>
      </span>
    </div>
  );
}

function Column({
  title,
  items,
  side,
}: {
  title: string;
  items: { icon: string; name: string; detail: string }[];
  side: "in" | "out";
}) {
  // "in" nodes connect on their end side, "out" nodes on their start side
  const stub = side === "in" ? "lg:after:-end-6" : "lg:after:-start-6";
  const bracket = side === "in" ? "-end-6" : "-start-6";
  return (
    <div>
      <p className="mb-3 text-center text-xs font-medium text-muted lg:text-start">{title}</p>
      <div className="relative space-y-3">
        {items.length > 1 && (
          <span aria-hidden="true" className={`absolute inset-y-[2.25rem] ${bracket} hidden w-px bg-line-strong lg:block`} />
        )}
        {items.map((item) => (
          <div
            key={item.name}
            className={`relative lg:after:absolute lg:after:top-1/2 lg:after:h-px lg:after:w-6 lg:after:bg-line-strong lg:after:content-[''] ${stub}`}
          >
            <Node {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <section id="integrations" aria-labelledby="integrations-title" className="scroll-mt-20 px-4 pb-24 sm:px-6 sm:pb-32">
      <header className="mx-auto max-w-[640px] text-center">
        <p className="text-sm font-medium text-brand">{t.label}</p>
        <h2
          id="integrations-title"
          className="mt-3 text-balance text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink"
        >
          {t.title}
        </h2>
        <p className="mx-auto mt-5 max-w-[34rem] text-lg leading-relaxed text-ink-2">{t.sub}</p>
      </header>

      {/* Flow diagram */}
      <div
        className="mx-auto mt-14 max-w-[1040px] rounded-2xl border border-line bg-soft px-4 py-10 sm:px-8 sm:py-12"
        style={{
          backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <div className="mx-auto grid max-w-[880px] items-center gap-y-0 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-12">
          <Column title={t.inputsTitle} items={t.inputs} side="in" />

          {/* phones: a vertical connector between groups */}
          <span aria-hidden="true" className="mx-auto my-3 block h-8 w-px bg-line-strong lg:hidden" />

          {/* Hub, with stubs reaching the two brackets on desktop */}
          <div className="relative mx-auto lg:pt-7">
            <span aria-hidden="true" className="absolute -start-6 top-[calc(50%+0.875rem)] hidden h-px w-6 bg-line-strong lg:block" />
            <span aria-hidden="true" className="absolute -end-6 top-[calc(50%+0.875rem)] hidden h-px w-6 bg-line-strong lg:block" />
            <div className="flex w-56 flex-col items-center rounded-2xl bg-white px-5 py-6 text-center shadow-lg ring-1 ring-brand/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="" width={40} height={40} className="size-10" />
              <p className="mt-3 text-base font-semibold text-ink">{t.hub.name}</p>
              <p className="mt-0.5 text-xs leading-snug text-muted">{t.hub.detail}</p>
            </div>
          </div>

          <span aria-hidden="true" className="mx-auto my-3 block h-8 w-px bg-line-strong lg:hidden" />

          <Column title={t.outputsTitle} items={t.outputs} side="out" />
        </div>
      </div>

      {/* Developers */}
      <div className="mx-auto mt-5 grid max-w-[1040px] gap-5 md:grid-cols-[1.4fr_1fr]">
        <article className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-md sm:flex-row sm:items-start sm:p-7">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-brand shadow-sm">
            <NavIcon name="api" />
          </span>
          <div>
            <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink">{t.dev.title}</h3>
            <p className="mt-1.5 leading-relaxed text-ink-2">{t.dev.body}</p>
            <Link
              href={t.dev.link.href}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand underline-offset-2 hover:underline"
            >
              {t.dev.link.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
        <article className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-md sm:flex-row sm:items-start sm:p-7">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-brand shadow-sm">
            <NavIcon name="mcp" />
          </span>
          <div>
            <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink">{t.dev.mcp.name}</h3>
            <p className="mt-1.5 leading-relaxed text-ink-2">{t.dev.mcp.detail}</p>
            <Link
              href={t.dev.mcp.link.href}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand underline-offset-2 hover:underline"
            >
              {t.dev.mcp.link.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
