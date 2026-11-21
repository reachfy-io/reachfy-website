import { content } from "@/content";
import type { ProductPageData } from "@/productPages";
import { ChatMock } from "./AgentModes";
import { CampaignVisual, SegmentsVisual } from "./HowVisuals";
import { NavIcon } from "./NavIcon";
import { WhyVisual } from "./WhyReachfy";

/*
  Hero visuals for the product/channel/integration pages. Reuses the
  home page mockups where one fits, and adds three small ones (profile,
  email, sync). Illustrative numbers only, shown under a "Demo" tag.
*/

const v = content.how.visuals;

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

function ProfileMock() {
  const c = v.connect;
  const timeline = [
    { label: "Opened your email", when: "12 days ago" },
    { label: "Purchased Sourdough loaf", when: "74 days ago" },
    { label: "Purchased Birthday cake", when: "4 months ago" },
  ];
  return (
    <div className="w-full max-w-[22rem] rounded-xl bg-white p-4 shadow-md">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full text-sm font-semibold text-white" style={{ backgroundImage: "var(--logo-gradient)" }}>
          {c.profileName.charAt(0)}
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold text-ink">{c.profileName}</span>
          <span className="block text-xs text-muted">{c.profileMeta}</span>
        </span>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2">
        {c.profileStats.map((s) => (
          <div key={s.label} className="rounded-lg bg-soft px-2.5 py-2">
            <dt className="text-[11px] text-muted">{s.label}</dt>
            <dd className="mt-0.5 text-[13px] font-semibold text-ink">{s.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs font-medium text-muted">Activity</p>
      <ol className="mt-2 space-y-2.5 border-s border-line ps-4">
        {timeline.map((e) => (
          <li key={e.label} className="relative text-[13px] leading-tight">
            <span className="absolute -start-[1.3rem] top-1 size-2 rounded-full bg-brand" />
            <span className="block text-ink">{e.label}</span>
            <span className="text-[11px] text-muted">{e.when}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function EmailMock() {
  const stats = [
    { label: "Delivered", value: "98%" },
    { label: "Opened", value: "41%" },
    { label: "Clicked", value: "9%" },
  ];
  return (
    <div className="w-full max-w-[22rem] space-y-3">
      <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-md">
        <span className="grid size-8 place-items-center rounded-lg border border-line text-ink-2">
          <NavIcon name="email" />
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block text-sm font-medium text-ink">mail.laylasbakery.com</span>
          <span className="block text-xs text-muted">Sending domain</span>
        </span>
        <span className="ms-auto inline-flex items-center gap-1 rounded-md bg-tint px-2 py-0.5 text-xs font-medium text-brand-deep">
          <Check />
          Verified
        </span>
      </div>
      <div className="rounded-xl bg-white p-4 shadow-md">
        <p className="text-sm font-semibold text-ink">We miss you, Sara</p>
        <p className="text-xs text-muted">From Layla&apos;s Bakery &lt;hello@mail.laylasbakery.com&gt;</p>
        <dl className="mt-3 grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg bg-soft px-2.5 py-2">
              <dt className="text-[11px] text-muted">{s.label}</dt>
              <dd className="mt-0.5 text-sm font-semibold tabular-nums text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function SyncMock({ icon, name, items }: { icon: string; name: string; items: { label: string; value: string }[] }) {
  return (
    <div className="flex w-full max-w-[22rem] flex-col items-center">
      <div className="flex w-full items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-md">
        <NavIcon name={icon} />
        <span className="text-sm font-semibold text-ink">{name}</span>
        <span className="ms-auto inline-flex items-center gap-1 rounded-md bg-tint px-2 py-0.5 text-xs font-medium text-brand-deep">
          <Check />
          Connected
        </span>
      </div>
      <span aria-hidden="true" className="h-6 w-px bg-line-strong" />
      <div className="w-full rounded-xl bg-white p-4 shadow-md">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className="size-5" />
          <span className="text-sm font-semibold text-ink">Synced to Reachfy</span>
        </div>
        <ul className="mt-3 divide-y divide-line border-t border-line">
          {items.map((i) => (
            <li key={i.label} className="flex justify-between py-2 text-[13px]">
              <span className="text-ink-2">{i.label}</span>
              <span className="font-medium tabular-nums text-ink">{i.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PageVisual({ kind }: { kind: ProductPageData["visual"] }) {
  switch (kind) {
    case "agent":
      return (
        <div className="w-full max-w-[24rem]">
          <ChatMock />
        </div>
      );
    case "segments":
      return (
        <div className="w-full max-w-[24rem]">
          <SegmentsVisual />
        </div>
      );
    case "campaigns":
      return (
        <div className="w-full max-w-[24rem]">
          <CampaignVisual />
        </div>
      );
    case "profiles":
      return <ProfileMock />;
    case "whatsapp":
      return <WhyVisual kind="whatsapp" />;
    case "email":
      return <EmailMock />;
    case "shopify":
      return (
        <SyncMock
          icon="shopify"
          name="Shopify"
          items={[
            { label: "Customers", value: "6,214" },
            { label: "Orders", value: "18,402" },
          ]}
        />
      );
    case "odoo":
      return (
        <SyncMock
          icon="odoo"
          name="Odoo"
          items={[
            { label: "Customers", value: "6,214" },
            { label: "Products", value: "312" },
            { label: "Customer invoices", value: "18,402" },
          ]}
        />
      );
  }
}
