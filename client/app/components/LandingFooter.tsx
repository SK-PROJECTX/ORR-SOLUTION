export function LandingFooter() {
  return (
    <footer className="w-full py-12 px-6 bg-card">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">

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
        <div className="flex flex-col items-center">
          <p className="text-foreground text-base mb-3">Contact Info</p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-opacity">
              <span className="text-sm">📷</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-opacity">
              <span className="text-sm">💼</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-opacity">
              <span className="text-sm">🐦</span>
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col sm:flex-row ">
          <input
            type="email"
            placeholder="Email"
            className="px-5 py-4 w-64 rounded-l-full sm:rounded-l-full sm:rounded-r-none rounded-r-full outline-none text-sm bg-secondary text-gray-100 placeholder-foreground"
          />
          <button className="px-6 py-4 rounded-r-full sm:rounded-r-full sm:rounded-l-none rounded-l-full font-medium bg-primary text-background hover:opacity-90 transition-opacity">
            Subscribe
          </button>
        </div>

      </div>
    </footer>
  );
}