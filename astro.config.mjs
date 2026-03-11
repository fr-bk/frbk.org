import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import sanity from "@sanity/astro";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

export default defineConfig({
  output: "static",
  adapter: netlify(),
  site: "https://frbk.org",
  integrations: [
    react(),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET ?? "production",
      useCdn: true,
      studioBasePath: "/studio",
    }),
  ],
});
