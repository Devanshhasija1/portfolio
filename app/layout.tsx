import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Script from 'next/script';
import '@/app/globals.css';
import LenisProvider from '@/components/LenisProvider';
import Analytics from '@/components/Analytics';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const SITE_URL = 'https://www.hasija.in';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Devansh Hasija • Product Designer • Portfolio',
    template: '%s | Devansh Hasija',
  },
  description:
    'Devansh Hasija - Product Designer from India who uses AI, vibe coding, and design to build real digital products. Expert in Figma, AI tools, and creating innovative digital experiences for startups and enterprises worldwide.',
  keywords: [
    'Product Designer India',
    'Vibe Coder',
    'Figma Expert',
    'Design Systems Specialist',
    'AI Design Tools',
    'Prompt Engineering',
    'Digital Product Design',
    'Mobile App Designer',
    'Website Designer',
    'Design Thinking',
    'Prototyping Expert',
    'Devansh Hasija',
    'UX Designer',
    'UI Designer',
    'Portfolio',
  ],
  authors: [{ name: 'Devansh Hasija', url: SITE_URL }],
  creator: 'Devansh Hasija',
  publisher: 'Devansh Hasija',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Devansh Hasija • Product Designer • Portfolio',
    description:
      'Devansh Hasija - Product Designer from India who uses AI, vibe coding, and design to build real digital products.',
    images: [
      {
        url: '/images/devansh_img.jpeg',
        width: 1200,
        height: 630,
        alt: 'Devansh Hasija - Product Designer',
      },
    ],
    type: 'website',
    url: SITE_URL,
    siteName: 'Devansh Hasija Portfolio',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devansh Hasija • Product Designer • Portfolio',
    description:
      'Product Designer from India who uses AI, vibe coding, and design to build real digital products.',
    images: ['/images/devansh_img.jpeg'],
    creator: '@devanshhasija',
    site: '@devanshhasija',
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/images/logo.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'pAurImdotc-VNUSBRT1a6oTuV-eXX0r2LMRvqSRPk_Q',
  },
  category: 'design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} w-mod-js`}>
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://uploads-ssl.webflow.com" />
        <link rel="stylesheet" href="/css/devansh-fantastic-project.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                '@id': 'https://www.hasija.in/#person',
                name: 'Devansh Hasija',
                alternateName: ['Devansh', 'hdevansh'],
                jobTitle: 'Product Designer & Vibe Coder',
                description:
                  'Designer from India who uses AI, vibe coding, and design thinking to build innovative digital products and experiences.',
                url: 'https://www.hasija.in',
                image: {
                  '@type': 'ImageObject',
                  url: 'https://www.hasija.in/images/devansh_img.jpeg',
                  width: 400,
                  height: 400,
                },
                email: 'hdevansh@gmail.com',
                nationality: { '@type': 'Country', name: 'India' },
                sameAs: [
                  'https://www.linkedin.com/in/devanshhasija',
                  'https://www.behance.net/devanshhasija',
                  'https://www.instagram.com/hdevansh/',
                  'https://twitter.com/devanshhasija',
                ],
                knowsAbout: [
                  'AI-Assisted Design',
                  'Vibe Coding',
                  'Product Design',
                  'User Experience Design',
                  'Design Systems',
                  'Prompt Engineering',
                  'Figma',
                  'Web Development',
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': 'https://www.hasija.in/#website',
                url: 'https://www.hasija.in',
                name: 'Devansh Hasija Portfolio',
                description:
                  'Product Designer from India who uses AI, vibe coding, and design to build real digital products.',
                publisher: { '@id': 'https://www.hasija.in/#person' },
                inLanguage: 'en-US',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                '@id': 'https://www.hasija.in/#portfolio',
                url: 'https://www.hasija.in',
                name: 'Design Portfolio - Devansh Hasija',
                description:
                  'A curated collection of UX/UI design case studies and projects by Devansh Hasija.',
                isPartOf: { '@id': 'https://www.hasija.in/#website' },
                about: { '@id': 'https://www.hasija.in/#person' },
                inLanguage: 'en-US',
              },
            ]),
          }}
        />
      </head>
      <body className="body-new">
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <noscript>
          <div style={{ padding: '2rem', color: '#fff', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h1>Devansh Hasija | Product Designer</h1>
            <p>Product Designer from India who uses AI, vibe coding, and design to build real digital products.</p>
            <p>Please enable JavaScript for the full experience, or visit <a href="https://www.linkedin.com/in/devanshhasija" style={{ color: '#c084fc' }}>my LinkedIn</a>.</p>
          </div>
        </noscript>
        <Analytics />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
