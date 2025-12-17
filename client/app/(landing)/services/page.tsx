"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Services() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-foreground">
      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        section {
          opacity: 0;
          transform: translateY(30px);
        }
      `}</style>
      {/* Hero Section */}
      <section 
        ref={el => { sectionsRef.current[0] = el; }}
        className="pt-32 pb-16 px-6 relative min-h-[80vh] flex items-center"
      >
        <div className="absolute inset-0 " />
        <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-30 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="text-emerald-400">ORR Solutions</span>
            <span className="text-white"> - Listen.</span>
            <br />
            <span className="text-white">Solve. Optimise.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 maThe Threex-w-3xl mx-auto leading-relaxed">
            We treat your organisation as a whole system — digital, regulatory, and 
            living. We listen first, then design the right mix of advisory, systems, 
            AI, and on-the-ground projects so you can move better and grow 
            smarter too.
          </p>
        </div>
      </section>

      {/* Process Stages */}
      <section 
        ref={el => { sectionsRef.current[1] = el; }}
        className="py-16 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 md:grid-rows-2">
            {/* Stage 1 - Discover */}
            <div className="bg-slate-700 rounded-2xl p-8 text-white flex flex-col">
              <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">STAGE 1 - DISCOVER</h2>
              <h3 className="text-lg font-semibold mb-4">Listen.</h3>
              <p className="text-gray-300 text-sm mb-6">We start simple: one calm conversation and a quick scan of your reality.</p>
              <p className="text-gray-300 text-sm mb-4">We focus on:</p>
              <ul className="text-gray-300 text-sm space-y-2 mb-8 flex-grow">
                <li>• Your context, people, and pressures</li>
                <li>• Regulatory, operational, data, and environmental risks</li>
                <li>• Which questions actually matter</li>
              </ul>
              <button className="w-full bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-emerald-600 transition-colors mt-auto cursor-pointer">Sign up</button>
            </div>

            {/* Stage 2 - Diagnose */}
            <div className="bg-slate-700 rounded-2xl p-8 text-white flex flex-col">
              <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">STAGE 2 - DIAGNOSE</h2>
              <h3 className="text-lg font-semibold mb-4">Think. Then listen again.</h3>
              <p className="text-gray-300 text-sm mb-6">We turn symptoms into a clear map of problems and opportunities across three pillars.</p>
              <p className="text-gray-300 text-sm mb-4">What happens here:</p>
              <ul className="text-gray-300 text-sm space-y-2 mb-8 flex-grow">
                <li>• Bottleneck and process mapping</li>
                <li>• Compliance, governance, and risk review</li>
                <li>• Data and living systems scan</li>
                <li>• Prioritised list: urgent, high leverage, later</li>
              </ul>
              <button className="w-full bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-emerald-600 transition-colors mt-auto cursor-pointer">Learn More</button>
            </div>

            {/* Stage 3 - Design */}
            <div className="bg-slate-700 rounded-2xl p-8 text-white flex flex-col">
              <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">STAGE 3 - DESIGN</h2>
              <h3 className="text-lg font-semibold mb-4">Design.</h3>
              <p className="text-gray-300 text-sm mb-6">We design practical structures not theory decks.</p>
              <p className="text-gray-300 text-sm mb-4">Typical Outputs:</p>
              <ul className="text-gray-300 text-sm space-y-2 mb-8 flex-grow">
                <li>• SOPs and standardised workflows</li>
                <li>• Communication and decision pathways</li>
                <li>• Tech stacks, integration and AI use-case</li>
                <li>• Simple concepts for field or nurture projects</li>
                <li>• Clean, structured data ready for reporting</li>
              </ul>
              <div className="flex flex-col gap-3 mt-auto">
                <button className="w-full bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer">Sign up</button>
                <button className="w-full bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer">Learn More on living systems & augmentation</button>
              </div>
            </div>

            {/* Stage 4 - Deploy */}
            <div className="bg-slate-700 rounded-2xl p-8 text-white flex flex-col">
              <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">STAGE 4 - DEPLOY</h2>
              <h3 className="text-lg font-semibold mb-4">Solve in practice.</h3>
              <p className="text-gray-300 text-sm mb-6">Design becomes reality with guided implementation.</p>
              <p className="text-gray-300 text-sm mb-4">Deployment can include:</p>
              <ul className="text-gray-300 text-sm space-y-2 mb-8 flex-grow">
                <li>• Admin and records setup</li>
                <li>• Client logging, pipeline, and follow-up flows</li>
                <li>• KPI fit dashboards with AI summaries</li>
                <li>• Staff training in the tools you already use</li>
                <li>• Connecting with external providers where needed</li>
              </ul>
              <button className="w-full bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-emerald-600 transition-colors mt-auto cursor-pointer">Contact Us</button>
            </div>
          </div>

          {/* Stage 5 - Grow (Full Width) */}
          <div className="bg-slate-700 rounded-2xl p-8 text-white max-w-[600px] mx-auto">
            <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-4">STAGE 5 - GROW</h2>
            <h3 className="text-lg font-semibold mb-4">Optimise.</h3>
            <p className="text-gray-300 text-sm mb-6">Once systems are live, we keep them learning.</p>
            <p className="text-gray-300 text-sm mb-4">How we support growth:</p>
            <ul className="text-gray-300 text-sm space-y-2 mb-8">
              <li>• Ongoing data capture and light analytics</li>
              <li>• Quarterly reviews and system tuning</li>
              <li>• AI-assisted monitoring and early warnings</li>
              <li>• Scenario and 'what if' thinking</li>
              <li>• Light, regular check-ins — your systems clinic</li>
            </ul>
            <button className="w-full bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer">Sign up</button>
          </div>
        </div>
      </section>

      {/* The Three Pillars */}
      <section 
        ref={el => { sectionsRef.current[2] = el; }}
        className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-emerald-800 min-h-[80vh] flex items-center"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">
              The Three <span className="text-[#5ef558]">Pillars</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Digital Systems Pillar */}
            <div className="bg-black rounded-2xl px-8 py-12 text-white flex flex-col min-h-[300px]">
              <h3 className="text-3xl font-bold mb-8 text-center">Digital Systems, Automation & AI</h3>
              <p className="text-gray-300 text-xl mb-8 text-center flex-grow">SOPs, workflows, portals, dashboards, and AI helpers that make work flow with less effort and fewer surprises.</p>
              <button className="w-full bg-gradient-primary text-[#204460] font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity mt-8 cursor-pointer">Learn More</button>
            </div>

            {/* Strategic Advisory Pillar */}
            <div className="bg-black rounded-2xl px-8 py-12 text-white flex flex-col min-h-[300px]">
              <h3 className="text-3xl font-bold mb-8 text-center">Strategic Advisory & Compliance</h3>
              <p className="text-gray-300 text-xl mb-8 text-center flex-grow">Short, sharp clarity on rules, risk, and direction — from regulation and ESG to biotech and environmental questions.</p>
              <button className="w-full bg-gradient-primary text-[#204460] font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity mt-8 cursor-pointer">Learn More</button>
            </div>

            {/* Living Systems Pillar */}
            <div className="bg-black rounded-2xl px-8 py-12 text-white flex flex-col min-h-[300px]">
              <h3 className="text-3xl font-bold mb-8 text-center">Living Systems & Regeneration</h3>
              <p className="text-gray-300 text-xl mb-8 text-center flex-grow">Support for land, water, species, and ecosystems — from production systems to restoration and incident response.</p>
              <button className="w-full bg-gradient-primary text-[#204460] font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity mt-8 cursor-pointer">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Business GP Section */}
      <section 
        ref={el => { sectionsRef.current[3] = el; }}
        className="py-20 px-6 bg-background star relative min-h-[80vh] flex items-center"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                ORR is your Business GP for
              </h2>
              <h3 className="text-4xl font-bold mb-8 text-white">
                complex <span className="text-green-400">systems — digital and living.</span>
              </h3>
              <p className="text-gray-300 text-xl mb-8">
                We listen to the whole organisation, solve with structure and insight, and optimise so you can grow with confidence.
              </p>
              <button className="bg-gradient-primary text-[#204460] px-12 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors">
                Contact Us
              </button>
            </div>
            <div>
              <img 
                src="/images/handshake.png"
                alt="Business handshake" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
}