// lib/resend.ts
import { Resend } from 'resend'

// Lazy singleton: instantiating at module load throws "Missing API key" during
// the Vercel build (page-data collection) when the env var isn't present.
let client: Resend | null = null

export function getResend(): Resend {
  if (!client) client = new Resend(process.env.RESEND_API_KEY)
  return client
}
