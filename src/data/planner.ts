import { excursions } from "./excursions";

export interface PlannerInput {
  arrivalTime: string;
  departureTime: string;
  adults: number;
  children: number;
  interests: string[];
  mobility: "full" | "some" | "limited";
  budget: "budget" | "mid" | "premium";
  style: "guided" | "mix" | "diy";
}

export interface PlannerLink {
  label: string;
  href: string;
  why: string;
}

export interface PlannerResult {
  headline: string;
  summary: string;
  excursions: PlannerLink[];
  guides: PlannerLink[];
  logistics: PlannerLink[];
  dayPlan: { time: string; text: string }[];
  returnConfidence: "high" | "medium" | "low";
}

export const INTEREST_OPTIONS = [
  { id: "monaco", label: "Monaco & Monte Carlo" },
  { id: "villages", label: "Hill villages (Eze)" },
  { id: "nice", label: "Nice & Antibes" },
  { id: "cannes", label: "Cannes itself" },
  { id: "beaches", label: "Beaches & relaxation" },
  { id: "luxury", label: "Luxury experiences" },
  { id: "food", label: "Food & markets" },
  { id: "art", label: "Art & culture" },
];

const INTEREST_TO_EXCURSION: Record<string, string[]> = {
  monaco: ["monaco-magic", "luxury-riviera-experience", "french-riviera-highlights"],
  villages: ["monaco-magic", "nice-and-eze", "saint-paul-de-vence-and-antibes"],
  nice: ["french-riviera-highlights", "nice-and-eze", "cannes-walking-day"],
  cannes: ["cannes-walking-day", "beach-and-relaxation"],
  beaches: ["beach-and-relaxation", "cannes-walking-day", "family-riviera-day"],
  luxury: ["luxury-riviera-experience", "monaco-magic", "private-riviera-tour"],
  food: ["cannes-walking-day", "french-riviera-highlights", "nice-and-eze"],
  art: ["saint-paul-de-vence-and-antibes", "nice-and-eze", "cannes-walking-day"],
};

function parseTime(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
}

function hoursAshore(arrival: string, departure: string): number {
  const diff = parseTime(departure) - parseTime(arrival);
  return Math.max(0, diff / 60);
}

function excursionLink(slug: string, why: string): PlannerLink | null {
  const e = excursions.find((x) => x.slug === slug);
  if (!e) return null;
  const prefix = e.editorsChoice ? "Editor's Choice — " : "";
  return { label: `${prefix}${e.title}`, href: `/shore-excursions/${slug}`, why };
}

