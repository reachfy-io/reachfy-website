import type { Metadata } from "next";
import { content } from "@/content";

/*
  One place for everything search engines and link previews read.
  Every page builds its metadata with pageMetadata() so canonical,
  Open Graph and Twitter tags never drift apart.
*/

export const SITE_URL = "https://reachfy.io";
export const SITE_NAME = "Reachfy";
export const SUPPORT_EMAIL = "support@reachfy.io";

/** "/" + path, always with a trailing slash (matches trailingSlash: true) */
export function sitePath(path = "/"): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${clean}/` : "/";
}

export function pageMetadata({
  path = "/",
  title,
  description,
}: {
  /** e.g. "/" or "/pricing" */
  path?: string;
  /** pass an absolute title for the home page, plain for inner pages (template adds the brand) */
  title: string | { absolute: string };
  description: string;
}): Metadata {
  const url = sitePath(path);
  const ogTitle = typeof title === "string" ? `${title} | ${SITE_NAME}` : title.absolute;
  const image = { url: "/og.png", width: 1200, height: 630, alt: content.meta.ogAlt };

  return {
    title,
    description,
    // set per page (not in the layout) so the 404 page only gets Next's noindex
    robots: { index: true, follow: true, "max-image-preview": "large" },
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url,
      title: ogTitle,
      description,
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
    },
  };
}

/** Schema.org graph for the home page: who we are, and the site itself */
export function homeJsonLd() {
  const { meta, hero } = content;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png`, width: 512, height: 512 },
        slogan: hero.title,
        sameAs: content.footer.social.map((s) => s.href),
        description: meta.description,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: SUPPORT_EMAIL,
          availableLanguage: ["English", "Arabic"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: meta.title,
        description: meta.description,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: `${SITE_URL}/og.png`,
      },
      faqJsonLd(content.faq.items, "/#faq"),
    ],
  };
}

/** FAQPage node for a list of questions shown on the page (id like "/#faq") */
export function faqJsonLd(items: readonly { q: string; a: string }[], id: string) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${id}`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
