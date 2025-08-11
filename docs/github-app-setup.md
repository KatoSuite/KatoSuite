# KatoSuite — GitHub App Setup

## 1) App Identity
- **GitHub App name:** `KatoSuite`
- **Homepage URL:** `https://katosuite.com`

## 2) OAuth / User Identification
- **Callback URL:** `https://katosuite.com/api/github/oauth/callback`
- **Expire user authorization tokens:** ✅ (ON)
- **Request user authorization (OAuth) during installation:** ✅ (ON)
- **Enable Device Flow:** ❌ (OFF, unless you need CLI/device logins)

## 3) Post-Install Routing
- **Setup URL (optional):** `https://katosuite.com/dashboard/setup`
- **Redirect on update:** ✅ (ON)

## 4) Webhook
- **Active:** ✅
- **Webhook URL:** `https://katosuite.com/api/github/webhook`
- **Secret:** Generate a long random string and save to `.env` as `GITHUB_WEBHOOK_SECRET`

## 5) Permissions (minimum viable for content sync)
- **Repository permissions**
  - Contents: **Read-only**
  - Metadata: **Read-only**
- **Organization permissions**
  - None (unless you need org-wide info)
- **Account permissions**
  - None (unless you need user email/profile via OAuth scopes)

> Expand only if a feature needs it (e.g., PRs, issues). Least privilege = safer.

## 6) Subscribe to Events
- `push` (content updates)
- `repository` (created/deleted, if you let users link repos)
- `installation_target` (renamed)
- `meta` (app deleted → webhook removed)
- (optional) `security_advisory` (to react to dependency advisories)

## 7) Where can this App be installed?
- **Any account** (recommended if you want external orgs/teachers to install)
- OR **Only on this account** `@KatoSuite` (internal use)

---

## 8) Environment Variables (.env)
```bash
# GitHub App
GITHUB_APP_ID=xxxxx
GITHUB_APP_CLIENT_ID=Iv1.xxxxx
GITHUB_APP_CLIENT_SECRET=xxxxx
GITHUB_APP_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GITHUB_WEBHOOK_SECRET=super-long-random-string

# App
BASE_URL=https://katosuite.com
NODE_ENV=production
```

## 9) Webhook Verification Route (Next.js App Router)
File: `/app/api/github/webhook/route.ts`

```ts
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function verifySignature(reqBody: string, signature256: string | null) {
  if (!signature256) return false
  const secret = process.env.GITHUB_WEBHOOK_SECRET || ''
  const hmac = crypto.createHmac('sha256', secret)
  const digest = `sha256=${hmac.update(reqBody).digest('hex')}`
  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature256))
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const raw = await req.text()
  const sig = req.headers.get('x-hub-signature-256')
  const ok = verifySignature(raw, sig)
  if (!ok) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })

  const event = req.headers.get('x-github-event') || 'unknown'
  const payload = JSON.parse(raw || '{}')

  // Minimal handlers (expand as needed)
  switch (event) {
    case 'push':
      // TODO: pull latest content/templates into KatoSuite library
      break
    case 'repository':
      // TODO: handle created/deleted if you sync per-repo
      break
    case 'installation_target':
    case 'meta':
      // housekeeping (renames, app deletion)
      break
  }

  return NextResponse.json({ ok: true })
}
```

## 10) OAuth Callback (exchange code → user identity)
File: `/app/api/github/oauth/callback/route.ts`
Uses GitHub OAuth (part of GitHub App). Store tokens server-side only.

```ts
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
```

## 11) Security Notes
- Keep the private key and client secret server-side only.
- Verify webhook signatures for every request.
- Use the least permissions needed; add more only when a feature requires it.
- Log event IDs/types (not secrets) to aid debugging.

## 12) Quick Checklist
- Create GitHub App with values above.
- Add `.env` vars (`GITHUB_*`) to your hosting.
- Deploy the two API routes (`/api/github/webhook`, `/api/github/oauth/callback`).
- Subscribe to push (+ others as needed).
- Test: trigger a push on a connected repo → verify 200 from webhook route.
- Test: OAuth install/login flow → redirect to `/dashboard`.
