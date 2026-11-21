/*
  Legal pages: privacy policy, terms and refund policy.

  DRAFT of 21 November 2026, rewritten for the current product (AI agent,
  WhatsApp via Meta Cloud API, email via AWS SES, Shopify/Odoo, API and MCP)
  and pricing (plans by customer count, USD, billed through Stripe).
  It has NOT had legal review. Before publishing:
  - have a lawyer review all three documents (in particular the choice
    of Delaware courts in the terms, section 18, versus arbitration).
  The previous versions (January 11, 2026) are on GitHub in reachfy-website.

  Change the wording only with legal review, and bump `updated` when you do.
  Email addresses in the text become mailto links automatically.
*/

export type LegalItem = string | { label: string; text: string };
export type LegalSection = { heading: string; body?: string[]; list?: LegalItem[]; after?: string[] };
export type LegalDoc = {
  slug: "privacy" | "terms" | "refund";
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

const COMPANY = "Reachfy, L.L.C.";
const ADDRESS = "Aadel Jaber, Amman 11163, Jordan";
const GOVERNING_LAW = "the laws of the State of Delaware, United States, without regard to its conflict-of-laws rules";
const COURTS = "the state and federal courts located in Delaware";
const UPDATED = "November 21, 2026";

export const privacy: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  description: "How Reachfy collects, uses and protects personal data, including the customer data businesses bring to Reachfy.",
  updated: UPDATED,
  sections: [
    {
      heading: "1. Who we are",
      body: [
        `Reachfy is operated by ${COMPANY}, a Delaware limited liability company ("Reachfy", "we", "our" or "us"), ${ADDRESS}. Reachfy is a platform that helps businesses win back customers who stopped buying, through WhatsApp and email campaigns and an AI agent.`,
        'This policy explains how we handle personal data when you visit reachfy.io, create a Reachfy account, or use our apps, API and MCP server (together, the "Services").',
      ],
    },
    {
      heading: "2. Two kinds of personal data",
      list: [
        {
          label: "Data about our users",
          text: "The people who sign up for and use Reachfy on behalf of a business. For this data, we decide how it is used, and we are responsible for it (we are the controller).",
        },
        {
          label: "Customer Data",
          text: 'Data about a business\'s own customers that the business brings to Reachfy, for example from Shopify, Odoo, a CSV file or our API. For Customer Data, the business decides how it is used (the business is the controller), and we process it only on the business\'s instructions to provide the Services (we are the processor).',
        },
      ],
      after: [
        "If you are a customer of a business that uses Reachfy, please see section 11.",
      ],
    },
    {
      heading: "3. Data we collect about our users",
      list: [
        { label: "Account data", text: "Name, email address, company name, and the roles and permissions of your team members." },
        { label: "Billing data", text: "Your plan, invoices and billing contact. Card payments are handled by Stripe; we don't receive or store full card numbers." },
        { label: "Connected accounts", text: "Details of the accounts you connect, such as your WhatsApp Business account and phone number, your email sending domain, and your Shopify or Odoo store." },
        { label: "Usage and technical data", text: "How you use the Services, logs, IP address, browser and device information." },
        { label: "Communications", text: "Messages you send us, for example support requests." },
      ],
    },
    {
      heading: "4. Customer Data we process for businesses",
      body: ["Depending on what a business connects or uploads, Customer Data can include:"],
      list: [
        "Contact details, such as name, phone number, email address and country",
        "Purchases, invoices, products and other events, with their dates and details",
        "Custom attributes the business chooses to store",
        "Segments the customer belongs to",
        "Messages sent through Reachfy, with their delivery status, and email opens, clicks, bounces and unsubscribes",
      ],
      after: [
        "Businesses must not upload special categories of data (such as health, religious or biometric data) or data about children.",
      ],
    },
    {
      heading: "5. How we use personal data",
      list: [
        "To provide and operate the Services, including syncing data, building segments, and sending the campaigns a business approves",
        "To run the AI agent for a business (see section 6)",
        "To bill for the Services and manage accounts",
        "To provide support and send service, security and billing notices",
        "To keep the Services secure and prevent fraud, spam and abuse",
        "To improve the Services, using usage data about our users",
        "To comply with the law",
      ],
      after: [
        "We process data to perform our contract with the business, for our legitimate interests in running and securing the Services, with consent where the law requires it, and to meet legal obligations. We use Customer Data only to provide the Services to the business it belongs to. We do not sell personal data, and we do not use Customer Data for advertising.",
      ],
    },
    {
      heading: "6. The AI agent",
      body: [
        "Reachfy's AI agent answers a business's questions, suggests campaigns and drafts messages. It does not receive Customer Data. Instead, Reachfy prepares a summary of the business's store data, such as segment sizes and buying patterns, with no names, phone numbers, email addresses or other details that identify or relate to an individual customer. Only that summary, and what the business's team writes to the agent, is sent to the AI model provider that runs the agent on our behalf.",
        "The agent's suggestions and drafts are reviewed by the business: nothing is sent to a customer until the business approves it. We do not use the business's data to train AI models, and our AI model providers are not permitted to use it to train theirs.",
      ],
    },
    {
      heading: "7. Service providers",
      body: ["We share personal data only with service providers that help us run the Services, under contracts that require them to protect it:"],
      list: [
        { label: "Amazon Web Services", text: "Hosting and data storage, and sending email (Amazon SES)" },
        { label: "Meta", text: "Sending WhatsApp messages through the WhatsApp Business Platform, from the business's own WhatsApp Business account" },
        { label: "Auth0 (Okta)", text: "Sign-in and account security" },
        { label: "Stripe", text: "Payments and billing" },
        { label: "AI model provider", text: "Running the AI agent, using summaries that don't identify customers (section 6)" },
        { label: "Cloudflare", text: "Serving reachfy.io and counting visits to it, without cookies" },
      ],
      after: [
        "When a business connects Shopify or Odoo, we read data from those services on the business's instructions. A current list of our service providers is available on request. We may also disclose data if the law requires it, or as part of a merger or sale of our business, under the same protections.",
      ],
    },
    {
      heading: "8. Where data is stored",
      body: [
        "We store Customer Data and account data with Amazon Web Services in London, United Kingdom. Some service providers, such as Meta, Auth0, Stripe and our AI model provider, may process data in other countries, including the United States. Where data leaves the country it came from, we rely on contractual safeguards with those providers and on the transfer rules of the applicable data protection laws.",
      ],
    },
    {
      heading: "9. How long we keep data",
      list: [
        { label: "Customer Data", text: "For as long as the business's account is active. We delete it within 30 days after the account is closed, or sooner if the business asks." },
        { label: "Account and usage data", text: "For as long as the account is active, then for as long as needed to resolve disputes and enforce our agreements." },
        { label: "Billing records", text: "For as long as tax and accounting laws require." },
      ],
    },
    {
      heading: "10. Security",
      body: [
        "We protect personal data with technical and organisational measures, including encryption in transit, access controls, and limiting access to the people who need it to run the Services. No system is completely secure, so we can't guarantee absolute security. If a breach affects Customer Data, we will tell the affected business without undue delay.",
      ],
    },
    {
      heading: "11. If you are a customer of a business that uses Reachfy",
      body: [
        "If you received a WhatsApp message or email from a business through Reachfy, that business holds your data and decides how it's used. To access, correct or delete your data, or to stop receiving messages, contact that business directly. You can also use the unsubscribe link in any email sent through Reachfy. If you contact us, we'll pass your request to the business and help it respond.",
      ],
    },
    {
      heading: "12. Your rights",
      body: ["Depending on where you live, you may have the right to:"],
      list: [
        "Access the personal data we hold about you",
        "Correct inaccurate data",
        "Delete your data",
        "Restrict or object to how we use it",
        "Receive a copy of your data in a portable format",
        "Withdraw consent, where we rely on consent",
        "Complain to your data protection authority",
      ],
      after: [
        "To use these rights, email privacy@reachfy.io. We reply within 30 days. We may need to confirm your identity first.",
      ],
    },
    {
      heading: "13. Cookies",
      body: [
        "Our website, reachfy.io, does not use cookies. We count visits with Cloudflare Web Analytics, which doesn't use cookies or track you across sites. The Reachfy app uses only the cookies needed to sign you in and keep your session secure. Our hosting providers keep standard server logs, such as IP addresses, for security.",
      ],
    },
    {
      heading: "14. Children",
      body: ["The Services are for businesses and are not directed at anyone under 18."],
    },
    {
      heading: "15. Changes to this policy",
      body: [
        'We may update this policy. We will post changes on this page with a new "Last updated" date, and tell account owners by email about significant changes.',
      ],
    },
    {
      heading: "16. Contact us",
      body: [`For questions about this policy or your data, email privacy@reachfy.io or write to ${COMPANY}, ${ADDRESS}.`],
    },
  ],
};

