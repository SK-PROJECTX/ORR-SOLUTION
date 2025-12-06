'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import EditableText from '../../components/EditableText';

interface FAQSectionProps {
  content?: any[];
  onContentUpdate?: (data: any) => Promise<void>;
}

export default function FAQSection({ content, onContentUpdate }: FAQSectionProps) {
  const [openFAQ, setOpenFAQ] = useState(0);

  const handleTitleSave = async (newTitle: string) => {
    console.log('FAQ title update:', newTitle);
  };

  const faqs = content || [];
  console.log('FAQ Section - content received:', content);
  console.log('FAQ Section - faqs array:', faqs);

  return (
    <section className="w-full text-white px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <EditableText
          content="Frequently Asked Questions"
          onSave={handleTitleSave}
          tag="h2"
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          placeholder="Enter FAQ section title..."
        />
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id || index} className={` rounded-2xl overflow-hidden border border-[#2a4a6b] ${openFAQ === index ? 'bg-primary' : 'bg-[#2a4a6b]'}`}>
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-[#2a4a6b] transition-colors"
              >
                <EditableText
                  content={faq.question}
                  onSave={async (text) => {
                    if (onContentUpdate && faq.id) {
                      await onContentUpdate(faq.id, { question: text });
                    }
                  }}
                  tag="span"
                  className="text-lg font-medium"
                  placeholder="Enter FAQ question..."
                />
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
                    <EditableText
                      content={faq.answer}
                      onSave={async (text) => {
                        if (onContentUpdate && faq.id) {
                          await onContentUpdate(faq.id, { answer: text });
                        }
                      }}
                      tag="p"
                      className="leading-relaxed text-white"
                      placeholder="Enter FAQ answer..."
                      multiline
                    />
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