import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous-' + Math.random().toString(36).substring(7);
    const body = await req.json();
    const { event, pageUrl } = body;
    
    if (event === 'conversation_started') {
      await supabase.from('elle_chat_logs').insert([{
         session_id: 'sess_' + ip.replace(/[^a-zA-Z0-9]/g, ''),
         page_context: pageUrl || 'Unknown',
         visitor_message: '[SYSTEM EVENT]',
         elle_response: 'Conversation Started',
         action_triggered: 'conversation_started',
         problem_detected: 'unknown',
         lead_intent_score: 'cold',
         visitor_ip: ip
      }]);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log Elle event', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
