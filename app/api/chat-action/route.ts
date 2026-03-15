import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);
async function generateAdminSummary(messages: any[]) {
  if (!messages || messages.length === 0) return 'No conversation history available.';

  const systemPrompt = `You are an internal assistant generating a structured CRM summary from a chat log between an AI and a visitor.
Only extract facts.

Output EXACTLY this format (leave fields as 'Unknown' if not mentioned):

Lead Intent
[What does the user want to achieve?]

Detected Issues
[What technical issues did the AI diagnostic scan find? (If website was provided)]

Business Type
[What industry or type of business is this?]

Website Analysed
[Extract from conversation if possible]

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
  try {
    const body = await req.json();
    const { type, name, email, preferredTime, message, pageUrl, timestamp, messages } = body;

    if (!type || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const aiSummary = await generateAdminSummary(messages);

    const businessTypeMatch = aiSummary.match(/Business Type\s*\n(.*)/);
    const businessType = businessTypeMatch ? businessTypeMatch[1] : 'Unknown';

    const locationMatch = aiSummary.match(/Business Location\s*\n(.*)/);
    const location = locationMatch ? locationMatch[1] : 'Unknown';

    const { error: insertError } = await supabase.from('leads').insert({
      business_name: name || (type === 'call' ? 'Call Booking' : 'Message Request'),
      email: email,
      industry: businessType !== 'Unknown' ? businessType : null,
      location: location !== 'Unknown' ? location : null,
      source: 'Elle chatbot',
      notes: aiSummary + (preferredTime ? `\n\nPreferred Time: ${preferredTime}` : '') + (message ? `\n\nUser Message: ${message}` : ''),
      stage: 'New Lead'
    });
    
    if (insertError) {
      console.error("Error inserting lead to Supabase:", insertError);
    }

    // Also log Elle interaction
    await supabase.from('elle_logs').insert({
      intent: type === 'call' ? 'Book Call' : 'Send Message',
      issues_detected: aiSummary.match(/Detected Issues\s*\n(.*)/)?.[1] || null,
      lead_converted: true,
      transcript: JSON.stringify(messages)
    });

    if (type === 'call') {
      console.log(`[CRM PIPELINE INGESTION] NEW CALL BOOKING REQUEST:
Name: ${name}
Email: ${email}
Preferred Time: ${preferredTime || 'Not provided'}
Page Source: ${pageUrl || 'Unknown'}
Timestamp: ${timestamp || new Date().toISOString()}

--- AI SUMMARY ---
${aiSummary}
------------------`);
    } else if (type === 'message') {
      console.log(`[CRM PIPELINE INGESTION] NEW MESSAGE RECEIVED:
Name: ${name}
Email: ${email}
Message: ${message || 'Not provided'}
Page Source: ${pageUrl || 'Unknown'}
Timestamp: ${timestamp || new Date().toISOString()}

--- AI SUMMARY ---
${aiSummary}
------------------`);
    }

    return NextResponse.json({ success: true, message: 'Action processed successfully.' });
  } catch (error) {
    console.error('Error processing chat action request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
