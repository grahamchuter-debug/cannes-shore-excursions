import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CannesCruisePlanner } from "@/components/CannesCruisePlanner";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { siteImages } from "@/lib/images";

const path = "/cruise-planner";

export const metadata = buildMetadata({
  title: "Cannes Cruise Planner",
  description:
    "Build a personalised Cannes cruise plan. Enter arrival and departure times, interests, mobility, party size and budget — get tailored French Riviera excursion ideas with return-to-ship confidence.",
  path,
  keywords: ["Cannes cruise planner", "Cannes cruise day plan", "Monaco from Cannes planning"],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Cruise Planner", path },
];

export default function CruisePlannerPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "Cannes Cruise Planner", description: "Build a personalised Cannes cruise plan.", path })]} />
      <PageHero
        title="Cannes Cruise Planner"
        subtitle="Enter your ship times, party size, interests, mobility and budget — get tailored shore excursion ideas for your French Riviera port day, with realistic timing and return-to-ship confidence."
        imageSrc={siteImages.hero.src}
        imageAlt={siteImages.hero.alt}
        compact
      />
      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />
          <CannesCruisePlanner />
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
