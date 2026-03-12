import { sanityClient } from "sanity:client";
import { stegaClean } from "@sanity/client/stega";
import imageUrlBuilder from "@sanity/image-url";

const visualEditingEnabled =
  import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";
const previewToken = import.meta.env.SANITY_API_READ_TOKEN;

const builder = imageUrlBuilder(sanityClient);

/** Generer bilde-URL frå eit Sanity-bileteref */
export function urlFor(source) {
  return builder.image(source);
}

export function cleanStega(value) {
  return stegaClean(value);
}

export async function loadQuery(query, params = {}) {
  if (visualEditingEnabled && !previewToken) {
    throw new Error(
      "The SANITY_API_READ_TOKEN environment variable is required during Visual Editing."
    );
  }

  const options = {
    filterResponse: false,
    perspective: visualEditingEnabled ? "drafts" : "published",
    resultSourceMap: visualEditingEnabled ? "withKeyArraySelector" : false,
    stega: visualEditingEnabled,
    ...(visualEditingEnabled ? { token: previewToken } : {}),
    useCdn: !visualEditingEnabled,
  };

  const result = await sanityClient.fetch(query, params, options);

  return result.result;
}

export const presentationEnabled = visualEditingEnabled;
