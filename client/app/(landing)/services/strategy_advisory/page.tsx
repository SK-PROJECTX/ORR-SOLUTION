import Image from "next/image";

export default function StrategyAdvisoryPage() {
  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {[...Array(500)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <header className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-5xl space-y-6 sm:space-y-8">
            <h1 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl leading-tight">
              <span className="text-[#47ff4c]">Strategic Advisory</span> <br className="hidden sm:block" />
              <span className="text-white">& Compliance</span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
              We deliver clarity in complexity. From regulatory frameworks to 
              sustainability strategies, biotechnology consulting to compliance 
              management, ORR guides organizations through evolving standards with 
              precision and strategic foresight.
            </p>

            <p className="text-slate-200 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
              Our approach combines deep technical expertise with practical 
              implementation — ensuring every initiative is compliant, sustainable, and 
              positioned for long-term growth.
            </p>
          </div>

          <div className="hidden lg:block" aria-hidden>
          </div>
        </div>
      </header>

      {/* What We Offer Section */}
      <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          What <span className="text-[#47ff4c]">We Offer</span>
        </h2>
        
        <div className="max-w-7xl mx-auto">
          {/* First 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
            {/* Regulatory & Compliance Consulting */}
            <div className="bg-card rounded-lg p-6 border border-slate-700 relative pt-20">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-40 h-32 bg-card flex items-center justify-center shadow-2xl" style={{clipPath: 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)'}}>
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4V6C15 7.1 14.1 8 13 8H11C9.9 8 9 7.1 9 6V4L3 7V9H21ZM3 10V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V10H3Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Regulatory & Compliance Consulting</h3>
              <p className="text-slate-300 text-sm mb-4">Navigate complex regulatory landscapes with confidence. We help organizations understand, implement, and maintain compliance across multiple jurisdictions and industry standards.</p>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>• Regulatory framework assessment and gap analysis</li>
                <li>• Compliance program design and implementation</li>
                <li>• Policy development and documentation</li>
                <li>• Audit preparation and regulatory reporting</li>
                <li>• Ongoing compliance monitoring and updates</li>
              </ul>
            </div>

            {/* Sustainability & ESG Strategy */}
            <div className="bg-card rounded-lg p-6 border border-slate-700 relative pt-20">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-40 h-32 bg-card flex items-center justify-center shadow-2xl" style={{clipPath: 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)'}}>
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Sustainability & ESG Strategy</h3>
              <p className="text-slate-300 text-sm mb-4">Build sustainable practices that meet regulatory requirements while creating a real business value. We develop ESG strategies that align with global frameworks and stakeholder expectations.</p>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>• Sustainability assessment and materiality analysis</li>
                <li>• ESG reporting framework implementation (GRI, SASB, TCFD)</li>
                <li>• Carbon footprint measurement and reduction strategies</li>
                <li>• Supply chain sustainability audits</li>
                <li>• Green certification preparation and support</li>
              </ul>
            </div>

            {/* Biotechnology & Scientific Consulting */}
            <div className="bg-card rounded-lg p-6 border border-slate-700 relative pt-20">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-40 h-32 bg-card flex items-center justify-center shadow-2xl" style={{clipPath: 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)'}}>
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4M12 7C9.79 7 8 8.79 8 11S9.79 15 12 15 16 13.21 16 11 14.21 7 12 7M12 9C13.1 9 14 9.9 14 11S13.1 13 12 13 10 12.1 10 11 10.9 9 12 9Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Biotechnology & Scientific Consulting</h3>
              <p className="text-slate-300 text-sm mb-4">Leverage our network of scientific experts to navigate the technical and regulatory complexities of biotechnology and life sciences.</p>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>• Product development and sales regulatory pathways</li>
                <li>• Scientific literature review and analysis</li>
                <li>• Biosafety and biosecurity protocols</li>
                <li>• Quality management system (QMS) implementation</li>
              </ul>
            </div>
          </div>

          {/* Last 2 cards centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Risk Management & Due Diligence */}
            <div className="bg-card rounded-lg p-6 border border-slate-700 relative pt-20">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-40 h-32 bg-card flex items-center justify-center shadow-2xl" style={{clipPath: 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)'}}>
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.3 14.8 17.3H9.2C8.6 17.3 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.5 8.7 10.5 10V11.5H13.5V10C13.5 8.7 12.8 8.2 12 8.2Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Risk Management & Due Diligence</h3>
              <p className="text-slate-300 text-sm mb-4">Identify and mitigate operational and compliance risks before they become problems. We conduct thorough due diligence for strategic decisions and partnerships.</p>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>• Compliance risk assessment</li>
                <li>• Third-party due diligence</li>
                <li>• Regulatory impact assessment</li>
                <li>• Crisis management and contingency planning</li>
              </ul>
            </div>

            {/* Policy Development & Implementation */}
            <div className="bg-card rounded-lg p-6 border border-slate-700 relative pt-20">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-40 h-32 bg-card flex items-center justify-center shadow-2xl" style={{clipPath: 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)'}}>
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6C4.89 2 4 2.9 4 4V20C4 21.1 4.89 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M18 20H6V4H13V9H18V20Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Policy Development & Implementation</h3>
              <p className="text-slate-300 text-sm mb-4">Create robust policies that protect your organization while enabling operational efficiency. We develop clear, actionable policies that are practical and compliant.</p>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>• Corporate governance frameworks</li>
                <li>• Data protection and privacy policies (GDPR, CCPA)</li>
                <li>• Health and safety protocols</li>
                <li>• Ethics and integrity programs</li>
                <li>• Industry-specific compliance manuals</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            How we work:
          </h2>
          <h3 className="text-3xl font-bold text-[#47ff4c]">
            Listen . Solve.Optimize
          </h3>
          <p className="text-slate-200 text-lg mt-6 max-w-3xl mx-auto">
            Like your Business GP, we diagnose compliance challenges and prescribe strategic 
            solutions tailored to your organization's unique context.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 bg-card rounded-2xl ">
          {/* Listen & Report */}
          <div className="p-8 border-r border-r-[#0ec277]">
            <h3 className="text-2xl font-bold text-white mb-2">
              Listen & Report
            </h3>
            <h4 className="text-slate-300 text-lg font-bold mb-6">
              (Initial Discovery)
            </h4>
            
            <div className="space-y-4 text-slate-300">
              <p>
                We start with a focused initial meeting to understand your 
                compliance challenges, regulatory environment, and strategic 
                objectives. During this session, we gather key information through 
                targeted questions and documentation review.
              </p>
              
              <p>
                Following the meeting, we build a preliminary report that maps out 
                the issues identified. We then engage relevant specialists from our 
                network — legal experts, scientific advisors, or industry consultants 
                — to deepen our analysis. The report is refined to include expert 
                insights and may pose clarifying questions for you to consider.
              </p>
              
              <p>
                A follow-up meeting allows us to listen again, address questions, 
                and update the report with your feedback. The final report 
                provides deep insights into your compliance landscape and 
                proposes a clear modus operandi: acute solutions for immediate 
                issues and strategies to optimize your digital systems for long-
                term compliance management.
              </p>
              
              <p className="">
                Investment: You pay only for meeting time (€45/hour, pro-rata — 
                our meetings are brief and focused) plus the report itself (value 
                depends on scope and complexity, capped at €220)
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Decide: Document or Partnership */}
            <div className="p-8 ">
              <h3 className="text-2xl font-bold text-white mb-6">
                Decide: Document or Partnership
              </h3>
              
              <div className="space-y-4 text-slate-300">
                <p>
                  Decide: Document or Partnership. Once you receive the report, you 
                  choose your path forward:
                </p>
                
                <p>
                  - Use the report independently to guide your internal compliance 
                  efforts, or
                </p>
                
                <p>
                  - Engage ORR for ongoing implementation support through a 
                  tailored retainer arrangement
                </p>
              </div>
            </div>

            {/* Optimize */}
            <div className="p-8 ">
              <h3 className="text-2xl font-bold text-white mb-2">
                Optimize (For Clients Who Continue)
              </h3>
              
              <div className="space-y-4 text-slate-300">
                <p>
                  For clients who choose ongoing partnership, we move into 
                  implementation and optimization. We execute the solutions 
                  outlined in the report, build necessary digital infrastructure, and 
                  provide continuous monitoring to keep your compliance systems 
                  current as regulations evolve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The ORR Network Advantage Section */}
      <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            The ORR Network Advantage
          </h2>
          <p className="text-slate-200 text-lg max-w-3xl mx-auto">
            Complex compliance challenges require diverse expertise. We activate our 
            global network of specialists to deliver comprehensive solutions.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* First row - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Legal & Regulatory Experts */}
            <div className="bg-primary flex flex-col items-start justify-between rounded-lg px-8 pt-8 pb-16">
              <div className="w-16 h-16 mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L1 9L12 15L21 12.35V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Legal & Regulatory Experts
              </h3>
              <p className="text-white/90 text-sm mb-6">
                Specialized attorneys and compliance professionals across multiple 
                jurisdictions
              </p>
              <button className="bg-white text-black px-6 py-2 rounded-2xl font-semibold hover:bg-gray-100 transition-colors">
                Join Now
              </button>
            </div>

            {/* Scientific Advisors */}
            <div className="bg-primary flex flex-col items-start justify-between rounded-lg px-8 pt-8 pb-16">
              <div className="w-16 h-16 mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H16L21 19L19 21L14 16V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3M9.5 5C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Scientific Advisors
              </h3>
              <p className="text-white/90 text-sm mb-6">
                PhDs and researchers in biotechnology, environmental and computer science, 
                and related fields
              </p>
              <button className="bg-white text-black px-6 py-2 rounded-2xl font-semibold hover:bg-gray-100 transition-colors">
                Join Now
              </button>
            </div>

            {/* Industry Specialists */}
            <div className="bg-primary flex flex-col items-start justify-between rounded-lg px-8 pt-8 pb-16">
              <div className="w-16 h-16 mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5A3.5 3.5 0 0 1 15.5 12A3.5 3.5 0 0 1 12 15.5M19.43 12.98C19.47 12.66 19.5 12.33 19.5 12S19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.96 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.51 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12S4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.94C7.96 18.34 8.52 18.68 9.13 18.93L9.51 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.94L19.05 18.95C19.27 19.03 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Industry Specialists
              </h3>
              <p className="text-white/90 text-sm mb-6">
                Sector-specific consultants with deep regulatory knowledge
              </p>
              <button className="bg-white text-black px-6 py-2 rounded-2xl font-semibold hover:bg-gray-100 transition-colors">
                Join Now
              </button>
            </div>
          </div>

          {/* Second row - 2 cards centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Technical Auditors */}
            <div className="bg-primary flex flex-col items-start justify-between rounded-lg px-8 pt-8 pb-16">
              <div className="w-16 h-16 mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4M15.5 16L11 11.5L12.5 10L15.5 13L20.5 8L22 9.5L15.5 16Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Technical Auditors
              </h3>
              <p className="text-white/90 text-sm mb-6">
                Certification professionals for ISO, GMP, and other standards
              </p>
              <button className="bg-white text-black px-6 py-2 rounded-2xl font-semibold hover:bg-gray-100 transition-colors">
                Join Now
              </button>
            </div>

            {/* ESG Consultants */}
            <div className="bg-primary flex flex-col items-start justify-between rounded-lg px-8 pt-8 pb-16">
              <div className="w-16 h-16 mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7.5 13.5 12.5 13.5 15.5 13.5C15.5 13.5 16 13.75 16 14.25C16 14.75 15.5 15 15.5 15C12.5 15 7.5 15 3.75 18.75C3.75 18.75 5.25 20.5 8 20.5C11.5 20.5 17 16 17 8Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                ESG Consultants
              </h3>
              <p className="text-white/90 text-sm mb-6">
                Sustainability experts and carbon accounting specialists
              </p>
              <button className="bg-white text-black px-6 py-2 rounded-2xl font-semibold hover:bg-gray-100 transition-colors">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Solutions for Compliance Management Section */}
      <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image and Who is this for */}
            <div className="space-y-8">
              {/* Image */}
