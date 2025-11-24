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
    <section className="w-full  text-white px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden font-poppins">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Mini Client <span className="text-[#33FF99]">Journey</span>
        </h2>

        {/* Glowing Center Highlight */}
        <div className="absolute top-20 w-80 h-80 md:w-[500px] md:h-[500px] bg-[#33FF99]/20 rounded-full blur-[150px]"></div>

        {/* Quote Box */}
        <div className="relative bg-[#16314B] max-w-3xl w-full py-10 px-8 md:px-12 rounded-[30px] shadow-xl border border-[#1e4769]">
          <div className="text-[#33FF99] text-4xl mb-4 text-left">“</div>
          <p className="text-[#D4D8E3] leading-relaxed text-2xl  px-9 ">
            as they requested. In the end, the client found a 50% increase in
            traffic within days since its launch.
          </p>
          <div className="text-[#33FF99] text-4xl mt-4 text-right">”</div>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-6">
          <span className="w-2 h-2 rounded-full bg-[#33FF99]"></span>
          <span className="w-2 h-2 rounded-full bg-[#33FF99]/40"></span>
          <span className="w-2 h-2 rounded-full bg-[#33FF99]/40"></span>
        </div>
      </div>

      {/* Floating Client Images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* LEFT SIDE IMAGES */}
        <img
          src="/images/user-1.jpg"
          className="absolute left-10 top-20 w-26 h-26 rounded-full border-4 border-[#33FF99] shadow-[0_0_25px_#33FF99] object-cover"
        />
        <img
          src="/images/user-2.jpg"
          className="absolute left-4 top-1/2 w-20 h-20 rounded-full border-2 border-[#33FF99] shadow-[0_0_20px_#33FF99] object-cover"
        />
        <img
          src="/images/user-3.jpg"
          className="absolute left-30 bottom-24 w-30 h-30 rounded-full border-4 border-[#33FF99] shadow-[0_0_25px_#33FF99] object-cover"
        />

        {/* RIGHT SIDE IMAGES */}
        <img
          src="/images/user-4.jpg"
          className="absolute right-10 top-24 w-20 h-20 rounded-full border-4 border-[#33FF99] shadow-[0_0_25px_#33FF99] object-cover"
        />
        <img
          src="/clients/c5.png"
          className="absolute right-28 top-1/3 w-12 h-12 rounded-full border-2 border-[#33FF99] shadow-[0_0_20px_#33FF99] object-cover"
        />
        <img
          src="/clients/c6.png"
          className="absolute right-4 bottom-24 w-24 h-24 rounded-full border-4 border-[#33FF99] shadow-[0_0_25px_#33FF99] object-cover"
        />
      </div>
    </section>
  );
}
