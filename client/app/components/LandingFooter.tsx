import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

export function LandingFooter() {
  return (
    <footer className="w-full py-8 md:py-12 px-4 sm:px-6 bg-card">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">

        {/* Logo Section */}
        <div className="flex items-start gap-4 order-1 lg:order-1">
          <img 
            src="/images/logo.svg"
            alt="ORR Solutions Logo"
            className="w-32 sm:w-40 md:w-48 lg:w-[15rem] h-auto"
          />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center order-3 lg:order-2">
          <p className="text-white font-semibold text-xl sm:text-2xl md:text-3xl mb-3 md:mb-4">Contact Info</p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-opacity">
              <span className="text-xs sm:text-sm"><FaInstagram /></span>
            </a>
            <a href="#" className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-opacity">
              <span className="text-xs sm:text-sm"><FaLinkedin /></span>
            </a>
            <a href="#" className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-opacity">
              <span className="text-xs sm:text-sm"><FaSquareXTwitter /></span>
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col sm:flex-row w-full sm:w-auto max-w-sm order-2 lg:order-3">
          <input
            type="email"
            placeholder="Email"
            className="px-4 sm:px-5 py-3 sm:py-4 w-full sm:w-48 md:w-64 rounded-t-full sm:rounded-l-full sm:rounded-t-lg sm:rounded-r-none rounded-b-none sm:rounded-b-lg outline-none text-sm bg-secondary text-gray-100 placeholder-foreground"
          />
          <button className="px-4 sm:px-6 py-3 sm:py-4 rounded-b-full sm:rounded-r-full sm:rounded-b-lg sm:rounded-l-none rounded-t-none sm:rounded-t-lg font-medium bg-primary text-background hover:opacity-90 transition-opacity text-sm sm:text-base">
            Subscribe
          </button>
        </div>

      </div>
    </footer>
  );
}