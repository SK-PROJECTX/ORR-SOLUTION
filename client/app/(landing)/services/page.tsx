"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Spinner from "../../../components/ui/Spinner";
import { getRichTextContent } from "../../../lib/rich-text-utils";

// Map pillar index → detail page route
const PILLAR_ROUTES: Record<number, string> = {
  0: '/services/strategy-advisory-compliant',
  1: '/services/operational-systems-infrastructure',
  2: '/services/living-systems-regeneration',
};

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

interface ServiceStage {
  id: number;
  stage_number: number;
  title: any;
  subtitle: any;
  description: any;
  focus_content: any;
  button_text: any;
  order: number;
  is_active: boolean;
}

interface ServicePillar {
  id: number;
  title: any;
  description: any;
  button_text: any;
  order: number;
  is_active: boolean;
}

interface ServicesPageData {
  id: number;
  hero_title: any;
  hero_subtitle: any;
  pillars_title: any;
  business_gp_title: any;
  business_gp_subtitle: any;
  business_gp_description: any;
  business_gp_button_text: any;
  business_gp_image: string;
  meta_title?: any;
  meta_description?: any;
  is_active: boolean;
}

interface ServicesData {
  page: ServicesPageData;
  stages: ServiceStage[];
  pillars: ServicePillar[];
}

export default function Services() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [data, setData] = useState<ServicesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Fetching Services data from backend...');
        const response = await axios.get('https://orr-backend.orr.solutions/admin-portal/v1/cms/services-content/');
        console.log('✅ Services API Response:', response.data);
        console.log('🔍 Full Response Data Structure:', JSON.stringify(response.data, null, 2));
        if (response.data.success) {
          console.log('📊 Services Data Structure:', {
            page: response.data.data.page,
            stages: response.data.data.stages.length + ' stages',
            pillars: response.data.data.pillars.length + ' pillars',
            pillarsData: response.data.data.pillars
          });
          console.log('🏛️ Pillars Array Details:', response.data.data.pillars.map((pillar: any, index: number) => ({
            index,
            id: pillar.id,
            title: pillar.title,
            description: pillar.description,
            button_text: pillar.button_text,
            order: pillar.order,
            is_active: pillar.is_active
          })));
          setData(response.data.data);
        }
      } catch (error) {
        console.error('❌ Error fetching Services data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [data]);

  if (loading) {
    return <Spinner />;
  }

  if (!data) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen text-foreground">
      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        section {
          opacity: 0;
          transform: translateY(30px);
        }
      `}</style>
      {/* Hero Section */}
      <section
        ref={el => { sectionsRef.current[0] = el; }}
        className="pt-32 pb-16 px-6 relative min-h-[80vh] flex items-center"
      >
        <div className="absolute inset-0 " />
        <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-30 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.page.hero_title) || "ORR Solutions - Listen. Solve. Optimise." }} />
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.page.hero_subtitle) || "We treat your organisation as a whole system — digital, regulatory, and living." }} />
          </p>
        </div>
      </section>

      {/* Process Stages */}
      <section
        ref={el => { sectionsRef.current[1] = el; }}
        className="py-16 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 md:grid-rows-2">
            {data.stages.slice(0, 4).map((stage, index) => (
              <div key={stage.id} className="bg-slate-700 rounded-2xl p-8 text-white flex flex-col">
                <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-4">
                  <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(stage.title) || "Stage Title" }} />
                </h2>
                <h3 className="text-lg font-semibold mb-4">
                  <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(stage.subtitle) || "Stage Subtitle" }} />
                </h3>
                <p className="text-gray-300 text-sm mb-6">
                  <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(stage.description) || "Stage Description" }} />
                </p>
                <div className="text-gray-300 text-sm mb-8 flex-grow">
                  <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(stage.focus_content) || "Focus Content" }} />
                </div>
                <Link href="/contact" className="w-full bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-emerald-600 transition-colors mt-auto cursor-pointer block text-center">
                  <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(stage.button_text) || "Learn More" }} />
                </Link>
              </div>
            ))}
          </div>

          {/* Stage 5 - Grow (Full Width) */}
          {data.stages[4] && (
            <div className="bg-slate-700 rounded-2xl p-8 text-white max-w-[600px] mx-auto">
              <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">
                <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.stages[4].title) || "Stage 5 Title" }} />
              </h2>
              <h3 className="text-lg font-semibold mb-4">
                <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.stages[4].subtitle) || "Stage 5 Subtitle" }} />
              </h3>
              <p className="text-gray-300 text-sm mb-6">
                <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.stages[4].description) || "Stage 5 Description" }} />
              </p>
              <div className="text-gray-300 text-sm mb-8">
                <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.stages[4].focus_content) || "Focus Content" }} />
              </div>
              <Link href="/register" className="w-full bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer block text-center">
                <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.stages[4].button_text) || "Learn More" }} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* The Three Pillars */}
      <section
        ref={el => { sectionsRef.current[2] = el; }}
        className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-emerald-800 min-h-[80vh] flex items-center"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">
              <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.page.pillars_title) || "Our Services" }} />
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {(() => {
              console.log('🔍 Pillars Data Debug:', {
                pillarsArray: data.pillars,
                pillarsLength: data.pillars?.length,
                firstPillar: data.pillars?.[0],
                allPillarsData: data.pillars?.map((p: any) => ({
                  id: p.id,
                  title: p.title,
                  description: p.description,
                  button_text: p.button_text
                }))
              });
              return data.pillars.map((pillar, index) => (
                <div key={pillar.id} className="bg-black rounded-2xl px-8 py-12 text-white flex flex-col min-h-[300px]">
                  <h3 className="text-3xl font-bold mb-8 text-center">
                    <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(pillar.title) || "Pillar Title" }} />
                  </h3>
                  <p className="text-gray-300 text-xl mb-8 text-center flex-grow">
                    <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(pillar.description) || "Pillar Description" }} />
                  </p>
                  <Link
                    href={PILLAR_ROUTES[index] || '/services'}
                    className="w-full bg-gradient-primary text-[#204460] font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity mt-8 cursor-pointer block text-center"
                  >
                    <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(pillar.button_text) || "Learn More" }} />
                  </Link>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Business GP Section */}
      <section
        ref={el => { sectionsRef.current[3] = el; }}
        className="py-20 px-6 bg-background star relative min-h-[80vh] flex items-center"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.page.business_gp_title) || "Business GP Title" }} />
              </h2>
              <h3 className="text-4xl font-bold mb-8 text-white">
                <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.page.business_gp_subtitle) || "Business GP Subtitle" }} />
              </h3>
              <p className="text-gray-300 text-xl mb-8">
                <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.page.business_gp_description) || "Business GP Description" }} />
              </p>
              <Link href="/contact" className="inline-block bg-gradient-primary text-[#204460] px-12 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors">
                <span dangerouslySetInnerHTML={{ __html: decodeAndFormatContent(data.page.business_gp_button_text) || "Contact Us" }} />
              </Link>
            </div>
            <div>
              <img
                src={data.page.business_gp_image}
                alt="Business handshake"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}