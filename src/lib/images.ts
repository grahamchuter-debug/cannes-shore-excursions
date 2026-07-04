export interface SiteImage {
  src: string;
  alt: string;
}

const B = "/images";

export const siteImages = {
  hero: {
    src: `${B}/hero-home.jpg`,
    alt: "Cannes harbour, luxury yachts and the French Riviera coastline from the cruise port",
  },
  ogDefault: {
    src: `${B}/og-default.jpg`,
    alt: "Cannes cruise planning — harbour, Monaco skyline and French Riviera coast",
  },
  logo: {
    src: `${B}/logo-mark.svg`,
    alt: "Cannes Shore Excursions",
  },
  port: {
    src: `${B}/cruise-port.jpg`,
    alt: "Cruise ships at Gare Maritime, Cannes cruise port on Quai Laubeuf",
  },
} as const;

export const subjectImages: Record<string, SiteImage> = {
  cannes: { src: `${B}/cannes.jpg`, alt: "Cannes old port and Le Suquet from the harbour" },
  suquet: { src: `${B}/suquet.jpg`, alt: "Le Suquet medieval lanes above Cannes harbour" },
  croisette: { src: `${B}/croisette.jpg`, alt: "La Croisette palm-lined promenade and Palais des Festivals, Cannes" },
  monaco: { src: `${B}/monaco.jpg`, alt: "Monaco harbour skyline and Monte Carlo superyachts" },
  eze: { src: `${B}/eze.jpg`, alt: "Eze village perched above the Mediterranean on the French Riviera" },
  nice: { src: `${B}/nice.jpg`, alt: "Nice Promenade des Anglais and Baie des Anges from Cannes cruise planning guide" },
  antibes: { src: `${B}/antibes.jpg`, alt: "Antibes old town ramparts and yacht port on the French Riviera" },
  village: { src: `${B}/village.jpg`, alt: "Saint-Paul-de-Vence medieval art village near Cannes" },
  beach: { src: `${B}/beach.jpg`, alt: "Cannes beaches and turquoise Mediterranean water" },
  luxury: { src: `${B}/luxury.jpg`, alt: "Luxury yachts on the French Riviera near Cannes and Monaco" },
  couples: { src: `${B}/couples.jpg`, alt: "Couples enjoying the French Riviera coastline from Cannes" },
  family: { src: `${B}/family.jpg`, alt: "Family-friendly Antibes ramparts on a Cannes cruise port day" },
  coastline: { src: `${B}/coastline.jpg`, alt: "French Riviera corniche road with Mediterranean views" },
  planner: { src: `${B}/cannes.jpg`, alt: "Planning a Cannes cruise day on the French Riviera" },
};

function pick(key: string): SiteImage {
  return subjectImages[key] ?? siteImages.ogDefault;
}

const excursionImageKeys: Record<string, string> = {
  "monaco-magic": "monaco",
  "french-riviera-highlights": "coastline",
  "nice-and-eze": "eze",
  "luxury-riviera-experience": "luxury",
  "cannes-walking-day": "suquet",
  "family-riviera-day": "family",
  "beach-and-relaxation": "beach",
  "saint-paul-de-vence-and-antibes": "village",
  "private-riviera-tour": "luxury",
};

export function getExcursionImage(slug: string): SiteImage {
  return pick(excursionImageKeys[slug] ?? "cannes");
}

export const excursionsHubImage = pick("monaco");

const guideImageKeys: Record<string, string> = {
  "why-monaco-magic-is-our-editors-choice": "monaco",
  "best-french-riviera-shore-excursions": "coastline",
  "cannes-old-town-walking-guide": "suquet",
  "la-croisette-guide": "croisette",
  "le-suquet-guide": "suquet",
  "cannes-beaches": "beach",
  "antibes-from-cannes": "antibes",
  "saint-paul-de-vence-from-cannes": "village",
  "eze-from-cannes": "eze",
  "nice-from-cannes": "nice",
  "monte-carlo-guide": "monaco",
  "best-things-to-do-in-cannes-from-a-cruise-ship": "cannes",
  "one-day-in-cannes-from-a-cruise-ship": "cannes",
  "luxury-french-riviera-guide": "luxury",
  "independent-vs-cruise-line-excursions": "coastline",
  "best-cannes-excursions-for-couples": "couples",
  "best-cannes-excursions-for-families": "family",
  "best-cannes-excursions-for-first-time-visitors": "monaco",
  "best-cannes-excursions-for-luxury-travellers": "luxury",
};

export function getGuideImage(slug: string): SiteImage {
  const key = guideImageKeys[slug] ?? "cannes";
  return pick(key);
}

const comparisonImageKeys: Record<string, string> = {
  "monaco-magic-vs-cruise-line-excursion": "monaco",
  "monaco-magic-vs-diy": "monaco",
  "monaco-vs-nice": "nice",
  "monaco-vs-eze": "eze",
  "cannes-vs-villefranche-for-monaco-excursions": "cannes",
};

export function getComparisonImage(slug: string): SiteImage {
  const key = comparisonImageKeys[slug] ?? "monaco";
  return pick(key);
}

export function getComparisonOgImage(slug: string): SiteImage {
  return getComparisonImage(slug);
}
