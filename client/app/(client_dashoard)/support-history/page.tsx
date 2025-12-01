"use client";

import { useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

export default function SupportHistory() {
  const alerts = [
    {
      text: "A simple primary alert with an example link. Give it a click if you like.",
      date: "01/09/2025",
      color: "from-[#21E67A] to-[#0DBF66]",
    },
    {
      text: "A simple primary alert with an example link. Give it a click if you like.",
      date: "01/09/2025",
      color: "from-[#21E67A] to-[#0DBF66]",
    },
    {
      text: "A simple success alert with an example link. Give it a click if you like.",
      date: "01/09/2025",
      color: "from-[#21E67A] to-[#0DBF66]",
    },
    {
      text: "A simple danger alert with an example link. Give it a click if you like.",
      date: "01/09/2025",
      color: "from-[#21E67A] to-[#0DBF66]",
    },
    {
      text: "A simple warning alert with an example link. Give it a click if you like.",
      date: "01/09/2025",
      color: "from-[#21E67A] to-[#0DBF66]",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen w-full text-white p-6 md:p-12">
      {/* ========== Top Header ========== */}
      <div className=" mx-auto">
        <div className="flex ">
          <h1 className="text-[#4EFFA1] text-xl font-semibold mb-6 text-nowrap">
            Support history
          </h1>
          <div className="w-full flex justify-center mb-10">
            <div className="w-full max-w-xl bg-card border border-[#21E67A] rounded-full px-5 py-3 flex items-center">
              <input
                placeholder="Search anything here..."
                className="flex-1 bg-card outline-none text-sm placeholder-gray-400"
              />
              <FiSearch className="text-[#21E67A] text-lg" />
            </div>
          </div>
        </div>

        {/* Search Bar */}

        <div className="bg-card p-4 rounded-3xl">
          {/* ========== Main Card ========== */}
          <div className="w-full bg-background rounded-3xl p-10 shadow-lg relative border border-[#2E3B45]">
            <h2 className="text-2xl font-semibold mb-10">History</h2>

            {/* Vertical accent line */}
            <div className="absolute left-10 top-32 bottom-10 w-[4px] bg-[#21E67A] rounded-full" />

            {/* Alerts List */}
            <div className="flex flex-col gap-6 ml-10">
              {alerts.map((alert, i) => (
                <div
                  key={i}
                  className={`w-full bg-gradient-to-r ${alert.color} rounded-xl p-6 pr-12 relative cursor-pointer transition-all`}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <p className="text-sm mb-2">{alert.text}</p>
                  <p className="text-sm opacity-80">Date: {alert.date}</p>

                  {/* Dropdown Icon */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    <FiChevronDown
                      className={`text-white text-xl transition-all ${
                        openIndex === i ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Expanded Section */}
                  {openIndex === i && (
                    <div className="mt-4 text-sm text-white/90">
                      Additional details about this alert appear here when
                      opened.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
