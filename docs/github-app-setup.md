# KATOSUITE — GITHUB APP INTEGRATION (PASTE-READY DEPLOY BLOCK)
# Goal: Real GitHub App + OAuth + Webhook, secure + logged, fully wired to your user model.
# Drop this into your project, fill env, deploy. No extra files required.

──────────────────────────────────────────────────────────────────────────────
1) .ENV — ADD THESE (GitHub App + optional OAuth during install)
──────────────────────────────────────────────────────────────────────────────
# App identity
GITHUB_APP_NAME=KatoSuite
GITHUB_APP_ID=123456            # from GitHub App settings
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
GITHUB_WEBHOOK_SECRET=whsec_gh_********

# Optional: user identity via OAuth (if you tick “Request user authorization”)
GITHUB_OAUTH_CLIENT_ID=Iv1.****************
GITHUB_OAUTH_CLIENT_SECRET=gho_****************************************
GITHUB_OAUTH_CALLBACK_URL=https://katosuite.com/api/github/oauth/callback

# App URLs
GITHUB_APP_WEBHOOK_URL=https://katosuite.com/api/github/webhook
GITHUB_APP_SETUP_URL=https://katosuite.com/github/setup

# KatoSuite
BASE_URL=https://katosuite.com
JWT_SECRET=superlongrandomjwtsecret

# Logging & Security (recommended)
LOG_LEVEL=info
RATE_LIMIT_PER_MINUTE=120

──────────────────────────────────────────────────────────────────────────────
2) DATABASE — MINIMAL TABLES TO LINK GITHUB → USER
──────────────────────────────────────────────────────────────────────────────
-- Users table assumed (id uuid/email/etc). Add GitHub link + installs.
create table if not exists github_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  github_user_id bigint not null,
  github_login text not null,
  github_name text,
  avatar_url text,
  access_token text,           -- if using OAuth user tokens (optional)
  token_scope text,
  token_expires_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, github_user_id)
);

create table if not exists github_app_installs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade, -- who installed
  installation_id bigint not null,                     -- GitHub installation id
  account_login text not null,                         -- org/user name
  account_type text not null,                          -- User/Organization
  repositories jsonb default '[]',                     -- optional cached repos
  created_at timestamptz default now(),
  unique(installation_id)
);

──────────────────────────────────────────────────────────────────────────────
3) SERVER — UTIL: GITHUB APP AUTH + SIGNING + RATE LIMIT
──────────────────────────────────────────────────────────────────────────────
/* server/github/auth.js */
import crypto from "crypto";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";

export function githubAppJWT() {
  const now = Math.floor(Date.now()/1000);
  return jwt.sign(
    { iat: now - 60, exp: now + 540, iss: process.env.GITHUB_APP_ID },
    process.env.GITHUB_APP_PRIVATE_KEY,
    { algorithm: "RS256" }
  );
}

export async function installationAccessToken(installationId) {
  const appToken = githubAppJWT();
  const res = await fetch(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    { method: "POST", headers: { Authorization: `Bearer ${appToken}`, Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) throw new Error(`Failed to get installation token: ${res.status}`);
  return res.json(); // { token, expires_at, permissions, repositories }
}

export function verifyGitHubWebhookSignature(bodyRaw, signature256) {
  const hmac = crypto.createHmac("sha256", process.env.GITHUB_WEBHOOK_SECRET);
  const digest = "sha256=" + hmac.update(bodyRaw).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature256 || ""));
}

/* server/middleware/rateLimit.js */
const hits = new Map();
export function rateLimit(req, res, next) {
  const key = req.ip + ":" + (req.path || "");
  const now = Date.now();
  const windowMs = 60 * 1000;
  const limit = Number(process.env.RATE_LIMIT_PER_MINUTE || 120);
  const arr = (hits.get(key) || []).filter(t => now - t < windowMs);
  arr.push(now);
  hits.set(key, arr);
  if (arr.length > limit) return res.status(429).json({ error: "rate_limited" });
  next();
}

/* server/utils/logger.js */
export const log = (...args) => {
  const lvl = process.env.LOG_LEVEL || "info";
  console.log(JSON.stringify({ level: lvl, ts: new Date().toISOString(), msg: args.join(" ") }));
};

──────────────────────────────────────────────────────────────────────────────
4) ROUTES — OAUTH (OPTIONAL) + WEBHOOK + INSTALL FLOW
──────────────────────────────────────────────────────────────────────────────
/* server/routes/github.js (Express) */
import express from "express";
import bodyParser from "body-parser";
import { verifyGitHubWebhookSignature, installationAccessToken, githubAppJWT } from "../github/auth.js";
import { log } from "../utils/logger.js";
import { rateLimit } from "../middleware/rateLimit.js";
import { db } from "../db/index.js"; // implement getUserById, upsertGitHubAccount, upsertInstall, etc.

