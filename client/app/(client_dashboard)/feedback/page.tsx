import React from "react";
import Image from "next/image";
import { useLanguage, interpolate } from "@/lib/i18n/LanguageContext";

const testimonials = [1, 2, 3, 4];

export default function FeedbackPage() {
  const { t } = useLanguage();
  return (
    <section className="w-full min-h-scree py-20 px-4 md:px-10 lg:px-20 text-foreground">
      {/* Section Title */}
      <h2 className="text-xl md:text-2xl font-semibold text-primary mb-6">
        {interpolate(t.dashboard.feedback.title)}
      </h2>

      {/* Main Wrapper */}
      <div className="w-full bg-card rounded-3xl p-6 md:p-10 lg:p-14">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <button className="text-sm md:text-base text-foreground hover:text-primary transition flex items-center gap-2">
            {interpolate(t.dashboard.feedback.viewAll)} →
          </button>
          <p className="text-sm md:text-base text-foreground opacity-70">{interpolate(t.dashboard.feedback.clientFeedback)}</p>
        </div>

        {/* Heading */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-primary mb-12">
          {interpolate(t.dashboard.feedback.heading)}
        </h3>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((item) => (
            <div
              key={item}
              className="bg-secondary rounded-3xl p-6 shadow-lg"
            >
              {/* Profile */}
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-background">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Dazzle Healer</p>
                  <p className="text-sm text-foreground opacity-70">Front End Developer</p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-white mb-4" />

              {/* Stars */}
              <p className="text-lemon text-xl mb-3">★★★★★</p>

              {/* Text */}
              <p className="text-foreground opacity-80 text-sm leading-relaxed">
                {interpolate(t.dashboard.feedback.defaultTestimonial)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}