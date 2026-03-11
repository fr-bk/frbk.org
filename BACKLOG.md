# Backlog — frbk.org

Oppgåver som er identifiserte men ikkje prioriterte enno.

---

## Lag og samarbeidslag

**Problem:** Kampkalenderen hentar berre kampar registrert under FRBK sitt fiksId (`1064`).
Samarbeidslag med Tomrefjord IL er registrert under Tomrefjord sitt fiksId og dukkar ikkje opp.

**Mogleg løysing:**
1. Finn fiksId for Tomrefjord IL på fotball.no (sjå URL på klubbsida deira)
2. Oppdater GitHub Action (`fetch-matches.yml`) til å hente begge og slå saman:
   ```js
   const ids = [1064, TOMREFJORD_ID];
   const all = await Promise.all(ids.map(id => fetch(`...?clubId=${id}`)));
   ```
3. Legg til eit `source`-felt på kampane så ein kan vise «Samarbeidslag med Tomrefjord» i UI-et

**Relatert:** Vurder å lage ein `lag`-seksjon i Sanity for å liste opp aktive lag per sesong
(namn, aldersklasse, trenar, sesong). Kan visast på ei eigen `/lag/`-side.

---

## Cuper og turneringar

**Problem:** Cupar (t.d. Norway Cup, lokale cupar) er ikkje i fotball.no sin kampkalender-API
og dukkar difor ikkje opp under «Kampar» på nettsida.

**Noverande praksis:** Cupar kommuniserast via Spond.

**Mogleg løysing (enkel):**
- Legg til eit fritekstfelt i Sanity (`hjemmeside` eller eige dokument) der redaktør kan
  skrive ein kort tekst om kommande cupar (t.d. «Vi deltek i Norway Cup 14.–20. juli»).
- Feltet lagrast som JSON og hentast av AI-chatten (Raymond) og kan visast under kampkortet.
- Implementasjon: nytt `cupInfo`-felt (`text`, maks 300 teikn) i `hjemmeside`-skjemaet +
  inkluder det i `hjemmesideQuery` + vis under `.card--matches` på framsida.

**Alternativ:** Berre halde Spond som kanal for cupar og leggje til ei linje under kampkortet:
«Cupar og treningskampar finn du på vår Facebook-side og i Spond.»

---

## Lokalt bundle av Pico CSS

**Problem:** Pico CSS lastast frå CDN (`cdn.jsdelivr.net`). Om CDN er nede eller treg,
påverkar det sida.

**Løysing:** `npm install @picocss/pico` og importer lokalt i staden for CDN-lenke.
Endring i `BaseLayout.astro` og `package.json`.
