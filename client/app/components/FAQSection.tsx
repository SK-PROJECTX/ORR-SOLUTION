'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(0);

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

  return (
    <section className="w-full text-white px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Frequently <span className="text-[#33FF99]">Asked Questions</span>
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className={` rounded-2xl overflow-hidden border border-[#2a4a6b] ${openFAQ === index ? 'bg-[#0EC277]' : 'bg-[#2a4a6b]'}`}>
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
  );
}