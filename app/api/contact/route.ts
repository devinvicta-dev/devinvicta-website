import { getResend } from '@/lib/resend'

export const runtime = 'nodejs'

// Recipient + verified sender. Override via env once devinvicta.com is verified
// in Resend; until then the Resend sandbox sender is used.
const TO = process.env.CONTACT_TO ?? 'info@devinvicta.com'
const FROM = process.env.CONTACT_FROM ?? 'DevInvicta <onboarding@resend.dev>'

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const clean = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
const esc = (v: string) =>
  v.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] as string)

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = clean(body.name)
  const email = clean(body.email)
  const phone = clean(body.phone)
  const company = clean(body.company)
  const budget = clean(body.budget)
  const message = clean(body.message)

  if (!name || !email || !message) {
    return Response.json({ error: 'Name, email and message are required.' }, { status: 400 })
  }
  if (!isEmail(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: 'Email service is not configured.' }, { status: 500 })
  }

  const rows: [string, string][] = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || '—'],
    ['Company', company || '—'],
    ['Budget', budget || '—'],
  ]

  const { error } = await getResend().emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `New enquiry from ${name}`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nMessage:\n${message}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;color:#111;line-height:1.6">
        <h2 style="margin:0 0 16px">New contact enquiry</h2>
        <table style="border-collapse:collapse">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:4px 16px 4px 0;color:#777">${k}</td><td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`
            )
            .join('')}
        </table>
        <p style="margin:16px 0 4px;color:#777">Message</p>
        <p style="margin:0;white-space:pre-wrap">${esc(message)}</p>
      </div>
    `,
  })

  if (error) {
    console.error('[contact] Resend error:', error)
    return Response.json({ error: 'Failed to send message.' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
