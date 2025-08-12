import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import { verifyGitHubWebhookSignature, installationAccessToken, githubAppJWT } from "../github/auth";
import { log } from "../utils/logger";
import { rateLimit } from "../middleware/rateLimit";
import { db } from "../db";

export const router = express.Router();

router.get("/api/github/oauth/start", rateLimit, (req, res) => {
  const state = Buffer.from(JSON.stringify({ r: req.query.r || "/" })).toString("base64url");
 0gwhhv-codex/set-up-katosuite-github-app
  const redirectUri = `${process.env.BASE_URL}/api/github/oauth/callback`;
  const url =
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_APP_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +

  const url =
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.GITHUB_OAUTH_CALLBACK_URL || "")}` +
 main
    `&scope=read:user,repo&state=${state}`;
  return res.redirect(url);
});

router.get("/api/github/oauth/callback", rateLimit, bodyParser.urlencoded({ extended: false }), async (req, res) => {
  try {
    const code = req.query.code as string;
    if (!code) return res.status(400).send("Missing code");

 0gwhhv-codex/set-up-katosuite-github-app
    const redirectUri = `${process.env.BASE_URL}/api/github/oauth/callback`;

 main
    const r = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new URLSearchParams({
0gwhhv-codex/set-up-katosuite-github-app
        client_id: process.env.GITHUB_APP_CLIENT_ID || "",
        client_secret: process.env.GITHUB_APP_CLIENT_SECRET || "",
        code,
        redirect_uri: redirectUri

        client_id: process.env.GITHUB_OAUTH_CLIENT_ID || "",
        client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET || "",
        code,
        redirect_uri: process.env.GITHUB_OAUTH_CALLBACK_URL || ""
 main
      })
    }).then(r => r.json() as any);

    if (!r.access_token) return res.status(400).send("OAuth exchange failed");

    const ghUser = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${r.access_token}`, Accept: "application/vnd.github+json" }
    }).then(r => r.json());

    const user = (req as any).user || await db.getUserFromSession(req as any);
    if (!user) return res.status(401).send("Login required");

    await db.upsertGitHubAccount({
      user_id: user.id,
      github_user_id: ghUser.id,
      github_login: ghUser.login,
      github_name: ghUser.name,
      avatar_url: ghUser.avatar_url,
      access_token: r.access_token,
      token_scope: r.scope || "",
      token_expires_at: null
    });

    log("oauth_linked user", user.id, "gh", ghUser.login);
    const redirect = (JSON.parse(Buffer.from(String(req.query.state || ""), "base64url").toString() || "{}") as any).r || "/dashboard?connected=github";
    return res.redirect(redirect);
  } catch (e) {
    log("oauth_error", String(e));
    return res.status(500).send("OAuth error");
  }
});

router.get("/api/github/install", rateLimit, (_req, res) => {
  res.redirect(`https://github.com/apps/${process.env.GITHUB_APP_NAME}/installations/new`);
});

router.post("/api/github/webhook", rateLimit, bodyParser.raw({ type: "*/*" }), async (req, res) => {
  try {
    const sig = req.headers["x-hub-signature-256"] as string | undefined;
    if (!verifyGitHubWebhookSignature(req.body as Buffer, sig)) {
      log("webhook_sig_fail");
      return res.status(401).send("invalid_signature");
    }

    const event = req.headers["x-github-event"] as string;
    const delivery = req.headers["x-github-delivery"] as string;
    const payload = JSON.parse((req.body as Buffer).toString("utf8"));

    log("webhook_in", String(event), String(delivery));

    if (event === "installation" || event === "installation_repositories") {
      const { installation } = payload;
      await db.upsertInstall({
        user_id: await db.lookupUserIdByGitHubAccount(installation.account?.id),
        installation_id: installation.id,
        account_login: installation.account?.login,
        account_type: installation.account?.type,
        repositories: payload.repositories || []
      });
      return res.sendStatus(200);
    }

    if (event === "push") {
      const repo = payload.repository.full_name;
      const branch = payload.ref?.split("/").pop();
      log("push_event", repo, branch, `commits=${payload.commits?.length || 0}`);
      return res.sendStatus(200);
    }

    if (event === "repository") {
      log("repo_event", payload.action, payload.repository?.full_name);
      return res.sendStatus(200);
    }

    return res.sendStatus(200);
  } catch (e) {
    log("webhook_error", String(e));
    return res.status(500).send("webhook_error");
  }
});

export default router;
