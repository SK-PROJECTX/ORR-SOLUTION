export function CoreVisionSection() {
  return (
    <section className="w-full  text-white px-6 md:px-12 lg:px-24 py-20 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-xl">
        <h2 className="text-center text-3xl md:text-4xl font-semibold mb-10">
          Core Vision <span className="text-[#33FF99]">& Philosophy</span>
        </h2>

        <p className="text-[#D4D8E3] leading-relaxed mb-6">
          At ORR, we approach professionals and businesses as living systems —
          each with its own structure, energy, and unique challenges.
        </p>

        <p className="text-[#D4D8E3] leading-relaxed mb-6">
          We listen first, to understand the underlying causes of operational
          and administrative 'ailments', and then act with precision to restore
          clarity, structure, and efficiency.
        </p>

        <p className="text-[#D4D8E3] leading-relaxed mb-10">
          Whether you're a self-employed professional, a freelancer, or an
          established company, ORR helps you:
        </p>

        <ul className="space-y-4 mb-10">
          {[
            "Identify and resolve administrative bottlenecks",
            "Outsource and automate routine work",
            "Implement structured operational systems (SOPs, workflows, dashboards)",
            "Optimise data and client information to generate new value streams",
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
          We believe every client relationship generates data — and within that
          data lies opportunity. By capturing and analysing these patterns, ORR
          transforms information into insight, helping businesses evolve
          intelligently.
        </p>

        <p className="text-[#D4D8E3] leading-relaxed">
          Our team and network of trusted subcontractors provide tailored
          solutions spanning multiple industries, with specialised focus in:
        </p>
      </div>
    </section>
  );
}