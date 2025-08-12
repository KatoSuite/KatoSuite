import { client } from "../client";

export const keywordRefresh = client.createFunction(
  { id: "keyword-refresh", name: "Keyword Refresh" },
  { cron: "0 0 * * *" },
  async ({ step }) => {
    const headers = {
      "x-vercel-protection-bypass":
        process.env.VERCEL_PROTECTION_BYPASS_FOR_INNGEST ?? "",
    };

    const trends = await step.run("fetch trends", async () => {
      const res = await fetch(`${process.env.VERCEL_URL}/api/trends`, {
        headers,
      });
      return res.json();
    });

    await step.run("refresh keywords", async () => {
      await fetch(`${process.env.VERCEL_URL}/api/keywords`, {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trends }),
      });
    });
  }
);
