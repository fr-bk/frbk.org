export default {
  name: "hjemmeside",
  title: "Framside",
  type: "document",
  // Singleton – tillét berre oppdatering og publisering, ikkje oppretting/sletting
  __experimental_actions: ["update", "publish"],
  fields: [
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
      name: "heroTitle",
      title: "Tittel (over biletet)",
      type: "string",
      initialValue: "Fiksdal/Rekdal ballklubb",
    },
    {
      name: "heroLead",
      title: "Ingress (under tittel)",
      type: "string",
      initialValue: "Ein inkluderande fotballklubb for barn, unge og vaksne.",
    },
    {
      name: "sponsors",
      title: "Sponsorar",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Namn", type: "string" },
            { name: "url", title: "Nettadresse", type: "url" },
            {
              name: "logo",
              title: "Logo",
              type: "image",
              options: { hotspot: false },
            },
          ],
          preview: {
            select: { title: "name", media: "logo" },
          },
        },
      ],
    },
  ],
};
