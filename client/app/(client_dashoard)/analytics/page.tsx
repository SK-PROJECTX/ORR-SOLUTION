"use client";

import Image from "next/image";
import React from "react";

/**
 * Dashboard page (app/dashboard/page.tsx)
 * - Pure Tailwind + SVG charts (no chart libraries)
 * - Uses local background: /mnt/data/ab858331-775d-444f-8c39-b2c344898b97.png
 */

type CardProps = {
  title?: string;
  children: React.ReactNode;
  compact?: boolean;
  badge?: boolean;
  footer?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, children, compact, badge, footer }) => (
  <div
    className={`bg-card border border-[#232323] rounded-xl p-5 shadow-sm ${
      compact ? "p-4" : ""
    }`}
  >
    {title && (
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-semibold text-[#9fffcf]">{title}</h3>
        {badge && (
          <div className="w-5 h-5 rounded-full bg-[#0fdc95] flex items-center justify-center text-black text-xs">i</div>
        )}
      </div>
    )}
    <div className="text-sm text-[#d1d1d1]">{children}</div>
    {footer && <div className="mt-4 text-xs text-[#9fe8c8]">{footer}</div>}
  </div>
);

/* --- Small custom SVG charts --- */

/* Line chart with two series and dotted vertical marker */
const TwoLineChart: React.FC = () => (
  <svg viewBox="0 0 360 140" className="w-full h-36">
    <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
    {/* grid lines */}
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1="20" x2="340" y1={20 + i * 30} y2={20 + i * 30} stroke="#2a2a2a" strokeWidth="1" />
    ))}
    {/* x labels */}
    <text x="30" y="130" fill="#7dbf9f" fontSize="10">25.02</text>
    <text x="100" y="130" fill="#7dbf9f" fontSize="10">26.02</text>
    <text x="170" y="130" fill="#7dbf9f" fontSize="10">27.02</text>
    <text x="240" y="130" fill="#7dbf9f" fontSize="10">28.02</text>
    <text x="310" y="130" fill="#7dbf9f" fontSize="10">29.02</text>

    {/* teal line */}
    <path d="M30 80 C60 70 90 60 120 75 C150 90 180 65 210 80 C240 95 270 70 300 85" fill="none" stroke="#1fe6b2" strokeWidth="3" strokeLinecap="round" />
    {/* red line */}
    <path d="M30 100 C60 85 90 120 120 70 C150 40 180 100 210 60 C240 35 270 100 300 85" fill="none" stroke="#e94b4b" strokeWidth="3" strokeLinecap="round" />

    {/* dotted vertical marker */}
    <line x1="170" x2="170" y1="18" y2="110" stroke="#3aa67a" strokeDasharray="3 4" strokeWidth="1.5" />
    <circle cx="170" cy="50" r="4" fill="#e94b4b" stroke="#fff" strokeWidth="1" />
  </svg>
);

/* Small multi-line spark-like chart for "Deploy" */
const MultiSparkChart: React.FC = () => (
  <svg viewBox="0 0 240 110" className="w-full h-28">
    {[0,1,2].map((i) => (
      <path
        key={i}
        d={`M10 ${70 - i*6} C40 ${50 + i*10} 80 ${30 + i*12} 120 ${60 - i*6} C160 ${90 - i*8} 200 ${55 + i*8} 230 ${65 - i*4}`}
        fill="none"
        stroke={i===0? "#1fe6b2": i===1? "#7bd2c1": "#e89ad6"}
        strokeWidth={1.8}
        strokeDasharray={i===1 ? "4 3" : "0"}
        opacity={0.95}
      />
    ))}
    {/* grid */}
    {[0,1].map((i)=> <line key={i} x1="10" x2="230" y1={20 + i*30} y2={20 + i*30} stroke="#2a2a2a" strokeWidth="1" />)}
    <text x="12" y="100" fill="#7dbf9f" fontSize="10">25.02</text>
    <text x="60" y="100" fill="#7dbf9f" fontSize="10">26.02</text>
    <text x="110" y="100" fill="#7dbf9f" fontSize="10">27.02</text>
    <text x="160" y="100" fill="#7dbf9f" fontSize="10">28.02</text>
    <text x="210" y="100" fill="#7dbf9f" fontSize="10">29.02</text>
  </svg>
);

