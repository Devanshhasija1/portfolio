import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/projects';

const SITE_URL = 'https://www.hasija.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const projectSlugs = getAllSlugs();

  const projectUrls: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/snapshots`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...projectUrls,
  ];
}
