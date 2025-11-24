import ApproachCard from "../components/ApproachCard";
import GPMetaphorSection from "../components/GPMetaphorSection";
import Hero from "../components/Hero";
import ServicePillar from "../components/ServicePillars";
import { HeroSection } from "./components/HeroSection";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <Hero />
      <ApproachCard />
      <ServicePillar />
      <GPMetaphorSection />
      <MiniClientJourney />
      <FiveStagesSection />
      <ORRReportSection />
      <PackagePreviewSection />
    </div>
  );
}

function FiveStagesSection() {
  const stages = [
    {
      title: "Discover - We listen",
      description: "You tell us what's happening. We map your context, pressures, and goals – and what 'good' looks like for you."
    },
    {
      title: "Diagnose - We find root causes",
      description: "SOPs, workflows, portals, dashboards, and AI-assisted tools designed around your team's habits, constraints and growth plans."
    },
    {
      title: "Design - We shape solution with you",
      description: "We propose clear, actionable structures that fit your reality: advisory, roadmaps, systems, AI helpers, and, where relevant, living systems projects."
    },
    {
      title: "Deploy - We put them to work together",
      description: "We implement with minimal disruption, adapting to how your people work today while preparing them for tomorrow."
    },
    {
      title: "Grow - We optimise over time",
      description: "We monitor, refine, and help you scale intelligently, keeping a feedback loop open with you and your stakeholders."
    }
  ];

  return (
    <section className="w-full text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden font-poppins">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
          How we work: <span className="text-[#33FF99]">Five Stages</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-gray-300 text-center mb-12 sm:mb-16">
          Every stage is built around you – your pace, your risk appetite, your resources
        </p>
        
        {/* Stages */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-[#33FF99]"></div>
          
          {stages.map((stage, index) => (
            <div key={index} className="relative flex items-start mb-8 sm:mb-12 last:mb-0">
              {/* Circle */}
              <div className="relative z-10 w-8 sm:w-12 h-8 sm:h-12 bg-[#33FF99] rounded-full flex items-center justify-center mr-6 sm:mr-8 flex-shrink-0">
                <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full"></div>
              </div>
              
              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  {stage.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniClientJourney() {
  return (
    <section className="w-full text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden font-poppins">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10">
          Mini Client <span className="text-[#33FF99]">Journey</span>
        </h2>

        {/* Glowing Center Highlight */}
        <div className="absolute top-16 sm:top-20 w-60 h-60 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#33FF99]/20 rounded-full blur-[100px] sm:blur-[150px]"></div>

        {/* Quote Box */}
        <div className="relative bg-card max-w-3xl w-full py-6 sm:py-8 md:py-10 px-6 sm:px-8 md:px-12 rounded-[20px] sm:rounded-[30px] shadow-xl border border-white/20">
          <div className="text-[#33FF99] text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-left">“</div>
          <p className="text-foreground leading-relaxed text-base sm:text-lg md:text-xl lg:text-2xl px-2 sm:px-4 md:px-9">
            as they requested. In the end, the client found a 50% increase in
            traffic within days since its launch.
          </p>
          <div className="text-[#33FF99] text-2xl sm:text-3xl md:text-4xl mt-3 sm:mt-4 text-right">”</div>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-4 sm:mt-6">
          <span className="w-2 h-2 rounded-full bg-[#33FF99]"></span>
          <span className="w-2 h-2 rounded-full bg-[#33FF99]/40"></span>
          <span className="w-2 h-2 rounded-full bg-[#33FF99]/40"></span>
        </div>
      </div>

      {/* Floating Client Images - Hidden on mobile to prevent overflow */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {/* LEFT SIDE IMAGES */}
        <img
          src="/images/user-1.jpg"
          className="absolute left-4 xl:left-10 top-16 xl:top-20 w-20 xl:w-26 h-20 xl:h-26 rounded-full border-2 xl:border-4 border-[#33FF99] shadow-[0_0_20px_#33FF99] xl:shadow-[0_0_25px_#33FF99] object-cover"
        />
        <img
          src="/images/user-2.jpg"
          className="absolute left-2 xl:left-4 top-1/2 w-16 xl:w-20 h-16 xl:h-20 rounded-full border-2 border-[#33FF99] shadow-[0_0_20px_#33FF99] object-cover"
        />
        <img
          src="/images/user-3.jpg"
          className="absolute left-24 xl:left-30 bottom-20 xl:bottom-24 w-24 xl:w-30 h-24 xl:h-30 rounded-full border-2 xl:border-4 border-[#33FF99] shadow-[0_0_20px_#33FF99] xl:shadow-[0_0_25px_#33FF99] object-cover"
        />

        {/* RIGHT SIDE IMAGES */}
        <img
          src="/images/user-4.jpg"
          className="absolute right-4 xl:right-10 top-20 xl:top-24 w-16 xl:w-20 h-16 xl:h-20 rounded-full border-2 xl:border-4 border-[#33FF99] shadow-[0_0_20px_#33FF99] xl:shadow-[0_0_25px_#33FF99] object-cover"
        />
        <img
          src="/clients/c5.png"
          className="absolute right-20 xl:right-28 top-1/3 w-10 xl:w-12 h-10 xl:h-12 rounded-full border-2 border-[#33FF99] shadow-[0_0_20px_#33FF99] object-cover"
        />
        <img
          src="/clients/c6.png"
          className="absolute right-2 xl:right-4 bottom-20 xl:bottom-24 w-20 xl:w-24 h-20 xl:h-24 rounded-full border-2 xl:border-4 border-[#33FF99] shadow-[0_0_20px_#33FF99] xl:shadow-[0_0_25px_#33FF99] object-cover"
        />
      </div>
    </section>
  );
}

function ORRReportSection() {
  return (
    <section className="w-full text-white px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          What you Get: <span className="text-[#33FF99]">The ORR Report</span>
        </h2>
        <p className="text-blue-400 text-center mb-16 underline cursor-pointer">
          After your first meeting, you receive a free ORR report that outlines the key issues in your business that could be hurting your conversions.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-[#16314B] p-6 rounded-2xl border border-[#1e4769]">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#33FF99] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">assess your situation in your language</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#33FF99] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">highlight key issues and risks that affect your customers and team</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#33FF99] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">propose quick fixes and longer-term improvements that respect your constraints</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#33FF99] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">shows where advisory, digital systems fit, or living systems work will have most impact</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center">
            <img src="/images/meeting.jpg" alt="Meeting" className="rounded-2xl max-w-full h-auto" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          <div className="flex justify-center">
            <img src="/images/teamwork.jpg" alt="Teamwork" className="rounded-2xl max-w-full h-auto" />
          </div>
          
          <div className="space-y-6">
            <div className="bg-[#16314B] p-6 rounded-2xl border border-[#1e4769]">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#33FF99] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">assess your situation in your language</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#33FF99] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">highlight key issues and risks that affect your customers and team</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#33FF99] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">propose quick fixes and longer-term improvements that respect your constraints</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#33FF99] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">shows where advisory, digital systems fit, or living systems work will have most impact</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PackagePreviewSection() {
  return (
    <section className="w-full text-white px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Skewed outer container */}
        <div className="bg-gradient-to-r from-[#33FF99] to-[#00CC7A] p-2 rounded-3xl transform -skew-y-1">
          {/* Straight inner container */}
          <div className="bg-[#1a3a52] p-8 rounded-3xl transform skew-y-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              Package <span className="text-[#33FF99]">Preview</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 text-black relative">
                <div className="bg-[#33FF99] text-black px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                  Starter
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded"></div>
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">
                  45<span className="text-lg font-normal">/hrs</span>
                </div>
                <p className="text-gray-600 mb-6">per month (billed per hour)</p>
                <button className="w-full bg-[#33FF99] text-black py-3 rounded-lg font-medium hover:bg-[#2ee889] transition-colors">
                  ⚡ Book Now
                </button>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-black relative">
                <div className="bg-[#33FF99] text-black px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                  Growth
                </div>
                <div className="absolute top-4 right-4 bg-[#33FF99] text-black px-2 py-1 rounded text-xs font-medium">
                  Best seller
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded"></div>
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">220</div>
                <p className="text-gray-600 mb-6">per month per employee</p>
                <button className="w-full bg-[#33FF99] text-black py-3 rounded-lg font-medium hover:bg-[#2ee889] transition-colors">
                  ⚡ Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
