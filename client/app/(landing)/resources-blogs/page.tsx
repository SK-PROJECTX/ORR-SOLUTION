export default function ResourcesBlogs() {
	return (
		<div className="min-h-screen text-foreground star">
			{/* Hero Section */}
			<section className="pt-32 pb-16 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-5xl font-bold mb-8 text-white">
						Resources & Blogs
					</h1>
					<p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
						Stay updated with the latest news, articles, and resources from our team of experts.
					</p>
				</div>
			</section>

			{/* Blog Posts Section */}
			<section className="py-16 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{/* Blog Post 1 */}
						<div className="bg-card p-6 rounded-lg shadow-lg">
							<h2 className="text-2xl font-bold mb-4 text-white">Blog Post Title 1</h2>
							<p className="text-gray-300 mb-4">
								This is a short description of the blog post. It gives a brief overview of the content.
							</p>
							<a href="#" className="text-primary font-bold hover:underline">Read More</a>
						</div>

						{/* Blog Post 2 */}
						<div className="bg-card p-6 rounded-lg shadow-lg">
							<h2 className="text-2xl font-bold mb-4 text-white">Blog Post Title 2</h2>
							<p className="text-gray-300 mb-4">
								This is a short description of the blog post. It gives a brief overview of the content.
							</p>
							<a href="#" className="text-primary font-bold hover:underline">Read More</a>
						</div>

						{/* Blog Post 3 */}
						<div className="bg-card p-6 rounded-lg shadow-lg">
							<h2 className="text-2xl font-bold mb-4 text-white">Blog Post Title 3</h2>
							<p className="text-gray-300 mb-4">
								This is a short description of the blog post. It gives a brief overview of the content.
							</p>
							<a href="#" className="text-primary font-bold hover:underline">Read More</a>
						</div>

						{/* Blog Post 4 */}
						<div className="bg-card p-6 rounded-lg shadow-lg">
							<h2 className="text-2xl font-bold mb-4 text-white">Blog Post Title 4</h2>
							<p className="text-gray-300 mb-4">
								This is a short description of the blog post. It gives a brief overview of the content.
							</p>
							<a href="#" className="text-primary font-bold hover:underline">Read More</a>
						</div>

						{/* Blog Post 5 */}
						<div className="bg-card p-6 rounded-lg shadow-lg">
							<h2 className="text-2xl font-bold mb-4 text-white">Blog Post Title 5</h2>
							<p className="text-gray-300 mb-4">
								This is a short description of the blog post. It gives a brief overview of the content.
							</p>
							<a href="#" className="text-primary font-bold hover:underline">Read More</a>
						</div>

						{/* Blog Post 6 */}
						<div className="bg-card p-6 rounded-lg shadow-lg">
							<h2 className="text-2xl font-bold mb-4 text-white">Blog Post Title 6</h2>
							<p className="text-gray-300 mb-4">
								This is a short description of the blog post. It gives a brief overview of the content.
							</p>
							<a href="#" className="text-primary font-bold hover:underline">Read More</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}