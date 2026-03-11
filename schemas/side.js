const RESERVED_SLUGS = ["studio", "nyheter"];

export default {
  name: "side",
  title: "Side",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL-adresse",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (RESERVED_SLUGS.includes(slug?.current)) {
            return "Denne URL-adressa er reservert av systemet";
          }
          return true;
        }),
    },
    {
      name: "heroImage",
      title: "Bilete (topp)",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "heroPosition",
      title: "Bileteposisjon",
      type: "string",
      options: {
        list: [
          { title: "Midtstilt", value: "center" },
          { title: "Øvst", value: "top" },
          { title: "Nedst", value: "bottom" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "center",
    },
    {
      name: "body",
      title: "Innhald",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    },
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }) {
      return { title, subtitle: slug ? `/${slug}/` : "" };
    },
  },
};
