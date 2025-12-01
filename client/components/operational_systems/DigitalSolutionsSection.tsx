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
                  Self-employed professionals and freelancers 
                  ready to scale their operations with hiring full-time staff
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Solo practitioners who want to digitalize and systematize their 
                  business processes
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Independent consultants seeking to professionalize their 
                  operations through outsourced expertise
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Service providers who prefer to focus on their core work 
                  while delegating operational setup to specialists
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Entrepreneurs growing beyond one-person operations who need 
                  structured systems before scaling further
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Content and Features */}
          <div className="space-y-8">
            {/* Header */}
            <div className="py-18">
              <h2 className="text-4xl font-bold text-white mb-4">
                Digital Solutions <span className="text-primary">We implement</span>
              </h2>
              <p className="text-slate-200 text-lg mb-6">
                We don't just recommend off-the-shelf tools — we build and integrate 
                customized software solutions tailored to your unique workflows:
              </p>
            </div>

            {/* Features box */}
            <div className="border-2 border-primary rounded-2xl px-6 py-12">
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Bespoke CRM systems with custom admin and client panels
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Tailored document management and knowledge base platforms
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Custom communication dashboards and notification systems
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Client portals with role-based access and branded interfaces
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Integrated automation workflows connecting multiple systems
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  AI-powered solutions for process automation, data analysis, and 
                  intelligent decision support
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Custom reporting and analytics dashboards
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}