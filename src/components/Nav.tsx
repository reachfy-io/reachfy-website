"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { content } from "@/content";
import { NavIcon } from "./NavIcon";

/*
  Attio-style top bar: logo, menus with rich dropdowns, plain links,
  then one primary CTA (Get started). Dropdown panels are always in the HTML
  (shown/hidden with CSS) so search engines can follow every link.
*/

type Menu = NonNullable<(typeof content.nav.items)[number]["menu"]>;
// a top-level item is a menu or a plain link (e.g. Pricing, when it returns)
type NavItem = { label: string; href?: string; menu?: Menu };
const items: NavItem[] = content.nav.items;
type MenuLink = Menu["groups"][number]["links"][number];

const HOVER_CLOSE_MS = 120;

function Wordmark() {
  return (
    <span className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="" width={28} height={28} className="size-7" />
      <span className="text-[19px] font-semibold tracking-[-0.02em] text-ink">Reachfy</span>
    </span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`size-3 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 4.5l3 3 3-3" />
    </svg>
  );
}

function MenuItemLink({ link, onNavigate }: { link: MenuLink; onNavigate: () => void }) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-soft"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-ink-2 shadow-sm transition-colors group-hover:text-brand">
        <NavIcon name={link.icon} />
      </span>
      <span className="pt-0.5">
        <span className="block text-sm font-medium text-ink">{link.label}</span>
        <span className="mt-0.5 block text-[13px] leading-snug text-muted">{link.description}</span>
      </span>
    </Link>
  );
}

function DesktopPanel({ menu, onNavigate }: { menu: Menu; onNavigate: () => void }) {
  const [first, ...rest] = menu.groups;
  const wide = Boolean(menu.feature);
  return (
    <div
      className={`grid gap-2 rounded-2xl bg-white p-3 shadow-lg ${
        wide ? "w-[880px] grid-cols-[1fr_1fr_250px]" : "w-[380px]"
      }`}
    >
      <div>
        <p className="px-2.5 pb-1 pt-1.5 text-xs font-medium text-muted">{first.title}</p>
        {first.links.map((l) => (
          <MenuItemLink key={l.href} link={l} onNavigate={onNavigate} />
        ))}
      </div>
      {rest.length > 0 && (
        <div className="space-y-2">
          {rest.map((g) => (
            <div key={g.title}>
              <p className="px-2.5 pb-1 pt-1.5 text-xs font-medium text-muted">{g.title}</p>
              {g.links.map((l) => (
                <MenuItemLink key={l.href} link={l} onNavigate={onNavigate} />
              ))}
            </div>
          ))}
        </div>
      )}
      {menu.feature && (
        <Link
          href={menu.feature.href}
          onClick={onNavigate}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-soft p-4"
          style={{
            backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        >
          {/* a sample win-back message, as the customer would see it */}
          <span className="mt-2 block rounded-xl rounded-es-md bg-white p-3 text-[12px] leading-snug text-ink shadow-md">
            {content.sample.message}
            <span className="mt-2 block border-t border-line pt-1.5 font-semibold text-brand">
              {content.sample.cta}
            </span>
          </span>
          <span className="mt-auto pt-5">
            <span className="block text-sm font-medium text-ink">{menu.feature.title}</span>
            <span className="mt-1 block text-[13px] leading-snug text-muted">{menu.feature.body}</span>
            <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-brand">
              {menu.feature.cta}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </span>
        </Link>
      )}
    </div>
  );
}

export function Nav() {
  const t = content.nav;
  const id = useId();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeAll = useCallback(() => {
    setOpen(null);
    setMobileOpen(false);
  }, []);

  // hairline + blur only once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes everything; a click outside closes the dropdown
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open) document.getElementById(`${id}-trigger-${open}`)?.focus();
      closeAll();
    };
    const onDown = (e: PointerEvent) => {
      if (open && navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, id, closeAll]);

  // no page scroll behind the mobile sheet
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  // hover opens on mouse only; touch and keyboard use click
  const hoverOpen = (label: string) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    closeTimer.current = setTimeout(() => setOpen(null), HOVER_CLOSE_MS);
  };

  const solid = scrolled || mobileOpen;

  return (
    <>
      <header
        ref={navRef}
        className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
          solid ? "border-line bg-white/85 backdrop-blur-md" : "border-transparent bg-white"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-8 px-4 sm:px-6">
          <Link href="/" aria-label={t.home} onClick={closeAll} className="shrink-0">
            <Wordmark />
          </Link>

          {/* Desktop menu */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => {
                if (!item.menu) {
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href!}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-soft hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                const isOpen = open === item.label;
                const panelId = `${id}-panel-${item.label}`;
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onPointerEnter={hoverOpen(item.label)}
                    onPointerLeave={hoverClose}
                  >
                    <button
                      id={`${id}-trigger-${item.label}`}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : item.label)}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-soft hover:text-ink ${
                        isOpen ? "bg-soft text-ink" : "text-ink-2"
                      }`}
                    >
                      {item.label}
                      <Chevron open={isOpen} />
                    </button>
                    {/* pt-3 bridges the gap so the pointer can travel into the panel */}
                    <div
                      id={panelId}
                      inert={!isOpen}
                      className={`absolute -start-3 top-full pt-3 transition duration-150 ${
                        isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                      }`}
                    >
                      <DesktopPanel menu={item.menu} onNavigate={closeAll} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ms-auto flex items-center gap-1.5 sm:gap-2">
            <a
              href={content.cta.href}
              className="btn-primary rounded-lg px-3.5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {content.cta.label}
            </a>
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls={`${id}-mobile`}
              aria-label={mobileOpen ? t.closeMenu : t.openMenu}
              onClick={() => setMobileOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-lg text-ink transition-colors hover:bg-soft lg:hidden"
            >
              <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                {mobileOpen ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3.5 6.5h13M3.5 13.5h13" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet. Lives outside <header>: the header's backdrop-filter
          would otherwise become the containing block for this fixed layer. */}
      <div
        id={`${id}-mobile`}
        inert={!mobileOpen}
        className={`fixed inset-x-0 bottom-0 top-16 z-30 overflow-y-auto bg-white px-4 pb-10 pt-2 transition duration-200 lg:hidden ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile">
          <ul className="divide-y divide-line">
            {items.map((item) =>
              item.menu ? (
                <li key={item.label}>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <svg viewBox="0 0 12 12" className="size-3.5 text-muted transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 4.5l3 3 3-3" />
                      </svg>
                    </summary>
                    <div className="space-y-3 pb-4">
                      {item.menu.groups.map((g) => (
                        <div key={g.title}>
                          <p className="px-2.5 pb-1 text-xs font-medium text-muted">{g.title}</p>
                          {g.links.map((l) => (
                            <MenuItemLink key={l.href} link={l} onNavigate={closeAll} />
                          ))}
                        </div>
                      ))}
                    </div>
                  </details>
                </li>
              ) : (
                <li key={item.label}>
                  <Link href={item.href!} onClick={closeAll} className="block py-4 text-base font-medium text-ink">
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <a
          href={content.cta.href}
          className="btn-primary mt-6 block rounded-xl px-5 py-3 text-center text-[15px] font-medium text-white"
        >
          {content.cta.label}
        </a>
        <p className="mt-2.5 text-center text-[13px] text-muted">{content.cta.note}</p>
      </div>
    </>
  );
}
