"use client";

import { useState } from "react";
import { Mail, Home, Phone } from "lucide-react";
import { useSupportStore } from "@/store/supportStore";

export default function ContactPage() {
  const { createTicket, isSubmitting } = useSupportStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.website || !formData.message) {
      return;
    }
    await createTicket(formData);
    setFormData({ name: '', email: '', website: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center px-10 py-20 relative">
      {/* Starry Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-[url('/stars.png')] opacity-40"></div>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20 z-10 max-w-6xl w-full">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold text-lemon">Contact Us</h1>

          <p className="text-sm leading-relaxed opacity-80 w-4/5">
            We are committed to processing the information in order to
            contact you and talk about your project.
          </p>

          {/* Email */}
          <div className="flex items-start space-x-4 mt-8">
            <Mail className="text-lemon" size={22} />
            <p className="text-sm opacity-90">example@teamwebflow.com</p>
          </div>

          {/* Address */}
          <div className="flex items-start space-x-4">
            <Home className="text-lemon" size={22} />
            <p className="text-sm opacity-90 leading-tight">
              4074 Ebert Summit Suite 375 <br />
              Lake Leonardchester
            </p>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-4">
            <Phone className="text-lemon" size={22} />
            <p className="text-sm opacity-90">+44 123 654 7890</p>
          </div>
        </div>

        {/* RIGHT SIDE — FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-md bg-card text-foreground placeholder-foreground/50 outline-none border border-secondary focus:border-lemon transition-colors"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-md bg-card text-foreground placeholder-foreground/50 outline-none border border-secondary focus:border-lemon transition-colors"
          />

          <input
            type="text"
            name="website"
            placeholder="Website *"
            value={formData.website}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-md bg-card text-foreground placeholder-foreground/50 outline-none border border-secondary focus:border-lemon transition-colors"
          />

          <textarea
            name="message"
            placeholder="Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-md bg-card text-foreground placeholder-foreground/50 outline-none border border-secondary focus:border-lemon transition-colors"
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-md text-background font-medium bg-lemon hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
