"use client";

import { useRef, useState, useEffect } from "react";
import { useScrollSplit } from "@/hooks/useScrollSplit";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

interface ContentCard {
  id: number;
  badge: string;
  title: string;
  content: string[];
  image_url: string;
  button1_text?: string;
  button2_text?: string;
  order: number;
  is_active: boolean;
}

interface ResourcesPageData {
  id: number;
  hero_title: string;
  hero_description1: string;
  hero_description2: string;
  hero_description3: string;
  hero_button1_text: string;
  hero_button2_text: string;
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
}

interface ResourcesData {
  page: ResourcesPageData;
  cards: ContentCard[];
}

export default function ResourcesBlogs() {
  useScrollSplit();
  const [data, setData] = useState<ResourcesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Fetching Resources data from backend...');
        const response = await axios.get('http://127.0.0.1:8000/admin-portal/v1/cms/resources-content/');
        console.log('✅ Resources API Response:', response.data);
        if (response.data.success) {
          console.log('📊 Resources Data Structure:', {
            page: response.data.data.page,
            cards: response.data.data.cards.length + ' cards'
          });
          setData(response.data.data);
        }
      } catch (error) {
        console.error('❌ Error fetching Resources data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-white text-xl">Error loading content</div>
      </div>
    );
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
        {data.hero_title?.split('&').map((part, index) => (
          <span key={index}>
            {index === 0 ? part : <span className="text-green-400">& {part}</span>}
            {index === 0 && <br />}
          </span>
        )) || 'Resources & Client Portal'}
      </h1>
      
      <p ref={p1Ref} className="max-w-2xl text-gray-300 text-lg mb-8 leading-relaxed">
        {data.hero_description1 || 'Loading content...'}
      </p>
      
      <p ref={p2Ref} className="max-w-3xl text-gray-300 mb-12 leading-relaxed">
        {data.hero_description2 || 'Loading content...'}
      </p>
      
      <p ref={p3Ref} className="max-w-3xl text-gray-300 mb-12 leading-relaxed">
        {data.hero_description3 || 'Loading content...'}
      </p>
      
      <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-green-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-green-300 transition-colors">
          {data.hero_button1_text || 'Request Access'}
        </button>
        <button className="border border-green-400 text-green-400 px-8 py-3 rounded-full font-semibold hover:bg-green-400 hover:text-black transition-colors">
          {data.hero_button2_text || 'Learn More'}
        </button>
      </div>
    </section>
  );
}

function ContentSection({ cards }: { cards: ContentCard[] }) {
  return (
    <section className="px-6 md:px-16 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {cards.map((card, index) => (
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
      className={`bg-[#1A2B3D] rounded-3xl p-6 border border-gray-700/30 cursor-pointer transition-all duration-300 ${
        isExpanded ? 'bg-[#1F3247]' : 'hover:bg-[#1A2B3D]/80'
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
          {card.badge}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mb-6">{card.title}</h3>
      
      <div className="text-gray-300 text-sm leading-relaxed">
        {!isExpanded ? (
          <div>
            <p className="line-clamp-3">{card.content.slice(0, 2).join(' ')}</p>
            <p className="text-gray-400 mt-2">...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {card.content.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        )}
      </div>
      
      {card.button1_text && card.button2_text && isExpanded && (
        <div className="flex flex-col gap-3 mt-6">
          <button className="bg-green-400 text-black hover:bg-green-300 px-6 py-3 rounded-full font-semibold transition-colors">
            {card.button1_text}
          </button>
          <button className="border border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-6 py-3 rounded-full font-semibold transition-colors">
            {card.button2_text}
          </button>
        </div>
      )}
    </div>
  );
}