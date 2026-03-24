import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { invoiceId } = await req.json();

    if (!invoiceId) {
      return NextResponse.json({ error: 'Invoice ID required' }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to environment variables.' }, { status: 500 });
    }

    const stripe = new Stripe(stripeKey);

    // Get invoice details
    const { data: invoice, error } = await supabase
      .from('invoices')
      .select('*, clients(company_name, email)')
      .eq('id', invoiceId)
      .single();

    if (error || !invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Create Stripe payment link
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'gbp',
          product_data: {
            name: `Invoice ${invoice.invoice_number}`,
            description: `Payment for ${invoice.clients?.company_name || 'Client'}`,
          },
          unit_amount: Math.round(parseFloat(invoice.total) * 100), // Stripe uses pence
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.businesssortedkent.co.uk'}/payment-success?invoice=${invoice.invoice_number}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.businesssortedkent.co.uk'}/payment-cancelled`,
      customer_email: invoice.clients?.email || undefined,
      metadata: {
        invoice_id: invoice.id,
        invoice_number: invoice.invoice_number,
      },
    });

    // Save payment link to invoice
    await supabase.from('invoices').update({
      payment_link: session.url,
    }).eq('id', invoiceId);

    return NextResponse.json({ success: true, paymentLink: session.url });
  } catch (error: any) {
    console.error('Stripe payment link error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create payment link' }, { status: 500 });
  }
}
