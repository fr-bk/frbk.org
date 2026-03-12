import '../chunks/page-ssr_k0sCC2B0.mjs';
import { f as createComponent, k as renderComponent, r as renderTemplate, h as addAttribute, m as maybeRenderHead, l as Fragment } from '../chunks/astro/server_CMw5sewy.mjs';
import 'piccolore';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { l as loadQuery, h as hjemmesideQuery, a as allNyheterQuery, b as navigationPagesQuery, u as urlFor, $ as $$BaseLayout } from '../chunks/BaseLayout_DIgIIHFt.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const FOTBALL_URL = "https://www.fotball.no/fotballdata/klubb/hjem/?fiksId=1064&underside=kamper";
  const ICS_URL = "https://www.fotball.no/footballapi/Calendar/GetCalendarForClub?clubId=1064";
  const [hjemmeside, alleNyheter, navigationPages] = await Promise.all([
    loadQuery(hjemmesideQuery),
    loadQuery(allNyheterQuery),
    loadQuery(navigationPagesQuery)
  ]);
  const sisteNyheter = alleNyheter.slice(0, 5);
  let kamper = [];
  try {
    const kamperPath = resolve("./data/kamper.json");
    kamper = JSON.parse(readFileSync(kamperPath, "utf-8")).slice(0, 5);
  } catch {
  }
  const heroImage = hjemmeside?.heroImageRef ? urlFor(hjemmeside.heroImageRef).width(1600).url() : "/img/hero-fotballbane.jpg";
  const heroPosition = hjemmeside?.heroPosition ?? "center";
  const pageDescription = hjemmeside?.metaDescription || hjemmeside?.heroLead || "Fotballglede for alle sidan 1979 \u2013 ein inkluderande fotballklubb i M\xF8re og Romsdal.";
  const ogImage = hjemmeside?.ogImageRef ? urlFor(hjemmeside.ogImageRef).width(1200).height(630).url() : null;
  const heroTitle = hjemmeside?.heroTitle ?? "Fiksdal/Rekdal ballklubb";
  const heroLead = hjemmeside?.heroLead ?? "Ein inkluderande fotballklubb for barn, unge og vaksne.";
  const heroActions = hjemmeside?.heroActions?.length ? hjemmeside.heroActions : [
    { label: "Kampar", href: "#kampar", variant: "primary" },
    { label: "Bli med", href: "/kontakt/", variant: "secondary" }
  ];
  const newsSectionTitle = hjemmeside?.newsSectionTitle ?? "Siste nyheter";
  const matchesSectionTitle = hjemmeside?.matchesSectionTitle ?? "Kamper";
  const featuredNews = sisteNyheter[0] ?? null;
  const remainingNews = sisteNyheter.slice(1);
  const quickLinkDescriptions = {
    "om-klubben": "Historie, klubbfakta og kvar vi vil vidare.",
    "fair-play": "Verdigrunnlag og forventningar til milj\xF8et rundt laga.",
    kontakt: "Kontaktpersonar og enkle vegar inn i klubben.",
    dokumenter: "\xC5rsmelding, klubbhandbok og andre viktige dokument."
  };
  const quickLinks = navigationPages.map((page) => ({
    ...page,
    description: quickLinkDescriptions[page.slug] ?? "Meir informasjon om klubben og aktiviteten v\xE5r."
  }));
  function sponsorHref(sponsor) {
    return typeof sponsor?.url === "string" && sponsor.url.trim() ? sponsor.url.trim() : null;
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "isHome": true, "heroImage": heroImage, "heroPosition": heroPosition, "description": pageDescription, "ogImage": ogImage }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="section-intro"> <div> <span class="section-intro__eyebrow">Klubbliv</span> <h2>${newsSectionTitle}</h2> </div> <a href="/nyheter/" class="section-intro__link">Sjå alle nyheiter</a> </section> <section class="news-showcase"> ${featuredNews ? renderTemplate`<a class="news-feature"${addAttribute(`/nyheter/${featuredNews.slug}/`, "href")}> <div class="news-feature__meta"> <span class="news-feature__tag">Siste nytt</span> <time${addAttribute(featuredNews.publishedAt, "datetime")}> ${new Date(featuredNews.publishedAt).toLocaleDateString("nb-NO", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  })} </time> </div> <h3>${featuredNews.title}</h3> ${featuredNews.summary && renderTemplate`<p>${featuredNews.summary}</p>`} <span class="news-feature__cta">Les saka</span> </a>` : renderTemplate`<div class="empty-state"> <p>Ingen nyheiter enda.</p> </div>`} <article class="card card--newslist"> <header class="card__header"> <h3>Fleire nyheiter</h3> <a href="/nyheter/">Arkiv</a> </header> ${remainingNews.length > 0 ? renderTemplate`<div class="list"> ${remainingNews.map((n) => renderTemplate`<a class="list__item"${addAttribute(`/nyheter/${n.slug}/`, "href")}> <div class="list__title">${n.title}</div> <div class="list__meta"> ${new Date(n.publishedAt).toLocaleDateString("nb-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })} </div> </a>`)} </div>` : renderTemplate`<p>Fleire nyheiter kjem snart.</p>`} </article> </section> <section class="home-grid"> <article class="card card--matches" id="kampar"> <header class="card__header"> <div> <span class="card__eyebrow">Kampkalender</span> <h2>${matchesSectionTitle}</h2> </div> <a${addAttribute(FOTBALL_URL, "href")}>Alle</a> </header> ${kamper.length > 0 ? renderTemplate`<div class="list"> ${kamper.map((k) => renderTemplate`<div class="list__item list__item--static"> <div class="list__title">${k.title}</div> <div class="list__meta"> ${k.start ? new Date(k.start).toLocaleString("nb-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }) : ""} </div> </div>`)} </div>` : renderTemplate`<p class="muted">
Ingen kampar å vise enda. (Data oppdateres automatisk.)
</p>`} <div class="actions"> <a${addAttribute(ICS_URL, "href")} role="button">Abonner på kampkalender</a> <a${addAttribute(FOTBALL_URL, "href")} role="button" class="secondary">Sjå kampar på fotball.no</a> </div> </article> <article class="card card--quicklinks"> <header class="card__header"> <div> <span class="card__eyebrow">Klubben</span> <h2>Praktisk informasjon</h2> </div> </header> <div class="quick-links"> ${quickLinks.map((page) => renderTemplate`<a class="quick-link-card"${addAttribute(`/${page.slug}/`, "href")}> <h3>${page.navigationTitle ?? page.title}</h3> <p>${page.description}</p> </a>`)} </div> </article> </section>  ${hjemmeside?.sponsors?.length > 0 && renderTemplate`<section class="sponsors"> <h2>Sponsorer</h2> <div class="sponsors__grid"> ${hjemmeside.sponsors.map((s) => {
    const href = sponsorHref(s);
    const content = renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${s.logoRef && renderTemplate`<img${addAttribute(urlFor(s.logoRef).height(80).url(), "src")}${addAttribute(s.name, "alt")}>`}` })}`;
    return href ? renderTemplate`<a class="sponsor-card"${addAttribute(href, "href")}${addAttribute(s.name, "aria-label")}> ${content} </a>` : renderTemplate`<div class="sponsor-card sponsor-card--static"${addAttribute(s.name, "aria-label")}> ${content} </div>`;
  })} </div> </section>`}`, "hero": async ($$result2) => renderTemplate`<section class="hero-card hero-card--overlay"> <div class="hero-card__grid hero-card__grid--single"> <div class="hero-card__text"> <div class="hero-card__eyebrow">Sidan 1979 · Fiksdal og Rekdal</div> <h1>${heroTitle}</h1> <p class="lead">${heroLead}</p> <div class="hero__actions"> ${heroActions.map((action) => renderTemplate`<a${addAttribute(action.href, "href")} role="button"${addAttribute(action.variant === "secondary" ? "secondary" : void 0, "class")}> ${action.label} </a>`)} </div> </div> </div> </section>` })}`;
}, "/Users/chrorvik/Prosjekt/frbk.org/src/pages/index.astro", void 0);

const $$file = "/Users/chrorvik/Prosjekt/frbk.org/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
