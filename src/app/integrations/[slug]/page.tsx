import { notFound } from "next/navigation";
import { ProductPage } from "@/components/ProductPage";
import { pageMetadata } from "@/lib/seo";
import { findPage, pagesIn } from "@/productPages";

export const dynamicParams = false;

export function generateStaticParams() {
  return pagesIn("integrations").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/integrations/[slug]">) {
  const { slug } = await params;
  const page = findPage("integrations", slug);
  if (!page) return {};
  return pageMetadata({ path: `/integrations/${slug}`, title: page.metaTitle, description: page.metaDescription });
}

export default async function Page({ params }: PageProps<"/integrations/[slug]">) {
  const { slug } = await params;
  const page = findPage("integrations", slug);
  if (!page) notFound();
  return <ProductPage page={page} />;
}
