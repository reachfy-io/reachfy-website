import type { MetadataRoute } from "next";
import { SITE_URL, sitePath } from "@/lib/seo";
import { pagePath, productPages } from "@/productPages";

export const dynamic = "force-static";

type Page = { path: string; priority: number; changeFrequency: "weekly" | "yearly" };

// Every public page. Add new pages here.
const pages: Page[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "weekly" },
  ...productPages.map((p) => ({ path: pagePath(p), priority: 0.7, changeFrequency: "weekly" as const })),
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refund", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${sitePath(path)}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
