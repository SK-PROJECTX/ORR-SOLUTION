import Image from 'next/image';

export default function ORRReportSection() {
  return (
    <section className="w-full text-white px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          What you Get: <span className="text-[#33FF99]">The ORR Report</span>
        </h2>
        <p className="text-gray-300 text-center mb-16 max-w-4xl mx-auto">
          After your first meeting, you receive a decision-ready ORR report designed to be immediately useful inside your organisation.
        </p>
        
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
                <span className="text-gray-200">explain your situation in your language,</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <span className="text-gray-200">highlights key issues and risks that affect your customers and teams</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <span className="text-gray-200">proposes quick fixes and longer-term improvements that respect your constraints</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <span className="text-gray-200">shows where advisory, digital systems/AI, or living-systems work will have most impact</span>
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
                <span className="text-gray-200">explain your situation in your language,</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <span className="text-gray-200">highlights key issues and risks that affect your customers and teams</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <span className="text-gray-200">proposes quick fixes and longer-term improvements that respect your constraints</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <span className="text-gray-200">shows where advisory, digital systems/AI, or living-systems work will have most impact</span>
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