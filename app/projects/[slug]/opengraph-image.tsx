import { ImageResponse } from 'next/og';
import { getProject, getAllSlugs } from '@/lib/projects';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Project case study by Devansh Hasija';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project?.title ?? 'Project';
  const subtitle = project?.subtitle ?? '';
  const role = project?.role ?? '';

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
            fontSize: 20,
            color: '#c084fc',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 24,
            display: 'flex',
          }}
        >
          Case Study{role ? ` · ${role}` : ''}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 20,
            display: 'flex',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            opacity: 0.6,
            display: 'flex',
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c4b5fd, #f0abfc)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            DH
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 20, fontWeight: 600, display: 'flex' }}>Devansh Hasija</div>
            <div style={{ fontSize: 14, opacity: 0.5, display: 'flex' }}>hasija.in</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
