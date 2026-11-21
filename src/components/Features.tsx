import { content } from "@/content";
import { NavIcon } from "./NavIcon";

/*
  Features grid: one white panel with hairline dividers (the gap-px over
  a line-colored background draws them), 3 columns on desktop. Static.
*/

const t = content.features;

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-20 px-4 pb-24 sm:px-6 sm:pb-32">
      <header className="mx-auto max-w-[640px] text-center">
        <p className="text-sm font-medium text-brand">{t.label}</p>
        <h2
          id="features-title"
          className="mt-3 text-balance text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink"
        >
          {t.title}
        </h2>
        <p className="mx-auto mt-5 max-w-[34rem] text-lg leading-relaxed text-ink-2">{t.sub}</p>
      </header>

      <ul className="mx-auto mt-14 grid max-w-[1040px] gap-px overflow-hidden rounded-2xl bg-line shadow-md ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
        {t.items.map((f) => (
          // phones: icon beside the text (compact); sm+: icon above.
          // With 2 columns the 9th tile spans the row so no empty cell shows.
          <li key={f.title} className="flex gap-4 bg-white p-5 sm:block sm:p-7 sm:last:col-span-2 lg:last:col-span-1">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-brand shadow-sm">
              <NavIcon name={f.icon} />
            </span>
            <div className="min-w-0">
              <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-ink sm:mt-4">{f.title}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-ink-2 sm:mt-1.5">{f.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
