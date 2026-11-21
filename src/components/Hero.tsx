import { content } from "@/content";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const t = content;
  return (
    <section className="relative">
      <div className="mx-auto max-w-[820px] px-4 pb-4 pt-20 text-center sm:px-6 sm:pt-32">
        <p className="text-sm font-medium text-brand">{t.hero.label}</p>
        <h1 className="mt-4 text-balance text-[clamp(2.4rem,6vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-ink">
          {t.hero.title}
        </h1>
        <p className="mx-auto mt-6 max-w-[36rem] text-lg leading-relaxed text-ink-2">
          {t.hero.sub}
        </p>
        {/* The note always sits right under the primary button: on phones the
            order is primary, note, secondary; from sm up, both buttons, then note. */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-3">
          <a
            href={t.cta.href}
            className="btn-primary order-1 rounded-xl px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
          >
            {t.cta.label}
          </a>
          <p className="order-2 mt-3 flex basis-full items-center justify-center gap-1.5 text-[13px] text-muted sm:order-3 sm:mt-4">
            <svg viewBox="0 0 16 16" className="size-3.5 text-brand" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3.5 8.5l3 3 6-7" />
            </svg>
            {t.cta.note}
          </p>
          <a
            href="#how-it-works"
            className="order-3 mt-5 rounded-xl bg-white px-5 py-3 text-[15px] font-medium text-ink shadow-md transition-colors hover:bg-soft sm:order-2 sm:mt-0"
          >
            {t.hero.secondary}
          </a>
        </div>
        <p className="mt-10 flex items-center justify-center gap-2.5 text-sm text-muted">
          <span className="flex -space-x-1.5" aria-hidden="true">
            <span className="grid size-6 place-items-center rounded-full border-2 border-white bg-[#95bf47] text-[10px] font-bold text-white">S</span>
            <span className="grid size-6 place-items-center rounded-full border-2 border-white bg-[#714b67] text-[10px] font-bold text-white">O</span>
          </span>
          {t.hero.connects}
        </p>
      </div>
      <div className="px-4 sm:px-6">
        <HeroVisual />
      </div>
    </section>
  );
}
