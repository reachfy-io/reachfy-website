import { LegalPage } from "@/components/LegalPage";
import { privacy } from "@/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/privacy",
  title: privacy.title,
  description: privacy.description,
});

export default function Page() {
  return <LegalPage doc={privacy} />;
}
