import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { AgentModes } from "@/components/AgentModes";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { Control } from "@/components/Control";
import { Features } from "@/components/Features";
import { Calculator } from "@/components/Calculator";
import { WhyReachfy } from "@/components/WhyReachfy";
import { Integrations } from "@/components/Integrations";
import { FinalCta } from "@/components/FinalCta";
import { FirstSteps } from "@/components/FirstSteps";
import { Problem } from "@/components/Problem";
import { content } from "@/content";
import { homeJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: { absolute: content.meta.title },
  description: content.meta.description,
});

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Nav />
      <main className="mx-auto w-full max-w-[1200px]">
        <Hero />
        <Problem />
        <HowItWorks />
        <AgentModes />
        <Calculator />
        <WhyReachfy />
        <Features />
        <Control />
        <Integrations />
        <FirstSteps />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
