"use client";

import React, { useState } from 'react';
import { X, CreditCard, ChevronRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useWalletStore } from '@/store/walletStore';
import { useLanguage, interpolate } from '@/lib/i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TopUpModal({ isOpen, onClose }: TopUpModalProps) {
  const { t } = useLanguage();
  const { paymentMethods, initiateTopUp, isLoading } = useWalletStore();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<number | ''>('');
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const presetAmounts = [20, 50, 100, 200, 500];

  const handleNext = () => {
    if (step === 1 && amount) setStep(2);
    else if (step === 2 && selectedCard) handleConfirm();
  };

  const handleConfirm = async () => {
    if (!amount || !selectedCard) return;
    
    setStatus('processing');
    try {
      const checkoutUrl = await initiateTopUp(Number(amount), selectedCard);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        setStatus('success');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#071626] border border-[#1E3A4B] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1E3A4B]">
          <h3 className="text-xl font-bold text-white">
            {interpolate(t.dashboard.account.wallet.modals.topUp.title)}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div
                key="step-flow"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Progress Indicators */}
                <div className="flex items-center gap-2 mb-8">
                  <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-[#22C55E]' : 'bg-[#1E3A4B]'}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-[#22C55E]' : 'bg-[#1E3A4B]'}`}></div>
                </div>

                {step === 1 ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-3">
                        {interpolate(t.dashboard.account.wallet.modals.topUp.amount)}
                      </label>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {presetAmounts.map((amt) => (
                          <button
                            key={amt}
                            onClick={() => setAmount(amt)}
                            className={`py-2 px-4 rounded-lg border transition-all ${
                              amount === amt 
                                ? 'bg-[#22C55E] border-[#22C55E] text-black font-bold' 
                                : 'bg-[#0A1F30] border-[#1E3A4B] text-white hover:border-[#22C55E]'
                            }`}
                          >
                            ${amt}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          type="number"
                          placeholder="Custom amount"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="w-full bg-[#0A1F30] border border-[#1E3A4B] rounded-xl py-3 pl-8 pr-4 text-white focus:border-[#22C55E] outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-3">
                        {interpolate(t.dashboard.account.wallet.modals.topUp.paymentMethod)}
                      </label>
                      <div className="space-y-3">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setSelectedCard(method.id)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                              selectedCard === method.id
                                ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#22C55E]'
                                : 'bg-[#0A1F30] border-[#1E3A4B] text-gray-300 hover:border-[#22C55E]/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <CreditCard size={20} />
                              <div className="text-left">
                                <p className="font-semibold text-sm capitalize">{method.brand} •••• {method.last4}</p>
                                <p className="text-xs opacity-60">Exp: {method.exp_month}/{method.exp_year}</p>
                              </div>
                            </div>
                            {selectedCard === method.id && <CheckCircle2 size={18} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex gap-3">
                  {step === 2 && (
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 px-4 rounded-xl border border-[#1E3A4B] text-white font-semibold hover:bg-[#1E3A4B] transition-colors"
                    >
                      {interpolate(t.onboarding.back)}
                    </button>
                  )}
                  <button
                    disabled={step === 1 ? !amount : !selectedCard}
                    onClick={handleNext}
                    className={`flex-[2] py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      (step === 1 ? amount : selectedCard)
                        ? 'bg-[#22C55E] text-black hover:bg-[#16A34A] shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                        : 'bg-[#1E3A4B] text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {step === 1 ? interpolate(t.onboarding.next) : interpolate(t.dashboard.account.wallet.modals.topUp.confirm)}
                    <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {status === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <Loader2 className="w-16 h-16 text-[#22C55E] animate-spin mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">
                  {interpolate(t.dashboard.account.wallet.modals.topUp.processing)}
                </h4>
                <p className="text-gray-400 text-sm">Please do not close this window</p>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-[#22C55E]/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-[#22C55E]" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">
                  {interpolate(t.dashboard.account.wallet.modals.topUp.success)}
                </h4>
                <p className="text-gray-400 mb-8">Your balance has been updated successfully.</p>
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-[#22C55E] text-black font-bold rounded-xl hover:bg-[#16A34A] transition-all"
                >
                  Done
                </button>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                  <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">
                  {interpolate(t.dashboard.account.wallet.modals.topUp.error)}
                </h4>
                <p className="text-gray-400 mb-8">Something went wrong. Please try again.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="w-full py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all"
                >
                  Retry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
