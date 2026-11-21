import Link from "next/link";

// The bare domain sends visitors to their language:
// Arabic browsers go to /ar/, everyone else to /en/.
export default function RootRedirect() {
  const script = `
    var lang = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
    location.replace(lang.toLowerCase().indexOf("ar") === 0 ? "/ar/" : "/en/");
  `;
  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/en/" />
      </noscript>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <p style={{ padding: 24 }}>
        <Link href="/en/">English</Link> / <Link href="/ar/">العربية</Link>
      </p>
    </>
  );
}