export const terms: LegalDoc = {
  slug: "terms",
  title: "Terms & Conditions",
  description: "The terms that govern your business's use of Reachfy.",
  updated: UPDATED,
  sections: [
    {
      heading: "1. About these terms",
      body: [
        `These Terms are an agreement between ${COMPANY}, a Delaware limited liability company ("Reachfy", "we", "our" or "us"), ${ADDRESS}, and the business that creates a Reachfy account ("you"). They cover reachfy.io, the Reachfy app, the API and the MCP server (the "Services").`,
        "The Services are for businesses only. By creating an account or using the Services, you confirm that you are authorised to accept these Terms for your business. Our Privacy Policy and Refund Policy form part of these Terms. If you have a separate signed agreement with us, such as an Enterprise order form, it takes priority where it differs.",
      ],
    },
    {
      heading: "2. The Services",
      body: [
        "Reachfy helps businesses win back customers who stopped buying. The Services include customer profiles, segments, scheduled and event-based campaigns on WhatsApp and email, an AI agent, integrations such as Shopify and Odoo, an API and an MCP server. We may improve and change the Services over time. If we remove a core feature you pay for, we will tell you in advance.",
      ],
    },
    {
      heading: "3. Your account and team",
      list: [
        "Keep your login details secure, and tell us right away about any unauthorised access",
        "You are responsible for everything done under your account, including by team members you invite",
        "Keep your account information accurate and up to date",
      ],
    },
    {
      heading: "4. Plans, billing and taxes",
      list: [
        { label: "Plans", text: "Plans are priced by the number of customer profiles in your Reachfy workspace, whatever their status, as shown on our pricing page. Every plan includes every feature, and campaign email is included subject to fair use. Enterprise plans are quoted separately." },
        { label: "Free trial", text: "New accounts may start with a free trial. Its length is shown when you sign up. You won't be charged unless you choose a paid plan." },
        { label: "Billing", text: "Fees are in US dollars and billed in advance, monthly or yearly, through Stripe. Plans renew automatically at the end of each billing period until you cancel." },
        { label: "Taxes", text: "Fees don't include taxes. You pay any taxes that apply, except taxes on our income." },
        { label: "Your plan's limit", text: "When you reach your plan's customer limit, you can't add more customers until you move to a bigger plan or remove customers. We never change your plan without your action." },
        { label: "Price changes", text: "We may change our prices. We'll tell you at least 30 days in advance, and new prices apply from your next billing period." },
        { label: "Late payment", text: "If a payment fails and isn't fixed after we notify you, we may suspend the Services until it is paid." },
      ],
      after: ["Refunds are covered by our Refund Policy."],
    },
    {
      heading: "5. WhatsApp, email and other third-party services",
      body: [
        "To send WhatsApp messages, you connect your own WhatsApp Business account. Meta charges you directly for WhatsApp messages; these charges are not part of our fees. You must follow Meta's WhatsApp Business terms and policies, including its rules on opt-in and message templates. Meta, not Reachfy, decides on template approvals, quality ratings, messaging limits and account restrictions, and we are not responsible for those decisions.",
        "To send email, you verify a domain you control. When you connect a store or business system, such as Shopify or Odoo, you authorise us to read data from it to provide the Services. For Odoo, you also authorise us to add the automation rules needed for live updates; we remove them when you disconnect. Your use of third-party services is governed by their own terms.",
      ],
    },
    {
      heading: "6. Your customer data",
      body: [
        'You keep all rights to the data you bring to Reachfy about your customers ("Customer Data"). You give us permission to process it only to provide the Services to you, as described in our Privacy Policy. For Customer Data, you are the controller and we are your processor. A data processing agreement is available on request.',
        "You are responsible for your Customer Data and for the messages you send. In particular, you confirm that:",
      ],
      list: [
        "You have the right to give us the Customer Data, and a lawful basis to process it",
        "You have the consent required by law and by Meta's policies to send marketing messages to each customer you message",
        "You honour every opt-out request, including replies your customers send on WhatsApp",
        "You don't upload special categories of data (such as health or religious data) or data about children",
      ],
    },
    {
      heading: "7. The AI agent",
      body: [
        "The AI agent suggests campaigns and drafts messages from a summary of your store data that doesn't identify individual customers, as described in our Privacy Policy. AI output can be inaccurate or incomplete. Nothing the agent prepares is sent to a customer until you approve it, and you are responsible for checking every message, offer and audience before you approve it.",
      ],
    },
    {
      heading: "8. Acceptable use",
      body: ["You must not use the Services to:"],
      list: [
        "Send spam, or messages to people you don't have the right to contact",
        "Send misleading, deceptive, harmful or illegal content, or make offers you won't honour",
        "Break any law, including data protection, consumer protection and anti-spam laws",
        "Infringe anyone's intellectual property or privacy",
        "Transmit malware, or try to bypass security or access systems you aren't authorised to use",
        "Overload or disrupt the Services, or use them beyond reasonable rate limits",
        "Resell the Services, or use them to build a competing product, without our written agreement",
      ],
    },
    {
      heading: "9. API and MCP server",
      body: [
        "Keep your API keys and connected tokens secret. You are responsible for everything done with them. We may set rate limits and may revoke keys that are misused.",
      ],
    },
    {
      heading: "10. Intellectual property",
      body: [
        "We and our licensors own the Services, including the software, design and content we provide. You may not copy, modify, distribute or reverse engineer them except as the law allows. If you send us feedback, we may use it without any obligation to you.",
      ],
    },
    {
      heading: "11. Confidentiality",
      body: [
        "Each of us will keep the other's non-public information confidential, and use it only for the purposes of these Terms.",
      ],
    },
    {
      heading: "12. Availability and message delivery",
      body: [
        "We work to keep the Services available but don't guarantee they will be uninterrupted. We may carry out maintenance, and suspend the Services where needed for security. Message delivery depends on third parties such as Meta, email providers and mobile networks, and on the accuracy of your data, so we don't guarantee that messages will be delivered, read or acted on, or any particular sales result.",
      ],
    },
    {
      heading: "13. Disclaimer",
      body: [
        'Except as these Terms expressly say, the Services are provided "as is" and "as available", without warranties of any kind, to the extent the law allows.',
      ],
    },
    {
      heading: "14. Limitation of liability",
      body: [
        "To the extent the law allows, neither of us is liable for indirect, incidental, special or consequential damages, or for loss of profits, revenue, data or business opportunities. Our total liability for all claims relating to the Services is limited to the fees you paid us in the 12 months before the event giving rise to the claim. These limits don't apply to liability that can't be limited by law, or to your payment obligations and your obligations under section 15.",
      ],
    },
    {
      heading: "15. Indemnity",
      body: [
        "You will defend and compensate us against claims by third parties arising from your Customer Data, the messages you send, or your breach of these Terms or the law.",
      ],
    },
    {
      heading: "16. Cancellation and termination",
      body: [
        "You can cancel at any time in the app or by emailing support@reachfy.io. Your plan stays active until the end of the period you've paid for, then doesn't renew.",
        "We may suspend or end your access if you seriously or repeatedly break these Terms, if you don't pay, or if the law requires it. Where reasonable, we'll warn you first.",
        "When your account closes, we delete your Customer Data within 30 days, as described in our Privacy Policy. Sections that by their nature should continue, such as payment, liability, indemnity and governing law, survive termination.",
      ],
    },
    {
      heading: "17. Changes to these terms",
      body: [
        "We may update these Terms. We'll tell you about material changes by email or in the app at least 30 days before they take effect. If you keep using the Services after that, the new Terms apply. If you don't agree, you can cancel before they take effect.",
      ],
    },
    {
      heading: "18. Governing law and disputes",
      body: [
        `These Terms are governed by ${GOVERNING_LAW}. Any dispute will be settled by ${COURTS}, unless the law requires otherwise. Before starting any proceedings, we'll both try in good faith to settle the dispute by talking to each other.`,
      ],
    },
    {
      heading: "19. Contact us",
      body: [`For questions about these Terms, email legal@reachfy.io or write to ${COMPANY}, ${ADDRESS}.`],
    },
  ],
};

