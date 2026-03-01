"use client";

import { useTheme } from "../../components/ThemeProvider";

export function HeroSection() {
  const { theme } = useTheme();

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

  return (
    <section className="w-full">
      <div className="relative w-full aspect-video overflow-hidden bg-slate-900">
        <video
          key={theme}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={posterUrl}
        >
          {/* Desktop - WebM highly recommended but using MP4 for now as provided */}
          <source
            src={getOptimizedVideoUrl(currentRawVideo, 1920)}
            type="video/mp4"
            media="(min-width: 1024px)"
          />
          {/* Tablet/Large Mobile */}
          <source
            src={getOptimizedVideoUrl(currentRawVideo, 1080)}
            type="video/mp4" 
            media="(min-width: 640px)"
          />
          {/* Mobile */}
          <source
            src={getOptimizedVideoUrl(currentRawVideo, 640)}
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  );
}
