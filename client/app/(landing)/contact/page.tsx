export default function Contact() {
  return (
    <div className="min-h-screen text-foreground star">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-8">
            Contact <span className="text-primary">Us</span>
          </h1>
        </div>
      </section>

      {/* Contact Form and Details Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-card p-4 rounded-2xl">
          {/* Contact Information Card - Left */}
          <div className="bg-primary rounded-3xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-3">Contact Information</h2>
            <p className="text-white/90 mb-8">
              Say something to start a live chat!
            </p>

            {/* Phone */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "white" }}
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12 1.05.38 2.07.77 3.03a2 2 0 0 1-.45 2.11L8.09 12.91a16 16 0 0 0 6 6l2.05-2.35a2 2 0 0 1 2.11-.45c.96.39 1.98.65 3.03.77A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <p className="text-lg">+012 3456 789</p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "white" }}
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                  <polyline points="3 7 12 13 21 7" />
                </svg>
              </div>
              <p className="text-lg">demo@gmail.com</p>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "white" }}
                >
                  <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z" />
                  <circle cx="12" cy="10" r="2" />
                </svg>
              </div>
              <p className="text-lg">
                132 Dartmouth Street Boston, Massachusetts 02156 United States
              </p>
            </div>
          </div>

          {/* Contact Form - Right */}
          <div className="bg-card/50 backdrop-blur-md rounded-2xl p-8  border-white/10">
            <form className="space-y-6">
              {/* First Name and Last Name Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-gray-300 text-sm mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="John"
                    className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors pb-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-gray-300 text-sm mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Doe"
                    className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors pb-2"
                  />
                </div>
              </div>

              {/* Email and Phone Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-300 text-sm mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors pb-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-300 text-sm mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+1 012 3456 789"
                    className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors pb-2"
                  />
                </div>
              </div>

              {/* Select Subject */}
              <div>
                <label className="block text-gray-300 text-sm mb-4">
                  Select Subject?
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    "General Inquiry",
                    "General Inquiry",
                    "General Inquiry",
                    "General Inquiry",
                  ].map((subject, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="subject"
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-gray-300 text-sm">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-300 text-sm mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Write your message..."
                  rows={1}
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors pb-2 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-end">
                <div className="relative inline-block">
                  <button
                    type="submit"
                    className="bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-all"
                  >
                    Send Message
                  </button>
                  {/* Lucide-style send icon positioned overlapping the button */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="absolute -right-6 -bottom-6 w-12 h-12 drop-shadow-lg"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: "white" }}
                  >
                    <path d="M22 2L11 13" stroke="currentColor" />
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2z"
                      stroke="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
