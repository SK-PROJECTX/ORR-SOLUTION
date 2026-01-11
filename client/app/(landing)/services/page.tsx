"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface ServiceStage {
  id: number;
  stage_number: number;
  title: string;
  subtitle: string;
  description: string;
  focus_content: string;
  button_text: string;
  order: number;
  is_active: boolean;
}

interface ServicePillar {
  id: number;
  title: string;
  description: string;
  button_text: string;
  order: number;
  is_active: boolean;
}

interface ServicesPageData {
  id: number;
  hero_title: string;
  hero_subtitle: string;
  pillars_title: string;
  business_gp_title: string;
  business_gp_subtitle: string;
  business_gp_description: string;
  business_gp_button_text: string;
  business_gp_image: string;
  meta_title?: string;
  meta_description?: string;
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
        const response = await axios.get('https://orr-backend-web-latest.onrender.com/admin-portal/v1/cms/services-content/');
        console.log('✅ Services API Response:', response.data);
        if (response.data.success) {
          console.log('📊 Services Data Structure:', {
            page: response.data.data.page,
            stages: response.data.data.stages.length + ' stages',
            pillars: response.data.data.pillars.length + ' pillars'
          });
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
    return (
      <div className="min-h-screen text-foreground flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen text-foreground flex items-center justify-center">
        <div className="text-white text-xl">Error loading content</div>
      </div>
    );
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
            <span className="text-emerald-400">{data.page.hero_title.split(' - ')[0]}</span>
            <span className="text-white"> - {data.page.hero_title.split(' - ')[1]}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {data.page.hero_subtitle}
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
                <h2 className="text-xl font-bold mb-4">{stage.title}</h2>
                <h3 className="text-lg font-semibold mb-4">{stage.subtitle}</h3>
                <p className="text-gray-300 text-sm mb-6">{stage.description}</p>
                <div className="text-gray-300 text-sm mb-8 flex-grow">
                  {stage.focus_content.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
                <button className="w-full bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-emerald-600 transition-colors mt-auto cursor-pointer">
                  {stage.button_text}
                </button>
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
              <h2 className="text-xl font-bold mb-4">{data.stages[4].title}</h2>
              <h3 className="text-lg font-semibold mb-4">{data.stages[4].subtitle}</h3>
              <p className="text-gray-300 text-sm mb-6">{data.stages[4].description}</p>
              <div className="text-gray-300 text-sm mb-8">
                {data.stages[4].focus_content.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
              <button className="w-full bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer">
                {data.stages[4].button_text}
              </button>
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
              {data.page.pillars_title.split(' ').map((word, index) => (
                <span key={index} className={index === 2 ? 'text-[#5ef558]' : 'text-white'}>
                  {word}{' '}
                </span>
              ))}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {data.pillars.map((pillar) => (
              <div key={pillar.id} className="bg-black rounded-2xl px-8 py-12 text-white flex flex-col min-h-[300px]">
                <h3 className="text-3xl font-bold mb-8 text-center">{pillar.title}</h3>
                <p className="text-gray-300 text-xl mb-8 text-center flex-grow">{pillar.description}</p>
                <button className="w-full bg-gradient-primary text-[#204460] font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity mt-8 cursor-pointer">
                  {pillar.button_text}
                </button>
              </div>
            ))}
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
                {data.page.business_gp_title}
              </h2>
              <h3 className="text-4xl font-bold mb-8 text-white">
                {data.page.business_gp_subtitle.split('—').map((part, index) => (
                  <span key={index} className={index === 1 ? 'text-green-400' : 'text-white'}>
                    {part}{index === 0 ? ' — ' : ''}
                  </span>
                ))}
              </h3>
              <p className="text-gray-300 text-xl mb-8">
                {data.page.business_gp_description}
              </p>
              <button className="bg-gradient-primary text-[#204460] px-12 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors">
                {data.page.business_gp_button_text}
              </button>
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