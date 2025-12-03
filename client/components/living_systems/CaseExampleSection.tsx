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
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7.5 13.5 12.5 13.5 15.5 13.5C15.5 13.5 16 13.75 16 14.25C16 14.75 15.5 15 15.5 15C12.5 15 7.5 15 3.75 18.75C3.75 18.75 5.25 20.5 8 20.5C11.5 20.5 17 16 17 8Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Challenge
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  A large agricultural cooperative was facing declining soil health, reduced biodiversity, and increasing input costs from conventional farming practices. Climate change was creating additional stress on their operations, with unpredictable weather patterns affecting yields. The cooperative recognized the need to transition to more sustainable practices but lacked the expertise to implement regenerative agriculture at scale while maintaining profitability.
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
                  ORR conducted a comprehensive ecological assessment of the cooperative's land and operations. We delivered a detailed regeneration report that outlined soil restoration strategies, biodiversity enhancement plans, and carbon sequestration opportunities. The report included specific recommendations for cover cropping, rotational grazing, agroforestry integration, and a phased transition plan that would maintain cash flow while building long-term soil health and ecosystem resilience.
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
                  Following ORR's regenerative agriculture plan, the cooperative implemented soil-building practices that increased organic matter by 40% within two years. Input costs decreased by 30% as soil health improved and natural pest management systems developed. The cooperative now sequesters significant carbon, generating additional revenue through carbon credits, while biodiversity has increased dramatically with the return of beneficial insects and wildlife to their lands.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Image - Positioned absolutely */}
          <div className="absolute top-0 right-0 w-96 h-[620px] hidden lg:block -z-10">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-full flex items-center justify-center transform -skew-x-12">
              <Image 
                src="/parallelogram.jpg"
                alt="Regenerative farm with diverse crops and healthy soil"
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