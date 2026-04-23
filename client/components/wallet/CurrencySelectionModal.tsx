"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Euro, Check, Loader2 } from 'lucide-react';
import { useLanguage, interpolate } from '@/lib/i18n/LanguageContext';

interface CurrencySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (currency: 'USD' | 'EUR') => Promise<void>;
  isLoading?: boolean;
}

export default function CurrencySelectionModal({ isOpen, onClose, onSelect, isLoading }: CurrencySelectionModalProps) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<'USD' | 'EUR'>('USD');

  const handleConfirm = async () => {
    await onSelect(selected);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#071626] border border-[#1E3A4B] rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#22C55E]/10 blur-[80px] rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full" />

            <div className="relative z-10 text-center space-y-8">
              <div className="space-y-3">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                   {interpolate(t.dashboard.account.personalization.currency)}
                </h2>
                <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                  To provide a better experience for our European clients, we've introduced Euro support. Please select your preferred currency.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'USD', name: 'US Dollar', symbol: '$', icon: DollarSign, color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
                  { id: 'EUR', name: 'Euro', symbol: '€', icon: Euro, color: 'bg-[#22C55E]/10 border-[#22C55E]/20 text-[#22C55E]' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelected(item.id as 'USD' | 'EUR')}
                    className={`relative group flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all duration-300 ${
                      selected === item.id 
                        ? 'border-[#22C55E] bg-[#22C55E]/10 shadow-[0_0_20px_rgba(34,197,94,0.1)]' 
                        : 'border-[#1E3A4B] bg-[#0A1F30] hover:border-[#22C55E]/50'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${item.color}`}>
                      <item.icon size={28} />
                    </div>
                    <span className="text-lg font-bold text-white mb-1">{item.name}</span>
                    <span className="text-gray-500 font-medium">{item.id} ({item.symbol})</span>

                    {selected === item.id && (
                      <motion.div
                        layoutId="active-check"
                        className="absolute top-3 right-3 w-6 h-6 bg-[#22C55E] rounded-full flex items-center justify-center"
                      >
                        <Check size={14} className="text-black font-bold" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-4 px-6 rounded-2xl text-gray-400 font-bold hover:bg-white/5 transition-all"
                >
                  {interpolate(t.dashboard.common.cancel)}
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="flex-[2] py-4 px-6 bg-[#22C55E] hover:bg-[#16A34A] text-black font-black rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_30px_-10px_rgba(34,197,94,0.5)] flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : (
                    interpolate(t.dashboard.account.personalization.save)
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
