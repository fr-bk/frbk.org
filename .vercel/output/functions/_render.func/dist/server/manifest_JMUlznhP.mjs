import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_CMw5sewy.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BBnV3OMZ.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/chrorvik/Prosjekt/frbk.org/","cacheDir":"file:///Users/chrorvik/Prosjekt/frbk.org/node_modules/.astro/","outDir":"file:///Users/chrorvik/Prosjekt/frbk.org/dist/","srcDir":"file:///Users/chrorvik/Prosjekt/frbk.org/src/","publicDir":"file:///Users/chrorvik/Prosjekt/frbk.org/public/","buildClientDir":"file:///Users/chrorvik/Prosjekt/frbk.org/dist/client/","buildServerDir":"file:///Users/chrorvik/Prosjekt/frbk.org/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/chat","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/chat\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"chat","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/chat.js","pathname":"/api/chat","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/nyheter/[slug]","isIndex":false,"type":"page","pattern":"^\\/nyheter\\/([^/]+?)\\/?$","segments":[[{"content":"nyheter","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/nyheter/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/nyheter","isIndex":true,"type":"page","pattern":"^\\/nyheter\\/?$","segments":[[{"content":"nyheter","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/nyheter/index.astro","pathname":"/nyheter","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{margin:0;padding:0}\n"}],"routeData":{"type":"page","isIndex":false,"route":"/studio/[...params]","pattern":"^\\/studio(?:\\/(.*?))?\\/?$","segments":[[{"content":"studio","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@sanity/astro/dist/studio/studio-route.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/[slug]","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/?$","segments":[[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://frbk.org","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/chrorvik/Prosjekt/frbk.org/node_modules/@sanity/astro/dist/studio/studio-route.astro",{"propagation":"none","containsHead":true}],["/Users/chrorvik/Prosjekt/frbk.org/src/pages/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/chrorvik/Prosjekt/frbk.org/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/chrorvik/Prosjekt/frbk.org/src/pages/nyheter/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/chrorvik/Prosjekt/frbk.org/src/pages/nyheter/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/chat@_@js":"pages/api/chat.astro.mjs","\u0000@astro-page:src/pages/nyheter/[slug]@_@astro":"pages/nyheter/_slug_.astro.mjs","\u0000@astro-page:src/pages/nyheter/index@_@astro":"pages/nyheter.astro.mjs","\u0000@astro-page:node_modules/@sanity/astro/dist/studio/studio-route@_@astro":"pages/studio/_---params_.astro.mjs","\u0000@astro-page:src/pages/[slug]@_@astro":"pages/_slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_JMUlznhP.mjs","/Users/chrorvik/Prosjekt/frbk.org/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Dy27Vouh.mjs","/Users/chrorvik/Prosjekt/frbk.org/node_modules/@sanity/astro/dist/visual-editing/visual-editing-component":"_astro/visual-editing-component.BxyPWyyq.js","@astrojs/react/client.js":"_astro/client.D75h_c__.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/resources2.js":"_astro/resources2.z2LjOoLF.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/resources7.js":"_astro/resources7.BHmPcXiL.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/resources6.js":"_astro/resources6.CSyH6Cbz.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/VideoPlayer.js":"_astro/VideoPlayer.BvgBYULD.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/resources4.js":"_astro/resources4.a1jXFXkY.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/resources.js":"_astro/resources.DiaPX3wC.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/resources5.js":"_astro/resources5.DFDBsCkU.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/resources3.js":"_astro/resources3.B90lZRw9.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/ViteDevServerStopped.js":"_astro/ViteDevServerStopped.senK3hUQ.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/refractor/lang/bash.js":"_astro/bash.CG6S6Dwl.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/refractor/lang/json.js":"_astro/json.unC8z3UW.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/refractor/lang/jsx.js":"_astro/jsx.B6rkBCHQ.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/refractor/lang/typescript.js":"_astro/typescript.TImZN0qJ.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/refractor/lang/javascript.js":"_astro/javascript.BJ-GTedN.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/@sanity/client/dist/_chunks-es/stegaEncodeSourceMap.js":"_astro/stegaEncodeSourceMap.Cq6KRRCq.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/@sanity/ui/dist/_chunks-es/refractor.mjs":"_astro/refractor.mDj3oRBq.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/react-refractor/dist/index.js":"_astro/index.ifDekBUj.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/index2.js":"_astro/index2.DEhrqHaC.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/index3.js":"_astro/index3.CooAZ0yf.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/index4.js":"_astro/index4.td9RhSJY.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/resources9.js":"_astro/resources9.BYBeJXDT.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/BroadcastDisplayedDocument.js":"_astro/BroadcastDisplayedDocument.BY6_116n.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/@sanity/vision/lib/_chunks-es/resources.js":"_astro/resources.D_TrSze2.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/@sanity/vision/lib/_chunks-es/SanityVision.js":"_astro/SanityVision.BZWPU5xl.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/resources8.js":"_astro/resources8.CLu3BKqz.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/@sanity/astro/node_modules/@sanity/ui/dist/_chunks-es/refractor.mjs":"_astro/refractor.DBTietP5.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/QRCodeSVG.js":"_astro/QRCodeSVG.ikXiPigA.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/LiveQueries.js":"_astro/LiveQueries.BdqBUyWa.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/PostMessageDocuments.js":"_astro/PostMessageDocuments.I3jBNHdV.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/PostMessageRefreshMutations.js":"_astro/PostMessageRefreshMutations.CrPNC3J6.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/PostMessagePerspective.js":"_astro/PostMessagePerspective.BWQb5d5E.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/PostMessagePreviewSnapshots.js":"_astro/PostMessagePreviewSnapshots.BNd7SndR.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/PostMessageSchema.js":"_astro/PostMessageSchema.CiZoU9V_.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/lib/_chunks-es/PostMessageTelemetry.js":"_astro/PostMessageTelemetry.sB10cDWV.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/sanity/node_modules/urlpattern-polyfill/index.js":"_astro/index.DPyTNidZ.js","/Users/chrorvik/Prosjekt/frbk.org/node_modules/@sanity/astro/dist/studio/studio-component":"_astro/studio-component.BU-hATaL.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/lag.json","/_astro/BroadcastDisplayedDocument.BY6_116n.js","/_astro/DisplayedDocumentBroadcaster.B-aoMTs4.js","/_astro/LiveQueries.BdqBUyWa.js","/_astro/PostMessageDocuments.I3jBNHdV.js","/_astro/PostMessagePerspective.BWQb5d5E.js","/_astro/PostMessagePreviewSnapshots.BNd7SndR.js","/_astro/PostMessageRefreshMutations.CrPNC3J6.js","/_astro/PostMessageSchema.CiZoU9V_.js","/_astro/PostMessageTelemetry.sB10cDWV.js","/_astro/PresentationToolGrantsCheck.rrrxGdFN.js","/_astro/QRCodeSVG.ikXiPigA.js","/_astro/SanityVision.BZWPU5xl.js","/_astro/VideoPlayer.BvgBYULD.js","/_astro/ViteDevServerStopped.senK3hUQ.js","/_astro/bash.CG6S6Dwl.js","/_astro/browser.lMsfJV3V.js","/_astro/client.7PiuiyYU.js","/_astro/client.D75h_c__.js","/_astro/index.DA9N4QZV.js","/_astro/index.DPyTNidZ.js","/_astro/index.DbE_bXrC.js","/_astro/index.ifDekBUj.js","/_astro/index2.DEhrqHaC.js","/_astro/index3.CooAZ0yf.js","/_astro/index4.td9RhSJY.js","/_astro/javascript.BJ-GTedN.js","/_astro/json.unC8z3UW.js","/_astro/jsx.B6rkBCHQ.js","/_astro/refractor.DBTietP5.js","/_astro/refractor.mDj3oRBq.js","/_astro/resources.D_TrSze2.js","/_astro/resources.DiaPX3wC.js","/_astro/resources2.z2LjOoLF.js","/_astro/resources3.B90lZRw9.js","/_astro/resources4.a1jXFXkY.js","/_astro/resources5.DFDBsCkU.js","/_astro/resources6.CSyH6Cbz.js","/_astro/resources7.BHmPcXiL.js","/_astro/resources8.CLu3BKqz.js","/_astro/resources9.BYBeJXDT.js","/_astro/stegaEncodeSourceMap.Cq6KRRCq.js","/_astro/studio-component.BU-hATaL.js","/_astro/studio-component.NpKcibkt.js","/_astro/typescript.TImZN0qJ.js","/_astro/visual-editing-component.BxyPWyyq.js","/css/custom.css","/js/chat.js","/js/theme.js","/img/FRBK-1.png","/img/FRBK.svg","/img/fairplay.jpg","/img/fairplay.png","/img/fotball-mørk.jpg","/img/hero-fotballbane.jpg","/img/kvalitetsklubb.png","/img/sponsor-mfk.png","/img/sponsor-sbm.png","/img/frbk/FairPlay-2025.jpeg","/img/frbk/G12-lag.jpeg","/img/frbk/cup-25.jpeg","/img/frbk/konf-klubbhuset.jpeg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"48y5dJ0e7B1DvL63OB1BiB97WRbRREZ81tLXbNHWKJk="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
