// Small line icons for nav menu items, drawn on a 20px grid.
// Third-party marks (Shopify, Odoo) use their own brand color.

const paths: Record<string, React.ReactNode> = {
  agent: (
    <>
      <path d="M10 2.5l1.6 4.2 4.2 1.6-4.2 1.6L10 14.1l-1.6-4.2-4.2-1.6 4.2-1.6z" />
      <path d="M15.5 13.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" />
    </>
  ),
  segments: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 3v7l5 5" />
    </>
  ),
  campaigns: (
    <>
      <path d="M17 3L8.5 11.5" />
      <path d="M17 3l-5 14-3.5-5.5L3 8z" />
    </>
  ),
  profiles: (
    <>
      <circle cx="10" cy="7" r="3.5" />
      <path d="M3.5 17c.8-3 3.4-4.5 6.5-4.5s5.7 1.5 6.5 4.5" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M10 2.75a7.25 7.25 0 00-6.3 10.83L2.75 17.25l3.77-.93A7.25 7.25 0 1010 2.75z" />
      <path d="M7.5 7.5c0 2.8 2.2 5 5 5l.9-1.3-1.6-.8-.7.7c-.9-.4-1.6-1.1-2-2l.7-.7-.8-1.6z" />
    </>
  ),
  email: (
    <>
      <rect x="2.75" y="4.5" width="14.5" height="11" rx="2" />
      <path d="M3.5 5.5l6.5 5 6.5-5" />
    </>
  ),
  pos: (
    <>
      <path d="M2.75 4.25h14.5l-1 3.75H3.75z" />
      <path d="M3.75 8v8.25h12.5V8" />
      <path d="M8 16.25v-4h4v4" />
    </>
  ),
  chat: (
    <>
      <path d="M3.25 5.5a2 2 0 012-2h9.5a2 2 0 012 2v6a2 2 0 01-2 2H9l-3.75 3v-3h0a2 2 0 01-2-2z" />
      <path d="M7 8.5h6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4.25" width="14" height="12.5" rx="2" />
      <path d="M3 8.25h14M7 2.75v3M13 2.75v3" />
      <path d="M10 10.75v2.25l1.5 1" />
    </>
  ),
  team: (
    <>
      <circle cx="7.5" cy="7" r="2.75" />
      <path d="M2.75 16c.5-2.6 2.4-4 4.75-4s4.25 1.4 4.75 4" />
      <path d="M13 4.6a2.6 2.6 0 010 4.8M14.5 12.2c1.5.4 2.5 1.7 2.75 3.8" />
    </>
  ),
  tracking: (
    <>
      <path d="M2.75 10.5l3 3 5.5-6.25" />
      <path d="M8.75 13.5l1 .9 6.5-7.15" />
    </>
  ),
  workspaces: (
    <>
      <path d="M10 2.75l7.25 3.75L10 10.25 2.75 6.5z" />
      <path d="M2.75 10l7.25 3.75L17.25 10" />
      <path d="M2.75 13.5l7.25 3.75 7.25-3.75" />
    </>
  ),
  approve: (
    <>
      <circle cx="10" cy="10" r="7.25" />
      <path d="M6.75 10.25l2.25 2.25 4.25-4.75" />
    </>
  ),
  shield: (
    <>
      <path d="M10 2.75l6 2.25v4.5c0 3.75-2.5 6.5-6 7.75-3.5-1.25-6-4-6-7.75V5z" />
      <path d="M7.25 10l2 2 3.5-3.75" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="8.75" width="12" height="8.5" rx="2" />
      <path d="M6.75 8.75V6.5a3.25 3.25 0 016.5 0v2.25" />
      <path d="M10 12v2" />
    </>
  ),
  docs: (
    <>
      <path d="M4 3.5h8.5L16 7v9.5H4z" />
      <path d="M12 3.5V7h4M7 10.5h6M7 13.5h4" />
    </>
  ),
  api: (
    <>
      <path d="M7 5.5L2.75 10 7 14.5M13 5.5l4.25 4.5L13 14.5" />
    </>
  ),
  mcp: (
    <>
      <path d="M7.5 2.75v3.5M12.5 2.75v3.5" />
      <path d="M5 6.25h10v3.5a5 5 0 01-10 0z" />
      <path d="M10 14.75v2.5" />
    </>
  ),
};

const brand: Record<string, { bg: string; letter: string }> = {
  shopify: { bg: "#95bf47", letter: "S" },
  odoo: { bg: "#714b67", letter: "O" },
};

export function NavIcon({ name }: { name: string }) {
  const b = brand[name];
  if (b) {
    return (
      <span
        className="grid size-5 place-items-center rounded-full text-[10px] font-bold text-white"
        style={{ background: b.bg }}
        aria-hidden="true"
      >
        {b.letter}
      </span>
    );
  }
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
