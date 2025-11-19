import Image from "next/image";

export default function AboutUs() {
	return (
		<div className="min-h-screen text-foreground star">
			{/* Hero Section */}
			<section className="pt-32 pb-16 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-5xl font-bold mb-8 text-white">
						About Our Company
					</h1>
					<p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
						We are a team of dedicated professionals passionate about providing excellent services and solutions. Our mission is to drive innovation and create value for our clients.
					</p>
				</div>
			</section>

			{/* Our Mission Section */}
			<section className="py-16 px-6 bg-card/70">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-4xl font-bold mb-6 text-white">Our Mission</h2>
					<p className="text-lg text-gray-300 leading-relaxed">
						Our mission is to deliver high-quality, sustainable, and innovative solutions that exceed our clients' expectations. We are committed to fostering a culture of collaboration, integrity, and continuous improvement.
					</p>
				</div>
			</section>

			{/* Our Team Section */}
			<section className="py-16 px-6">
				<div className="max-w-6xl mx-auto text-center">
					<h2 className="text-4xl font-bold mb-12 text-white">Meet Our Team</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
						{/* Team Member 1 */}
						<div className="bg-card p-6 rounded-lg shadow-lg">
							<Image
								src="/man picture.jpg"
								alt="Team Member 1"
								width={150}
								height={150}
								className="w-32 h-32 rounded-full mx-auto mb-4"
							/>
							<h3 className="text-2xl font-bold text-white">John Doe</h3>
							<p className="text-primary">CEO & Founder</p>
							<p className="text-gray-400 mt-2">
								John has over 20 years of experience in the industry, leading the company with a vision for the future.
							</p>
						</div>

						{/* Team Member 2 */}
						<div className="bg-card p-6 rounded-lg shadow-lg">
							<Image
								src="/man picture.jpg"
								alt="Team Member 2"
								width={150}
								height={150}
								className="w-32 h-32 rounded-full mx-auto mb-4"
							/>
							<h3 className="text-2xl font-bold text-white">Jane Smith</h3>
							<p className="text-primary">Chief Technology Officer</p>
							<p className="text-gray-400 mt-2">
								Jane is a tech enthusiast with a passion for innovation and building scalable solutions.
							</p>
						</div>

						{/* Team Member 3 */}
						<div className="bg-card p-6 rounded-lg shadow-lg">
							<Image
								src="/man picture.jpg"
								alt="Team Member 3"
								width={150}
								height={150}
								className="w-32 h-32 rounded-full mx-auto mb-4"
							/>
							<h3 className="text-2xl font-bold text-white">Peter Jones</h3>
							<p className="text-primary">Head of Operations</p>
							<p className="text-gray-400 mt-2">
								Peter ensures that our operations run smoothly and efficiently, delivering the best results for our clients.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
  return (
    <section className="relative w-full  py-30 pt-[10rem] text-white">
      <div className="relative ">
        {/* Title */}
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-12">
          About <span className="text-white">Us</span>
        </h2>

        {/* Card Wrapper */}
        {/* Card */}
        <div className="relative flex justify-center items-center">
          {/* Glow Image Under */}
          <img
            src="/images/full_curl.svg"
            alt="glow"
            className="absolute  w-[100vw] opacity-90 pointer-events-none select-none z-[-5]"
          />
          <div className="rounded-[4rem] p-3 bg-white/20 backdrop-blur-xl">
            <div className=" w-full max-w-7xl bg  border-white/10 backdrop-blur-md bg-card z-1 rounded-[4rem]   shadow-lg space-y-7 ">
              {/* Company Background */}
              <h3 className="text-center text-5xl font-bold mb-6 p-10 md:p-15">
                Company <span className="text-[#00FF66]">Background</span>
              </h3>

              <p className="text-center text-base md:text-xl lg:text-2xl text-left  font-light text-gray-300 leading-relaxed mx-auto mb-16 px-10 md:px-17">
                Lorem ipsm practitioner, we take time to understand your whole
                business before prescribing solutions. We fix what's slowing you
                down, strengthen your systems, and when you need specialised
                expertise, we tap into our global network of
              </p>

              {/* Credentials Section */}
              <div className="rounded-[3rem] p-2 bg-gradient-to-r from-[#379898] to-[#40B25B]">
                <div className="bg-card px-4 py-15 md:px-10 rounded-[3rem]">
                  <h3 className="text-center text-3xl font-bold mb-10">
                    Credentials
                  </h3>

                  {/* Credentials Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 place-items-center">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        {/* Glow dot */}
                        <div className=" w-7 h-7 bg-[#1F6F75] rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-[#05CC79] rounded-full" />
                        </div>
                        <p className="text-gray-300">Lorem ipsembhf</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Leadership Profile */}
              <h3 className="text-center text-5xl font-bold mb-6 p-10 md:p-15">
                Leadership <span className="text-[#00FF66]">Profile</span>
              </h3>

              <p className="text-center text-base md:text-xl lg:text-2xl text-left  font-light text-gray-300 leading-relaxed mx-auto pb-16 px-10 md:px-17">
                Lorem ipsm practitioner, we take time to understand your whole
                business before prescribing solutions. We fix what's slowing you
                down, strengthen your systems, and when you need specialised
                expertise, we tap into our global network of partners to get you
                the right results — fast."
              </p>
            </div>
          </div>
        </div>
      </div>
      <PictureSection />
      <CoreVisionSection />
      <SpecialisedFocus />
    </section>
  );
}

