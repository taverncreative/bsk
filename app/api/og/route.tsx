import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Simple helper to capitalize slug strings natively
function capitalizeStr(str: string) {
  if (!str) return '';
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Parse the dynamic query parameters securely
    const serviceSlug = searchParams.get('service');
    const townSlug = searchParams.get('town');

    // Build the dynamic H1 heading
    let heading = 'Digital Growth Experts';
    if (serviceSlug && townSlug) {
      heading = `${capitalizeStr(serviceSlug)} ${capitalizeStr(townSlug)}`;
    } else if (serviceSlug) {
      heading = `${capitalizeStr(serviceSlug)} Services`;
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a', // Tailwind slate-900 background
            backgroundImage: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Subtle top decoration */}
          <div 
            style={{
              display: 'flex',
              width: '100%',
              height: '12px',
              backgroundColor: '#D6AD67', // Brand primary Gold
              position: 'absolute',
              top: 0,
            }}
          />

          {/* Subheading / Brand Logo emulation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
              padding: '12px 32px',
              backgroundColor: 'rgba(214, 173, 103, 0.15)', // Light Gold tint
              border: '2px solid rgba(214, 173, 103, 0.5)', // Medium Gold tint
              borderRadius: 50,
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: '#D6AD67', // Brand Primary Gold
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
              }}
            >
              Business Sorted Kent
            </span>
          </div>

          {/* Main Huge Typography Dynamic Field */}
          <div
            style={{
              display: 'flex',
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: 'white',
              textAlign: 'center',
              padding: '0 80px',
              lineHeight: 1.1,
              marginBottom: 32,
              textShadow: '0 4px 12px rgba(0,0,0,0.5)',
            }}
          >
            {heading}
          </div>

          {/* Bottom Supporting Tagline */}
          <div
            style={{
              display: 'flex',
              fontSize: 36,
              color: '#94a3b8', // Tailwind slate-400
              fontWeight: 500,
              textAlign: 'center',
              maxWidth: '80%',
              lineHeight: 1.4,
            }}
          >
            {townSlug 
              ? 'Generating qualified local business enquiries.' 
              : 'Scale your business online today.'}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
