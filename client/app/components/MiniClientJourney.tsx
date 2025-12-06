'use client';
import EditableText from "../../components/EditableText";
import EditableImage from "../../components/EditableImage";

interface MiniClientJourneyProps {
  content?: any;
  onContentUpdate?: (data: any) => Promise<void>;
}

export default function MiniClientJourney({ content, onContentUpdate }: MiniClientJourneyProps) {
  const title = content?.title || "Message Strip";
  const message = content?.message || "Businesses thrive like living organisms when all their systems work together *around real human needs*.";

  const handleTitleSave = async (newTitle: string) => {
    await onContentUpdate?.({ title: newTitle });
  };

  const handleMessageSave = async (newMessage: string) => {
    await onContentUpdate?.({ message: newMessage });
  };

  return (
    <section className="w-full text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <EditableText
          content={title}
          onSave={handleTitleSave}
          tag="h2"
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10"
          placeholder="Enter section title..."
        />

        <div className="absolute top-16 sm:top-20 w-60 h-60 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#33FF99]/20 rounded-full blur-[100px] sm:blur-[150px]"></div>

        <div className="relative bg-card max-w-3xl w-full py-6 sm:py-8 md:py-10 px-6 sm:px-8 md:px-12 rounded-[20px] sm:rounded-[30px] shadow-xl border border-white/20">
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
        <div className="absolute left-4 xl:left-10 top-16 xl:top-20 w-20 xl:w-26 h-20 xl:h-26">
          <EditableImage
            src={content?.user_image_1 || "/images/user-1.jpg"}
            alt="User 1"
            onSave={async (newImageUrl) => {
              await onContentUpdate?.({ user_image_1: newImageUrl });
            }}
            className="rounded-full border-2 xl:border-4 border-[#33FF99] shadow-[0_0_20px_#33FF99] xl:shadow-[0_0_25px_#33FF99] object-cover"
            width={80}
            height={80}
          />
        </div>
        <div className="absolute left-2 xl:left-4 top-1/2 w-16 xl:w-20 h-16 xl:h-20">
          <EditableImage
            src={content?.user_image_2 || "/images/user-2.jpg"}
            alt="User 2"
            onSave={async (newImageUrl) => {
              await onContentUpdate?.({ user_image_2: newImageUrl });
            }}
            className="rounded-full border-2 border-[#33FF99] shadow-[0_0_20px_#33FF99] object-cover"
            width={64}
            height={64}
          />
        </div>
        <div className="absolute left-24 xl:left-30 bottom-20 xl:bottom-24 w-24 xl:w-30 h-24 xl:h-30">
          <EditableImage
            src={content?.user_image_3 || "/images/user-3.jpg"}
            alt="User 3"
            onSave={async (newImageUrl) => {
              await onContentUpdate?.({ user_image_3: newImageUrl });
            }}
            className="rounded-full border-2 xl:border-4 border-[#33FF99] shadow-[0_0_20px_#33FF99] xl:shadow-[0_0_25px_#33FF99] object-cover"
            width={96}
            height={96}
          />
        </div>
        <div className="absolute right-4 xl:right-10 top-20 xl:top-24 w-16 xl:w-20 h-16 xl:h-20">
          <EditableImage
            src={content?.user_image_4 || "/images/user-4.jpg"}
            alt="User 4"
            onSave={async (newImageUrl) => {
              await onContentUpdate?.({ user_image_4: newImageUrl });
            }}
            className="rounded-full border-2 xl:border-4 border-[#33FF99] shadow-[0_0_20px_#33FF99] xl:shadow-[0_0_25px_#33FF99] object-cover"
            width={64}
            height={64}
          />
        </div>
      </div>
    </section>
  );
}