import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendFormErrorAlert } from '@/lib/error-alert'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const sendEmail = async (to: string, subject: string, html: string) => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not set. Logging email to console.')
    console.log(`[EMAIL DISPATCH: ${to}]\nSubject: ${subject}\nBody: ${html}`)
    return
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Business Sorted Kent <hello@businesssortedkent.co.uk>',
        to,
        subject,
        html,
      }),
    })

    if (!res.ok) {
      console.error('Failed to send email with Resend:', await res.text())
    }
  } catch (err) {
    console.error('Resend error:', err)
  }
}

function formatFieldsToHTML(data: Record<string, string>, sectionTitle: string): string {
  const entries = Object.entries(data).filter(([, v]) => v && v.trim())
  if (entries.length === 0) return ''

  const rows = entries.map(([key, value]) => {
    const label = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, s => s.toUpperCase())
      .replace(/_/g, ' ')
    return `<tr><td style="padding:6px 12px;font-weight:600;vertical-align:top;white-space:nowrap;color:#888;">${label}</td><td style="padding:6px 12px;color:#fff;">${(value || '').replace(/\n/g, '<br>')}</td></tr>`
  }).join('')

  return `
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
      <tr><td colspan="2" style="padding:10px 12px;font-size:16px;font-weight:700;color:#D6AD67;border-bottom:1px solid #333;">${sectionTitle}</td></tr>
      ${rows}
    </table>
  `
}

export async function POST(req: Request) {
  let bodyContext: Record<string, unknown> = {}
  try {
    const body = await req.json()
    bodyContext = body
    const { clientSlug, formData, completedAt } = body

    if (!clientSlug || !formData) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // 1. Insert into discovery_submissions table
    const { data: submission, error: insertError } = await supabase
      .from('discovery_submissions')
      .insert([{
        client_slug: clientSlug,
        form_data: formData,
        completed_at: completedAt || new Date().toISOString(),
      }])
      .select()
      .single()

    if (insertError) {
      console.error('Discovery submission insert error:', insertError)
      sendFormErrorAlert(
        'Discovery Form',
        `Discovery: ${clientSlug}`,
        clientSlug,
        body,
        insertError.message || 'Supabase discovery_submissions insert failed'
      ).catch(console.error)
      return NextResponse.json({ error: 'Failed to save submission. Please try again.' }, { status: 500 })
    }

    // 2. Build email with all form sections
    const sectionMap: Record<string, string> = {
      'business-overview': 'Business Overview',
      'branding': 'Branding & Identity',
      'products-services': 'Products & Services',
      'industries-customers': 'Industries & Customers',
      'certifications-resources': 'Certifications & Resources',
      'website-content': 'Website & Content',
      'marketing-seo': 'Marketing & SEO',
      'media-photography': 'Photography & Media',
      'timeline-legal': 'Timeline, Hosting & Legal',
    }

    // Group fields by section prefix (best-effort) — or just format all fields
    const allFieldsHTML = Object.entries(formData as Record<string, string>)
      .filter(([, v]) => v && v.trim())
      .map(([key, value]) => {
        const label = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, s => s.toUpperCase())
          .replace(/_/g, ' ')
        return `<tr>
          <td style="padding:8px 12px;font-weight:600;vertical-align:top;white-space:nowrap;color:#999;border-bottom:1px solid #222;">${label}</td>
          <td style="padding:8px 12px;color:#fff;border-bottom:1px solid #222;">${(value || '').replace(/\n/g, '<br>')}</td>
        </tr>`
      }).join('')

    const adminEmailHTML = `
      <div style="background:#000;color:#fff;font-family:Arial,sans-serif;padding:32px;max-width:700px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:24px;">
          <h1 style="color:#D6AD67;margin:0;">Discovery Form Submitted</h1>
          <p style="color:#888;margin:8px 0 0;">Client: <strong>${clientSlug}</strong></p>
          <p style="color:#666;font-size:12px;margin:4px 0 0;">Submitted: ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}</p>
        </div>

        <table style="width:100%;border-collapse:collapse;background:#0a0a0a;border-radius:8px;overflow:hidden;">
          <tr>
            <td colspan="2" style="padding:12px;font-size:18px;font-weight:700;color:#D6AD67;border-bottom:2px solid #D6AD67;">All Responses</td>
          </tr>
          ${allFieldsHTML}
        </table>

        <div style="margin-top:24px;text-align:center;">
          <a href="https://businesssortedkent.co.uk/admin-dashboard" style="display:inline-block;padding:12px 24px;background:#D6AD67;color:#000;text-decoration:none;font-weight:700;border-radius:8px;">View in Admin Dashboard</a>
        </div>

        <p style="text-align:center;color:#444;font-size:11px;margin-top:24px;">Business Sorted Kent — Discovery Form System</p>
      </div>
    `

    await sendEmail(
      'hello@businesssortedkent.co.uk',
      `Discovery Form Submitted: ${clientSlug}`,
      adminEmailHTML
    )

    return NextResponse.json({ success: true, submission })
  } catch (error: any) {
    console.error('Error handling discovery submission:', error)
    sendFormErrorAlert(
      'Discovery Form',
      'Discovery Form Submission',
      'Unknown',
      bodyContext || {},
      error?.message || 'Server Exception in /api/discovery'
    ).catch(console.error)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
