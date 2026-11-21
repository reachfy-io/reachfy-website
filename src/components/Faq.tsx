import Link from "next/link";
import { content } from "@/content";

/*
  FAQ. Native <details> accordion: no JavaScript, keyboard accessible,
  and every answer is in the HTML for search engines. Sharing name={id}
  makes it exclusive (one answer open at a time) in modern browsers.
*/

type FaqData = {
  label: string;
  title: string;
  sub: string;
  contact: string;
  items: readonly { q: string; a: string; link?: { label: string; href: string } }[];
};

// The home FAQ by default; the pricing page passes its own questions.
export function Faq({ data = content.faq, id = "faq" }: { data?: FaqData; id?: string }) {
  const t = data;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="mx-auto grid max-w-[1040px] gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
        <header>
          <p className="text-sm font-medium text-brand">{t.label}</p>
          <h2
            id={`${id}-title`}
            className="mt-3 text-balance text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink"
          >
            {t.title}
          </h2>
          <p className="mt-4 text-ink-2">
            {t.sub}{" "}
            <a
              href={`mailto:${content.footer.email}`}
              className="font-medium text-brand underline-offset-2 hover:underline"
            >
              {t.contact}
            </a>
          </p>
        </header>

        <div className="divide-y divide-line border-y border-line">
          {t.items.map((item) => (
            <details key={item.q} name={id} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-medium text-ink transition-colors hover:text-brand-deep [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="grid size-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform duration-200 group-open:rotate-45"
                >
                  <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M6 2v8M2 6h8" />
                  </svg>
                </span>
              </summary>
              <div className="-mt-1 max-w-[38rem] pb-5 pe-12 leading-relaxed text-ink-2">
                <p>{item.a}</p>
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="mt-2 inline-block font-medium text-brand underline-offset-2 hover:underline"
                  >
                    {item.link.label}
                  </Link>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
