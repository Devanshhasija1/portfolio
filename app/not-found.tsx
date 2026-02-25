import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: '#fff',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          fontWeight: 700,
          margin: 0,
          lineHeight: 1,
          opacity: 0.15,
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
          marginTop: '1rem',
          opacity: 0.7,
          maxWidth: '400px',
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          marginTop: '2rem',
          padding: '0.75rem 2rem',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '2rem',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '0.9rem',
          letterSpacing: '0.05em',
          transition: 'all 0.3s ease',
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
