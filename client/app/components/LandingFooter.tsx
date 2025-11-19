import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

export function LandingFooter() {
  return (
    <footer className="w-full py-12 px-6 bg-card">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">

        {/* Logo Section */}
        <div className="flex items-start gap-4">
          <img 
            src="/images/logo.svg"
            alt="ORR Solutions Logo"
            className="w-[15rem] h-auto"
          />
          {/* <div className="flex flex-col leading-tight">
            <h2 className="text-foreground text-3xl font-semibold">ORR</h2>
            <h3 className="text-foreground text-3xl font-semibold -mt-1">Solutions</h3>
            <p className="text-foreground opacity-70 text-sm mt-1">Listen. Solve. Optimise.</p>
          </div> */}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center lg:items-start">
          <p className="text-white font-semibold text-xl sm:text-2xl lg:text-3xl mb-4 text-center lg:text-left">Contact Info</p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-opacity">
              <span className="text-xs sm:text-sm"><FaInstagram /></span>
            </a>
            <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-opacity">
              <span className="text-xs sm:text-sm"><FaLinkedin /></span>
            </a>
            <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-opacity">
              <span className="text-xs sm:text-sm"><FaSquareXTwitter /></span>
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col sm:flex-row w-full sm:w-auto max-w-sm lg:max-w-none">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 sm:px-5 sm:py-4 w-full sm:w-48 lg:w-64 rounded-full sm:rounded-l-full sm:rounded-r-none outline-none text-sm bg-secondary text-gray-100 placeholder-foreground mb-2 sm:mb-0"
          />
          <button className="px-4 py-3 sm:px-6 sm:py-4 rounded-full sm:rounded-r-full sm:rounded-l-none font-medium bg-primary text-background hover:opacity-90 transition-opacity text-sm sm:text-base">
            Subscribe
          </button>
        </div>

      </div>
    </footer>
  );
}