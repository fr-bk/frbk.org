# frbk.org

Nettside for Fiksdal/Rekdal ballklubb, bygget med Astro og Sanity.

## Stack

- Astro frontend
- Embedded Sanity Studio på `/studio`
- Sanity som CMS
- Netlify for hosting og serverless-funksjoner

## Lokal utvikling

Installer avhengigheter og start dev-server:

```bash
npm install
npm run dev
```

Vanlige kommandoer:

```bash
npm run dev
npm run build
npm run preview
```

## Miljøvariabler

For vanlig drift og lokal utvikling trenger siden:

- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`

For Presentation / draft preview i Sanity Studio kan du i tillegg bruke:

- `PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true`
- `SANITY_API_READ_TOKEN`

For migreringsskriptet finnes det én ekstra variabel:

- `SANITY_WRITE_TOKEN`

`SANITY_WRITE_TOKEN` skal kun brukes til migrering eller engangsskript, ikke i vanlig runtime.

Se [`.env.example`](/Users/chrorvik/Prosjekt/frbk.org/.env.example).

## Sanity

Repoet er satt opp mot dette Sanity-prosjektet:

- `projectId`: `330w38cx`
- `dataset`: `production`

Sanity CLI-konfig ligger i [sanity.cli.js](/Users/chrorvik/Prosjekt/frbk.org/sanity.cli.js).

Viktige dokumenttyper:

- `hjemmeside`
- `side`
- `nyhet`

## Studio og preview

Sanity Studio er embedded i appen og finnes på:

- lokalt: `http://localhost:4321/studio` eller den porten Astro faktisk starter på
- i drift: `https://frbk.org/studio`

Presentation tool er satt opp. Hvis preview oppfører seg rart:

1. sjekk at du bruker riktig lokal port
2. restart dev-server
3. hard refresh nettleseren
4. verifiser at `SANITY_API_READ_TOKEN` faktisk er satt hvis draft preview skal fungere

## Hosting og deploy

Frontend hostes på Netlify.

Netlify-oppsett:

- build command: `npm run build`
- functions: `netlify/functions`
- chat-endepunkt: `/api/chat` -> `/.netlify/functions/frbk-chat`

Se [netlify.toml](/Users/chrorvik/Prosjekt/frbk.org/netlify.toml).

Typisk deploy-flyt:

```bash
git add .
git commit -m "Describe change"
git push
```

Hvis repoet er koblet riktig til Netlify, deployes endringer automatisk ved push.

## Viktige filer

- [astro.config.mjs](/Users/chrorvik/Prosjekt/frbk.org/astro.config.mjs)
- [sanity.config.js](/Users/chrorvik/Prosjekt/frbk.org/sanity.config.js)
- [sanity.cli.js](/Users/chrorvik/Prosjekt/frbk.org/sanity.cli.js)
- [src/lib/sanity.js](/Users/chrorvik/Prosjekt/frbk.org/src/lib/sanity.js)
- [src/lib/queries.js](/Users/chrorvik/Prosjekt/frbk.org/src/lib/queries.js)
- [src/pages/index.astro](/Users/chrorvik/Prosjekt/frbk.org/src/pages/index.astro)
- [src/pages/[slug].astro](/Users/chrorvik/Prosjekt/frbk.org/src/pages/[slug].astro)
- [src/pages/nyheter/[slug].astro](/Users/chrorvik/Prosjekt/frbk.org/src/pages/nyheter/[slug].astro)
- [public/js/chat.js](/Users/chrorvik/Prosjekt/frbk.org/public/js/chat.js)
- [public/css/custom.css](/Users/chrorvik/Prosjekt/frbk.org/public/css/custom.css)

## Migrering

Migreringsskriptet ligger i:

- [scripts/migrate-hugo-to-sanity.mjs](/Users/chrorvik/Prosjekt/frbk.org/scripts/migrate-hugo-to-sanity.mjs)

Dette er et engangsskript for import fra Hugo og for senere datasynk ved behov.

Viktig historikk:

- Sanity-dokument-ID-er må ikke bruke punktum (`.`) hvis innholdet skal være offentlig lesbart
- gamle migreringer med private dokument-ID-er førte til at public read feilet

## Kjent prosjektkunnskap

- Chatboten heter `Ray`
- Chat-widgeten er tilpasset mobil og desktop forskjellig
- Embedded Studio og Presentation gjør at gammel nettlesercache noen ganger kan gi misvisende oppførsel
- Hvis klikk oppfører seg rart, test alltid med hard refresh først etter JS/CSS-endringer

## Ting som ikke bør ligge i repoet

Hold dette utenfor README og repo:

- personlige innlogginger
- API-tokens
- Netlify-kontoopplysninger
- DNS-innlogging

Dette hører bedre hjemme i et separat driftsnotat.

## License

Code is licensed under the MIT License.  
Content and media are © Fiksdal/Rekdal ballklubb.
