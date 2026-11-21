"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/i18n/dictionaries";

type Phase = "typing" | "steps" | "await" | "sending" | "sent";

const STEP_MS = 1100;

export function AgentDemo({ t }: { t: Dictionary["demo"] }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState(0);
  const [stepsDone, setStepsDone] = useState(0);

  // 1. Type the request
  useEffect(() => {
    if (phase !== "typing") return;
    const finished = reduce || typed >= t.prompt.length;
    const id = setTimeout(
      () => {
        if (finished) {
          setTyped(t.prompt.length);
          setPhase("steps");
        } else {
          setTyped((n) => n + 1);
        }
      },
      reduce ? 0 : finished ? 450 : 38,
    );
    return () => clearTimeout(id);
  }, [phase, typed, reduce, t.prompt.length]);

  // 2. Work through the steps, then wait for the visitor to approve
  useEffect(() => {
    if (phase !== "steps") return;
    const finished = stepsDone >= t.steps.length;
    const id = setTimeout(
      () => (finished ? setPhase("await") : setStepsDone((n) => n + 1)),
      reduce || finished ? 0 : STEP_MS,
    );
    return () => clearTimeout(id);
  }, [phase, stepsDone, reduce, t.steps.length]);

  // 3. Sending, then the message lands on the phone
  useEffect(() => {
    if (phase !== "sending") return;
    const id = setTimeout(() => setPhase("sent"), reduce ? 0 : 1400);
    return () => clearTimeout(id);
  }, [phase, reduce]);

  const replay = useCallback(() => {
    setTyped(0);
    setStepsDone(0);
    setPhase("typing");
  }, []);

  const showSteps = phase !== "typing";
  const working = phase === "steps" && stepsDone < t.steps.length;

  return (
    <div
      id="agent"
      className="relative mx-auto w-full max-w-[460px] xl:me-0 xl:ms-auto xl:max-w-none xl:w-[610px] xl:pb-10"
    >
      {/* the glow behind the console */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-16 -top-24 bottom-0 -z-10 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 45%, color-mix(in oklab, var(--glow) 55%, transparent), transparent 70%), radial-gradient(35% 35% at 80% 85%, color-mix(in oklab, var(--saffron) 35%, transparent), transparent 70%)",
        }}
      />

      {/* Agent console */}
      <section
        aria-label={t.label}
        className="relative rounded-3xl border border-line bg-panel/85 p-5 xl:w-[400px] shadow-[0_30px_80px_-30px_rgba(124,140,255,0.55)] backdrop-blur-xl sm:p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative grid size-8 place-items-center">
              <motion.span
                className="absolute inset-0 rounded-full bg-glow/40"
                animate={working && !reduce ? { scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] } : { scale: 1, opacity: 0.4 }}
                transition={{ duration: 1.4, repeat: working ? Infinity : 0 }}
              />
              <span className="relative size-3.5 rounded-full bg-gradient-to-br from-glow to-saffron" />
            </span>
            <span className="text-sm font-medium text-text">{t.agentName}</span>
          </div>
          <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
            {t.tag}
          </span>
        </div>

        {/* The request */}
        <div className="mt-5 flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-ee-md bg-glow px-4 py-2.5 text-[15px] leading-snug text-night">
            {t.prompt.slice(0, typed)}
            {phase === "typing" && (
              <span className="ms-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-night" />
            )}
          </p>
        </div>

        {/* Steps */}
        <ol className="mt-5 space-y-1" aria-live="polite">
          {t.steps.map((step, i) => {
            const done = i < stepsDone;
            const active = showSteps && i === stepsDone && phase === "steps";
            if (!done && !active) return null;
            return (
              <motion.li
                key={step.title}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex items-start gap-3 rounded-xl px-2 py-2"
              >
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center">
                  {done ? (
                    <motion.svg
                      viewBox="0 0 20 20"
                      className="size-5"
                      initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      aria-hidden="true"
                    >
                      <circle cx="10" cy="10" r="10" fill="var(--glow)" />
                      <path d="M6 10.5l2.6 2.6L14 7.6" stroke="var(--night)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  ) : (
                    <span className="size-4 animate-spin rounded-full border-2 border-line border-t-glow" />
                  )}
                </span>
                <span>
                  <span className={`block text-[15px] ${done ? "text-text" : "text-muted"}`}>
                    {step.title}
                  </span>
                  {done && (
                    <span className="block text-sm text-muted">{step.detail}</span>
                  )}
                </span>
              </motion.li>
            );
          })}
        </ol>

        {/* Approval */}
        <AnimatePresence mode="wait">
          {(phase === "await" || phase === "sending") && (
            <motion.div
              key="approve"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 rounded-2xl border border-line bg-night/60 p-4"
            >
              <p className="text-sm text-muted">{t.approveTitle}</p>
              {phase === "await" ? (
                <button
                  type="button"
                  onClick={() => setPhase("sending")}
                  className="relative mt-3 w-full rounded-xl bg-text px-4 py-3 text-[15px] font-semibold text-night transition-transform active:scale-[0.98]"
                >
                  {!reduce && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-xl ring-2 ring-glow"
                      animate={{ opacity: [0.8, 0], scale: [1, 1.08] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />
                  )}
                  {t.approve}
                </button>
              ) : (
                <div className="mt-3">
                  <div className="flex justify-between text-sm text-text">
                    <span>{t.sending}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-glow to-saffron rtl:bg-gradient-to-l"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: reduce ? 0 : 1.3, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
          {phase === "sent" && (
            <motion.div
              key="sent"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-glow/40 bg-glow/10 p-4"
            >
              <span className="flex items-center gap-2 text-[15px] text-text">
                <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
                  <circle cx="10" cy="10" r="10" fill="var(--saffron)" />
                  <path d="M6 10.5l2.6 2.6L14 7.6" stroke="var(--night)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.sent}
              </span>
              <button
                type="button"
                onClick={replay}
                className="rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:text-text"
              >
                {t.replay}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Customer's phone */}
      <Phone t={t} sent={phase === "sent"} reduce={!!reduce} />
    </div>
  );
}

function Phone({
  t,
  sent,
  reduce,
}: {
  t: Dictionary["demo"];
  sent: boolean;
  reduce: boolean;
}) {
  return (
    <div
      aria-hidden={!sent}
      className="relative mx-auto -mt-6 w-[240px] rotate-[-3deg] rtl:rotate-[3deg] xl:absolute xl:end-0 xl:top-32 xl:mt-0 xl:w-[230px] xl:rotate-[4deg] xl:rtl:-rotate-[4deg]"
    >
      <div className="rounded-[2.2rem] border border-line bg-[#060918] p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
        <div className="overflow-hidden rounded-[1.8rem] bg-[#0e1330]">
          <div className="flex items-center gap-2.5 border-b border-line/60 px-4 pb-3 pt-5">
            <span className="grid size-8 place-items-center rounded-full bg-saffron text-sm font-bold text-night">
              {t.phoneName.charAt(0)}
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-medium text-text">{t.phoneName}</span>
              <span className="block text-[11px] text-muted">{t.phoneStatus}</span>
            </span>
          </div>
          <div className="flex h-[200px] flex-col justify-end px-3 pb-4">
            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 30, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="max-w-[92%] origin-bottom-left rounded-2xl rounded-es-md bg-panel p-3 rtl:origin-bottom-right"
                >
                  <p className="text-[13px] leading-snug text-text">{t.message}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[13px] font-medium text-saffron">{t.messageCta}</span>
                    <span className="text-[10px] text-muted">{t.time}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
