"use client";

import React, { useState } from "react";
import { FiSearch, FiCheck, FiChevronDown } from "react-icons/fi";
import { useLanguage, interpolate } from "@/lib/i18n/LanguageContext";

export default function DashboardOverview() {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">

      <div className="relative z-10 mx-auto px-6 py-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
          <h1 className="text-[#13be77] text-2xl font-semibold">
            {interpolate(t.dashboard.catalogue.title)}
          </h1>

          <div className="w-full md:w-1/3">
            <div className="relative">
              <input
                placeholder={interpolate(t.dashboard.common.search)}
                className="w-full rounded-full border border-[#13be77] bg-transparent px-4 py-3 pl-5 text-sm outline-none placeholder:text-foreground/60"
              />
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-lemon" />
            </div>
          </div>
        </div>

        {/* MAIN WRAPPER */}
        <div className="bg-card border border-secondary rounded-3xl px-6 py-10 space-y-10">

          {/* TOP ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DIAGNOSE CARD */}
            <CardSection title={interpolate(t.dashboard.catalogue.stages.diagnose.title)}>
              <SmallLineChart />
              <CardDescription
                title={interpolate(t.dashboard.catalogue.stages.diagnose.heading)}
                text={interpolate(t.dashboard.catalogue.stages.diagnose.desc)}
              />
            </CardSection>

            {/* DEPLOY CARD */}
            <CardSection title={interpolate(t.dashboard.catalogue.stages.deploy.title)}>
              <SmallLineChart multi />
              <CardDescription
                title={interpolate(t.dashboard.catalogue.stages.deploy.heading)}
                text={interpolate(t.dashboard.catalogue.stages.deploy.desc)}
              />
            </CardSection>
          </div>

          {/* MIDDLE ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* GROW CARD */}
            <CardSection title={interpolate(t.dashboard.catalogue.stages.grow.title)}>
              <BarChart />
              <CardDescription
                title={interpolate(t.dashboard.catalogue.stages.grow.heading)}
                text={interpolate(t.dashboard.catalogue.stages.grow.desc)}
              />
            </CardSection>

            {/* DISCOVER CARD */}
            <CardSection title={interpolate(t.dashboard.catalogue.stages.discover.title)}>
              <Gauge />
              <CardDescription
                title={interpolate(t.dashboard.catalogue.stages.discover.heading)}
                text={interpolate(t.dashboard.catalogue.stages.discover.desc)}
              />
            </CardSection>
          </div>

          {/* DESIGN CARD */}
          <div className="bg-background rounded-xl border border-secondary p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold">{interpolate(t.dashboard.catalogue.stages.design.title)}</span>
              <button className="px-5 py-2 rounded-lg bg-lemon text-black font-semibold">
                {interpolate(t.dashboard.common.view)}
              </button>
            </div>

            <div className="text-sm font-semibold text-[#13be77] mb-2">
              {interpolate(t.dashboard.catalogue.stages.design.heading)}
            </div>

            <p className="text-sm text-foreground/70 leading-relaxed">
              {interpolate(t.dashboard.catalogue.stages.design.desc)}
            </p>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="mt-6 p-6 bg-background rounded-xl border border-secondary">
            <h2 className="text-xl text-[#13be77] font-semibold mb-4">{interpolate(t.dashboard.catalogue.recentActivity)}</h2>

            <div className="space-y-4">
              <RecentItem label={interpolate(t.dashboard.catalogue.items.docs)} />
              <RecentItem label={interpolate(t.dashboard.catalogue.items.designs)} />
              <RecentItem label={interpolate(t.dashboard.catalogue.items.actions)} />
            </div>
          </div>
        </div>
      </div>

      <div className="h-20" />
    </main>
  );
}

/* ------------------------ COMPONENTS ------------------------ */

function CardSection({ title, children }: any) {
  return (
    <div className="bg-background rounded-xl border border-secondary p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="w-3 h-3 rounded-full bg-lemon" />
      </div>
      {children}
    </div>
  );
}

function CardDescription({ title, text }: any) {
  return (
    <div className="mt-4">
      <div className="text-sm font-semibold text-[#13be77] mb-2 ">{title}</div>
      <p className="text-sm text-foreground/70 leading-relaxed">{text}</p>
    </div>
  );
}

function RecentItem({ label }: any) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-lemon rounded-xl overflow-hidden">
      <div 
        className="px-5 py-4 flex items-center justify-between font-medium cursor-pointer hover:bg-lemon/90 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <FiChevronDown className={`text-xl transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className="px-5 pb-4 bg-lemon/80">
          <p className="text-sm text-black/80">Additional details and information about this recent activity item would appear here when expanded.</p>
        </div>
      )}
    </div>
  );
}

/* ------------------------ CHARTS (SVG) ------------------------ */

function SmallLineChart({ multi }: any) {
  return (
    <svg viewBox="0 0 300 120" className="w-full h-28">
      {/* Grid lines */}
      <g stroke="var(--color-secondary)" strokeWidth="1">
        {[20, 40, 60, 80, 100].map((y, i) => (
          <line key={i} x1="0" x2="300" y1={y} y2={y} />
        ))}
      </g>

      {/* Single or Multi line chart */}
      <polyline
        fill="none"
        stroke="var(--color-lemon)"
        strokeWidth="2"
        points="0,90 60,70 120,50 180,60 240,75 300,80"
      />

      {multi && (
        <>
          <polyline
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            points="0,60 60,65 120,70 180,55 240,40 300,45"
          />
          <polyline
            fill="none"
            stroke="var(--color-secondary)"
            strokeWidth="2"
            points="0,95 60,85 120,55 180,50 240,70 300,90"
          />
        </>
      )}
    </svg>
  );
}

function BarChart() {
  return (
    <div className="w-full h-32 flex items-center justify-center">
      <img src="/images/barchart.png" alt="Bar Chart" className="w-full h-full object-contain" />
    </div>
  );
}

function Gauge() {
  return (
    <div className="flex items-center justify-center py-4">
      <img src="/images/speedometer.png" alt="Speedometer" className="w-48 h-32 object-contain" />
    </div>
  );
}

/* ------------------------ BACKGROUND STARS ------------------------ */

