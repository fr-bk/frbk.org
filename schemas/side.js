const RESERVED_SLUGS = ["studio", "nyheter"];

export default {
  name: "side",
  title: "Side",
  type: "document",
  groups: [
    { name: "content", title: "Innhald", default: true },
    { name: "hero", title: "Toppfelt" },
    { name: "navigation", title: "Meny" },
    { name: "settings", title: "Innstillingar" },
    { name: "seo", title: "SEO / Deling" },
  ],
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      description: "Overskrifta på sida.",
      group: "content",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL-adresse",
      type: "slug",
      description: "Døme: om-klubben eller fair-play",
      group: "settings",
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
      description: "Valfritt bilete i toppen av sida.",
      group: "hero",
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
      name: "showInNavigation",
      title: "Vis i hovedmeny",
      type: "boolean",
      description: "Skru av for sider som ikkje skal visast i toppmenyen.",
      group: "navigation",
      initialValue: true,
    },
    {
      name: "navigationTitle",
      title: "Menytittel",
      type: "string",
      group: "navigation",
      hidden: ({ document }) => document?.showInNavigation === false,
      description: "Valfri kort tittel i menyen. Bruker sidetittel om tom.",
    },
    {
      name: "navigationOrder",
      title: "Menyrekkefølge",
      type: "number",
      group: "navigation",
      hidden: ({ document }) => document?.showInNavigation === false,
      description: "Lavere tall vises først i hovedmenyen.",
      initialValue: 100,
    },
    {
      name: "heroPosition",
      title: "Bileteposisjon",
      type: "string",
      group: "hero",
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
      description: "Hovudinnhaldet på sida.",
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
        "Kort beskriving for Google og sosiale medium (120–160 teikn).",
      validation: (Rule) =>
        Rule.max(160).warning("Over 160 teikn – Google kutter teksten i søkeresultatet"),
    },
    {
      name: "ogImage",
      title: "Delingsbilete",
      type: "image",
      group: "seo",
      description:
        "Biletet som visast når sida delast på Facebook, Messenger osv. Fell tilbake på toppbiletet.",
      options: { hotspot: true },
    },
  ],
  orderings: [
    {
      title: "Menyrekkefølge",
      name: "navigationOrderAsc",
      by: [{ field: "navigationOrder", direction: "asc" }],
    },
    {
      title: "Tittel",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      navTitle: "navigationTitle",
      slug: "slug.current",
      hidden: "showInNavigation",
    },
    prepare({ title, navTitle, slug, hidden }) {
      return {
        title,
        subtitle: `${slug ? `/${slug}/` : ""}${hidden === false ? " · skjult frå meny" : navTitle ? ` · ${navTitle}` : ""}`,
      };
    },
  },
};
