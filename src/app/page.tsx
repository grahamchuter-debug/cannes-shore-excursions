import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { VisitorTypeSelector } from "@/components/VisitorTypeSelector";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, travelGuideSchema } from "@/lib/schema";
import { coreSections, getHomepageFaqs } from "@/data/homepage";
import { getFeaturedExcursions, getEditorsChoiceExcursion } from "@/data/excursions";
import { siteImages, getExcursionImage } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Cannes Shore Excursions & French Riviera Cruise Planning",
  description:
    "The definitive Cannes cruise planning authority — Monaco Magic, shore excursions, port guide, honest comparisons and a personalised cruise planner for French Riviera port days.",
  path: "/",
  keywords: [
    "Cannes shore excursions",
    "Monaco shore excursion from Cannes",
    "Monaco Magic",
    "French Riviera shore excursions",
    "Cannes cruise port guide",
  ],
});

export default function HomePage() {
  const faqs = getHomepageFaqs();
  const featured = getFeaturedExcursions().slice(0, 6);
  const editorsChoice = getEditorsChoiceExcursion();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          faqSchema(faqs),
          travelGuideSchema({
            title: "Cannes Shore Excursions & French Riviera Cruise Planning",
            description: "The definitive Cannes cruise planning authority for French Riviera port days.",
            path: "/",
          }),
        ]}
      />

      <section className="home-hero">
        <img src={siteImages.hero.src} alt={siteImages.hero.alt} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow mb-2 text-coastal-100">French Riviera cruise gateway</p>
          <h1 className="home-hero-heading">Cannes Shore Excursions &amp; French Riviera Cruise Planning</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            Cannes is your gateway to the Côte d&apos;Azur — Monaco, Eze, Nice, Antibes and Saint-Paul-de-Vence — with honest Editor&apos;s Choice guidance, return-to-ship confidence and independent cruise passenger advice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shore-excursions" className="btn-accent">Find Shore Excursions</Link>
            <Link href="/cruise-planner" className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20">Use the Cruise Planner</Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            <span className="inline-flex items-center gap-2"><span aria-hidden="true">✓</span> Monaco Magic — Editor&apos;s Choice</span>
            <span className="inline-flex items-center gap-2"><span aria-hidden="true">✓</span> Honest comparisons, not brochure copy</span>
            <span className="inline-flex items-center gap-2"><span aria-hidden="true">✓</span> Return-to-ship reassurance</span>
          </div>
        </div>
      </section>

      <VisitorTypeSelector />

      {editorsChoice && (
        <section className="section-padding bg-gradient-to-br from-autumn-300/15 via-white to-coastal-50 border-y border-autumn-400/20">
          <div className="container-wide">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="pill-editors-choice">Editor&apos;s Choice</span>
                <h2 className="section-title mt-4">{editorsChoice.title}</h2>
                <p className="section-subtitle">{editorsChoice.overview.slice(0, 280)}…</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/shore-excursions/${editorsChoice.slug}`} className="btn-primary">View Monaco Magic</Link>
                  <Link href="/why-monaco-magic-is-our-editors-choice" className="btn-secondary">Why we recommend it</Link>
                </div>
              </div>
              <Link href={`/shore-excursions/${editorsChoice.slug}`} className="card-editorial group overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={getExcursionImage(editorsChoice.slug).src} alt={getExcursionImage(editorsChoice.slug).alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-white">
        <div className="container-wide">
          <p className="section-eyebrow">Your French Riviera port day</p>
          <h2 className="section-title mt-2">The definitive Cannes cruise planning hub</h2>
          <p className="section-subtitle">Monaco east, Nice west, Cannes on your doorstep — choose the right excursion for your hours ashore, interests and return-to-ship confidence.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coreSections.map((s) => (
              <Link key={s.slug} href={s.href} className="nav-card group flex h-full flex-col">
                <span className="font-display text-2xl font-bold text-coastal-200">{s.number}</span>
                <h3 className="mt-1 font-display text-lg font-bold text-gray-900 group-hover:text-coastal-800">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-gray-600">{s.description}</p>
                <span className="mt-3 text-sm font-semibold text-maple-600">{s.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-coastal-50">
        <div className="container-wide">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-title">Shore Excursions</h2>
              <p className="section-subtitle">Balanced recommendations — Monaco Magic is our Editor&apos;s Choice, but we compare every option honestly.</p>
            </div>
            <Link href="/shore-excursions" className="btn-secondary shrink-0">All Excursions</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((e) => {
              const image = getExcursionImage(e.slug);
              return (
                <Link key={e.slug} href={`/shore-excursions/${e.slug}`} className="card-editorial group overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={image.src} alt={image.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-coastal-900/55 via-transparent to-transparent" aria-hidden="true" />
                    {e.editorsChoice && <span className="absolute left-3 top-3 pill-editors-choice">Editor&apos;s Choice</span>}
                    {!e.editorsChoice && <span className="absolute left-3 top-3 pill bg-white/90">{e.category}</span>}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-coastal-800">{e.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{e.tagline}</p>
                    <p className="mt-3 text-xs font-medium text-coastal-700">{e.duration} · {e.pace}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide grid gap-6 lg:grid-cols-2">
          <div className="card-feature">
            <h3 className="font-display text-xl font-bold text-gray-900">First time on the Riviera?</h3>
            <p className="mt-3 text-gray-700">Monaco or Nice? Eze or Cannes itself? Our guides explain drive times, what fits your port window and when Monaco Magic earns our Editor&apos;s Choice badge.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/best-cannes-excursions-for-first-time-visitors" className="btn-secondary text-sm">First-timer guide</Link>
              <Link href="/monaco-vs-nice" className="btn-secondary text-sm">Monaco vs Nice</Link>
            </div>
          </div>
          <div className="card-accent">
            <h3 className="font-display text-xl font-bold text-gray-900">Staying in Cannes?</h3>
            <p className="mt-3 text-gray-700">Le Suquet, La Croisette and the old port yacht harbour — explore Cannes on foot without a long transfer when your port window is tight.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/le-suquet-guide" className="btn-secondary text-sm">Le Suquet guide</Link>
              <Link href="/cannes-beaches" className="btn-secondary text-sm">Cannes beaches</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-coastal-900 text-white">
        <div className="container-wide max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Build your personalised Cannes cruise plan</h2>
          <p className="mt-4 text-white/85">Enter your ship times, interests, mobility and budget — get tailored Riviera itineraries with return-to-ship confidence.</p>
          <Link href="/cruise-planner" className="btn-accent mt-8 inline-flex">Start the Cruise Planner</Link>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <FAQSection faqs={faqs} title="Cannes Cruise Planning FAQs" />
        </div>
      </section>
    </>
  );
}
