"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { content } from "@/content";
import { NavIcon } from "./NavIcon";

/*
  Hero visual, under the centered headline: Reachfy's weekly win-back
  workflow as a row of icon tiles joined by curved connectors (in the
  spirit of a workflow canvas), run left to right:
    Every Monday → Read your store orders (Shopify or Odoo) → Find who stopped buying →
    Write the message → Wait for your approval → WhatsApp / Email →
    186 customers came back
  A glowing point flows along the curves; each tile shows a running ring,
  then a check. At the approval tile the run waits for "Approve" (nothing
  sends before that). The last tile counts up. Then it holds and loops.

  All tiles are always on the canvas; only the run state animates, so the
  words are in the HTML and nothing shifts. On narrow screens the canvas
  keeps a readable size and the camera pans along with the run. It plays
  only while on screen; the server HTML and reduced motion show a
  finished run. Illustrative numbers.
*/

const v = content.hero.visual;

/* ---------- geometry (canvas pixels) ---------- */

const W = 1010;
const H = 280;
const T = 64; // tile size
const MID = 122;
const TOP = 48;
const BOT = 196;
const MIN_SCALE = 0.72; // below this the camera pans instead of shrinking further

type TileId = "trigger" | "store" | "find" | "write" | "approve" | "whatsapp" | "email" | "back";
type Tile = { id: TileId; x: number; y: number; step: number; label: string };

const TILES: Tile[] = [
  { id: "trigger", x: 60, y: MID, step: 0, label: v.trigger },
  { id: "store", x: 210, y: MID, step: 1, label: v.store },
  { id: "find", x: 360, y: MID, step: 2, label: v.find },
  { id: "write", x: 510, y: MID, step: 3, label: v.write },
  { id: "approve", x: 660, y: MID, step: 4, label: v.approve },
  { id: "whatsapp", x: 810, y: TOP, step: 5, label: v.whatsapp },
  { id: "email", x: 810, y: BOT, step: 5, label: v.email },
  { id: "back", x: 940, y: MID, step: 6, label: v.back },
];
const byId = Object.fromEntries(TILES.map((t) => [t.id, t])) as Record<TileId, Tile>;

const EDGES: { from: TileId; to: TileId }[] = [
  { from: "trigger", to: "store" },
  { from: "store", to: "find" },
  { from: "find", to: "write" },
  { from: "write", to: "approve" },
  { from: "approve", to: "whatsapp" },
  { from: "approve", to: "email" },
  { from: "whatsapp", to: "back" },
  { from: "email", to: "back" },
];

/** A cubic curve from the right port of `a` to the left port of `b`. */
function curve(a: Tile, b: Tile) {
  const x1 = a.x + T / 2 + 6;
  const x2 = b.x - T / 2 - 6;
  const dx = (x2 - x1) / 2;
  const p = [x1, a.y, x1 + dx, a.y, x2 - dx, b.y, x2, b.y] as const;
  const d = `M${p[0]} ${p[1]} C${p[2]} ${p[3]} ${p[4]} ${p[5]} ${p[6]} ${p[7]}`;
  // sample points along it, for the glowing point to follow
  const pts = Array.from({ length: 13 }, (_, i) => {
    const t = i / 12;
    const m = 1 - t;
    return [
      m ** 3 * p[0] + 3 * m * m * t * p[2] + 3 * m * t * t * p[4] + t ** 3 * p[6],
      m ** 3 * p[1] + 3 * m * m * t * p[3] + 3 * m * t * t * p[5] + t ** 3 * p[7],
    ];
  });
  return { d, pts, start: [x1, a.y], end: [x2, b.y] };
}

// From the approval on, the run is drawn in the accent (coral): the
// "they come back" part of the story. Before it, the brand purple.
const APPROVE_STEP = 4;
const isWarm = (tileStep: number) => tileStep > APPROVE_STEP;

/* ---------- timing ---------- */

// step i = the flow arrives at the tiles of step i; the last step is the hold
const DURATIONS = [1500, 2100, 2100, 1900, 3600, 2100, 2600, 4000];
const DONE = DURATIONS.length - 1;
const TRAVEL = 0.8; // seconds along a connector
const RUN = 0.6; // seconds a tile "runs" before its check
const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- icons ---------- */

function TileIcon({ id }: { id: TileId }) {
  switch (id) {
    case "trigger":
      return (
        <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="13.5" r="7.5" />
          <path d="M12 13.5l3-3M10 3h4M18.5 6.5l1.2-1.2" />
        </svg>
      );
    case "find":
      // eslint-disable-next-line @next/next/no-img-element
      return <img src="/logo.svg" alt="" className="size-8 rounded-lg" />;
    case "store":
      return <StoreIcon />;
    case "back":
      return (
        <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.6" />
          <path d="M4 4v4.6h4.6" />
          <path d="M12 8v4l2.5 2" />
        </svg>
      );
    default: {
      const name = { write: "agent", approve: "approve", whatsapp: "whatsapp", email: "email" }[id];
      const tone = id === "whatsapp" ? "text-wa-green" : "text-ink";
      // NavIcon draws 18px; scale its line icons and brand badges up for a tile
      return <span className={`${tone} [&>span]:size-8 [&>span]:text-sm [&_svg]:size-7`}><NavIcon name={name} /></span>;
    }
  }
}

