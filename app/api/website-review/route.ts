import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createClient } from '@supabase/supabase-js';
import { sendEmail, sendErrorAlert } from '@/lib/web3forms';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);
async function generateAdminSummary(messages: any[], providedUrl: string) {
  if (!messages || messages.length === 0) return 'No conversation history available.';

  const systemPrompt = `You are an internal assistant generating a structured CRM summary from a chat log between an AI and a visitor.
Only extract facts.

Output EXACTLY this format (leave fields as 'Unknown' if not mentioned):

Lead Intent
[What does the user want to achieve?]

Detected Issues
[What technical issues did the AI diagnostic scan find?]

Business Type
[What industry or type of business is this?]

Website Analysed
${providedUrl || '[Extract from conversation if possible]'}

Business Location
[Extract any town, city, or county mentioned, e.g., Ashford, Kent. If none, say Unknown]
`;

  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    system: systemPrompt,
    prompt: messages.map((m: any) => `${m.role}: ${m.content}`).join('\n')
  });

  return text.trim();
}

export async function POST(req: Request) {
  let bodyContext: any = {};
  try {
    const body = await req.json();
    bodyContext = body;
    const { name, url, email, pageUrl, timestamp, messages } = body;

    if (!url || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const aiSummary = await generateAdminSummary(messages, url);

    const businessTypeMatch = aiSummary.match(/Business Type\s*\n(.*)/);
    const businessType = businessTypeMatch ? businessTypeMatch[1] : 'Unknown';

    const locationMatch = aiSummary.match(/Business Location\s*\n(.*)/);
    const location = locationMatch ? locationMatch[1] : 'Unknown';

    const { error: insertError } = await supabase.from('unified_leads').insert({
      name: name || 'Website Review Request',
      email: email,
      website_url: url,
      page_context: pageUrl || 'Unknown',
      submission_type: 'Website Review',
      message: `Industry: ${businessType !== 'Unknown' ? businessType : 'Unknown'}, Location: ${location !== 'Unknown' ? location : 'Unknown'}\n\nAI Diagnostic Output:\n${aiSummary}`,
    });
    
    if (insertError) {
      console.error("Error inserting lead to Supabase:", insertError);
      sendErrorAlert(
        'Website Review',
        pageUrl || 'Unknown',
        email || 'Unknown',
        body,
        insertError.message || 'Supabase unified_leads Insert Failed'
      ).catch(console.error);
    }

    // Also log Elle interaction
    await supabase.from('elle_logs').insert({
      intent: 'Website Review',
      issues_detected: aiSummary.match(/Detected Issues\s*\n(.*)/)?.[1] || null,
      lead_converted: true,
      transcript: JSON.stringify(messages)
    });

    // Send Admin Email via Web3Forms
    await sendEmail(
      `Website Review Request: ${url}`,
      `New Website Review Request\n\nEmail: ${email}\nWebsite: ${url}\n\nAI Diagnostic:\n${aiSummary}\n\nView in Dashboard: https://businesssortedkent.co.uk/admin-dashboard/lead-inbox`
    );

    console.log(`[CRM PIPELINE INGESTION] NEW WEBSITE REVIEW REQUEST:
Name: ${name || 'Not provided'}
Contact Email: ${email}
Target URL: ${url}
Page Source: ${pageUrl || 'Unknown'}
Timestamp: ${timestamp || new Date().toISOString()}

--- AI SUMMARY ---
${aiSummary}
------------------`);

    return NextResponse.json({ success: true, message: 'Review requested successfully.' });
  } catch (error: any) {
    console.error('Error processing website review request:', error);
    sendErrorAlert(
        'Website Review',
        bodyContext?.pageUrl || 'Unknown',
        bodyContext?.email || 'Unknown',
        bodyContext || {},
        error?.message || 'Server Exception in /api/website-review'
    ).catch(console.error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
