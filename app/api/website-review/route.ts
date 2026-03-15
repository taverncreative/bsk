import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, url, email, pageUrl, timestamp, summary, businessType } = body;

    if (!url || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Since we do not have an active Resend API key in this environment,
    // we log the lead to the console which mimics backend ingestion,
    // allowing the team to follow up manually.
    console.log(`[CRM PIPELINE INGESTION] NEW WEBSITE REVIEW REQUEST:
    Name: ${name || 'Not provided'}
    Contact Email: ${email}
    Target URL: ${url}
    Business Type: ${businessType || 'Unknown'}
    Summary: ${summary || 'None'}
    Page Source: ${pageUrl || 'Unknown'}
    Timestamp: ${timestamp || new Date().toISOString()}`);

    return NextResponse.json({ success: true, message: 'Review requested successfully.' });
  } catch (error) {
    console.error('Error processing website review request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
