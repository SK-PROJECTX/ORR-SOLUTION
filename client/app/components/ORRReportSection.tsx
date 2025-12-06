'use client';
import Image from 'next/image';
import EditableText from "../../components/EditableText";

interface ORRReportSectionProps {
  content?: any;
  onContentUpdate?: (data: any) => Promise<void>;
}

export default function ORRReportSection({ content, onContentUpdate }: ORRReportSectionProps) {
  const title = content?.title || "What you Get: The ORR Report";
  const subtitle = content?.subtitle || "After your first meeting, you receive a decision-ready ORR report designed to be immediately useful inside your organisation.";
  const feature1 = content?.feature_1 || "explain your situation in your language,";
  const feature2 = content?.feature_2 || "highlights key issues and risks that affect your customers and teams";
  const feature3 = content?.feature_3 || "proposes quick fixes and longer-term improvements that respect your constraints";
  const feature4 = content?.feature_4 || "shows where advisory, digital systems/AI, or living-systems work will have most impact";

  const handleTitleSave = async (newTitle: string) => {
    await onContentUpdate?.({ title: newTitle });
  };

  const handleSubtitleSave = async (newSubtitle: string) => {
    await onContentUpdate?.({ subtitle: newSubtitle });
  };

  return (
    <section className="w-full text-white px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <EditableText
          content={title}
          onSave={handleTitleSave}
          tag="h2"
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
          placeholder="Enter section title..."
        />
        <EditableText
          content={subtitle}
          onSave={handleSubtitleSave}
          tag="p"
          className="text-gray-300 text-center mb-16 max-w-4xl mx-auto"
          placeholder="Enter section subtitle..."
          multiline
        />
        
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-[#1a3a52] to-[#0f2a3f] rounded-3xl relative overflow-hidden h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 z-10"></div>
            <Image 
              src="/network-visualization.jpg" 
              alt="Network Visualization" 
              fill
              className="object-cover" 
            />
          </div>
          
          <div className="bg-gradient-to-br from-[#1a3a52] to-[#0f2a3f] p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <EditableText
                  content={feature1}
                  onSave={async (text) => { await onContentUpdate?.({ feature_1: text }); }}
                  tag="span"
                  className="text-gray-200"
                  placeholder="Enter feature..."
                />
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <EditableText
                  content={feature2}
                  onSave={async (text) => { await onContentUpdate?.({ feature_2: text }); }}
                  tag="span"
                  className="text-gray-200"
                  placeholder="Enter feature..."
                />
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <EditableText
                  content={feature3}
                  onSave={async (text) => { await onContentUpdate?.({ feature_3: text }); }}
                  tag="span"
                  className="text-gray-200"
                  placeholder="Enter feature..."
                />
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <EditableText
                  content={feature4}
                  onSave={async (text) => { await onContentUpdate?.({ feature_4: text }); }}
                  tag="span"
                  className="text-gray-200"
                  placeholder="Enter feature..."
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#1a3a52] to-[#0f2a3f] p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <EditableText
                  content={feature1}
                  onSave={async (text) => { await onContentUpdate?.({ feature_1: text }); }}
                  tag="span"
                  className="text-gray-200"
                  placeholder="Enter feature..."
                />
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <EditableText
                  content={feature2}
                  onSave={async (text) => { await onContentUpdate?.({ feature_2: text }); }}
                  tag="span"
                  className="text-gray-200"
                  placeholder="Enter feature..."
                />
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <EditableText
                  content={feature3}
                  onSave={async (text) => { await onContentUpdate?.({ feature_3: text }); }}
                  tag="span"
                  className="text-gray-200"
                  placeholder="Enter feature..."
                />
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <EditableText
                  content={feature4}
                  onSave={async (text) => { await onContentUpdate?.({ feature_4: text }); }}
                  tag="span"
                  className="text-gray-200"
                  placeholder="Enter feature..."
                />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1a3a52] to-[#0f2a3f] rounded-3xl relative overflow-hidden h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 z-10"></div>
            <Image 
              src="/team-collaboration.jpg" 
              alt="Team Collaboration" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}