/** One store per workspace: the mark swaps between Shopify and Odoo. */
function StoreIcon() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % 2), 2200);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <span className="grid [&>span]:[grid-area:1/1] [&_span>span]:size-8 [&_span>span]:text-sm">
      {["shopify", "odoo"].map((name, n) => (
        <motion.span key={name} initial={false} animate={{ opacity: i === n ? 1 : 0, scale: i === n ? 1 : 0.8 }} transition={{ duration: 0.4, ease }}>
          <NavIcon name={name} />
        </motion.span>
      ))}
    </span>
  );
}

function CheckBadge({ warm }: { warm: boolean }) {
  return (
    <span className={`grid size-5 place-items-center rounded-full text-white ring-2 ring-white ${warm ? "bg-accent" : "bg-brand"}`}>
      <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3.5 8.5l3 3 6-7" />
      </svg>
    </span>
  );
}

/** A number that counts up from 0 when `play` is on. */
function CountUp({ to, play, delay }: { to: number; play: boolean; delay: number }) {
  const n = useMotionValue(play ? 0 : to);
  const text = useTransform(n, (x) => Math.round(x).toLocaleString("en-US"));
  useEffect(() => {
    if (!play) return;
    const a = animate(n, to, { delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] });
    return () => a.stop();
  }, [play, n, to, delay]);
  return (
    <span className="relative inline-block tabular-nums">
      <span className="invisible">{to.toLocaleString("en-US")}</span>
      <motion.span className="absolute inset-0">{text}</motion.span>
    </span>
  );
}

/* ---------- a tile ---------- */

