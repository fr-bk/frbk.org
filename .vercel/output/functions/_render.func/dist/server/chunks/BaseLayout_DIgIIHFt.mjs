import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent, o as renderSlot, n as renderHead } from './astro/server_CMw5sewy.mjs';
import 'piccolore';
import 'clsx';
import { s as sanityClient } from './page-ssr_k0sCC2B0.mjs';
import { stegaClean } from '@sanity/client/stega';
import imageUrlBuilder from '@sanity/image-url';

const visualEditingEnabled = true;
const previewToken = "skXsp2Jx5CxeMvXBtu1AOSXAUuaFQvkYNwVNj1HiK37rwTBKj17FHAWZM2Wv35k3m5ko8MemKtIFqMf6uFIarpRMdsDxb4m56viPn8pjdJ9r3T60HWyVRjDR3pXwHObFtynlyA855XioF1foRSvw1jOV2upwLTanJyw9MVkpItrqmOy44ZIG";
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
function cleanStega(value) {
  return stegaClean(value);
}
async function loadQuery(query, params = {}) {
  const options = {
    filterResponse: false,
    perspective: "drafts" ,
    resultSourceMap: "withKeyArraySelector" ,
    stega: visualEditingEnabled,
    ...{ token: previewToken } ,
    useCdn: !visualEditingEnabled
  };
  const result = await sanityClient.fetch(query, params, options);
  return result.result;
}
const presentationEnabled = visualEditingEnabled;

const $$Astro$2 = createAstro("https://frbk.org");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const { navigationPages = [], facebookUrl = null } = Astro2.props;
  const { pathname } = Astro2.url;
  const cleanFacebookUrl = facebookUrl ? cleanStega(facebookUrl) : null;
  return renderTemplate`${maybeRenderHead()}<header class="container"> <nav class="site-nav" aria-label="Hovedmeny"> <ul class="nav-brand"> <li> <strong> <a class="site-logo-link" href="/" aria-label="Hjem"> <img class="site-logo" src="/img/FRBK.svg" alt="FRBK logo"> </a> </strong> </li> </ul> <ul id="site-nav-links" class="nav-links"> <li><a href="/"${addAttribute(pathname === "/" ? "page" : void 0, "aria-current")}>Heim</a></li> <li><a href="/nyheter/"${addAttribute(pathname.startsWith("/nyheter") ? "page" : void 0, "aria-current")}>Nyheiter</a></li> ${navigationPages.map((page) => {
    const slug = cleanStega(page.slug);
    const label = cleanStega(page.navigationTitle ?? page.title);
    return renderTemplate`<li><a${addAttribute(`/${slug}/`, "href")}${addAttribute(pathname === `/${slug}/` ? "page" : void 0, "aria-current")}>${label}</a></li>`;
  })} ${cleanFacebookUrl && renderTemplate`<li class="nav-links__facebook"> <a${addAttribute(cleanFacebookUrl, "href")} target="_blank" rel="noopener noreferrer" aria-label="FRBK på Facebook"> <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false" style="vertical-align: -2px; margin-right: 0.35rem;"> <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"></path> </svg>
