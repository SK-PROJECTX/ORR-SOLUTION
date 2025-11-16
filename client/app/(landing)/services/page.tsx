import Image from 'next/image';

export default function Services() {
	return (
		<div className="min-h-screen text-foreground">
			{/* Hero Section */}
			<section className="pt-32 pb-16 px-6">
				<div className="max-w-6xl mx-auto text-center">
					<h1 className="text-5xl font-bold mb-6 text-gray-300 ">
						Our Services
					</h1>
					<p className="text-lg text-gray-300 max-w-3xl mx-auto">
						Just like a skilled general practitioner, we take time to understand
						your whole business before prescribing solutions. We'll work closely
						with you, strengthen your systems, and when you need specialized
						expertise, we tap into our global network of partners to get you the
						right results — fast.
					</p>
				</div>
			</section>

			{/* Services Overview */}
			<section className="py-16 px-6 relative">
				<div className="absolute -top-90 left-0 w-full opacity-80">
					<Image
						src="/bgSvg.svg"
						alt="Background"
						width={1920}
						height={160}
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="max-w-6xl mx-auto relative z-10">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-300">
							SERVICES <span className="text-primary">OVERVIEW</span>
						</h2>
					</div>
					<div className="bg-background rounded-lg p-2 backdrop-opacity-10">
						<div className="bg-card rounded-lg p-8">
							<div className="grid md:grid-cols-2 gap-8 relative">
								<div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/60 transform -translate-x-1/2"></div>
								{/* Strategic Advisory & Compliance */}
								<div className="flex flex-col h-full pr-4">
									<h3 className="text-xl font-bold mb-4 text-gray-300">
										Strategic Advisory & Compliance
									</h3>
									<p className="text-gray-300 mb-6 flex-grow">
										We deliver clarity to complexity. From regulatory and
										sustainability frameworks to biotechnology and compliance
										consulting, our experts guide clients through evolving
										landscapes with confidence. Our approach combines deep technical
										insight with strategic foresight, ensuring every initiative is
										compliant, sustainable, and built for growth.
									</p>
									<div className="mb-6">
										<Image
											src="/man picture.jpg"
											alt="Strategic Advisory"
											width={400}
											height={192}
											className="w-full h-48 object-cover rounded-lg"
										/>
									</div>
									<button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors inline-block">
										Learn More
									</button>
								</div>

								{/* Operational Systems & Infrastructure */}
								<div className="flex flex-col h-full pl-4">
									<h3 className="text-xl font-bold mb-4 text-gray-300">
										Operational Systems & Infrastructure
									</h3>
									<p className="text-gray-300 mb-6 flex-grow">
										We design, build and streamline the systems that power modern
										organizations. Whether it's creating SOPs, structuring onboarding
										workflows, or coordinating complex office setups, we turn operations into well-
										functioning ecosystems. Our trusted network
										of builders, finishers, and tech specialists
										delivers reliability from planning to execution.
									</p>
									<div className="mb-6">
										<Image
											src="/man picture.jpg"
											alt="Operational Systems"
											width={400}
											height={192}
											className="w-full h-48 object-cover rounded-lg"
										/>
									</div>
									<button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors inline-block">
										Learn More
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Data Intelligence & Concierge Solutions */}
			<section className="py-16 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="bg-card rounded-lg p-8">
						<h2 className="text-3xl font-bold mb-6 text-gray-300">
							Data Intelligence & Concierge Solutions
						</h2>
						<p className="text-gray-300 mb-8 max-w-4xl">
							Insight meets adaptability. We help organizations turn data into
							decisions through advanced analytics, KPI dashboards, and
							predictive modeling. Alongside our concierge division, we offer
							personalized support and problem-solving — delivering smart, human
							solutions for both business and lifestyle needs with precision and
							discretion.
						</p>
						<div className="mb-8">
							<Image
								src="/man picture.jpg"
								alt="Data Intelligence"
								width={800}
								height={256}
								className="w-full h-64 object-cover rounded-lg"
							/>
						</div>
						<button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors">
							Learn More
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}