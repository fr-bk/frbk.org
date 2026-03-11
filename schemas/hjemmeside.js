export default {
  name: "hjemmeside",
  title: "Framside",
  type: "document",
  __experimental_actions: ["update", "publish"],
  groups: [
    { name: "hero", title: "Toppfelt", default: true },
    { name: "sections", title: "Seksjonar" },
    { name: "sponsors", title: "Sponsorar" },
    { name: "social", title: "Sosiale medium" },
    { name: "seo", title: "SEO / Deling" },
  ],
  fields: [
    {
      name: "heroImage",
      title: "Bilete (topp)",
      type: "image",
      description: "Stort bakgrunnsbilete øvst på framsida.",
      group: "hero",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt-tekst",
          type: "string",
          description: "Beskriv kva som er på biletet. Viktig for skjermlesarar og Google.",
          validation: (Rule) =>
            Rule.required().warning("Alt-tekst manglar – dette er viktig for tilgjengelegheit og SEO"),
        },
      ],
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
      name: "heroTitle",
      title: "Tittel (over biletet)",
      type: "string",
      description: "Hovudoverskrifta på framsida.",
      group: "hero",
      initialValue: "Fiksdal/Rekdal ballklubb",
    },
    {
      name: "heroLead",
      title: "Ingress (under tittel)",
      type: "string",
      description: "Kort tekst under hovudoverskrifta.",
      group: "hero",
      initialValue: "Ein inkluderande fotballklubb for barn, unge og vaksne.",
    },
    {
      name: "heroActions",
      title: "Knappar i toppfeltet",
      type: "array",
      description: "Lenkene som visast under overskrifta på framsida.",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Tekst", type: "string", validation: (Rule) => Rule.required() },
            { name: "href", title: "Lenke", type: "string", validation: (Rule) => Rule.required() },
            {
              name: "variant",
              title: "Stil",
              type: "string",
              options: {
                list: [
                  { title: "Primær", value: "primary" },
                  { title: "Sekundær", value: "secondary" },
                ],
                layout: "radio",
                direction: "horizontal",
              },
              initialValue: "primary",
            },
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    },
    {
      name: "newsSectionTitle",
      title: "Tittel for nyheitsseksjon",
      type: "string",
      group: "sections",
      initialValue: "Siste nyheter",
    },
    {
      name: "matchesSectionTitle",
      title: "Tittel for kampseksjon",
      type: "string",
      group: "sections",
      initialValue: "Kamper",
    },
    {
      name: "badges",
      title: "Merkelappar under hovudinnhald",
      type: "array",
      description: "Små informasjonsboksar under hovudinnhaldet på framsida.",
      group: "sections",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Tittel", type: "string", validation: (Rule) => Rule.required() },
            { name: "text", title: "Tekst", type: "string", validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { title: "title", subtitle: "text" },
          },
        },
      ],
    },
    {
      name: "sponsors",
      title: "Sponsorar",
      type: "array",
      description: "Logoar og lenker som visast i sponsorseksjonen.",
      group: "sponsors",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Namn",
              type: "string",
              description: "Namnet på sponsoren. Brukast som alt-tekst på logoen.",
              validation: (Rule) => Rule.required(),
            },
            { name: "url", title: "Nettadresse", type: "url" },
            {
              name: "logo",
              title: "Logo",
              type: "image",
              description: "Logoen til sponsoren. Alt-tekst vert henta frå 'Namn'-feltet over.",
              options: { hotspot: false },
            },
          ],
          preview: {
            select: { title: "name", media: "logo" },
          },
        },
      ],
    },
    {
      name: "facebookUrl",
      title: "Facebook-lenke",
      type: "url",
      group: "social",
      description: "T.d. https://www.facebook.com/fiksdalrekdalbk – visast som ikon i navigasjonen.",
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
        "Biletet som visast når framsida delast på Facebook, Messenger osv. Fell tilbake på toppbiletet.",
      options: { hotspot: true },
    },
  ],
  preview: {
    select: {
      title: "heroTitle",
      media: "heroImage",
    },
    prepare({ title, media }) {
      return {
        title: title || "Framside",
        subtitle: "Singleton",
        media,
      };
    },
  },
};
