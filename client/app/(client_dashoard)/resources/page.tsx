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
      question: "What does it mean that ORR is a business GP?",
      answer: "We work like a general practitioner for your organisation. We listen first, understand your context and constraints, then bring in the right mix of advisory, systems, AI, and nature-related expertise to treat root causes — always anchored in what matters most to you and your customers."
    },
    {
      question: "What happens in the first meeting?",
      answer: "In our first meeting, we focus on understanding your current situation, challenges, and goals. We'll discuss your business context, identify key pain points, and explore what success looks like for you. This helps us create a tailored ORR report with actionable recommendations."
    },
    {
      question: "What is the ORR report?",
      answer: "The ORR report is a comprehensive analysis we provide after our first meeting. It outlines key issues affecting your business, proposes quick fixes and long-term improvements, and shows where our advisory, digital systems, or living systems work will have the most impact on your organization."
    },
    {
      question: "How much do the meetings and report cost?",
      answer: "Our meetings are charged at €45/hour on a pro-rata basis, designed to be short, focused, and value-dense. The ORR report fee starts at €220, though the final cost depends on the complexity of your situation and requirements."
    },
    {
      question: "Do I have to keep working with ORR after the report?",
      answer: "Not at all. The ORR report is designed to provide value whether you continue working with us or not. It includes actionable recommendations you can implement independently. However, we're available to support implementation if you choose to continue our partnership."
    }
  ];

export default function ResourcesPage() {
  const [query, setQuery] = useState("");
    const [openFAQ, setOpenFAQ] = useState(0);

  const filtered = resources.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="relative z-10 mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <h1 className="text-primary text-2xl md:text-3xl font-semibold">Resources</h1>

          <div className="w-full md:w-1/3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anything here..."
                className="w-full rounded-full border border-primary bg-transparent px-4 py-3 pl-5 text-sm outline-none placeholder:opacity-60 text-foreground"
              />
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" />
            </div>
          </div>
        </div>


        {/* Frame container */}
        <div className="bg-card rounded-2xl p-6 md:p-8shadow-inner">
          <div className="bg-secondary rounded-md px-4 py-3 mb-6 text-sm text-foreground opacity-70">
            Access shared documents, guides, or training materials
          </div>

          {/* Resource grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="flex flex-col gap-3 bg-secondary rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Placeholder icon square */}
                  <div className="w-12 h-12 rounded-md flex-shrink-0 bg-primary flex items-center justify-center text-background font-bold">
                    {r.title[0]}
                  </div>

                  <div className="flex-1 pl-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{r.title}</h3>
                      <div className="flex items-center gap-2">
                        <FiMoreHorizontal className="text-foreground opacity-60" />
                      </div>
                    </div>

                    <p className="text-xs text-foreground opacity-70 mt-2">{r.excerpt}</p>

                    <div className="flex items-center justify-between text-xs text-foreground opacity-60 mt-4">
                      <div>
                        <div>{r.participants} Participants</div>
                      </div>
                      <div>{r.date}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* bottom spacing so FAQ is separate */}
          <div className="h-12 " />
        </div>

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