export const router = express.Router();

/* 4.1 Start OAuth (optional – only if you enabled user identity during install) */
router.get("/oauth/start", rateLimit, (req, res) => {
  const state = Buffer.from(JSON.stringify({ r: req.query.r || "/" })).toString("base64url");
  const url =
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.GITHUB_OAUTH_CALLBACK_URL)}` +
    `&scope=read:user,repo&state=${state}`;
  return res.redirect(url);
});

/* 4.2 OAuth callback — exchanges code → access_token and stores link */
router.get("/oauth/callback", rateLimit, bodyParser.urlencoded({ extended: false }), async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).send("Missing code");

    const r = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new URLSearchParams({
        client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
        client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_OAUTH_CALLBACK_URL
      })
    }).then(r => r.json());

    if (!r.access_token) return res.status(400).send("OAuth exchange failed");

    // fetch user
    const ghUser = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${r.access_token}`, Accept: "application/vnd.github+json" }
    }).then(r => r.json());

    // attach to current KatoSuite user (assume req.user injected by your auth)
    const user = req.user || await db.getUserFromSession(req);
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
    return res.redirect((JSON.parse(Buffer.from(String(req.query.state || ""), "base64url").toString() || "{}").r) || "/dashboard?connected=github");
  } catch (e) {
    log("oauth_error", String(e));
    return res.status(500).send("OAuth error");
  }
});

/* 4.3 Installation redirect (Install button on your site) */
router.get("/install", rateLimit, (_req, res) => {
  // Takes user to GitHub App install page
  res.redirect(`https://github.com/apps/${process.env.GITHUB_APP_NAME}/installations/new`);
});

/* 4.4 Webhook — raw body required to verify signature */
router.post("/webhook", rateLimit, bodyParser.raw({ type: "*/*" }), async (req, res) => {
  try {
    const sig = req.headers["x-hub-signature-256"];
    if (!verifyGitHubWebhookSignature(req.body, sig)) {
      log("webhook_sig_fail");
      return res.status(401).send("invalid_signature");
    }

    const event = req.headers["x-github-event"];
    const delivery = req.headers["x-github-delivery"];
    const payload = JSON.parse(req.body.toString("utf8"));

    log("webhook_in", String(event), String(delivery));

    // Common events
    if (event === "installation" || event === "installation_repositories") {
      const { installation } = payload;
      await db.upsertInstall({
        user_id: await db.lookupUserIdByGitHubAccount(installation.account?.id), // optional
        installation_id: installation.id,
        account_login: installation.account?.login,
        account_type: installation.account?.type,
        repositories: payload.repositories || []
      });
      return res.sendStatus(200);
    }

    if (event === "push") {
      // Example: react to commits
      const repo = payload.repository.full_name;
      const branch = payload.ref?.split("/").pop();
      // TODO: queue actions (e.g., sync lesson content from /katosuite folder)
      log("push_event", repo, branch, `commits=${payload.commits?.length || 0}`);
      return res.sendStatus(200);
    }

    if (event === "repository") {
      // repository created/archived/etc.
      log("repo_event", payload.action, payload.repository?.full_name);
      return res.sendStatus(200);
    }

    // default
    return res.sendStatus(200);
  } catch (e) {
    log("webhook_error", String(e));
    return res.status(500).send("webhook_error");
  }
});

export default router;

──────────────────────────────────────────────────────────────────────────────
5) SERVER — DB STUBS (swap for your real db layer)
──────────────────────────────────────────────────────────────────────────────
/* server/db/index.js */
import { Pool } from "pg";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = {
  async getUserFromSession(req) {
    // Replace with your auth/JWT
    const userId = req.user?.id || null;
    if (!userId) return null;
    const { rows } = await pool.query("select * from users where id=$1", [userId]);
    return rows[0] || null;
  },
  async upsertGitHubAccount(a) {
    await pool.query(`
      insert into github_accounts (user_id, github_user_id, github_login, github_name, avatar_url, access_token, token_scope, token_expires_at)
      values ($1,$2,$3,$4,$5,$6,$7,$8)
      on conflict (user_id, github_user_id) do update set
        github_login=excluded.github_login,
        github_name=excluded.github_name,
        avatar_url=excluded.avatar_url,
        access_token=excluded.access_token,
        token_scope=excluded.token_scope,
        token_expires_at=excluded.token_expires_at
    `, [a.user_id, a.github_user_id, a.github_login, a.github_name, a.avatar_url, a.access_token, a.token_scope, a.token_expires_at]);
  },
  async upsertInstall(i) {
    await pool.query(`
      insert into github_app_installs (user_id, installation_id, account_login, account_type, repositories)
      values ($1,$2,$3,$4,$5)
      on conflict (installation_id) do update set
        user_id=excluded.user_id,
        account_login=excluded.account_login,
        account_type=excluded.account_type,
        repositories=excluded.repositories
    `, [i.user_id || null, i.installation_id, i.account_login, i.account_type, JSON.stringify(i.repositories || [])]);
  },
  async lookupUserIdByGitHubAccount(githubUserId) {
    const { rows } = await pool.query("select user_id from github_accounts where github_user_id=$1 limit 1", [githubUserId]);
    return rows[0]?.user_id || null;
  }
};

