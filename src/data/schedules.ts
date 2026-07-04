import type { ScheduleEntry, ShipSchedulePort } from "./types";
import {
  filterEntriesByMonth,
  filterEntriesByYear,
  getMonthsWithEntries,
  type ScheduleYear,
} from "@/lib/schedule-utils";
import cannesSchedule from "./imported-schedules/cannes.json";

const SCHEDULE_FAQS = [
  {
    question: "How accurate are the Cannes cruise ship schedules?",
    answer:
      "Schedules are compiled from published cruise timetables and updated periodically. Times, berths and dates can change — always confirm your arrival and departure with your cruise line before booking shore excursions.",
  },
  {
    question: "Where do ships dock in Cannes?",
    answer:
      "Most vessels use the Gare Maritime at Quai Laubeuf. Some calls require tendering when berths are full. See our Cannes Cruise Port Guide for terminal details and walking distances.",
  },
  {
    question: "When is Cannes cruise season?",
    answer:
      "Cannes sees most cruise calls from April through October, with peak Mediterranean traffic in May, June, September and October. Winter calls occur but are less frequent.",
  },
];

const SCHEDULE_TIPS = [
  "Check how many ships share your port day before booking Monaco or Nice coach tours",
  "Confirm tender vs berth assignment — tendering adds 20–30 minutes each way",
  "Book Monaco Magic and small-group tours early on multi-ship days",
  "Compare your hours ashore before choosing east (Monaco) or west (Nice/Antibes) excursions",
];

export const schedulePorts: ShipSchedulePort[] = [
  {
    slug: "cannes",
    name: "Cannes",
    country: "France",
    seoTitle: "Cannes Cruise Ship Schedule 2026 & 2027",
    metaDescription:
      "Cannes cruise ship schedule hub. See which ships are in port and plan Monaco, Nice, Eze and French Riviera shore excursions around published arrival and departure times.",
    intro:
      "Cannes is the French Riviera's premier cruise gateway. Check which vessels are scheduled before you book Monaco Magic, Riviera highlights or Cannes walking days.",
    description: "French Riviera cruise port — Gare Maritime at Quai Laubeuf with Le Suquet and La Croisette within walking distance.",
    scheduleOverview:
      "Cannes sees seasonal cruise traffic from April through October, with calls from Western Mediterranean, repositioning and luxury itineraries.",
    planningTips: SCHEDULE_TIPS,
    faqs: SCHEDULE_FAQS,
  },
];

const scheduleData: Record<string, ScheduleEntry[]> = {
  cannes: cannesSchedule as ScheduleEntry[],
};

export function getSchedulePortBySlug(slug: string): ShipSchedulePort | undefined {
  return schedulePorts.find((p) => p.slug === slug);
}

export function getAllSchedulePortSlugs(): string[] {
  return schedulePorts.map((p) => p.slug);
}

export function getScheduleEntries(slug: string): ScheduleEntry[] {
  return scheduleData[slug] ?? [];
}

export function getScheduleEntryCount(slug: string): number {
  return getScheduleEntries(slug).length;
}

export function getScheduleEntriesForYear(slug: string, year: ScheduleYear): ScheduleEntry[] {
  return filterEntriesByYear(getScheduleEntries(slug), year);
}

export function getScheduleEntriesForMonth(slug: string, monthKey: string): ScheduleEntry[] {
  return filterEntriesByMonth(getScheduleEntries(slug), monthKey);
}

export function getVerifiedMonthKeys(slug: string): string[] {
  return getMonthsWithEntries(getScheduleEntries(slug));
}

export function searchSchedulesByShip(query: string): { portSlug: string; entries: ScheduleEntry[] }[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results: { portSlug: string; entries: ScheduleEntry[] }[] = [];
  for (const port of schedulePorts) {
    const matches = getScheduleEntries(port.slug).filter(
      (e) => e.ship.toLowerCase().includes(q) || e.cruiseLine.toLowerCase().includes(q),
    );
    if (matches.length) results.push({ portSlug: port.slug, entries: matches });
  }
  return results;
}

export function getTodayTomorrowEntries(slug: string): { today: ScheduleEntry[]; tomorrow: ScheduleEntry[] } {
  const entries = getScheduleEntries(slug);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return {
    today: entries.filter((e) => e.date === fmt(today)),
    tomorrow: entries.filter((e) => e.date === fmt(tomorrow)),
  };
}
