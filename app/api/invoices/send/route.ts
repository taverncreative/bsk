import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: Request) {
  try {
    const { invoiceId } = await req.json()
    if (!invoiceId) {
      return NextResponse.json({ error: 'Missing invoiceId' }, { status: 400 })
    }

    const supabase = getSupabase()

    // Fetch invoice with client details
    const { data: invoice, error: invError } = await supabase
      .from('invoices')
      .select('*, clients(company_name, email, contact_name)')
      .eq('id', invoiceId)
      .single()

    if (invError || !invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    const clientEmail = invoice.clients?.email
    if (!clientEmail) {
      return NextResponse.json({ error: 'Client has no email address' }, { status: 400 })
    }

    const items = (invoice.items || []) as Array<{ description: string; quantity: number; rate: number }>

    const itemRows = items.map((item: { description: string; quantity: number; rate: number }) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #222;color:#fff;">${item.description}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #222;color:#ccc;text-align:center;">${item.quantity}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #222;color:#ccc;text-align:right;">£${parseFloat(String(item.rate)).toFixed(2)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #222;color:#fff;text-align:right;font-weight:600;">£${(item.quantity * item.rate).toFixed(2)}</td>
      </tr>
    `).join('')

    const html = `
      <div style="background:#000;color:#fff;font-family:Arial,sans-serif;padding:32px;max-width:700px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="color:#D6AD67;margin:0;font-size:28px;">INVOICE</h1>
          <p style="color:#888;margin:8px 0 0;font-size:14px;">${invoice.invoice_number}</p>
        </div>

        <div style="margin-bottom:24px;">
          <p style="color:#888;margin:0;font-size:12px;">Bill To:</p>
          <p style="color:#fff;font-weight:700;margin:4px 0 0;font-size:16px;">${invoice.clients?.company_name || 'Client'}</p>
          ${invoice.clients?.contact_name ? `<p style="color:#ccc;margin:2px 0 0;font-size:14px;">${invoice.clients.contact_name}</p>` : ''}
        </div>

        <table style="width:100%;border-collapse:collapse;background:#0a0a0a;border-radius:8px;overflow:hidden;margin-bottom:24px;">
          <tr style="background:#111;">
            <th style="padding:10px 12px;text-align:left;color:#888;font-size:12px;text-transform:uppercase;">Description</th>
            <th style="padding:10px 12px;text-align:center;color:#888;font-size:12px;text-transform:uppercase;">Qty</th>
            <th style="padding:10px 12px;text-align:right;color:#888;font-size:12px;text-transform:uppercase;">Rate</th>
            <th style="padding:10px 12px;text-align:right;color:#888;font-size:12px;text-transform:uppercase;">Amount</th>
          </tr>
          ${itemRows}
        </table>

        <div style="max-width:250px;margin-left:auto;">
          <div style="display:flex;justify-content:space-between;padding:6px 0;color:#888;font-size:14px;">
            <span>Subtotal</span>
            <span>£${parseFloat(invoice.subtotal).toFixed(2)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:6px 0;color:#888;font-size:14px;">
            <span>VAT (20%)</span>
            <span>£${parseFloat(invoice.vat).toFixed(2)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:10px 0;color:#D6AD67;font-size:20px;font-weight:700;border-top:2px solid #D6AD67;margin-top:8px;">
            <span>Total</span>
            <span>£${parseFloat(invoice.total).toFixed(2)}</span>
          </div>
        </div>

        ${invoice.due_date ? `<p style="text-align:center;color:#888;font-size:13px;margin-top:24px;">Due Date: <strong style="color:#fff;">${new Date(invoice.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></p>` : ''}

        ${invoice.notes ? `<div style="margin-top:24px;padding:16px;background:#0a0a0a;border-radius:8px;"><p style="color:#888;font-size:12px;margin:0 0 4px;">Notes</p><p style="color:#ccc;font-size:13px;margin:0;">${invoice.notes}</p></div>` : ''}

        <div style="margin-top:32px;padding-top:16px;border-top:1px solid #222;text-align:center;">
          <p style="color:#888;font-size:12px;margin:0;">Business Sorted Kent</p>
          <p style="color:#666;font-size:11px;margin:4px 0 0;">hello@businesssortedkent.co.uk</p>
        </div>
      </div>
    `

    // Send via Resend
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('[INVOICE EMAIL] RESEND_API_KEY is not set')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Business Sorted Kent <hello@businesssortedkent.co.uk>',
        to: clientEmail,
        subject: `Invoice ${invoice.invoice_number} from Business Sorted Kent`,
        html,
      }),
    })

    if (!emailRes.ok) {
      const errText = await emailRes.text()
      console.error('[INVOICE EMAIL] Resend error:', errText)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    // Update invoice status
    await supabase.from('invoices').update({
      status: 'sent',
      sent_at: new Date().toISOString(),
    }).eq('id', invoiceId)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[INVOICE EMAIL] Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
