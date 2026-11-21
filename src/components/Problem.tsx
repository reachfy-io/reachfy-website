import { content } from "@/content";
import { NavIcon } from "./NavIcon";

/*
  The problem, right after the hero: the customers a store already won
  and is losing without noticing. Four pains in one hairline panel
  (same pattern as Features). No numbers: we don't have sourced ones.
  Static.
*/

const t = content.problem;

export function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-title" className="scroll-mt-20 px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24">
      <header className="mx-auto max-w-[680px] text-center">
        <p className="text-sm font-medium text-brand">{t.label}</p>
        <h2
          id="problem-title"
          className="mt-3 text-balance text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink"
        >
          {t.title}
        </h2>
        <p className="mx-auto mt-5 max-w-[34rem] text-lg leading-relaxed text-ink-2">{t.sub}</p>
      </header>

      <ul className="mx-auto mt-14 grid max-w-[1040px] gap-px overflow-hidden rounded-2xl bg-line shadow-md ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
        {t.items.map((item) => (
          <li key={item.title} className="flex gap-4 bg-white p-5 sm:block sm:p-7">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-brand shadow-sm">
              <NavIcon name={item.icon} />
            </span>
            <div className="sm:mt-5">
              <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-ink">{item.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
