"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SafeHTMLRenderer from "../../components/SafeHTMLRenderer";
import { useTheme } from '../components/ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

interface BusinessSystemSectionProps {
  content?: any;
}

export default function BusinessSystemSection({ content }: BusinessSystemSectionProps) {
  const [businessSystemData, setBusinessSystemData] = useState<any>(null);
  const [businessSystemCards, setBusinessSystemCards] = useState<any[]>([]);
  
  const sectionRef = useRef<HTMLElement>(null);

  const { theme } = useTheme();

    const imageSrc =
     
useEffect(() => {
  const fetchData = async () => {
    try {
      const [sectionResponse, cardsResponse] = await Promise.all([
        fetch('https://orr-backend.orr.solutions/admin-portal/v1/cms/business-system-section/'),
        fetch('https://orr-backend.orr.solutions/admin-portal/v1/cms/business-system-cards/')
      ]);

      if (sectionResponse.ok) {
        const sectionResult = await sectionResponse.json();
        setBusinessSystemData(sectionResult.data);
      }

      if (cardsResponse.ok) {
        const cardsResult = await cardsResponse.json();
        let cardsData = cardsResult?.data ?? cardsResult;
        const cardsArray = Array.isArray(cardsData) ? cardsData : [];
        const sortedCards = cardsArray.sort(
          (a: any, b: any) => (a.order || 0) - (b.order || 0)
        );
        setBusinessSystemCards(sortedCards);
      }
    } catch (error) {
      console.error("Error fetching business system data:", error);
    }
  };

  fetchData();
}, []);

  const getStringValue = (value: any): string => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object' && value.content) return value.content;
    return '';
  };

  // Default dummy data
  const defaultCards = [
    {
      id: 'default-1',
      title: 'Organs',
      description: 'Where your teams breathe and work. We help them move as one.',
      image: null,
      order: 1
    },
    {
      id: 'default-2',
      title: 'Nervous System',
      description: 'Your signals seeking clarity. We quiet the noise and guide their path.',
      image: null,
      order: 2
    },
    {
      id: 'default-3', 
      title: 'Circulatory System',
      description: 'Your lifeblood in motion. We restore balance to the flow.',
      image: null,
      order: 3
    },
    {
      id: 'default-4',
      title: 'Immune System', 
      description: 'Your unseen shields. We strengthen them before pressure arrives.',
      image: null,
      order: 4
    },
    {
      id: 'default-5',
      title: 'DNA',
      description: 'The pattern beneath everything. We help you rewrite it with intention.',
      image: null,
      order: 5
    },
    {
      id: 'default-6',
      title: 'Metabolism',
      description: 'The hum of everyday work. We make its rhythm lighter and stronger.',
      image: null,
      order: 6
    },
    {
      id: 'default-7',
      title: 'Senses',
      description: 'Your way of listening to the world. We sharpen perception into insight.',
      image: null,
      order: 7
    }
  ];

  // Use backend cards if available, otherwise use default dummy data
  const cardsToDisplay = businessSystemCards.length > 0 ? businessSystemCards : defaultCards;

  return (
    <section ref={sectionRef} className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background Image */}
          <div className="absolute inset-0">     
           <Image
              key={theme}
              src={
                theme === "dark"
                  ? "https://res.cloudinary.com/depeqzb6z/image/upload/v1771326436/ChatGPT_Image_Feb_17_2026_03_02_41_AM_ozzzwl.png?dark"
                  : "https://res.cloudinary.com/depeqzb6z/image/upload/v1766108164/Body_gfyom3.jpg?light"
              }
              alt="Background"
              fill
              className="object-cover opacity-30"
            />
        <div className="absolute inset-0 bg-slate-900/80" />
      </div>
  


      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 text-center mb-5 sm:mb-15 lg:mb-10">
        <h2 className="text-white text-4xl font-poppins sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug mb-6">
          <SafeHTMLRenderer data={businessSystemData?.title} fallback="Business as a Living System" />
        </h2>
        <p className="text-white font-poppins font-light text-base sm:text-lg md:text-xl lg:text-2xl mt-4 mb-8">
          <SafeHTMLRenderer data={businessSystemData?.subtitle} fallback="Every part connected, every function vital" />
        </p>
      </div>

      {/* Business System Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
        {cardsToDisplay.map((card, index) => (
          <div key={card.id} className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-emerald-400/50 hover:scale-105 hover:rotate-1 transition-all duration-500 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-emerald-400 rounded-full mr-3 animate-pulse" />
                <h3 className="text-emerald-400 text-xl font-bold font-poppins">
                  <SafeHTMLRenderer data={card.title} fallback={`System ${index + 1}`} />
                </h3>
              </div>
              <p className="text-white/90 font-poppins font-light text-base leading-relaxed">
                <SafeHTMLRenderer data={card.description} fallback="Business system description" />
              </p>
              <div className="absolute top-4 right-4 w-8 h-8 border border-emerald-400/30 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}