import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendEmail, sendErrorAlert } from '@/lib/web3forms';

export async function POST(req: Request) {
  let bodyContext: any = {};
  try {
    const body = await req.json();
    bodyContext = body;
    const { name, email, phone, website_url, message, page_context, submission_type } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const { data: lead, error: insertError } = await supabase
      .from('unified_leads')
      .insert([{
         name,
         email,
         phone: phone || null,
         website_url: website_url || null,
         message: message || null,
         page_context: page_context || 'Unknown',
         submission_type: submission_type || 'General Enquiry'
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Unified Lead Insert Error:', insertError);
      sendErrorAlert(
        submission_type || 'General Enquiry',
        page_context || 'Unknown',
        email || 'Unknown',
        body,
        insertError.message || 'Supabase unified_leads Insert Failed'
      ).catch(console.error);
      return NextResponse.json({ error: 'Failed to capture lead. Please try again or call us.' }, { status: 500 });
    }

    await sendEmail(
      `New Lead: ${name} (${submission_type || 'General Enquiry'})`,
      `New Lead Submission (${submission_type || 'General Enquiry'})\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nWebsite: ${website_url || 'N/A'}\nSource: ${page_context || 'N/A'}\n\nMessage:\n${message || 'N/A'}\n\nView in Dashboard: https://businesssortedkent.co.uk/admin-dashboard/lead-inbox`
    );

    return NextResponse.json({ success: true, lead });
  } catch (error: any) {
    console.error('Error handling lead submission:', error);
    sendErrorAlert(
      bodyContext?.submission_type || 'Unknown Form Submission',
      bodyContext?.page_context || 'Unknown',
      bodyContext?.email || 'Unknown',
      bodyContext || {},
      error?.message || 'Server Exception in /api/leads'
    ).catch(console.error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
