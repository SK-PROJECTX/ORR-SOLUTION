'use client';

import { useTheme } from '../../components/ThemeProvider';

export function HeroSection() {
  const { theme } = useTheme();
  
  const videoSrc = theme === 'dark' 
    ? 'https://res.cloudinary.com/depeqzb6z/video/upload/v1763167272/Final_Comp_1_eb2us1.mp4'
    : 'https://res.cloudinary.com/depeqzb6z/video/upload/v1763167291/Final_Comp_yiiy1e.mp4';

  return (
    <section className="w-full flex justify-center items-center">
      <video
        className="w-full max-w-full h-auto  object-cover"
        autoPlay
        loop
        muted
        playsInline
        key={theme}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </section>
  );
}