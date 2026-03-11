import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const visualEditingEnabled =
  import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";
const previewToken = import.meta.env.SANITY_API_READ_TOKEN;
const canLoadDrafts = visualEditingEnabled && Boolean(previewToken);

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  perspective: "published",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

/** Generer bilde-URL frå eit Sanity-bileteref */
export function urlFor(source) {
  return builder.image(source);
}

export async function loadQuery(query, params = {}) {
  const enableOverlays = visualEditingEnabled;
  const options = enableOverlays
    ? {
        filterResponse: false,
        perspective: canLoadDrafts ? "drafts" : "published",
        resultSourceMap: "withKeyArraySelector",
        stega: {
          enabled: true,
          studioUrl: "/studio",
        },
        useCdn: false,
        ...(canLoadDrafts ? { token: previewToken } : {}),
      }
    : {
        perspective: "published",
        useCdn: true,
      };

  const result = await sanityClient.fetch(query, params, options);

  return enableOverlays ? result.result : result;
}

export const presentationEnabled = visualEditingEnabled;
