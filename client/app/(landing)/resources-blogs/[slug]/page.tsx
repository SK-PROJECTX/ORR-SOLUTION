import { client } from "@/sanity/lib/client";
import { postBySlugQuery, postsSlugQuery } from "@/sanity/lib/queries";
import BlogDetailClient from "./BlogDetailClient";
import { notFound } from "next/navigation";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  try {
    const posts = await client.fetch(postsSlugQuery);
    if (!Array.isArray(posts) || posts.length === 0) {
      // output:export requires at least one path — return placeholder when CMS is empty
      return [{ slug: '__placeholder' }];
    }
    return posts
      .filter((post: any) => post && post.slug)
      .map((post: any) => ({
        slug: post.slug,
      }));
  } catch (error) {
    console.error("Error in generateStaticParams for Blog Detail Page:", error);
    return [{ slug: '__placeholder' }];
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  const post = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  return <BlogDetailClient post={post} />;
}
