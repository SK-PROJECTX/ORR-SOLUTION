"use client";

import Image from "next/image";

export default function GPMetaphorSection() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background pattern (optional) */}
      <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover opacity-8 pointer-events-none" />

      {/* Heading */}
      <div className="relative z-10 text-center mb-16 sm:mb-20 lg:mb-36">
        <h2 className="text-white text-4xl font-poppins sm:text-2xl md:text-3xl lg:text-5xl font-extrabold leading-snug">
          Businesses as a <span className="text-[#3DFF7C]">Living System </span>
        </h2>
        <p className="text-white font-poppins font-light text-[15px] sm:text-xl md:text-2xl  mt-2">
          Think of your organisation like a body
        </p>
      </div>

      {/* Top row: responsive layout */}
      <div className="relative z-10 w-full max-w-none mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start mb-8 sm:mb-16 lg:mb-28 gap-6 lg:gap-4 lg:w-screen lg:left-1/2 lg:-translate-x-1/2 lg:px-0">
        {/* Card 1 */}
        <div className="w-full max-w-xl lg:max-w-4xl bg-card rounded-2xl lg:rounded-tr-[4rem] lg:rounded-br-[4rem] overflow-hidden shadow-lg">
          <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[450px]">
            <Image src="/images/organ.png" alt="Living system" fill className="object-cover" />
          </div>

          <div className="p-4 sm:p-6 lg:p-5 text-[#8EFFD0] text-[30px] font-poppins font-semibold sm:text-base lg:text-3xl tracking-wide">Organ</div>
          <p className="px-4 sm:px-6 lg:px-5 pb-4 sm:pb-6 lg:pb-5 text-white text-sm font-poppins font-light sm:text-base lg:text-sm">Your departments and teams</p>         
        </div>

        {/* Card 2 */}
        <div className="w-full max-w-xl lg:max-w-4xl bg-card rounded-2xl lg:rounded-tl-[4rem] lg:rounded-bl-[4rem] overflow-hidden shadow-lg">
          <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[450px]">
            <Image src="/images/nervous-system.png" alt="Systems working together" fill className="object-cover" />
          </div>

        <div className="p-4 sm:p-6 lg:p-5 text-[#8EFFD0] text-[30px] font-poppins font-semibold sm:text-base lg:text-3xl tracking-wide">Nervous System</div>
          <p className="px-4 sm:px-6 lg:px-5 pb-4 sm:pb-6 lg:pb-5 text-white text-sm font-poppins font-light sm:text-base lg:text-sm">Your communication channels</p>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-none mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start mb-8 sm:mb-16 lg:mb-28 gap-6 lg:gap-4 lg:w-screen lg:left-1/2 lg:-translate-x-1/2 lg:px-0">
        {/* Card 3  */}
        <div className="w-full max-w-xl lg:max-w-4xl bg-card rounded-2xl lg:rounded-tr-[4rem] lg:rounded-br-[4rem] overflow-hidden shadow-lg">
          <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[450px]">
            <Image src="/images/circulatory-system.png" alt="Living system" fill className="object-cover" />
          </div>

          <div className="p-4 sm:p-6 lg:p-5 text-[#8EFFD0] text-[30px] font-poppins font-semibold sm:text-base lg:text-3xl tracking-wide">Circulatory System</div>
          <div className="px-4 sm:px-6 lg:px-5 pb-4 sm:pb-6 lg:pb-5 text-white text-sm font-poppins font-light sm:text-base lg:text-sm">Your cashflow and resources </div>         
        </div>

        {/* Card 4 */}
        <div className="w-full max-w-xl lg:max-w-4xl bg-card rounded-2xl lg:rounded-tl-[4rem] lg:rounded-bl-[4rem] overflow-hidden shadow-lg">
          <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[450px]">
            <Image src="/images/immune-system.png" alt="Systems working together" fill className="object-cover" />
          </div>

        <div className="p-4 sm:p-6 lg:p-5 text-[#8EFFD0] text-[30px] font-poppins font-semibold sm:text-base lg:text-3xl tracking-wide">Immune System</div>
          <div className="px-4 sm:px-6 lg:px-5 pb-4 sm:pb-6 lg:pb-5 text-white text-sm font-poppins font-light sm:text-base lg:text-sm">Your risk management and compliance</div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-none mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start mb-8 sm:mb-16 lg:mb-28 gap-6 lg:gap-4 lg:w-screen lg:left-1/2 lg:-translate-x-1/2 lg:px-0">
        {/* Card 5 */}
        <div className="w-full max-w-xl lg:max-w-4xl bg-card rounded-2xl lg:rounded-tr-[4rem] lg:rounded-br-[4rem] overflow-hidden shadow-lg">
          <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[450px]">
            <Image src="/images/dna.png" alt="Living system" fill className="object-cover" />
          </div>

          <div className="p-4 sm:p-6 lg:p-5 text-[#8EFFD0] text-[30px] font-poppins font-semibold sm:text-base lg:text-3xl tracking-wide">DNA </div>
          <div className="px-4 sm:px-6 lg:px-5 pb-4 sm:pb-6 lg:pb-5 text-white text-sm font-poppins font-light sm:text-base lg:text-sm">Your values, SOPs and Cultures</div>         
        </div>

        {/* Card 6 */}
        <div className="w-full max-w-xl lg:max-w-4xl bg-card rounded-2xl lg:rounded-tl-[4rem] lg:rounded-bl-[4rem] overflow-hidden shadow-lg">
          <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[450px]">
            <Image src="/images/metabolism.png" alt="Systems working together" fill className="object-cover" />
          </div>

        <div className="p-4 sm:p-6 lg:p-5 text-[#8EFFD0] text-[30px] font-poppins font-semibold sm:text-base lg:text-3xl tracking-wide">Metabolism</div>
          <div className="px-4 sm:px-6 lg:px-5 pb-4 sm:pb-6 lg:pb-5 text-white text-sm font-poppins font-light sm:text-base lg:text-sm">Your day-to-day operations </div>
        </div>
      </div>


      {/* Bottom card - centered */}
      <div className="relative z-10 w-full flex justify-center">
        <div className="w-full max-w-4xl lg:max-w-6xl bg-card rounded-2xl lg:rounded-[4rem] overflow-hidden shadow-lg">
          <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[450px]">
            <Image src="/images/senses.png" alt="ORR Solutions" fill className="object-cover" /> 
          </div>

        <div className="p-4 sm:p-6 lg:p-5 text-[#8EFFD0] text-[30px] font-poppins font-semibold sm:text-base lg:text-3xl tracking-wide">Senses</div>
          <div className="px-4 sm:px-6 lg:px-5 pb-4 sm:pb-6 lg:pb-5 text-white text-sm font-poppins font-light sm:text-base lg:text-sm">Your awareness and feedback loops</div>
        </div>
      </div>
    </section>
  );
}