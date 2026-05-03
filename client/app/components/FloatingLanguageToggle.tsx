'use client';

import { useLanguage } from './LanguageProvider';
import { LanguageToggle } from './LanguageToggle';
import { useEffect, useState } from 'react';

export function FloatingLanguageToggle() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90 pointer-events-none'
        }`}
    >
      <div className="bg-card p-2 rounded-full shadow-2xl border border-white/10 backdrop-blur-md hover:scale-110 transition-transform bg-black/20">
        <LanguageToggle />
      </div>

      <style jsx>{`
        .glass-panel {
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
      `}</style>
    </div>
  );
}
