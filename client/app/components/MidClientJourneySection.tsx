export default function MidClientJourneySection() {
  return (
    <section className="w-full py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 star opacity-20" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white">
          Mid Client <span className="text-primary">Journey</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<<<<<<< HEAD
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-primary rounded-3xl h-60 w-full"></div>
          ))}
=======
          <div className="bg-primary rounded-3xl p-6 h-auto">
            <h3 className="text-xl font-bold text-white mb-4">Step 1:</h3>
            <h4 className="text-lg font-semibold text-white mb-3">First Meeting</h4>
            <p className="text-white text-sm mb-4">You share your challenges; we listen, ask focused questions, and map your context and priorities.</p>
            <p className="text-white text-xs">Billed at €40/hour pro-rata</p>
          </div>
          
          <div className="bg-primary rounded-3xl p-6 h-auto">
            <h3 className="text-xl font-bold text-white mb-4">Step 2:</h3>
            <h4 className="text-lg font-semibold text-white mb-3">Report Delivery</h4>
            <p className="text-white text-sm mb-4">You receive your decision-ready ORR report with root causes, quick fixes, and longer-term recommendations tailored to your organisation.</p>
            <p className="text-white text-xs">Report fee based on complexity, capped at €220</p>
          </div>
          
          <div className="bg-primary rounded-3xl p-6 h-auto">
            <h3 className="text-xl font-bold text-white mb-4">Step 3:</h3>
            <h4 className="text-lg font-semibold text-white mb-3">Decision Point</h4>
            <p className="text-white text-sm">You decide how to use it:</p>
            <ul className="text-white text-sm mt-2 space-y-1">
              <li>- drive change internally,</li>
              <li>- brief other partners, or</li>
              <li>- continue with ORR to co-implement the solutions.</li>
            </ul>
          </div>
          
          <div className="bg-primary rounded-3xl p-6 h-auto">
            <h3 className="text-xl font-bold text-white mb-4">Step 4:</h3>
            <h4 className="text-lg font-semibold text-white mb-3">Ongoing Partnership</h4>
            <p className="text-white text-sm">If you continue, we deploy solutions, monitor progress, and optimise as you grow — through a tailored retainer package aligned with your budget, pace, and customer needs.</p>
          </div>
>>>>>>> a1e69419bdc7ac4340eadff04d4cd044672200a5
        </div>
      </div>
    </section>
  );
}