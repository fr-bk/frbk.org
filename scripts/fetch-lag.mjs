/**
 * fetch-lag.mjs
 *
 * Hentar aktive lag for FRBK frå fotball.no og skriv til static/lag.json.
 * Køyrast av GitHub Actions kvar veke. Krev ingen API-nøklar.
 */

import fs from "node:fs";

const CLUB_ID = 1064;
const LAG_URL = `https://www.fotball.no/fotballdata/klubb/hjem/?fiksId=${CLUB_ID}&underside=lag`;
const OUTPUT = "public/lag.json";

// Les eksisterande fil som fallback
function readExisting() {
  try {
    return JSON.parse(fs.readFileSync(OUTPUT, "utf8"));
  } catch {
    return null;
  }
}

const res = await fetch(LAG_URL, {
  headers: { "User-Agent": "frbk-bot/1.0 (https://frbk.org)" },
});

if (!res.ok) {
  console.error(`Klarte ikkje hente lag-sida: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const html = await res.text();

// Finn alle lagnamn på forma "Fiksdal/Rekdal XNN" (t.d. G12, J7, G14, J10, K)
// Fagfolket på fotball.no brukar HTML-koden konsekvent med desse prefiksa
const re = /Fiksdal\/Rekdal\s+(?:G|J|K|M|Gutter|Jenter)\s*\d*(?:\s+BK)?/gi;
const funn = [...html.matchAll(re)].map((m) => m[0].replace(/\s+/g, " ").trim());
const unik = [...new Set(funn)].sort();

if (unik.length === 0) {
  const existing = readExisting();
  if (existing) {
    console.warn("Ingen lag funne i HTML – beheld eksisterande fil.");
    process.exit(0);
  }
  console.error("Ingen lag funne og ingen eksisterande fil. Avbryt.");
  process.exit(1);
}

const output = {
  oppdatert: new Date().toISOString().split("T")[0],
  lag: unik,
};

fs.mkdirSync("public", { recursive: true });
fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2) + "\n", "utf8");
console.log(`Lagra ${unik.length} lag til ${OUTPUT}: ${unik.join(", ")}`);
