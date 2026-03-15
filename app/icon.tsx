import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="400" height="400" viewBox="0 0 100 100">
           {/* Perfect 45-degree diamond, slightly scaled down to allow padding from edge if needed - actually the image diamond hits close to the edge */}
           <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="#D6AD67" />
           {/* Perfect mathematical checkmark in black */}
           <path d="M47 75 L77 45 L67 35 L47 55 L32 40 L22 50 Z" fill="black" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
