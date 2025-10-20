import { execute } from "@/inngest/functions";
import { inngest } from "@/src/inngest/client";
import { serve } from "inngest/next";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [execute],
});
