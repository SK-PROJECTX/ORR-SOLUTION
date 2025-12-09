"use client";

import { useState } from "react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  { key: "organ", title: "Organs", description: "Where your teams breathe and work.", position: "left" },
  { key: "nervous", title: "Nervous System", description: "Your signals seeking clarity.", position: "right" },
  { key: "circulatory", title: "Circulatory System", description: "Your lifeblood in motion.", position: "left" },
  { key: "immune", title: "Immune System", description: "Your unseen shields.", position: "right" },
  { key: "dna", title: "DNA", description: "The pattern beneath everything.", position: "left" },
  { key: "metabolism", title: "Metabolism", description: "The hum of everyday work.", position: "right" },
  { key: "senses", title: "Senses", description: "Your way of listening to the world.", position: "center" }
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
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" }
        }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: subtitleRef.current, start: "top 80%" }
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (card) {
          const direction = i % 2 === 0 ? -80 : 80;
          gsap.fromTo(card,
            { opacity: 0, x: direction, scale: 0.9 },
            { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%" }
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
        <h2 ref={titleRef} className="text-white text-4xl font-poppins sm:text-2xl md:text-3xl lg:text-5xl font-extrabold leading-snug">
          Businesses as a <span className="text-[#3DFF7C]">Living System </span>
        </h2>
        <p ref={subtitleRef} className="text-white font-poppins font-light text-[15px] sm:text-xl md:text-2xl  mt-2">
          Think of your organisation like a body
        </p>
      </div>

      {pairCards.map((pair, index) => (
        <div key={index} className="relative z-10 w-full max-w-none mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start mb-8 sm:mb-16 lg:mb-28 gap-6 lg:gap-4 lg:w-screen lg:left-1/2 lg:-translate-x-1/2 lg:px-0">
          {pair.map((card, cardIndex) => (
            <div ref={el => cardsRef.current[index * 2 + cardIndex] = el} key={cardIndex} className={`w-full max-w-xl lg:max-w-4xl bg-card rounded-2xl ${card.position === 'left' ? 'lg:rounded-tr-[4rem] lg:rounded-br-[4rem]' : 'lg:rounded-tl-[4rem] lg:rounded-bl-[4rem]'} overflow-hidden shadow-lg`}>
              <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[450px]">
                <Image src={card.image} alt={card.title} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="relative z-10 w-full flex justify-center">
        <div ref={el => cardsRef.current[6] = el} className="w-full max-w-4xl lg:max-w-6xl bg-card rounded-2xl lg:rounded-[4rem] overflow-hidden shadow-lg">
          <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[450px]">
            <Image src={cardData[6].image} alt={cardData[6].title} fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
