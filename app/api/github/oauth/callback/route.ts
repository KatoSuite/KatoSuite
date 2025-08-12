codex/implement-github-oauth-callback-handling
import db from "../../../../../server/db";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response(JSON.stringify({ error: "Missing code" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID || "",
        client_secret: process.env.GITHUB_CLIENT_SECRET || "",
        code
      })
    });

    if (!tokenRes.ok) {
      throw new Error("Token exchange failed");
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) {
      throw new Error("No access token");
    }

    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "KatoSuite"
      }
    });

    if (!userRes.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const profile = await userRes.json();

    const existing = await db.getUser(String(profile.id));
    const user = existing
      ? { ...existing, githubId: profile.id, accessToken }
      : { id: String(profile.id), githubId: profile.id, accessToken };
    await db.saveUser(user);

    const headers = new Headers();
    headers.set(
      "Set-Cookie",
      `session=${encodeURIComponent(user.id)}; Path=/; HttpOnly`
    );
    headers.set("Location", "/dashboard");
    return new Response(null, { status: 302, headers });
  } catch (err) {
    console.error("OAuth callback error", err);
    return new Response(JSON.stringify({ error: "OAuth callback failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}


import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state') // if you use CSRF state

  if (!code) return NextResponse.redirect(`${process.env.BASE_URL}/login?err=no_code`)

  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.GITHUB_APP_CLIENT_ID,
        client_secret: process.env.GITHUB_APP_CLIENT_SECRET,
        code
      })
    })
    const data = await res.json() as { access_token?: string; token_type?: string; scope?: string }

    if (!data.access_token) {
      return NextResponse.redirect(`${process.env.BASE_URL}/login?err=oauth_failed`)
    }

    // Fetch minimal user profile (optional)
    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${data.access_token}`, 'Accept': 'application/vnd.github+json' }
    })
    const user = await userRes.json()

    // TODO: link GitHub user to your KatoSuite account, then set a session cookie.
    // redirect to dashboard
    return NextResponse.redirect(`${process.env.BASE_URL}/dashboard?gh=ok`)
  } catch (e) {
    return NextResponse.redirect(`${process.env.BASE_URL}/login?err=exception`)
  }
}
main
