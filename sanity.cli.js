import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "330w38cx",
    dataset: process.env.PUBLIC_SANITY_DATASET || "production",
  },
});
