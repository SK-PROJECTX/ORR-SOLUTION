'use client';
import { useLanguage } from "./LanguageProvider";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

export function LandingFooter() {
  const { t } = useLanguage();

  return (
    <footer className="w-full py-12 px-6 bg-card z-50 relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">

        {/* Logo Section */}
        <div className="flex items-start gap-4">
          <img 
            src="/images/logo.svg"
            alt="ORR Solutions Logo"
            className="w-60 h-auto"
          />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center">
          <p className="text-white font-semibold text-3xl mb-4 ">{t.footer.contactInfo}</p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-opacity">
              <span className="text-sm"><FaInstagram /></span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-opacity">
              <span className="text-sm"><FaLinkedin /></span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-opacity">
              <span className="text-sm"><FaSquareXTwitter /></span>
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex w-full max-w-xs">
          <input
            type="email"
            placeholder={t.footer.emailPlaceholder}
            className="px-4 py-3 flex-1 rounded-l-2xl outline-none text-sm bg-secondary text-white placeholder-white/70"
          />
          <button className="px-4 py-3 rounded-r-2xl font-medium bg-primary text-black hover:bg-green-400 transition-colors text-sm whitespace-nowrap">
            {t.footer.subscribe}
          </button>
        </div>

      </div>
    </footer>
  );
}