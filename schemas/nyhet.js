export default {
  name: "nyhet",
  title: "Nyheit",
  type: "document",
  groups: [
    { name: "content", title: "Innhald", default: true },
    { name: "media", title: "Bilete" },
    { name: "settings", title: "Innstillingar" },
    { name: "seo", title: "SEO / Deling" },
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
      fields: [
        {
          name: "alt",
          title: "Alt-tekst",
          type: "string",
          description: "Beskriv kva som er på biletet. Viktig for skjermlesarar og Google.",
          validation: (Rule) =>
            Rule.required().warning(
              "Alt-tekst manglar – dette er viktig for tilgjengelegheit og SEO"
            ),
        },
      ],
    },
    {
      name: "body",
      title: "Innhald",
      type: "array",
      description: "Hovudinnhaldet i nyheita.",
      group: "content",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt-tekst",
              type: "string",
              description: "Beskriv kva som er på biletet.",
              validation: (Rule) =>
                Rule.required().warning("Hugs å leggje til alt-tekst på alle bilete"),
            },
          ],
        },
      ],
    },
    {
      name: "metaDescription",
      title: "Metabeskriving",
      type: "text",
      rows: 2,
      group: "seo",
      description:
        "Kort beskriving for Google og sosiale medium (120–160 teikn). Fell tilbake på ingressen om tom.",
      validation: (Rule) =>
        Rule.max(160).warning("Over 160 teikn – Google kutter teksten i søkeresultatet"),
    },
    {
      name: "ogImage",
      title: "Delingsbilete",
      type: "image",
      group: "seo",
      description:
        "Biletet som visast når nyheita delast på Facebook, Messenger osv. Fell tilbake på toppbiletet.",
      options: { hotspot: true },
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
