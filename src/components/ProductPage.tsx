import Link from "next/link";
import { content } from "@/content";
import { SITE_URL } from "@/lib/seo";
import { groupLabels, pagePath, productPages, type ProductPageData } from "@/productPages";
import { FinalCta } from "./FinalCta";
import { Footer } from "./Footer";
import { JsonLd } from "./JsonLd";
import { Nav } from "./Nav";
import { NavIcon } from "./NavIcon";
import { PageVisual } from "./PageVisuals";

/*
  Template for /product/*, /channels/* and /integrations/* pages:
  hero (copy + visual), "what you get" grid, related pages, closing CTA.
*/

function breadcrumbJsonLd(page: ProductPageData) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: page.label, item: `${SITE_URL}${pagePath(page)}` },
    ],
  };
}

export function ProductPage({ page }: { page: ProductPageData }) {
  const related = page.related
    .map((path) => productPages.find((p) => pagePath(p) === path))
    .filter((p): p is ProductPageData => Boolean(p));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(page)} />
      <Nav />
      <main className="mx-auto w-full max-w-[1200px]">
        {/* Hero */}
        <section className="px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
          <div className="mx-auto grid max-w-[1040px] items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <p className="text-sm font-medium text-brand">
                {groupLabels[page.group]} <span className="text-line-strong">/</span> {page.label}
              </p>
              <h1 className="mt-4 text-balance text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink">
                {page.title}
              </h1>
              <p className="mt-5 max-w-[32rem] text-lg leading-relaxed text-ink-2">{page.sub}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={content.cta.href}
                  className="btn-primary rounded-xl px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
                >
                  {content.cta.label}
                </a>
                <Link
                  href="/#how-it-works"
                  className="rounded-xl bg-white px-5 py-3 text-[15px] font-medium text-ink shadow-md transition-colors hover:bg-soft"
                >
                  {content.hero.secondary}
                </Link>
              </div>
              <p className="mt-3 text-[13px] text-muted">{content.cta.note}</p>
            </div>

            <div
              aria-hidden="true"
              className="relative flex min-h-[22rem] items-center justify-center rounded-2xl border border-line bg-soft p-6 sm:p-8"
              style={{
                backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            >
              <PageVisual kind={page.visual} />
            </div>
          </div>
        </section>

        {/* What you get */}
        <section aria-labelledby="points-title" className="px-4 pb-24 sm:px-6 sm:pb-28">
          <h2
            id="points-title"
            className="mx-auto max-w-[1040px] text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-semibold tracking-[-0.025em] text-ink"
          >
            {page.pointsTitle}
          </h2>
          <ul className="mx-auto mt-8 grid max-w-[1040px] gap-px overflow-hidden rounded-2xl bg-line shadow-md ring-1 ring-line sm:grid-cols-2">
            {page.points.map((pt, i) => (
              <li
                key={pt.title}
                className={`flex gap-4 bg-white p-6 sm:p-7 ${
                  page.points.length % 2 === 1 && i === page.points.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-brand shadow-sm">
                  <NavIcon name={pt.icon} />
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-ink">{pt.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{pt.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Related pages */}
        <section aria-labelledby="related-title" className="px-4 pb-24 sm:px-6 sm:pb-28">
          <h2 id="related-title" className="mx-auto max-w-[1040px] text-lg font-semibold tracking-[-0.015em] text-ink">
            Keep exploring
          </h2>
          <ul className="mx-auto mt-4 grid max-w-[1040px] gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <li key={pagePath(r)}>
                <Link
                  href={pagePath(r)}
                  className="group flex h-full flex-col rounded-2xl bg-white p-5 shadow-md ring-1 ring-transparent transition-shadow hover:ring-line-strong"
                >
                  <span className="text-xs font-medium text-muted">{groupLabels[r.group]}</span>
                  <span className="mt-1 font-semibold text-ink">{r.label}</span>
                  <span className="mt-1 text-sm leading-snug text-ink-2">{r.title}</span>
                  <span className="mt-auto pt-3 text-sm font-medium text-brand">
                    Learn more <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
