import type { Metadata } from 'next';
import SnapshotsClient from './SnapshotsClient';

export const metadata: Metadata = {
  title: 'Playground • Devansh Hasija',
  description:
    "Interactive playground showcasing Devansh Hasija's design experiments, prototypes, and creative explorations in product design and web development.",
  openGraph: {
    title: 'Playground • Devansh Hasija',
    description:
      "Interactive playground showcasing Devansh Hasija's design experiments, prototypes, and creative explorations.",
    images: [
      {
        url: '/images/devansh_img.jpeg',
        width: 1200,
        height: 630,
        alt: 'Devansh Hasija - Design Playground',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Playground • Devansh Hasija',
    description:
      "Interactive playground showcasing Devansh Hasija's design experiments and creative explorations.",
    images: ['/images/devansh_img.jpeg'],
  },
  alternates: {
    canonical: '/snapshots',
  },
};

export default function SnapshotsPage() {
  return <SnapshotsClient />;
}
