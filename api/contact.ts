import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  firm: z.string().min(2),
  message: z.string().min(10),
})

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_EMAIL = process.env.TO_EMAIL ?? 'sales@brandspeak.ai'
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'noreply@uncompromised.ai'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const parsed = contactSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid form data', issues: parsed.error.flatten() })
  }

  const { name, email, firm, message } = parsed.data

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name} at ${firm}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 24px; border-bottom: 1px solid #e5e5e5; padding-bottom: 16px;">
            New Contact Inquiry — Uncompromised AI
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #666; width: 120px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; font-size: 15px;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #666; vertical-align: top;">Email</td>
              <td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${escapeHtml(email)}" style="color: #0070f3;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #666; vertical-align: top;">Firm</td>
              <td style="padding: 8px 0; font-size: 15px;">${escapeHtml(firm)}</td>
            </tr>
          </table>
          <div style="background: #f7f6f1; border-radius: 8px; padding: 20px;">
            <p style="font-size: 13px; color: #666; margin: 0 0 8px;">Message</p>
            <p style="font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <p style="font-size: 12px; color: #999; margin-top: 32px;">
            Reply directly to this email to reach ${escapeHtml(name)} at ${escapeHtml(email)}.
          </p>
        </div>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
