export default function Contact() {
	return (
		<div className="min-h-screen text-foreground star">
			{/* Hero Section */}
			<section className="pt-32 pb-16 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-5xl font-bold mb-8 text-white">
						Contact Us
					</h1>
					<p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
						We would love to hear from you. Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
					</p>
				</div>
			</section>

			{/* Contact Form and Details Section */}
			<section className="py-16 px-6">
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* Contact Form */}
					<div className="bg-card p-8 rounded-lg shadow-lg">
						<h2 className="text-3xl font-bold mb-6 text-white">Send us a Message</h2>
						<form>
							<div className="mb-4">
								<label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
								<input
									type="text"
									id="name"
									className="w-full p-3 bg-background rounded-md border border-primary/30 focus:outline-none focus:border-primary"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
								<input
									type="email"
									id="email"
									className="w-full p-3 bg-background rounded-md border border-primary/30 focus:outline-none focus:border-primary"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
								<textarea
									id="message"
									rows={5}
									className="w-full p-3 bg-background rounded-md border border-primary/30 focus:outline-none focus:border-primary"
								></textarea>
							</div>
							<button
								type="submit"
								className="w-full bg-primary text-white font-bold py-3 rounded-md hover:bg-primary/90 transition-colors"
							>
								Send Message
							</button>
						</form>
					</div>

					{/* Contact Details */}
					<div className="bg-card p-8 rounded-lg shadow-lg">
						<h2 className="text-3xl font-bold mb-6 text-white">Contact Information</h2>
						<div className="space-y-6">
							<div>
								<h3 className="text-xl font-bold text-primary">Address</h3>
								<p className="text-gray-300">123 Main Street, Anytown, USA 12345</p>
							</div>
							<div>
								<h3 className="text-xl font-bold text-primary">Email</h3>
								<p className="text-gray-300">contact@ourcompany.com</p>
							</div>
							<div>
								<h3 className="text-xl font-bold text-primary">Phone</h3>
								<p className="text-gray-300">(123) 456-7890</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}