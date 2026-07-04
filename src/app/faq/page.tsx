import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { siteFaqs } from "@/data/faqs";

const path = "/faq";

export const metadata = buildMetadata({
  title: "Cannes Cruise FAQ",
  description:
    "Frequently asked questions about Cannes shore excursions, the cruise port, Monaco Magic, tender arrangements, Riviera timing and return-to-ship confidence for cruise passengers.",
  path,
  keywords: ["Cannes cruise port FAQ", "Cannes shore excursions FAQ", "Monaco from Cannes FAQ"],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "FAQ", path },
];

export default function FAQPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(siteFaqs), webPageSchema({ title: "Cannes Cruise FAQ", description: metadata.description as string, path })]} />
      <PageHero title="Cannes Cruise FAQ" subtitle="Practical answers for cruise passengers calling at Cannes — port logistics, Monaco vs Nice, Monaco Magic, tenders and French Riviera day trips." compact />
      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />
          <FAQSection faqs={siteFaqs} title="Common questions" />
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
