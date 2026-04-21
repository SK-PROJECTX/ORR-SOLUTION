import { client } from "@/sanity/lib/client";
import { engagementPageQuery, engagementPagesSlugQuery } from "@/sanity/lib/queries";
import EngagementPageClient from "./EngagementPageClient";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const pages = await client.fetch(engagementPagesSlugQuery);
    if (!Array.isArray(pages)) {
      console.warn("Engagement pages slug query did not return an array:", pages);
      return [];
    }
    return pages
      .filter((page: any) => page && page.slug)
      .map((page: any) => ({
        slug: page.slug,
      }));
  } catch (error) {
    console.error("Error in generateStaticParams for Engagement Page:", error);
    return [];
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
