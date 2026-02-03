"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getRichTextContent } from "../../lib/rich-text-utils";
import SafeHTMLRenderer from "../../components/SafeHTMLRenderer";
import { useHomepageContent } from "../../hooks/useHomepageContent";

gsap.registerPlugin(ScrollTrigger);

const systems = {
  organs: {
    label: "Organs",
    text: "Where your teams breathe and work. We help them move as one."
  },
  nervous: {
    label: "Nervous System",
    text: "Your signals seeking clarity. We quiet the noise and guide their path."
  },
  circulatory: {
    label: "Circulatory System",
    text: "Your lifeblood in motion. We restore balance to the flow."
  },
  immune: {
    label: "Immune System",
    text: "Your unseen shields. We strengthen them before pressure arrives."
  },
  dna: {
    label: "DNA",
    text: "The pattern beneath everything. We help you rewrite it with intention."
  },
  metabolism: {
    label: "Metabolism",
    text: "The hum of everyday work. We make its rhythm lighter and stronger."
  },
  senses: {
    label: "Senses",
    text: "Your way of listening to the world. We sharpen perception into insight."
  }
};

const systemsArray = Object.values(systems);

interface GPMetaphorSectionProps {
  content?: any;
  onContentUpdate?: (data: any) => Promise<void>;
}

export default function GPMetaphorSection({ content, onContentUpdate }: GPMetaphorSectionProps) {
  const { content: homepageContent } = useHomepageContent();
  const businessSystemSection = homepageContent?.businessSystemSection;
  
  const title = getRichTextContent(businessSystemSection?.title) || "Business as a Living System";
  const subtitle = getRichTextContent(businessSystemSection?.subtitle) || "Every part connected, every function vital";
  const card1Title = getRichTextContent(businessSystemSection?.card_1_title) || "Nervous System";
  const card1Description = getRichTextContent(businessSystemSection?.card_1_description) || "Communication, data flow, and decision-making pathways";
  const card2Title = getRichTextContent(businessSystemSection?.card_2_title) || "Circulatory System";
  const card2Description = getRichTextContent(businessSystemSection?.card_2_description) || "Cash flow, resource distribution, and value exchange";
  const card3Title = getRichTextContent(businessSystemSection?.card_3_title) || "Immune System";
  const card3Description = getRichTextContent(businessSystemSection?.card_3_description) || "Risk management, compliance, and protective measures";
  
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/depeqzb6z/image/upload/v1766108164/Body_gfyom3.jpg"
          alt="Body background"
          fill
          className="object-cover opacity-30"
          priority
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
          <SafeHTMLRenderer data={businessSystemSection?.title} fallback="Your business GP for complex systems" />
        </h2>
        <p className="text-white font-poppins font-light text-base sm:text-lg md:text-xl lg:text-2xl mt-4 mb-8">
          <SafeHTMLRenderer data={businessSystemSection?.subtitle} fallback="We diagnose your bottlenecks, treat your administrative and compliance headaches, and unlock hidden value in your data, your operations, and your projects." />
        </p>
        {/* <div className="max-w-4xl mx-auto">
          <button className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-slate-900 font-semibold py-4 px-8 rounded-xl hover:from-emerald-500 hover:to-emerald-700 transition-all duration-300 text-lg">
            Book your free initial consultation
          </button>
        </div> */}
      </div>

      {/* Systems Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
        <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-emerald-400/50 hover:scale-105 hover:rotate-1 transition-all duration-500 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 bg-emerald-400 rounded-full mr-3 animate-pulse" />
              <h3 className="text-emerald-400 text-xl font-bold font-poppins">
                <SafeHTMLRenderer data={businessSystemSection?.card_1_title} fallback="Nervous System" />
              </h3>
            </div>
            <p className="text-white/90 font-poppins font-light text-base leading-relaxed">
              <SafeHTMLRenderer data={businessSystemSection?.card_1_description} fallback="Communication, data flow, and decision-making pathways" />
            </p>
            <div className="absolute top-4 right-4 w-8 h-8 border border-emerald-400/30 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            </div>
          </div>
        </div>
        
        <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-emerald-400/50 hover:scale-105 hover:rotate-1 transition-all duration-500 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 bg-emerald-400 rounded-full mr-3 animate-pulse" />
              <h3 className="text-emerald-400 text-xl font-bold font-poppins">
                <SafeHTMLRenderer data={businessSystemSection?.card_2_title} fallback="Circulatory System" />
              </h3>
            </div>
            <p className="text-white/90 font-poppins font-light text-base leading-relaxed">
              <SafeHTMLRenderer data={businessSystemSection?.card_2_description} fallback="Cash flow, resource distribution, and value exchange" />
            </p>
            <div className="absolute top-4 right-4 w-8 h-8 border border-emerald-400/30 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            </div>
          </div>
        </div>
        
        <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-emerald-400/50 hover:scale-105 hover:rotate-1 transition-all duration-500 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 bg-emerald-400 rounded-full mr-3 animate-pulse" />
              <h3 className="text-emerald-400 text-xl font-bold font-poppins">
                <SafeHTMLRenderer data={businessSystemSection?.card_3_title} fallback="Immune System" />
              </h3>
            </div>
            <p className="text-white/90 font-poppins font-light text-base leading-relaxed">
              <SafeHTMLRenderer data={businessSystemSection?.card_3_description} fallback="Risk management, compliance, and protective measures" />
            </p>
            <div className="absolute top-4 right-4 w-8 h-8 border border-emerald-400/30 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}