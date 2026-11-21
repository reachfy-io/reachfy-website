import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { getDictionary, isLocale } from "@/i18n/dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      {/* faint horizon glow along the top of the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[70vh]"
        style={{
          background:
            "radial-gradient(80% 60% at 50% -10%, color-mix(in oklab, var(--glow) 22%, transparent), transparent 70%)",
        }}
      />
      <Nav t={t} lang={lang} />
      <main>
        <Hero t={t} />
      </main>
    </>
  );
}
