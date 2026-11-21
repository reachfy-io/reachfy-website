/*
  Copy for /security/, rendered by src/app/security/page.tsx.

  Only claims we have checked (21 Nov 2026):
  - tenancy and roles: reachfy-io CLAUDE.md ("Account is the tenant
    boundary", roles OWNER / ADMIN / MEMBER)
  - HTTPS on every connection
  The page names no vendors and no hosting location (the user asked to
  keep both out); the privacy policy has those details.
  - AI agent works from summaries with nothing that identifies a customer
    (the user's decision; also in the privacy policy, section 6)
  - email unsubscribe link and automatic suppression: current-state.md
  - API keys scoped to one project; MCP uses OAuth (reachfy-mcp)
  - deletion within 30 days: privacy policy and client-lifecycle.md
  Not claimed: database encryption at rest (database host not confirmed)
  and automatic WhatsApp opt-out (not built).
*/

export const security = {
  meta: {
    title: "Security and data protection",
    description:
      "How Reachfy protects your customer data: you own it, each business is kept separate, the AI agent never sees personal details, and data is deleted when you leave.",
  },
  label: "Security",
  title: "Your customers' data, handled with care",
  sub: "Winning customers back means trusting us with their data. Here's how Reachfy protects it, what the AI agent sees, and what stays under your control.",
  pointsTitle: "How we protect your data",
  points: [
    { icon: "profiles", title: "You own your data", body: "Your customer data belongs to you. We use it only to run Reachfy for you, and we never sell it." },
    { icon: "workspaces", title: "Each business kept separate", body: "Every business has its own account, and its data is kept apart from every other account's." },
    { icon: "agent", title: "The agent never sees personal details", body: "The AI agent works from summaries of your store data, never your customers' names, phone numbers or email addresses. Your data isn't used to train AI models." },
    { icon: "team", title: "Control who can do what", body: "Invite your team as owners, admins or members, so each person gets only the access they need." },
    { icon: "shield", title: "Encrypted connections", body: "Every connection to Reachfy, from the app, the API or the MCP server, is encrypted with HTTPS." },
    { icon: "approve", title: "Nothing sends without you", body: "Every campaign waits for your approval, so you always know who gets what, and when." },
    { icon: "whatsapp", title: "Official channels only", body: "WhatsApp goes through Meta's official platform. Every campaign email carries an unsubscribe link, and unsubscribes, bounces and complaints are suppressed automatically." },
    { icon: "api", title: "Scoped API keys", body: "Each API key works for one project only. The MCP server signs in with your Reachfy login." },
    { icon: "calendar", title: "Deleted when you leave", body: "When your account closes, we delete your customer data within 30 days." },
  ],
  policies: {
    title: "The details are in our policies",
    links: [
      { label: "Privacy policy", href: "/privacy/" },
      { label: "Terms & conditions", href: "/terms/" },
    ],
  },
  faq: {
    label: "Security FAQ",
    title: "Questions about your data",
    sub: "Have a security question?",
    contact: "Ask us",
    items: [
      {
        q: "Does the AI agent see my customers' personal data?",
        a: "No. The agent works from a summary of your store data, such as segment sizes and buying patterns. It never receives your customers' names, phone numbers, email addresses or anything else that identifies them.",
      },
      {
        q: "Who can see my customer data?",
        a: "Your team members, with the access their role allows, and the Reachfy team members who need it to run and support the service. We never sell your data or use it for advertising.",
      },
      {
        q: "What happens to my data if I cancel?",
        a: "Your plan runs until the end of the period you paid for. After your account closes, we delete your customer data within 30 days.",
      },
      {
        q: "Who is responsible for customer consent?",
        a: "You are. You need your customers' consent to send them marketing messages, as Meta's policies and data protection laws require. Reachfy helps by sending only what you approve and handling email unsubscribes automatically.",
      },
      {
        q: "How do I report a security issue?",
        a: "Email support@reachfy.io with the details. We'll look into it and get back to you.",
      },
    ],
  },
};
