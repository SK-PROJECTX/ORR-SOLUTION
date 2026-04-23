import { client } from "@/sanity/lib/client";
import { postsQuery, resourcesPageQuery } from "@/sanity/lib/queries";
import ResourcesBlogsClient from "./ResourcesBlogsClient";

export default async function ResourcesBlogsPage() {
  const [posts, pageData] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(resourcesPageQuery),
  ]);

  return <ResourcesBlogsClient posts={posts} pageData={pageData} />;
}