'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background text-foreground"
    >
      {/* Shared Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
