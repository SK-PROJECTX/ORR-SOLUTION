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
    <div className="min-h-screen text-white">
      <HeroSection data={data.page} />
      <div className="scroll-section"><ContentSection cards={data.cards} /></div>
    </div>
  );
}

function HeroSection({ data }: { data: ResourcesPageData }) {
  const titleRef = useRef(null);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);
  const p3Ref = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    gsap.fromTo(p1Ref.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: "power2.out" });
    gsap.fromTo(p2Ref.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.5, ease: "power2.out" });
    gsap.fromTo(p3Ref.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.7, ease: "power2.out" });
    gsap.fromTo(buttonsRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.9, ease: "back.out(1.7)" });
  }, []);

  return (
    <section className="relative px-6 my-20 md:px-16 py-20 min-h-screen flex flex-col items-start justify-center">
      <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-6">
        <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.hero_title) || 'Resources & Client Portal' }} />
      </h1>

      <p ref={p1Ref} className="max-w-2xl text-gray-300 text-lg mb-8 leading-relaxed">
        <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.hero_description1) || 'Loading content...' }} />
      </p>

      <p ref={p2Ref} className="max-w-3xl text-gray-300 mb-12 leading-relaxed">
        <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.hero_description2) || 'Loading content...' }} />
      </p>

      <p ref={p3Ref} className="max-w-3xl text-gray-300 mb-12 leading-relaxed">
        <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.hero_description3) || 'Loading content...' }} />
      </p>

      <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href='/register' className="bg-green-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-green-300 transition-colors">
          <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.hero_button1_text) || 'Request Access' }} />
        </Link>
        <Link href='/services' className="border border-green-400 text-green-400 px-8 py-3 rounded-full font-semibold hover:bg-green-400 hover:text-black transition-colors">
          <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.hero_button2_text) || 'Learn More' }} />
        </Link>
      </div>
    </section>
  );
}

function ContentSection({ cards }: { cards: ContentCard[] }) {
  // Sort cards by order field
  const sortedCards = [...cards].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section className="px-6 md:px-16 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {sortedCards.map((card, index) => (
          <ContentCardComponent key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}

function ContentCardComponent({ card }: { card: ContentCard }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(cardRef.current,
      { opacity: 0, rotateY: -15, x: -50 },
      {
        opacity: 1,
        rotateY: 0,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "top 15%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  }, []);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className={`bg-[#1A2B3D] rounded-3xl p-6 border border-gray-700/30 cursor-pointer transition-all duration-300 ${isExpanded ? 'bg-[#1F3247]' : 'hover:bg-[#1A2B3D]/80'
        }`}
    >
      <div className="mb-6">
        <img
          src={card.image_url}
          alt={card.title}
          className="w-full h-48 object-cover rounded-2xl"
        />
      </div>

      <div className="mb-4">
        <span className="bg-green-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
          <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(card.badge) || '' }} />
        </span>
      </div>

      <h3 className="text-xl font-bold mb-6">
        <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(card.title) || '' }} />
      </h3>

      <div className="text-gray-300 text-sm leading-relaxed">
        {!isExpanded ? (
          <div>
            <p className="line-clamp-3">
              {Array.isArray(card.content)
                ? card.content.slice(0, 2).map(item =>
                  typeof item === 'string' ? item : (item as { content: string }).content || ''
                ).join(' ')
                : typeof card.content === 'string' ? card.content : ''}
            </p>
            <p className="text-gray-400 mt-2">...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {Array.isArray(card.content) ? card.content.map((item, index) => (
              <p key={index}>{typeof item === 'string' ? item : (item as { content: string }).content || ''}</p>
            )) : <p>{typeof card.content === 'string' ? card.content : ''}</p>}
          </div>
        )}
      </div>

      {card.button1_text && card.button2_text && isExpanded && (
        <div className="flex flex-col gap-3 mt-6">
          <button className="bg-green-400 text-black hover:bg-green-300 px-6 py-3 rounded-full font-semibold transition-colors">
            <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(card.button1_text) || '' }} />
          </button>
          <button className="border border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-6 py-3 rounded-full font-semibold transition-colors">
            <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(card.button2_text) || '' }} />
          </button>
        </div>
      )}
    </div>
  );
}