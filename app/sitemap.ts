import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
import { articles } from '@/lib/data';
const origin = 'https://lemayanleleina.tech';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['', '/about', '/journey', '/projects', '/blog', '/contact'].map(route => ({url:origin+route})),
    ...projects.map(project => ({url:origin+'/projects/'+project.id})),
    ...articles.map(article => ({url:origin+'/blog/'+article.slug})),
  ];
}
