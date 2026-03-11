import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "rjx0b52i",
    dataset: process.env.PUBLIC_SANITY_DATASET || "production",
  },
});
