import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditableText from "../../components/EditableText";
import { getRichTextContent } from "../../lib/rich-text-utils";
import SafeHTMLRenderer from "../../components/SafeHTMLRenderer";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface RichTextData {
  content: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
}

interface MiniClientJourneyProps {
  content?: any;
  onUpdate?: (data: any) => Promise<void>;
}

const DEFAULT_MESSAGES = [
  "Businesses thrive like living organisms when all their systems work together around real human needs. ORR keeps your “business physiology” in peak condition — aligning operations, communication, cash flow, compliance, data, and projects around the people you serve.",
  "Some matters do not need faster action first; they need better diagnosis.",
  "If the usual fixes were enough, you probably would not have been sent here. ORR helps organisations make sense of difficult situations before they become expensive, prolonged, or structurally embedded."
];

export default function MiniClientJourney({ content, onUpdate }: MiniClientJourneyProps) {
  const messageStrip = content;
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  
  const message1 = getRichTextContent(messageStrip?.message) || DEFAULT_MESSAGES[0];
  const activeMessages = [message1, DEFAULT_MESSAGES[1], DEFAULT_MESSAGES[2]];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeMessages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [activeMessages.length]);

  const handleMessageSave = async (newContent: string | RichTextData) => {
    const contentString = typeof newContent === 'string' ? newContent : newContent.content;
    await onUpdate?.({ message: contentString });
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
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden font-poppins bg-background text-foreground transition-colors duration-300">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-5 dark:opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10">
          <SafeHTMLRenderer data={messageStrip?.title} fallback="Message Strip" />
        </h2>

        <div className="absolute top-16 sm:top-20 w-60 h-60 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-primary/20 rounded-full blur-[100px] sm:blur-[150px]"></div>

        <div ref={cardRef} className="relative glass-panel max-w-3xl w-full py-6 sm:py-8 md:py-10 px-6 sm:px-8 md:px-12 rounded-[20px] sm:rounded-[30px] shadow-2xl border border-gray-200 dark:border-white/20 overflow-hidden min-h-[220px] sm:min-h-[260px] md:min-h-[300px] flex flex-col justify-center">
          <div className="text-primary text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 text-left absolute top-4 left-4 sm:top-6 sm:left-8">"</div>
          
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full px-2 sm:px-4 md:px-9"
              >
                <EditableText
                  content={activeMessages[currentIndex]}
                  onSave={handleMessageSave}
                  tag="p"
                  className="leading-relaxed text-base sm:text-lg md:text-xl lg:text-2xl"
                  placeholder="Enter message..."
                  multiline
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="text-primary text-2xl sm:text-3xl md:text-4xl mt-1 sm:mt-2 text-right absolute bottom-4 right-4 sm:bottom-6 sm:right-8">"</div>
        </div>

        <div className="flex gap-3 mt-8 sm:mt-10">
          {activeMessages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx 
                  ? "bg-primary w-8 shadow-[0_0_10px_rgba(14,194,119,0.5)]" 
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <img
          ref={el => { imagesRef.current[0] = el; }}
          src="https://res.cloudinary.com/depeqzb6z/image/upload/v1764395185/user-1_ey1yc5.jpg"
          alt="Client 1"
          className="absolute left-4 xl:left-10 top-16 xl:top-20 w-20 xl:w-26 h-20 xl:h-26 rounded-full border-2 xl:border-4 border-[#33FF99] shadow-[0_0_20px_#33FF99] xl:shadow-[0_0_25px_#33FF99] object-cover"
        />
        <img
          ref={el => { imagesRef.current[1] = el; }}
          src="https://res.cloudinary.com/depeqzb6z/image/upload/v1764395182/user-2_ha7lqr.jpg"
          alt="Client 2"
          className="absolute left-2 xl:left-4 top-1/2 w-16 xl:w-20 h-16 xl:h-20 rounded-full border-2 border-[#33FF99] shadow-[0_0_20px_#33FF99] object-cover"
        />
        <img
          ref={el => { imagesRef.current[2] = el; }}
          src="https://res.cloudinary.com/depeqzb6z/image/upload/v1764395180/user-3_uccvr9.jpg"
          alt="Client 3"
          className="absolute left-24 xl:left-30 bottom-20 xl:bottom-24 w-24 xl:w-30 h-24 xl:h-30 rounded-full border-2 xl:border-4 border-[#33FF99] shadow-[0_0_20px_#33FF99] xl:shadow-[0_0_25px_#33FF99] object-cover"
        />
        <img
          ref={el => { imagesRef.current[3] = el; }}
          src="https://res.cloudinary.com/depeqzb6z/image/upload/v1764395178/user-4_eysdru.jpg"
          alt="Client 4"
          className="absolute right-4 xl:right-10 top-20 xl:top-24 w-16 xl:w-20 h-16 xl:h-20 rounded-full border-2 xl:border-4 border-[#33FF99] shadow-[0_0_20px_#33FF99] xl:shadow-[0_0_25px_#33FF99] object-cover"
        />
        <img
          ref={el => { imagesRef.current[4] = el; }}
          src="https://res.cloudinary.com/depeqzb6z/image/upload/v1766108876/15527_mlemnz.jpg"
          alt="Client 5"
          className="absolute right-20 xl:right-28 top-1/3 w-10 xl:w-12 h-10 xl:h-12 rounded-full border-2 border-[#33FF99] shadow-[0_0_20px_#33FF99] object-cover"
        />
        <img
          ref={el => { imagesRef.current[5] = el; }}
          src="https://res.cloudinary.com/depeqzb6z/image/upload/v1766108876/28382_ctckph.jpg"
          alt="Client 6"
          className="absolute right-2 xl:right-4 bottom-20 xl:bottom-24 w-20 xl:w-24 h-20 xl:h-24 rounded-full border-2 xl:border-4 border-[#33FF99] shadow-[0_0_20px_#33FF99] xl:shadow-[0_0_25px_#33FF99] object-cover"
        />
      </div>
    </section>
  );
}
