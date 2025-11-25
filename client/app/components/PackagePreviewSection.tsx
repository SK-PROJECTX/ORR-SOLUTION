export default function PackagePreviewSection() {
  return (
    <section className="w-full text-white px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div 
          className="bg-[#33FF99] rounded-[40px] transform -skew-y-2"
          style={{
            padding: '40px 0px 4px 20px',
            clipPath: 'polygon(0% 0.5%, 100% 0%, 100% 100%, 1% 100%, 0% 0%)'
          }}
        >
          <div 
            className="bg-[#1e3a52] rounded-[35px] p-8 md:p-12 transform skew-y-2"
            style={{
              clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)'
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">
              Package <span className="text-[#33FF99]">Preview</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-6 text-black relative border-4 border-[#33FF99]">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#33FF99] text-black px-4 py-1 rounded-full text-sm font-semibold">
                  Best value
                </div>
                <div className="bg-[#d4f8e8] text-[#00a86b] px-3 py-1 rounded-lg text-sm font-medium inline-block mb-4">
                  Meetings
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="text-5xl font-bold mb-2">
                  <span className="text-gray-400 text-2xl">€</span>45<span className="text-2xl font-normal">/hrs</span>
                </div>
                <p className="text-gray-500 text-sm mb-6">pro-rata (short, focused and value-densed)</p>
                <button className="w-full bg-[#33FF99] text-white py-3 rounded-xl font-semibold hover:bg-[#2ee889] transition-colors flex items-center justify-center gap-2">
                  <span>🔥</span> Book Now
                </button>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-black relative border-4 border-[#33FF99]">
                <div className="bg-[#d4f8e8] text-[#00a86b] px-3 py-1 rounded-lg text-sm font-medium inline-block mb-4">
                  Report Fee
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="text-5xl font-bold mb-2">
                  <span className="text-gray-400 text-2xl">€</span>220
                </div>
                <p className="text-gray-500 text-sm mb-6">fee depends on complexity</p>
                <button className="w-full bg-[#33FF99] text-white py-3 rounded-xl font-semibold hover:bg-[#2ee889] transition-colors flex items-center justify-center gap-2">
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