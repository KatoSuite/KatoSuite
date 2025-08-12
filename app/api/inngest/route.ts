import { serve } from "inngest/next";
import { client } from "../../../src/inngest/client";
import { helloWorld } from "../../../src/inngest/functions/helloWorld";
import { keywordRefresh } from "../../../src/inngest/functions/keywordRefresh";

export const { GET, POST, PUT } = serve({
  client,
  functions: [helloWorld, keywordRefresh],
});
