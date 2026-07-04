import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const path = "/enquire";

export const metadata = buildMetadata({
  title: "Enquire / Contact",
  description: "Get in touch about Cannes shore excursions and French Riviera cruise planning — enquire about Monaco Magic, register interest for upcoming tours and ask cruise-day questions.",
  path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Enquire", path },
];

export default function EnquirePage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "Enquire / Contact", description: "Get in touch about Cannes cruise planning.", path })]} />
      <PageHero title="Enquire / Contact" subtitle="Enquire about Monaco Magic, register interest for upcoming Riviera tours, or ask about your Cannes port day." compact />
      <section className="section-padding">
        <div className="container-wide max-w-xl">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mb-6 card-feature">
            <p className="text-sm text-gray-700">Monaco Magic is available to enquire. Additional tours — private Riviera days, shared small-group tours, luxury experiences, food tours, wine experiences and Provence excursions — are launching soon. Use this form to register interest or ask planning questions.</p>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input id="name" type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="email" type="email" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">I&apos;m interested in</label>
              <select id="interest" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm">
                <option>Monaco Magic shore excursion</option>
                <option>General cruise planning advice</option>
                <option>Register interest — shore excursion</option>
                <option>Private Riviera tour</option>
                <option>Small-group / shared tour notification</option>
                <option>French Riviera Highlights</option>
                <option>Nice &amp; Eze</option>
                <option>Luxury Riviera experience</option>
                <option>Cannes walking day</option>
                <option>Family Riviera day</option>
                <option>Beach &amp; relaxation</option>
                <option>Food tour (coming soon)</option>
                <option>Wine experience (coming soon)</option>
                <option>Provence excursion (coming soon)</option>
              </select>
            </div>
            <div>
              <label htmlFor="cruise" className="block text-sm font-medium text-gray-700 mb-1">Cruise date &amp; ship (optional)</label>
              <input id="cruise" type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" placeholder="e.g. 15 June 2026, Celebrity Apex" />
            </div>
            <div>
              <label htmlFor="party" className="block text-sm font-medium text-gray-700 mb-1">Party size (optional)</label>
              <input id="party" type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" placeholder="e.g. 2 adults, 1 child" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea id="message" rows={5} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" placeholder="Tell us about your Cannes port day, ship times and which excursion interests you..." />
            </div>
            <button type="submit" className="btn-primary">Send Enquiry</button>
          </form>
          <p className="mt-6 text-sm text-gray-600">Or email us directly at {SITE.email}</p>
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
