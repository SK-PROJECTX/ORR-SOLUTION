"use client";

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useLanguage, interpolate } from '@/lib/i18n/LanguageContext';

interface WalletReceiptDocumentProps {
  transaction: {
    id: string;
    amount: number;
    currency: string;
    date: string;
    reference_id?: string;
    description: string;
  };
  user: {
    name: string;
    email: string;
  };
}

export default function WalletReceiptDocument({ transaction, user }: WalletReceiptDocumentProps) {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white text-black p-8 md:p-12 shadow-2xl rounded-sm max-w-4xl mx-auto font-sans min-h-[800px] print:min-h-0 flex flex-col relative overflow-hidden">
      {/* Top-up Stamp */}
      <div className="absolute top-20 right-10 -rotate-12 border-4 border-[#22C55E]/40 px-6 py-2 rounded-xl opacity-30 pointer-events-none select-none">
        <span className="text-4xl font-black text-[#22C55E] tracking-widest uppercase">TOP-UP</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start border-b-4 border-[#22C55E] pb-8 mb-10">
        <div className="space-y-4">
          <img src="/images/logo.svg" alt="Logo" className="h-16 w-auto" />
          <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-[#22C55E]">Wallet Receipt</h1>
            <p className="text-xl font-bold text-gray-400">#TXN-{String(transaction.id).substring(0, 8).toUpperCase()}</p>
          </div>
        </div>
        
        <div className="text-right space-y-2">
          <h2 className="text-2xl font-black text-gray-900">ORR Solutions</h2>
          <div className="text-sm text-gray-500 space-y-1">
            <p>123 Strategy Ave, Business City</p>
            <p>billing@orr.solutions</p>
            <p>+1 (555) 000-1111</p>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-12 flex items-center gap-6">
        <div className="bg-[#22C55E] p-3 rounded-full text-white">
          <CheckCircle className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-green-900">Top-Up Successful</h3>
          <p className="text-green-700">This receipt confirms that <span className="font-bold">{transaction.currency} {transaction.amount.toFixed(2)}</span> has been added to your wallet balance.</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-[#22C55E] border-b border-gray-100 pb-2">Client</h3>
          <div className="space-y-1">
            <p className="text-xl font-bold text-gray-900">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-[#22C55E] border-b border-gray-100 pb-2">Transaction Details</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <span className="text-gray-400 font-bold">Transaction Date:</span>
            <span className="text-gray-900 font-bold text-right">
              {new Date(transaction.date).toLocaleDateString()} {new Date(transaction.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-gray-400 font-bold">Method:</span>
            <span className="text-gray-900 font-bold text-right">Stripe Gateway</span>
            <span className="text-gray-400 font-bold">Ref ID:</span>
            <span className="text-gray-900 font-mono text-right truncate pl-4">{transaction.reference_id || transaction.id || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-auto border-t-2 border-gray-100 pt-8">
        <div className="flex justify-end">
          <div className="w-full max-w-xs space-y-3">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-gray-400">Transaction Type</span>
              <span className="text-gray-900">Wallet Credit</span>
            </div>
            <div className="flex justify-between items-center bg-[#22C55E] text-black p-4 rounded-sm">
              <span className="text-xs font-black uppercase tracking-widest">Total Added</span>
              <span className="text-2xl font-black">{transaction.currency} {transaction.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center space-y-4">
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          Thank you for choosing ORR Solutions. This credit is immediately available for settling invoices or purchasing services within the portal.
        </p>
        <div className="text-[10px] font-black text-[#22C55E] uppercase tracking-[0.2em]">
          Electronic Receipt - Automatically Generated
        </div>
      </div>
    </div>
  );
}