function TileView({ tile, step, live }: { tile: Tile; step: number; live: boolean }) {
  const arriving = live && step === tile.step; // the flow reaches this tile now
  const done = step > tile.step || (step === tile.step && !live) || step === DONE;
  // the approval waits for "Approve" before its check
  const isApprove = tile.id === "approve";
  const checkAt = tile.step === 0 ? RUN : TRAVEL + RUN + (isApprove ? 1.6 : 0);

  return (
    <div className="absolute" style={{ left: tile.x - T / 2, top: tile.y - T / 2, width: T }}>
      {/* the approval tag above the tile */}
      {isApprove && (step >= tile.step || !live) && (
        <span className="absolute bottom-full left-1/2 mb-2.5 grid -translate-x-1/2 whitespace-nowrap">
          <motion.span
            className="rounded-md bg-accent-soft px-2 py-0.5 text-center text-[11px] font-semibold text-accent-deep ring-1 ring-accent/30 [grid-area:1/1]"
            initial={arriving ? { opacity: 0, y: 4 } : false}
            animate={arriving ? { opacity: [0, 1, 1, 1, 0], y: 0, scale: [1, 1, 1.06, 0.94, 1] } : { opacity: 0 }}
            transition={{ duration: 1.6, delay: TRAVEL + 0.2, times: [0, 0.15, 0.55, 0.8, 1] }}
          >
            {v.approveTag}
          </motion.span>
          <motion.span
            className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold text-white [grid-area:1/1]"
            initial={arriving ? { opacity: 0 } : false}
            animate={{ opacity: done || arriving ? 1 : 0 }}
            transition={{ duration: 0.3, delay: arriving ? TRAVEL + 1.7 : 0 }}
          >
            <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3.5 8.5l3 3 6-7" />
            </svg>
            {v.approvedTag}
          </motion.span>
        </span>
      )}

      {/* the tile */}
      <div
        className={`relative grid place-items-center border border-line bg-white shadow-sm ${tile.id === "trigger" ? "rounded-s-[2rem] rounded-e-2xl" : "rounded-2xl"}`}
        style={{ width: T, height: T }}
      >
        <TileIcon id={tile.id} />
        {/* running ring */}
        {arriving && (
          <motion.span
            className={`pointer-events-none absolute -inset-1 border-2 ${isWarm(tile.step) || isApprove ? "border-accent/60" : "border-brand/50"} ${tile.id === "trigger" ? "rounded-s-[2.2rem] rounded-e-[1.2rem]" : "rounded-[1.2rem]"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: checkAt - (tile.step === 0 ? 0 : TRAVEL) + 0.2, delay: tile.step === 0 ? 0 : TRAVEL, times: [0, 0.1, 0.85, 1] }}
          />
        )}
        {/* the check, once this step has run */}
        {(done || arriving) && (
          <motion.span
            className="absolute -bottom-1.5 -right-1.5"
            initial={arriving ? { opacity: 0, scale: 0.4 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease, delay: arriving ? checkAt : 0 }}
          >
            <CheckBadge warm={isWarm(tile.step)} />
          </motion.span>
        )}
        {/* how many the agent found */}
        {tile.id === "find" && (done || arriving) && (
          <motion.span
            className="absolute -right-3 -top-2.5 rounded-full bg-ink px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-white"
            initial={arriving ? { opacity: 0, scale: 0.6 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease, delay: arriving ? checkAt + 0.1 : 0 }}
          >
            {v.found}
          </motion.span>
        )}
      </div>

      {/* the label */}
      <p className="absolute left-1/2 top-full mt-3 w-36 -translate-x-1/2 text-center text-[13px] font-medium leading-snug text-ink">
        {tile.id === "store" ? (
          <>
            {tile.label}
            <span className="block text-[12px] font-normal text-muted">{v.storeNote}</span>
          </>
        ) : tile.id === "back" ? (
          <>
            <span className="font-semibold text-accent-deep">
              <CountUp to={v.backCount} play={arriving} delay={TRAVEL + RUN} />
            </span>{" "}
            {tile.label}
          </>
        ) : (
          tile.label
        )}
      </p>
    </div>
  );
}

/* ---------- a connector ---------- */

function EdgeView({ a, b, step, live }: { a: Tile; b: Tile; step: number; live: boolean }) {
  const c = curve(a, b);
  const reached = step >= b.step;
  const flowing = live && step === b.step;
  const color = isWarm(b.step) ? "var(--accent)" : "var(--brand)";
  return (
    <g>
      <path d={c.d} fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
      {reached && (
        <motion.path
          d={c.d}
          fill="none"
          stroke={color}
          strokeOpacity="0.5"
          strokeWidth="1.5"
          initial={flowing ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: TRAVEL, ease: "easeInOut" }}
        />
      )}
      <circle cx={c.start[0]} cy={c.start[1]} r="3.5" fill="var(--muted)" />
      <circle cx={c.end[0]} cy={c.end[1]} r="3.5" fill="var(--muted)" />
      {flowing && (
        <motion.g
          initial={{ x: c.pts[0][0], y: c.pts[0][1], opacity: 1 }}
          animate={{ x: c.pts.map((p) => p[0]), y: c.pts.map((p) => p[1]), opacity: [1, 1, 0] }}
          transition={{
            x: { duration: TRAVEL, ease: "easeInOut" },
            y: { duration: TRAVEL, ease: "easeInOut" },
            opacity: { duration: TRAVEL + 0.25, times: [0, 0.8, 1] },
          }}
        >
          <circle r="12" fill={color} opacity="0.18" />
          <circle r="4.5" fill={color} />
        </motion.g>
      )}
    </g>
  );
}

/* ---------- the panel ---------- */

function useWidth(ref: React.RefObject<HTMLElement | null>) {
  const [w, setW] = useState(W);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return w;
}

// the column the camera follows at each step (narrow screens only)
const FOCUS_X = [60, 210, 360, 510, 660, 810, 940, W / 2];

export function HeroVisual() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const cw = useWidth(ref);
  // The server HTML and the first client render show a finished run, so
  // they match; the run starts once the workflow is on screen.
  const [step, setStep] = useState(DONE);
  const [run, setRun] = useState(0);
  const [playing, setPlaying] = useState(false);
  const autoplay = inView && !reduce;

  useEffect(() => {
    if (!autoplay || playing) return;
    const id = setTimeout(() => {
      setPlaying(true);
      setStep(0);
      setRun((r) => r + 1);
    }, 400);
    return () => clearTimeout(id);
  }, [autoplay, playing]);

  useEffect(() => {
    if (!autoplay || !playing) return;
    const id = setTimeout(() => {
      if (step === DONE) {
        setStep(0);
        setRun((r) => r + 1);
      } else {
        setStep(step + 1);
      }
    }, DURATIONS[step]);
    return () => clearTimeout(id);
  }, [autoplay, playing, step]);

  const live = playing && autoplay;
  const fit = cw / W;
  const pan = fit < MIN_SCALE;
  const scale = pan ? MIN_SCALE : Math.min(1, fit);
  const span = W * scale;
  const x = pan ? Math.min(0, Math.max(cw - span, cw / 2 - FOCUS_X[step] * scale)) : (cw - span) / 2;

  return (
    <figure ref={ref} aria-label={v.label} className="relative mx-auto w-full max-w-[1100px]">
      {/* height follows the scale: fixed while panning, the canvas ratio otherwise */}
      <div className="relative h-[202px] overflow-hidden md:aspect-[1010/280] md:h-auto md:overflow-visible">
        <motion.div
          key={run}
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: W, height: H }}
          initial={false}
          animate={{ x, scale }}
          transition={{ duration: pan ? 0.8 : 0, ease }}
        >
          <svg className="absolute inset-0 overflow-visible" width={W} height={H} aria-hidden="true">
            {EDGES.map((e) => (
              <EdgeView key={`${e.from}-${e.to}`} a={byId[e.from]} b={byId[e.to]} step={step} live={live} />
            ))}
          </svg>
          {TILES.map((t) => (
            <TileView key={t.id} tile={t} step={step} live={live} />
          ))}
        </motion.div>
      </div>
    </figure>
  );
}
