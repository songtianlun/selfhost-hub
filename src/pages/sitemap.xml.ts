import type { APIRoute } from 'astro';
import { getAllServices } from '../../lib/services';

const baseUrl = 'https://selfhost-hub.com';
const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[char]!));

export const GET: APIRoute = async () => {
  const [zhServices, enServices] = await Promise.all([getAllServices('zh'), getAllServices('en')]);
  const urls = [
    { loc: baseUrl, lastmod: new Date().toISOString(), priority: '1.0', changefreq: 'daily' },
    { loc: `${baseUrl}/en`, lastmod: new Date().toISOString(), priority: '1.0', changefreq: 'daily' },
    { loc: `${baseUrl}/tags`, lastmod: new Date().toISOString(), priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/en/tags`, lastmod: new Date().toISOString(), priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/about`, lastmod: new Date().toISOString(), priority: '0.5', changefreq: 'monthly' },
    { loc: `${baseUrl}/en/about`, lastmod: new Date().toISOString(), priority: '0.5', changefreq: 'monthly' },
    { loc: `${baseUrl}/changelog`, lastmod: new Date().toISOString(), priority: '0.6', changefreq: 'weekly' },
    ...zhServices.map((service) => ({ loc: `${baseUrl}/${service.slug}`, lastmod: service.updatedAt || new Date().toISOString(), priority: '0.7', changefreq: 'weekly' })),
    ...enServices.map((service) => ({ loc: `${baseUrl}/en/${service.slug}`, lastmod: service.updatedAt || new Date().toISOString(), priority: '0.7', changefreq: 'weekly' })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${escapeXml(url.loc)}</loc><lastmod>${escapeXml(new Date(url.lastmod).toISOString())}</lastmod><changefreq>${url.changefreq}</changefreq><priority>${url.priority}</priority></url>`).join('\n')}\n</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
