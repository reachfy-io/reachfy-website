import { content } from "@/content";

/*
  "What happens after you sign up": four numbered steps from sign-up to
  the first approved campaign, then the primary CTA. Used on the home and
  pricing pages. No time promises. Static.
*/

const t = content.firstSteps;

export function FirstSteps() {
  return (
    <section id="get-started" aria-labelledby="first-steps-title" className="scroll-mt-20 px-4 pb-24 sm:px-6 sm:pb-32">
      <header className="mx-auto max-w-[640px] text-center">
        <p className="text-sm font-medium text-brand">{t.label}</p>
        <h2
          id="first-steps-title"
          className="mt-3 text-balance text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink"
        >
          {t.title}
        </h2>
        <p className="mx-auto mt-5 max-w-[34rem] text-lg leading-relaxed text-ink-2">{t.sub}</p>
      </header>

      <ol className="mx-auto mt-14 grid max-w-[1040px] gap-px overflow-hidden rounded-2xl bg-line shadow-md ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
        {t.steps.map((step, i) => (
          <li key={step.title} className="bg-white p-6 sm:p-7">
            <span
              className="grid size-8 place-items-center rounded-full text-sm font-semibold text-white"
              style={{ backgroundImage: "var(--logo-gradient)" }}
            >
              {i + 1}
            </span>
            <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.015em] text-ink">{step.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 text-center">
        <a
          href={content.cta.href}
          className="btn-primary inline-block rounded-xl px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
        >
          {content.cta.label}
        </a>
        <p className="mt-3 text-[13px] text-muted">{content.cta.note}</p>
      </div>
    </section>
  );
}
