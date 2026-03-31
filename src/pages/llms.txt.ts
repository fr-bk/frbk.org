import type { APIRoute } from "astro";
import { loadQuery } from "../lib/sanity.js";

export const GET: APIRoute = async () => {
  const [nyheter, sider, vareLag] = await Promise.all([
    loadQuery(`*[_type == "nyhet"] | order(publishedAt desc)[0...10] { title, slug, publishedAt, summary }`),
    loadQuery(`*[_type == "side" && coalesce(showInNavigation, true)] | order(coalesce(navigationOrder, 100) asc) { title, slug }`),
    loadQuery(`*[_type == "side" && slug.current == "vare-lag"][0] { teams[] { teamName, season, description, coach } }`),
  ]);

  const teams: { teamName?: string; season?: string; description?: string; coach?: string }[] = vareLag?.teams ?? [];
  const pages: { title?: string; slug?: { current?: string } }[] = Array.isArray(sider) ? sider : [];
  const news: { title?: string; slug?: { current?: string }; publishedAt?: string; summary?: string }[] = Array.isArray(nyheter) ? nyheter : [];

  const teamLines = teams.length > 0
    ? teams.map((t) => {
        const parts = [`- **${t.teamName}** (${t.season ?? ""})`];
        if (t.description) parts.push(`  ${t.description}`);
        if (t.coach) parts.push(`  Trenar: ${t.coach}`);
        return parts.join("\n");
      }).join("\n")
    : "- Ingen lag registrert for inneværende sesong.";

  const pageLines = pages
    .map((p) => `- [${p.title}](https://frbk.org/${p.slug?.current}/)`)
    .join("\n");

  const newsLines = news
    .map((n) => {
      const date = n.publishedAt ? new Date(n.publishedAt).toLocaleDateString("nb-NO") : "";
      return `- [${n.title}](https://frbk.org/nyheter/${n.slug?.current}/) (${date})${n.summary ? `\n  ${n.summary}` : ""}`;
    })
    .join("\n");

  const body = `# Fiksdal/Rekdal Ballklubb

> Fotballglede for alle sidan 1979 – ein inkluderande fotballklubb i Møre og Romsdal, Noreg.

Fiksdal/Rekdal Ballklubb (FRBK) er ein frivillig driven fotballklubb. Stifta 18. november 1979, godkjent som NFF Kvalitetsklubb sidan 2020. Nettsida gir informasjon om kampar, nyhende, lag, kontakt og klubbkultur.

## Sider

${pageLines}
- [Nyhende](https://frbk.org/nyheter/) – Siste nytt frå klubben
- [Personvern](https://frbk.org/personvern/) – Personvernerklæring

## Aktive lag (${new Date().getFullYear()})

${teamLines}

## Om klubben

- **Stifta:** 18. november 1979
- **Stad:** Møre og Romsdal, Noreg
- **Kvalitetsklubb:** Sidan 2020
- **Kontakt:** fiksdalrekdalbk2@gmail.com

## Kjente profilar

- **Kjetil Rekdal** – Tidlegare profesjonell fotballspelar og trenar. Barndomsklubben hans. Æresmedlem sidan 1993. Mottok Kniksens hederspris 2018.
- **Elisabeth D. Nakken** – Æresmedlem 2023.
- **Dag Nakken** – Æresmedlem 1990.

## Verdiar

Tryggheit · Glede · Respekt · Likeverd

## Siste nyhende

${newsLines}

## Optional

- [Sitemap](https://frbk.org/sitemap-index.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
