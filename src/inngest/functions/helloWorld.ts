import { client } from "../client";

export const helloWorld = client.createFunction(
  { id: "hello-world", name: "Hello World" },
  { event: "demo/hello.world" },
  async ({ event }) => {
    return { message: `Hello ${event.data?.name ?? "World"}` };
  }
);
