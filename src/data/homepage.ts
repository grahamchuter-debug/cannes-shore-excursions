import type { FAQ, VisitorType } from "./types";

export const visitorTypes: VisitorType[] = [
  {
    id: "first-time",
    label: "First time on the French Riviera",
    shortLabel: "First visit",
    description: "Monaco, Eze or Nice — we help you choose the right first Riviera experience from Cannes based on your port hours.",
    href: "/best-cannes-excursions-for-first-time-visitors",
    cta: "See first-timer picks",
  },
  {
    id: "monaco",
    label: "Here for Monaco and Monte Carlo",
    shortLabel: "Monaco",
    description: "Compare Monaco Magic, ship excursions, DIY and Villefranche departures — honest advice on the best Monaco day from Cannes.",
    href: "/why-monaco-magic-is-our-editors-choice",
    cta: "Monaco guides",
  },
  {
    id: "cannes-local",
    label: "Staying in Cannes today",
    shortLabel: "Cannes walk",
    description: "Le Suquet, La Croisette, beaches and the old port — explore Cannes itself without a long transfer.",
    href: "/one-day-in-cannes-from-a-cruise-ship",
    cta: "Cannes day plans",
  },
  {
    id: "luxury",
    label: "Luxury Riviera experience",
    shortLabel: "Luxury",
    description: "Yacht harbours, Belle Époque villas and unhurched Monte Carlo — premium pacing for discerning travellers.",
    href: "/best-cannes-excursions-for-luxury-travellers",
    cta: "Luxury guides",
  },
];

export interface HomeSection {
  slug: string;
  number: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export const coreSections: HomeSection[] = [
  { slug: "shore-excursions", number: "01", title: "Shore Excursions", description: "Monaco Magic, Riviera highlights, Nice & Eze, luxury experiences and Cannes walking days — with honest Editor's Choice guidance.", href: "/shore-excursions", cta: "Browse excursions" },
  { slug: "cruise-port-guide", number: "02", title: "Cannes Cruise Port Guide", description: "Gare Maritime terminal, tender arrangements, port redevelopment, walking distances and return-to-ship timing.", href: "/cruise-port-guide", cta: "Read the guide" },
  { slug: "monaco", number: "03", title: "Monaco from Cannes", description: "Drive times, what fits your port window and why Monaco Magic is our Editor's Choice after comparing every option.", href: "/monte-carlo-guide", cta: "Monaco guide" },
  { slug: "planner", number: "04", title: "Cannes Cruise Planner", description: "Enter ship times, interests and mobility — get tailored Riviera itineraries with return-to-ship confidence.", href: "/cruise-planner", cta: "Start planning" },
  { slug: "comparisons", number: "05", title: "Honest Comparisons", description: "Monaco vs Nice, Monaco vs Eze, ship vs independent tours, and Cannes vs Villefranche for Monaco excursions.", href: "/monaco-vs-nice", cta: "Compare options" },
  { slug: "schedules", number: "06", title: "Cruise Ship Schedules", description: "Year and month schedule views ready for CSV imports — see which ships share your port day.", href: "/ship-schedules", cta: "Check schedules" },
  { slug: "guides", number: "07", title: "Riviera Authority Guides", description: "Eze, Nice, Antibes, Saint-Paul-de-Vence, La Croisette, Le Suquet and beaches — practical cruise passenger advice.", href: "/best-french-riviera-shore-excursions", cta: "Read guides" },
  { slug: "faq", number: "08", title: "FAQ", description: "Common Cannes cruise questions — tenders, Monaco timing, independent vs ship excursions.", href: "/faq", cta: "View FAQ" },
];

export function getHomepageFaqs(): FAQ[] {
  return [
    {
      question: "Where do cruise ships dock in Cannes?",
      answer:
        "Most ships berth at Gare Maritime on Quai Laubeuf. When berths are full, vessels anchor and tender to the waterfront — adding 20–30 minutes each way. See our Cannes Cruise Port Guide for terminal details.",
    },
    {
      question: "Should I choose Monaco or Nice on a Cannes port day?",
      answer:
        "Monaco suits first-time Riviera visitors who want principality glamour; Nice suits art, markets and Baie des Anges promenades. Monaco is farther east — see our Monaco vs Nice comparison for honest timing advice.",
    },
    {
      question: "What is Monaco Magic and why is it your Editor's Choice?",
      answer:
        "Monaco Magic is our flagship small-group excursion to Monte Carlo and Eze. We recommend it after comparing ship tours, DIY options and other independent operators — not because it is ours alone, but because it balances small-group pacing with honest return-to-ship buffers from Cannes.",
    },
    {
      question: "How much time do I need to get back to my ship?",
      answer:
        "Allow 45 minutes buffer for Cannes walks, 60–75 minutes for Monaco or Eze excursions, and 60 minutes for Nice/Antibes. Tender days need extra margin at gangway.",
    },
    {
      question: "Is Monaco closer from Villefranche than Cannes?",
      answer:
        "Yes — Villefranche sits much closer to Monaco, with shorter transfers and typically more time in the principality. Cannes still offers an excellent Riviera experience but involves a longer drive. Our Cannes vs Villefranche comparison explains the trade-offs honestly.",
    },
  ];
}
