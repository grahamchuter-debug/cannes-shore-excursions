// Downloads Cannes / French Riviera imagery from Wikimedia Commons into public/images.
import { writeFileSync, mkdirSync, existsSync, statSync } from "fs";
import { join } from "path";

const OUT = "public/images";
const FORCE = process.argv.includes("--force");
mkdirSync(OUT, { recursive: true });
const WIDTH = 1600;
const UA = "cannes-shore-excursions/1.0 (image fetch; contact webmaster)";

const targets = {
  "cannes.jpg": ["Cannes harbour France", "Port of Cannes yacht"],
  "suquet.jpg": ["Le Suquet Cannes", "Cannes old town hill"],
  "croisette.jpg": ["La Croisette Cannes", "Palais des Festivals Cannes"],
  "monaco.jpg": ["Monaco harbour Monte Carlo", "Port Hercule Monaco"],
  "eze.jpg": ["Eze village France", "Eze medieval village Cote d Azur"],
  "nice.jpg": ["Promenade des Anglais Nice", "Nice Baie des Anges"],
  "antibes.jpg": ["Antibes old town ramparts", "Port Vauban Antibes"],
  "village.jpg": ["Saint-Paul-de-Vence France", "Medieval village French Riviera"],
  "beach.jpg": ["Cannes beach Mediterranean", "Plage du Midi Cannes"],
  "luxury.jpg": ["Luxury yacht French Riviera", "Superyacht Monaco harbour"],
  "couples.jpg": ["French Riviera coastline sunset", "Cote d Azur romantic"],
  "family.jpg": ["Antibes beach family", "French Riviera beach"],
  "coastline.jpg": ["Corniche road French Riviera", "Mediterranean coast France"],
  "cruise-port.jpg": ["Cannes cruise port", "Gare Maritime Cannes"],
  "hero-home.jpg": ["Cannes panorama harbour", "Cannes French Riviera aerial"],
  "og-default.jpg": ["French Riviera coastline aerial", "Cote d Azur panorama"],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function searchThumb(term) {
  const api =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo" +
    "&generator=search&gsrnamespace=6&gsrlimit=12" +
    `&gsrsearch=${encodeURIComponent(term)}` +
    `&iiprop=url|mime|size&iiurlwidth=${WIDTH}`;
  let res;
  for (let attempt = 0; attempt < 4; attempt++) {
    await sleep(600 + attempt * 800);
    try {
      res = await fetch(api, { headers: { "User-Agent": UA } });
      if (res.ok) break;
    } catch {}
    res = null;
  }
  if (!res || !res.ok) return [];
  const data = await res.json();
  const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
  pages.sort((a, b) => (a.index ?? 99) - (b.index ?? 99));
  const landscape = [];
  const other = [];
  for (const p of pages) {
    const ii = p.imageinfo?.[0];
    if (!ii || !/jpe?g/i.test(ii.mime || "")) continue;
    const url = ii.thumburl || ii.url;
    if ((ii.width || 0) >= (ii.height || 0)) landscape.push(url);
    else other.push(url);
  }
  return [...landscape, ...other];
}

async function grab(candidates) {
  for (const url of candidates) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 25000) continue;
      return { buf, url };
    } catch {}
  }
  return null;
}

async function main() {
  for (const [file, terms] of Object.entries(targets)) {
    const dest = join(OUT, file);
    if (!FORCE && existsSync(dest) && statSync(dest).size > 25000) {
      console.log(`skip ${file} (exists)`);
      continue;
    }
    let candidates = [];
    for (const term of terms) {
      candidates.push(...(await searchThumb(term)));
      if (candidates.length >= 6) break;
    }
    candidates = [...new Set(candidates)];
    const got = await grab(candidates);
    if (got) {
      writeFileSync(dest, got.buf);
      console.log(`ok ${file} <- ${got.url.slice(0, 80)}…`);
    } else {
      console.warn(`FAIL ${file}`);
    }
  }
}

main();
