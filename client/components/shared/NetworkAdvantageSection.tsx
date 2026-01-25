"use client";
import { useEffect, useRef } from "react";
import NetworkCard from "../strategy_advisory/NetworkCard";
import { getRichTextHTML } from "@/lib/rich-text-utils";

interface NetworkCard {
  title: string;
  description: string;
  icon: string;
}

interface NetworkAdvantageItem {
  text: string;
  type: string;
}

interface NetworkAdvantageSectionProps {
  title?: string;
  description: string;
  networkCards?: NetworkCard[] | NetworkAdvantageItem[];
  layout?: 'grid' | 'flex';
}

export default function NetworkAdvantageSection({ 
  title = "The ORR Network Advantage", 
  description, 
  networkCards = [], 
  layout = 'flex' 
}: NetworkAdvantageSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Transform network cards data if it's in the new format
  const transformedCards: NetworkCard[] = networkCards.map((card, index) => {
    if ('text' in card && 'type' in card) {
      // New format with text/type structure
      const parts = card.text.split(' — ');
      const title = parts[0]?.trim() || `Network Partner ${index + 1}`;
      const description = parts[1]?.trim() || card.text;
      
      return {
        title: title,
        description: description,
        icon: "M12 2L2 7L12 12L22 7L12 2M2 17L12 22L22 17M2 12L12 17L22 12" // Default icon
      };
    } else {
      // Original format
      return card as NetworkCard;
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.7s ease-out forwards;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .slide-animate {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <div ref={headerRef} className="text-center mb-16 slide-animate">
        <h2 className="text-4xl font-bold text-white mb-4">
          <span dangerouslySetInnerHTML={getRichTextHTML(title)} />
        </h2>
        <p className="text-slate-200 text-lg max-w-3xl mx-auto">
          <span dangerouslySetInnerHTML={getRichTextHTML(description)} />
        </p>
      </div>

      <div ref={cardsRef} className="max-w-6xl mx-auto slide-animate">
        {layout === 'grid' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {transformedCards.slice(0, 3).map((card, index) => (
                <NetworkCard key={index} {...card} />
              ))}
            </div>
            {transformedCards.length > 3 && (
              <div className="flex justify-center">
                <NetworkCard {...transformedCards[3]} />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {transformedCards.map((card, index) => (
              <NetworkCard key={index} {...card} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}