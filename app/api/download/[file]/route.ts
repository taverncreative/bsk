import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  try {
    const { file } = await params;
    
    // Parse JSON safely
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON request' }, { status: 400 });
    }

    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    // 1. Log the captured email (can connect to Supabase/CRM here later)
    console.log(`\n===========================================`);
    console.log(`[LEAD CAPTURED] Email: ${email}`);
    console.log(`[LEAD RESOURCE] Requested: ${file}`);
    console.log(`===========================================\n`);

    // 2. Validate requested file locally
    const safeFilename = path.basename(file); // Prevents direct directory traversal attacks
    const filePath = path.join(process.cwd(), 'public', 'downloads', safeFilename);

    if (!fs.existsSync(filePath)) {
      console.warn(`[WARNING] Non-existent file requested: ${safeFilename}`);
      return NextResponse.json({ error: 'File not found on server' }, { status: 404 });
    }

    // 3. Read the payload
    const fileBuffer = fs.readFileSync(filePath);

    // 4. Return as a raw download stream payload
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeFilename}"`,
        'Cache-Control': 'no-store, max-age=0', // Never cache dynamic lead gated payloads
      },
    });

  } catch (error: any) {
    console.error('CRITICAL ERROR processing download API route:', error);
    return NextResponse.json({ error: 'Internal server error processing payload' }, { status: 500 });
  }
}