Facebook
</a> </li>`} </ul> <div class="nav-actions"> ${cleanFacebookUrl && renderTemplate`<a${addAttribute(cleanFacebookUrl, "href")} class="nav-facebook nav-facebook--desktop" aria-label="FRBK på Facebook" target="_blank" rel="noopener noreferrer" title="Facebook"> <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false"> <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"></path> </svg> </a>`} <button class="theme-toggle" type="button" aria-label="Bytt tema" title="Bytt tema" aria-pressed="false"> <svg class="theme-icon theme-icon--sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false"> <circle cx="12" cy="12" r="4.5"></circle> <path d="M12 2.5v2.5M12 19v2.5M4.5 12H2M22 12h-2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"></path> </svg> <svg class="theme-icon theme-icon--moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"> <path d="M20.5 15.6a8.5 8.5 0 1 1-8.1-12 7 7 0 1 0 8.1 12z"></path> </svg> </button> <button class="menu-toggle" type="button" aria-label="Meny" aria-expanded="false" aria-controls="site-nav-links"> <span class="menu-toggle__bar"></span> <span class="menu-toggle__bar"></span> <span class="menu-toggle__bar"></span> </button> </div> </nav> </header>`;
}, "/Users/chrorvik/Prosjekt/frbk.org/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="container"> <small class="footer-meta"> <span class="footer-title">© ${(/* @__PURE__ */ new Date()).getFullYear()} Fiksdal/Rekdal ballklubb</span> <img class="footer-logo" src="/img/FRBK.svg" alt="FRBK logo"> <span class="footer-tagline">Fotballglede for alle sidan 1979</span> </small> </footer>`;
}, "/Users/chrorvik/Prosjekt/frbk.org/src/components/Footer.astro", void 0);

const $$Astro$1 = createAstro("https://frbk.org");
const $$VisualEditing = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$VisualEditing;
  const { enabled, zIndex } = Astro2.props;
  return renderTemplate`${enabled ? renderTemplate`${renderComponent($$result, "VisualEditingComponent", null, { "client:only": "react", "zIndex": zIndex, "client:component-hydration": "only", "client:component-path": "/Users/chrorvik/Prosjekt/frbk.org/node_modules/@sanity/astro/dist/visual-editing/visual-editing-component", "client:component-export": "VisualEditingComponent" })}` : null}`;
}, "/Users/chrorvik/Prosjekt/frbk.org/node_modules/@sanity/astro/dist/visual-editing/visual-editing.astro", void 0);

/** Alle nyheter, nyaste først */
const allNyheterQuery = `*[_type == "nyhet"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  publishedAt,
  summary,
  "heroImageRef": heroImage
}`;

/** Enkelt nyheit etter slug */
const nyhetBySlugQuery = `*[_type == "nyhet" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  publishedAt,
  summary,
  body,
  "heroImageRef": heroImage,
  metaDescription,
  "ogImageRef": ogImage
}`;

/** Sider som skal visast i hovedmenyen */
const navigationPagesQuery = `*[_type == "side" && coalesce(showInNavigation, true)] | order(coalesce(navigationOrder, 100) asc, title asc) {
  title,
  "slug": slug.current,
  navigationTitle
}`;

/** Enkelt side etter slug */
const sideBySlugQuery = `*[_type == "side" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  body,
  contactCards[] {
    name,
    role,
    phone,
    email,
    linkLabel,
    linkUrl
  },
  documents[] {
    title,
    year,
    url
  },
  clubFacts[] {
    label,
    value
  },
  milestones[] | order(year desc) {
    year,
    title,
    text
  },
  boardMembers[] {
    name,
    role,
    phone,
    email
  },
  notablePlayers[] {
    name,
    caps,
    clubs,
    description,
    "photoRef": photo
  },
  "heroImageRef": heroImage,
  heroPosition,
  metaDescription,
  "ogImageRef": ogImage
}`;

/** Sosiale medium og global konfigurasjon frå framsida */
const globalConfigQuery = `*[_type == "hjemmeside" && _id == "hjemmeside-singleton"][0] {
  facebookUrl
}`;

