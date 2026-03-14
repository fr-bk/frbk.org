import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import sanity from "@sanity/astro";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

export default defineConfig({
  output: "server",
  adapter: vercel({ webAnalytics: { enabled: true } }),
  site: "https://frbk.org",
  integrations: [
    react(),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET ?? "production",
      useCdn: true,
      studioBasePath: "/studio",
      stega: {
        studioUrl: "/studio",
        enabled: process.env.NODE_ENV !== "production",
      },
    }),
  ],
});
