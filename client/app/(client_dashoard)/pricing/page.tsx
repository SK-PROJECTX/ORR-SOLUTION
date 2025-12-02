import PackagePreviewSection from "@/app/components/PackagePreviewSection";
import React from "react";

export default function PricingPage() {
  return (
    <div className="min-h-screen  text-white p-6 sm:p-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-green-500/30 rounded-full blur-[180px] absolute left-1/2 -translate-x-1/2 top-40" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between ">

        {/* Header */}
        <h1 className="text-3xl font-semibold text-[#22C55E] mb-6">Pricing page</h1>

        {/* Search Bar */}
        <div className="w-full max-w-md mx-auto mb-14">
          <div className="relative">
            <input
              placeholder="Search anything here..."
              className="w-full rounded-full py-3 pl-5 pr-12 bg-card border border-[#2b3538] text-sm focus:outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#22C55E] text-lg">🔍</span>
          </div>
        </div>
        </div>
      <PackagePreviewSection />

      </div>
    </div>
  );
}
