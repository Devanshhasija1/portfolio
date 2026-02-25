'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          marginTop: '1rem',
          opacity: 0.6,
          maxWidth: '420px',
        }}
      >
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        style={{
          marginTop: '2rem',
          padding: '0.75rem 2rem',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '2rem',
          color: '#fff',
          background: 'transparent',
          fontSize: '0.9rem',
          letterSpacing: '0.05em',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        Try again
      </button>
    </div>
  );
}