const PictureSection = () => {
  return (
    <>
      <div className="relative flex justify-center items-center py-[9rem]">
        {/* Glow Image Under */}
        <img
          src="/images/n_curl.svg"
          alt="glow"
          className="absolute opacity-90 pointer-events-none select-none z-[-5]"
        />
        <img src="/images/handshake.png" alt="" className="w-5xl " />
      </div>
    </>
  );
};

function CoreVisionSection() {
  return (
    <section className="w-full  text-white px-6 md:px-12 lg:px-24 py-20 relative overflow-hidden font-poppins">
      {/* Background subtle stars */}
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-xl">
        {/* Header */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold mb-10">
          Core Vision <span className="text-[#33FF99]">& Philosophy</span>
        </h2>

        {/* Body Paragraph */}
        <p className="text-[#D4D8E3] leading-relaxed mb-6">
          At ORR, we approach professionals and businesses as living systems —
          each with its own structure, energy, and unique challenges.
        </p>

        <p className="text-[#D4D8E3] leading-relaxed mb-6">
          We listen first, to understand the underlying causes of operational
          and administrative ‘ailments’, and then act with precision to restore
          clarity, structure, and efficiency.
        </p>

        <p className="text-[#D4D8E3] leading-relaxed mb-10">
          Whether you're a self-employed professional, a freelancer, or an
          established company, ORR helps you:
        </p>

        {/* Bullet List */}
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

        {/* Closing Paragraphs */}
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

const SpecialisedFocus = () => {
  return (
    <section className="w-full bg-white/10 text-white px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-2 gap-y-32 gap-x-24 place-items-center">
        
        {/* ---------- COLUMN 1 ---------- */}
        <div className="relative flex flex-col justify-start text-center gap-15 items-center ">
          
          {/* LINE (ABSOLUTE) */}
          <div className="hidden md:block absolute left-[4rem] bg-[#16FF99] w-[7px] h-[200px] top-[12px]" />

          {/* TOP ITEM */}
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-28 h-28 bg-card rounded-full flex items-center justify-center shadow-[0_0_40px_#16FF99]">
              <img src="/images/sprout.svg" className="w-17 h-17 pointer-events-none" />
            </div>
            <p className="text-[#33FF99] text-xl font-medium">Agriculture</p>
          </div>

          {/* BOTTOM ITEM */}
          <div className="flex items-center gap-4 mt-4 relative z-10">
            <div className="w-28 h-28 bg-card rounded-full flex items-center justify-center shadow-[0_0_40px_#16FF99]">
              <img src="/images/management.svg" className="w-17 h-17 pointer-events-none" />
            </div>
            <p className="text-[#33FF99] text-xl font-medium">Management</p>
          </div>

        </div>

        {/* ---------- COLUMN 2 ---------- */}
        <div className="relative flex flex-col items-center text-center gap-15">

          {/* LINE (ABSOLUTE) */}
        {/* LINE (ABSOLUTE) */}
          <div className="hidden md:block absolute left-[4rem] bg-[#16FF99] w-[7px] h-[200px] top-[12px]" />

          {/* TOP ITEM */}
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-28 h-28 bg-card rounded-full flex items-center justify-center shadow-[0_0_40px_#16FF99]">
              <img src="/images/passport.svg" className="w-17 h-17 pointer-events-none" />
            </div>
            <p className="text-[#33FF99] text-xl font-medium">Immigration</p>
          </div>

          {/* BOTTOM ITEM */}
          <div className="flex items-center gap-4 mt-4 relative z-10">
            <div className="w-28 h-28 bg-card rounded-full flex items-center justify-center shadow-[0_0_40px_#16FF99]">
              <img src="/images/house.svg" className="w-14 h-14" />
            </div>
            <p className="text-[#33FF99] text-xl font-medium">Property</p>
          </div>

        </div>

      </div>
    </section>
  );
};


