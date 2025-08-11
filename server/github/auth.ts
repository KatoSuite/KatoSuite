import crypto from "crypto";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";

export function githubAppJWT() {
  const now = Math.floor(Date.now() / 1000);
  return jwt.sign(
    { iat: now - 60, exp: now + 540, iss: process.env.GITHUB_APP_ID },
    process.env.GITHUB_APP_PRIVATE_KEY as string,
    { algorithm: "RS256" }
  );
}

export async function installationAccessToken(installationId: number) {
  const appToken = githubAppJWT();
  const res = await fetch(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${appToken}`,
        Accept: "application/vnd.github+json"
      }
    }
  );
  if (!res.ok) throw new Error(`Failed to get installation token: ${res.status}`);
  return res.json();
}

export function verifyGitHubWebhookSignature(bodyRaw: Buffer, signature256: string | string[] | undefined) {
  const hmac = crypto.createHmac("sha256", process.env.GITHUB_WEBHOOK_SECRET || "");
  const digest = "sha256=" + hmac.update(bodyRaw).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from((signature256 as string) || ""));
}
