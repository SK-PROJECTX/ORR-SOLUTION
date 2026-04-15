"use client";

import { useTheme } from "../../components/ThemeProvider";
import { useLanguage } from "../../components/LanguageProvider";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export function HeroSection() {
  const { theme } = useTheme();
  const { t, interpolate } = useLanguage();

  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

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

    // Observer for footer to hide minimized video
    const footer = document.querySelector('footer');
    let footerObserver: IntersectionObserver | null = null;
    
    if (footer) {
      footerObserver = new IntersectionObserver(
        ([entry]) => {
          setIsFooterVisible(entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0.1, // Trigger when 10% of footer is visible
        }
      );
      footerObserver.observe(footer);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (footerObserver) {
        footerObserver.disconnect();
      }
    };
  }, []);

  const getOptimizedVideoUrl = (url: string, width?: number) => {
    // If no width is specified (desktop/original quality), use the original URL without transformation flags
    if (!width) return url;

    const baseUrl = url.replace(
      "/upload/",
      `/upload/c_scale${width ? `,w_${width}` : ""}/`,
    );
    return baseUrl;
  };

  const currentRawVideo =
    theme === "dark"
      ? "https://res.cloudinary.com/depeqzb6z/video/upload/v1773386068/Final_Comp_1_iyegf6.mp4"
      : "https://res.cloudinary.com/depeqzb6z/video/upload/v1773386094/Final_Comp_1_1_efvzc0.mp4";

  const posterUrl = currentRawVideo
    .replace("/video/upload/", "/video/upload/f_auto,q_auto,so_0/")
    .replace(".mp4", ".jpg");

  const minimizedClasses = `fixed z-50 bottom-6 right-6 w-[240px] md:bottom-8 md:right-8 md:w-[400px] aspect-video rounded-xl md:rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] glass-panel transition-all duration-500 ease-in-out overflow-hidden ${(!isVisible || (isMinimized && isFooterVisible)) ? "opacity-0 pointer-events-none translate-y-[150%] md:translate-y-0 md:translate-x-[150%]" : "opacity-100 translate-y-0 translate-x-0"
    }`;

  const normalClasses = "absolute inset-0 w-full h-full overflow-hidden bg-background transition-all duration-500 ease-in-out opacity-100 translate-y-0 translate-x-0";

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
            src={getOptimizedVideoUrl(currentRawVideo)}
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center p-4 z-10 transition-all duration-500 animate-in fade-in zoom-in border border-white/10">
            <h3 className={`text-white font-bold mb-3 text-center drop-shadow-lg tracking-tight ${isMinimized ? 'text-sm md:text-lg' : 'text-2xl md:text-5xl'}`}>
              {interpolate(t.hero.joinNow)}
            </h3>
            <Link
              href="/register"
              className={`bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 ${isMinimized ? 'px-5 py-2 text-xs' : 'px-10 py-4 text-xl'}`}
            >
              {interpolate(t.hero.signUp)}
            </Link>
          </div>
        )}

        {/* Close button for minimized state */}
        {isMinimized && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="absolute top-2 right-2 z-20 bg-black/40 hover:bg-black/80 text-white rounded-full p-1.5 transition-all hover:rotate-90"
            aria-label="Close video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
      <style jsx>{`
        .animate-in {
          animation-duration: 500ms;
          animation-fill-mode: both;
        }
        .fade-in {
          animation-name: fadeIn;
        }
        .zoom-in {
          animation-name: zoomIn;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
