"use client"
import { useEffect, useRef, useState } from "react";

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
    description4: "As you scroll, the screen lights up with your world: the systems you built, the gaps you tolerate, the ideas you haven't voiced yet.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
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
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
  },
  {
    id: "04",
    title: "The Second Conversation", 
    subtitle: "Now the questions get sharper.",
    bullet1: "We return to you — briefly, precisely.",
    bullet2: "To test assumptions.",
    bullet3: "To correct tone.",
    bullet4: "To realign the map with the reality you inhabit.",
    description1: "This is where the document stops being analysis and starts becoming a design for action.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
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
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
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
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop"
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
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"
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
    bullet8: "One interface.",
    bullet9: "No scattered emails",
    description2: "A single coordination layer for your ongoing transformation.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop"
  },
  {
    id: "09",
    title: "The Philosophy Underneath", 
    subtitle: "At every step, the model holds:",
    description: "Discover → Diagnose → Design → Deploy → Grow",
    description1: "It is the Business GP method — the quiet, structured way to stabilise an organisation and then help it operate like a living system:",
    description2: "coherent, adaptive, responsive.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop"
  },
  {
    id: "10",
    title: "The Invitation", 
    subtitle: "If this approach feels different, it's because it is.",
    description1: "It is slower at the beginning, faster at the end, and clearer all the way through.",
    description2: "Start with one meeting. The rest unfolds from there.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop",
    buttonText: "Book Your First Meeting",
    buttonText2: "Explore our services",
    buttonText3: "Access the Client Portal"
  },
];

