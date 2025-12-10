"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  { title: "Organ", description: "Your departments and teams", image: "/images/organ.png", position: "left" },
  { title: "Nervous System", description: "Your communication channels", image: "/images/nervous-system.png", position: "right" },
  { title: "Circulatory System", description: "Your cashflow and resources", image: "/images/circulatory-system.png", position: "left" },
  { title: "Immune System", description: "Your risk management and compliance", image: "/images/immune-system.png", position: "right" },
  { title: "DNA", description: "Your values, SOPs and Cultures", image: "/images/dna.png", position: "left" },
  { title: "Metabolism", description: "Your day-to-day operations", image: "/images/metabolism.png", position: "right" },
  { title: "Senses", description: "Your awareness and feedback loops", image: "/images/senses.png", position: "center" }
];

export default function GPMetaphorSection() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: subtitleRef.current, start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse" }
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (card) {
          const direction = i % 2 === 0 ? -80 : 80;
          gsap.fromTo(card,
            { opacity: 0, x: direction, scale: 0.9 },
            { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%", end: "bottom 15%", toggleActions: "play none none reverse" }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const pairCards = [];
  for (let i = 0; i < cardData.length - 1; i += 2) {
    pairCards.push([cardData[i], cardData[i + 1]]);
  }
  
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover opacity-8 pointer-events-none" />

      <div className="relative z-10 text-center mb-16 sm:mb-20 lg:mb-36">
        <h2 ref={titleRef} className="text-white text-4xl font-poppins sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug">
          Businesses as a <span className="text-[#3DFF7C]">Living System </span>
        </h2>
        <p ref={subtitleRef} className="text-white font-poppins font-light text-base sm:text-lg md:text-xl lg:text-2xl mt-2">
          Think of your organisation like a body
        </p>
      </div>

      {/* {pairCards.map((pair, index) => (
        <div key={index} className="relative z-10 w-full max-w-none mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start mb-8 sm:mb-16 lg:mb-28 gap-6 lg:gap-4 lg:w-screen lg:left-1/2 lg:-translate-x-1/2 lg:px-0">
          {pair.map((card, cardIndex) => (
            <div ref={el => { if (el) cardsRef.current[index * 2 + cardIndex] = el; }} key={cardIndex} className={`w-full max-w-xl lg:max-w-4xl bg-card rounded-2xl ${card.position === 'left' ? 'lg:rounded-tr-[4rem] lg:rounded-br-[4rem]' : 'lg:rounded-tl-[4rem] lg:rounded-bl-[4rem]'} overflow-hidden shadow-lg`}>
              <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[450px]">
                <Image src={card.image} alt={card.title} fill className="object-cover" />
              </div>
              <div className="p-4 sm:p-6 lg:p-5 text-[#8EFFD0] text-[30px] font-poppins font-semibold sm:text-base lg:text-3xl tracking-wide">{card.title}</div>
              <p className="px-4 sm:px-6 lg:px-5 pb-4 sm:pb-6 lg:pb-5 text-white text-sm font-poppins font-light sm:text-base lg:text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      ))} */}

      <div className="relative z-10 w-full flex justify-center">
        <div ref={el => { if (el) cardsRef.current[6] = el; }} className="w-full max-w-4xl lg:max-w-6xl bg-card rounded-2xl lg:rounded-[4rem] overflow-hidden shadow-lg">
          <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[450px]">
            <Image src={cardData[6].image} alt={cardData[6].title} fill className="object-cover" />
          </div>
          <div className="p-4 sm:p-6 lg:p-5 text-[#8EFFD0] text-[30px] font-poppins font-semibold sm:text-base lg:text-3xl tracking-wide">{cardData[6].title}</div>
          <div className="px-4 sm:px-6 lg:px-5 pb-4 sm:pb-6 lg:pb-5 text-white text-sm font-poppins font-light sm:text-base lg:text-sm">{cardData[6].description}</div>
        </div>
      </div>
    </section>
  );
}