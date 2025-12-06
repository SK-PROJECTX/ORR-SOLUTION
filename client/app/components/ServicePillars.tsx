'use client';
import React from "react";
import EditableText from "../../components/EditableText";
import EditableImage from "../../components/EditableImage";

interface ServicePillarProps {
  content?: any;
  onContentUpdate?: (data: any) => Promise<void>;
}

export default function ServicePillar({ content, onContentUpdate }: ServicePillarProps) {
  const homepageData = content || {};

  const handleTitleSave = async (newTitle: string) => {
    await onContentUpdate?.({ services_title: newTitle });
  };

  const handleSubtitleSave = async (newSubtitle: string) => {
    await onContentUpdate?.({ services_subtitle: newSubtitle });
  };
  return (
    <section className="relative w-full flex flex-col items-end py-12 sm:py-16 lg:py-20 bg-cover bg-center overflow-hidden">
      {/* Title */}
      <EditableText
        content={homepageData.services_title}
        onSave={handleTitleSave}
        tag="h2"
        className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins font-extrabold text-center mb-4 sm:mb-10 lg:mb-14 font-poppins font-bold w-full"
        placeholder="Enter services title..."
      />

      <EditableText
        content={homepageData.services_subtitle}
        onSave={handleSubtitleSave}
        tag="p"
        className="text-center text-white font-poppins font-light mb-12 sm:mb-16 lg:mb-20 w-full"
        placeholder="Enter services subtitle..."
        multiline
      />

      <div className="relative w-full max-w-7xl mr-0">
        {/* Glow Image - Hidden on mobile */}
        <div className="hidden lg:block absolute -top-32 xl:-top-45 -left-8 xl:-left-12 w-[35rem] xl:w-[45rem] opacity-90 pointer-events-none select-none z-[-5]">
          <EditableImage
            src={homepageData.services_glow_image}
            alt="glow"
            onSave={async (newImageUrl) => {
              await onContentUpdate?.({ services_glow_image: newImageUrl });
            }}
            className="w-full h-auto"
            width={560}
            height={400}
          />
        </div>

        {/* CARD */}
        <div className="relative w-full bg-card backdrop-blur-md border border-[#40B25B] lg:border-t-[0.5rem] lg:border-l-[0.5rem] lg:border-b-[0.5rem] lg:border-r-0 rounded-2xl lg:rounded-tl-[91.25px] lg:rounded-bl-[91.25px] lg:rounded-tr-none lg:rounded-br-none ml-0 p-10 sm:p-8 md:p-10 lg:p-12 xl:p-16 shadow-lg">
          {/* CONTENT LAYOUT: RESPONSIVE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-[60px_1fr] gap-6 md:gap-8">

            {/* LEFT COLUMN — BULLETS + VERTICAL LINE (Hidden on mobile) */}
            <div className="hidden md:flex relative flex-col items-center">
              {/* Vertical line connecting bullet 1 → bullet 3 */}
              <div className="absolute top-[32px] bottom-[52px] w-[4px] mb-20 bg-[#05CC79]"></div>

              {/* Bullet 1 */}
              <div className="relative z-10 w-8 lg:w-10 h-8 lg:h-10 bg-[#1F6F75] rounded-full flex items-center justify-center shadow-[0_0_20px_#3DFF7C] mb-10 lg:mb-12">
                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-[#05CC79] rounded-full"></div>
              </div>

              {/* Bullet 2 */}
              <div className="relative z-10 w-8 lg:w-10 h-8 lg:h-10 bg-[#1F6F75] rounded-full flex items-center justify-center shadow-[0_0_20px_#3DFF7C] mt-42 lg:mb-12">
                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-[#05CC79] rounded-full"></div>
              </div>

              {/* Bullet 3 */}
              <div className="relative z-10 w-8 lg:w-10 h-8 lg:h-10 bg-[#1F6F75] rounded-full flex items-center justify-center shadow-[0_0_20px_#3DFF7C] mt-36">
                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-[#05CC79] rounded-full"></div>
              </div>
            </div>

            {/* RIGHT COLUMN — TEXT CONTENT */}
            <div className="space-y-8 sm:space-y-10 lg:space-y-14">
              {/* Item 1 */}
              <div className="relative">
                {/* Mobile bullet */}
                <div className="md:hidden w-6 h-6 bg-[#3DFF7C] rounded-full mb-3"></div>
                <EditableText
                  content={homepageData.service_1_title}
                  onSave={async (text) => { 
                    await onContentUpdate?.({ service_1_title: text }); 
                  }}
                  tag="h3"
                  className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-[26px] mb-2 sm:mb-3 font-poppins"
                  placeholder="Enter service title..."
                />
                <EditableText
                  content={homepageData.service_1_description}
                  onSave={async (text) => { 
                    await onContentUpdate?.({ service_1_description: text }); 
                  }}
                  tag="p"
                  className="text-white/80 text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed font-poppins"
                  placeholder="Enter service description..."
                  multiline
                />
                <button className="mt-10 bg-gradient-to-r from-[#28B026] to-[#03F6CA] text-[#0C294D] p-4 font-poppins font-semibold rounded-lg cursor-pointer">
                  <EditableText
                    content={homepageData.service_1_button}
                    onSave={async (text) => { 
                      await onContentUpdate?.({ service_1_button: text }); 
                    }}
                    tag="span"
                    className=""
                    placeholder="Enter button text..."
                  />
                </button>
              </div>

              {/* Item 2 */}
              <div className="relative">
                {/* Mobile bullet */}
                <div className="md:hidden w-6 h-6 bg-[#3DFF7C] rounded-full mb-3"></div>
                <EditableText
                  content={homepageData.service_2_title}
                  onSave={async (text) => { 
                    await onContentUpdate?.({ service_2_title: text }); 
                  }}
                  tag="h3"
                  className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-[26px] mb-2 sm:mb-3 font-poppins"
                  placeholder="Enter service title..."
                />
                <EditableText
                  content={homepageData.service_2_description}
                  onSave={async (text) => { 
                    await onContentUpdate?.({ service_2_description: text }); 
                  }}
                  tag="p"
                  className="text-white/80 text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed font-poppins"
                  placeholder="Enter service description..."
                  multiline
                />
                <button className="mt-10 bg-gradient-to-r from-[#28B026] to-[#03F6CA] text-[#0C294D] p-4 font-poppins font-semibold rounded-lg cursor-pointer">
                  <EditableText
                    content={homepageData.service_2_button}
                    onSave={async (text) => { 
                      await onContentUpdate?.({ service_2_button: text }); 
                    }}
                    tag="span"
                    className=""
                    placeholder="Enter button text..."
                  />
                </button>
              </div>

              {/* Item 3 */}
              <div className="relative">
                {/* Mobile bullet */}
                <div className="md:hidden w-6 h-6 bg-[#3DFF7C] rounded-full mb-3"></div>
                <EditableText
                  content={homepageData.service_3_title}
                  onSave={async (text) => { 
                    await onContentUpdate?.({ service_3_title: text }); 
                  }}
                  tag="h3"
                  className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-[26px] mb-2 sm:mb-3 font-poppins"
                  placeholder="Enter service title..."
                />
                <EditableText
                  content={homepageData.service_3_description}
                  onSave={async (text) => { 
                    await onContentUpdate?.({ service_3_description: text }); 
                  }}
                  tag="p"
                  className="text-white/80 text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed font-poppins"
                  placeholder="Enter service description..."
                  multiline
                />
                <button className="mt-10 bg-gradient-to-r from-[#28B026] to-[#03F6CA] text-[#0C294D] p-4 font-poppins font-semibold rounded-lg cursor-pointer">
                  <EditableText
                    content={homepageData.service_3_button}
                    onSave={async (text) => { 
                      await onContentUpdate?.({ service_3_button: text }); 
                    }}
                    tag="span"
                    className=""
                    placeholder="Enter button text..."
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}