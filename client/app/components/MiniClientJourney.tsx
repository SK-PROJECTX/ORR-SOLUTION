'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditableText from "../../components/EditableText";

gsap.registerPlugin(ScrollTrigger);

interface MiniClientJourneyProps {
  content?: any;
  onContentUpdate?: (data: any) => Promise<void>;
}

export default function MiniClientJourney({ content, onContentUpdate }: MiniClientJourneyProps) {
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  const message = content?.message || 'Businesses thrive like living organisms when all their systems work together *around real human needs*. ORR keeps your "business physiology" in peak condition — aligning operations, communication, cash flow, compliance, data, and projects around the people you serve';

  const handleMessageSave = async (newMessage: string) => {
    await onContentUpdate?.({ message: newMessage });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" }
        }
      );

      gsap.fromTo(cardRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 80%" }
        }
      );

      imagesRef.current.forEach((img, i) => {
        if (img) {
          gsap.fromTo(img,
            { opacity: 0, scale: 0 },
            {
              opacity: 1, scale: 1, duration: 0.6, delay: 0.5 + i * 0.1, ease: "back.out(1.7)",
              scrollTrigger: { trigger: cardRef.current, start: "top 70%" }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10">
          Message <span className="text-[#33FF99]">Strip</span>
        </h2>

        <div className="absolute top-16 sm:top-20 w-60 h-60 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#33FF99]/20 rounded-full blur-[100px] sm:blur-[150px]"></div>

        <div ref={cardRef} className="relative bg-card max-w-3xl w-full py-6 sm:py-8 md:py-10 px-6 sm:px-8 md:px-12 rounded-[20px] sm:rounded-[30px] shadow-xl border border-white/20">
          <div className="text-[#33FF99] text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-left">"</div>
          <EditableText
            content={message}
            onSave={handleMessageSave}
            tag="p"
            className="text-[#ffffff] leading-relaxed text-base sm:text-lg md:text-xl lg:text-2xl px-2 sm:px-4 md:px-9"
            placeholder="Enter message..."
            multiline
          />
          <div className="text-[#33FF99] text-2xl sm:text-3xl md:text-4xl mt-3 sm:mt-4 text-right">"</div>
        </div>

        <div className="flex gap-2 mt-4 sm:mt-6">
          <span className="w-2 h-2 rounded-full bg-[#33FF99]"></span>
          <span className="w-2 h-2 rounded-full bg-[#33FF99]/40"></span>
          <span className="w-2 h-2 rounded-full bg-[#33FF99]/40"></span>
        </div>
      </div>

      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <img
          ref={el => { imagesRef.current[0] = el; }}
          src="https://res.cloudinary.com/depeqzb6z/image/upload/v1764395185/user-1_ey1yc5.jpg"
          className="absolute left-4 xl:left-10 top-16 xl:top-20 w-20 xl:w-26 h-20 xl:h-26 rounded-full border-2 xl:border-4 border-[#33FF99] shadow-[0_0_20px_#33FF99] xl:shadow-[0_0_25px_#33FF99] object-cover"
        />
        <img
          ref={el => { imagesRef.current[1] = el; }}
          src="https://res.cloudinary.com/depeqzb6z/image/upload/v1764395182/user-2_ha7lqr.jpg"
          className="absolute left-2 xl:left-4 top-1/2 w-16 xl:w-20 h-16 xl:h-20 rounded-full border-2 border-[#33FF99] shadow-[0_0_20px_#33FF99] object-cover"
        />
        <img
          ref={el => { imagesRef.current[2] = el; }}
          src="https://res.cloudinary.com/depeqzb6z/image/upload/v1764395180/user-3_uccvr9.jpg"
          className="absolute left-24 xl:left-30 bottom-20 xl:bottom-24 w-24 xl:w-30 h-24 xl:h-30 rounded-full border-2 xl:border-4 border-[#33FF99] shadow-[0_0_20px_#33FF99] xl:shadow-[0_0_25px_#33FF99] object-cover"
        />
        <img
          ref={el => { imagesRef.current[3] = el; }}
          src="https://res.cloudinary.com/depeqzb6z/image/upload/v1764395178/user-4_eysdru.jpg"
          className="absolute right-4 xl:right-10 top-20 xl:top-24 w-16 xl:w-20 h-16 xl:h-20 rounded-full border-2 xl:border-4 border-[#33FF99] shadow-[0_0_20px_#33FF99] xl:shadow-[0_0_25px_#33FF99] object-cover"
        />
        <img
          ref={el => { imagesRef.current[4] = el; }}
          src="https://res.cloudinary.com/depeqzb6z/image/upload/v1766108876/15527_mlemnz.jpg"
          className="absolute right-20 xl:right-28 top-1/3 w-10 xl:w-12 h-10 xl:h-12 rounded-full border-2 border-[#33FF99] shadow-[0_0_20px_#33FF99] object-cover"
        />
        <img
          ref={el => { imagesRef.current[5] = el; }}
          src="https://res.cloudinary.com/depeqzb6z/image/upload/v1766108876/28382_ctckph.jpg"
          className="absolute right-2 xl:right-4 bottom-20 xl:bottom-24 w-20 xl:w-24 h-20 xl:h-24 rounded-full border-2 xl:border-4 border-[#33FF99] shadow-[0_0_20px_#33FF99] xl:shadow-[0_0_25px_#33FF99] object-cover"
        />
      </div>
    </section>
  );
}
