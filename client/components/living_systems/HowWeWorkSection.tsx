export default function HowWeWorkSection() {
  return (
    <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          How we work:
        </h2>
        <h3 className="text-3xl font-bold text-[#47ff4c]">
          Observe . Design . Regenerate
        </h3>
        <p className="text-slate-200 text-lg mt-6 max-w-3xl mx-auto">
          Like your Ecosystem GP, we diagnose environmental challenges and prescribe 
          regenerative solutions tailored to your organization's ecological context.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 bg-card rounded-2xl">
        {/* Observe & Report */}
        <div className="p-8 border-r border-r-[#0ec277]">
          <h3 className="text-2xl font-bold text-white mb-2">
            Observe & Report
          </h3>
          <h4 className="text-slate-300 text-lg font-bold mb-6">
            (Ecological Assessment)
          </h4>
          
          <div className="space-y-4 text-slate-300">
            <p>
              We begin with a comprehensive ecological assessment to understand your 
              current environmental impact, resource flows, and regenerative potential. 
              During this phase, we analyze ecosystems, evaluate sustainability practices, 
              and identify opportunities for positive environmental impact.
            </p>
            
            <p>
              Following the assessment, we develop a detailed regeneration report that 
              maps current environmental footprint and identifies restoration opportunities. 
              We engage relevant specialists from our network — ecologists, regenerative 
              agriculture experts, or conservation biologists — to validate our findings 
              and recommendations.
            </p>
            
            <p>
              A review meeting allows us to present findings, address questions, 
              and refine recommendations based on your feedback. The final report 
              provides actionable insights into your ecological landscape and 
              proposes a clear regeneration roadmap: immediate actions for environmental 
              protection and long-term strategies for ecosystem restoration.
            </p>
            
            <p>
              Investment: You pay only for assessment time (€45/hour, pro-rata — 
              our assessments are efficient and focused) plus the report itself 
              (value depends on scope and complexity, capped at €220)
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Decide: Document or Partnership */}
          <div className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Decide: Document or Partnership
            </h3>
            
            <div className="space-y-4 text-slate-300">
              <p>
                Once you receive the regeneration report, you choose your path forward:
              </p>
              
              <p>
                - Use the report independently to guide your internal sustainability 
                efforts, or
              </p>
              
              <p>
                - Engage ORR for ongoing implementation support through a 
                tailored regeneration partnership
              </p>
            </div>
          </div>

          {/* Regenerate */}
          <div className="p-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Regenerate (For Clients Who Continue)
            </h3>
            
            <div className="space-y-4 text-slate-300">
              <p>
                For clients who choose ongoing partnership, we move into 
                implementation and regeneration. We execute the solutions 
                outlined in the report, build necessary ecological infrastructure, 
                and provide continuous monitoring to ensure your regenerative 
                systems create lasting positive environmental impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}