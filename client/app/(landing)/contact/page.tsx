import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen text-foreground star">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-white">
            Contact <span className="text-primary">Us</span>
          </h1>
        </div>
      </section>

      {/* Contact Form and Details Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 bg-card p-3 sm:p-4 rounded-2xl">
          {/* Contact Information Card - Left */}
          <div className="bg-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Contact Information</h2>
            <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base">
              Say something to start a live chat!
            </p>

            {/* Phone */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className="text-base sm:text-lg">+012 3456 789</p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className="text-base sm:text-lg">demo@gmail.com</p>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className="text-base sm:text-lg">
                132 Dartmouth Street Boston, Massachusetts 02156 United States
              </p>
            </div>
          </div>

          {/* Contact Form - Right */}
          <div className="bg-card/50 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 border-white/10">
            <form className="space-y-4 sm:space-y-6">
              {/* First Name and Last Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
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
              <div className="pt-4 flex justify-center sm:justify-end">
                <div className="relative inline-block">
                  <button
                    type="submit"
                    className="bg-primary text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-primary/90 transition-all text-sm sm:text-base"
                  >
                    Send Message
                  </button>
                  {/* Lucide-style send icon positioned overlapping the button */}
                  <Send className="absolute right-20 sm:right-28 -bottom-6 sm:-bottom-8 w-8 h-8 sm:w-12 sm:h-12 text-white" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
