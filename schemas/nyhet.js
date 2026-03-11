export default {
  name: "nyhet",
  title: "Nyheit",
  type: "document",
  groups: [
    { name: "content", title: "Innhald", default: true },
    { name: "media", title: "Bilete" },
    { name: "settings", title: "Innstillingar" },
  ],
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      description: "Overskrifta som visast i nyheitslista og på sjølve nyheita.",
      group: "content",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL-adresse",
      type: "slug",
      description: "Bruk korte, enkle ord. Døme: velkommen-til-ny-sesong",
      group: "settings",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Publisert",
      type: "datetime",
      description: "Datoen som visast i nyheitslista.",
      group: "settings",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },
    {
      name: "summary",
      title: "Ingress (kort tekst under tittel)",
      type: "text",
      description: "Kort samandrag som visast på framsida og i nyheitslista.",
      group: "content",
      rows: 3,
    },
    {
      name: "heroImage",
      title: "Bilete",
      type: "image",
      description: "Valfritt toppbilete til nyheita.",
      group: "media",
      options: { hotspot: true },
    },
    {
      name: "body",
      title: "Innhald",
      type: "array",
      description: "Hovudinnhaldet i nyheita.",
      group: "content",
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
