import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject, getAllSlugs, type Project } from '@/lib/projects';
import ProjectPageClient from './ProjectPageClient';

const SITE_URL = 'https://www.hasija.in';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} • Devansh Hasija`;
  const description = `${project.overview} | UX/UI design case study by Devansh Hasija, ${project.role}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: [
        {
          url: project.bannerImage,
          width: 1200,
          height: 630,
          alt: `${project.title} case study`,
        },
      ],
      publishedTime: project.date,
      authors: ['Devansh Hasija'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.bannerImage],
    },
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
}

function ProjectJsonLd({ project }: { project: Project }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Projects',
          item: `${SITE_URL}/#projects`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: project.title,
          item: `${SITE_URL}/projects/${project.slug}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.overview,
      url: `${SITE_URL}/projects/${project.slug}`,
      image: project.bannerImage.startsWith('/')
        ? `${SITE_URL}${project.bannerImage}`
        : project.bannerImage,
      dateCreated: project.date,
      creator: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Devansh Hasija',
      },
      genre: 'UX/UI Design Case Study',
      keywords: project.roleDetails,
      inLanguage: 'en-US',
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <>
      <ProjectJsonLd project={project} />
      <ProjectPageClient project={project} />
    </>
  );
}
