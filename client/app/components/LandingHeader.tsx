'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isMobileLegalOpen, setIsMobileLegalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-2 transition-all duration-300 backdrop-blur-xl bg-transparent'>
      <div className="max-w-[1400] mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img src="https://res.cloudinary.com/depeqzb6z/image/upload/v1764395173/logo_qqpk6j.svg" alt="ORR Solutions" className="h-16 lg:h-20 w-auto" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6">
          <Link href="/howweoperate" className={`hover:opacity-70 text-sm xl:text-base ${pathname.includes('/howweoperate') ? 'text-[#13BE77]' : 'text-gray-100'}`}>How We Operate</Link>
          <div className="relative">
            <div onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)} onMouseOver={()=> setIsServicesOpen(true)} onMouseOut={()=> setIsServicesOpen(false)}>
              <Link href="/services" className={`hover:opacity-70 text-sm xl:text-base flex items-center ${pathname.includes('/services') ? 'text-[#13BE77]' : 'text-gray-100'}`}>
                Services
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-0 w-80 bg-black/90 backdrop-blur-xl rounded-lg shadow-lg border border-white/10 py-2" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
                  <Link href="/services/strategy-advisory-compliant" className={`block px-4 py-3 hover:bg-white/10 text-sm ${pathname === '/services/strategy-advisory-compliant' ? 'text-[#13BE77]' : 'text-gray-100'}`}>
                    Strategic Advisory & Compliance
                  </Link>
                  <Link href="/services/operational-systems-infrastructure" className={`block px-4 py-3 hover:bg-white/10 text-sm ${pathname === '/services/operational-systems-infrastructure' ? 'text-[#13BE77]' : 'text-gray-100'}`}>
                    Operational Systems & Infrastructure
                  </Link>
                  <Link href="/services/living-systems-regeneration" className={`block px-4 py-3 hover:bg-white/10 text-sm ${pathname === '/services/living-systems-regeneration' ? 'text-[#13BE77]' : 'text-gray-100'}`}>
                    Living Systems & Regeneration
                  </Link>
                </div>
              )}
            </div>
          </div>
          <Link href="/resources-blogs" className={`hover:opacity-70 text-sm xl:text-base ${pathname === '/resources-blogs' ? 'text-[#13BE77]' : 'text-gray-100'}`}>Resources & Blogs</Link>
          <div className="relative" onMouseEnter={() => setIsLegalOpen(true)} onMouseLeave={() => setIsLegalOpen(false)} onMouseOver={() => setIsLegalOpen(true)} onMouseOut={() => setIsLegalOpen(true)}>
            <Link href="/legacy-policy" className={`hover:opacity-70 text-sm xl:text-base flex items-center ${pathname.includes('/legacy-policy') || pathname.includes('/cookie-policy') || pathname.includes('/privacy-policy') ? 'text-[#13BE77]' : 'text-gray-100'}`}>
              Legal & Policy
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            {isLegalOpen && (
              <div className="absolute top-full left-0 mt-0 w-64 bg-black/90 backdrop-blur-xl rounded-lg shadow-lg border border-white/10 py-2">
                <Link href="/cookie-policy" className={`block px-4 py-3 hover:bg-white/10 text-sm ${pathname === '/cookie-policy' ? 'text-[#13BE77]' : 'text-gray-100'}`}>
                  Cookie Policy
                </Link>
                <Link href="/privacy-policy" className={`block px-4 py-3 hover:bg-white/10 text-sm ${pathname === '/privacy-policy' ? 'text-[#13BE77]' : 'text-gray-100'}`}>
                  Privacy Policy
                </Link>
              </div>
            )}
          </div>
          <Link href="/contact" className={`hover:opacity-70 text-sm xl:text-base ${pathname === '/contact' ? 'text-[#13BE77]' : 'text-gray-100'}`}>Contact</Link>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/login" className='bg-white py-2 px-4 text-black rounded-xl hover:bg-[#13BE77] hover:text-white text-sm xl:text-base'>Sign in</Link>
          <Link href="/register" className='bg-white py-2 px-4 text-black rounded-xl hover:bg-[#13BE77] hover:text-white text-sm xl:text-base'>Register</Link>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`lg:hidden fixed top-0 right-0 h-screen w-80 bg-card transform transition-transform duration-300 ease-in-out z-50 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 bg-card">
          <div className="flex justify-between items-center mb-8">
            <img src="/images/logo.svg" alt="ORR Solutions" className="h-8 w-auto" />
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col space-y-6">
            <Link href="/about-us" className={`hover:text-[#13BE77] transition-colors text-lg ${pathname === '/howweoperate' ? 'text-[#13BE77]' : 'text-gray-100'}`} onClick={() => setIsMobileMenuOpen(false)}>How We Operate</Link>
            <div>
              <button 
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className={`hover:text-[#13BE77] transition-colors text-lg flex items-center justify-between w-full ${pathname.includes('/services') ? 'text-[#13BE77]' : 'text-gray-100'}`}
              >
                Services
                <svg className={`w-4 h-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileServicesOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link href="/services/strategy-advisory-compliant" className={`hover:text-[#13BE77] transition-colors text-base block ${pathname === '/services/strategy_advisory' ? 'text-[#13BE77]' : 'text-gray-300'}`} onClick={() => setIsMobileMenuOpen(false)}>
                    Strategic Advisory & Compliance
                  </Link>
                  <Link href="/services/operational-systems-infrastructure" className={`hover:text-[#13BE77] transition-colors text-base block ${pathname === '/services/operational-systems-infrastructure' ? 'text-[#13BE77]' : 'text-gray-300'}`} onClick={() => setIsMobileMenuOpen(false)}>
                    Operational Systems & Infrastructure
                  </Link>
                  <Link href="/services/living-systems-regeneration" className={`hover:text-[#13BE77] transition-colors text-base block ${pathname === '/services/living-systems-regeneration' ? 'text-[#13BE77]' : 'text-gray-300'}`} onClick={() => setIsMobileMenuOpen(false)}>
                    Living Systems & Regeneration
                  </Link>
                </div>
              )}
            </div>
            <Link href="/resources-blogs" className={`hover:text-[#13BE77] transition-colors text-lg ${pathname === '/resources-blogs' ? 'text-[#13BE77]' : 'text-gray-100'}`} onClick={() => setIsMobileMenuOpen(false)}>Resources & Blogs
            </Link>
            <div>
              <button 
                onClick={() => setIsMobileLegalOpen(!isMobileLegalOpen)}
                className={`hover:text-[#13BE77] transition-colors text-lg flex items-center justify-between w-full ${pathname.includes('/legacy-policy') || pathname.includes('/cookie-policy') || pathname.includes('/privacy-policy') ? 'text-[#13BE77]' : 'text-gray-100'}`}
              >
                Legal & Policy
                <svg className={`w-4 h-4 transition-transform ${isMobileLegalOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileLegalOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link href="/legacy-policy" className={`hover:text-[#13BE77] transition-colors text-base block ${pathname === '/legacy-policy' ? 'text-[#13BE77]' : 'text-gray-300'}`} onClick={() => setIsMobileMenuOpen(false)}>
                    Legal & Policy
                  </Link>
                  <Link href="/cookie-policy" className={`hover:text-[#13BE77] transition-colors text-base block ${pathname === '/cookie-policy' ? 'text-[#13BE77]' : 'text-gray-300'}`} onClick={() => setIsMobileMenuOpen(false)}>
                    Cookie Policy
                  </Link>
                  <Link href="/privacy-policy" className={`hover:text-[#13BE77] transition-colors text-base block ${pathname === '/privacy-policy' ? 'text-[#13BE77]' : 'text-gray-300'}`} onClick={() => setIsMobileMenuOpen(false)}>
                    Privacy Policy
                  </Link>
                </div>
              )}
            </div>
            <Link href="/contact" className={`hover:text-[#13BE77] transition-colors text-lg ${pathname === '/contact' ? 'text-[#13BE77]' : 'text-gray-100'}`} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <Link href="/login" className='bg-white py-2 px-10 text-black rounded-xl hover:bg-[#13BE77] hover:text-white transition-colors' onClick={() => setIsMobileMenuOpen(false)}>Sign in</Link>
            <ThemeToggle />
            </div>
            <div className='pt-8 border-t border-white/10'>
                <Link href="/register" className='bg-white py-2 px-10 text-black rounded-xl hover:bg-[#13BE77] hover:text-white transition-colors' onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}