"use client";
import React from 'react';
import { Invoice, InvoiceSettings } from '@/store/invoiceStore';
import { CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

interface ReceiptDocumentProps {
  invoice: Invoice;
  settings: InvoiceSettings;
}

export default function ReceiptDocument({ invoice, settings }: ReceiptDocumentProps) {
  return (
    <div className="bg-white text-black p-8 md:p-12 shadow-2xl rounded-sm max-w-4xl mx-auto font-sans min-h-[800px] print:min-h-0 flex flex-col relative overflow-hidden">
      {/* Paid Stamp */}
      <div className="absolute top-20 right-10 -rotate-12 border-4 border-green-500/40 px-6 py-2 rounded-xl opacity-30 pointer-events-none select-none">
        <span className="text-4xl font-black text-green-500 tracking-widest uppercase">PAID</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start border-b-4 border-green-500 pb-8 mb-10">
        <div className="space-y-4">
          <img src={settings.logoUrl || '/images/logo.svg'} alt="Logo" className="h-16 w-auto" />
          <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-green-600">Payment Receipt</h1>
            <p className="text-xl font-bold text-gray-400">#{invoice.receiptNumber || `RCP-${invoice.invoiceNumber.split('-').pop()}`}</p>
          </div>
        </div>
        
        <div className="text-right space-y-2">
          <h2 className="text-2xl font-black text-gray-900">{settings.companyName}</h2>
          <div className="text-sm text-gray-500 space-y-1">
            <p>{settings.companyAddress}</p>
            <p>{settings.companyEmail}</p>
            <p>{settings.companyPhone}</p>
          </div>
        </div>
      </div>

      {/* Payment Success Banner */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-12 flex items-center gap-6">
        <div className="bg-green-500 p-3 rounded-full text-white">
          <CheckCircle className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-green-900">Payment Successful</h3>
          <p className="text-green-700">This document serves as your official receipt for Invoice <span className="font-bold">{invoice.invoiceNumber}</span>. The payment was processed via your wallet balance.</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-green-600 border-b border-gray-100 pb-2">Customer</h3>
          <div className="space-y-1">
            <p className="text-xl font-bold text-gray-900">{invoice.clientName}</p>
            <p className="text-gray-500">{invoice.clientEmail}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-green-600 border-b border-gray-100 pb-2">Transaction Info</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <span className="text-gray-400 font-bold">Payment Date:</span>
            <span className="text-gray-900 font-bold text-right">{invoice.paymentDate || new Date().toISOString().split('T')[0]}</span>
            <span className="text-gray-400 font-bold">Method:</span>
            <span className="text-gray-900 font-bold text-right">Wallet Settlement</span>
            <span className="text-gray-400 font-bold">Auth Code:</span>
            <span className="text-gray-900 font-mono text-right">{Math.random().toString(36).substring(7).toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-auto border-t-2 border-gray-100 pt-8">
        <div className="flex justify-end">
          <div className="w-full max-w-xs space-y-3">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-gray-400">Invoice Total</span>
              <span className="text-gray-900">${invoice.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center bg-green-500 text-white p-4 rounded-sm">
              <span className="text-xs font-black uppercase tracking-widest">Amount Paid</span>
              <span className="text-2xl font-black">{invoice.currency} ${invoice.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center space-y-4">
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          Thank you for your prompt payment. For any questions regarding this receipt or your account details, please contact our support team.
        </p>
        <div className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em]">
          Electronic Receipt - Automatically Generated
        </div>
      </div>
    </div>
  );
}
