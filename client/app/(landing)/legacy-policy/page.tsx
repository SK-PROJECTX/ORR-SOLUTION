import Image from "next/image";

export default function LegacyPolicy() {
	return (
		<div className="min-h-screen text-foreground star">
			{/* Hero Section */}
			<section className="pt-32 pb-16 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-5xl font-bold mb-8 text-white">
						Legacy & Policy
					</h1>
					<p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
						Lorem ipsm jgdu mplexity. From regulatory and sustainability
						frameworks to biotechnology and compliance consulting, our experts
						guide clients through evolving legal, scientific, and operational
						standards. Our approach combines deep technical insight with
						strategic foresight — ensuring every initiative is compliant,
						sustainable, and built for growth.
					</p>
				</div>
			</section>

			{/* Policy Items */}
			<section className="pb-16 px-6">
				<div className="max-w-4xl mx-auto">
					<div className="bg-card/70 p-4 backdrop-blur-lg relative overflow-hidden rounded-2xl">
						<Image
							src="/bgSvg.svg"
							alt="background"
							width={1000}
							height={1000}
							className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[225deg] opacity-50"
						/>
						<div className="bg-card rounded-2xl p-4 border-primary/30 relative">
							{/* Policy Item 01 */}
							<div className="flex gap-6 mb-12 ">
								<div className="text-6xl font-bold text-primary shrink-0">
									01
								</div>
								<div className="flex-1">
									<p className="text-gray-300 leading-relaxed">
										Lorem ipsm jgdu mplexity. From regulatory and sustainability
										frameworks to biotechnology and compliance consulting, our
										experts guide clients through evolving legal, scientific,
										and operational standards. Our approach combines deep
										technical insight with strategic foresight — ensuring every
										initiative is compliant, sustainable, and built for growth.
									</p>
								</div>
							</div>

							{/* Policy Item 02 */}
							<div className="flex gap-6 mb-12">
								<div className="text-6xl font-bold text-primary shrink-0">
									02
								</div>
								<div className="flex-1">
									<p className="text-gray-300 leading-relaxed">
										Lorem ipsm jgdu mplexity. From regulatory and sustainability
										frameworks to biotechnology and compliance consulting, our
										experts guide clients through evolving legal, scientific,
										and operational standards. Our approach combines deep
										technical insight with strategic foresight — ensuring every
										initiative is compliant, sustainable, and built for growth.
									</p>
								</div>
							</div>

							{/* Policy Item 03 */}
							<div className="flex gap-6 pb-8">
								<div className="text-6xl font-bold text-primary shrink-0">
									03
								</div>
								<div className="flex-1">
									<p className="text-gray-300 leading-relaxed">
										Lorem ipsm jgdu mplexity. From regulatory and sustainability
										frameworks to biotechnology and compliance consulting, our
										experts guide clients through evolving legal, scientific,
										and operational standards. Our approach combines deep
										technical insight with strategic foresight — ensuring every
										initiative is compliant, sustainable, and built for growth.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
