import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { FirstSteps } from "@/components/FirstSteps";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { NavIcon } from "@/components/NavIcon";
import { content } from "@/content";
import { faqJsonLd, pageMetadata, SITE_URL } from "@/lib/seo";
import { pricing as t, type Plan } from "@/pricing";

/*
  /pricing/: plan cards (priced by customer count, every feature on every
  plan), good-to-know notes, what every plan
  includes, and a pricing FAQ. Static; no toggles, so every price is in
  the HTML.
*/

export const metadata = pageMetadata({
  path: "/pricing",
  title: t.meta.title,
  description: t.meta.description,
});

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: t.label, item: `${SITE_URL}/pricing/` },
        ],
      },
      faqJsonLd(t.faq.items, "/pricing/#pricing-faq"),
    ],
  };
}

function PlanCard({ plan }: { plan: Plan }) {
  const talk = plan.cta === "talk";
  return (
    <li className="flex flex-col bg-white p-6 sm:p-7">
      <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink">{plan.name}</h3>
      <p className="mt-1 min-h-[2.75rem] text-sm leading-snug text-ink-2">{plan.for}</p>

      <p className="mt-6 flex items-baseline gap-1.5 text-ink">
        <span className="text-[2.5rem] font-semibold leading-none tracking-[-0.03em] tabular-nums">
          {plan.price ? `${t.currency}${plan.price}` : t.custom}
        </span>
        {plan.price && <span className="text-sm text-muted">{t.perMonth}</span>}
      </p>

      <p className="mt-6 flex items-center gap-2 border-t border-line pt-4 text-sm font-medium text-ink">
        <span className="text-brand">
          <NavIcon name="profiles" />
        </span>
        {plan.limit}
      </p>

      <a
        href={talk ? `mailto:${content.footer.email}` : content.cta.href}
        className={`mt-6 rounded-xl px-4 py-2.5 text-center text-[15px] font-medium transition ${
          talk ? "bg-white text-ink shadow-md hover:bg-soft" : "btn-primary text-white hover:opacity-90"
        }`}
      >
        {talk ? t.talk : content.cta.label}
      </a>
    </li>
  );
}

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd()} />
      <Nav />
      <main className="mx-auto w-full max-w-[1200px]">
        {/* Hero + plans */}
        <section aria-labelledby="pricing-title" className="px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
          <header className="mx-auto max-w-[720px] text-center">
            <p className="text-sm font-medium text-brand">{t.label}</p>
            <h1
              id="pricing-title"
              className="mt-3 text-balance text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink"
            >
              {t.title}
            </h1>
            <p className="mx-auto mt-5 max-w-[36rem] text-lg leading-relaxed text-ink-2">{t.sub}</p>
          </header>


          <h2 className="sr-only">{t.plansHeading}</h2>
          <ul className="mx-auto mt-12 grid max-w-[1040px] gap-px overflow-hidden rounded-2xl bg-line shadow-md ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
            {t.plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </ul>
          <p className="mx-auto mt-4 max-w-[1040px] text-center text-[13px] text-muted">
            {t.notes} {content.cta.note}.
          </p>

          {/* Good to know */}
          <h2 className="sr-only">{t.extrasHeading}</h2>
          <ul className="mx-auto mt-14 grid max-w-[1040px] gap-8 sm:grid-cols-3">
            {t.extras.map((x) => (
              <li key={x.title} className="flex gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-brand shadow-sm">
                  <NavIcon name={x.icon} />
                </span>
                <div>
                  <h3 className="font-semibold tracking-[-0.015em] text-ink">{x.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{x.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Every plan includes */}
        <section aria-labelledby="included-title" className="px-4 pb-24 sm:px-6 sm:pb-28">
          <h2
            id="included-title"
            className="mx-auto max-w-[1040px] text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-semibold tracking-[-0.025em] text-ink"
          >
            {t.included.title}
          </h2>
          <ul className="mx-auto mt-8 grid max-w-[1040px] gap-px overflow-hidden rounded-2xl bg-line shadow-md ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
            {t.included.items.map((item) => (
              <li key={item.title} className="flex gap-4 bg-white p-6">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-brand shadow-sm">
                  <NavIcon name={item.icon} />
                </span>
                <div>
                  <h3 className="font-semibold tracking-[-0.015em] text-ink">{item.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <FirstSteps />
        <Faq data={t.faq} id="pricing-faq" />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
