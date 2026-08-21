import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://swfx.com';
  
  const routes = [
    { path: '', priority: 1.0, changefreq: 'daily' },
    { path: '/market', priority: 0.9, changefreq: 'daily' },
    { path: '/signals', priority: 0.9, changefreq: 'daily' },
    { path: '/analysis', priority: 0.8, changefreq: 'weekly' },
    { path: '/learn', priority: 0.8, changefreq: 'weekly' },
    { path: '/about', priority: 0.7, changefreq: 'monthly' },
    { path: '/journal', priority: 0.6, changefreq: 'daily' },
    { path: '/tools', priority: 0.8, changefreq: 'weekly' },
    { path: '/sessions', priority: 0.7, changefreq: 'daily' },
    { path: '/tradingview', priority: 0.6, changefreq: 'weekly' },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changefreq as any,
    priority: route.priority,
  }));
}
