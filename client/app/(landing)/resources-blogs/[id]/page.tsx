import BlogClientPage from "./BlogClientPage";

/**
 * generateStaticParams is required by Next.js when using output: "export"
 * with dynamic routes. It tells Next.js which paths to pre-render at build time.
 */
export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://orr-backend.orr.solutions';
  
  try {
    const res = await fetch(`${apiUrl}/admin-portal/v1/cms/resources-content/`, {
      next: { revalidate: 3600 } // Revalidate every hour if not using static export
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch resources for static params: ${res.statusText}`);
      return [];
    }
    
    const result = await res.json();
    
    if (result.success && result.data?.cards) {
      return result.data.cards.map((card: any) => ({
        id: card.id.toString(),
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error generating static params for blogs:", error);
    return [];
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return <BlogClientPage id={id} />;
}
