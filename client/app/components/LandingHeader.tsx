'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { useEffect, useState } from 'react';

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 bg-transparent'>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.svg" alt="ORR Solutions" className="h-10 sm:h-10 lg:h-25 w-auto" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6">
          <Link href="/about-us" className="text-gray-100 hover:opacity-70 text-sm xl:text-base">About Us</Link>
          <Link href="/services" className="text-gray-100 hover:opacity-70 text-sm xl:text-base">Services</Link>
          <Link href="/resources-blogs" className="text-gray-100 hover:opacity-70 text-sm xl:text-base">Resources & Blogs</Link>
          <Link href="/legacy-policy" className="text-gray-100 hover:opacity-70 text-sm xl:text-base">Legacy & Policy</Link>
          <Link href="/contact" className="text-gray-100 hover:opacity-70 text-sm xl:text-base">Contact</Link>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/login" className='bg-white py-2 px-4 text-black rounded-xl hover:bg-[#13BE77] hover:text-white text-sm xl:text-base'>Sign in</Link>
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
      <div className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-background transform transition-transform duration-300 ease-in-out z-50 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <img src="/images/logo.svg" alt="ORR Solutions" className="h-8 w-auto" />
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col space-y-6">
            <Link href="/about-us" className="text-gray-100 hover:text-[#13BE77] transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link href="/services" className="text-gray-100 hover:text-[#13BE77] transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
            <Link href="/resources-blogs" className="text-gray-100 hover:text-[#13BE77] transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>Resources & Blogs</Link>
            <Link href="/legacy-policy" className="text-gray-100 hover:text-[#13BE77] transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>Legacy & Policy</Link>
            <Link href="/contact" className="text-gray-100 hover:text-[#13BE77] transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <Link href="/login" className='bg-white py-2 px-10 text-black rounded-xl hover:bg-[#13BE77] hover:text-white transition-colors' onClick={() => setIsMobileMenuOpen(false)}>Sign in</Link>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}