'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  History, 
  Download, 
  Share2, 
  Maximize2,
  Send,
  Loader2,
  FileText,
  FileSpreadsheet,
  Presentation,
  PanelRightClose,
  PanelRight,
  Edit3,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import Link from 'next/link';

export default function DocumentViewerClient({ id, type, name }: { id: string, type: 'doc' | 'sheet' | 'slide', name: string }) {
  const [loading, setLoading] = useState(true);
  const [showAiPanel, setShowAiPanel] = useState(true);
  const [activeTab, setActiveTab] = useState<'ai' | 'history' | 'comments'>('ai');
  const [aiLoading, setAiLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am Gemini. I can help you summarize this document or answer specific questions about its content. What would you like to do?' }
  ]);
  const [input, setInput] = useState('');
  const [accessStatus, setAccessStatus] = useState<'idle' | 'requesting' | 'pending' | 'granted'>('idle');

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setAiLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMessages, { role: 'ai', content: 'Based on the document content, the strategic roadmap focuses on three main pillars: Operational Excellence, Digital Transformation, and Sustainable Growth. The projected timeline for Phase 1 is Q3 2026.' }]);
      setAiLoading(false);
    }, 2000);
  };

  const handleRequestAccess = () => {
    setAccessStatus('requesting');
    // Simulate API request
    setTimeout(() => {
      setAccessStatus('pending');
    }, 2000);
  };

  const getDocConfig = () => {
    switch (type) {
      case 'sheet':
        return {
          icon: FileSpreadsheet,
          color: 'text-green-400',
          bgColor: 'bg-green-500/10',
          url: 'https://docs.google.com/spreadsheets/d/1eBy-Xv6oO_E89B1uY7I_Yv1Yv1Yv1Yv1Yv1Yv1Yv1Yv/preview',
          label: 'Spreadsheet'
        };
      case 'slide':
        return {
          icon: Presentation,
          color: 'text-orange-400',
          bgColor: 'bg-orange-500/10',
          url: 'https://docs.google.com/presentation/d/1eBy-Xv6oO_E89B1uY7I_Yv1Yv1Yv1Yv1Yv1Yv1Yv1Yv/preview',
          label: 'Presentation'
        };
      default:
        return {
          icon: FileText,
          color: 'text-blue-400',
          bgColor: 'bg-blue-500/10',
          url: 'https://docs.google.com/document/d/1eBy-Xv6oO_E89B1uY7I_Yv1Yv1Yv1Yv1Yv1Yv1Yv1Yv/preview',
          label: 'Document'
        };
    }
  };

  const config = getDocConfig();

  if (loading) {
    return <DocumentSkeleton />;
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 bg-card/50 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/document" className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center", config.bgColor, config.color)}>
              <config.icon size={20} />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm">{name}</h1>
              <div className="flex items-center gap-2 text-[10px] text-white/30 font-black uppercase tracking-wider">
                <span>{config.label} • ORR-{id.padStart(3, '0')}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>Last saved 2m ago</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 mr-4">
            <button className="p-2 text-white/40 hover:text-white transition-all"><Download size={18} /></button>
            <button className="p-2 text-white/40 hover:text-white transition-all"><Share2 size={18} /></button>
            <button className="p-2 text-white/40 hover:text-white transition-all"><Maximize2 size={18} /></button>
          </div>
          
          <button 
            onClick={accessStatus === 'idle' ? handleRequestAccess : undefined}
            disabled={accessStatus !== 'idle'}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all border",
              accessStatus === 'idle' && "bg-white/5 text-white hover:bg-white/10 border-white/10",
              accessStatus === 'requesting' && "bg-white/5 text-white/40 border-white/5 cursor-wait",
              accessStatus === 'pending' && "bg-orange-500/10 text-orange-400 border-orange-500/20",
              accessStatus === 'granted' && "bg-green-500/10 text-green-400 border-green-500/20"
            )}
          >
            {accessStatus === 'idle' && (
              <>
                <Edit3 size={16} />
                <span className="text-sm">Request Edit</span>
              </>
            )}
            {accessStatus === 'requesting' && (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm">Requesting...</span>
              </>
            )}
            {accessStatus === 'pending' && (
              <>
                <Clock size={16} />
                <span className="text-sm">Access Pending</span>
              </>
            )}
            {accessStatus === 'granted' && (
              <>
                <ShieldCheck size={16} />
                <span className="text-sm">Editing Enabled</span>
              </>
            )}
          </button>

          <div className="w-px h-8 bg-white/10 mx-2" />
          <button 
            onClick={() => setShowAiPanel(!showAiPanel)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all",
              showAiPanel ? "bg-primary text-black" : "bg-white/5 text-white/60 hover:text-white"
            )}
          >
            <Sparkles size={18} />
            {showAiPanel ? <PanelRightClose size={18} /> : <PanelRight size={18} />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Document Editor Area */}
        <div className="flex-1 bg-[#f8f9fa] relative flex flex-col">
          {/* Read-only Banner */}
          <AnimatePresence>
            {accessStatus !== 'granted' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-orange-500/10 border-b border-orange-500/20 px-6 py-2 flex items-center justify-between overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                    <Lock size={12} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-orange-400/80">
                    {accessStatus === 'pending' ? 'Your edit request is being reviewed by the owner' : 'You are currently in view-only mode'}
                  </span>
                </div>
                {accessStatus === 'idle' && (
                  <button 
                    onClick={handleRequestAccess}
                    className="text-[10px] font-black uppercase tracking-widest text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    Request Access
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-black/20 p-20 text-center">
              <iframe 
                src={config.url}
                className="w-full h-full border-none"
                title={`${config.label} Editor`}
              />
            </div>
          </div>
        </div>

        {/* Side Panels */}
        <AnimatePresence>
          {showAiPanel && (
            <motion.aside 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 400, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-card border-l border-white/10 flex flex-col overflow-hidden"
            >
              {/* Panel Tabs */}
              <div className="flex border-b border-white/10 p-2 gap-1">
                {[
                  { id: 'ai', icon: Sparkles, label: 'Gemini AI' },
                  { id: 'history', icon: History, label: 'Versions' },
                  { id: 'comments', icon: MessageSquare, label: 'Comments' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={clsx(
                      "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all",
                      activeTab === tab.id ? "bg-white/10 text-primary" : "text-white/40 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <tab.icon size={14} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeTab === 'ai' && (
                  <>
                    <div className="space-y-4">
                      {messages.map((msg, i) => (
                        <div key={i} className={clsx(
                          "p-4 rounded-2xl text-sm leading-relaxed",
                          msg.role === 'ai' ? "bg-primary/5 text-white/80 border border-primary/10" : "bg-white/5 text-white/60 ml-8"
                        )}>
                          {msg.role === 'ai' && <Sparkles size={14} className="text-primary mb-2" />}
                          {msg.content}
                        </div>
                      ))}
                      {aiLoading && (
                        <div className="flex items-center gap-2 text-primary text-xs font-bold animate-pulse">
                          <Loader2 size={14} className="animate-spin" />
                          Gemini is thinking...
                        </div>
                      )}
                    </div>
                  </>
                )}

                {activeTab === 'history' && (
                  <div className="space-y-4">
                    {[
                      { user: 'Sarah Chen', date: 'Today, 11:45 AM', action: 'Modified roadmap targets', version: 'v1.4' },
                      { user: 'Marcus Wright', date: 'Yesterday, 4:20 PM', action: 'Added Q3 projections', version: 'v1.3' },
                      { user: 'Sarah Chen', date: 'Apr 25, 10:10 AM', action: 'Initial draft completion', version: 'v1.2' },
                    ].map((item, i) => (
                      <div key={i} className="group p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-primary font-black text-[10px] uppercase tracking-widest">{item.version}</span>
                          <span className="text-white/30 text-[10px]">{item.date}</span>
                        </div>
                        <div className="text-white font-bold text-sm mb-1">{item.user}</div>
                        <div className="text-white/40 text-xs">{item.action}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Chat Input */}
              {activeTab === 'ai' && (
                <div className="p-6 bg-white/5 border-t border-white/10">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask Gemini about this doc..."
                      className="w-full bg-background border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white text-sm focus:border-primary/50 outline-none transition-all"
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              )}
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DocumentSkeleton() {
  return (
    <div className="h-screen bg-background flex flex-col animate-pulse">
      <div className="h-16 bg-card/50 border-b border-white/10 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-white/5" />
          <div className="space-y-2">
            <div className="w-48 h-4 bg-white/10 rounded" />
            <div className="w-24 h-2 bg-white/5 rounded" />
          </div>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 bg-white/5 m-10 rounded-3xl" />
        <div className="w-[400px] bg-card border-l border-white/10" />
      </div>
    </div>
  );
}
