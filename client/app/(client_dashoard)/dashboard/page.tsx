"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip } from 'recharts';

// Stat type for components
interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  small?: boolean;
}

const data = [
  { name: "1", low: 300, high: 100 },
  { name: "2", low: 290, high: 110 },
  { name: "3", low: 210, high: 90 },
  { name: "4", low: 260, high: 130 },
  { name: "5", low: 240, high: 120 },
  { name: "6", low: 150, high: 80 },
  { name: "7", low: 280, high: 130 },
  { name: "8", low: 210, high: 140 },
  { name: "9", low: 190, high: 110 },
  { name: "10", low: 170, high: 120 },
];

const StatBox: React.FC<StatProps> = ({ icon, title, value, small }) => {
  return (
    <div className="flex-1 bg-background rounded-xl p-5 shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          {icon}
        </div>
        <p className="text-sm text-primary font-medium">{title}</p>
      </div>
      <p className={`font-extrabold ${small ? "text-3xl" : "text-4xl"} text-lemon mb-3 text-center`}>
        {value}
      </p>
      <div className="w-full h-1 bg-secondary rounded-full">
        <div className="h-full w-3/4 bg-lemon rounded-full"></div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <main className="min-h-full p-6 bg-background text-foreground relative">
      <div className=" mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between gap-6 mb-6">
          <h1 className="text-2xl font-bold text-primary">Dashboard</h1>

          <div className="flex-1 max-w-lg">
            <div className="relative">
              <input
                className="w-full rounded-full py-2 px-4 bg-card text-foreground placeholder:opacity-60 border border-[#13be77] outline-none"
                placeholder="Search anything here..."
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                🔍
              </div>
            </div>
          </div>
        </header>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left side */}
          <section className="lg:col-span-8 space-y-6">
            {/* Overview card */}
            <div className="bg-card border border-secondary rounded-xl p-6 shadow-xl">
              <h2 className="text-primary font-semibold mb-4">
                Overview of active services or projects
              </h2>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left counter */}
                <div className="w-full lg:w-40">
                  <div className="text-5xl font-extrabold text-lemon">
                    300
                  </div>
                  <p className="text-xs text-foreground opacity-70 mt-2">
                    Page views per minute
                  </p>

                  <div className="mt-6 border-l border-secondary pl-3">
                    <div className="h-8 w-12 bg-secondary rounded-md mb-3 flex items-center justify-center">
                      📄
                    </div>
                    <p className="text-xs text-foreground opacity-70">
                      Upgrade your payout method in setting
                    </p>
                  </div>
                </div>

                {/* Chart */}
                <div className="flex-1 bg-gradient-primary rounded-lg p-5">
                        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <defs>
            <linearGradient id="lowBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            <linearGradient id="highBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0A2342" />
              <stop offset="100%" stopColor="#0A2342" />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="#ffffff55"
            strokeDasharray="4 4"
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={[100, 200, 300]}
            tick={{ fill: "white", fontSize: 16 }}
          />

          <XAxis hide />
          {/* <Tooltip cursor={false} /> */}

          {/* White bottom bar */}
          <Bar
            dataKey="low"
            stackId="stack"
            fill="url(#lowBar)"
            barSize={6}
            radius={[0, 0, 20, 20]}
          />

          {/* Dark top bar */}
          <Bar
            dataKey="high"
            stackId="stack"
            fill="url(#highBar)"
            barSize={6}
            radius={[20, 20, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>


                </div>
              </div>

              {/* Four stat cards */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <StatBox icon={"👥"} title="Users" value="35k" small />
                <StatBox icon={"🖱️"} title="Clicks" value="1m" small />
                <StatBox icon={"💸"} title="Sales" value="345$" small />
                <StatBox icon={"📦"} title="Items" value="68" small />
              </div>
            </div>

            {/* Sales by Age */}
            <div className="bg-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-primary font-semibold">Sales by Age</h3>
                <div className="text-xs text-primary">• Sales</div>
              </div>

              <div className="bg-secondary rounded-lg p-4 mt-2">
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={[
                    { age: 10, sales: 120 },
                    { age: 20, sales: 180 },
                    { age: 30, sales: 90 },
                    { age: 40, sales: 200 },
                    { age: 50, sales: 150 },
                    { age: 60, sales: 170 },
                    { age: 70, sales: 110 },
                    { age: 80, sales: 190 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-secondary)" />
                    <XAxis dataKey="age" stroke="var(--color-primary)" />
                    <YAxis stroke="var(--color-primary)" />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="var(--color-lemon)" 
                      strokeWidth={3}
                      dot={{ fill: 'var(--color-lemon)', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Right sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl p-5">
              <h4 className="text-[#6ff3ab] font-semibold">
                Your earning this month
              </h4>
              <p className="mt-4 text-4xl font-extrabold text-[#62f39a]">
                735.2$
              </p>
              <p className="text-xs text-[#88e8c6] mt-2">
                Update your payout method in Setting
              </p>
              <button className="mt-4 w-full py-2 rounded-lg bg-[#042f2f] text-[#8df6c9] border border-[#0f6b5e]">
                Withdraw All Earnings
              </button>
            </div>

            <div className="bg-card rounded-xl p-5">
              <h5 className="text-[#6ff3ab] font-semibold mb-3">
                Earnings by item
              </h5>

              <div className="space-y-3">
                {[
                  "Bento 3D Kit - Illustration",
                  "Bento 3D Kit - Coded Template",
                  "Bento 3D Kit - Illustration",
                ].map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-[#082b2f] p-3 rounded-md"
                  >
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#12b48f] to-[#22e6c6] flex items-center justify-center">
                      📦
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#bff6d9]">{t}</p>
                      <p className="text-xs text-[#86f1b9]">Illustration</p>
                    </div>
                    <span className="text-[#7df09a]">›</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-4">
              <h6 className="text-[#6ff3ab] font-semibold mb-4">Impression Trends</h6>

              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { day: 'Mon', impressions: 120 },
                    { day: 'Tue', impressions: 180 },
                    { day: 'Wed', impressions: 90 },
                    { day: 'Thu', impressions: 200 },
                    { day: 'Fri', impressions: 150 },
                    { day: 'Sat', impressions: 170 },
                    { day: 'Sun', impressions: 140 }
                  ]}>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'var(--color-primary)', fontSize: 10 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'var(--color-primary)', fontSize: 10 }}
                    />
                    <Bar 
                      dataKey="impressions" 
                      fill="var(--color-lemon)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
