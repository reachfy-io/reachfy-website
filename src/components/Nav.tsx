import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";

function Wordmark() {
  return (
    <span className="flex items-center gap-2.5" dir="ltr">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="" width={32} height={32} className="size-8" />
      <span className="font-[family-name:Bricolage_Grotesque_Variable] text-xl font-bold tracking-tight text-text">
        Reachfy
      </span>
    </span>
  );
}

export function Nav({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-8">
      <Link href={`/${lang}/`} aria-label={t.nav.home}>
        <Wordmark />
      </Link>
      <nav className="flex items-center gap-2 sm:gap-4">
        <Link
          href={t.nav.switchHref}
          hrefLang={lang === "en" ? "ar" : "en"}
          className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-text"
        >
          {t.nav.switchLabel}
        </Link>
        <a
          href="#demo"
          className="rounded-full border border-line bg-panel/60 px-4 py-2 text-sm font-medium text-text transition-colors hover:border-glow"
        >
          {t.nav.demo}
        </a>
      </nav>
    </header>
  );
}
