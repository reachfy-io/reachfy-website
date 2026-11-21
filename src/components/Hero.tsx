import { content } from "@/content";
import { HeroVisual } from "./HeroVisual";

/*
  Home hero: a full-width band in the same tint and dot grid as the
  product mockups (bg-soft + dots), edge to edge of the page. The
  headline and description are centered (no buttons: the nav carries the
  call to action), with the win-back workflow (HeroVisual) underneath.
  The band breaks out of <main>'s 1200px container; html clips overflow-x.
*/

export function Hero() {
  const t = content;
  return (
    <section
      className="relative mx-[calc(50%-50vw)] w-screen border-b border-line bg-soft"
      style={{
        backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <div className="mx-auto max-w-[820px] px-4 pt-14 text-center sm:px-6 sm:pt-16">
        <p className="text-sm font-medium text-brand">{t.hero.label}</p>
        <h1 className="mt-4 text-balance text-[clamp(2.4rem,6vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-ink">
          {t.hero.title}
        </h1>
        <p className="mx-auto mt-6 max-w-[36rem] text-lg leading-relaxed text-ink-2">{t.hero.sub}</p>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-14">
        <HeroVisual />
      </div>
    </section>
  );
}
