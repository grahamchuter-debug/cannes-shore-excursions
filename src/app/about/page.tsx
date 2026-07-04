import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const path = "/about";

export const metadata = buildMetadata({
  title: "About Cannes Shore Excursions",
  description: "About Cannes Shore Excursions — an independent French Riviera cruise planning authority for passengers calling at the Cannes cruise port.",
  path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About", path },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "About Cannes Shore Excursions", description: "About Cannes Shore Excursions.", path })]} />
      <PageHero title="About Cannes Shore Excursions" subtitle="An independent planning authority for cruise passengers discovering the French Riviera from Cannes." compact />
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          <div className="prose-body">
            <p>
              {SITE.name} is an independent planning resource for cruise passengers calling at Cannes. Ships berth at Gare Maritime on Quai Laubeuf, and our goal is to help you choose the right experience — Monaco, Eze, Nice, Antibes, Saint-Paul-de-Vence or Cannes itself — based on your interests, previous visits and port window.
            </p>
            <p>
              We aim to be the definitive Cannes cruise planning authority, not simply another excursion catalogue. We compare options honestly: when Monaco Magic earns our Editor&apos;s Choice badge, we explain why — and we also tell you when Nice, a Cannes walking day or a Villefranche departure might suit you better.
            </p>
            <p>
              Our guides are written for real cruise timings, not generic Riviera tourism. We highlight realistic drive times, tender delays, walking distances, return-to-ship buffers and honest advice on when a guided tour beats going it alone. Monaco Magic is our flagship excursion; additional private, food, wine and Provence experiences are launching over time.
            </p>
            <p>
              We are not affiliated with any cruise line or the Port of Cannes. Ship schedules and travel times are indicative — always confirm all-aboard times with your cruise line.
            </p>
            <p>
              Have a question we haven&apos;t answered? <a href="/enquire">Get in touch</a> and we&apos;ll help you plan.
            </p>
          </div>
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
