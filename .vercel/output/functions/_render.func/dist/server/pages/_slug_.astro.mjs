import '../chunks/page-ssr_k0sCC2B0.mjs';
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, l as Fragment } from '../chunks/astro/server_CMw5sewy.mjs';
import 'piccolore';
import { l as loadQuery, s as sideBySlugQuery, u as urlFor, $ as $$BaseLayout } from '../chunks/BaseLayout_DIgIIHFt.mjs';
import { $ as $$PortableText } from '../chunks/PortableText_DP7qQDap.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://frbk.org");
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const side = await loadQuery(sideBySlugQuery, { slug });
  if (!side) {
    Astro2.response.status = 404;
  }
  const heroImage = side?.heroImageRef ? urlFor(side.heroImageRef).width(1600).url() : "/img/hero-fotballbane.jpg";
  const heroPosition = side?.heroPosition ?? "center";
  const pageDescription = side?.metaDescription || null;
  const ogImage = side?.ogImageRef ? urlFor(side.ogImageRef).width(1200).height(630).url() : side?.heroImageRef ? urlFor(side.heroImageRef).width(1200).height(630).url() : null;
  const pageEnhancements = {
    "om-klubben": {
      eyebrow: "Klubben v\xE5r",
      intro: "Ei lokal fotballhistorie bygd p\xE5 frivilligheit, fellesskap og generasjonar med engasjement.",
      highlights: ["Stifta i 1979", "Kvalitetsklubb sidan 2020", "Trygg og inkluderande klubbkultur"]
    },
    "fair-play": {
      eyebrow: "Verdigrunnlag",
      intro: "Fair Play er ikkje berre kampreglar, men m\xE5ten vi m\xF8ter spelarar, dommarar, foreldre og motstandarar p\xE5.",
      highlights: ["Respekt i alle ledd", "Trygg arena for barn og unge", "Klare forventningar til trenarar og foreldre"]
    },
    kontakt: {
      eyebrow: "Kontakt",
      intro: null,
      highlights: []
    },
    styre: {
      eyebrow: "Organisering",
      intro: "Her finn du styret i Fiksdal/Rekdal ballklubb og kven som har dei ulike rollene i klubbarbeidet.",
      highlights: []
    },
    utleie: {
      eyebrow: "Klubbhuset",
      intro: "Informasjon om leige av klubbhuset, praktiske vilk\xE5r og dokument som gjeld for leigetakarar.",
      highlights: []
    },
    dokumenter: {
      eyebrow: "Dokumentarkiv",
      intro: null,
      highlights: []
    }
  };
  const enhancement = pageEnhancements[slug] ?? {
    eyebrow: "Informasjon",
    intro: null,
    highlights: []
  };
  const contactCards = side?.contactCards ?? [];
  const documents = side?.documents ?? [];
  const clubFacts = side?.clubFacts ?? [];
  const milestones = side?.milestones ?? [];
  const notablePlayers = side?.notablePlayers ?? [];
  const boardMembers = side?.boardMembers ?? [];
  const displayedClubFacts = slug === "om-klubben" ? clubFacts.filter((fact) => fact?.label !== "Tilbod").slice(0, 3) : clubFacts;
  const hasStructuredSections = contactCards.length > 0 || documents.length > 0 || clubFacts.length > 0 || milestones.length > 0 || notablePlayers.length > 0 || boardMembers.length > 0;
  const shouldRenderHighlights = enhancement.highlights.length > 0 && !hasStructuredSections;
  const shouldRenderBody = side?.body?.length > 0 && !(slug === "kontakt" && contactCards.length > 0);
  const sanitizePhoneHref = (value = "") => value.replace(/[^\d+]/g, "");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": side?.title ?? "Sida finst ikkje", "heroImage": heroImage, "heroPosition": heroPosition, "description": pageDescription, "ogImage": ogImage }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article${addAttribute(`prose prose--page prose--${slug ?? "generic"}`, "class")}> ${side ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <header class="page-header page-header--rich"> <div class="page-header__meta">${enhancement.eyebrow}</div> <h1>${side.title}</h1> ${enhancement.intro && renderTemplate`<p class="lead">${enhancement.intro}</p>`} </header> ${shouldRenderHighlights && renderTemplate`<section class="page-highlights" aria-label="Hovudpunkt"> ${enhancement.highlights.map((item) => renderTemplate`<div class="page-highlight">${item}</div>`)} </section>`}${boardMembers.length > 0 && renderTemplate`<section class="info-section" aria-labelledby="board-title"> <div class="section-intro"> <div class="section-intro__eyebrow">Styret</div> <h2 id="board-title">Styret</h2> </div> <div class="contact-grid"> ${boardMembers.map((member) => renderTemplate`<article class="contact-card"> <div class="contact-card__role">${member.role}</div> <h3>${member.name}</h3> <div class="contact-card__details"> ${member.phone && renderTemplate`<a${addAttribute(`tel:${sanitizePhoneHref(member.phone)}`, "href")}>${member.phone}</a>`} ${member.email && renderTemplate`<a${addAttribute(`mailto:${member.email}`, "href")}>${member.email}</a>`} </div> </article>`)} </div> </section>`}${displayedClubFacts.length > 0 && renderTemplate`<section class="info-section info-section--facts" aria-labelledby="club-facts-title"> <div class="section-intro"> <div class="section-intro__eyebrow">Klubbfakta</div> <h2 id="club-facts-title">Kort om klubben</h2> </div> <div class="facts-grid"> ${displayedClubFacts.map((fact) => renderTemplate`<article class="fact-card"> <div class="fact-card__label">${fact.label}</div> <div class="fact-card__value">${fact.value}</div> </article>`)} </div> </section>`}${contactCards.length > 0 && renderTemplate`<section class="info-section" aria-label="Kontaktpersonar"> <div class="section-intro"> <div class="section-intro__eyebrow">Kontaktpersonar</div> </div> <div class="contact-grid"> ${contactCards.map((card) => renderTemplate`<article class="contact-card"> <div class="contact-card__role">${card.role ?? "Kontaktperson"}</div> <h3>${card.name}</h3> <div class="contact-card__details"> ${card.phone && renderTemplate`<a${addAttribute(`tel:${sanitizePhoneHref(card.phone)}`, "href")}>${card.phone}</a>`} ${card.email && renderTemplate`<a${addAttribute(`mailto:${card.email}`, "href")}>${card.email}</a>`} ${card.linkUrl && renderTemplate`<a${addAttribute(card.linkUrl, "href")} target="_blank" rel="noreferrer"> ${card.linkLabel ?? "Opne lenke"} </a>`} </div> </article>`)} </div> </section>`}${documents.length > 0 && renderTemplate`<section class="info-section" aria-label="Dokument"> <div class="section-intro"> <div class="section-intro__eyebrow">Dokument</div> </div> <div class="document-list"> ${documents.map((document) => renderTemplate`<article class="document-card"> <div class="document-card__year">${document.year ?? "Dokument"}</div> <div class="document-card__body"> <h3>${document.title}</h3> <a${addAttribute(document.url, "href")} target="_blank" rel="noreferrer">
