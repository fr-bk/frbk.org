export default {
  name: "nyhet",
  title: "Nyheit",
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
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Publisert",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "summary",
      title: "Ingress (kort tekst under tittel)",
      type: "text",
      rows: 3,
    },
    {
      name: "heroImage",
      title: "Bilete",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "body",
      title: "Innhald",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    },
  ],
  orderings: [
    {
      title: "Nyaste først",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "publishedAt", media: "heroImage" },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date
          ? new Date(date).toLocaleDateString("nb-NO", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "Ingen dato",
        media,
      };
    },
  },
};
