"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { content } from "@/content";

/*
  The pinned "data field" beside the How it works steps. Each dot is a
  customer. Scrolling through the steps moves the same dots through five
  states:

    0  messy    scattered, uneven, jittery (data spread across tools)
    1  profiles a tidy grid: every customer has one profile
    2  segments four clusters, lapsed regulars in brand purple
    3  target   other groups fade, messages travel to the lapsed group
    4  back     the customers who came back gather around Reachfy

  Progress is continuous: 1 when step 1 sits at mid-screen, 2 at step 2,
  and so on, so the picture always matches the step being read.
*/

const t = content.how;
const rows = t.visuals.segments.rows; // lapsed, weekend, VIP, one-time

// dots per segment, roughly proportional to the counts in the mockup
const COUNTS = [21, 39, 7, 53];
const TARGET = 0; // lapsed regulars
const N = COUNTS.reduce((a, b) => a + b, 0);

const BRAND = [76, 56, 145];
const GREY = [168, 160, 194];
const LIGHT = [205, 199, 223];

type Look = { x: number; y: number; r: number; c: number[]; a: number };
type Dot = { seg: number; delay: number; phase: number; states: Look[]; returned: boolean };

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let v = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    v = (v + Math.imul(v ^ (v >>> 7), 61 | v)) ^ v;
    return ((v ^ (v >>> 14)) >>> 0) / 4294967296;
  };
}
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

// cluster centers (fractions of the field) and the Reachfy hub
const CENTERS = [
  [0.3, 0.27],
  [0.72, 0.3],
  [0.72, 0.7],
  [0.3, 0.72],
];
const HUB = [0.5, 0.5];

function layout(w: number, h: number): Dot[] {
  const rand = rng(11);
  const unit = Math.min(w, h);
  const segs = COUNTS.flatMap((n, s) => Array.from({ length: n }, () => s));
  // shuffle so segments are mixed in the grid and the mess
  for (let i = segs.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [segs[i], segs[j]] = [segs[j], segs[i]];
  }
  const cols = 12;
  const gridRows = Math.ceil(N / cols);
  const seen = [0, 0, 0, 0];
  let returnedIndex = 0;
  const returnedTotal = Math.round(COUNTS[TARGET] * 0.62);

  return segs.map((seg, i) => {
    // 0 messy
    const messy: Look = {
      x: w * (0.06 + rand() * 0.88),
      y: h * (0.06 + rand() * 0.88),
      r: 1.4 + rand() * 2.4,
      c: rand() > 0.5 ? GREY : LIGHT,
      a: 0.45 + rand() * 0.45,
    };
    // 1 profiles: a tidy grid
    const col = i % cols;
    const row = Math.floor(i / cols);
    const profiles: Look = {
      x: w * (0.14 + (col / (cols - 1)) * 0.72),
      y: h * (0.16 + (row / (gridRows - 1)) * 0.68),
      r: 2.6,
      c: GREY,
      a: 0.85,
    };
    // 2 segments: sunflower packing inside each cluster
    const j = seen[seg]++;
    const radius = unit * 0.024 * Math.sqrt(COUNTS[seg]);
    const angle = j * 2.39996;
    const dist = radius * Math.sqrt((j + 0.5) / COUNTS[seg]);
    const cx = w * CENTERS[seg][0] + Math.cos(angle) * dist;
    const cy = h * CENTERS[seg][1] + Math.sin(angle) * dist;
    const isTarget = seg === TARGET;
    const segments: Look = { x: cx, y: cy, r: 2.8, c: isTarget ? BRAND : GREY, a: isTarget ? 1 : 0.75 };
    // 3 target: the rest fade back
    const target: Look = isTarget
      ? { x: cx, y: cy, r: 3.3, c: BRAND, a: 1 }
      : { x: cx, y: cy, r: 2.4, c: LIGHT, a: 0.45 };
    // 4 back: most of the lapsed group returns to a ring around Reachfy
    const returned = isTarget && j < returnedTotal;
    let back: Look;
    if (returned) {
      const k = returnedIndex++;
      const a = (k / returnedTotal) * Math.PI * 2 - Math.PI / 2;
      const rr = unit * 0.13;
      back = { x: w * HUB[0] + Math.cos(a) * rr, y: h * HUB[1] + Math.sin(a) * rr, r: 3.6, c: BRAND, a: 1 };
    } else {
      back = { ...target, a: isTarget ? 0.35 : 0.3 };
    }
    return {
      seg,
      delay: rand() * 0.3,
      phase: rand() * Math.PI * 2,
      states: [messy, profiles, segments, target, back],
      returned,
    };
  });
}

