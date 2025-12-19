"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

export default function GPMetaphorSection() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -50, rotationX: -15 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 20%" }
        }
      );

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: "back.out(1.7)",
          scrollTrigger: { trigger: subtitleRef.current, start: "top 80%" }
        }
      );

      // Cards animation with sophisticated effects
      cardsRef.current.forEach((card, i) => {
        if (card) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse"
            }
          });

          // Initial state
          gsap.set(card, {
            opacity: 0,
            y: 100,
            rotationY: i % 2 === 0 ? -15 : 15,
            scale: 0.8
          });

          // Entrance animation
          tl.to(card, {
            opacity: 1,
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: i * 0.15
          });

          // Floating animation
          gsap.to(card, {
            y: "-=10",
            duration: 2 + (i * 0.3),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.2
          });

          // Hover effects
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              rotationY: 5,
              z: 50,
              duration: 0.4,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              rotationY: 0,
              z: 0,
              duration: 0.4,
              ease: "power2.out"
            });
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={containerRef} className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden">
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
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div className="relative z-10 text-center mb-5 sm:mb-15 lg:mb-10">
        <h2 ref={titleRef} className="text-white text-4xl font-poppins sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug">
          Business as a <span className="text-[#3DFF7C]">Living System</span>
        </h2>
        <p ref={subtitleRef} className="text-white font-poppins font-light text-base sm:text-lg md:text-xl lg:text-2xl mt-4">
          Every part connected, every function vital
        </p>
      </div>

      {/* Systems Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {systemsArray.map((system, index) => (
          <div
            key={index}
            ref={el => { if (el) cardsRef.current[index] = el; }}
            className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-emerald-400/50 transition-all duration-500 cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-emerald-400 rounded-full mr-3 animate-pulse" />
                <h3 className="text-emerald-400 text-xl font-bold font-poppins">
                  {system.label}
                </h3>
              </div>
              
              <p className="text-white/90 font-poppins font-light text-base leading-relaxed">
                {system.text}
              </p>
              
              {/* Decorative element */}
              <div className="absolute top-4 right-4 w-8 h-8 border border-emerald-400/30 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              </div>
            </div>
            
            {/* Morphing background pattern */}
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <pattern id={`pattern-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="2" fill="currentColor" className="text-emerald-400" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill={`url(#pattern-${index})`} />
              </svg>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        .group:hover {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}