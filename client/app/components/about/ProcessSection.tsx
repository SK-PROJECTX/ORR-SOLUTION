"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const processCards = [
  {
    id: "01",
    title: "The Beginning", 
    bullet1: "A quiet conversation.",
    bullet2: "One problem.",
    bullet3: "One pressure point.",
    bullet4: "One story that finally gets told.",
    description1: "We listen. Properly.",
    description2: "Not to diagnose too fast, not to impress —",
    description3: "but to understand how your organisation actually breathes.",
    description4: "As you scroll, the screen lights up with your world:the systems you built, the gaps you tolerate, the ideas you haven't voiced yet.",
    description5: "This is the moment everything starts.",
    image: "/first meeting.jpg"
  },
  {
    id: "02",
    title: "The First Map", 
    subtitle: "After the meeting, the noise clears.",
    description: "We open a blank page and begin drawing the first map of your organisation: where things flow, where they clog, where hidden energy leaks.",
    bullet1: "No polish.",
    bullet2: "No sales pitch.",
    bullet3: "Just thinking in writing — your case file begins here.",
    description1: "This becomes the backbone of everything that follows.",
    image: "/working report.jpg"
  },
  {
    id: "03",
     title: "The Deepening", 
    subtitle: "The map sharpens.",
    description: "We pull in the right forms of intelligence: domain insight, targeted research, regulatory skeletons, operational patterns, AI opportunities, risk shadows.",
    bullet1: "Only what adds value.",
    bullet2: "No sales pitch.",
    bullet3: "Nothing that inflates the process.",
    description1: "Your world becomes clearer, not bigger.",
    image: "/deepening analysis.jpg"
  },
  {
    id: "04",
    title: "The Second Conversation", 
    subtitle: "Now the questions get sharper.",
    bullet1: "We return to you — briefly, precisely.",
    bullet2: "To test assumptions.",
    bullet3: "To correct tone.",
    bullet4: "To realign the map with the reality you inhabit.",
    description1: "This is where the document stops being 'analysis' and starts becoming a design for action.",
    image: "/think then listen.jpg"
  },
  {
    id: "05",
    title: "The ORR Report", 
    subtitle: "You reach the decision point.",
    description: "What you receive is not decoration — but a structured, decision-ready model:",
    bullet1: "What is happening.",
    bullet2: "Why it's happening.",
    bullet3: "What must change now.",
    bullet4: "What can grow later.",
    bullet5: "And a modus operandi that ties it all together.",
    description1: "A blueprint that stands on its own. With us, or without us.",
    image: "/the orr report.jpg"
  },
  {
    id: "06",
    title: "The Meeting Architecture", 
    subtitle: "Behind the scenes, the rhythm is simple:",
    description: "First Meeting → Discovery → Follow-Up → Report Review",
    bullet1: "Each one short.",
    bullet2: "Each one deliberate.",
    bullet3: "Each one designed to move the case forward, never sideways.",
    description1: "This cadence keeps the process light, while the thinking stays deep.",
    image: "/transparent pricing.jpg"
  },
    {
    id: "07",
    title: "The Choice", 
    subtitle: "With the report in hand, you choose the path:",
    bullet1: "Stop here.",
    bullet2: "Use the blueprint internally.",
    wordbreak: "OR",
    bullet3: "Continue.",
    bullet4: "Let ORR coordinate implementation,",
    bullet5: "structure your systems,",
    bullet6: "refine your operations,",
    bullet7: "and support your growth through a sustained relationship.",
    description1: "Either way:",
    description2: "you walk away with clarity.",
    image: "/your decision point.jpg"
  },
   {
    id: "08",
    title: "The Portal", 
    subtitle: "If you stay with us, the work shifts into a different gear.",
    description: "The Client Portal unlocks:",
    bullet1: "your meetings,",
    bullet2: "your documents,",
    bullet3: "your tasks,",
    bullet4: "your insights,",
    bullet5: "your Workspace.",
    bullet6: "refine your operations,",
    bullet7: "and support your growth through a sustained relationship.",
    bullet8: "One interface.",
    bullet9: "No scattered emails",
    description2: "A single coordination layer for your ongoing transformation.",
    image: "/your decision point.jpg"
  },
   {
    id: "09",
    title: "The Philosophy Underneath", 
    subtitle: "At every step, the model holds:",
    description: "Discover → Diagnose → Design → Deploy → Grow",
    description1: "It is the Business GP method — the quiet, structured way to stabilise an organisation and then help it operate like a living system:",
    description2: "coherent, adaptive, responsive.",
    image: "/your decision point.jpg"
  },
   {
    id: "10",
    title: "The Invitation", 
    subtitle: "If this approach feels different, it's because it is.",
    description1: "It is slower at the beginning, faster at the end,and clearer all the way through.",
    description2: "Start with one meeting. The rest unfolds from there.",
    image: "/your decision point.jpg",
    buttonText: "Book Your First Meeting",
    buttonText2: "Explore our services",
    buttonText3: "Access the Client Portal"
  },
];

