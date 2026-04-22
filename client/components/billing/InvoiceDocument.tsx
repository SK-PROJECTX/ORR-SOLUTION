"use client";
import React from 'react';
import { Invoice, InvoiceSettings } from '@/store/invoiceStore';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface InvoiceDocumentProps {
  invoice: Invoice;
  settings: InvoiceSettings;
}

export default function InvoiceDocument({ invoice, settings }: InvoiceDocumentProps) {
  return (
    <div className="bg-white dark:bg-[#111827] text-slate-900 dark:text-[#F5F5F5] p-6 md:p-10 max-w-4xl mx-auto font-sans min-h-screen print:min-h-0 flex flex-col border border-slate-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
      {/* 1. Header (Logo + Company Info) */}
      <div className="flex justify-between items-start border-b border-slate-200 dark:border-white/10 pb-6 mb-6">
        <div className="space-y-4">
          <img src={settings.logoUrl || '/images/logo.svg'} alt="Logo" className="h-12 w-auto dark:brightness-0 dark:invert" />
          <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">Invoice</h1>
        </div>

        <div className="text-right space-y-1">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">{settings.companyName}</h2>
          <div className="text-xs text-slate-500 dark:text-[#9CA3AF] space-y-0.5 leading-tight">
            <p className="flex items-center justify-end gap-2"><MapPin className="w-3 h-3 text-primary" /> {settings.companyAddress}</p>
            <p className="flex items-center justify-end gap-2"><Mail className="w-3 h-3 text-primary" /> {settings.companyEmail}</p>
            <p className="flex items-center justify-end gap-2"><Phone className="w-3 h-3 text-primary" /> {settings.companyPhone}</p>
          </div>
        </div>
      </div>

      {/* 2 & 3. Client details & Invoice Metadata */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-50 dark:bg-[#1F2937]/50 rounded-xl p-4 border border-slate-200 dark:border-white/5 space-y-2">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Bill To</h3>
          <div className="space-y-0.5">
            <p className="text-xl font-black text-slate-900 dark:text-white">{invoice.clientName}</p>
            <p className="text-sm text-slate-600 dark:text-[#D1D5DB]">{invoice.clientEmail}</p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-[#1F2937]/50 rounded-xl p-4 border border-slate-200 dark:border-white/5 space-y-2">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Details</h3>
          <div className="grid grid-cols-2 gap-y-1 text-xs leading-none">
            <span className="text-slate-500 dark:text-[#9CA3AF] font-bold">Invoice ID:</span>
            <span className="text-slate-900 dark:text-white font-black text-right">#{invoice.invoiceNumber}</span>
            <span className="text-slate-500 dark:text-[#9CA3AF] font-bold">Issue Date:</span>
            <span className="text-slate-900 dark:text-white font-black text-right">{invoice.issueDate}</span>
            <span className="text-slate-500 dark:text-[#9CA3AF] font-bold">Due Date:</span>
            <span className="text-slate-900 dark:text-white font-black text-right">{invoice.dueDate}</span>
          </div>
        </div>
      </div>

      {/* 4. Itemized billing table */}
      <div className="flex-1 min-h-0">
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-white/5 mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-[#1F2937] text-slate-500 dark:text-[#9CA3AF] text-[10px] font-black uppercase tracking-widest border-b border-slate-200 dark:border-white/5">
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-center w-16">Qty</th>
                <th className="px-4 py-3 text-right w-24">Unit Price</th>
                <th className="px-4 py-3 text-right w-24">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 bg-white dark:bg-[#111827]">
              {invoice.lineItems.map((item, index) => (
                <tr key={index} className="text-xs hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-colors">
                  <td className="px-4 py-4 text-slate-900 dark:text-white font-bold leading-relaxed">
                    {item.description}
                  </td>
                  <td className="px-4 py-4 text-center text-slate-600 dark:text-[#D1D5DB] font-black">{item.quantity}</td>
                  <td className="px-4 py-4 text-right text-slate-600 dark:text-[#D1D5DB] font-black">${item.unitPrice.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right text-slate-900 dark:text-white font-black text-sm">${item.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Total summary */}
      <div className="pt-6 border-t border-slate-200 dark:border-white/10 mb-8">
        <div className="flex justify-between items-end">
          <div className="space-y-4 max-w-md">
            {/* 6. Notes section */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Notes & Terms</h4>
              <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF] leading-relaxed italic">
                {invoice.notes || "Please include the invoice number in your wire transfer. All payments must be made within 15 days of the issue date. For any billing inquiries, please contact our financial department."}
              </p>
            </div>
          </div>

          <div className="w-full max-w-[240px] space-y-2">
            <div className="flex justify-between text-xs font-bold px-2">
              <span className="text-slate-500 dark:text-[#9CA3AF]">Subtotal</span>
              <span className="text-slate-900 dark:text-white">${invoice.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs font-bold px-2">
              <span className="text-slate-500 dark:text-[#9CA3AF]">Tax ({invoice.taxRate * 100}%)</span>
              <span className="text-slate-900 dark:text-white">${invoice.taxAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center bg-primary text-white p-4 rounded-xl shadow-lg shadow-primary/10">
              <span className="text-[10px] font-black uppercase tracking-widest">Total Due</span>
              <span className="text-xl font-black">{invoice.currency} ${invoice.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Branding Footer */}
      <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/5 flex justify-between items-center opacity-40 grayscale transition-opacity">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black uppercase tracking-tighter italic text-sm">
          <Globe className="w-4 h-4 text-primary" /> ORR Solutions
        </div>
        <p className="text-[10px] text-slate-600 dark:text-[#D1D5DB] font-black uppercase tracking-[0.2em]">Thank you for your business</p>
      </div>
    </div>
  );
}
