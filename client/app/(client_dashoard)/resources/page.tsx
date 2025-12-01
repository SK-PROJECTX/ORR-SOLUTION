"use client";

import React, { useState } from "react";
import { FiSearch, FiMoreHorizontal, FiPlus } from "react-icons/fi";

/**
 * Notes:
 * - Replace placeholder icons (colored squares) with actual images or <img src="..." />
 * - Tailwind classes assume your tailwind config supports the default palette.
 * - The starry background is simulated with CSS pseudo-element (.stars-bg).
 */

const resources = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  title: ["Design tools", "Premium Support", "Slack Bot", "Developer First", "Looking great", "Premium Support"][i % 6],
  excerpt:
    "You have the opportunity to play this game of life you need to appreciate every moment.",
  participants: 10 + i,
  date: "20.06.22",
}));

const faqs = [
  { q: "Why should I use Butter?", a: "Butter helps run sessions, manage participants, and ship outcomes fast." },
  { q: "What types of sessions is Butter best for?", a: "Workshops, interviews, onboarding, product demos and collaborative sessions." },
  { q: "Is Butter free?", a: "Butter has a generous free tier — premium features are paid." },
  { q: "How many participants can join a Butter session?", a: "Up to several thousands depending on plan and feature." },
  { q: "Do you provide templates?", a: "Yes — templates for workshops, retros, etc." },
];

export default function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({});

  const filtered = resources.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="relative z-10 mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <h1 className="text-primary text-2xl md:text-3xl font-semibold">Resources</h1>

          <div className="w-full md:w-1/3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anything here..."
                className="w-full rounded-full border border-primary bg-transparent px-4 py-3 pl-5 text-sm outline-none placeholder:opacity-60 text-foreground"
              />
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" />
            </div>
          </div>
        </div>


        {/* Frame container */}
        <div className="bg-card rounded-2xl p-6 md:p-8shadow-inner">
          <div className="bg-secondary rounded-md px-4 py-3 mb-6 text-sm text-foreground opacity-70">
            Access shared documents, guides, or training materials
          </div>

          {/* Resource grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="flex flex-col gap-3 bg-secondary rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Placeholder icon square */}
                  <div className="w-12 h-12 rounded-md flex-shrink-0 bg-primary flex items-center justify-center text-background font-bold">
                    {r.title[0]}
                  </div>

                  <div className="flex-1 pl-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{r.title}</h3>
                      <div className="flex items-center gap-2">
                        <FiMoreHorizontal className="text-foreground opacity-60" />
                      </div>
                    </div>

                    <p className="text-xs text-foreground opacity-70 mt-2">{r.excerpt}</p>

                    <div className="flex items-center justify-between text-xs text-foreground opacity-60 mt-4">
                      <div>
                        <div>{r.participants} Participants</div>
                      </div>
                      <div>{r.date}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* bottom spacing so FAQ is separate */}
          <div className="h-12 " />
        </div>

        {/* FAQ heading */}
        <section className="mt-12">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground">
            <span className="block">What.</span>
            <span className="block">The. <span className="text-primary">FAQ?</span></span>
          </h2>

          <div className="mt-8 space-y-4">
            {faqs.map((f, idx) => {
              const isOpen = !!openFaq[idx];
              return (
                <div key={idx} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenFaq((s) => ({ ...s, [idx]: !s[idx] }))}
                    className={`w-full text-left px-6 py-4 rounded-xl bg-card flex items-center justify-between gap-4 transition ${
                      isOpen ? "shadow-lg" : "shadow-sm"
                    }`}
                  >
                    <span className="font-medium text-foreground">{f.q}</span>
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary">
                      <FiPlus className={`transform transition text-primary ${isOpen ? "rotate-45" : ""}`} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-2 px-6 py-4 bg-secondary rounded-lg text-sm text-foreground opacity-80">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* small footer spacer */}
      <div className="h-24" />
    </main>
  );
}
