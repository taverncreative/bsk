import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const size = { width: 100, height: 100 };
export const contentType = 'image/png';

export default function Icon() {
  const logoPath = path.resolve('./public/logo.png');
  const buffer = fs.readFileSync(logoPath);
  const base64 = buffer.toString('base64');

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
        <img src={`data:image/png;base64,${base64}`} width="70" height="70" style={{ objectFit: 'contain' }} />
      </div>
    ),
    { ...size }
  );
}
