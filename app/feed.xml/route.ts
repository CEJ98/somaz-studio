import { NextResponse } from 'next/server'
import { posts } from '@/data/posts'

export const dynamic = 'force-static'

export async function GET() {
  const base = 'https://somazstudio.com'
  const items = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title.en}]]></title>
      <link>${base}/en/blog/${post.slug}</link>
      <guid isPermaLink="true">${base}/en/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt.en}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Somaz Studio — Notes</title>
    <link>${base}/en/blog</link>
    <description>Design insights from Somaz Studio — 3D visualization, interior design, and spatial concepts.</description>
    <language>en</language>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
