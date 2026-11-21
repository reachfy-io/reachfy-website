import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { content } from "@/content";
import type { LegalDoc, LegalItem } from "@/legal";

/* Renders one legal document from src/legal.ts in the site's design. */

const EMAIL = /([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/gi;

// turn email addresses inside the text into mailto links
function Linked({ text }: { text: string }) {
  return (
    <>
      {text.split(EMAIL).map((part, i) =>
        i % 2 === 1 ? (
          <a key={i} href={`mailto:${part}`} className="font-medium text-brand underline-offset-2 hover:underline">
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Item({ item }: { item: LegalItem }) {
  if (typeof item === "string") return <Linked text={item} />;
  return (
    <>
      <strong className="font-medium text-ink">{item.label}:</strong> <Linked text={item.text} />
    </>
  );
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-[720px] px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
        <article>
          <header className="border-b border-line pb-8">
            <h1 className="text-balance text-[clamp(2rem,5vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
              {doc.title}
            </h1>
            <p className="mt-3 text-sm text-muted">
              {content.footer.legalUpdated}: <time>{doc.updated}</time>
            </p>
          </header>

          <div className="mt-10 space-y-10">
            {doc.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-lg font-semibold tracking-[-0.01em] text-ink">{s.heading}</h2>
                {s.body?.map((p) => (
                  <p key={p} className="mt-3 leading-relaxed text-ink-2">
                    <Linked text={p} />
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-3 list-disc space-y-1.5 ps-5 leading-relaxed text-ink-2 marker:text-line-strong">
                    {s.list.map((item, i) => (
                      <li key={i}>
                        <Item item={item} />
                      </li>
                    ))}
                  </ul>
                )}
                {s.after?.map((p) => (
                  <p key={p} className="mt-3 leading-relaxed text-ink-2">
                    <Linked text={p} />
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
