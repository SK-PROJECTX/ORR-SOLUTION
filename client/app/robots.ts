import { MetadataRoute } from 'next';

export const revalidate = false;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://orr.solutions/';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/auth', '/payment', '/email-confirmation', '/reset-password', '/verify-email'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
