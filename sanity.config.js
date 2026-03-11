import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas/index.js";

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  projectId,
  dataset,
  title: "FRBK",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Innhald")
          .items([
            S.listItem()
              .title("Framside")
              .child(
                S.document()
                  .schemaType("hjemmeside")
                  .documentId("hjemmeside-singleton")
              ),
            S.divider(),
            S.documentTypeListItem("nyhet").title("Nyheter"),
            S.documentTypeListItem("side").title("Sider"),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
