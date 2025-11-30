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
                alt="Network visualization showing connected nodes and data flows"
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
                  Self-employed professionals and consultants who need expert 
                  compliance guidance without hiring full-time staff
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Growing businesses entering regulated industries or expanding 
                  into new markets
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Startups in life sciences and biotech navigating complex 
                  regulatory pathways
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Professional service firms managing client compliance 
                  obligations
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Companies facing regulatory changes that impact their 
                  operations
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Businesses implementing ESG strategies to meet investor 
                  and stakeholder expectations
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
                Compliance Management
              </h2>
              <p className="text-slate-200 text-lg">
                We don't just advise — we build digital infrastructure to operationalize 
                compliance:
              </p>
            </div>

            {/* Features box */}
            <div className="border-2 border-primary rounded-2xl px-6 py-12">
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Custom compliance management platforms with automated 
                  tracking
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Regulatory document repositories with version control and access 
                  management
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  ESG data collection and reporting dashboards
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Audit trail systems with timestamped documentation
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Training management systems with certification tracking
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  AI-powered regulatory monitoring and change detection
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Integrated risk assessment and mitigation tracking tools
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Automated compliance reporting and submission workflows
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}