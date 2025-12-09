"use client";

import { useState } from "react";
import Image from "next/image";

const BODY_IMAGE = "/images/human-body.png";

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
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const pairCards = [];
  for (let i = 0; i < cardData.length - 1; i += 2) {
    pairCards.push([cardData[i], cardData[i + 1]]);
  }

  return (
    <section className="relative w-full px-4 py-16 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-24">
        <h2 className="text-white text-4xl lg:text-5xl font-extrabold">
          Businesses as a <span className="text-[#3DFF7C]">Living System</span>
        </h2>
        <p className="text-white mt-2">
          Think of your organisation like a body
        </p>
      </div>

      {/* Paired cards */}
      {pairCards.map((pair, index) => (
        <div
          key={index}
          className="w-full flex flex-col lg:flex-row justify-between items-center mb-24 gap-6"
        >
          {pair.map((card) => (
            <div
              key={card.key}
              onMouseEnter={() => setActiveKey(card.key)}
              onMouseLeave={() => setActiveKey(null)}
              className={`w-full max-w-4xl bg-card rounded-2xl overflow-hidden shadow-lg transition-all duration-300
                ${activeKey === card.key ? "ring-2 ring-[#3DFF7C]/50 scale-[1.02]" : ""}`}
            >
              {/* SAME IMAGE FOR ALL */}
              <div className="relative w-full h-[320px] lg:h-[420px]">
                <Image
                  src={BODY_IMAGE}
                  alt="Human body system metaphor"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-[#8EFFD0] text-2xl font-semibold">
                  {card.title}
                </h3>
                <p className="text-white font-light mt-1">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Center card */}
      <div className="flex justify-center">
        <div
          onMouseEnter={() => setActiveKey("senses")}
          onMouseLeave={() => setActiveKey(null)}
          className={`w-full max-w-6xl bg-card rounded-[3rem] overflow-hidden shadow-lg transition-all duration-300
            ${activeKey === "senses" ? "ring-2 ring-[#3DFF7C]/50 scale-[1.02]" : ""}`}
        >
          <div className="relative w-full h-[320px] lg:h-[420px]">
            <Image
              src={BODY_IMAGE}
              alt="Human body system metaphor"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6 text-center">
            <h3 className="text-[#8EFFD0] text-3xl font-semibold">Senses</h3>
            <p className="text-white font-light mt-1">
              Your way of listening to the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
