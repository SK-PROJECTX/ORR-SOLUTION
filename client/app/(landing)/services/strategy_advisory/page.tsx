export default function StrategyAdvisoryPage() {
  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
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
    </div>
  )
}
