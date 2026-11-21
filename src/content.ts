// Every word on the site. Edit copy here.

export const content = {
  meta: {
    title: "Reachfy: We bring your customers back",
    description:
      "Win back customers who stopped buying. Reachfy's AI agent writes the message in Arabic or English and sends it on WhatsApp and email once you approve.",
    ogAlt: "Reachfy: We bring your customers back, with an AI agent for WhatsApp and email",
  },
  notFound: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has moved.",
    cta: "Back to home",
  },
  // The one call to action, used in the nav and the hero
  cta: {
    label: "Get started for free",
    note: "No credit card needed",
    href: "https://app.reachfy.io",
  },
  nav: {
    home: "Reachfy home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    // Top-level items. An item has either an href (plain link) or a menu.
    items: [
      {
        label: "Product",
        menu: {
          groups: [
            {
              title: "Win back customers",
              links: [
                { icon: "agent", label: "AI agent", description: "Finds who stopped buying and writes the message", href: "/product/agent/" },
                { icon: "segments", label: "Segments", description: "Group customers by what they buy and when", href: "/product/segments/" },
                { icon: "campaigns", label: "Campaigns", description: "Scheduled and event-triggered sends", href: "/product/campaigns/" },
                { icon: "profiles", label: "Customer profiles", description: "Every order, event and message in one place", href: "/product/profiles/" },
              ],
            },
            {
              title: "Channels",
              links: [
                { icon: "whatsapp", label: "WhatsApp", description: "Approved templates on the Meta Cloud API", href: "/channels/whatsapp/" },
                { icon: "email", label: "Email", description: "Send from your own domain", href: "/channels/email/" },
              ],
            },
            {
              title: "Integrations",
              links: [
                { icon: "shopify", label: "Shopify", description: "Orders and customers, synced", href: "/integrations/shopify/" },
                { icon: "odoo", label: "Odoo", description: "Connect your ERP in one click", href: "/integrations/odoo/" },
              ],
            },
          ],
          feature: {
            title: "From store data to returning customers",
            body: "Four steps, with the agent helping at each one.",
            cta: "See how it works",
            href: "/#how-it-works",
          },
        },
      },
      {
        label: "Developers",
        menu: {
          groups: [
            {
              title: "Build on Reachfy",
              links: [
                { icon: "docs", label: "Docs", description: "Guides to set up and get results", href: "/docs/" },
                { icon: "api", label: "API", description: "Send events, sync customers, trigger campaigns", href: "/docs/api/" },
                { icon: "mcp", label: "MCP server", description: "Use Reachfy from Claude, ChatGPT and other AI tools", href: "/mcp/" },
              ],
            },
          ],
        },
      },
      { label: "Pricing", href: "/pricing/" },
    ],
  },
  hero: {
    title: "We bring your customers back",
    sub: "Reachfy's AI agent reads your store data, picks the right customers, writes the message in Arabic or English, and sends it the moment you approve.",
    secondary: "See how it works",
    connects: "Connects to Shopify and Odoo in one click",
  },
  how: {
    label: "How it works",
    title: "Four steps to bring customers back",
    sub: "You connect your store once. The agent does the work at every step, and nothing goes out without your approval.",
    agentLabel: "How the agent helps",
    tag: "Demo",
    steps: [
      {
        title: "Connect your store and channels",
        body: "Connect Shopify, Odoo or your POS in one click, then your WhatsApp Business number and email domain. Reachfy imports your order history and builds a profile for every customer.",
        agent: "Reads every order and fills in each profile: what they buy, how often, and when they last ordered.",
      },
      {
        title: "Segment by history",
        body: "Group customers by what they bought, how often they buy, and how long it's been since their last order.",
        agent: "Spots the groups worth winning back, like regulars who suddenly stopped buying.",
      },
      {
        title: "Target with campaigns",
        body: "Pick a segment and a goal, then send on WhatsApp or email, once or every time something happens.",
        agent: "Writes the message in Arabic or English, picks the send time, and waits for your approval.",
      },
      {
        title: "See what came back",
        body: "Track who came back, what they ordered, and how much revenue each campaign recovered.",
        agent: "Explains what worked, like which message or send time brought the most customers back, so each campaign beats the last.",
      },
    ],
    // Captions for the pinned dot field (each dot is a customer), one per state:
    // before step 1, then after each step
    field: {
      label: "Your customers, as Reachfy sees them",
      captions: [
        "Your customer data today: scattered across orders and tools",
        "Every customer, one profile",
        "Grouped by what they buy and when",
        "A campaign for the group that stopped buying",
        "186 customers came back",
      ],
    },
    // Words inside the product mockups (illustrative numbers, shown under a "Demo" tag)
    visuals: {
      connect: {
        title: "Store",
        sources: [
          { name: "Shopify", icon: "shopify", status: "Connected" },
          { name: "Odoo", icon: "odoo", status: "Connected" },
          { name: "Point of sale", icon: "pos", status: "Connect" },
        ],
        imported: "18,402 orders imported",
        channelsTitle: "Channels",
        channels: [
          { name: "WhatsApp Business", icon: "whatsapp", status: "Connected", detail: "3 templates approved" },
          { name: "Email", icon: "email", status: "Verified", detail: "mail.laylasbakery.com" },
        ],
        profileTitle: "Customer profile",
        profileName: "Sara A.",
        profileMeta: "Customer since 2023",
        profileStats: [
          { label: "Orders", value: "12" },
          { label: "Last order", value: "74 days ago" },
          { label: "Favorite", value: "Sourdough" },
        ],
      },
      segments: {
        title: "Segments",
        suggested: "Suggested",
        rows: [
          { name: "Lapsed regulars", detail: "5+ orders, none in 60 days", count: "1,240", share: 0.36, suggested: true },
          { name: "Weekend buyers", detail: "Usually order Friday or Saturday", count: "2,280", share: 0.66, suggested: false },
          { name: "VIPs", detail: "10+ orders", count: "412", share: 0.12, suggested: false },
          { name: "One-time buyers", detail: "1 order, 30+ days ago", count: "3,105", share: 0.9, suggested: false },
        ],
      },
      campaign: {
        title: "Win back lapsed regulars",
        fields: [
          { label: "Audience", value: "Lapsed regulars · 1,240" },
          { label: "Channels", value: "WhatsApp and email" },
          { label: "Send", value: "Tuesday, 7:00 pm", note: "Best time, picked by the agent" },
        ],
        languages: ["English", "العربية"],
        approve: "Approve and send",
      },
      report: {
        title: "Campaign results",
        range: "Nov 10 – 16",
        stats: [
          { label: "Customers back", value: "186" },
          { label: "Revenue recovered", value: "$9,420" },
          { label: "Reply rate", value: "31%" },
        ],
        chartLabel: "Returning customers by day",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        bars: [18, 22, 25, 20, 41, 38, 22],
        insightLabel: "What worked",
        insight: "Messages in Arabic with a one-week offer brought back twice as many customers as the rest.",
      },
    },
  },
  modes: {
    label: "The agent",
    title: "Two ways to work with the agent",
    sub: "Ask it for ideas whenever you like, or let it study your store every week and come back with campaigns ready to approve.",
    tag: "Demo",
    items: [
      {
        icon: "chat",
        name: "Brainstorm",
        title: "Ask for ideas, anytime",
        body: "Chat with the agent about your customers. It answers from your real store data and turns the best ideas into campaigns.",
        points: [
          "Answers from your own orders and customers",
          "Turns an idea into a ready-to-send campaign",
          "Ask in Arabic or English",
        ],
      },
      {
        icon: "calendar",
        name: "Weekly suggestions",
        title: "Fresh campaigns every week",
        body: "Every week the agent reads your new orders in the background, analyzes what changed, and suggests the campaigns worth running.",
        points: [
          "Runs on its own, no prompts needed",
          "Catches customers who are slipping away",
          "Nothing sends until you approve",
        ],
      },
    ],
    // Words inside the two mockups (illustrative numbers, shown under a "Demo" tag)
    chat: {
      question: "Who should I win back this month?",
      answer:
        "412 customers ordered every month last year but haven't ordered in 45 days. Most of them buy cakes on weekends.",
      ideaLabel: "Campaign idea",
      idea: "Weekend cake offer",
      ideaMeta: "412 customers · WhatsApp",
      ideaAction: "Create campaign",
      placeholder: "Ask about your customers…",
    },
    weekly: {
      title: "This week's suggestions",
      when: "Monday, 9:00 am",
      rows: [
        { name: "Win back lapsed regulars", meta: "1,240 customers · WhatsApp" },
        { name: "Thank your VIPs", meta: "412 customers · Email" },
        { name: "Nudge for a second order", meta: "3,105 customers · WhatsApp" },
      ],
      review: "Review",
      footer: "Nothing sends until you approve",
    },
  },
  calculator: {
    label: "Calculator",
    title: "How much are your lapsed customers worth?",
    sub: "Put in your own numbers to see the revenue sitting in customers who stopped buying.",
    privacy: "Runs in your browser. Nothing you enter is stored or sent.",
    currencyLabel: "Currency",
    currencies: ["USD", "SAR", "AED", "EGP", "JOD", "KWD", "QAR"],
    fields: {
      customers: { label: "Customers in your store" },
      lapsed: { label: "Share who stopped buying", help: "Customers with no order in the last few months" },
      aov: { label: "Average order value" },
      winback: { label: "How many come back", help: "Start low: 5% is a careful guess" },
    },
    result: {
      headline: "Revenue you could win back",
      suffix: "if they each order once more",
      lapsed: "Customers who stopped buying",
      returning: "Customers who come back",
      ceiling: "If every one of them came back",
      note: "An estimate from your numbers, not a promise. Results depend on your customers, your offer and your timing.",
    },
  },
  why: {
    label: "Why Reachfy",
    title: "Built for how stores in the region sell",
    sub: "Your customers are on WhatsApp, read Arabic and English, and buy from stores running Shopify or Odoo. Reachfy is built around that.",
    // Reasons are about Reachfy only: no claims about named competitors.
    items: [
      {
        icon: "whatsapp",
        visual: "whatsapp",
        title: "WhatsApp first",
        body: "WhatsApp is where your customers already talk to you. Reachfy makes it the main channel, with email alongside it.",
      },
      {
        icon: "chat",
        visual: "languages",
        title: "Written in Arabic or English",
        body: "The agent writes each message in Arabic or English, and you check every word before it goes out.",
      },
      {
        icon: "shopify",
        visual: "store",
        title: "Your store, connected in one click",
        body: "Shopify and Odoo connect in one click, so your order history is ready to use from day one.",
      },
      {
        icon: "agent",
        visual: "agent",
        title: "An agent, not another dashboard",
        body: "Instead of building lists and writing campaigns yourself, the agent spots who to win back and drafts the campaign for you to approve.",
      },
    ],
    visuals: {
      arabicMessage: "اشتقنا لك يا سارة! خصم 15٪ على طلبك القادم، صالح هذا الأسبوع فقط.",
      arabicCta: "اطلب الآن",
      connected: "Connected",
      agentNote: "1,240 regulars haven't ordered in 60 days. Want me to draft a win-back campaign?",
      agentAction: "Draft it",
    },
    start: {
      title: "Start free, no sales call",
      body: "Sign up and connect your store yourself, in minutes.",
    },
  },
  features: {
    label: "Features",
    title: "Everything you need to win customers back",
    sub: "The agent runs on a full marketing platform, so you can also build and send campaigns yourself.",
    // From the confirmed feature list. Keep claims general where details aren't confirmed.
    items: [
      { icon: "profiles", title: "Customer profiles and events", body: "Every order and event for each customer, in one place." },
      { icon: "segments", title: "Segments", body: "Group customers by what they buy, how often, and when they last ordered." },
      { icon: "campaigns", title: "Scheduled and triggered campaigns", body: "Send once at the right time, or every time a customer does something." },
      { icon: "whatsapp", title: "WhatsApp templates", body: "Manage your Meta-approved message templates in one place." },
      { icon: "email", title: "Your own email domain", body: "Send email from your own verified domain." },
      { icon: "tracking", title: "Message tracking", body: "Follow every message you send, for every customer." },
      { icon: "team", title: "Team seats and permissions", body: "Invite your team and choose what each person can do." },
      { icon: "workspaces", title: "Multiple workspaces", body: "Keep each store or brand in its own workspace." },
      { icon: "api", title: "API and MCP server", body: "Connect your own systems with the API, or use Reachfy from AI tools like Claude and ChatGPT." },
    ],
  },
  control: {
    label: "Control",
    title: "You stay in control",
    sub: "The agent does the work. You make the call on everything that reaches your customers.",
    tag: "Demo",
    approve: {
      title: "You approve every send",
      body: "The agent prepares the campaign: who gets it, what it says and when it goes. Nothing reaches a customer until you approve it.",
      mock: {
        status: "Waiting for your approval",
        campaign: "Win back lapsed regulars",
        meta: "1,240 customers · WhatsApp",
        approve: "Approve and send",
        decline: "Not now",
      },
    },
    // Smaller cards. Only claims the product or our policies back today.
    cards: [
      {
        icon: "team",
        title: "Your team, your rules",
        body: "Invite your team and choose what each person can do.",
      },
      {
        icon: "shield",
        title: "Official channels only",
        body: "WhatsApp messages go through Meta's official platform with approved templates. Email goes from your own verified domain.",
      },
      {
        icon: "lock",
        title: "Your data stays yours",
        // matches the privacy policy: "We do not sell your personal data"
        body: "We don't sell your personal data, and we protect it with industry-standard security.",
        link: { label: "How we protect it", href: "/privacy/" },
      },
    ],
  },
  integrations: {
    label: "Integrations",
    title: "Works with the tools you already use",
    sub: "Bring your store data in, and reach customers on the channels they already use.",
    inputsTitle: "Your store",
    outputsTitle: "Your channels",
    inputs: [
      { icon: "shopify", name: "Shopify", detail: "Connect in one click" },
      { icon: "odoo", name: "Odoo", detail: "Connect in one click" },
      { icon: "api", name: "Any system", detail: "Customers and events via the API" },
    ],
    hub: { name: "Reachfy", detail: "Profiles, segments and the agent" },
    outputs: [
      { icon: "whatsapp", name: "WhatsApp", detail: "Official Business Platform" },
      { icon: "email", name: "Email", detail: "From your own domain" },
    ],
    dev: {
      title: "Build on Reachfy",
      body: "Use the API to sync customers, send events and trigger campaigns from your own systems.",
      link: { label: "Read the API docs", href: "/docs/api/" },
      mcp: {
        name: "MCP server",
        detail: "Use Reachfy from Claude, ChatGPT and other AI tools.",
        link: { label: "Connect your AI tools", href: "/mcp/" },
      },
    },
  },
  faq: {
    label: "FAQ",
    title: "Questions, answered",
    sub: "Can't find what you're looking for?",
    contact: "Ask us",
    // Answers only state what the product does today. Keep them honest.
    items: [
      {
        q: "Does Reachfy ever send messages without my approval?",
        a: "No. The agent finds the customers and writes the message, but nothing goes out until you approve it.",
      },
      {
        q: "Which stores does Reachfy work with?",
        a: "Reachfy connects to Shopify and Odoo in one click. You can also send customers and events from any system through the API.",
      },
      {
        q: "Do I need a WhatsApp Business account?",
        a: "Yes. Reachfy sends through the official WhatsApp Business Platform (Meta Cloud API), so you connect your WhatsApp Business number. Marketing messages use templates approved by Meta, which you manage inside Reachfy.",
      },
      {
        q: "Can the agent write in Arabic?",
        a: "Yes. The agent writes messages in Arabic or English, and you review every message before it's sent.",
      },
      {
        q: "Can I send email as well as WhatsApp?",
        a: "Yes. You can run campaigns on WhatsApp and email, and send email from your own domain.",
      },
      {
        q: "Do I need a developer to set it up?",
        a: "No. Connecting Shopify or Odoo takes one click. Developers can go further with the API.",
      },
      {
        q: "How much does Reachfy cost?",
        a: "Plans start at $69 a month and are priced by the number of customers you have. Every plan includes every feature, and you pay Meta directly for WhatsApp messages, with no markup from us.",
        link: { label: "See pricing", href: "/pricing/" },
      },
      {
        q: "Is my customer data safe?",
        a: "We don't sell your personal data, and we protect it with industry-standard security measures.",
        link: { label: "Read our privacy policy", href: "/privacy/" },
      },
    ],
  },
  finalCta: {
    title: "Start bringing your customers back",
    sub: "Connect your store in one click. The agent finds who to win back first, and you approve every message.",
  },
  footer: {
    tagline: "We bring your customers back.",
    email: "support@reachfy.io",
    columns: {
      company: {
        title: "Company",
        links: [
          { label: "Pricing", href: "/pricing/" },
          { label: "Contact", href: "mailto:support@reachfy.io" },
          { label: "Sign in", href: "https://app.reachfy.io" },
        ],
      },
      legal: {
        title: "Legal",
        links: [
          { label: "Privacy policy", href: "/privacy/" },
          { label: "Terms & conditions", href: "/terms/" },
          { label: "Refund policy", href: "/refund/" },
        ],
      },
    },
    social: [
      { label: "Reachfy on LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/reachfy-io" },
      { label: "Reachfy on GitHub", icon: "github", href: "https://github.com/reachfy-io" },
    ],
    copyright: "© 2026 Reachfy. All rights reserved.",
    legalUpdated: "Last updated",
  },
  // A sample win-back message, used in mockups and the share image
  sample: {
    business: "Layla's Bakery",
    message: "We miss you, Sara! Here's 15% off your next order, valid this week only.",
    cta: "Order now",
    time: "10:42",
  },
};

export type Content = typeof content;
