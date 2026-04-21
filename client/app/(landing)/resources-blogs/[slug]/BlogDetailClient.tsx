"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import SanityImage from "@/components/SanityImage";
import PortableTextRenderer from "@/components/PortableTextRenderer";

interface Post {
  _id: string;
  title: string;
  slug: string;
  badge: string;
  mainImage: any;
  publishedAt: string;
  body: any[];
  button1Text?: string;
  button2Text?: string;
}

export default function BlogDetailClient({ post }: { post: Post }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (post) {
      const tl = gsap.timeline();
      tl.fromTo(headerRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
      )
      .fromTo(imageRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
    }
  }, [post]);

  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Content Not Found</h1>
      <Link href="/resources-blogs" className="text-green-400 hover:underline">Back to Resources & Blogs</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A1016] text-white selection:bg-green-400 selection:text-black">
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A1016]/80 backdrop-blur-lg border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <Link href="/resources-blogs" className="group flex items-center text-sm font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Blogs
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6">
        <article className="max-w-4xl mx-auto">
          <header ref={headerRef} className="text-center mb-16">
            {post.badge && (
              <span className="inline-block bg-green-400/10 text-green-400 text-xs font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] mb-8 border border-green-400/20">
                {post.badge}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-12 leading-[1.1] tracking-tighter">
              {post.title}
            </h1>
          </header>

          <div ref={imageRef} className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-20 border border-white/10 shadow-2xl">
            <SanityImage 
              asset={post.mainImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div ref={contentRef} className="space-y-8">
            <PortableTextRenderer value={post.body} />

            {(post.button1Text || post.button2Text) && (
              <div className="mt-20 pt-12 border-t border-white/10 flex flex-wrap gap-6 justify-center">
                {post.button1Text && (
                  <button className="bg-white text-black px-10 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform">
                    {post.button1Text}
                  </button>
                )}
                {post.button2Text && (
                  <button className="border border-white/20 hover:border-white bg-white/5 px-10 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:bg-white/10 transition-all">
                    {post.button2Text}
                  </button>
                )}
              </div>
            )}
          </div>
        </article>
      </main>

      <div className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />
        <Link href="/resources-blogs" className="text-gray-500 hover:text-green-400 transition-colors font-bold uppercase tracking-widest text-xs">
          Explore all resources
        </Link>
      </div>
    </div>
  );
}