export const ProcessSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const cards = containerRef.current.querySelectorAll('.process-card');
      const scrollPosition = window.scrollY;
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate which card should be active
      const relativeScroll = scrollPosition - containerTop + windowHeight * 0.3;
      const cardHeight = containerHeight / cards.length;
      
      const newActiveCard = Math.min(
        Math.floor(relativeScroll / cardHeight),
        cards.length - 1
      );

      if (newActiveCard >= 0 && newActiveCard < cards.length) {
        setActiveCard(newActiveCard);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Main Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Overlapping Cards */}
          <div 
            ref={containerRef}
            className="relative h-[200vh] lg:h-[300vh]"
          >
            {processCards.map((card, index) => {
              const isActive = index === activeCard;
              const isPast = index < activeCard;
              
              return (
                <motion.div
                  key={card.id}
                  className={`process-card absolute left-0 right-0 bg-gradient-to-br from-slate-700 to-slate-800 rounded-[2rem] overflow-hidden transition-all duration-500 ${
                    isActive 
                      ? 'z-30 opacity-100 scale-100 translate-y-0' 
                      : isPast
                      ? 'z-20 opacity-70 scale-95 translate-y-4'
                      : 'z-10 opacity-40 scale-90 translate-y-8'
                  }`}
                  style={{
                    top: `${index * 120}px`, // Overlap cards by positioning them close together
                    height: 'auto',
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="p-8 md:p-10">
                    {/* Card Header with Number */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-slate-600/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {card.id}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {card.title}
                        </h2>
                        {card.subtitle && (
                          <h3 className="text-base md:text-lg font-semibold text-emerald-400">
                            {card.subtitle}
                          </h3>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="space-y-4">
                      {card.description && (
                        <p className="text-sm md:text-base text-white leading-relaxed">
                          {card.description}
                        </p>
                      )}
                      
                      {/* Bullet Points */}
                      {card.bullet1 && (
                        <div className="space-y-2">
                          {card.bullet1 && <p className="text-gray-300 text-sm md:text-base leading-relaxed">• {card.bullet1}</p>}
                          {card.bullet2 && <p className="text-gray-300 text-sm md:text-base leading-relaxed">• {card.bullet2}</p>}
                          {card.bullet3 && <p className="text-gray-300 text-sm md:text-base leading-relaxed">• {card.bullet3}</p>}
                          {card.bullet4 && <p className="text-gray-300 text-sm md:text-base leading-relaxed">• {card.bullet4}</p>}
                          {card.bullet5 && <p className="text-gray-300 text-sm md:text-base leading-relaxed">• {card.bullet5}</p>}
                          {card.bullet6 && <p className="text-gray-300 text-sm md:text-base leading-relaxed">• {card.bullet6}</p>}
                          {card.bullet7 && <p className="text-gray-300 text-sm md:text-base leading-relaxed">• {card.bullet7}</p>}
                          {card.bullet8 && <p className="text-gray-300 text-sm md:text-base leading-relaxed">• {card.bullet8}</p>}
                          {card.bullet9 && <p className="text-gray-300 text-sm md:text-base leading-relaxed">• {card.bullet9}</p>}
                        </div>
                      )}
                      
                      {card.wordbreak && (
                        <p className="text-white text-base md:text-lg font-bold text-center my-4">
                          {card.wordbreak}
                        </p>
                      )}
                      
                      {/* Additional Descriptions */}
                      {card.description1 && (
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                          {card.description1}
                        </p>
                      )}
                      {card.description2 && (
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                          {card.description2}
                        </p>
                      )}
                      {card.description3 && (
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                          {card.description3}
                        </p>
                      )}
                      {card.description4 && (
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                          {card.description4}
                        </p>
                      )}
                    </div>

                    {/* Buttons for the last card */}
                    {card.buttonText && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-4 mt-8"
                      >
                        <motion.button 
                          whileHover={{ scale: 1.03 }}
                          className="bg-emerald-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-emerald-300 transition-colors w-full"
                        >
                          {card.buttonText}
                        </motion.button>
                        {card.buttonText2 && (
                          <motion.button 
                            whileHover={{ scale: 1.03 }}
                            className="border border-emerald-400 text-emerald-400 px-8 py-3 rounded-full font-semibold hover:bg-emerald-400 hover:text-black transition-colors w-full"
                          >
                            {card.buttonText2}
                          </motion.button>
                        )}
                        {card.buttonText3 && (
                          <motion.button 
                            whileHover={{ scale: 1.03 }}
                            className="border border-emerald-400 text-emerald-400 px-8 py-3 rounded-full font-semibold hover:bg-emerald-400 hover:text-black transition-colors w-full"
                          >
                            {card.buttonText3}
                          </motion.button>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column - Sticky Image */}
          <div className="sticky top-24 h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)]">
            <div 
              ref={imageRef}
              className="relative h-full w-full rounded-[2rem] overflow-hidden"
            >
              {processCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === activeCard ? 'opacity-100' : 'opacity-0'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === activeCard ? 1 : 0 }}
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  {/* Image overlay with card number and plus button */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                    <div className="w-16 h-16 bg-slate-600/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {card.id}
                    </div>
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">+</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};