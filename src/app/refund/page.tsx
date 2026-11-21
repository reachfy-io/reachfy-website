import { LegalPage } from "@/components/LegalPage";
import { refund } from "@/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/refund",
  title: refund.title,
  description: refund.description,
});

export default function Page() {
  return <LegalPage doc={refund} />;
}
