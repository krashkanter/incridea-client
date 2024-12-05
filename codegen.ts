import { CodegenConfig } from "@graphql-codegen/cli";

import { env } from "./src/env";

const config: CodegenConfig = {
  schema: [
    {
      [`${env.NEXT_PUBLIC_SERVER_URL}/graphql`]: {
        headers: {
          Authorization: `Bearer ${env.SCHEMA_TOKEN}`,
        },
      },
    },
  ],
  documents: "./src/**/*.graphql",
  generates: {
    "./src/generated/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
  config: {
    scalars: {
      DateTime: "Date",
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};

export default config;