export const refund: LegalDoc = {
  slug: "refund",
  title: "Refund Policy",
  description: "When Reachfy refunds payments for its plans, and how to ask for a refund.",
  updated: UPDATED,
  sections: [
    {
      heading: "1. Overview",
      body: [
        `This policy explains when ${COMPANY} ("Reachfy", "we") refunds payments for Reachfy plans. It forms part of our Terms & Conditions. Payments are processed by Stripe, and plans are billed in advance, monthly or yearly.`,
      ],
    },
    {
      heading: "2. Free trial",
      body: [
        "You can start with a free trial, without a credit card. You are only charged if you choose a paid plan, so there's nothing to refund for the trial itself.",
      ],
    },
    {
      heading: "3. Monthly plans",
      body: [
        "You can cancel a monthly plan at any time. It stays active until the end of the month you've paid for, then doesn't renew. We don't refund partial months.",
      ],
    },
    {
      heading: "4. Yearly plans",
      body: [
        "Yearly plans are paid in advance at a discount (12 months for the price of 10). You can cancel at any time: your plan stays active until the end of the paid year, then doesn't renew. We don't refund unused months.",
      ],
    },
    {
      heading: "5. Changing plans",
      body: [
        "When you move to a larger plan, the new price applies from your next billing date. When you move to a smaller plan, the change takes effect at your next billing date. Plan changes don't create refunds for the current period.",
      ],
    },
    {
      heading: "6. When we do refund",
      list: [
        { label: "Billing mistakes", text: "If you were charged twice or charged the wrong amount, we refund the difference in full. Please tell us within 30 days of the charge." },
        { label: "If we end the Services", text: "If we close your account without you breaking our Terms, or stop offering the Services, we refund the unused part of any period you've paid for." },
      ],
    },
    {
      heading: "7. WhatsApp message fees",
      body: [
        "WhatsApp message fees are charged to you directly by Meta, not by Reachfy, so we can't refund them. Contact Meta about those charges.",
      ],
    },
    {
      heading: "8. How to ask for a refund",
      body: [
        "Email support@reachfy.io from your account email, with the invoice number and the reason. We reply within 2 working days. Approved refunds go back to the original payment method; your bank may take 5 to 10 business days to show them.",
      ],
    },
    {
      heading: "9. Chargebacks",
      body: [
        "Please contact us before disputing a charge with your bank; most problems are quicker to fix directly. If a chargeback is opened, we may suspend the account until it is resolved.",
      ],
    },
    {
      heading: "10. Your legal rights",
      body: ["This policy doesn't affect any rights you have under laws that can't be excluded by agreement."],
    },
  ],
};
