import fs from "node:fs";

const ICS_URL = process.env.ICS_URL;
if (!ICS_URL) {
  console.error("Missing ICS_URL env var");
  process.exit(1);
}

function unescapeText(s = "") {
  return s
    .replace(/\\n/g, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

function parseIcsDateToIso(value) {
  // Handles:
  // 20260103T130000Z
  // 20260103T130000
  // 20260103
  if (!value) return null;

  const v = value.trim();
  if (/^\d{8}$/.test(v)) {
    // All-day date
    const y = v.slice(0, 4), m = v.slice(4, 6), d = v.slice(6, 8);
    return `${y}-${m}-${d}T00:00:00`;
  }

  const m = v.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z)?$/);
  if (!m) return null;

  const [, y, mo, d, hh, mm, ss, z] = m;
  const iso = `${y}-${mo}-${d}T${hh}:${mm}:${ss}${z ? "Z" : ""}`;
  return iso;
}

function parseIcs(ics) {
  // Minimal ICS parser for VEVENT blocks
  // Good enough for title/time/location/url from this feed.
  const lines = ics
    .replace(/\r\n/g, "\n")
    .split("\n")
    // unfold lines: lines starting with space/tab are continuations
    .reduce((acc, line) => {
      if (line.startsWith(" ") || line.startsWith("\t")) {
        acc[acc.length - 1] += line.slice(1);
      } else {
        acc.push(line);
      }
      return acc;
    }, []);

  const events = [];
  let cur = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      cur = {};
      continue;
    }
    if (line === "END:VEVENT") {
      if (cur?.start) events.push(cur);
      cur = null;
      continue;
    }
    if (!cur) continue;

    const [rawKey, ...rest] = line.split(":");
    if (!rawKey || rest.length === 0) continue;

    const value = rest.join(":");
    const key = rawKey.split(";")[0].toUpperCase();

    if (key === "SUMMARY") cur.title = unescapeText(value);
    if (key === "DTSTART") cur.start = parseIcsDateToIso(value);
    if (key === "DTEND") cur.end = parseIcsDateToIso(value);
    if (key === "LOCATION") cur.location = unescapeText(value);
    if (key === "URL") cur.url = unescapeText(value);
    if (key === "UID") cur.uid = unescapeText(value);
  }

  // Sort by start date
  events.sort((a, b) => (a.start || "").localeCompare(b.start || ""));
  return events;
}

const res = await fetch(ICS_URL);
if (!res.ok) {
  console.error(`Failed to fetch ICS: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const ics = await res.text();
const events = parseIcs(ics);

// Keep only upcoming (from now-7d) and limit size
const now = Date.now();
const weekAgo = now - 7 * 24 * 60 * 60 * 1000;

const upcoming = events
  .filter(e => {
    const t = Date.parse(e.start || "");
    return Number.isFinite(t) && t >= weekAgo;
  })
  .slice(0, 200);

fs.mkdirSync("data", { recursive: true });
fs.writeFileSync("data/kamper.json", JSON.stringify(upcoming, null, 2) + "\n", "utf8");

console.log(`Wrote ${upcoming.length} events to data/kamper.json`);