import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendEmail, sendErrorAlert } from '@/lib/web3forms';

export async function POST(req: Request) {
  let bodyContext: any = {};
  try {
    const body = await req.json();
    bodyContext = body;
    const { name, email, website, service_required, preferred_day, preferred_time, message } = body;

    const { data: enquiry, error: insertError } = await supabase
      .from('unified_leads')
      .insert([{
        name,
        email,
        phone: null,
        website_url: website || null,
        message: `Service Required: ${service_required}\nPreferred Day: ${preferred_day}\nPreferred Time: ${preferred_time}\nNotes: ${message}`,
        page_context: 'Primary Enquiry Form',
        submission_type: 'General Enquiry'
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Enquiry Error:', insertError);
      sendErrorAlert(
        'General Enquiry',
        'Primary Enquiry Form',
        email || 'Unknown',
        body,
        insertError.message || 'Supabase unified_leads Insert Failed'
      ).catch(console.error);
      return NextResponse.json({ error: 'Failed to submit enquiry. Please try again.' }, { status: 400 });
    }

    await sendEmail(
      `New Enquiry from ${name}`,
      `New Enquiry / Message\n\nName: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\nWebsite: ${website || 'N/A'}\nService Required: ${service_required || 'N/A'}\nPreferred Day: ${preferred_day || 'N/A'}\nPreferred Time: ${preferred_time || 'N/A'}\n\nMessage:\n${message || 'N/A'}\n\nView in Dashboard: https://businesssortedkent.co.uk/admin-dashboard/lead-inbox`
    );

    return NextResponse.json({ success: true, enquiry });
  } catch (error: any) {
    console.error('Error handling enquiry:', error);
    sendErrorAlert(
      'General Enquiry',
      'Primary Enquiry Form',
      bodyContext?.email || 'Unknown',
      bodyContext || {},
      error?.message || 'Server Exception in /api/enquiry'
    ).catch(console.error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
