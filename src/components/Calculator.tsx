"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import { content } from "@/content";

/*
  Win-back revenue calculator. Everything comes from the visitor's own
  numbers, including the share who come back (we never assume a rate),
  and nothing leaves the browser.

    lapsed    = customers x share who stopped buying
    returning = lapsed x share who come back
    revenue   = returning x average order value   (one more order each)
*/

const t = content.calculator;

// customer counts on a stepped scale so the slider covers 100 to 100k
const CUSTOMER_STEPS = [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];

// formatters are memoized per currency so AnimatedMoney's effect only
// re-runs when the value or currency actually changes
function useFormat(currency: string) {
  const money = useMemo(
    () => new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: 0 }),
    [currency],
  );
  const count = useMemo(() => new Intl.NumberFormat("en", { maximumFractionDigits: 0 }), []);
  return {
    money: useCallback((n: number) => money.format(n), [money]),
    count: useCallback((n: number) => count.format(n), [count]),
  };
}

function Slider({
  label,
  help,
  value,
  display,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  help?: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        <output htmlFor={id} className="text-sm font-semibold tabular-nums text-ink">
          {display}
        </output>
      </div>
      {help && <p className="mt-0.5 text-xs text-muted">{help}</p>}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={display}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-3 w-full"
        style={{ "--fill": `${pct}%` } as React.CSSProperties}
      />
    </div>
  );
}

// the headline figure eases to its new value (instantly with reduced
// motion). The tween writes straight to the DOM node, not React state.
function AnimatedMoney({ value, format }: { value: number; format: (n: number) => string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const from = useRef(value);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduce) {
      from.current = value;
      node.textContent = format(value);
      return;
    }
    const controls = animate(from.current, value, {
      duration: 0.45,
      ease: "easeOut",
      onUpdate: (v) => {
        from.current = v;
        node.textContent = format(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [value, reduce, format]);
  return <span ref={ref}>{format(value)}</span>;
}

export function Calculator() {
  const [customerStep, setCustomerStep] = useState(5); // 5,000
  const [lapsedPct, setLapsedPct] = useState(35);
  const [aov, setAov] = useState(40);
  const [winbackPct, setWinbackPct] = useState(5);
  const [currency, setCurrency] = useState("USD");
  const currencyId = useId();
  const f = useFormat(currency);

  const customers = CUSTOMER_STEPS[customerStep];
  const lapsed = Math.round(customers * (lapsedPct / 100));
  const returning = Math.round(lapsed * (winbackPct / 100));
  const revenue = returning * aov;
  const ceiling = lapsed * aov;

  return (
    <section id="calculator" aria-labelledby="calculator-title" className="scroll-mt-20 px-4 pb-24 sm:px-6 sm:pb-32">
      <header className="mx-auto max-w-[640px] text-center">
        <p className="text-sm font-medium text-brand">{t.label}</p>
        <h2
          id="calculator-title"
          className="mt-3 text-balance text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink"
        >
          {t.title}
        </h2>
        <p className="mx-auto mt-5 max-w-[34rem] text-lg leading-relaxed text-ink-2">{t.sub}</p>
      </header>

      <div className="mx-auto mt-14 grid max-w-[1040px] overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-line lg:grid-cols-[1.1fr_1fr]">
        {/* Inputs */}
        <div className="space-y-7 p-6 sm:p-8">
          <Slider
            label={t.fields.customers.label}
            value={customerStep}
            display={f.count(customers)}
            min={0}
            max={CUSTOMER_STEPS.length - 1}
            onChange={setCustomerStep}
          />
          <Slider
            label={t.fields.lapsed.label}
            help={t.fields.lapsed.help}
            value={lapsedPct}
            display={`${lapsedPct}%`}
            min={5}
            max={80}
            onChange={setLapsedPct}
          />
          <div>
            <Slider
              label={t.fields.aov.label}
              value={aov}
              display={f.money(aov)}
              min={5}
              max={500}
              step={5}
              onChange={setAov}
            />
            <div className="mt-3 flex items-center gap-2">
              <label htmlFor={currencyId} className="text-xs text-muted">
                {t.currencyLabel}
              </label>
              <select
                id={currencyId}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="rounded-md border border-line bg-white px-2 py-1 text-xs font-medium text-ink"
              >
                {t.currencies.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <Slider
            label={t.fields.winback.label}
            help={t.fields.winback.help}
            value={winbackPct}
            display={`${winbackPct}%`}
            min={1}
            max={25}
            onChange={setWinbackPct}
          />
          <p className="flex items-center gap-1.5 text-xs text-muted">
            <svg viewBox="0 0 16 16" className="size-3.5 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="7" width="10" height="7" rx="1.5" />
              <path d="M5.5 7V5a2.5 2.5 0 015 0v2" />
            </svg>
            {t.privacy}
          </p>
        </div>

        {/* Result */}
        <div
          className="flex flex-col border-t border-line bg-soft p-6 sm:p-8 lg:border-s lg:border-t-0"
          style={{
            backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          <div className="rounded-xl bg-white p-5 shadow-md" aria-live="polite">
            <p className="text-sm font-medium text-ink-2">{t.result.headline}</p>
            <p className="mt-1 text-[clamp(2.25rem,5vw,3rem)] font-semibold leading-none tracking-[-0.03em] text-accent-deep tabular-nums">
              <AnimatedMoney value={revenue} format={f.money} />
            </p>
            <p className="mt-2 text-sm text-muted">{t.result.suffix}</p>

            <dl className="mt-5 divide-y divide-line border-t border-line text-sm">
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="text-ink-2">{t.result.lapsed}</dt>
                <dd className="font-medium tabular-nums text-ink">{f.count(lapsed)}</dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="text-ink-2">{t.result.returning}</dt>
                <dd className="font-medium tabular-nums text-accent-deep">{f.count(returning)}</dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="text-ink-2">{t.result.ceiling}</dt>
                <dd className="font-medium tabular-nums text-ink">{f.money(ceiling)}</dd>
              </div>
            </dl>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted">{t.result.note}</p>

          <div className="mt-auto pt-6">
            <a
              href={content.cta.href}
              className="btn-primary block rounded-xl px-5 py-3 text-center text-[15px] font-medium text-white transition-opacity hover:opacity-90"
            >
              {content.cta.label}
            </a>
            <p className="mt-2 text-center text-[13px] text-muted">{content.cta.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
