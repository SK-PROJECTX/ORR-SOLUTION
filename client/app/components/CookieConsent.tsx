'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg mb-2">Privacy & Cookies</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                This site uses cookies. By continuing to use this website, you agree to their use. 
                To find out more, including how to control cookies, see here:{' '}
                <Link 
                  href="/cookie-policy" 
                  className="text-[#13BE77] hover:underline font-medium"
                >
                  Cookie Policy
                </Link>
              </p>
            </div>
            <button
              onClick={handleAccept}
              className="bg-[#13BE77] hover:bg-[#0ea365] text-white px-8 py-3 rounded-xl font-medium transition-colors whitespace-nowrap"
            >
              Close and accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
