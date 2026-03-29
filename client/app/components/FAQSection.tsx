'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, X } from 'lucide-react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getRichTextContent } from "../../lib/rich-text-utils";
import SafeHTMLRenderer from "../../components/SafeHTMLRenderer";


gsap.registerPlugin(ScrollTrigger);

interface FAQSectionProps {
  content?: any;
  onUpdate?: (id: number, data: any) => Promise<void>;
}

export default function FAQSection({ content, onUpdate }: FAQSectionProps) {
  const faqs = content || [];
  
  const [openFAQ, setOpenFAQ] = useState(-1);
  const titleRef = useRef(null);
  const faqsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" }
        }
      );

      faqsRef.current.forEach((faq, i) => {
        if (faq) {
          gsap.fromTo(faq,
            { opacity: 0, x: -30 },
            {
              opacity: 1, x: 0, duration: 0.6, delay: i * 0.1, ease: "power3.out",
              scrollTrigger: { trigger: faq, start: "top 85%" }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full text-foreground bg-background px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden font-poppins transition-colors duration-300">
      

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Frequently <span className="text-primary">Asked Questions</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq: any, index: number) => (
            <div ref={el => { faqsRef.current[index] = el; }} key={index} className={`rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 transition-all duration-300 ${openFAQ === index ? 'bg-primary text-white' : 'glass-panel'}`}>
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                className={`w-full p-6 text-left flex items-center justify-between transition-colors ${openFAQ === index ? 'hover:bg-primary/90' : 'hover:bg-primary/10'}`}
              >
                <span className="text-lg font-medium"><SafeHTMLRenderer data={faq.question} /></span>
                <div className="w-8 h-8 px-1.5 rounded-full bg-white flex items-center justify-center transform transition-transform duration-300">
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
                    <p className={`leading-relaxed ${openFAQ === index ? 'text-white' : 'opacity-70'}`}><SafeHTMLRenderer data={faq.answer} /></p>
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
