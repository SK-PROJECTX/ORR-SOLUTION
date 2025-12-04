"use client";

import Image from "next/image";

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
  const pairCards = [];
  for (let i = 0; i < cardData.length - 1; i += 2) {
    pairCards.push([cardData[i], cardData[i + 1]]);
  }
  
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background pattern (optional) */}
      <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover opacity-8 pointer-events-none" />

      {/* Heading */}
      <div className="relative z-10 text-center mb-16 sm:mb-20 lg:mb-36">
        <h2 className="text-white text-4xl font-poppins sm:text-2xl md:text-3xl lg:text-5xl font-extrabold leading-snug">
          Businesses as a <span className="text-[#3DFF7C]">Living System </span>
        </h2>
        <p className="text-white font-poppins font-light text-[15px] sm:text-xl md:text-2xl  mt-2">
          Think of your organisation like a body
        </p>
      </div>

      {/* Paired cards */}
      {pairCards.map((pair, index) => (
        <div key={index} className="relative z-10 w-full max-w-none mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start mb-8 sm:mb-16 lg:mb-28 gap-6 lg:gap-4 lg:w-screen lg:left-1/2 lg:-translate-x-1/2 lg:px-0">
          {pair.map((card, cardIndex) => (
            <div key={cardIndex} className={`w-full max-w-xl lg:max-w-4xl bg-card rounded-2xl ${card.position === 'left' ? 'lg:rounded-tr-[4rem] lg:rounded-br-[4rem]' : 'lg:rounded-tl-[4rem] lg:rounded-bl-[4rem]'} overflow-hidden shadow-lg`}>
              <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[450px]">
                <Image src={card.image} alt={card.title} fill className="object-cover" />
              </div>
              <div className="p-4 sm:p-6 lg:p-5 text-[#8EFFD0] text-[30px] font-poppins font-semibold sm:text-base lg:text-3xl tracking-wide">{card.title}</div>
              <p className="px-4 sm:px-6 lg:px-5 pb-4 sm:pb-6 lg:pb-5 text-white text-sm font-poppins font-light sm:text-base lg:text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      ))}

      {/* Center card */}
      <div className="relative z-10 w-full flex justify-center">
        <div className="w-full max-w-4xl lg:max-w-6xl bg-card rounded-2xl lg:rounded-[4rem] overflow-hidden shadow-lg">
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