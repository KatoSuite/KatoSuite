import { test, expect } from "bun:test";
import { GET } from "../app/api/github/oauth/callback/route";
import db from "../server/db";

test("returns 400 when code is missing", async () => {
  const req = new Request("http://localhost/api/github/oauth/callback");
  const res = await GET(req);
  expect(res.status).toBe(400);
});

test("stores token, links user and redirects", async () => {
  const originalFetch = global.fetch;
  const originalGetUser = db.getUser;
  const originalSaveUser = db.saveUser;

  db.getUser = async () => undefined;
  let saved: any = null;
  db.saveUser = async (user: any) => { saved = user; return user; };

  global.fetch = async (url: any) => {
    const u = url.toString();
    if (u.includes("access_token")) {
      return new Response(JSON.stringify({ access_token: "token123" }), { status: 200 });
    }
    if (u.includes("api.github.com/user")) {
      return new Response(JSON.stringify({ id: 99 }), { status: 200 });
    }
    throw new Error("Unexpected fetch url");
  };

  const req = new Request("http://localhost/api/github/oauth/callback?code=abc");
  const res = await GET(req);

  expect(res.status).toBe(302);
  expect(res.headers.get("Location")).toBe("/dashboard");
  expect(saved).not.toBeNull();
  expect(saved.githubId).toBe(99);
  expect(saved.accessToken).toBe("token123");
  expect(res.headers.get("Set-Cookie")!).toContain("session=" + encodeURIComponent(saved.id));

  global.fetch = originalFetch;
  db.getUser = originalGetUser;
  db.saveUser = originalSaveUser;
});