/** Framsida-singleton */
const hjemmesideQuery = `*[_type == "hjemmeside" && _id == "hjemmeside-singleton"][0] {
  heroTitle,
  heroLead,
  "heroImageRef": heroImage,
  heroPosition,
  heroActions[] {
    label,
    href,
    variant
  },
  newsSectionTitle,
  matchesSectionTitle,
  badges[] {
    title,
    text
  },
  sponsors[] {
    name,
    url,
    "logoRef": logo
  },
  metaDescription,
  "ogImageRef": ogImage
}`;

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://frbk.org");
const $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description,
    ogImage,
    heroImage = "/img/hero-fotballbane.jpg",
    heroPosition = "center",
    isHome = false
  } = Astro2.props;
  const [navigationPages, globalConfig] = await Promise.all([
    loadQuery(navigationPagesQuery),
    loadQuery(globalConfigQuery)
  ]);
  const facebookUrl = globalConfig?.facebookUrl ?? null;
  const siteTitle = "Fiksdal/Rekdal ballklubb";
  const pageTitle = title ? `${cleanStega(title)} | ${siteTitle}` : siteTitle;
  const pageDescription = cleanStega(description) ?? "Fotballglede for alle sidan 1979 \u2013 ein inkluderande fotballklubb i M\xF8re og Romsdal.";
  const siteUrl = Astro2.site ?? "https://frbk.org";
  const canonicalUrl = new URL(Astro2.url.pathname, siteUrl).href;
  const ogImageUrl = cleanStega(ogImage) ?? new URL("/img/hero-fotballbane.jpg", siteUrl).href;
  const cleanHeroImage = cleanStega(heroImage);
  const cleanHeroPosition = cleanStega(heroPosition);
  return renderTemplate(_a || (_a = __template(['<html lang="nb" data-theme="" class="no-js"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>', '</title><meta name="description"', '><link rel="canonical"', '><!-- Open Graph / sosiale medium --><meta property="og:type" content="website"><meta property="og:site_name"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:image"', '><meta name="twitter:card" content="summary_large_image"><!-- Unng\xE5 flash av feil tema ved sidelasting --><script>\n      (function () {\n        document.documentElement.classList.remove("no-js");\n        document.documentElement.classList.add("js");\n        var t = localStorage.getItem("frbk-theme");\n        if (t === "light" || t === "dark") {\n          document.documentElement.setAttribute("data-theme", t);\n        }\n      })();\n    <\/script><link rel="preconnect" href="https://unpkg.com"><link rel="preconnect" href="https://cdn.jsdelivr.net"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2.1.1/css/pico.min.css"><link rel="stylesheet" href="/css/custom.css">', '</head> <body> <a href="#main-content" class="skip-link">Hopp til innhald</a> ', ' <main class="container" id="main-content" tabindex="-1"> ', " </main> ", " ", ' <script src="/js/theme.js" defer><\/script> <script src="/js/chat.js" defer><\/script> </body> </html>'])), pageTitle, addAttribute(pageDescription, "content"), addAttribute(canonicalUrl, "href"), addAttribute(siteTitle, "content"), addAttribute(pageTitle, "content"), addAttribute(pageDescription, "content"), addAttribute(canonicalUrl, "content"), addAttribute(ogImageUrl, "content"), renderHead(), isHome ? renderTemplate`<section class="masthead masthead--hero"${addAttribute(`--masthead-image: url('${cleanHeroImage}'); --masthead-position: ${cleanHeroPosition};`, "style")}> ${renderComponent($$result, "Header", $$Header, { "navigationPages": navigationPages, "facebookUrl": facebookUrl })} <div class="container masthead__content"> ${renderSlot($$result, $$slots["hero"])} </div> </section>` : renderTemplate`<section class="masthead"${addAttribute(`--masthead-image: url('${cleanHeroImage}'); --masthead-position: ${cleanHeroPosition};`, "style")}> ${renderComponent($$result, "Header", $$Header, { "navigationPages": navigationPages, "facebookUrl": facebookUrl })} </section>`, renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), renderComponent($$result, "VisualEditing", $$VisualEditing, { "enabled": presentationEnabled, "zIndex": 1e3 }));
}, "/Users/chrorvik/Prosjekt/frbk.org/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, allNyheterQuery as a, navigationPagesQuery as b, hjemmesideQuery as h, loadQuery as l, nyhetBySlugQuery as n, sideBySlugQuery as s, urlFor as u };
