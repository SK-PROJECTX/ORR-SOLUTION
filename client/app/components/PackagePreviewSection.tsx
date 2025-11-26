export default function PackagePreviewSection() {
  return (
    <section className="w-full py-24 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a52 0%, #0d2238 100%)' }}>
      <div className="absolute inset-0 star opacity-20" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="bg-[#33FF99]/50 backdrop-blur-xl rounded-[60px] pt-2 pr-0 pb-1 pl-0 transform -rotate-2 -translate-x-8 -translate-y-4">
          <div className="bg-[#2c4a63] rounded-[55px] px-12 py-16 transform rotate-2 translate-x-8  translate-y-4 scale-95">
            <h2 className="text-5xl font-bold text-center mb-16 text-white">
              Package <span className="text-[#33FF99]">Preview</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 relative border-4 border-[#33FF99]">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#33FF99] text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Best value
                </div>
                <div className="bg-[#d4f8e8] text-[#00a86b] px-4 py-2 rounded-xl text-sm font-medium inline-block mb-6">
                  Meetings
                </div>
                <div className="flex items-center justify-end mb-6">
                  <div className="w-12 h-12 bg-[#4285f4] rounded-xl flex items-center justify-center relative">
                    <div className="absolute w-3 h-3 bg-white rounded-full top-2 left-2"></div>
                    <div className="absolute w-3 h-3 bg-white rounded-full top-2 right-2"></div>
                    <div className="absolute w-3 h-3 bg-white rounded-full bottom-2 left-2"></div>
                    <div className="absolute w-3 h-3 bg-white rounded-full bottom-2 right-2"></div>
                  </div>
                </div>
                <div className="text-6xl font-bold mb-3 text-black">
                  <span className="text-gray-400 text-3xl">€</span>45<span className="text-3xl font-normal">/hrs</span>
                </div>
                <p className="text-[#4285f4] text-sm mb-8 font-medium">pro-rata (short, focused and value-densed)</p>
                <button className="w-full bg-[#33FF99] text-white py-4 rounded-2xl font-semibold text-lg hover:bg-[#2ee889] transition-colors flex items-center justify-center gap-2" style={{ boxShadow: '0 8px 20px rgba(51, 255, 153, 0.4)' }}>
                  <span>🔥</span> Book Now
                </button>
              </div>
              
              <div className="bg-white rounded-3xl p-8 relative border-4 border-[#33FF99]">
                <div className="bg-[#d4f8e8] text-[#00a86b] px-4 py-2 rounded-xl text-sm font-medium inline-block mb-6">
                  Report Fee
                </div>
                <div className="flex items-center justify-end mb-6">
                  <div className="w-12 h-12 bg-[#4285f4] rounded-xl flex items-center justify-center relative">
                    <div className="absolute w-3 h-3 bg-white rounded-full top-2 left-2"></div>
                    <div className="absolute w-3 h-3 bg-white rounded-full top-2 right-2"></div>
                    <div className="absolute w-3 h-3 bg-white rounded-full bottom-2 left-2"></div>
                    <div className="absolute w-3 h-3 bg-white rounded-full bottom-2 right-2"></div>
                  </div>
                </div>
                <div className="text-6xl font-bold mb-3 text-black">
                  <span className="text-gray-400 text-3xl">€</span>220
                </div>
                <p className="text-[#4285f4] text-sm mb-8 font-medium">fee depends on complexity</p>
                <button className="w-full bg-[#33FF99] text-white py-4 rounded-2xl font-semibold text-lg hover:bg-[#2ee889] transition-colors flex items-center justify-center gap-2" style={{ boxShadow: '0 8px 20px rgba(51, 255, 153, 0.4)' }}>
                  <span>🔥</span> Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}