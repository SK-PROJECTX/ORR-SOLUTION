"use client";
import React, { useEffect } from 'react';
import {
  FileText,
  Download,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Wallet,
  Search
} from 'lucide-react';
import { useInvoiceStore, InvoiceStatus } from '@/store/invoiceStore';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Link from 'next/link';

const statusColors: Record<InvoiceStatus, string> = {
  draft: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  issued: "bg-blue-500/10 text-blue-400 border-blue-400/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-400/20",
  paid: "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20",
  overdue: "bg-red-500/10 text-red-500 border-red-500/20",
};

const StatusIcon = ({ status }: { status: InvoiceStatus }) => {
  switch (status) {
    case 'paid': return <CheckCircle className="w-4 h-4" />;
    case 'overdue': return <AlertCircle className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

export default function ClientInvoicesPage() {
  const { t, interpolate } = useLanguage();
  const { invoices, fetchInvoices, isLoading } = useInvoiceStore();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // Filter out drafts for clients (they should only see issued/paid/etc)
  const clientViewInvoices = invoices.filter(inv => inv.status !== 'draft');

  return (
    <div className="min-h-screen text-foreground p-4 md:p-8 flex justify-center transition-colors duration-300">
      <div className="w-full max-w-6xl space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {interpolate(t.dashboard.sidebar.items.myInvoices)}
            </h1>
            <p className="text-foreground/60 max-w-md">
              Review your billing history, download branded invoices, and settle outstanding balances directly from your wallet.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-card border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-4 shadow-xl">
              <div className="bg-[#22C55E]/10 p-2.5 rounded-xl">
                <Wallet className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Available Balance</p>
                <p className="text-xl font-bold text-[#22C55E]">$12,450.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/40 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-inner">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input
              type="text"
              placeholder="Search by invoice number or date..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2.5 text-sm font-semibold hover:bg-white/5 rounded-xl transition-all text-foreground/60">
              Last 6 Months
            </button>
            <button className="px-4 py-2.5 text-sm font-semibold bg-white/10 rounded-xl shadow-lg">
              All Invoices
            </button>
          </div>
        </div>

        {/* Invoices List */}
        <div className="grid grid-cols-1 gap-4">
          {clientViewInvoices.map((invoice) => (
            <Link
              key={invoice.id}
              href={`/account/invoices/${invoice.id}`}
              className="group relative bg-[var(--color-surface)]/60 hover:bg-[var(--color-surface-hover)]/80 backdrop-blur-sm border border-[var(--color-border)] hover:border-primary/30 p-6 rounded-2xl transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl hover:shadow-primary/5 cursor-pointer overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-primary transition-all" />

              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-1 ${invoice.status === 'paid' ? 'bg-[#22C55E]/10' : 'bg-primary/10'}`}>
                  <FileText className={`w-6 h-6 ${invoice.status === 'paid' ? 'text-[#22C55E]' : 'text-primary'}`} />
                  <span className="text-[10px] font-bold opacity-40 uppercase tracking-tighter">INV</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {invoice.invoiceNumber}
                    {invoice.status === 'paid' && <CheckCircle className="w-4 h-4 text-[#22C55E]" />}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-foreground/40">
                    <span>Issued: {invoice.issueDate}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>Due: {invoice.dueDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:items-end w-full md:w-auto gap-1">
                <span className="text-xs text-foreground/40 font-bold uppercase tracking-widest text-left md:text-right">Total Amount</span>
                <p className="text-2xl font-bold text-white leading-none">
                  {invoice.currency} {interpolate(t.dashboard.pricing.currency)}{invoice.totalAmount.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-white/5">
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border ${statusColors[invoice.status]}`}>
                  <StatusIcon status={invoice.status} />
                  {invoice.status.toUpperCase()}
                </div>
                <div className="flex items-center gap-2">
                  {invoice.status !== 'paid' && (
                    <div className="hidden md:flex flex-col items-end mr-4">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-tight">Requires Attention</span>
                      <span className="text-xs text-[#22C55E] font-bold">Pay via Wallet</span>
                    </div>
                  )}
                  <ChevronRight className="w-5 h-5 text-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}

          {clientViewInvoices.length === 0 && (
            <div className="text-center py-24 bg-card/20 rounded-3xl border border-dashed border-white/10">
              <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-foreground/20" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">No Invoices Yet</h2>
              <p className="text-foreground/40 max-w-xs mx-auto">
                Once an invoice has been issued for your services, it will appear here for review and payment.
              </p>
            </div>
          )}
        </div>

        {/* Support Banner */}
        <div className="bg-gradient-to-r from-primary/20 to-transparent border border-primary/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Need help with billing?</h3>
            <p className="text-foreground/60">Our finance team is available to assist you with any questions.</p>
          </div>
          <button className="bg-white/10 hover:bg-white/20 whitespace-nowrap px-8 py-3 rounded-2xl font-bold transition-all border border-white/10">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
