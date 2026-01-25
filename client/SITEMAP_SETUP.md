# Sitemap & SEO Setup Guide

## Overview
Your project now has a complete sitemap and SEO configuration system. This guide explains how to use it and maintain it.

## Files Created

### 1. **app/sitemap.ts** - Dynamic Sitemap Generator
- Automatically generates `sitemap.xml` at your site root
- Contains all pages with proper SEO attributes
- Accessible at: `https://yourdomain.com/sitemap.xml`

**Key Features:**
- Priority (0.0-1.0) for each page
- Change frequency settings
- Last modified dates
- All pages automatically included

### 2. **lib/seo-config.ts** - SEO Configuration
- Centralized SEO metadata for all pages
- Contains title, description, and keywords for each page
- Can be imported and used in individual page layouts

**How to use:**
```typescript
import { getSEOConfig } from '@/lib/seo-config';

const seo = getSEOConfig('/your-page-path');
console.log(seo.title, seo.keywords);
```

### 3. **app/robots.ts** - Robots Configuration
- Controls search engine crawler access
- Links to your sitemap
- Excludes admin, auth, and payment pages from indexing

**Accessible at:** `https://yourdomain.com/robots.txt`

### 4. **app/layout.tsx** - Updated Root Metadata
- Enhanced with comprehensive OpenGraph tags
- Twitter card configuration
- Proper title templates for nested pages
- Site-wide SEO configuration

## Setup Instructions

### Step 1: Set Your Domain
Update the `NEXT_PUBLIC_SITE_URL` environment variable in your `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Step 2: Update Keywords for Your Pages
Edit [lib/seo-config.ts](../../lib/seo-config.ts) and update the `seoConfig` object with your actual keywords:

```typescript
export const seoConfig: Record<string, PageSEO> = {
  '/': {
    title: 'Your Page Title',
    description: 'Your page description (160 chars max)',
    keywords: ['keyword1', 'keyword2', 'keyword3'],
  },
  // ... more pages
};
```

### Step 3: Update Sitemap Pages
Edit [app/sitemap.ts](../../app/sitemap.ts) and ensure all your pages are included:

```typescript
const pages = [
  {
    path: '/your-page',
    keywords: ['key1', 'key2'],
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  // ... more pages
];
```

### Step 4: Add OG Images (Optional)
Place your OpenGraph image at `public/images/og-default.jpg` (1200x630px)

This will be used for:
- Social media sharing (Facebook, LinkedIn)
- Link previews (Discord, Slack)
- Twitter cards

### Step 5: Build and Deploy
```bash
pnpm build
pnpm start
```

Your sitemap will be generated at: `https://yourdomain.com/sitemap.xml`

## How to Add New Pages

When you create a new page:

1. **Add to sitemap.ts:**
```typescript
{
  path: '/new-page',
  keywords: ['keyword1', 'keyword2'],
  priority: 0.8,
  changeFrequency: 'weekly',
}
```

2. **Add to seo-config.ts:**
```typescript
'/new-page': {
  title: 'Page Title | ORR Solutions',
  description: 'Page description...',
  keywords: ['keyword1', 'keyword2'],
}
```

3. **Update page layout.tsx (optional):**
```typescript
import { Metadata } from 'next';
import { getSEOConfig } from '@/lib/seo-config';

const seo = getSEOConfig('/new-page');

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
};
```

## SEO Best Practices

### Keywords
- **3-5 keywords per page** for optimal relevance
- Use **long-tail keywords** (3+ words) for better targeting
- Include variations (singular, plural, related terms)

### Titles
- **50-60 characters** for optimal display in search results
- Include primary keyword at the beginning
- Make it compelling and click-worthy

### Descriptions
- **150-160 characters** for optimal display
- Include primary keyword
- Call-to-action oriented

### Priority Levels
- **1.0**: Homepage and critical pages
- **0.9**: Important service/info pages
- **0.8**: Secondary pages, dashboards
- **0.7**: Tertiary pages, user dashboards
- **0.6**: Support, FAQ pages
- **0.5**: Legal pages (privacy, terms)

### Change Frequency
- **daily**: News, blog, frequently updated content
- **weekly**: Services, main content
- **monthly**: Legal pages, static content
- **yearly**: Old documentation
- **never**: Pages that won't change

## Verification

After deployment, verify your sitemap:

1. **Check sitemap.xml:**
   - Visit: `https://yourdomain.com/sitemap.xml`
   - Should return valid XML

2. **Check robots.txt:**
   - Visit: `https://yourdomain.com/robots.txt`
   - Should show sitemap link

3. **Submit to Search Engines:**
   - Google Search Console: https://search.google.com/search-console
   - Bing Webmaster Tools: https://www.bing.com/webmasters
   - Add your sitemap URL in their respective tools

## Advanced: Dynamic Content

If you have dynamic pages (blog posts, user profiles), create a separate sitemap generator:

```typescript
// app/blog/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch your dynamic pages
  const posts = await fetchAllBlogPosts();
  
  return posts.map((post) => ({
    url: `https://yourdomain.com/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
}
```

## Troubleshooting

**Sitemap not generating?**
- Ensure `NEXT_PUBLIC_SITE_URL` is set in .env.local
- Rebuild the project: `pnpm build`
- Check for syntax errors in sitemap.ts

**Pages not appearing in Google Search?**
- Verify robots.txt allows indexing
- Submit sitemap to Google Search Console
- Wait 1-2 weeks for initial indexing

**OG images not showing on social media?**
- Ensure image dimensions are 1200x630px
- Check image is publicly accessible
- Use Facebook Sharing Debugger to test: https://developers.facebook.com/tools/debug/sharing

## Files Reference

- **Sitemap Config:** [app/sitemap.ts](../../app/sitemap.ts)
- **SEO Config:** [lib/seo-config.ts](../../lib/seo-config.ts)
- **Robots File:** [app/robots.ts](../../app/robots.ts)
- **Root Layout:** [app/layout.tsx](../../app/layout.tsx)

---
**Last Updated:** January 2026
