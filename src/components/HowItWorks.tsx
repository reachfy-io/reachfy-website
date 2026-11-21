"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/content";
import { DataField } from "./DataField";
import { howVisuals } from "./HowVisuals";

/*
  "How it works": the four steps (copy + product mockup) scroll on the
  start side. On desktop a pinned dot field on the end side shows what
  each step does to your customer data: messy, then profiles, segments,
  a targeted campaign, and customers coming back. On phones the steps
  simply stack with their mockups.
*/

const t = content.how;

function AgentMark() {
  return (
    <svg viewBox="0 0 20 20" className="size-3.5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M10 2l1.8 4.7L16.5 8.5l-4.7 1.8L10 15l-1.8-4.7L3.5 8.5l4.7-1.8z" />
    </svg>
  );
}

function Window({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className="size-5" />
          <span className="text-sm font-medium text-ink">{t.steps[step].title}</span>
        </div>
        <span className="rounded-md border border-line bg-soft px-2 py-0.5 text-xs font-medium text-muted">
          {t.tag}
        </span>
      </div>
      <div
        className="bg-soft p-4 sm:p-5"
        style={{
          backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  // the active step is the one crossing a thin line at mid-screen
  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number(e.target.getAttribute("data-step")));
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
      <header className="mx-auto max-w-[640px] text-center">
        <p className="text-sm font-medium text-brand">{t.label}</p>
        <h2
          id="how-title"
          className="mt-3 text-balance text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink"
        >
          {t.title}
        </h2>
        <p className="mx-auto mt-5 max-w-[34rem] text-lg leading-relaxed text-ink-2">{t.sub}</p>
      </header>

      <div className="mx-auto mt-16 grid max-w-[1100px] items-start gap-x-14 lg:mt-4 lg:grid-cols-2">
        {/* Steps, each with its mockup */}
        <ol ref={listRef}>
          {t.steps.map((step, i) => {
            const Visual = howVisuals[i];
            const on = i === active;
            return (
              <li
                key={step.title}
                data-step={i}
                className="pb-16 last:pb-0 lg:flex lg:min-h-[100vh] lg:flex-col lg:justify-center lg:pb-0"
              >
                <div className={`transition-opacity duration-300 lg:opacity-35 ${on ? "lg:opacity-100" : ""}`}>
                  <div className="flex gap-5">
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-semibold transition-colors duration-300 ${
                        on ? "text-white" : "bg-white text-ink-2 ring-1 ring-line-strong"
                      }`}
                      style={on ? { backgroundImage: "var(--logo-gradient)" } : undefined}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-xl font-semibold tracking-[-0.015em] text-ink">{step.title}</h3>
                      <p className="mt-2 max-w-[30rem] leading-relaxed text-ink-2">{step.body}</p>
                      <div className="mt-4 max-w-[30rem] rounded-xl border border-brand/15 bg-tint px-4 py-3">
                        <p className="flex items-center gap-1.5 text-xs font-medium text-brand">
                          <AgentMark />
                          {t.agentLabel}
                        </p>
                        <p className="mt-1 text-[15px] leading-snug text-brand-deep">{step.agent}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 lg:ms-[3.25rem]">
                    <Window step={i}>
                      <Visual />
                    </Window>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Desktop: the pinned dot field, vertically centered while the steps scroll */}
        <div className="sticky top-[calc(50vh-17rem)] hidden h-[34rem] lg:block">
          <DataField steps={listRef} />
        </div>
      </div>
    </section>
  );
}
