import '../../chunks/page-ssr_k0sCC2B0.mjs';
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_CMw5sewy.mjs';
import 'piccolore';
import { l as loadQuery, n as nyhetBySlugQuery, u as urlFor, $ as $$BaseLayout } from '../../chunks/BaseLayout_DIgIIHFt.mjs';
import { $ as $$PortableText } from '../../chunks/PortableText_DP7qQDap.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://frbk.org");
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const nyhet = await loadQuery(nyhetBySlugQuery, { slug });
  if (!nyhet) {
    Astro2.response.status = 404;
  }
  const heroImage = nyhet?.heroImageRef ? urlFor(nyhet.heroImageRef).width(1600).url() : "/img/hero-fotballbane.jpg";
  const heroPosition = nyhet?.heroPosition ?? "center";
  const pageDescription = nyhet?.metaDescription || nyhet?.summary || null;
  const ogImage = nyhet?.ogImageRef ? urlFor(nyhet.ogImageRef).width(1200).height(630).url() : nyhet?.heroImageRef ? urlFor(nyhet.heroImageRef).width(1200).height(630).url() : null;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": nyhet?.title ?? "Nyheita finst ikkje", "heroImage": heroImage, "heroPosition": heroPosition, "description": pageDescription, "ogImage": ogImage }, { "default": async ($$result2) => renderTemplate`${nyhet ? renderTemplate`${maybeRenderHead()}<article class="prose"> <header class="article-header article-header--feature"> <div class="page-header__meta">Klubbnytt</div> <time class="article-date"${addAttribute(nyhet.publishedAt, "datetime")}> ${new Date(nyhet.publishedAt).toLocaleDateString("nb-NO", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  })} </time> <h1 class="article-title">${nyhet.title}</h1> ${nyhet.summary && renderTemplate`<p class="article-lead">${nyhet.summary}</p>`} </header> ${nyhet.body && renderTemplate`<div class="prose__body prose__body--surface">${renderComponent($$result2, "PortableText", $$PortableText, { "value": nyhet.body })}</div>`} </article>` : renderTemplate`<article class="prose"> <h1>Nyheita finst ikkje</h1> <p>Vi fann ikkje nyheita du prøvde å opne.</p> </article>`}<a href="/nyheter/" class="back-link">← Alle nyheiter</a> ` })}`;
}, "/Users/chrorvik/Prosjekt/frbk.org/src/pages/nyheter/[slug].astro", void 0);

const $$file = "/Users/chrorvik/Prosjekt/frbk.org/src/pages/nyheter/[slug].astro";
const $$url = "/nyheter/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
