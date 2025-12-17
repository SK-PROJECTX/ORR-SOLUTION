"use client";

import React, { useState } from "react";
import { FiSearch, FiMoreHorizontal, FiPlus } from "react-icons/fi";
import { Plus, X } from 'lucide-react';

/**
 * Notes:
 * - Replace placeholder icons (colored squares) with actual images or <img src="..." />
 * - Tailwind classes assume your tailwind config supports the default palette.
 * - The starry background is simulated with CSS pseudo-element (.stars-bg).
 */

const resources = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  title: ["Design tools", "Premium Support", "Slack Bot", "Developer First", "Looking great", "Premium Support"][i % 6],
  excerpt:
    "You have the opportunity to play this game of life you need to appreciate every moment.",
  participants: 10 + i,
  date: "20.06.22",
}));

  const faqs = [
    {
      question: "What does it mean that ORR is a “business GP”?",
      answer: "We operate like the general practitioner of your organisation. We listen first, diagnose the underlying causes, and coordinate the right mix of interventions and specialists."
    },
    {
      question: "What does ORR actually do?",
      answer: "ORR integrates advisory, compliance, digital systems, automation, AI, and living-system expertise into one coordinated method. We diagnose and design solutions through our five-stage model: Discover → Diagnose → Design → Deploy → Grow."
    },
    {
      question: "What makes ORR different from traditional consulting?",
      answer: "We shorten the discovery phase, give clarity early, and avoid tool-first thinking. The result: faster diagnosis, lower cost, and actionable outcomes from the very start."
    },
    {
      question: "Are you only focused on tech?",
      answer: "No. Technology is a later step. We start with people, decisions, and processes — then choose tools that support them."
    },
    {
      question: "Do you replace our existing consultants or IT providers?",
      answer: "Not unless you want us to. ORR acts as the coordination layer, aligning all specialists around one coherent plan."
    },
    {
      question: "Is the ORR method the same for every client?",
      answer: "The structure is fixed; the application is tailored. You move through the same stages, but the pace, depth, and interventions are customised."
    },
    {
      question: "Can ORR support urgent or crisis situations?",
      answer: "Yes. For time-critical issues, we prioritise rapid assessment and stabilisation before re-entering structured work."
    },

  ];

export default function FrequentlyAskQuestionsPage() {
  const [query, setQuery] = useState("");
    const [openFAQ, setOpenFAQ] = useState(0);

  const filtered = resources.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="relative z-10 mx-auto px-6 py-12">
       
        {/* FAQ heading */}
        <section className="mt-12">
              <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto">

            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Frequently <span className="text-[#33FF99]">Asked Questions</span>
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className={` rounded-2xl overflow-hidden border border-[#2a4a6b] ${openFAQ === index ? 'bg-primary' : 'bg-[#2a4a6b]'}`}>
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-[#2a4a6b] transition-colors"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  {openFAQ === index ? (
                    <X className="w-5 h-5 text-red-500" />
                  ) : (
                    <Plus className="w-5 h-5 text-black" />
                  )}
                </div>
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <div className="rounded-xl p-4">
                    <p className="leading-relaxed text-white">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
        </section>
      </div>

      {/* small footer spacer */}
      <div className="h-24" />
    </main>
  );
}
