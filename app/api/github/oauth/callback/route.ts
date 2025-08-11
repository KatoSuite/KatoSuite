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
