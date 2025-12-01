import React from "react";

export default function PricingPage() {
  return (
    <div className="min-h-screen  text-white p-6 sm:p-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-green-500/30 rounded-full blur-[180px] absolute left-1/2 -translate-x-1/2 top-40" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between ">

        {/* Header */}
        <h1 className="text-3xl font-semibold text-[#22C55E] mb-6">Pricing page</h1>

        {/* Search Bar */}
        <div className="w-full max-w-md mx-auto mb-14">
          <div className="relative">
            <input
              placeholder="Search anything here..."
              className="w-full rounded-full py-3 pl-5 pr-12 bg-card border border-[#2b3538] text-sm focus:outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#22C55E] text-lg">🔍</span>
          </div>
        </div>
        </div>


        {/* Pricing Container */}
        <div className="bg-background border border-[#1d2223] rounded-3xl px-6 sm:px-10 py-20 relative shadow-xl">
          <div className="absolute -top-6 left-0 right-0 mx-auto w-full h-full rounded-[40px] bg-gradient-to-br from-green-600/20 to-blue-600/10 blur-[60px] -z-10" />

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Essentials */}
            <div className="border border-[#2b3134] rounded-2xl p-8 bg-background hover:border-[#22C55E] transition">
              <div className="inline-block bg-[#1a2e1f] text-[#22C55E] px-4 py-1 rounded-md text-sm font-medium mb-5">
                Essentials
              </div>
              <h2 className="text-4xl font-bold mb-2">€ 1,500<span className="text-xl font-medium">/mo</span></h2>
              <p className="text-gray-300 mb-8">Freelancers & small businesses</p>

              <button className="w-full bg-gradient-to-b from-[#22C55E] to-[#0FAF52] rounded-full py-3 text-black font-semibold shadow-[0_0_20px_#22C55E80]">
                Buy now
              </button>
            </div>

            {/* Growth */}
            <div className="border border-[#2b3134] rounded-2xl p-8 bg-background hover:border-[#22C55E] transition">
              <div className="inline-block bg-[#1d2f38] text-[#22C55E] px-4 py-1 rounded-md text-sm font-medium mb-5">
                Growth
              </div>
              <h2 className="text-4xl font-bold mb-2">€ 3,000<span className="text-xl font-medium">/mo</span></h2>
              <p className="text-gray-300 mb-8">SMEs scaling up</p>

              <button className="w-full bg-gradient-to-b from-[#22C55E] to-[#0FAF52] rounded-full py-3 text-black font-semibold shadow-[0_0_20px_#22C55E80]">
                Buy now
              </button>
            </div>

            {/* Enterprise */}
            <div className="border border-[#22C55E] rounded-2xl p-8 bg-background relative shadow-[0_0_25px_#22C55E60]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#22C55E] text-black px-4 py-1 rounded-md text-sm font-semibold">
                Best value
              </div>

              <div className="inline-block bg-[#1a2e1f] text-[#22C55E] px-4 py-1 rounded-md text-sm font-medium mb-5 mt-4">
                Enterprise
              </div>
              <h2 className="text-4xl font-bold mb-2">€ 6,000+<span className="text-xl font-medium">/mo</span></h2>
              <p className="text-gray-300 mb-8">Large or multi-site</p>

              <button className="w-full bg-gradient-to-b from-[#22C55E] to-[#0FAF52] rounded-full py-3 text-black font-semibold shadow-[0_0_20px_#22C55E80]">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