export function generateCannesPlan(input: PlannerInput): PlannerResult {
  const { arrivalTime, departureTime, adults, children, interests, mobility, budget, style } = input;
  const party = adults + children;
  const hasKids = children > 0;
  const hours = hoursAshore(arrivalTime, departureTime);
  const shortDay = hours < 6;
  const standardDay = hours >= 6 && hours < 9;
  const longDay = hours >= 9;

  const excSlugs: string[] = [];
  const pushSlug = (s: string) => {
    if (s && !excSlugs.includes(s)) excSlugs.push(s);
  };

  const activeInterests = interests.length ? interests : ["monaco", "cannes"];
  for (const interest of activeInterests) {
    for (const s of INTEREST_TO_EXCURSION[interest] ?? []) pushSlug(s);
  }

  if (hasKids) pushSlug("family-riviera-day");
  if (mobility === "limited") pushSlug("private-riviera-tour");
  if (style === "diy") pushSlug("cannes-walking-day");

  if (shortDay) {
    pushSlug("cannes-walking-day");
    pushSlug("beach-and-relaxation");
    ["monaco-magic", "luxury-riviera-experience", "saint-paul-de-vence-and-antibes"].forEach((s) => {
      const idx = excSlugs.indexOf(s);
      if (idx >= 0) excSlugs.splice(idx, 1);
    });
  } else if (standardDay) {
    if (activeInterests.includes("monaco")) pushSlug("monaco-magic");
    if (activeInterests.includes("villages")) pushSlug("nice-and-eze");
    if (activeInterests.includes("nice")) pushSlug("french-riviera-highlights");
    if (activeInterests.includes("luxury")) pushSlug("luxury-riviera-experience");
  } else if (longDay) {
    if (activeInterests.includes("monaco")) pushSlug("monaco-magic");
    if (activeInterests.includes("art")) pushSlug("saint-paul-de-vence-and-antibes");
    if (budget === "premium") pushSlug("private-riviera-tour");
  }

  if (style === "guided" && party >= 2) pushSlug("monaco-magic");
  if (budget === "premium") pushSlug("luxury-riviera-experience");
  if (budget === "budget" && style === "diy") pushSlug("cannes-walking-day");

  // Editor's Choice first when Monaco interest
  if (activeInterests.includes("monaco") && !shortDay) {
    const idx = excSlugs.indexOf("monaco-magic");
    if (idx > 0) {
      excSlugs.splice(idx, 1);
      excSlugs.unshift("monaco-magic");
    }
  }

  const reasonMap: Record<string, string> = {
    "monaco-magic": "Editor's Choice — Monte Carlo and Eze with small-group pacing and honest Cannes transfer timing.",
    "french-riviera-highlights": "Antibes and Nice westward — strong when Monaco is not your priority.",
    "nice-and-eze": "Nice's boulevards plus Eze village without the Monaco transfer.",
    "luxury-riviera-experience": "Premium vehicle and unhurried Monte Carlo harbour time.",
    "cannes-walking-day": "Le Suquet and La Croisette on foot — highest return-to-ship confidence.",
    "family-riviera-day": "Gentle Antibes pacing for families with children.",
    "beach-and-relaxation": "Beach or Îles de Lérins — minimal transfer, maximum relaxation.",
    "saint-paul-de-vence-and-antibes": "Art village and ramparts for culture-focused days.",
    "private-riviera-tour": mobility === "limited" ? "Flexible vehicle and pacing for your group." : "Custom routing on long port days.",
  };

  const excursionLinks = excSlugs
    .slice(0, 5)
    .map((s) => excursionLink(s, reasonMap[s] ?? "A strong match for your interests."))
    .filter((x): x is PlannerLink => x !== null);

  const guides: PlannerLink[] = [
    { label: "Cannes Cruise Port Guide", href: "/cruise-port-guide", why: "Gare Maritime layout, tenders and walking distances." },
    { label: "One Day in Cannes", href: "/one-day-in-cannes-from-a-cruise-ship", why: "Itineraries matched to your hours ashore." },
    { label: "Best Things to Do", href: "/best-things-to-do-in-cannes-from-a-cruise-ship", why: "Compare Monaco, Nice, Eze and Cannes itself." },
  ];
  if (activeInterests.includes("monaco")) guides.push({ label: "Why Monaco Magic is Editor's Choice", href: "/why-monaco-magic-is-our-editors-choice", why: "Our editorial reasoning after comparing all Monaco options." });
  if (activeInterests.includes("monaco")) guides.push({ label: "Cannes vs Villefranche for Monaco", href: "/cannes-vs-villefranche-for-monaco-excursions", why: "Honest geography comparison for Monaco excursions." });
  if (activeInterests.includes("nice")) guides.push({ label: "Nice from Cannes", href: "/nice-from-cannes", why: "Drive times and what fits your port window." });
  if (activeInterests.includes("villages")) guides.push({ label: "Eze from Cannes", href: "/eze-from-cannes", why: "Village timing and Monaco vs Eze decision." });
  if (hasKids) guides.push({ label: "Best for Families", href: "/best-cannes-excursions-for-families", why: "Family-paced Riviera options." });
  if (budget === "premium") guides.push({ label: "Luxury Riviera Guide", href: "/luxury-french-riviera-guide", why: "Premium experiences and pacing." });

  const logistics: PlannerLink[] = [
    { label: "Ship Schedules", href: "/ship-schedules", why: "See if other ships share your port day." },
    { label: "Independent vs Ship Excursions", href: "/independent-vs-cruise-line-excursions", why: "Compare flexibility and return-to-ship guarantees." },
    { label: "Monaco Magic vs DIY", href: "/monaco-magic-vs-diy", why: "Train and bus options compared honestly." },
    { label: "FAQ", href: "/faq", why: "Common Cannes cruise passenger questions." },
  ];

  const dayPlan: { time: string; text: string }[] = [];
  const topExc = excursionLinks[0]?.label ?? "your chosen excursion";

  dayPlan.push({ time: "On arrival", text: "Disembark at Gare Maritime (or tender to Quai Laubeuf). Allow 30–45 minutes for immigration and terminal exit before your excursion departs." });

  if (shortDay) {
    dayPlan.push({ time: "Morning", text: `Cannes Walking Day: ${topExc}. Le Suquet, Marché Forville and La Croisette — skip Monaco transfers on short calls.` });
    dayPlan.push({ time: "Midday", text: activeInterests.includes("beaches") ? "Plage du Midi or Îles de Lérins if time allows." : "Lunch on La Croisette or at the old port." });
    dayPlan.push({ time: "Return", text: "Head back 45 minutes before all-aboard. Short port days cannot fit Monaco honestly." });
  } else if (standardDay) {
    if (activeInterests.includes("monaco") && !shortDay) {
      dayPlan.push({ time: "Early start", text: `Monaco Magic: ${topExc} — allow 50–70 minutes each way on the corniche.` });
      dayPlan.push({ time: "Midday", text: "Monte Carlo harbour, palace district and Casino Square free time." });
      dayPlan.push({ time: "Afternoon", text: "Eze village and Jardin Exotique before return to Cannes." });
      dayPlan.push({ time: "Return buffer", text: "Allow 60–75 minutes before all-aboard — corniche traffic builds in the afternoon." });
    } else if (activeInterests.includes("nice")) {
      dayPlan.push({ time: "Morning", text: `French Riviera Highlights: ${topExc} — Antibes ramparts then Nice Promenade des Anglais.` });
      dayPlan.push({ time: "Afternoon", text: "Nice Old Town and Cours Saleya before westward return to Cannes." });
      dayPlan.push({ time: "Return buffer", text: "Allow 60 minutes margin from Nice to Gare Maritime." });
    } else {
      dayPlan.push({ time: "Morning", text: `Start with ${topExc} — ${activeInterests.includes("cannes") ? "Le Suquet and La Croisette on foot." : "Your top matched excursion."}` });
      dayPlan.push({ time: "Afternoon", text: activeInterests.includes("beaches") ? "Beach time at Plage du Midi." : "Old port yacht-spotting and festival steps." });
      dayPlan.push({ time: "Return buffer", text: "Allow 45–60 minutes for local days, 60–75 for Monaco." });
    }
  } else {
    dayPlan.push({ time: "Early start", text: `Maximise your long day: ${topExc}. Time for Monaco–Eze or Saint-Paul-de-Vence combinations.` });
    dayPlan.push({ time: "Midday", text: activeInterests.includes("luxury") ? "Extended Monte Carlo harbour and Cap Ferrat pause." : "Full Monaco or Nice immersion." });
    dayPlan.push({ time: "Afternoon", text: hasKids ? "Family Riviera Day at Antibes pace." : "Second village or relaxed Cannes return." });
    dayPlan.push({ time: "Return buffer", text: "Even on long days, keep 60–75 minutes margin for eastward excursions." });
  }

  let returnConfidence: PlannerResult["returnConfidence"] = "high";
  if (excSlugs.includes("monaco-magic") && shortDay) returnConfidence = "low";
  else if (excSlugs.includes("monaco-magic") && standardDay) returnConfidence = "medium";
  else if (excSlugs.includes("cannes-walking-day") || excSlugs.includes("beach-and-relaxation")) returnConfidence = "high";
  else if (shortDay) returnConfidence = "medium";

  const interestLabels = activeInterests.map((i) => INTEREST_OPTIONS.find((o) => o.id === i)?.label ?? i).join(", ");

  return {
    headline: `Your Cannes Port-Day Plan (${hours.toFixed(1)} hours ashore)`,
    summary: `A ${shortDay ? "short" : standardDay ? "standard" : "long"} port day for ${party} guest${party === 1 ? "" : "s"} focused on ${interestLabels.toLowerCase()}. ${style === "guided" ? "Guided tours recommended for Monaco and corniche routing." : style === "diy" ? "DIY works well in Cannes — book Monaco ahead if going independently." : "A mix of guided and independent suits most Cannes calls."}`,
    excursions: excursionLinks,
    guides,
    logistics,
    dayPlan,
    returnConfidence,
  };
}
