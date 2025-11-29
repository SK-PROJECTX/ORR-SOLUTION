export default function HowWeWorkSection() {
  return (
    <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          How we work:
        </h2>
        <h3 className="text-3xl font-bold text-[#47ff4c]">
          Listen . Solve.Optimize
        </h3>
        <p className="text-slate-200 text-lg mt-6 max-w-3xl mx-auto">
          Like your Business GP, we diagnose compliance challenges and prescribe strategic 
          solutions tailored to your organization's unique context.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 bg-card rounded-2xl">
        {/* Listen & Report */}
        <div className="p-8 border-r border-r-[#0ec277]">
          <h3 className="text-2xl font-bold text-white mb-2">
            Listen & Report
          </h3>
          <h4 className="text-slate-300 text-lg font-bold mb-6">
            (Initial Discovery)
          </h4>
          
          <div className="space-y-4 text-slate-300">
            <p>
              We start with a focused initial meeting to understand your 
              compliance challenges, regulatory environment, and strategic 
              objectives. During this session, we gather key information through 
              targeted questions and documentation review.
            </p>
            
            <p>
              Following the meeting, we build a preliminary report that maps out 
              the issues identified. We then engage relevant specialists from our 
              network — legal experts, scientific advisors, or industry consultants 
              — to deepen our analysis. The report is refined to include expert 
              insights and may pose clarifying questions for you to consider.
            </p>
            
            <p>
              A follow-up meeting allows us to listen again, address questions, 
              and update the report with your feedback. The final report 
              provides deep insights into your compliance landscape and 
              proposes a clear modus operandi: acute solutions for immediate 
              issues and strategies to optimize your digital systems for long-
              term compliance management.
            </p>
            
            <p>
              Investment: You pay only for meeting time (€45/hour, pro-rata — 
              our meetings are brief and focused) plus the report itself (value 
              depends on scope and complexity, capped at €220)
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
                Decide: Document or Partnership. Once you receive the report, you 
                choose your path forward:
              </p>
              
              <p>
                - Use the report independently to guide your internal compliance 
                efforts, or
              </p>
              
              <p>
                - Engage ORR for ongoing implementation support through a 
                tailored retainer arrangement
              </p>
            </div>
          </div>

          {/* Optimize */}
          <div className="p-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Optimize (For Clients Who Continue)
            </h3>
            
            <div className="space-y-4 text-slate-300">
              <p>
                For clients who choose ongoing partnership, we move into 
                implementation and optimization. We execute the solutions 
                outlined in the report, build necessary digital infrastructure, and 
                provide continuous monitoring to keep your compliance systems 
                current as regulations evolve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}