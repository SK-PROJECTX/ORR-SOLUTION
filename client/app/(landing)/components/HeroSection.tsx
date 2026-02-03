'use client';

import { useTheme } from '../../components/ThemeProvider';

export function HeroSection() {
  const { theme } = useTheme();

  const videoSrc =
    theme === 'dark'
      ? 'https://res.cloudinary.com/depeqzb6z/video/upload/v1763167272/Final_Comp_1_eb2us1.mp4'
      : 'https://res.cloudinary.com/depeqzb6z/video/upload/v1763167291/Final_Comp_yiiy1e.mp4';

  return (
    <section className="w-full">
      <div className="relative w-full aspect-video overflow-hidden">
        <video
          key={theme}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
