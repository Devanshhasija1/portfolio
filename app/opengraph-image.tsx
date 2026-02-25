import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Devansh Hasija | Product Designer Portfolio';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c4b5fd, #f0abfc)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            DH
          </div>
          <div style={{ fontSize: 24, opacity: 0.6, display: 'flex' }}>hasija.in</div>
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 20,
            display: 'flex',
          }}
        >
          Devansh Hasija
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#c084fc',
            marginBottom: 16,
            display: 'flex',
          }}
        >
          Product Designer & Vibe Coder
        </div>
        <div
          style={{
            fontSize: 22,
            opacity: 0.5,
            maxWidth: '700px',
            display: 'flex',
          }}
        >
          Building real digital products with AI, design, and code, from India.
        </div>
      </div>
    ),
    { ...size },
  );
}
