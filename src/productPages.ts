/*
  Copy for the product, channel and integration pages
  (/product/*, /channels/*, /integrations/*), rendered by
  src/components/ProductPage.tsx.

  Facts come from reachfy-ops/product/current-state.md. The AI agent, the
  approval queue and Shopify are described as features because the user
  decided they ship before the site launches (see memory: launch-gate).
  Don't add claims about anything else that isn't built.
*/

export type Point = { icon: string; title: string; body: string };
export type ProductPageData = {
  group: "product" | "channels" | "integrations";
  slug: string;
  label: string; // small label above the h1, also the nav name
  title: string; // h1
  sub: string;
  metaTitle: string;
  metaDescription: string;
  visual: "agent" | "segments" | "campaigns" | "profiles" | "whatsapp" | "email" | "shopify" | "odoo";
  pointsTitle: string;
  points: Point[];
  related: string[]; // paths of related pages
};

export const groupLabels = {
  product: "Product",
  channels: "Channels",
  integrations: "Integrations",
} as const;

export const productPages: ProductPageData[] = [
  {
    group: "product",
    slug: "agent",
    label: "AI agent",
    title: "An AI agent that brings your customers back",
    sub: "It reads your store data, finds who stopped buying, and writes the message in Arabic or English. You approve, then it sends.",
    metaTitle: "AI agent for customer win-back",
    metaDescription:
      "Reachfy's AI agent finds customers who stopped buying, writes WhatsApp and email messages in Arabic or English, and sends only after you approve.",
    visual: "agent",
    pointsTitle: "What the agent does",
    points: [
      { icon: "chat", title: "Brainstorm anytime", body: "Ask about your customers in plain language. The agent answers from your own store data and turns good ideas into campaigns." },
      { icon: "calendar", title: "Weekly suggestions", body: "Every week it reads your new orders in the background and suggests the campaigns worth running." },
      { icon: "agent", title: "Writes in Arabic or English", body: "Each message is drafted in the language your customers read, ready for you to review." },
      { icon: "approve", title: "You approve every send", body: "The agent prepares who gets it, what it says and when it goes. Nothing reaches a customer until you approve it." },
      { icon: "lock", title: "Your customers' details stay private", body: "The agent works from a summary of your store data, never your customers' names, phone numbers or email addresses." },
    ],
    related: ["/product/segments/", "/product/campaigns/", "/channels/whatsapp/"],
  },
  {
    group: "product",
    slug: "segments",
    label: "Segments",
    title: "Group customers by what they buy and when",
    sub: "Build segments from purchases, events and any attribute, and see exactly who's in them before you send anything.",
    metaTitle: "Customer segments",
    metaDescription:
      "Segment customers by purchases, events and attributes, find who hasn't ordered in a while, and preview the count before you send.",
    visual: "segments",
    pointsTitle: "What you can do with segments",
    points: [
      { icon: "segments", title: "Filter on anything you know", body: "Use customer attributes, events and purchase history, from your store, a CSV or the API." },
      { icon: "calendar", title: "Find who stopped buying", body: "Group customers with no purchase in a set number of days, the starting point for every win-back." },
      { icon: "profiles", title: "Preview before you save", body: "See how many customers match a segment while you build it." },
      { icon: "agent", title: "Suggested by the agent", body: "The agent spots groups worth winning back, like regulars who suddenly stopped." },
    ],
    related: ["/product/profiles/", "/product/campaigns/", "/product/agent/"],
  },
  {
    group: "product",
    slug: "campaigns",
    label: "Campaigns",
    title: "Campaigns that run on time, or the moment something happens",
    sub: "Send on WhatsApp and email, once on a schedule or every time a customer does something, and track the conversions that follow.",
    metaTitle: "WhatsApp and email campaigns",
    metaDescription:
      "Scheduled, event-based and delayed campaigns on WhatsApp and email, with conversion tracking and approval before anything sends.",
    visual: "campaigns",
    pointsTitle: "How campaigns work",
    points: [
      { icon: "calendar", title: "Scheduled, event-based or delayed", body: "Send at a set time, the moment a customer does something, or after a delay you choose." },
      { icon: "whatsapp", title: "WhatsApp and email", body: "Use approved WhatsApp templates and email from your own domain in the same place." },
      { icon: "tracking", title: "Track conversions", body: "Set a goal for each campaign and see how many messaged customers converted." },
      { icon: "approve", title: "Approval before sending", body: "Review the audience, the message and the timing, then approve." },
    ],
    related: ["/product/segments/", "/channels/whatsapp/", "/channels/email/"],
  },
  {
    group: "product",
    slug: "profiles",
    label: "Customer profiles",
    title: "Every customer, in one profile",
    sub: "Orders, events and attributes for each customer in one place, kept up to date from your store, a CSV or the API.",
    metaTitle: "Customer profiles and events",
    metaDescription:
      "One profile per customer with orders, events and custom attributes, synced from Odoo or Shopify, imported from CSV, or sent through the API.",
    visual: "profiles",
    pointsTitle: "What a profile holds",
    points: [
      { icon: "profiles", title: "Attributes", body: "Name, contact details, country and any custom attribute your business tracks." },
      { icon: "tracking", title: "Purchases and events", body: "Every purchase and custom event, with its time and details." },
      { icon: "docs", title: "CSV import", body: "Bring in customers from a spreadsheet. Extra columns become custom attributes." },
      { icon: "api", title: "API", body: "Create customers and log events from your own systems." },
    ],
    related: ["/integrations/odoo/", "/integrations/shopify/", "/product/segments/"],
  },
  {
    group: "channels",
    slug: "whatsapp",
    label: "WhatsApp",
    title: "WhatsApp campaigns on the official platform",
    sub: "Reachfy is a Meta Tech Provider. Connect your WhatsApp Business number in a few steps and send approved templates from Reachfy.",
    metaTitle: "WhatsApp marketing on the official platform",
    metaDescription:
      "Send WhatsApp marketing campaigns through Meta's official Cloud API. Reachfy is a Meta Tech Provider with template management and delivery tracking.",
    visual: "whatsapp",
    pointsTitle: "Built on Meta's official platform",
    points: [
      { icon: "shield", title: "Meta Tech Provider", body: "Reachfy sends through Meta's WhatsApp Cloud API as an approved Tech Provider." },
      { icon: "whatsapp", title: "Connect your number", body: "Sign up through Meta's embedded flow, and keep using the WhatsApp Business app on the same number." },
      { icon: "docs", title: "Template management", body: "Create your message templates and manage them in one place." },
      { icon: "tracking", title: "Delivery and quality", body: "Track delivery status and keep an eye on your number's quality rating and messaging limits." },
    ],
    related: ["/channels/email/", "/product/campaigns/", "/product/agent/"],
  },
  {
    group: "channels",
    slug: "email",
    label: "Email",
    title: "Email from your own domain",
    sub: "Verify your domain once, then send campaign email that comes from your brand, with opens, clicks and bounces tracked.",
    metaTitle: "Email campaigns from your own domain",
    metaDescription:
      "Send campaign email from your own verified domain, with open, click and bounce tracking and automatic unsubscribe handling.",
    visual: "email",
    pointsTitle: "Email, done properly",
    points: [
      { icon: "email", title: "Your own domain", body: "Verify your domain with a few DNS records, so email comes from your brand." },
      { icon: "tracking", title: "Opens, clicks and bounces", body: "See how every campaign email performs." },
      { icon: "shield", title: "Unsubscribes handled for you", body: "Every campaign email carries an unsubscribe link. Unsubscribes, hard bounces and complaints are suppressed automatically." },
      { icon: "docs", title: "Email templates", body: "Create and reuse templates for your campaigns." },
    ],
    related: ["/channels/whatsapp/", "/product/campaigns/", "/product/segments/"],
  },
  {
    group: "integrations",
    slug: "shopify",
    label: "Shopify",
    title: "Connect Shopify in one click",
    sub: "Reachfy brings in your Shopify customers and orders, so you can see who stopped buying and win them back.",
    metaTitle: "Shopify integration",
    metaDescription:
      "Connect your Shopify store to Reachfy in one click to sync customers and orders and win back customers who stopped buying.",
    visual: "shopify",
    pointsTitle: "What the Shopify integration does",
    points: [
      { icon: "shopify", title: "One-click connect", body: "Connect your store from Reachfy. No code needed." },
      { icon: "profiles", title: "Customers and orders", body: "Your customers and their orders arrive in Reachfy as profiles and purchases." },
      { icon: "segments", title: "Ready for segments", body: "Use purchase history to find who stopped buying." },
    ],
    related: ["/integrations/odoo/", "/product/profiles/", "/product/segments/"],
  },
  {
    group: "integrations",
    slug: "odoo",
    label: "Odoo",
    title: "Connect Odoo and keep it in sync",
    sub: "Reachfy syncs your Odoo customers, products and invoices, and keeps them up to date as your business runs.",
    metaTitle: "Odoo integration",
    metaDescription:
      "Connect Odoo 17 or later to Reachfy to sync customers, products and customer invoices, with live updates and read-only access to your business data.",
    visual: "odoo",
    pointsTitle: "What the Odoo integration does",
    points: [
      { icon: "odoo", title: "Odoo 17 and later", body: "A Reachfy-hosted connector for Odoo 17 and newer." },
      { icon: "profiles", title: "Customers, products and invoices", body: "Customers, your product catalogue and customer invoices sync into Reachfy." },
      { icon: "tracking", title: "Live updates", body: "Changes in Odoo reach Reachfy as they happen, through automation rules Reachfy adds to your Odoo and removes when you disconnect." },
      { icon: "lock", title: "Your business data is only read", body: "Reachfy reads your Odoo data. The only things it writes are its own automation rules." },
    ],
    related: ["/integrations/shopify/", "/product/profiles/", "/product/segments/"],
  },
];

export const pagePath = (p: Pick<ProductPageData, "group" | "slug">) => `/${p.group}/${p.slug}/`;

export function findPage(group: ProductPageData["group"], slug: string) {
  return productPages.find((p) => p.group === group && p.slug === slug);
}

export function pagesIn(group: ProductPageData["group"]) {
  return productPages.filter((p) => p.group === group);
}