export default function StickyScrollSplit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const sections = containerRef.current.querySelectorAll('.card-section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index: number) => {
        const htmlSection = section as HTMLElement;
        const sectionTop = htmlSection.offsetTop;
        const sectionBottom = sectionTop + htmlSection.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="relative w-full py-20 pt-32 text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 sticky">
          <h1 className="text-center text-emerald-400 text-5xl md:text-6xl font-bold mb-12">
            How We <span className="text-white">Operate</span>
          </h1>
        </div>
      </div>

      {/* Split Layout Section */}
      <div ref={containerRef} className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left Side - Stacking Cards */}
          <div>
            {processCards.map((card, index) => (
              <div
                key={card.id}
                className="card-section"
                style={{
                  height: '100vh',
                  position: 'sticky',
                  top: `${24 + index * 8}px`,
                  zIndex: index + 1
                }}
              >
                <div
                  className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 w-full transition-all duration-700 ease-out"
                  style={{
                    transform: activeIndex === index 
                      ? 'scale(1) rotateY(0deg)' 
                      : activeIndex > index 
                        ? `scale(${0.95 - (activeIndex - index) * 0.03}) rotateY(-2deg)` 
                        : 'scale(0.98) rotateY(2deg)',
                    opacity: 1,
                    boxShadow: activeIndex === index 
                      ? '0 25px 50px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(16, 185, 129, 0.1)' 
                      : '0 10px 30px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {card.id}
                    </div>
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">+</span>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                    {card.title}
                  </h2>
                  
                  {card.subtitle && (
                    <h3 className="text-base sm:text-lg font-semibold text-emerald-400 mb-4">
                      {card.subtitle}
                    </h3>
                  )}
                  
                  {card.description && (
                    <p className="text-sm sm:text-base text-white mb-4">{card.description}</p>
                  )}
                  
                  <div className="space-y-2">
                    {card.bullet1 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet1}</p>}
                    {card.bullet2 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet2}</p>}
                    {card.wordbreak && <p className="text-white text-base sm:text-lg font-bold text-center my-4">{card.wordbreak}</p>}
                    {card.bullet3 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet3}</p>}
                    {card.bullet4 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet4}</p>}
                    {card.bullet5 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet5}</p>}
                    {card.bullet6 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet6}</p>}
                    {card.bullet7 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet7}</p>}
                    {card.bullet8 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet8}</p>}
                    {card.bullet9 && <p className="text-gray-300 text-sm sm:text-base">{card.bullet9}</p>}
                  </div>
                  
                  {card.description1 && <p className="text-gray-300 text-sm sm:text-base mt-4">{card.description1}</p>}
                  {card.description2 && <p className="text-gray-300 text-sm sm:text-base mt-2">{card.description2}</p>}
                  {card.description3 && <p className="text-gray-300 text-sm sm:text-base mt-2">{card.description3}</p>}
                  {card.description4 && <p className="text-gray-300 text-sm sm:text-base mt-2">{card.description4}</p>}
                  
                  {card.buttonText && (
                    <div className="flex flex-col gap-3 mt-6">
                      <button className="bg-emerald-400 text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-emerald-300 transition-all hover:scale-105 text-sm sm:text-base">
                        {card.buttonText}
                      </button>
                      {card.buttonText2 && (
                        <button className="border border-emerald-400 text-emerald-400 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-emerald-400 hover:text-black transition-all hover:scale-105 text-sm sm:text-base">
                          {card.buttonText2}
                        </button>
                      )}
                      {card.buttonText3 && (
                        <button className="border border-emerald-400 text-emerald-400 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-emerald-400 hover:text-black transition-all hover:scale-105 text-sm sm:text-base">
                          {card.buttonText3}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Fixed Image */}
          <div className="block lg:relative">
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 lg:top-32 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-[85%] sm:w-[80%] lg:w-[75%] max-w-[500px] sm:max-w-[600px] lg:max-w-[900px] h-[35vh] sm:h-[45vh] lg:h-[calc(85vh-3rem)]">
              <div className="w-full h-full flex items-center">
                <div className="relative w-full h-full rounded-xl lg:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    key={activeIndex}
                    src={processCards[activeIndex].image}
                    alt={processCards[activeIndex].title}
                    className="w-full h-full object-cover transition-all duration-1000 ease-out"
                    style={{
                      transform: 'scale(1.05)',
                      animation: `imageAnim${activeIndex % 5} 1s ease-out`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <div className="absolute bottom-2 lg:bottom-8 left-2 lg:left-8 right-2 lg:right-8">
                    <div className="text-emerald-400 text-sm lg:text-xl font-bold mb-1 lg:mb-2">
                      {processCards[activeIndex].id}
                    </div>
                    <div className="text-white text-sm lg:text-2xl xl:text-3xl font-bold">
                      {processCards[activeIndex].title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes imageAnim0 {
          0% { opacity: 0; transform: scale(1.2) translateX(30px); filter: blur(6px); }
          100% { opacity: 1; transform: scale(1.05) translateX(0px); filter: blur(0px); }
        }
        @keyframes imageAnim1 {
          0% { opacity: 0; transform: scale(0.8) translateY(-30px) rotate(5deg); filter: brightness(0.5); }
          100% { opacity: 1; transform: scale(1.05) translateY(0px) rotate(0deg); filter: brightness(1); }
        }
        @keyframes imageAnim2 {
          0% { opacity: 0; transform: scale(1.1) translateX(-40px) skewX(10deg); filter: saturate(0); }
          100% { opacity: 1; transform: scale(1.05) translateX(0px) skewX(0deg); filter: saturate(1); }
        }
        @keyframes imageAnim3 {
          0% { opacity: 0; transform: scale(0.9) translateY(40px) rotateX(20deg); filter: contrast(0.3); }
          100% { opacity: 1; transform: scale(1.05) translateY(0px) rotateX(0deg); filter: contrast(1); }
        }
        @keyframes imageAnim4 {
          0% { opacity: 0; transform: scale(1.3) translate(-20px, 20px) rotateZ(-3deg); filter: hue-rotate(180deg); }
          100% { opacity: 1; transform: scale(1.05) translate(0px, 0px) rotateZ(0deg); filter: hue-rotate(0deg); }
        }
      `}</style>
    </div>
  );
}