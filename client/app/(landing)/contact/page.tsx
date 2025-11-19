import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen text-foreground star">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-8 text-white">
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
                <Phone className="w-5 h-5 text-white" />
              </div>
              <p className="text-lg">+012 3456 789</p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <p className="text-lg">demo@gmail.com</p>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                <MapPin className="w-5 h-5 text-white" />
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
                <div className="grid grid-cols-2 gap-3">
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
                    className="bg-gradient-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-all"
                  >
                    Send Message
                  </button>
                  {/* Lucide-style send icon positioned overlapping the button */}
                  <Send className="absolute right-28 -bottom-8 w-12 h-12 text-white" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
