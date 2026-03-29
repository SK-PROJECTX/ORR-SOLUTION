"use client";

import { useRef, useState, useEffect } from "react";
import { useScrollSplit } from "@/hooks/useScrollSplit";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import Spinner from "../../../components/ui/Spinner";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// Helper function to decode HTML entities and format content
const decodeAndFormatContent = (content: any): string => {
  if (!content) return '';

  let processedContent = content;

  // Handle the database format: {&#39;format&#39;: &#39;html&#39;, &#39;content&#39;: &#39;...&#39;}
  if (typeof content === 'string' && content.includes('&#39;')) {
    // First decode the HTML entities in the structure
    processedContent = content
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');

    // Extract content from the format object using regex that handles multiline content
    const contentMatch = processedContent.match(/'content':\s*'([\s\S]*?)(?:'\s*}\s*$|'\s*,)/);
    if (contentMatch) {
      processedContent = contentMatch[1]
        .replace(/\\'/g, "'")
        .replace(/\\r\\n/g, '')
        .replace(/\\n/g, '')
        .replace(/\\r/g, '');
    }
  }

  // If it's already an object, extract content
  if (typeof content === 'object' && content.content) {
    processedContent = content.content;
  }

  // Add line breaks after list items
  if (processedContent && processedContent.includes('</li>')) {
    processedContent = processedContent.replace(/<\/li>/g, '</li><br>');
  }

  return processedContent || '';
};

interface ContentCard {
  id: number;
  badge: any;
  title: any;
  content: string[] | { content: string }[];
  image_url: string;
  button1_text?: any;
  button2_text?: any;
  order: number;
  is_active: boolean;
}

interface ResourcesPageData {
  id: number;
  hero_title: any;
  hero_description1: any;
  hero_description2: any;
  hero_description3: any;
  hero_button1_text: any;
  hero_button2_text: any;
  meta_title?: any;
  meta_description?: any;
  is_active: boolean;
}

interface ResourcesData {
  page: ResourcesPageData;
  cards: ContentCard[];
}

import { useCachedData } from "../../../hooks/useCachedData";

export default function ResourcesBlogs() {
  useScrollSplit();

  const { data, loading } = useCachedData<ResourcesData>(
    'orr_resources_content',
    `${process.env.NEXT_PUBLIC_API_URL || 'https://orr-backend.orr.solutions'}/admin-portal/v1/cms/resources-content/`,
    (data) => data
  );

  if (loading) {
    return <Spinner />;
  }

  if (!data) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen text-white ">
      <HeroSection data={data.page} />
      <div className="scroll-section">
        <ContentSection cards={data.cards} />
      </div>
    </div>
  );
}

