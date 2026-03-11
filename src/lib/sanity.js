import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

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
