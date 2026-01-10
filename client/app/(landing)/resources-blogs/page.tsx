"use client";

import { useRef, useState, useEffect } from "react";
import { useScrollSplit } from "@/hooks/useScrollSplit";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ResourcesBlogs() {
  useScrollSplit();
  
  return (
    <div className="min-h-screen text-white">
      <HeroSection />
      <div className="scroll-section"><ContentSection /></div>
    </div>
  );
}

function HeroSection() {
  const titleRef = useRef(null);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);
  const p3Ref = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    gsap.fromTo(p1Ref.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: "power2.out" });
    gsap.fromTo(p2Ref.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.5, ease: "power2.out" });
    gsap.fromTo(p3Ref.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.7, ease: "power2.out" });
    gsap.fromTo(buttonsRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.9, ease: "back.out(1.7)" });
  }, []);

  return (
    <section className="relative px-6 my-20 md:px-16 py-20 min-h-screen flex flex-col items-start justify-center">
      <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-6">
        Resources
        <br />
        <span className="text-green-400">& Client Portal</span>
      </h1>
      
      <p ref={p1Ref} className="max-w-2xl text-gray-300 text-lg mb-8 leading-relaxed">
        Your digital HQ for business clarity, timelines, and real-time status.
        This isn't a traditional blog.
      </p>
      
      <p ref={p2Ref} className="max-w-3xl text-gray-300 mb-12 leading-relaxed">
        Our resources are organized around the ORR client portal — a dashboard where
        you can read FAQs, download material, request meetings, and chat with a live
        operator or consultant.
      </p>
      
      <p ref={p3Ref} className="max-w-3xl text-gray-300 mb-12 leading-relaxed">
        Instead of scattered articles, you get structured guidance that follows our live
        project — following blogs have insight, how-to — and real-time alerts.
        Everything is organized around live project management, AI marketing
        systems & implementation.
      </p>
      
      <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-green-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-green-300 transition-colors">
          Request access to the client portal
        </button>
        <button className="border border-green-400 text-green-400 px-8 py-3 rounded-full font-semibold hover:bg-green-400 hover:text-black transition-colors">
          Learn how we operate
        </button>
      </div>
    </section>
  );
}

function ContentSection() {
  return (
    <section className="px-6 md:px-16 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Left Column */}
        <ContentCard
          badge="Blog"
          title="WHY A PORTAL, NOT JUST A BLOG?"
          content={[
            "Designed for people who want to act, not just read.",
            "Everything you need is one location.",
            "Live ORR client portal connects resources, FAQs, chat, and project management in one place.",
            "Questions or decisions can be live chat with consultants.",
            "Sharing links, documents, and project updates happens in real-time.",
            "Sharing FAQs",
            "Everything you need to know about how we work and the projects we deliver is in one place.",
            "Project workflow is dynamic."
          ]}
          image="https://res.cloudinary.com/depeqzb6z/image/upload/v1765559589/21743692_6495306_uay57y.jpg"
        />
        
        {/* Right Column */}
        <ContentCard
          badge="Guide"
          title="HOW CONTENT IS ORGANISED"
          content={[
            "Resources that follow the way we work.",
            "Everything here is project-focused live resources — not standalone articles or random tips.",
            "By Stage:",
            "• Discovery — understand, feedback, and next steps",
            "• Define — deliverables, timelines, and expectations",
            "• Deploy — live development, testing, and launch",
            "• Deliver — handover, training, and ongoing support",
            "By Type:",
            "• FAQs — quick answers to common questions",
            "• Guides — step-by-step processes for clients, stakeholders, and change management",
            "• Resources — templates, checklists, and tools",
            "• Updates — real-time project status, new features, and announcements"
          ]}
          image="https://res.cloudinary.com/depeqzb6z/image/upload/v1765559588/11235559_10793_z44m6j.jpg"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mt-8">
        {/* Bottom Left */}
        <ContentCard
          badge="Guide"
          title="WHAT YOU CAN DO TODAY"
          content={[
            "Before, during, and after working with ORR.",
            "Whether you're just starting or already — or just thinking about it:",
            "Read our FAQ and request a call with us.",
            "Before you engage:",
            "Read how our live meeting and client work happens — so you know what to expect when we start working together.",
            "During engagement:",
            "Access live project status in real-time — see progress, ask questions, and get immediate answers from our team.",
            "After project is complete:",
            "Download resources from completed work, get ongoing support, and access to our alumni network.",
            "Download resources from completed work, get ongoing support, and access to our alumni network.",
            "Access resources on key development, project management, and business growth topics.",
            "Access resources on key development, project management, and business growth topics."
          ]}
          image="https://res.cloudinary.com/depeqzb6z/image/upload/v1765559588/12146019_Wavy_Gen-02_Single-01_xkhifo.jpg"
        />
        
        {/* Bottom Right */}
        <ContentCard
          badge="Access"
          title="HOW ACCESS WORKS"
          content={[
            "Simple. Immediate access.",
            "Request access:",
            "Click above button and we'll send you an email with your login details.",
            "Receive your login:",
            "Check your email for credentials and the link to your client portal.",
            "Start exploring:",
            "Log in and start exploring resources, FAQs, and project tools.",
            "Book your first chat:",
            "Use our in-app calendar to book a 15-minute call with our team to discuss your project and next steps.",
            "Request your first project:",
            "Submit your first project request directly through the portal and begin our 4-stage process."
          ]}
          image="https://res.cloudinary.com/depeqzb6z/image/upload/v1765559586/133742375_10241279_mghczg.jpg"
          buttons={[
            "Request access to the client portal",
            "Learn how we operate"
          ]}
        />
      </div>
    </section>
  );
}

function ContentCard({ badge, title, content, image, buttons }: {
  badge: string;
  title: string;
  content: string[];
  image: string;
  buttons?: string[];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(cardRef.current,
      { opacity: 0, rotateY: -15, x: -50 },
      {
        opacity: 1,
        rotateY: 0,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "top 15%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  }, []);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <div 
      ref={cardRef}
      onClick={handleClick}
      className={`bg-[#1A2B3D] rounded-3xl p-6 border border-gray-700/30 cursor-pointer transition-all duration-300 ${
        isExpanded ? 'bg-[#1F3247]' : 'hover:bg-[#1A2B3D]/80'
      }`}
    >
      <div className="mb-6">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-2xl"
        />
      </div>
      
      <div className="mb-4">
        <span className="bg-green-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
          {badge}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mb-6">{title}</h3>
      
      <div className="text-gray-300 text-sm leading-relaxed">
        {!isExpanded ? (
          <div>
            <p className="line-clamp-3">{content.slice(0, 2).join(' ')}</p>
            <p className="text-gray-400 mt-2">...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {content.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        )}
      </div>
      
      {buttons && isExpanded && (
        <div className="flex flex-col gap-3 mt-6">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                index === 0
                  ? 'bg-green-400 text-black hover:bg-green-300'
                  : 'border border-green-400 text-green-400 hover:bg-green-400 hover:text-black'
              }`}
            >
              {button}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}