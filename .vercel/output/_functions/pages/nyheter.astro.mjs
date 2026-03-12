import '../chunks/page-ssr_k0sCC2B0.mjs';
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as Fragment, h as addAttribute } from '../chunks/astro/server_CMw5sewy.mjs';
import 'piccolore';
import { l as loadQuery, a as allNyheterQuery, $ as $$BaseLayout, u as urlFor } from '../chunks/BaseLayout_DIgIIHFt.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const alleNyheter = await loadQuery(allNyheterQuery);
  const featured = alleNyheter[0] ?? null;
  const archive = alleNyheter.slice(1);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Nyheiter" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header"> <div class="page-header__meta">Klubbnytt</div> <h1>Nyheiter</h1> <p class="lead">Siste nytt frå Fiksdal/Rekdal ballklubb, samla i eit ryddig og lettleseleg arkiv.</p> </div> ${alleNyheter.length > 0 ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${featured && renderTemplate`<a class="news-card news-card--feature"${addAttribute(`/nyheter/${featured.slug}/`, "href")}> ${featured.heroImageRef ? renderTemplate`<img class="news-card__img"${addAttribute(urlFor(featured.heroImageRef).width(960).height(520).url(), "src")}${addAttribute(featured.heroImageRef.alt ?? featured.title, "alt")} width="960" height="520">` : renderTemplate`<div class="news-card__img-placeholder" aria-hidden="true"></div>`} <div class="news-card__body"> <div class="news-card__kicker">Siste sak</div> <time class="news-card__date"${addAttribute(featured.publishedAt, "datetime")}> ${new Date(featured.publishedAt).toLocaleDateString("nb-NO", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  })} </time> <h2 class="news-card__title">${featured.title}</h2> ${featured.summary && renderTemplate`<p class="news-card__summary">${featured.summary}</p>`} </div> <div class="news-card__footer"> <span class="news-card__read">Les saka</span> </div> </a>`}${archive.length > 0 && renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate` <section class="section-intro"> <div> <span class="section-intro__eyebrow">Arkiv</span> <h2>Fleire nyheiter</h2> <p>Eldre saker frå klubbkvardagen, arrangement og aktivitet rundt laga våre.</p> </div> </section> <div class="news-grid"> ${archive.map((n) => renderTemplate`<a class="news-card"${addAttribute(`/nyheter/${n.slug}/`, "href")}> ${n.heroImageRef ? renderTemplate`<img class="news-card__img"${addAttribute(urlFor(n.heroImageRef).width(640).height(360).url(), "src")}${addAttribute(n.heroImageRef.alt ?? n.title, "alt")} width="640" height="360" loading="lazy">` : renderTemplate`<div class="news-card__img-placeholder" aria-hidden="true"></div>`} <div class="news-card__body"> <time class="news-card__date"${addAttribute(n.publishedAt, "datetime")}> ${new Date(n.publishedAt).toLocaleDateString("nb-NO", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  })} </time> <h2 class="news-card__title">${n.title}</h2> ${n.summary && renderTemplate`<p class="news-card__summary">${n.summary}</p>`} </div> <div class="news-card__footer"> <span class="news-card__read">Les meir</span> </div> </a>`)} </div> ` })}`}` })}` : renderTemplate`<div class="empty-state"> <p>Ingen nyheiter enda — sjekk tilbake snart!</p> </div>`}` })}`;
}, "/Users/chrorvik/Prosjekt/frbk.org/src/pages/nyheter/index.astro", void 0);

const $$file = "/Users/chrorvik/Prosjekt/frbk.org/src/pages/nyheter/index.astro";
const $$url = "/nyheter";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
