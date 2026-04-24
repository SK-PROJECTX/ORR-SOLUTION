import { client } from "@/sanity/lib/client";
import { postBySlugQuery, postsSlugQuery } from "@/sanity/lib/queries";
import BlogDetailClient from "./BlogDetailClient";
import { notFound } from "next/navigation";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  try {
    const posts = await client.fetch(postsSlugQuery);
    const paths = Array.isArray(posts)
      ? posts.filter((p: any) => p && p.slug).map((p: any) => ({ slug: p.slug }))
      : [];
    // output: export requires at least one path — use placeholder when CMS is empty
    return paths.length > 0 ? paths : [{ slug: '__placeholder' }];
  } catch {
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
