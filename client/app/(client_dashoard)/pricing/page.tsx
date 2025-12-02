import React from "react";
import Image from "next/image"

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
        <div className="absolute inset-0 star opacity-20" />
              
              <div className="relative z-10 max-w-6xl mx-auto">
                <div className="bg-[#33FF99]/50 backdrop-blur-xl ml-10 rounded-[60px] pt-2 pr-0 pb-1 pl-0 transform -rotate-2 -translate-x-8 -translate-y-4">
                  <div className="bg-[#2c4a63] rounded-[55px] px-12 py-16 transform rotate-2 translate-x-8  translate-y-4 scale-95">
                  
                    
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">             
        
                      <div className="bg-white rounded-3xl p-8 relative border-4 border-[#0ec277]">
                        <div className="bg-[#d4f8e8] text-[#00a86b] px-4 py-2 rounded-xl text-sm font-medium inline-block mb-6">
                          Meetings
                        </div>
                        <div className="flex items-center justify-end mb-6 absolute top-4 right-4">
                          <Image src="/flower.svg" alt="Flower diagram" width={48} height={48}  className="w-64 h-64"/>
                        </div>
                        <div className="text-6xl font-bold mt-18 mb-8 text-black">
                          <span className="text-gray-400 text-3xl">€</span>45<span className="text-3xl font-normal">/hrs</span>
                        </div>
                        <p className="text-black text-sm my-12 font-medium">pro-rata (short, focused and value-densed)</p>
                        <button className="w-full bg-primary text-white py-4 rounded-full font-semibold text-lg hover:bg-[#2ee889] transition-colors flex items-center justify-center gap-2" style={{ boxShadow: '0 8px 20px rgba(51, 255, 153, 0.4)' }}>
                          <span>🔥</span> Book Now
                        </button>
                      </div>
        
                      <div className="bg-white rounded-3xl p-8 relative border-4 border-[#0ec277]">
                        <Image src="/best value.png" alt="Best value" width={120} height={40} className="absolute -top-8 left-[75%] -translate-x-1/2 w-48" />                                <div className="bg-[#d4f8e8] text-[#00a86b] px-4 py-2 rounded-xl text-sm font-medium inline-block mb-6">
                          Report Fee
                        </div>
                        <div className="flex items-center justify-end mb-6 absolute top-4 right-4">
                          <Image src="/flower.svg" alt="Flower diagram" width={48} height={48}  className="w-64 h-64"/>
                        </div>
                        <div className="text-6xl font-bold mt-18 mb-8 text-black">
                          <span className="text-gray-400 text-3xl">€</span>220
                        </div>
                        <p className="text-black text-sm my-12 font-medium">fee depends on complexity</p>
                        <button className="w-full bg-primary text-white py-4 rounded-full font-semibold text-lg hover:bg-[#2ee889] transition-colors flex items-center justify-center gap-2" style={{ boxShadow: '0 8px 20px rgba(51, 255, 153, 0.4)' }}>
                          <span>🔥</span> Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


        </div>
      </div>
  
  );
}
