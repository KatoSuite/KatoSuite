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

