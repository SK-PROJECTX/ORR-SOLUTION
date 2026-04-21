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
    <div className="bg-white text-black p-8 md:p-12 shadow-2xl rounded-sm max-w-4xl mx-auto font-sans min-h-[1000px] print:min-h-0 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start border-b-4 border-primary pb-8 mb-10">
        <div className="space-y-4">
          <img src={settings.logoUrl || '/images/logo.svg'} alt="Logo" className="h-16 w-auto" />
          <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-primary">Invoice</h1>
            <p className="text-xl font-bold text-gray-400">#{invoice.invoiceNumber}</p>
          </div>
        </div>
        
        <div className="text-right space-y-2">
          <h2 className="text-2xl font-black text-gray-900">{settings.companyName}</h2>
          <div className="text-sm text-gray-500 space-y-1">
            <p className="flex items-center justify-end gap-2"><MapPin className="w-3 h-3" /> {settings.companyAddress}</p>
            <p className="flex items-center justify-end gap-2"><Mail className="w-3 h-3" /> {settings.companyEmail}</p>
            <p className="flex items-center justify-end gap-2"><Phone className="w-3 h-3" /> {settings.companyPhone}</p>
            {settings.taxId && <p className="font-bold text-gray-700 mt-2">Tax ID: {settings.taxId}</p>}
          </div>
        </div>
      </div>

      {/* Bill To & Details */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary border-b border-gray-100 pb-2">Bill To</h3>
          <div className="space-y-1">
            <p className="text-xl font-bold text-gray-900">{invoice.clientName}</p>
            <p className="text-gray-500">{invoice.clientEmail}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary border-b border-gray-100 pb-2">Invoice Details</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <span className="text-gray-400 font-bold">Issue Date:</span>
            <span className="text-gray-900 font-bold text-right">{invoice.issueDate}</span>
            <span className="text-gray-400 font-bold">Due Date:</span>
            <span className="text-gray-900 font-bold text-right">{invoice.dueDate}</span>
            <span className="text-gray-400 font-bold">Status:</span>
            <span className={`text-right font-black uppercase ${invoice.status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
              {invoice.status}
            </span>
            {invoice.paymentDate && (
              <>
                <span className="text-gray-400 font-bold">Payment Date:</span>
                <span className="text-gray-900 font-bold text-right">{invoice.paymentDate}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="flex-1">
        <table className="w-full mb-8 border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-center w-24">Qty</th>
              <th className="px-4 py-3 text-right w-32">Unit Price</th>
              <th className="px-4 py-3 text-right w-32">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoice.lineItems.map((item, index) => (
              <tr key={index} className="text-sm">
                <td className="px-4 py-6 text-gray-900 font-medium">
                  {item.description}
                </td>
                <td className="px-4 py-6 text-center text-gray-500 font-bold">{item.quantity}</td>
                <td className="px-4 py-6 text-right text-gray-500 font-bold">${item.unitPrice.toLocaleString()}</td>
                <td className="px-4 py-6 text-right text-gray-900 font-black">${item.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="border-t-2 border-gray-100 pt-8 mt-auto">
        <div className="flex justify-end">
          <div className="w-full max-w-xs space-y-3">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-gray-900">${invoice.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-gray-400">Tax ({invoice.taxRate * 100}%)</span>
              <span className="text-gray-900">${invoice.taxAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center bg-primary text-white p-4 rounded-sm">
              <span className="text-xs font-black uppercase tracking-widest">Total Due</span>
              <span className="text-2xl font-black">{invoice.currency} ${invoice.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-gray-100 grid grid-cols-2 gap-8 items-end">
        <div className="space-y-3">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Notes & Terms</h4>
          <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
            {invoice.notes || "Please include the invoice number in your wire transfer. All payments must be made within 15 days of the issue date. For any billing inquiries, please contact our financial department."}
          </p>
        </div>
        
        <div className="text-right space-y-4">
          <div className="inline-block border-2 border-primary/20 p-4 rounded-xl">
             <div className="flex items-center gap-2 text-primary font-black uppercase tracking-tighter italic text-xl">
               <Globe className="w-5 h-5" /> ORR Solutions
             </div>
             <p className="text-[10px] font-bold text-gray-400">Operational & Resilience Consulting</p>
          </div>
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Thank you for your business</p>
        </div>
      </div>
    </div>
  );
}
