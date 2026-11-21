import type { Metadata } from "next";
import Link from "next/link";
import { content } from "@/content";

// Exported as out/404.html. Next marks it noindex automatically.
export const metadata: Metadata = {
  title: content.notFound.title,
};

export default function NotFound() {
  const t = content.notFound;
  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <div className="text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Reachfy" width={40} height={40} className="mx-auto size-10" />
        <p className="mt-8 text-sm font-medium text-muted">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-ink">{t.title}</h1>
        <p className="mt-3 text-ink-2">{t.body}</p>
        <Link
          href="/"
          className="btn-primary mt-8 inline-block rounded-xl px-5 py-2.5 text-[15px] font-medium text-white"
        >
          {t.cta}
        </Link>
      </div>
    </main>
  );
}
