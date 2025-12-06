'use client';
import EditableText from "../../components/EditableText";

interface ORRRoleSectionProps {
  content?: any;
  onContentUpdate?: (data: any) => Promise<void>;
}

export default function ORRRoleSection({ content, onContentUpdate }: ORRRoleSectionProps) {
  const title = content?.title || "ORR's Role";
  const description = content?.description || "We act like specialist doctors for your business physiology - but we start from your symptoms and your priorities.";

  const handleTitleSave = async (newTitle: string) => {
    await onContentUpdate?.({ title: newTitle });
  };

  const handleDescriptionSave = async (newDescription: string) => {
    await onContentUpdate?.({ description: newDescription });
  };

  return (
    <section className="w-full h-[60vh] flex justify-center items-center text-white px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <EditableText
          content={title}
          onSave={handleTitleSave}
          tag="h2"
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          placeholder="Enter section title..."
        />
        <EditableText
          content={description}
          onSave={handleDescriptionSave}
          tag="p"
          className="text-gray-300 text-center text-2xl mb-16 max-w-4xl mx-auto"
          placeholder="Enter section description..."
          multiline
        />
      </div> 
    </section>
  );
}