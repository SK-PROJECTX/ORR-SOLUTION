import Image from "next/image";

export default function DigitalSolutionsSection() {
  return (
    <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Image and Who is this for */}
          <div className="space-y-8">
            {/* Image */}
            <div className="rounded-2xl h-80 flex items-center justify-center">
              <Image 
                src="/network-visualization.jpg"
                alt="Ecosystem monitoring dashboard showing biodiversity and regeneration metrics"
                className="w-full h-full object-cover rounded-2xl"
                width={800}
                height={600}
              />
            </div>
            {/* Who is this for? */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Who is <span className="text-primary">this for?</span>
              </h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Agricultural businesses transitioning to regenerative 
                  and sustainable farming practices
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Companies seeking to implement circular economy 
                  principles and eliminate waste
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Organizations committed to biodiversity conservation 
                  and ecosystem restoration
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Businesses looking to achieve carbon neutrality 
                  through natural climate solutions
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Companies wanting to build resilient supply chains 
                  based on regenerative practices
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Organizations seeking to create positive environmental 
                  impact while building economic value
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Content and Features */}
          <div className="space-y-8">
            {/* Header */}
            <div className="py-18">
              <h2 className="text-4xl font-bold text-white mb-4">
                Digital Solutions for
              </h2>
              <h2 className="text-4xl font-bold text-primary mb-6">
                Regenerative Systems
              </h2>
              <p className="text-slate-200 text-lg">
                We don't just advise — we build digital infrastructure to operationalize 
                regeneration:
              </p>
            </div>

            {/* Features box */}
            <div className="border-2 border-primary rounded-2xl px-6 py-12">
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Ecosystem monitoring platforms with biodiversity tracking 
                  and health indicators
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Carbon sequestration measurement and verification systems 
                  with MRV protocols
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Regenerative agriculture management platforms with 
                  soil health monitoring
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Circular economy tracking systems with material flow analysis
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Biodiversity impact assessment tools with species monitoring
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Sustainable supply chain traceability platforms
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Natural capital accounting and valuation systems
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Regenerative impact reporting and certification workflows
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}