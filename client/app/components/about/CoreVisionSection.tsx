export function CoreVisionSection() {
  return (
    <section className="w-full  text-white px-6 md:px-12 lg:px-24 py-20 relative overflow-hidden font-poppins">

    <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-20 pointer-events-none" />

    <div className="rounded-[4rem] p-5 bg-white/20 backdrop-blur-xl">
        <div className=" w-full max-w-7xl bg  border-white/10 backdrop-blur-md bg-card z-1 rounded-[4rem]   shadow-lg space-y-7 ">
        <div className="relative z-10 max-w-6xl mx-auto p-10 text-2xl">
        <h2 className="text-center text-3xl md:text-4xl font-semibold mb-5 mt-4">
          Core Vision <span className="text-[#33FF99]">& Philosophy</span>
        </h2>

        <p className="text-[#D4D8E3] leading-relaxed mb-6">
          At ORR, we approach professionals and businesses as living systems — each with its own structure, energy, and unique challenges.
        </p>

        
        <p className="text-[#D4D8E3] leading-relaxed mb-10">
         We see your organisation as a connected whole:
        </p>

        <ul className="space-y-4 mb-10">
          {[
            "digital systems",
            "people and processes",
            "compliance and risk",
            "and, where relevant, the landscapes and projects you manage",
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-4 text-[#D4D8E3] leading-relaxed item-center "
            >
              <div className=" w-7 h-7 bg-[#1F6F75] rounded-full flex items-center justify-center ">
                <div className="w-4 h-4 bg-[#3DFF7C] rounded-full" />
              </div>
              {item}
            </li>
          ))}
        </ul>

        <p className="text-[#D4D8E3] leading-relaxed mb-6">
         Our job is to listen first, then coordinate the right mix of thinking, tools, and practical steps — without forcing you into someone else’s template.
        </p>

        <p className="text-[#D4D8E3] leading-relaxed">
       ORR itself is a faceless coordination layer: one calm point of contact, backed by domain-specific insight, targeted research, and a distributed network we can lean on when it adds value.
        </p>
      </div>
      </div>
 
    </div>
    

    </section>
  );
}