export function DataField({ steps }: { steps: React.RefObject<HTMLOListElement | null> }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [caption, setCaption] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const list = steps.current;
    if (!wrap || !canvas || !ctx || !list) return;

    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    let shown = -1;
    let raf = 0;
    let visible = false;
    let lastCaption = -1;
    const logo = new Image();
    logo.src = "/logo.svg";

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      w = r.width;
      h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = layout(w, h);
    };

    // 0..4: which state the reader is in, from where the steps sit on screen
    const progress = () => {
      const items = list.querySelectorAll<HTMLElement>("[data-step]");
      const mid = window.innerHeight / 2;
      const centers = Array.from(items, (el) => {
        const r = el.getBoundingClientRect();
        return r.top + r.height / 2;
      });
      if (!centers.length) return 0;
      if (mid < centers[0]) return clamp(1 - (centers[0] - mid) / (window.innerHeight * 0.55));
      for (let i = 0; i < centers.length - 1; i++) {
        if (mid < centers[i + 1]) return 1 + i + (mid - centers[i]) / (centers[i + 1] - centers[i]);
      }
      return centers.length;
    };

    const weight = (p: number, s: number) => clamp(1 - Math.abs(p - s));

    const draw = (time: number) => {
      const goal = progress();
      shown = reduce || shown < 0 ? goal : shown + (goal - shown) * 0.12;
      const p = clamp(shown, 0, 4);
      const k = Math.min(3, Math.floor(p));
      const f = p - k;

      const cap = Math.round(p);
      if (cap !== lastCaption) {
        lastCaption = cap;
        setCaption(cap);
      }

      ctx.clearRect(0, 0, w, h);
      const hx = w * HUB[0];
      const hy = h * HUB[1];
      const wTarget = weight(p, 3);
      const wBack = weight(p, 4);
      const wSeg = Math.max(weight(p, 2), wTarget * 0.8);

      // messages travelling from Reachfy to the lapsed group (step 3)
      if (wTarget > 0.01) {
        for (const d of dots) {
          if (d.seg !== TARGET) continue;
          const s = d.states[3];
          ctx.strokeStyle = `rgba(76,56,145,${0.12 * wTarget})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(hx, hy);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
          if (!reduce) {
            const q = (time * 0.00035 + d.phase / (Math.PI * 2)) % 1;
            ctx.fillStyle = `rgba(76,56,145,${0.7 * wTarget * (1 - q)})`;
            ctx.beginPath();
            ctx.arc(lerp(hx, s.x, q), lerp(hy, s.y, q), 1.6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // a soft halo around Reachfy once customers come back
      if (wBack > 0.01) {
        const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, Math.min(w, h) * 0.24);
        g.addColorStop(0, `rgba(76,56,145,${0.12 * wBack})`);
        g.addColorStop(1, "rgba(76,56,145,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // the customers
      const mess = weight(p, 0);
      for (const d of dots) {
        const local = ease(clamp((f - d.delay) / 0.7));
        const a = d.states[k];
        const b = d.states[k + 1];
        const jitter = reduce ? 0 : mess * 5;
        const x = lerp(a.x, b.x, local) + Math.sin(time * 0.0011 + d.phase) * jitter;
        const y = lerp(a.y, b.y, local) + Math.cos(time * 0.0009 + d.phase) * jitter;
        const c = a.c.map((v, i) => Math.round(lerp(v, b.c[i], local)));
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${lerp(a.a, b.a, local)})`;
        ctx.beginPath();
        ctx.arc(x, y, lerp(a.r, b.r, local), 0, Math.PI * 2);
        ctx.fill();
      }

      // Reachfy at the center from the campaign step on
      const wHub = clamp(p - 2.3);
      if (wHub > 0.01 && logo.complete) {
        const size = 30;
        ctx.globalAlpha = wHub;
        ctx.drawImage(logo, hx - size / 2, hy - size / 2, size, size);
        ctx.globalAlpha = 1;
      }

      // segment labels under each cluster
      if (wSeg > 0.01) {
        ctx.textAlign = "center";
        rows.forEach((row, s) => {
          const fade = s === TARGET ? wSeg : wSeg * (1 - wTarget * 0.6);
          const radius = Math.min(w, h) * 0.024 * Math.sqrt(COUNTS[s]);
          // labels sit on the outer edge (above the top row, below the bottom
          // row) so the message lines toward the center never cross them
          const lx = w * CENTERS[s][0];
          const cy = h * CENTERS[s][1];
          const ly = CENTERS[s][1] < 0.5 ? cy - radius - 30 : cy + radius + 20;
          // a thin white halo keeps labels readable over the message lines
          ctx.lineJoin = "round";
          ctx.lineWidth = 4;
          ctx.strokeStyle = `rgba(255,255,255,${fade})`;
          ctx.font = "500 13px 'Inter Variable', system-ui, sans-serif";
          ctx.strokeText(row.name, lx, ly);
          ctx.fillStyle = `rgba(18,13,36,${0.85 * fade})`;
          ctx.fillText(row.name, lx, ly);
          ctx.font = "400 12px 'Inter Variable', system-ui, sans-serif";
          ctx.strokeText(row.count, lx, ly + 16);
          ctx.fillStyle = `rgba(125,119,148,${fade})`;
          ctx.fillText(row.count, lx, ly + 16);
        });
      }

      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    // only animate while the section is on screen
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(wrap);

    const ro = new ResizeObserver(() => {
      resize();
      start();
    });
    ro.observe(wrap);

    const onScroll = () => {
      if (reduce) start();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    logo.onload = start;

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduce, steps]);

  return (
    <figure className="flex h-full flex-col" aria-hidden="true">
      <p className="text-center text-xs font-medium text-muted">{t.field.label}</p>
      <div ref={wrapRef} className="relative mt-2 min-h-0 flex-1">
        <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      </div>
      <figcaption className="relative h-6 text-center text-[15px] font-medium text-ink">
        {t.field.captions.map((c, i) => (
          <span
            key={c}
            className={`absolute inset-0 transition-opacity duration-300 ${i === caption ? "opacity-100" : "opacity-0"}`}
          >
            {c}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
