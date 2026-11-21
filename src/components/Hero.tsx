import type { Dictionary } from "@/i18n/dictionaries";
import { AgentDemo } from "./AgentDemo";

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 pb-24 pt-10 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-16">
      <div className="max-w-[620px]">
        <h1 className="font-display text-[clamp(2.6rem,6.2vw,4.9rem)] font-bold leading-[1.02] tracking-[-0.03em] text-text rtl:leading-[1.25] rtl:tracking-normal">
          {t.hero.title}
        </h1>
        <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted sm:text-xl rtl:leading-loose">
          {t.hero.sub}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            id="demo"
            href="#demo"
            className="rounded-full bg-text px-6 py-3.5 text-base font-semibold text-night shadow-[0_10px_40px_-8px_var(--glow)] transition-transform hover:-translate-y-0.5"
          >
            {t.hero.primary}
          </a>
          <a
            href="#agent"
            className="rounded-full px-6 py-3.5 text-base font-medium text-text transition-colors hover:bg-panel"
          >
            {t.hero.secondary}
          </a>
        </div>
        <p className="mt-10 flex items-center gap-3 text-sm text-muted">
          <span className="flex -space-x-1.5 rtl:space-x-reverse" aria-hidden="true">
            <span className="grid size-7 place-items-center rounded-full border-2 border-night bg-[#95bf47] text-[11px] font-bold text-night">S</span>
            <span className="grid size-7 place-items-center rounded-full border-2 border-night bg-[#714b67] text-[11px] font-bold text-white">O</span>
          </span>
          {t.hero.connects}
        </p>
      </div>

      <AgentDemo t={t.demo} />
    </section>
  );
}