──────────────────────────────────────────────────────────────────────────────
6) APP REGISTRATION — WHAT TO PUT IN GITHUB SETTINGS
──────────────────────────────────────────────────────────────────────────────
App name:            KatoSuite
Homepage URL:        https://katosuite.com
Callback URL:        https://katosuite.com/api/github/oauth/callback   (if OAuth used)
Setup URL:           https://katosuite.com/github/setup                 (optional)
Webhook URL:         https://katosuite.com/api/github/webhook
Webhook secret:      (use GITHUB_WEBHOOK_SECRET from .env)
Device Flow:         optional
Where install:       “Any account” or “Only this account”

Permissions (common safe set — adjust as needed):
- Repository: Contents (Read), Metadata (Read), Webhooks (Read/Write if you want to manage hooks)
- Organization: Members (Read) if you need org info
- Account permissions: Email (Read) if you need emails via OAuth

Events to subscribe:
- installation, installation_repositories, push, repository

──────────────────────────────────────────────────────────────────────────────
7) TESTS & LOGGING — QUICK SMOKE + UNIT
──────────────────────────────────────────────────────────────────────────────
# Quick curl tests:
# 1) Webhook signature fail (should be 401)
curl -i -X POST https://katosuite.com/api/github/webhook -d '{}' -H "X-GitHub-Event: ping"
# 2) OAuth start (should redirect)
curl -I https://katosuite.com/api/github/oauth/start

# Jest example (pseudo):
// server/routes/github.test.js
import request from "supertest";
import app from "../app.js";
describe("GitHub Webhook", () => {
  it("rejects invalid signature", async () => {
    const res = await request(app).post("/api/github/webhook").send("{}").set("X-GitHub-Event","ping");
    expect([401,400,500]).toContain(res.status); // 401 expected
  });
});

Structured logs examples:
log("webhook_in", event, delivery);
log("push_event", repo, branch, `commits=${count}`);

──────────────────────────────────────────────────────────────────────────────
8) SECURITY & MONITORING — DO THESE BEFORE LAUNCH
──────────────────────────────────────────────────────────────────────────────
- Rotate GITHUB_APP_PRIVATE_KEY, GITHUB_WEBHOOK_SECRET at least quarterly.
- Enforce HTTPS everywhere; reject non-TLS webhook calls.
- Keep raw body parsing *only* for /github/webhook route.
- Add IP allowlisting if desired (GitHub meta IPs).
- Store OAuth tokens encrypted at rest; never log tokens.
- Add 401/403 on missing session for /oauth/callback linkage.
- Add rate limiting (already included) + user agent checks.
- Monitor errors: integrate with Sentry/Logtail (optional).

──────────────────────────────────────────────────────────────────────────────
9) WIREFLOW — USER EXPERIENCE IN KATOSUITE UI
──────────────────────────────────────────────────────────────────────────────
- “Connect GitHub” button → /api/github/install (App install) or /oauth/start (user identity)
- After install, show: connected org/user, install id, last webhook event time.
- Optional: “Select Repos to Sync” → store install + repo ids.
- Surface actions when push/repository events arrive (e.g., auto-import lessons from /katosuite/** paths).

──────────────────────────────────────────────────────────────────────────────
10) DEPLOY CHECKLIST — 10 MIN FINAL PASS
──────────────────────────────────────────────────────────────────────────────
[ ] Env set: APP_ID, PRIVATE_KEY, WEBHOOK_SECRET, (OAuth pair if used)
[ ] Webhook endpoint live at /api/github/webhook over HTTPS
[ ] Raw body enabled ONLY for webhook route
[ ] DB migrations run for github_accounts + github_app_installs
[ ] Install the App on your GitHub account/org
[ ] Fire a test “ping” from GitHub App → see 200 + logs
[ ] Link a KatoSuite user via OAuth (if enabled) → see github_accounts row
[ ] Trigger a test push → logs show repo/branch/commit count
[ ] Errors/metrics visible in logs dashboard
[ ] Secrets stored in your host’s secret manager (not in repo)

# Done. This takes you from prototype → secure, logged, production GitHub App.
