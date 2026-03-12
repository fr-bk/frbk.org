import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_JFrKArp8.mjs';
import { manifest } from './manifest_JMUlznhP.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/chat.astro.mjs');
const _page2 = () => import('./pages/nyheter/_slug_.astro.mjs');
const _page3 = () => import('./pages/nyheter.astro.mjs');
const _page4 = () => import('./pages/studio/_---params_.astro.mjs');
const _page5 = () => import('./pages/_slug_.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/chat.js", _page1],
    ["src/pages/nyheter/[slug].astro", _page2],
    ["src/pages/nyheter/index.astro", _page3],
    ["node_modules/@sanity/astro/dist/studio/studio-route.astro", _page4],
    ["src/pages/[slug].astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "c865813b-a073-4288-b578-6f90e1c9cedd",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
