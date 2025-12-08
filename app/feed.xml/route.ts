// app/feed.xml/route.ts

import { getBlogPosts } from "@/lib/blog/blog.data";


export function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codercarl.dev';
    const siteTitle = 'React Component designs';
    const siteDescription = 'A library of accessible and extensible react based components';

    const blogItems = getBlogPosts().map(post => `
    <item>
        <title>${escapeXml(post.title)}</title>
        <link>${baseUrl}${post.href}</link>
        <guid>${baseUrl}${post.href}</guid>
        <pubDate>${new Date(post.lastModified).toUTCString()}</pubDate>
        <description>${escapeXml(post.title)} - Learn about ${post.title} in our design system blog.</description>
    </item>
    `).join('');

    const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
     <title>${escapeXml(siteTitle)}</title>
    <link>${baseUrl}/blog</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${blogItems}
  </channel>
</rss>`;

    return new Response(feed, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
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