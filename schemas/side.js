const RESERVED_SLUGS = ["studio", "nyheter"];

export default {
  name: "side",
  title: "Side",
  type: "document",
  groups: [
    { name: "content", title: "Innhald", default: true },
    { name: "structured", title: "Innhaldsblokker" },
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
      name: "contactCards",
      title: "Kontaktkort",
      type: "array",
      group: "structured",
      hidden: ({ document }) => document?.slug?.current !== "kontakt",
      description: "Visast som eigne kontaktkort på kontaktsida.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Namn",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "role",
              title: "Rolle",
              type: "string",
            },
            {
              name: "phone",
              title: "Telefon",
              type: "string",
            },
            {
              name: "email",
              title: "E-post",
              type: "string",
            },
            {
              name: "linkLabel",
              title: "Lenketekst",
              type: "string",
            },
            {
              name: "linkUrl",
              title: "Lenke",
              type: "url",
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "role",
            },
          },
        },
      ],
    },
    {
      name: "documents",
      title: "Dokumentliste",
      type: "array",
      group: "structured",
      hidden: ({ document }) => !["dokumenter", "utleie"].includes(document?.slug?.current),
      description: "Dokument som skal visast (PDF, avtalar, reglar o.l.).",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Tittel",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "year",
              title: "År",
              type: "number",
            },
            {
              name: "url",
              title: "Lenke",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "title",
              year: "year",
            },
            prepare({ title, year }) {
              return {
                title,
                subtitle: year ? `${year}` : "Utan årstal",
              };
            },
          },
        },
      ],
    },
    {
      name: "clubFacts",
      title: "Klubbfakta",
      type: "array",
      group: "structured",
      hidden: ({ document }) => document?.slug?.current !== "om-klubben",
      description: "Korte fakta som presenterer klubben tydeleg på sida.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Felt",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "value",
              title: "Verdi",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
        },
      ],
    },
    {
      name: "boardMembers",
      title: "Styremedlemmar",
      type: "array",
      group: "structured",
      hidden: ({ document }) => document?.slug?.current !== "styre",
      description: "Noverande styre. Oppdater kvart år.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Namn",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "role",
              title: "Rolle",
              type: "string",
              description: "T.d. Leiar, Kasserar, Styremedlem",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "phone",
              title: "Telefon",
              type: "string",
            },
            {
              name: "email",
              title: "E-post",
              type: "string",
            },
          ],
          preview: {
            select: { title: "name", subtitle: "role" },
          },
        },
      ],
    },
    {
      name: "notablePlayers",
      title: "Spelarar som har utmerka seg",
      type: "array",
      group: "structured",
      hidden: ({ document }) => document?.slug?.current !== "om-klubben",
      description: "Spelarar frå klubben som har nådd nasjonalt eller internasjonalt nivå.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Namn",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "photo",
              title: "Bilete",
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  title: "Alt-tekst",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required().warning("Hugs alt-tekst på spelarbilete"),
                },
              ],
            },
            {
              name: "caps",
              title: "Landskampar",
              type: "number",
              description: "Antal A-landskampar. Lat stå tom om ukjent.",
            },
            {
              name: "clubs",
              title: "Klubbar",
              type: "string",
              description: "T.d. «Hertha Berlin, Borussia Mönchengladbach»",
            },
            {
              name: "description",
              title: "Beskriving",
              type: "text",
              rows: 3,
            },
          ],
          preview: {
            select: {
              title: "name",
              caps: "caps",
              clubs: "clubs",
            },
            prepare({ title, caps, clubs }) {
              const sub = [caps ? `${caps} A-kampar` : null, clubs]
                .filter(Boolean)
                .join(" · ");
              return { title, subtitle: sub || "Spelar" };
            },
          },
        },
      ],
    },
    {
      name: "milestones",
      title: "Utmerkingar",
      type: "array",
      group: "structured",
      hidden: ({ document }) => document?.slug?.current !== "om-klubben",
      description: "Prisar, æresmedlemmar og viktige milepælar — nyaste øvst.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "year",
              title: "År",
              type: "number",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              title: "Tittel",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "text",
              title: "Kort tekst",
              type: "text",
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: "title",
              year: "year",
            },
            prepare({ title, year }) {
              return {
                title,
                subtitle: year ? `${year}` : "",
              };
            },
          },
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
