import { defineLocations } from "sanity/presentation";

export const presentationResolve = {
  locations: {
    hjemmeside: defineLocations({
      select: {
        title: "heroTitle",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Framside",
            href: "/",
          },
        ],
      }),
    }),
    side: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => {
        if (!doc?.slug) {
          return null;
        }

        return {
          locations: [
            {
              title: doc?.title || "Side",
              href: `/${doc.slug}/`,
            },
          ],
        };
      },
    }),
    nyhet: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => {
        if (!doc?.slug) {
          return null;
        }

        return {
          locations: [
            {
              title: doc?.title || "Nyheit",
              href: `/nyheter/${doc.slug}/`,
            },
            {
              title: "Nyheiter",
              href: "/nyheter/",
            },
          ],
        };
      },
    }),
  },
};