<div className="rounded-2xl h-80 flex items-center justify-center">
  <Image 
    src="/network-visualization.jpg"
    alt="Network visualization showing connected nodes and data flows"
    className="w-full h-full object-cover rounded-2xl"
    width={800}
    height={600}
/></div>
              {/* Who is this for? */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Who is <span className="text-primary">this for?</span>
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Self-employed professionals and consultants who need expert 
                    compliance guidance without hiring full-time staff
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Growing businesses entering regulated industries or expanding 
                    into new markets
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Startups in life sciences and biotech navigating complex 
                    regulatory pathways
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Professional service firms managing client compliance 
                    obligations
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Companies facing regulatory changes that impact their 
                    operations
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Businesses implementing ESG strategies to meet investor 
                    and stakeholder expectations
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Content and Features */}
            <div className="space-y-8">
              {/* Header */}
              <div className={"py-18"}>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Digital Solutions for
                </h2>
                <h2 className="text-4xl font-bold text-primary mb-6">
                  Compliance Management
                </h2>
                <p className="text-slate-200 text-lg">
                  We don't just advise — we build digital infrastructure to operationalize 
                  compliance:
                </p>
              </div>

              {/* Features box */}
              <div className="border-2 border-primary rounded-2xl px-6 py-12">
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">-</span>
                    Custom compliance management platforms with automated 
                    tracking
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">-</span>
                    Regulatory document repositories with version control and access 
                    management
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">-</span>
                    ESG data collection and reporting dashboards
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">-</span>
                    Audit trail systems with timestamped documentation
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">-</span>
                    Training management systems with certification tracking
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">-</span>
                    AI-powered regulatory monitoring and change detection
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">-</span>
                    Integrated risk assessment and mitigation tracking tools
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">-</span>
                    Automated compliance reporting and submission workflows
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
