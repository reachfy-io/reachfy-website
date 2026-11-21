/*
  Copy for /pricing/, rendered by src/app/pricing/page.tsx.

  Source: "Reachfy Lean Canvas 2027" (Plan 2027, Platform First, 21 Nov 2026),
  Revenue Streams. Plans are priced by database size (customers). The canvas
  prices in JOD (49 / 119 / 199 / 400+); the site shows USD, converted at
  1 JOD = 1.41 USD and rounded to $69 / $169 / $279 / $569+.
  Every plan includes every feature. Annual billing is "pay 10 months, get 12"; WhatsApp is paid to
  Meta at Meta's cost with no markup.
*/

export type Plan = {
  name: string;
  for: string;
  limit: string;
  price: string | null; // USD per month; null = quoted
  from?: boolean; // show "From"
  cta: "start" | "talk";
};

export const pricing = {
  meta: {
    title: "Pricing",
    description:
      "Reachfy plans start at $69 a month, priced by the size of your customer list. Every plan includes the AI agent, WhatsApp and email. WhatsApp at Meta's cost, no markup.",
  },
  label: "Pricing",
  title: "One price for every feature. You choose the size.",
  sub: "Every plan includes the AI agent, WhatsApp, email and every integration. Pick the plan that fits the number of customers you have.",
  plansHeading: "Plans",
  extrasHeading: "Good to know",
  currency: "$",
  perMonth: "/ month",
  from: "From",
  talk: "Talk to us",
  plans: [
    { name: "Starter", for: "For stores starting to win customers back", limit: "Up to 10,000 customers", price: "69", cta: "start" },
    { name: "Growth", for: "For stores with a growing customer base", limit: "Up to 50,000 customers", price: "169", cta: "start" },
    { name: "Pro", for: "For large customer bases", limit: "Up to 150,000 customers", price: "279", cta: "start" },
    { name: "Enterprise", for: "For several brands, or a very large customer base", limit: "Over 150,000 customers", price: "569", from: true, cta: "talk" },
  ] as Plan[],
  notes: "Prices are in US dollars (USD).",
  extras: [
    {
      icon: "whatsapp",
      title: "WhatsApp at Meta's cost",
      body: "Messages go out from your own WhatsApp Business account, and Meta bills you at its own rates. We add no markup.",
    },
    {
      icon: "calendar",
      title: "Pay yearly, get 2 months free",
      body: "Pay for 10 months and get 12, on any plan.",
    },
    {
      icon: "profiles",
      title: "Priced by customers, not features",
      body: "Plans differ only by the number of customers in your database. Every feature is on every plan.",
    },
  ],
  included: {
    title: "Every plan includes",
    items: [
      { icon: "agent", title: "AI agent", body: "Brainstorm with it anytime, and get campaign suggestions every week." },
      { icon: "approve", title: "Approval before sending", body: "Nothing reaches a customer until you approve it." },
      { icon: "profiles", title: "Customer profiles and segments", body: "Every order and event per customer, grouped your way." },
      { icon: "campaigns", title: "Scheduled and triggered campaigns", body: "Send at a set time, or when a customer does something." },
      { icon: "whatsapp", title: "WhatsApp", body: "On Meta's official platform, with template management." },
      { icon: "email", title: "Email", body: "From your own verified domain." },
      { icon: "shopify", title: "Shopify and Odoo", body: "Connect your store in one click." },
      { icon: "team", title: "Team seats and workspaces", body: "Invite your team and keep each brand separate." },
      { icon: "api", title: "API and MCP server", body: "Connect your own systems and AI tools." },
    ],
  },
  faq: {
    label: "Pricing FAQ",
    title: "Questions about pricing",
    sub: "Something not covered here?",
    contact: "Ask us",
    items: [
      {
        q: "How do you count customers?",
        a: "Each plan covers a number of customers in your Reachfy database: the customer profiles synced from your store, imported from a CSV, or sent through the API.",
      },
      {
        q: "Do all plans include the AI agent?",
        a: "Yes. Every plan includes every feature, including the AI agent, WhatsApp, email and all integrations. Plans differ only by the number of customers.",
      },
      {
        q: "Who pays for WhatsApp messages?",
        a: "You pay Meta directly. Messages are sent from your own WhatsApp Business account at Meta's rates, and Reachfy adds no markup.",
      },
      {
        q: "Can I pay yearly?",
        a: "Yes. Pay for 10 months and get 12, on any plan.",
      },
      {
        q: "What if I have more than 150,000 customers or several brands?",
        a: "The Enterprise plan starts at $569 a month and is quoted for your setup. Get in touch and we'll put a price together.",
      },
    ],
  },
};
