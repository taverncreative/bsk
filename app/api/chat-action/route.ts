import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, name, email, preferredTime, message, pageUrl, timestamp, summary, businessType } = body;

    if (!type || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (type === 'call') {
      console.log(`[CRM PIPELINE INGESTION] NEW CALL BOOKING REQUEST:
      Name: ${name}
      Email: ${email}
      Preferred Time: ${preferredTime || 'Not provided'}
      Business Type: ${businessType || 'Unknown'}
      Summary: ${summary || 'None'}
      Page Source: ${pageUrl || 'Unknown'}
      Timestamp: ${timestamp || new Date().toISOString()}`);
    } else if (type === 'message') {
      console.log(`[CRM PIPELINE INGESTION] NEW MESSAGE RECEIVED:
      Name: ${name}
      Email: ${email}
      Message: ${message || 'Not provided'}
      Business Type: ${businessType || 'Unknown'}
      Summary: ${summary || 'None'}
      Page Source: ${pageUrl || 'Unknown'}
      Timestamp: ${timestamp || new Date().toISOString()}`);
    }

    return NextResponse.json({ success: true, message: 'Action processed successfully.' });
  } catch (error) {
    console.error('Error processing chat action request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
