import { projects } from '@/lib/projects';

const SITE_URL = 'https://www.hasija.in';

export function GET() {
  const items = projects
    .map(
      (p) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/projects/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/projects/${p.slug}</guid>
      <description>${escapeXml(p.overview)}</description>
      <category>${escapeXml(p.role)}</category>
    </item>`,
    )
    .join('');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Devansh Hasija | Design Portfolio</title>
    <link>${SITE_URL}</link>
    <description>UX/UI design case studies and projects by Devansh Hasija, Product Designer from India.</description>
    <language>en-us</language>
    <managingEditor>hdevansh@gmail.com (Devansh Hasija)</managingEditor>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(feed.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
