import Link from "next/link";

const LINKS = [
  { href: "/shore-excursions", label: "Shore Excursions" },
  { href: "/shore-excursions/monaco-magic", label: "Monaco Magic" },
  { href: "/cruise-port-guide", label: "Cruise Port Guide" },
  { href: "/cruise-planner", label: "Cruise Planner" },
  { href: "/one-day-in-cannes-from-a-cruise-ship", label: "One Day in Cannes" },
  { href: "/monte-carlo-guide", label: "Monte Carlo Guide" },
  { href: "/monaco-vs-nice", label: "Monaco vs Nice" },
  { href: "/ship-schedules", label: "Ship Schedules" },
  { href: "/faq", label: "FAQ" },
];

export function PlanningLinks({ heading = "Keep planning your Cannes cruise" }: { heading?: string }) {
  return (
    <section className="rounded-2xl border border-coastal-100 bg-coastal-50/60 p-6 sm:p-8">
      <h2 className="font-display text-xl font-semibold text-gray-900">{heading}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="pill hover:bg-coastal-100 transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