Opne dokument
</a> </div> </article>`)} </div> </section>`}${shouldRenderBody && renderTemplate`<div class="prose__body prose__body--surface">${renderComponent($$result3, "PortableText", $$PortableText, { "value": side.body })}</div>`}${notablePlayers.length > 0 && renderTemplate`<section class="info-section info-section--players" aria-labelledby="players-title"> <div class="section-intro"> <div class="section-intro__eyebrow">Stoltheit</div> <h2 id="players-title">Spelarar som har utmerka seg</h2> </div> <div class="players-grid"> ${notablePlayers.map((player) => renderTemplate`<article class="player-card"> ${player.photoRef && renderTemplate`<div class="player-card__photo"> <img${addAttribute(urlFor(player.photoRef).width(160).height(160).fit("crop").url(), "src")}${addAttribute(player.photoRef.alt ?? player.name, "alt")} width="160" height="160"> </div>`} <div class="player-card__body"> <h3>${player.name}</h3> <div class="player-card__stats"> ${player.caps && renderTemplate`<div class="player-stat"> <span class="player-stat__value">${player.caps}</span> <span class="player-stat__label">A-landskampar</span> </div>`} </div> ${player.clubs && renderTemplate`<p class="player-card__clubs">${player.clubs}</p>`} ${player.description && renderTemplate`<p class="player-card__desc">${player.description}</p>`} </div> </article>`)} </div> </section>`}${milestones.length > 0 && renderTemplate`<section class="info-section info-section--timeline" aria-labelledby="milestones-title"> <div class="section-intro"> <div class="section-intro__eyebrow">Heider og prisar</div> <h2 id="milestones-title">Utmerkingar</h2> </div> <div class="timeline"> ${milestones.map((milestone) => renderTemplate`<article class="timeline-item"> <div class="timeline-item__year">${milestone.year}</div> <div class="timeline-item__content"> <h3>${milestone.title}</h3> ${milestone.text && renderTemplate`<p>${milestone.text}</p>`} </div> </article>`)} </div> </section>`}` })}` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <h1>Sida finst ikkje</h1> <p>Vi fann ikkje sida du prøvde å opne.</p> ` })}`} </article> ` })}`;
}, "/Users/chrorvik/Prosjekt/frbk.org/src/pages/[slug].astro", void 0);

const $$file = "/Users/chrorvik/Prosjekt/frbk.org/src/pages/[slug].astro";
const $$url = "/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
