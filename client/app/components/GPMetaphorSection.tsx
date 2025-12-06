"use client";

import React from "react";
import EditableText from "../../components/EditableText";
import EditableImage from "../../components/EditableImage";

interface GPMetaphorSectionProps {
  content?: any;
  onContentUpdate?: (data: any) => Promise<void>;
}

export default function GPMetaphorSection({ content, onContentUpdate }: GPMetaphorSectionProps) {
  const businessSystemData = content || {
    title: "Businesses as a Living System",
    subtitle: "Think of your organisation like a body",
    card_1_title: "Nervous System",
    card_1_description: "Communication, data flow, and decision-making pathways",
    card_1_image: "/images/nervous_system.png",
    card_2_title: "Circulatory System",
    card_2_description: "Cash flow, resource distribution, and value exchange",
    card_2_image: "/images/circulatory_system.png",
    card_3_title: "Immune System",
    card_3_description: "Risk management, compliance, and protective measures",
    card_3_image: "/images/immune_system.png"
  };

  const cards = [
    {
      id: 1,
      title: businessSystemData.card_1_title,
      description: businessSystemData.card_1_description,
      image: businessSystemData.card_1_image
    },
    {
      id: 2,
      title: businessSystemData.card_2_title,
      description: businessSystemData.card_2_description,
      image: businessSystemData.card_2_image
    },
    {
      id: 3,
      title: businessSystemData.card_3_title,
      description: businessSystemData.card_3_description,
      image: businessSystemData.card_3_image
    }
  ];

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover opacity-8 pointer-events-none" />

      <div className="relative z-10 text-center mb-16 sm:mb-20 lg:mb-36">
        <EditableText
          content={businessSystemData.title}
          onSave={async (newTitle) => {
            await onContentUpdate?.({ title: newTitle });
          }}
          tag="h2"
          className="text-white text-4xl font-poppins sm:text-2xl md:text-3xl lg:text-5xl font-extrabold leading-snug"
          placeholder="Enter section title..."
        />
        <EditableText
          content={businessSystemData.subtitle}
          onSave={async (newSubtitle) => {
            await onContentUpdate?.({ subtitle: newSubtitle });
          }}
          tag="p"
          className="text-white font-poppins font-light text-[15px] sm:text-xl md:text-2xl mt-2"
          placeholder="Enter section subtitle..."
        />
      </div>

      {/* Render cards in pairs */}
      {Array.from({ length: Math.ceil(cards.length / 2) }, (_, pairIndex) => {
        const startIndex = pairIndex * 2;
        const pairCards = cards.slice(startIndex, startIndex + 2);
        
        return (
          <div key={pairIndex} className="relative z-10 w-full max-w-none mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start mb-8 sm:mb-16 lg:mb-28 gap-6 lg:gap-4 lg:w-screen lg:left-1/2 lg:-translate-x-1/2 lg:px-0">
            {pairCards.map((card, index) => (
              <div key={card.id} className={`w-full max-w-xl lg:max-w-4xl bg-card ${index === 0 ? 'lg:rounded-tr-[4rem] lg:rounded-br-[4rem]' : 'lg:rounded-tl-[4rem] lg:rounded-bl-[4rem]'} overflow-hidden shadow-lg`}>
                <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[450px]">
                  <EditableImage
                    src={card.image}
                    alt={card.title}
                    onSave={async (newImageUrl) => {
                      const fieldName = `card_${card.id}_image`;
                      console.log(`Updating ${fieldName} with:`, newImageUrl);
                      await onContentUpdate?.({ [fieldName]: newImageUrl });
                    }}
                    className="object-cover"
                    fill
                  />
                </div>

                <div className="p-4 sm:p-6 lg:p-5 text-[#8EFFD0] text-[30px] font-poppins font-semibold sm:text-base lg:text-3xl tracking-wide">
                  <EditableText
                    content={card.title}
                    onSave={async (text) => {
                      const fieldName = `card_${card.id}_title`;
                      await onContentUpdate?.({ [fieldName]: text });
                    }}
                    tag="span"
                    className=""
                    placeholder="Enter card title..."
                  />
                </div>
                <div className="px-4 sm:px-6 lg:p-5 pb-4 sm:pb-6 lg:pb-5">
                  <EditableText
                    content={card.description}
                    onSave={async (text) => {
                      const fieldName = `card_${card.id}_description`;
                      await onContentUpdate?.({ [fieldName]: text });
                    }}
                    tag="p"
                    className="text-white text-sm font-poppins font-light sm:text-base lg:text-sm"
                    placeholder="Enter card description..."
                    multiline
                  />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}