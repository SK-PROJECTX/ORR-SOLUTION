"use client"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Spinner from "../../../components/ui/Spinner";

interface ProcessStep {
  id: number;
  step_number: string;
  title: string;
  subtitle?: string;
  description?: string;
  bullet1?: string;
  bullet2?: string;
  bullet3?: string;
  bullet4?: string;
  bullet5?: string;
  bullet6?: string;
  bullet7?: string;
  bullet8?: string;
  bullet9?: string;
  wordbreak?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  image_url: string;
  button_text?: string;
  button_text2?: string;
  button_text3?: string;
  order: number;
  is_active: boolean;
}

interface PageData {
  id: number;
  hero_title: string;
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
}

interface HowWeOperateData {
  page: PageData;
  steps: ProcessStep[];
}

export default function StickyScrollSplit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState<HowWeOperateData | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Fetching How We Operate data from backend...');
        const response = await axios.get('https://orr-backend-web-latest.onrender.com/admin-portal/v1/cms/how-we-operate/');
        console.log('✅ How We Operate API Response:', response.data);
        if (response.data.success) {
          console.log('📊 How We Operate Data Structure:', {
            page: response.data.data.page,
            steps: response.data.data.steps.length + ' steps'
          });
          setData(response.data.data);
        }
      } catch (error) {
        console.error('❌ Error fetching How We Operate data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const sections = containerRef.current.querySelectorAll('.card-section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index: number) => {
        const htmlSection = section as HTMLElement;
        const sectionTop = htmlSection.offsetTop;
        const sectionBottom = sectionTop + htmlSection.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data]);

  if (loading) {
    return <Spinner />;
  }

  if (!data) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="relative w-full py-20 pt-32 text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
          <h1 className="text-center text-emerald-400 text-5xl md:text-6xl font-bold mb-12">
            {data.page.hero_title?.split(' ').map((word, index) => (
              <span key={index} className={index === 0 ? 'text-emerald-400' : 'text-white'}>
                {word}{' '}
              </span>
            )) || 'How We Operate'}
          </h1>
        </div>
      </div>

      {/* Split Layout Section */}
      <div ref={containerRef} className="relative mt-90 lg:mt-0 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-20 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left Side - Stacking Cards */}
          <div>
            {data.steps.map((card, index) => (
              <div
                key={card.id}
                className="card-section"
                style={{
                  height: '100vh',
                  position: 'sticky',
                  top: `${24 + index * 2}px`,
                  zIndex: index + 1
                }}
              >
                <div
                  className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 w-full transition-all duration-700 ease-out"
                  style={{
                    transform: activeIndex === index 
                      ? 'scale(1) rotateY(0deg)' 
                      : activeIndex > index 
                        ? `scale(${0.95 - (activeIndex - index) * 0.03}) rotateY(-2deg)` 
                        : 'scale(0.98) rotateY(2deg)',
                    opacity: 1,
                    boxShadow: activeIndex === index 
                      ? '0 25px 50px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(16, 185, 129, 0.1)' 
                      : '0 10px 30px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {card.step_number}
                    </div>
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">+</span>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                    {card.title}
                  </h2>
                  
                  {card.subtitle && (
                    <h3 className="text-base sm:text-lg font-semibold text-emerald-400 mb-4">
                      {card.subtitle}
                    </h3>
                  )}
                  
                  {card.description && (
                    <p className="text-sm sm:text-base text-white mb-4">{card.description}</p>
                  )}
                  
                  <div className="space-y-2">
                    {card.bullet1 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet1}</p>}
                    {card.bullet2 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet2}</p>}
                    {card.wordbreak && <p className="text-white text-base sm:text-lg font-bold text-center my-4">{card.wordbreak}</p>}
                    {card.bullet3 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet3}</p>}
                    {card.bullet4 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet4}</p>}
                    {card.bullet5 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet5}</p>}
                    {card.bullet6 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet6}</p>}
                    {card.bullet7 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet7}</p>}
                    {card.bullet8 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet8}</p>}
                    {card.bullet9 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet9}</p>}
                  </div>
                  
                  {card.description1 && <p className="text-gray-300 text-sm sm:text-base mt-4">{card.description1}</p>}
                  {card.description2 && <p className="text-gray-300 text-sm sm:text-base mt-2">{card.description2}</p>}
                  {card.description3 && <p className="text-gray-300 text-sm sm:text-base mt-2">{card.description3}</p>}
                  {card.description4 && <p className="text-gray-300 text-sm sm:text-base mt-2">{card.description4}</p>}
                  
                  {card.button_text && (
                    <div className="flex flex-col gap-3 mt-6">
                      <button className="bg-emerald-400 text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-emerald-300 transition-all hover:scale-105 text-sm sm:text-base">
                        {card.button_text}
                      </button>
                      {card.button_text2 && (
                        <button className="border border-emerald-400 text-emerald-400 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-emerald-400 hover:text-black transition-all hover:scale-105 text-sm sm:text-base">
                          {card.button_text2}
                        </button>
                      )}
                      {card.button_text3 && (
                        <button className="border border-emerald-400 text-emerald-400 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-emerald-400 hover:text-black transition-all hover:scale-105 text-sm sm:text-base">
                          {card.button_text3}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Fixed Image */}
          <div className="block static">
            <div className="fixed top-52 left-1/2 transform -translate-x-1/2 lg:top-58 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-[85%] sm:w-[80%] lg:w-[75%] max-w-[500px] sm:max-w-[600px] lg:max-w-[900px] h-[45vh] sm:h-[45vh] lg:h-[calc(75vh-3rem)] z-0">
              <div className="w-full h-full flex items-center">
                <div className="relative w-full h-full rounded-xl lg:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    key={activeIndex}
                    src={data.steps[activeIndex]?.image_url}
                    alt={data.steps[activeIndex]?.title}
                    className="w-full h-full object-cover transition-all duration-1000 ease-out"
                    style={{
                      transform: 'scale(1.05)',
                      animation: `imageAnim${activeIndex % 5} 1s ease-out`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <div className="absolute bottom-2 lg:bottom-8 left-2 lg:left-8 right-2 lg:right-8">
                    <div className="text-emerald-400 text-sm lg:text-xl font-bold mb-1 lg:mb-2">
                      {data.steps[activeIndex]?.step_number}
                    </div>
                    <div className="text-white text-sm lg:text-2xl xl:text-3xl font-bold">
                      {data.steps[activeIndex]?.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes imageAnim0 {
          0% { opacity: 0; transform: scale(1.2) translateX(30px); filter: blur(6px); }
          100% { opacity: 1; transform: scale(1.05) translateX(0px); filter: blur(0px); }
        }
        @keyframes imageAnim1 {
          0% { opacity: 0; transform: scale(0.8) translateY(-30px) rotate(5deg); filter: brightness(0.5); }
          100% { opacity: 1; transform: scale(1.05) translateY(0px) rotate(0deg); filter: brightness(1); }
        }
        @keyframes imageAnim2 {
          0% { opacity: 0; transform: scale(1.1) translateX(-40px) skewX(10deg); filter: saturate(0); }
          100% { opacity: 1; transform: scale(1.05) translateX(0px) skewX(0deg); filter: saturate(1); }
        }
        @keyframes imageAnim3 {
          0% { opacity: 0; transform: scale(0.9) translateY(40px) rotateX(20deg); filter: contrast(0.3); }
          100% { opacity: 1; transform: scale(1.05) translateY(0px) rotateX(0deg); filter: contrast(1); }
        }
        @keyframes imageAnim4 {
          0% { opacity: 0; transform: scale(1.3) translate(-20px, 20px) rotateZ(-3deg); filter: hue-rotate(180deg); }
          100% { opacity: 1; transform: scale(1.05) translate(0px, 0px) rotateZ(0deg); filter: hue-rotate(0deg); }
        }
      `}</style>
    </div>
  );
}