'use client';

import React, { useState } from 'react';
import { 
  History, 
  Download, 
  Eye, 
  Edit3, 
  Lock, 
  Unlock, 
  Share2, 
  Search,
  Filter,
  Calendar,
  FileText,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const MOCK_ACTIVITY = [
  { id: 1, user: 'You', action: 'Downloaded', item: 'Financial Projections Q3', type: 'sheet', time: '10 minutes ago', icon: Download, color: 'text-blue-400' },
  { id: 2, user: 'You', action: 'Viewed', item: 'Strategic Roadmap 2026', type: 'doc', time: '1 hour ago', icon: Eye, color: 'text-primary' },
  { id: 3, user: 'System', action: 'Unlocked', item: 'Audit Report Draft', type: 'doc', time: '3 hours ago', icon: Unlock, color: 'text-green-400' },
  { id: 4, user: 'You', action: 'Edited', item: 'Board Presentation - April', type: 'slide', time: 'Yesterday, 5:45 PM', icon: Edit3, color: 'text-orange-400' },
  { id: 5, user: 'You', action: 'Shared', item: 'Market Analysis', type: 'doc', time: 'Yesterday, 11:20 AM', icon: Share2, color: 'text-purple-400' },
  { id: 6, user: 'You', action: 'Attempted Access', item: 'Proprietary Research X', type: 'doc', time: '2 days ago', icon: Lock, color: 'text-red-400' },
];

export default function ActivityLog() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
          <History className="text-primary w-8 h-8" />
          Activity Log
        </h1>
        <p className="text-white/60 text-sm">Track your interactions and document history across the workspace.</p>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Views', value: '1,284', delta: '+12%', icon: Eye },
          { label: 'Downloads', value: '432', delta: '+5%', icon: Download },
          { label: 'Edits', value: '89', delta: '+22%', icon: Edit3 },
          { label: 'Shared', value: '15', delta: '0%', icon: Share2 },
        ].map((stat, i) => (
          <div key={i} className="bg-card/30 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-white/40">
                <stat.icon size={18} />
              </div>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">{stat.delta}</span>
            </div>
            <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
            <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input 
            type="text" 
            placeholder="Search activity history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-white text-sm focus:border-primary/50 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white transition-all text-xs font-bold">
            <Calendar size={14} />
            Date Range
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white transition-all text-xs font-bold">
            <Filter size={14} />
            Filter Type
          </button>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {MOCK_ACTIVITY.map((activity, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            key={activity.id}
            className="group bg-card/30 hover:bg-card/60 border border-white/10 rounded-3xl p-5 flex items-center justify-between gap-6 transition-all"
          >
            <div className="flex items-center gap-5">
              <div className={clsx("w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shadow-xl transition-transform group-hover:scale-110", activity.color)}>
                <activity.icon size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold text-sm">{activity.user}</span>
                  <span className="text-white/40 text-xs font-medium">{activity.action.toLowerCase()}</span>
                  <span className="text-white font-bold text-sm">"{activity.item}"</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-black uppercase tracking-wider">
                    <Clock size={12} />
                    {activity.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-black uppercase tracking-wider">
                    <FileText size={12} />
                    {activity.type}
                  </div>
                </div>
              </div>
            </div>

            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest">
              View Item
            </button>
          </motion.div>
        ))}
      </div>

      {/* Pagination Placeholder */}
      <div className="mt-10 flex justify-center">
        <button className="text-white/30 hover:text-primary transition-colors text-xs font-black uppercase tracking-[0.3em]">
          Load Older Activity
        </button>
      </div>
    </div>
  );
}
