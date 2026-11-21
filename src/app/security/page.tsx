import Link from "next/link";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { NavIcon } from "@/components/NavIcon";
import { faqJsonLd, pageMetadata, SITE_URL } from "@/lib/seo";
import { security as t } from "@/security";

/*
  /security/: how Reachfy protects customer data. Only verified claims
  (see src/security.ts). Hero, a points grid, links to the policies,
  a security FAQ, the closing CTA.
*/

export const metadata = pageMetadata({
  path: "/security",
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
          { "@type": "ListItem", position: 2, name: t.label, item: `${SITE_URL}/security/` },
        ],
      },
      faqJsonLd(t.faq.items, "/security/#security-faq"),
    ],
  };
}

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd()} />
      <Nav />
      <main className="mx-auto w-full max-w-[1200px]">
        <section aria-labelledby="security-title" className="px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
          <header className="mx-auto max-w-[720px] text-center">
            <p className="text-sm font-medium text-brand">{t.label}</p>
            <h1
              id="security-title"
              className="mt-3 text-balance text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink"
            >
              {t.title}
            </h1>
            <p className="mx-auto mt-5 max-w-[36rem] text-lg leading-relaxed text-ink-2">{t.sub}</p>
          </header>
        </section>

        <section aria-labelledby="points-title" className="px-4 pb-24 sm:px-6 sm:pb-28">
          <h2
            id="points-title"
            className="mx-auto max-w-[1040px] text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-semibold tracking-[-0.025em] text-ink"
          >
            {t.pointsTitle}
          </h2>
          <ul className="mx-auto mt-8 grid max-w-[1040px] gap-px overflow-hidden rounded-2xl bg-line shadow-md ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
            {t.points.map((pt) => (
              // with 2 columns the 9th tile spans the row so no empty cell shows
              <li key={pt.title} className="flex gap-4 bg-white p-6 sm:last:col-span-2 lg:last:col-span-1">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-brand shadow-sm">
                  <NavIcon name={pt.icon} />
                </span>
                <div>
                  <h3 className="font-semibold tracking-[-0.015em] text-ink">{pt.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{pt.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-6 flex max-w-[1040px] flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-2">
            {t.policies.title}:
            {t.policies.links.map((l) => (
              <Link key={l.href} href={l.href} className="font-medium text-brand underline-offset-2 hover:underline">
                {l.label}
              </Link>
            ))}
          </p>
        </section>

        <Faq data={t.faq} id="security-faq" />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
