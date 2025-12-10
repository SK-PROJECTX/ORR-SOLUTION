"use client";
import { useEffect, useRef } from "react";
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
    description4: "As you scroll, the screen lights up with your world:the systems you built, the gaps you tolerate, the ideas you haven’t voiced yet.",
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
    description1: "This is where the document stops being “analysis” and starts becoming a design for action.",
    image: "/think then listen.jpg"
  },
  {
    id: "05",
    title: "The ORR Report", 
    subtitle: "You reach the decision point.",
    description: "What you receive is not decoration — but a structured, decision-ready model:",
    bullet1: "What is happening.",
    bullet2: "Why it’s happening.",
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
    subtitle: "If this approach feels different, it’s because it is.",
    description1: "It is slower at the beginning, faster at the end,and clearer all the way through.",
    description2: "Start with one meeting. The rest unfolds from there.",
    image: "/your decision point.jpg",
    buttonText: "Book Your First Meeting",
    buttonText2: "Explore our services",
    buttonText3: "Access the Client Portal"
  },

];

const bulletVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.5 } })
};

export const ProcessSection = () => {

  return (
    <section className="w-full text-white px-6 md:px-12 lg:px-24 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {processCards.map((card, index) => (
          <motion.div 
            key={card.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-20%" }}
            className={`w-full ${index === processCards.length - 1 && processCards.length % 2 !== 0 ? "md:col-span-2 md:max-w-2xl md:mx-auto" : ""}`}
          >
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-[2rem] overflow-hidden h-full flex flex-col">
              <div className="h-80 md:h-96 relative">
                <Image 
                  src={card.image} 
                  alt={card.title}
                  fill
                  className="object-cover rounded-t-[2rem]"
                />
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                  <div className="w-16 h-16 bg-slate-600/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {card.id}
                  </div>
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">+</span>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl md:text-3xl font-bold text-white mb-3"
                >
                  {card.title}
                </motion.h2>
                <h3 className="text-base md:text-lg font-semibold text-primary mb-4">{card.subtitle}</h3>
                {card.description && <p className="text-sm md:text-base text-white mb-4">{card.description}</p>}
                {card.bullet1 && <motion.p custom={0} variants={bulletVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-gray-300 text-sm md:text-base leading-relaxed mb-2">{card.bullet1}</motion.p>}
                {card.bullet2 && <motion.p custom={1} variants={bulletVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-gray-300 text-sm md:text-base leading-relaxed mb-2">{card.bullet2}</motion.p>}
                {card.wordbreak && <motion.p initial={{ scale: 1 }} whileInView={{ scale: 1.12 }} transition={{ duration: 0.6 }} className="text-white text-base md:text-lg font-bold text-center my-4">{card.wordbreak}</motion.p>}
                {card.bullet3 && <motion.p custom={2} variants={bulletVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-gray-300 text-sm md:text-base leading-relaxed mb-2">{card.bullet3}</motion.p>}
                {card.bullet4 && <motion.p custom={3} variants={bulletVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-gray-300 text-sm md:text-base leading-relaxed mb-2">{card.bullet4}</motion.p>}
                {card.bullet5 && <motion.p custom={4} variants={bulletVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-gray-300 text-sm md:text-base leading-relaxed mb-2">{card.bullet5}</motion.p>}
                {card.bullet6 && <motion.p custom={5} variants={bulletVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-gray-300 text-sm md:text-base leading-relaxed mb-2">{card.bullet6}</motion.p>}
                {card.bullet7 && <motion.p custom={6} variants={bulletVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-gray-300 text-sm md:text-base leading-relaxed mb-2">{card.bullet7}</motion.p>}
                {card.bullet8 && <motion.p custom={7} variants={bulletVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-gray-300 text-sm md:text-base leading-relaxed mb-2">{card.bullet8}</motion.p>}
                {card.bullet9 && <motion.p custom={8} variants={bulletVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-gray-300 text-sm md:text-base leading-relaxed mb-2">{card.bullet9}</motion.p>}
                {card.description1 && <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-4 mb-2">{card.description1}</p>}
                {card.description2 && <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-2">{card.description2}</p>}
                {card.description3 && <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-2">{card.description3}</p>}
                {card.description4 && <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-2">{card.description4}</p>}
                {card.buttonText && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-4 mt-auto pt-4"
                  >
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      className="bg-green-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-green-300 transition-colors w-full"
                    >
                      {card.buttonText}
                    </motion.button>
                    {card.buttonText2 && (
                      <motion.button 
                        whileHover={{ scale: 1.03 }}
                        className="border border-green-400 text-green-400 px-8 py-3 rounded-full font-semibold hover:bg-green-400 hover:text-black transition-colors w-full"
                      >
                        {card.buttonText2}
                      </motion.button>
                    )}
                    {card.buttonText3 && (
                      <motion.button 
                        whileHover={{ scale: 1.03 }}
                        className="border border-green-400 text-green-400 px-8 py-3 rounded-full font-semibold hover:bg-green-400 hover:text-black transition-colors w-full"
                      >
                        {card.buttonText3}
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
};
