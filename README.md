# frbk.org

Nettside for Fiksdal/Rekdal ballklubb — stifta 1979, Møre og Romsdal.

## Stack

| Lag | Teknologi |
|-----|-----------|
| Frontend | Astro 5 (SSR) |
| CMS | Sanity v3 — prosjekt `330w38cx`, dataset `production` |
| Hosting | Vercel (Hobby) — `main` → frbk.org |
| CSS | Pico CSS v2 (CDN) + `public/css/custom.css` |
| Chat | Claude API (`claude-sonnet-4-6`) — assistent heiter Ray |
| Kampar | Henta dagleg frå fotball.no via GitHub Actions → `data/kamper.json` |

## Kom i gang

```bash
npm install
npm run dev
```

Studio køyrer på `http://localhost:4321/studio`.

## Miljøvariabler

Legg desse i `.env` lokalt (eller i Vercel-dashboardet for produksjon):

```
PUBLIC_SANITY_PROJECT_ID=330w38cx
PUBLIC_SANITY_DATASET=production
ANTHROPIC_API_KEY=...

# Valfritt — for Sanity draft preview
PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true
SANITY_API_READ_TOKEN=...
```

## Deploy

Push til `dev` → preview-URL på Vercel.
Merge til `main` → frbk.org.

```bash
git add .
git commit -m "Beskriv endring"
git push
```

## Arkitektur

```
src/pages/
  index.astro          # Framsida
  [slug].astro         # Generiske Sanity-sider (om, kontakt, fair play …)
  nyheter/[slug].astro # Nyheiter
  personvern.astro     # Personvernserklæring (statisk)
  api/chat.js          # Chat-endepunkt (SSR, streama SSE)

public/
  js/chat.js           # Chat-widget
  js/theme.js          # Tema- og menylogikk
  css/custom.css       # All tilpassa styling

data/kamper.json       # Kampdata frå fotball.no (autogenerert)
schemas/               # Sanity-dokumenttypar
```

## Kjent kunnskap

- Sanity-dokument-ID-ar må ikkje bruke punktum (`.`) — gir feil på public read
- Hard refresh løyser mange rare oppførslar etter JS/CSS-endringar
- `[slug].astro` er SSR — statiske sider treng `export const prerender = true`

## Lisens

Kode: MIT.
Innhald og media: © Fiksdal/Rekdal ballklubb.
