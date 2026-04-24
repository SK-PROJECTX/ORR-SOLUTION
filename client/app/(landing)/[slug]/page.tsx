import { client } from "@/sanity/lib/client";
import { engagementPageQuery, engagementPagesSlugQuery } from "@/sanity/lib/queries";
import EngagementPageClient from "./EngagementPageClient";
import { notFound } from "next/navigation";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  try {
    const pages = await client.fetch(engagementPagesSlugQuery);
    const staticPaths = Array.isArray(pages)
      ? pages.filter((page: any) => page && page.slug).map((page: any) => ({ slug: page.slug }))
      : [];

    // Ensure we always return at least one path to satisfy Next.js static export if fetch fails
    if (staticPaths.length === 0) {
      return [{ slug: 'general' }];
    }
    return staticPaths;
  } catch (error) {
    console.error("Error in generateStaticParams for Engagement Page:", error);
    return [{ slug: 'general' }];
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicEngagementPage({ params }: PageProps) {
  const { slug } = await params;

  const page = await client.fetch(engagementPageQuery, { slug });

  if (!page) {
    notFound();
  }

  return <EngagementPageClient page={page} />;
}
