"use client";

import Image from "next/image";
// import QuarterImg from "images/image.png"; // your uploaded image


export default function ResourcesBlogs() {
	return (
		<div className="min-h-screen text-foreground star">
			<Blog/>
			<AdminTips/>
			{/* <ProcessImprovementSection/> */}

		</div>
	);
}

 function Blog () {
  const cards = [1, 2, 3, 4];

  return (
    <section className="relative w-full px-6 md:px-16 py-20 star">
      {/* Title */}
      <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-6">
        Resources <span className="text-green-400">/ Blogs</span>
      </h2>

      {/* Subtitle */}
      <p className="text-center max-w-3xl mx-auto text-gray-300 text-[15px] mb-16 leading-relaxed">
        Lorem ipsm ticles, practical guides, and future-focused insights on digital transformation, AI,
        software development, and cloud innovation, written to help your business scale with confidence.
      </p>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {cards.map((item) => (
          <div
            key={item}
            className="rounded-4xl overflow-hidden bg-card border border-green-700/30 shadow-[0_0_15px_rgba(0,255,120,0.15)] hover:shadow-[0_0_25px_rgba(0,255,140,0.3)] transition-all duration-300"
          >
            {/* Image */}
			<div className="p-6">
			
            <img
              src="/images/image.png" /* Replace with real path */
              alt="Blog Visual"
              className="w-full h-52 object-cover rounded-2xl"
			  />
			  </div>

            {/* Card Content */}
            <div className="p-6">
              <span className="bg-green-400 text-[#002b17] text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                Article
              </span>

              <h3 className="text-white text-lg font-semibold leading-snug">
                Mobile Apps & PWAs for Maltese Insurers: Boost Engagement | Born Digital
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

 function AdminTips() {
  return (
    <section className="relative w-full px-6 md:px-16 py-20 star">
      {/* Title */}
      <h2 className="text-center text-3xl md:text-4xl font-semibold text-white mb-20">
        Admin <span className="text-green-400">Tips</span>
      </h2>

      {/* Container */}
      <div className="flex flex-col gap-24 max-w-5xl mx-auto">
        {/* Item 1 */}
        <div className="flex items-start gap-10">
          <h3 className="text-6xl md:text-7xl font-bold text-green-400">01</h3>

          <div className="flex flex-col gap-3 max-w-3xl">
            <h4 className="text-xl font-semibold text-white">Lorem ipsum</h4>
            <div className="w-24 h-[3px] bg-green-400 rounded-full"></div>
            <p className="text-gray-300 leading-relaxed text-[15px]">
              Lorem ipsum jgdu mplexity. From regulatory and sustainability
              frameworks to biotechnology and compliance consulting, our experts
              guide clients through evolving legal, scientific, and operational
              standards. Our approach combines deep technical insight with
              strategic foresight — ensuring every initiative is compliant,
              sustainable, and built for growth.
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-start gap-10">
          <h3 className="text-6xl md:text-7xl font-bold text-green-400">02</h3>

          <div className="flex flex-col gap-3 max-w-3xl">
            <h4 className="text-xl font-semibold text-white">Lorem ipsum</h4>
            <div className="w-24 h-[3px] bg-green-400 rounded-full"></div>
            <p className="text-gray-300 leading-relaxed text-[15px]">
              Lorem ipsum jgdu mplexity. From regulatory and sustainability
              frameworks to biotechnology and compliance consulting, our experts
              guide clients through evolving legal, scientific, and operational
              standards. Our experts help clients navigate complex requirements
              with confidence.
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex items-start gap-10">
          <h3 className="text-6xl md:text-7xl font-bold text-green-400">03</h3>

          <div className="flex flex-col gap-3 max-w-3xl">
            <h4 className="text-xl font-semibold text-white">Lorem ipsum</h4>
            <div className="w-24 h-[3px] bg-green-400 rounded-full"></div>
            <p className="text-gray-300 leading-relaxed text-[15px]">
              Lorem ipsum jgdu mplexity. From regulatory and sustainability
              frameworks to biotechnology and compliance consulting, our experts
              guide clients through evolving legal, scientific, and operational
              standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessImprovementSection() {
  return (
    <section className="relative w-full bg-[#0A1B2E] overflow-hidden py-[6rem] px-4">
      {/* Starry BG Pattern */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/stars.svg')] bg-cover opacity-40"></div>

      {/* Green Glow (top-left & bottom-right) */}
      <div className="absolute -top-20 -left-20 w-[25rem] h-[25rem] bg-[#40B25B]/40 blur-[120px] rounded-full hidden md:block"></div>
      <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-[#379898]/30 blur-[130px] rounded-full hidden md:block"></div>

      {/* Content Wrapper */}
      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-white text-[2rem] md:text-[2.3rem] font-semibold leading-tight">
          Process <span className="text-[#40B25B]">Improvement</span>
        </h2>

        <p className="mt-4 text-[#C8D2DF] text-sm md:text-base leading-relaxed px-2">
          Lorem ipsum jsgdu mplxety. From regulatory and sustainability frameworks 
          to biotechnology and compliance consulting, our experts guide clients through 
          evolving legal, scientific, and operational standards. Our approach combines 
          deep technical insight with strategic foresight — ensuring every initiative is 
          compliant, sustainable, and built for growth.
        </p>

        {/* White Card */}
        <div className="mt-10 mx-auto w-full max-w-[900px] bg-white rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.35)] p-4 md:p-6">
          {/* <Image
            src={QuarterImg}
            alt="Quarter Overview"
            className="w-full rounded-xl"
          /> */}
        </div>
      </div>
    </section>
  );
}

