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
                alt="Operational systems dashboard showing process flows and metrics"
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
                  Growing businesses struggling with operational inefficiencies 
                  and manual processes
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Manufacturing companies seeking to optimize production 
                  workflows and quality control
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Service organizations looking to standardize processes 
                  and improve customer delivery
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Companies preparing for ISO certification or quality 
                  management system implementation
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Organizations facing supply chain disruptions or 
                  logistics challenges
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Businesses needing data-driven insights to improve 
                  operational decision-making
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
                Operational Excellence
              </h2>
              <p className="text-slate-200 text-lg">
                We don't just optimize — we build digital infrastructure to operationalize 
                efficiency:
              </p>
            </div>

            {/* Features box */}
            <div className="border-2 border-primary rounded-2xl px-6 py-12">
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Custom workflow management platforms with automated 
                  task routing
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Real-time operational dashboards with KPI monitoring 
                  and alerting
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Quality management systems with digital documentation 
                  and audit trails
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Supply chain visibility platforms with vendor integration
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Inventory management systems with predictive analytics
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Process automation tools with exception handling
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Performance analytics platforms with trend analysis
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">-</span>
                  Integrated reporting systems with automated data collection
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}