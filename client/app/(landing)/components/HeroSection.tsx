"use client";

import { useTheme } from "../../components/ThemeProvider";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export function HeroSection() {
  const { theme } = useTheme();

  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the hero section is out of view, minimize the video
        const isOut = !entry.isIntersecting;
        setIsMinimized(isOut);
        
        // If it comes back into view, make sure it's visible again
        if (!isOut) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        threshold: 0, 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getOptimizedVideoUrl = (url: string, width?: number) => {
    const baseUrl = url.replace(
      "/upload/",
      `/upload/f_auto,q_auto${width ? `,w_${width}` : ""}/`,
    );
    return baseUrl;
  };

  const currentRawVideo =
    theme === "dark"
      ? "https://res.cloudinary.com/depeqzb6z/video/upload/v1763167272/Final_Comp_1_eb2us1.mp4"
      : "https://res.cloudinary.com/depeqzb6z/video/upload/v1763167291/Final_Comp_yiiy1e.mp4";

  const posterUrl = currentRawVideo
    .replace("/video/upload/", "/video/upload/f_auto,q_auto,so_0/")
    .replace(".mp4", ".jpg");

  const minimizedClasses = `fixed z-50 top-0 left-0 w-full shadow-2xl transition-all duration-500 ease-in-out h-[15vh] max-h-[120px] md:max-h-none md:top-auto md:left-auto md:bottom-6 md:right-6 md:w-[360px] md:h-auto md:aspect-video md:rounded-2xl overflow-hidden bg-slate-900 ${
    !isVisible ? "opacity-0 pointer-events-none -translate-y-full md:translate-y-0 md:translate-x-[150%]" : "opacity-100 translate-y-0 translate-x-0"
  }`;
  
  const normalClasses = "absolute inset-0 w-full h-full overflow-hidden bg-slate-900 transition-all duration-500 ease-in-out opacity-100 translate-y-0 translate-x-0";

  return (
    <section ref={sectionRef} className="w-full aspect-video relative mt-[80px] lg:mt-0">
      <div className={isMinimized ? minimizedClasses : normalClasses}>
        <video
          ref={videoRef}
          key={theme}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster={posterUrl}
          onEnded={() => setIsVideoEnded(true)}
        >
          {/* Desktop - WebM highly recommended but using MP4 for now as provided */}
          <source
            src={getOptimizedVideoUrl(currentRawVideo, 1920)}
            
            media="(min-width: 1024px)"
          />
          {/* Tablet/Large Mobile */}
          <source
            src={getOptimizedVideoUrl(currentRawVideo, 1080)}
             
            media="(min-width: 640px)"
          />
          {/* Mobile */}
          <source
            src={getOptimizedVideoUrl(currentRawVideo, 640)}
            
          />
        </video>

        {/* CTA Overlay */}
        {isVideoEnded && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 z-10 transition-opacity duration-500">
            <h3 className={`text-white font-bold mb-3 text-center drop-shadow-md ${isMinimized ? 'text-sm md:text-lg' : 'text-2xl md:text-4xl'}`}>
              Why not join now?
            </h3>
            <Link 
              href="/register" 
              className={`bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors shadow-lg ${isMinimized ? 'px-4 py-1.5 text-xs' : 'px-8 py-3 text-lg'}`}
            >
              Sign up
            </Link>
          </div>
        )}

        {/* Close button for minimized state */}
        {isMinimized && (
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 z-20 bg-black/50 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
            aria-label="Close video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}

