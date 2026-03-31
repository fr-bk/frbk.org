import type { APIRoute } from "astro";
import { loadQuery } from "../lib/sanity.js";

export const GET: APIRoute = async () => {
  const vareLag = await loadQuery(
    `*[_type == "side" && slug.current == "vare-lag"][0]{
      teams[]{ teamName, season, description, coach }
    }`
  );

  const lag = (vareLag?.teams ?? []).map(
    (t: { teamName?: string; season?: string; description?: string; coach?: string }) =>
      [t.teamName, t.season ? `(${t.season})` : "", t.description ?? ""].filter(Boolean).join(" — ")
  );

  return new Response(
    JSON.stringify({ oppdatert: new Date().toISOString().slice(0, 10), lag }),
    { headers: { "Content-Type": "application/json" } }
  );
};
