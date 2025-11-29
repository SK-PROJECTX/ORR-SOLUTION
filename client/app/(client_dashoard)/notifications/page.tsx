"use client";

import { Search, X } from "lucide-react";
import React from "react";

const alerts = [
  { color: "bg-lemon", text: "A simple primary alert with an example link. Give it a click if you like." },
  { color: "bg-secondary", text: "A simple secondary alert with an example link. Give it a click if you like." },
  { color: "bg-primary", text: "A simple success alert with an example link. Give it a click if you like." },
  { color: "bg-lemon/80", text: "A simple danger alert with an example link. Give it a click if you like." },
  { color: "bg-secondary/80", text: "A simple warning alert with an example link. Give it a click if you like." },
  { color: "bg-primary/80", text: "A simple info alert with an example link. Give it a click if you like." },
  { color: "bg-card", text: "A simple light alert with an example link. Give it a click if you like." },
  { color: "bg-background", text: "A simple dark alert with an example link. Give it a click if you like." },
];

export default function NotificationPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground font-poppins relative overflow-x-hidden">

      {/* Background dots */}
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30 pointer-events-none"></div>

      {/* Search bar & header */}
      <div className="w-full flex flex-col items-center pt-10 relative z-10">
        <h1 className="text-[28px] font-semibold text-lemon mr-auto ml-20">
          Notification
        </h1>

        <div className="w-[380px] h-[48px] mt-4 bg-card rounded-full px-6 flex items-center border border-secondary">
          <input
            type="text"
            placeholder="Search anything here..."
            className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-foreground/50"
          />
<Search size={16}/>
        </div>
      </div>

      {/* Main curved container */}
      
      <div
        className="
        w-[90%] mx-auto mt-12
        rounded-[40px]
        border-[6px]
        border-secondary
        bg-card/70
        backdrop-blur-md
        p-10
        relative
        shadow-[0_0_40px_rgba(0,255,180,0.15)]
        "
      >
        <h2 className="text-[22px] font-semibold text-lemon mb-6">
          Alert
        </h2>

        <div className="flex flex-col gap-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`bg-lemon flex justify-between items-center px-5 py-3 rounded-lg shadow-[0_0_12px_theme(colors.lemon/25)] border border-secondary/30`}
            >
              <p className="text-[14px] text-foreground">
                {alert.text}{" "}
              </p>
              <X className="cursor-pointer" size={18} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
