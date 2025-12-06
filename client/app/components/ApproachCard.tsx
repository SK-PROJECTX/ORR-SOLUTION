'use client';
import React from "react";
import EditableText from "../../components/EditableText";

interface ApproachSectionProps {
  content?: any;
  onContentUpdate?: (data: any) => Promise<void>;
}

export default function ApproachSection({ content, onContentUpdate }: ApproachSectionProps) {
  const title = content?.title || "Supporting Copy";
  const paragraph1 = content?.paragraph_1 || "Just like a skilled general practitioner, we start from your story not our framework.";
  const paragraph2 = content?.paragraph_2 || "We're not a lone consultant — we're a central coordination layer with a distributed network behind it.";
  const paragraph3 = content?.paragraph_3 || "We fix what's slowing you down, strengthen systems around how your people actually work.";

  const handleTitleSave = async (newTitle: string) => {
    await onContentUpdate?.({ title: newTitle });
  };

  const handleParagraph1Save = async (newText: string) => {
    await onContentUpdate?.({ paragraph_1: newText });
  };

  const handleParagraph2Save = async (newText: string) => {
    await onContentUpdate?.({ paragraph_2: newText });
  };

  const handleParagraph3Save = async (newText: string) => {
    await onContentUpdate?.({ paragraph_3: newText });
  };

  return (
    <section className="relative w-full flex flex-col items-start pr-4 py-20 bg-cover bg-center">
      <EditableText
        content={title}
        onSave={handleTitleSave}
        tag="h2"
        className="text-white text-3xl md:text-5xl font-semibold text-center mb-10 font-poppins w-full flex justify-center py-7"
        placeholder="Enter section title..."
      />

      <div className="relative">
        <img
          src="/images/curl.svg"
          alt="glow"
          className="absolute -bottom-120 -right-30 w-[40rem] opacity-90 pointer-events-none select-none z-[-5]"
        />
      
        <div className="w-full max-w-7xl ml-0 bg border-t-[0.5rem] border-r-[0.5rem] border-b-[0.5rem] border-l-0 border-white/20 backdrop-blur-md bg-card z-1 rounded-tr-[91.25px] rounded-br-[91.25px] p-10 md:p-14 shadow-lg space-y-7">
          <div className="absolute right-[-28px] top-[20%] w-14 h-14 bg-[#0B2E4E] rounded-full flex items-center justify-center shadow-[0_0_25px_#3DFF7C]">
            <div className="w-9 h-9 bg-[#3DFF7C] rounded-full" />
          </div>
          <div className="absolute right-[-28px] bottom-[20%] w-14 h-14 bg-[#0B2E4E] rounded-full flex items-center justify-center shadow-[0_0_25px_#3DFF7C]">
            <div className="w-9 h-9 bg-[#3DFF7C] rounded-full" />
          </div>

          <EditableText
            content={paragraph1}
            onSave={handleParagraph1Save}
            tag="p"
            className="text-white/90 leading-relaxed text-[25px] font-poppins mb-10"
            placeholder="Enter first paragraph..."
            multiline
          />

          <div className="w-full h-[2px] bg-[#3DFF7C] mb-10" />

          <EditableText
            content={paragraph2}
            onSave={handleParagraph2Save}
            tag="p"
            className="text-white/90 leading-relaxed text-[25px] font-poppins mb-10"
            placeholder="Enter second paragraph..."
            multiline
          />

          <div className="w-full h-[2px] bg-[#3DFF7C] mb-10" />

          <EditableText
            content={paragraph3}
            onSave={handleParagraph3Save}
            tag="p"
            className="text-white/90 leading-relaxed text-[25px] font-poppins"
            placeholder="Enter third paragraph..."
            multiline
          />
        </div>
      </div>
    </section>
  );
}