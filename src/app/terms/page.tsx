import { LegalPage } from "@/components/LegalPage";
import { terms } from "@/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/terms",
  title: terms.title,
  description: terms.description,
});

export default function Page() {
  return <LegalPage doc={terms} />;
}
