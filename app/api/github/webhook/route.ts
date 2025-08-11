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
