'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { useEffect, useState } from 'react';

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className='fixed top-0 left-0 right-0 z-50 p- transition-all duration-300 bg-transparent'
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.svg" alt="ORR Solutions" className="h-35 w-auto" />
        </Link>
        <nav className="flex space-x-6">
          <Link href="/about-us" className="text-gray-100 hover:opacity-70">About Us</Link>
          <Link href="/services" className="text-gray-100 hover:opacity-70">Services</Link>
          <Link href="/resources-blogs" className="text-gray-100 hover:opacity-70">Resources & Blogs</Link>
          <Link href="/legacy-policy" className="text-gray-100 hover:opacity-70">Legacy & Policy</Link>
          <Link href="/contact" className="text-gray-100 hover:opacity-70">Contact</Link>
        </nav>

        <Link href="/login" className='bg-white py-3 px-5 text-black rounded-xl ml-15 hover:bg-[#13BE77] hover:text-white'>Sign in</Link>
        <ThemeToggle />
      </div>
    </header>
  );
}