// Design: HeroSection Redesign
function HeroSection({ data }: { data: ResourcesPageData }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const p3Ref = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Subtle background parallax
    gsap.to(containerRef.current, {
      backgroundPosition: "50% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 40, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }
    )
      .fromTo([p1Ref.current, p2Ref.current, p3Ref.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative px-6 my-20 md:px-16 pt-32 pb-24 min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60">
          <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.hero_title) || 'Resources & Client Portal' }} />
        </h1>

        <div className="space-y-6 max-w-3xl mb-12">
          <p ref={p1Ref} className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
            <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.hero_description1) || 'Loading content...' }} />
          </p>
          <p ref={p2Ref} className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
            <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.hero_description2) || 'Loading content...' }} />
          </p>
          <p ref={p3Ref} className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
            <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.hero_description3) || 'Loading content...' }} />
          </p>
        </div>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href='/register' className="group relative inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase overflow-hidden hover:scale-105 transition-transform duration-300">
            <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.hero_button1_text) || 'Request Access' }} className="relative z-10" />
            <div className="absolute inset-0 bg-green-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
          </Link>
          <Link href='/services' className="inline-flex items-center justify-center border hover:border-white border-white/20 bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase hover:bg-white/10 transition-all duration-300">
            <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.hero_button2_text) || 'Learn More' }} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContentSection({ cards }: { cards: ContentCard[] }) {
  if (!cards || cards.length === 0) return null;

  // Sort cards by order field
  const sortedCards = [...cards].sort((a, b) => (a.order || 0) - (b.order || 0));

  const featuredCard = sortedCards[0];
  const gridCards = sortedCards.slice(1);

  return (
    <section className="px-6 md:px-16 pb-32 relative z-10">
      <div className="max-w-7xl mx-auto space-y-24">
        {featuredCard && <FeaturedCardComponent card={featuredCard} />}

        {gridCards.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-white">Latest Articles</h2>
              <div className="h-[1px] flex-grow ml-8 bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            {/* Bento Grid / Masonry style structure */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
              {gridCards.map((card, index) => (
                <ContentCardComponent
                  key={card.id}
                  card={card}
                  // Make every 3rd card span 2 columns on lg screens to create a bento feel
                  className={index % 5 === 0 ? 'lg:col-span-2' : ''}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedCardComponent({ card }: { card: ContentCard }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <Link
      href={`/resources-blogs/${card.id}`}
      ref={cardRef}
      className="relative group block rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0C141D] transition-all duration-700 cursor-pointer hover:border-green-400/50"
    >
      <div className="flex flex-col lg:flex-row lg:h-[500px]">
        {/* Image side */}
        <div className="relative w-full lg:w-1/2 h-80 lg:h-full overflow-hidden">
          <div className="absolute inset-0 bg-[#0A1016]/40 z-10 mix-blend-multiply group-hover:bg-transparent transition-all duration-500" />
          <img
            src={card.image_url}
            alt={card.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-6 left-6 z-20">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-xl">
              <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(card.badge) || 'Featured' }} />
            </span>
          </div>
        </div>

        {/* Content side */}
        <div className="relative z-20 w-full lg:w-1/2 p-8 md:p-14 flex flex-col justify-center">
          <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight group-hover:text-green-400 transition-colors duration-300">
            <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(card.title) || '' }} />
          </h3>

          <div className="text-gray-300 text-lg leading-relaxed font-light">
            <div>
              <p className="line-clamp-4">
                {Array.isArray(card.content)
                  ? card.content.slice(0, 3).map(item =>
                    typeof item === 'string' ? item : (item as { content: string }).content || ''
                  ).join(' ')
                  : typeof card.content === 'string' ? card.content : ''}
              </p>
              <div className="mt-8 flex items-center text-green-400 font-semibold group/btn w-fit">
                Read Article
                <svg className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ContentCardComponent({ card, className = '' }: { card: ContentCard, className?: string }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        }
      }
    );
  }, []);

  return (
    <Link
      href={`/resources-blogs/${card.id}`}
      ref={cardRef}
      className={`group relative bg-[#131E2A]/80 backdrop-blur-md rounded-[2rem] p-6 md:p-8 border border-white/5 cursor-pointer transition-all duration-500 hover:bg-[#1A2938] hover:border-white/20 hover:shadow-2xl hover:-translate-y-1 h-full block ${className}`}
    >
      <div className="flex flex-col h-full">
        <div className="mb-6 relative overflow-hidden rounded-2xl shrink-0">
          <img
            src={card.image_url}
            alt={card.title}
            className="w-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out h-56"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="flex flex-col flex-grow">
          <div className="mb-4">
            <span className="inline-block bg-white/10 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10 group-hover:bg-green-400 group-hover:text-black group-hover:border-green-400 transition-colors duration-300">
              <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(card.badge) || '' }} />
            </span>
          </div>

          <h3 className="font-bold mb-4 text-white group-hover:text-green-300 transition-colors duration-300 text-xl md:text-2xl leading-tight">
            <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(card.title) || '' }} />
          </h3>

          <div className="text-gray-400 text-base leading-relaxed font-light mt-auto">
            <div className="relative">
              <p className="line-clamp-3">
                {Array.isArray(card.content)
                  ? card.content.map(item =>
                    typeof item === 'string' ? item : (item as { content: string }).content || ''
                  ).join(' ')
                  : typeof card.content === 'string' ? card.content : ''}
              </p>
              <div className="absolute bottom-0 right-0 w-1/3 h-6 bg-gradient-to-l from-[#131E2A]/80 to-transparent group-hover:from-[#1A2938] transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative dot */}
      <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-white/20 group-hover:bg-green-400 group-hover:shadow-[0_0_10px_#4ade80] transition-all duration-300" />
    </Link>
  );
}