/* Vertical bar chart for Grow */
const VerticalBars: React.FC = () => (
  <svg viewBox="0 0 200 110" className="w-full h-28">
    {/* bars (Mon..Sun) heights */}
    { [60, 20, 35, 14, 70, 50, 40].map((h, idx) => {
      const x = 12 + idx * 26;
      return <rect key={idx} x={x} y={100 - h} width="16" height={h} rx="3" fill="#15dba3" />;
    })}
    {/* x labels */}
    {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => <text key={i} x={12 + i * 26} y="105" fontSize="8" fill="#7dbf9f">{d}</text>)}
  </svg>
);

/* Semi-circle gauge for Discover */
const SemiGauge: React.FC = () => (
  <svg viewBox="0 0 200 120" className="w-full h-36">
    {/* background arc */}
    <path d="M30 90 A70 70 0 0 1 170 90" fill="none" stroke="#1e8170" strokeWidth="14" opacity="0.3" strokeLinecap="round" />
    {/* active arc */}
    <path d="M30 90 A70 70 0 0 1 148 48" fill="none" stroke="#1fe6b2" strokeWidth="14" strokeLinecap="round" />
    {/* end circles */}
    <circle cx="30" cy="90" r="6" fill="#1fe6b2" />
    <circle cx="148" cy="48" r="8" fill="#1fe6b2" stroke="#0a0a0a" strokeWidth="2" />
  </svg>
);

export default function Analytics() {
  return (
    <main className="min-h-screen star text-slate-100 relative font-poppins">
      {/* starfield background (local image) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/mnt/data/ab858331-775d-444f-8c39-b2c344898b97.png"
          alt="stars"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-[1080px] mx-auto px-6 py-8">
        {/* small header */}
        <header className="flex items-center gap-6 mb-6">
          <h1 className="text-[#12e6b0] font-semibold">Dashboard overview</h1>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                className="w-full rounded-full bg-[#0f0f0f] border border-[#222] px-4 py-2 placeholder:text-[#6ea991] focus:outline-none"
                placeholder="Search anything here..."
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#12e6b0]">🔍</div>
            </div>
          </div>
        </header>

        {/* grid layout */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top row: Diagnose & Deploy */}
          <div className="space-y-6">
            <Card title="Diagnose" badge footer={
              <div>
                <div className="text-[#54f4b4] font-semibold">Diagnose — We find root causes.</div>
                <div className="mt-2 text-xs text-[#bfc6c1]">
                  We identify bottlenecks, compliance gaps, system failures, and missed data or environmental signals — always prioritised by impact on your customers and team.
                </div>
              </div>
            }>
              <TwoLineChart />
            </Card>

            {/* Grow */}
            <Card title="Grow" badge footer={
              <div>
                <div className="text-[#54f4b4] font-semibold">Grow — We optimise over time.</div>
                <div className="mt-2 text-xs text-[#bfc6c1]">
                  We monitor, refine, and help you scale intelligently, keeping a feedback loop open with you and your stakeholders.
                </div>
              </div>
            }>
              <div className="w-full h-28">
                <VerticalBars />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Deploy" badge footer={
              <div>
                <div className="text-[#54f4b4] font-semibold">Deploy — We put them to work together.</div>
                <div className="mt-2 text-xs text-[#bfc6c1]">
                  We implement with minimal disruption, adapting to how your people work today while preparing them for tomorrow.
                </div>
              </div>
            }>
              <MultiSparkChart />
            </Card>

            <Card title="Discover" badge footer={
              <div>
                <div className="text-[#54f4b4] font-semibold">Discover — We listen</div>
                <div className="mt-2 text-xs text-[#bfc6c1]">
                  You tell us what's happening. We map your context, pressures, and goals — and what "good" looks like for you.
                </div>
              </div>
            }>
              <div className="w-full h-36">
                <SemiGauge />
              </div>
            </Card>
          </div>

          {/* Full-width bottom card: Design */}
          <div className="md:col-span-2">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[#9fe8c8] font-semibold">Design</h4>
                  <div className="mt-2 text-[#54f4b4] font-semibold">Design — We shape solutions with you.</div>
                  <p className="mt-2 text-xs text-[#bfc6c1]">
                    We propose clear, actionable structures that fit your reality: advisory roadmaps, systems, AI helpers, and, where relevant, living-systems projects.
                  </p>
                </div>
                <div>
                  <button className="bg-[#05cf86] text-black px-4 py-2 rounded-md">View</button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
