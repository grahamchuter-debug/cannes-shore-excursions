import type { FAQ } from "./types";

export interface Terminal {
  name: string;
  quay: string;
  usedBy: string;
  cityAccess: string;
}

export const terminals: Terminal[] = [
  {
    name: "Gare Maritime — Quai Laubeuf",
    quay: "Main cruise terminal on the old port",
    usedBy: "Most cruise ships calling at Cannes",
    cityAccess: "15–20 min walk uphill to Le Suquet; La Croisette 10–15 min on foot",
  },
  {
    name: "Tender operations",
    quay: "Anchorage in the Baie de Cannes",
    usedBy: "When berths are full or for smaller vessels",
    cityAccess: "Tender to Quai Laubeuf or Jetée Albert-Edouard — add 20–30 min each way",
  },
  {
    name: "Quai Saint-Pierre",
    quay: "Secondary berths on the port",
    usedBy: "Occasional assignments and smaller ships",
    cityAccess: "Similar walking distances to Le Suquet and La Croisette",
  },
];

export interface PortGuideSection {
  heading: string;
  paragraphs: string[];
}

export const portGuideSections: PortGuideSection[] = [
  {
    heading: "Cannes as the French Riviera gateway",
    paragraphs: [
      "Cannes is more than a film-festival backdrop — it is the western anchor of the Côte d'Azur cruise circuit, putting Monaco, Eze, Nice, Antibes and Saint-Paul-de-Vence within reach on a single port day. Most ships berth at the Gare Maritime on Quai Laubeuf, facing the old port where superyachts line the quays and Le Suquet rises above the harbour.",
      "That geography defines every excursion decision. Monaco lies east — roughly 55 km along the corniche roads, typically 50–70 minutes each way. Nice and Antibes sit west, closer and easier on a shorter port call. Cannes itself rewards walking: Marché Forville, La Croisette and the Palais des Festivals need no coach at all.",
    ],
  },
  {
    heading: "Cruise port redevelopment and passenger facilities",
    paragraphs: [
      "The Port of Cannes has invested in modernising the Gare Maritime passenger terminal to handle growing Mediterranean cruise traffic. Recent improvements focus on what passengers actually notice: clearer signage from gangway to exit, expanded shelter for waiting guests, improved Wi‑Fi in the terminal building, accessible routes for mobility scooters, and better coordination between port authorities and shore excursion operators at the Quai Laubeuf meeting point.",
      "You should expect a functional rather than lavish terminal — this is a working French port, not a purpose-built Caribbean mega-terminal. What matters for cruise guests is reliable exit flow on multi-ship days, visible taxi ranks outside the terminal, and honest information about tendering when berths are full. On busy summer calls, allow an extra 15–20 minutes for immigration and terminal exit before your excursion departure time.",
      "Future port plans continue to emphasise sustainable cruise growth and berth efficiency rather than dramatic terminal expansion. For passengers, the practical takeaway is unchanged: confirm whether you are berthing or tendering before you book timed excursions, and build gangway-to-street time into your planning.",
    ],
  },
  {
    heading: "Tender arrangements and walking distances",
    paragraphs: [
      "When Cannes' berths are occupied, ships anchor in the Baie de Cannes and tender passengers to the waterfront. Tendering typically adds 20–30 minutes each way compared with a direct berth — factor this into Monaco and Nice excursion timing. Your cruise line will announce tender ticket procedures; independent excursion operators at Quai Laubeuf understand tender delays and usually build modest flexibility into morning departures.",
      "From a berth at Gare Maritime, Le Suquet's church and ramparts are 15–20 minutes uphill on foot. La Croisette and the Palais des Festivals lie roughly 10–15 minutes along the flat waterfront. Marché Forville is 10 minutes inland. These distances make Cannes one of the few Riviera ports where a rewarding half-day needs no vehicle at all.",
    ],
  },
  {
    heading: "Return-to-ship timing from Cannes",
    paragraphs: [
      "Confirm your all-aboard time — usually 30–60 minutes before departure — and work backwards. Local Cannes walks need 45 minutes return buffer. Monaco and Eze excursions need 60–75 minutes because corniche traffic can slow afternoon returns. Nice and Antibes need 60 minutes.",
      "Ship-run excursions guarantee the vessel waits if you are delayed on an official tour. Independent and small-group passengers must respect all-aboard times themselves. Reputable Riviera operators track your ship's published departure; DIY travellers should avoid cutting margins on TER train connections from Monaco back to Cannes.",
    ],
  },
];

export const portGuideFaqs: FAQ[] = [
  {
    question: "How far is Le Suquet from the Cannes cruise terminal?",
    answer: "About 15–20 minutes uphill on foot from Gare Maritime to Notre-Dame d'Espérance and the Suquet ramparts. The climb is manageable but steep in places.",
  },
  {
    question: "Does Cannes use tenders?",
    answer: "Sometimes — when berths at Quai Laubeuf are full, ships anchor and tender to the waterfront. Check your cruise line's port briefing the night before. Tendering adds 20–30 minutes each way.",
  },
  {
    question: "How long does it take to reach Monaco from Cannes cruise port?",
    answer: "Approximately 50–70 minutes by road each way depending on traffic and routing. Budget a full day for Monaco and Eze combined — see our Monaco Magic excursion and comparison guides.",
  },
  {
    question: "What facilities are at Gare Maritime?",
    answer: "Expect basic terminal services — toilets, some seating, taxi rank outside, and excursion meeting points on Quai Laubeuf. ATMs and cafés are on the waterfront within a few minutes' walk.",
  },
];
