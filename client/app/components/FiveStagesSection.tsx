'use client';
import EditableText from "../../components/EditableText";

interface FiveStagesSectionProps {
  content?: any;
  onContentUpdate?: (data: any) => Promise<void>;
}

export default function FiveStagesSection({ content, onContentUpdate }: FiveStagesSectionProps) {
  const title = content?.title || "How we work: Five Stages";
  const subtitle = content?.subtitle || "Every stage is built around you – your pace, your risk appetite, your resources";

  const handleTitleSave = async (newTitle: string) => {
    await onContentUpdate?.({ title: newTitle });
  };

  const handleSubtitleSave = async (newSubtitle: string) => {
    await onContentUpdate?.({ subtitle: newSubtitle });
  };
  
  const stages = [
    {
      id: 1,
      title: content?.stage_1_title || "Discover - We listen",
      description: content?.stage_1_description || "You tell us what's happening. We map your context, pressures, and goals – and what 'good' looks like for you.",
      order: 1
    },
    {
      id: 2,
      title: content?.stage_2_title || "Diagnose - We find root causes",
      description: content?.stage_2_description || "SOPs, workflows, portals, dashboards, and AI-assisted tools designed around your team's habits, constraints and growth plans.",
      order: 2
    },
    {
      id: 3,
      title: content?.stage_3_title || "Design - We shape solution with you",
      description: content?.stage_3_description || "We propose clear, actionable structures that fit your reality: advisory, roadmaps, systems, AI helpers, and, where relevant, living systems projects.",
      order: 3
    },
    {
      id: 4,
      title: content?.stage_4_title || "Deploy - We put them to work together",
      description: content?.stage_4_description || "We implement with minimal disruption, adapting to how your people work today while preparing them for tomorrow.",
      order: 4
    },
    {
      id: 5,
      title: content?.stage_5_title || "Grow - We optimise over time",
      description: content?.stage_5_description || "We monitor, refine, and help you scale intelligently, keeping a feedback loop open with you and your stakeholders.",
      order: 5
    }
  ];

  return (
    <section className="w-full text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <EditableText
          content={title}
          onSave={handleTitleSave}
          tag="h2"
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center"
          placeholder="Enter section title..."
        />
        
        <EditableText
          content={subtitle}
          onSave={handleSubtitleSave}
          tag="p"
          className="text-gray-300 text-center mb-12 sm:mb-16"
          placeholder="Enter section subtitle..."
          multiline
        />
        
        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-[#33FF99]"></div>
          
          {stages.map((stage, index) => (
            <div key={stage.id} className="relative flex items-start mb-8 sm:mb-12 last:mb-0">
              <div className="relative z-10 w-8 sm:w-12 h-8 sm:h-12 bg-[#33FF99] rounded-full flex items-center justify-center mr-6 sm:mr-8 flex-shrink-0">
                <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full"></div>
              </div>
              
              <div className="flex-1 pt-1">
                <EditableText
                  content={stage.title}
                  onSave={async (text) => {
                    const fieldName = `stage_${stage.id}_title`;
                    await onContentUpdate?.({ [fieldName]: text });
                  }}
                  tag="h3"
                  className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3"
                  placeholder="Enter stage title..."
                />
                <EditableText
                  content={stage.description}
                  onSave={async (text) => {
                    const fieldName = `stage_${stage.id}_description`;
                    await onContentUpdate?.({ [fieldName]: text });
                  }}
                  tag="p"
                  className="text-gray-300 text-sm sm:text-base leading-relaxed"
                  placeholder="Enter stage description..."
                  multiline
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}