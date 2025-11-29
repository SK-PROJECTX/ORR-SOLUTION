import Image from "next/image";

export default function CaseExampleSection() {
  return (
    <section className="relative z-10 py-16 bg-gradient-to-br from-slate-700 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
        <div className="relative">
          {/* Left Content */}
          <div className="max-w-3xl relative">
            <h2 className="text-5xl font-bold text-primary mb-6">
              Case Example
            </h2>
          
            {/* Three Cards */}
            <div className="bg-white p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Challenge Card */}
              <div className="text-left">
                <div className="w-12 h-12 mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4V6C15 7.1 14.1 8 13 8H11C9.9 8 9 7.1 9 6V4L3 7V9H21ZM3 10V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V10H3Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Challenge
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  A cooperative operating in a niche market faced decreased profits and pressure from stakeholders to reverse the trend. The board understood the severity of the issue and recognized that scientific studies were essential to inform their strategic decisions. However, lacking scientific expertise internally, the cooperative was spending hundreds of thousands of euros on external scientific study reports with limited guidance on how to action the findings.
                </p>
              </div>
              
              {/* Solution Card */}
              <div className="text-left">
                <div className="w-12 h-12 mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 21C9 22.1 9.9 23 11 23H13C14.1 23 15 22.1 15 21V20H9V21M12 2A7 7 0 0 0 5 9C5 11.38 6.19 13.47 8 14.74V17A1 1 0 0 0 9 18H15A1 1 0 0 0 16 17V14.74C17.81 13.47 19 11.38 19 9A7 7 0 0 0 12 2Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Solution
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  ORR was brought in to assess the situation and provide strategic direction. Within days, we delivered a detailed report outlining the ideal modus operandi. The report covered market pricing for scientific analysis, relevant regulatory frameworks to guide compliance, and how to strategically increase the value of their niche market through product specialization — including a roadmap for PDO (Protected Designation of Origin) or IGP (Protected Geographical Indication) applications.
                </p>
              </div>
              
              {/* Result Card */}
              <div className="text-left">
                <div className="w-12 h-12 mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L20.71 8.71L23 11V6H16Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Result
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Armed with ORR's strategic report, the cooperative immediately redirected their approach, significantly reducing unnecessary scientific study expenses while focusing resources on high-impact initiatives. The specialization strategy aimed them toward premium market segments, and the cooperative is now pursuing PDO certification to differentiate their product and command higher prices. Stakeholder confidence has been restored as profits begin to recover.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Image - Positioned absolutely */}
          <div className="absolute top-0 right-0 w-96 h-[620px] hidden lg:block -z-10">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-full flex items-center justify-center transform -skew-x-12">
              <Image 
                src="/parallelogram.jpg"
                alt="Business documents and reports on a desk"
                className="w-full h-full object-cover rounded-xl"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}