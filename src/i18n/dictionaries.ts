export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const en = {
  meta: {
    title: "Reachfy: AI marketing on WhatsApp and email",
    description:
      "Reachfy's AI agent finds the right customers, writes the message in Arabic or English, and sends it on WhatsApp and email once you approve.",
  },
  nav: {
    home: "Reachfy home",
    switchLabel: "العربية",
    switchHref: "/ar/",
    demo: "Book a demo",
  },
  hero: {
    title: "Marketing that runs itself on WhatsApp and email",
    sub: "Reachfy's AI agent reads your store data, picks the right customers, writes the message in Arabic or English, and sends it the moment you approve.",
    primary: "Book a demo",
    secondary: "Watch the agent work",
    connects: "Connects to Shopify and Odoo in one click",
  },
  demo: {
    label: "Reachfy agent, live demo",
    agentName: "Reachfy agent",
    tag: "Demo",
    prompt: "Bring back customers who haven't ordered in 60 days",
    steps: [
      { title: "Read your Shopify orders", detail: "18,402 orders synced" },
      { title: "Found who stopped buying", detail: "1,240 customers, last order 60+ days ago" },
      { title: "Wrote the message", detail: "Arabic and English, with a 15% offer" },
    ],
    approveTitle: "Ready to send to 1,240 customers",
    approve: "Approve and send",
    sending: "Sending",
    sent: "Sent to 1,240 customers",
    replay: "Replay",
    phoneName: "Layla's Bakery",
    phoneStatus: "Business account",
    message:
      "We miss you, Sara! Here's 15% off your next order, valid this week only.",
    messageCta: "Order now",
    time: "10:42",
  },
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  meta: {
    title: "Reachfy: تسويق ذكي عبر واتساب والبريد الإلكتروني",
    description:
      "وكيل Reachfy الذكي يختار العملاء المناسبين، ويكتب الرسالة بالعربية أو الإنجليزية، ويرسلها عبر واتساب والبريد بعد موافقتك.",
  },
  nav: {
    home: "الصفحة الرئيسية لـ Reachfy",
    switchLabel: "English",
    switchHref: "/en/",
    demo: "احجز عرضًا تجريبيًا",
  },
  hero: {
    title: "تسويق يعمل وحده عبر واتساب والبريد الإلكتروني",
    sub: "وكيل Reachfy الذكي يقرأ بيانات متجرك، ويختار العملاء المناسبين، ويكتب الرسالة بالعربية أو الإنجليزية، ويرسلها فور موافقتك.",
    primary: "احجز عرضًا تجريبيًا",
    secondary: "شاهد الوكيل وهو يعمل",
    connects: "يتصل بـ Shopify و Odoo بنقرة واحدة",
  },
  demo: {
    label: "وكيل Reachfy، عرض مباشر",
    agentName: "وكيل Reachfy",
    tag: "تجريبي",
    prompt: "أعد العملاء الذين لم يطلبوا منذ 60 يومًا",
    steps: [
      { title: "قرأ طلبات متجرك على Shopify", detail: "تمت مزامنة 18,402 طلب" },
      { title: "وجد من توقف عن الشراء", detail: "1,240 عميلًا، آخر طلب قبل أكثر من 60 يومًا" },
      { title: "كتب الرسالة", detail: "بالعربية والإنجليزية، مع خصم 15٪" },
    ],
    approveTitle: "جاهزة للإرسال إلى 1,240 عميلًا",
    approve: "وافق وأرسل",
    sending: "جارٍ الإرسال",
    sent: "أُرسلت إلى 1,240 عميلًا",
    replay: "أعد العرض",
    phoneName: "مخبز ليلى",
    phoneStatus: "حساب أعمال",
    message: "اشتقنا لك يا سارة! خصم 15٪ على طلبك القادم، صالح هذا الأسبوع فقط.",
    messageCta: "اطلب الآن",
    time: "10:42",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
