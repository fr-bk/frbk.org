import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas/index.js";
import { presentationResolve } from "./src/lib/presentation.js";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? "production";

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
            S.listItem()
              .title("Nyheiter")
              .child(
                S.documentTypeList("nyhet")
                  .title("Nyheiter")
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
              ),
            S.listItem()
              .title("Sider i meny")
              .child(
                S.documentList()
                  .title("Sider i meny")
                  .schemaType("side")
                  .apiVersion("2025-01-01")
                  .filter('_type == "side" && coalesce(showInNavigation, true)')
                  .defaultOrdering([{ field: "navigationOrder", direction: "asc" }])
              ),
            S.listItem()
              .title("Andre sider")
              .child(
                S.documentList()
                  .title("Andre sider")
                  .schemaType("side")
                  .apiVersion("2025-01-01")
                  .filter('_type == "side" && !coalesce(showInNavigation, true)')
                  .defaultOrdering([{ field: "title", direction: "asc" }])
              ),
            S.documentTypeListItem("side").title("Alle sider"),
          ]),
    }),
    presentationTool({
      previewUrl: {
        initial: "/",
      },
      resolve: presentationResolve,
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
