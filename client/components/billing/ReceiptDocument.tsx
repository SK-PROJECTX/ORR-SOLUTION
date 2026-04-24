"use client";
import React from 'react';
import { Invoice, InvoiceSettings } from '@/store/invoiceStore';
import { CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage, interpolate } from '@/lib/i18n/LanguageContext';

interface ReceiptDocumentProps {
  invoice: Invoice;
  settings: InvoiceSettings;
}

export default function ReceiptDocument({ invoice, settings }: ReceiptDocumentProps) {
  const { t } = useLanguage();
  const currencySymbol = interpolate(t.dashboard.pricing.currency);

  return (
    <div className="bg-white dark:bg-[#111827] text-slate-900 dark:text-[#F5F5F5] p-6 md:p-10 max-w-4xl mx-auto font-sans min-h-screen print:min-h-0 flex flex-col border border-slate-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
      {/* Paid Stamp (Subtle) */}
      <div className="absolute top-20 right-10 -rotate-12 border-4 border-green-500/10 dark:border-green-500/10 px-6 py-2 rounded-xl opacity-10 pointer-events-none select-none">
        <span className="text-4xl font-black text-green-600 dark:text-green-500 tracking-[0.2em] uppercase">PAID</span>
      </div>

      {/* 1. Header (Logo + Company Info) */}
      <div className="flex justify-between items-start border-b border-slate-200 dark:border-white/10 pb-6 mb-6">
        <div className="space-y-4">
          <img src={settings.logoUrl || '/images/logo.svg'} alt="Logo" className="h-10 w-auto dark:brightness-0 dark:invert" />
          <h1 className="text-4xl font-black uppercase tracking-tighter text-green-600 dark:text-green-400">Receipt</h1>
        </div>

        <div className="text-right space-y-1">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">{settings.companyName}</h2>
          <div className="text-[10px] text-slate-500 dark:text-[#9CA3AF] space-y-0.5 leading-tight">
            <p className="flex items-center justify-end gap-2"><MapPin className="w-3 h-3 text-green-600 dark:text-green-400" /> {settings.companyAddress}</p>
            <p className="flex items-center justify-end gap-2"><Mail className="w-3 h-3 text-green-600 dark:text-green-400" /> {settings.companyEmail}</p>
            <p className="flex items-center justify-end gap-2"><Phone className="w-3 h-3 text-green-600 dark:text-green-400" /> {settings.companyPhone}</p>
          </div>
        </div>
      </div>

      {/* Payment Success Banner (Compact) */}
      <div className="bg-green-500/5 dark:bg-green-500/5 border border-green-500/10 dark:border-green-500/10 rounded-2xl p-4 mb-6 flex items-center gap-4">
        <div className="bg-green-600 dark:bg-green-500 p-2 rounded-full text-white dark:text-black">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Payment Confirmed</h3>
          <p className="text-slate-600 dark:text-[#9CA3AF] text-[11px]">Successfully processed for Invoice <span className="text-green-600 dark:text-green-400 font-bold">#{invoice.invoiceNumber}</span> via Wallet.</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-50 dark:bg-[#1F2937]/30 rounded-xl p-4 border border-slate-200 dark:border-white/5 space-y-2">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-green-600 dark:text-green-400">Customer</h3>
          <div className="space-y-0.5">
            <p className="text-lg font-black text-slate-900 dark:text-white">{invoice.clientName}</p>
            <p className="text-xs text-slate-600 dark:text-[#D1D5DB]">{invoice.clientEmail}</p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-[#1F2937]/30 rounded-xl p-4 border border-slate-200 dark:border-white/5 space-y-2">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-green-600 dark:text-green-400">Transaction Info</h3>
          <div className="grid grid-cols-2 gap-y-1 text-xs leading-none">
            <span className="text-slate-500 dark:text-[#9CA3AF] font-bold">Receipt ID:</span>
            <span className="text-slate-900 dark:text-white font-black text-right">#{invoice.receiptNumber || `RCP-${invoice.invoiceNumber.split('-').pop()}`}</span>
            <span className="text-slate-500 dark:text-[#9CA3AF] font-bold">Date Paid:</span>
            <span className="text-slate-900 dark:text-white font-black text-right">{invoice.paymentDate || new Date().toISOString().split('T')[0]}</span>
            <span className="text-slate-500 dark:text-[#9CA3AF] font-bold">Method:</span>
            <span className="text-slate-900 dark:text-white font-black text-right">Wallet Settlement</span>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/10">
        <div className="flex justify-end">
          <div className="w-full max-w-[280px] space-y-3">
            <div className="flex justify-between text-sm font-bold px-2">
              <span className="text-slate-500 dark:text-[#9CA3AF]">Invoice Total</span>
              <span className="text-slate-900 dark:text-white">{currencySymbol}{invoice.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center bg-green-600 dark:bg-green-500 text-white dark:text-black p-5 rounded-xl shadow-lg shadow-green-500/10">
              <span className="text-[10px] font-black uppercase tracking-widest">Amount Paid</span>
              <span className="text-3xl font-black">{invoice.currency} {currencySymbol}{invoice.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center space-y-4 pt-6 border-t border-slate-200 dark:border-white/5 opacity-40">
        <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF] max-w-sm mx-auto italic">
          This is an automatically generated electronic receipt. Thank you for your business.
        </p>
        <div className="text-[9px] font-black text-green-600 dark:text-green-400 uppercase tracking-[0.3em]">
          ORR Solutions • Operational Excellence
        </div>
      </div>
    </div>
  );
}
