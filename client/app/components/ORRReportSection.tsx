export default function ORRReportSection() {
  return (
    <section className="w-full text-white px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          What you Get: <span className="text-[#33FF99]">The ORR Report</span>
        </h2>
        <p className="text-blue-400 text-center mb-16 underline cursor-pointer">
          After your first meeting, you receive a free ORR report that outlines the key issues in your business that could be hurting your conversions.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-[#16314B] p-6 rounded-2xl border border-[#1e4769]">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#33FF99] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">assess your situation in your language</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#33FF99] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">highlight key issues and risks that affect your customers and team</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#33FF99] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">propose quick fixes and longer-term improvements that respect your constraints</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#33FF99] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">shows where advisory, digital systems fit, or living systems work will have most impact</span>
              </li>
            </ul>
          </div>
          
          <div className="flex justify-center">
            <img src="/global networking 1.jpg" alt="ORR Report Meeting" className="rounded-2xl max-w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}