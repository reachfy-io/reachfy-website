import { notFound } from "next/navigation";
import { ProductPage } from "@/components/ProductPage";
import { pageMetadata } from "@/lib/seo";
import { findPage, pagesIn } from "@/productPages";

export const dynamicParams = false;

export function generateStaticParams() {
  return pagesIn("channels").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/channels/[slug]">) {
  const { slug } = await params;
  const page = findPage("channels", slug);
  if (!page) return {};
  return pageMetadata({ path: `/channels/${slug}`, title: page.metaTitle, description: page.metaDescription });
}

export default async function Page({ params }: PageProps<"/channels/[slug]">) {
  const { slug } = await params;
  const page = findPage("channels", slug);
  if (!page) notFound();
  return <ProductPage page={page} />;
}
