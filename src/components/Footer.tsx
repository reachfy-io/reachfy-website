import Link from "next/link";
import { content } from "@/content";

/*
  Site footer. The Product, Channels and Developers columns are built
  from the nav menus, so the two never drift apart.
*/

const f = content.footer;

type FooterLink = { label: string; href: string };

function columns(): { title: string; links: FooterLink[] }[] {
  const [product, developers] = content.nav.items.filter((i) => i.menu).map((i) => i.menu!);
  const [winBack, ...rest] = product.groups;
  return [
    { title: "Product", links: winBack.links },
    { title: "Channels & integrations", links: rest.flatMap((g) => g.links) },
    { title: "Developers", links: developers.groups.flatMap((g) => g.links) },
    f.columns.company,
    f.columns.legal,
  ];
}

function FooterAnchor({ href, children }: { href: string; children: React.ReactNode }) {
  const className = "text-sm text-ink-2 transition-colors hover:text-ink";
  // internal pages use Link; mailto and other sites use a plain anchor
  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.3 4.6 18.3 5 18.3 5c.7 1.6.3 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-8 border-t border-line">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.6fr]">
          <div>
            <Link href="/" aria-label={content.nav.home} className="inline-flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="" width={28} height={28} className="size-7" />
              <span className="text-[19px] font-semibold tracking-[-0.02em] text-ink">Reachfy</span>
            </Link>
            <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-ink-2">{f.tagline}</p>
            <a
              href={content.cta.href}
              className="btn-primary mt-5 inline-block rounded-lg px-3.5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {content.cta.label}
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {columns().map((col) => (
              <div key={col.title}>
                <p className="text-sm font-medium text-ink">{col.title}</p>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <FooterAnchor href={l.href}>{l.label}</FooterAnchor>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-[13px] text-muted">
            {f.copyright}{" "}
            <a href={`mailto:${f.email}`} className="transition-colors hover:text-ink">
              {f.email}
            </a>
          </p>
          <div className="flex gap-1">
            {f.social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-soft hover:text-ink"
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
