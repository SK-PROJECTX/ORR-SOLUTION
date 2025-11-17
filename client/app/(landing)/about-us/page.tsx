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
}