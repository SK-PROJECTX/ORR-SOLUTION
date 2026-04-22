import { create } from 'zustand';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

export type InvoiceStatus = 'draft' | 'issued' | 'pending' | 'paid' | 'overdue';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  lineItems: LineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  notes?: string;
  paymentDate?: string;
  receiptNumber?: string;
}

export interface InvoiceSettings {
  prefix: string;
  nextNumber: number;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  taxId?: string;
  logoUrl?: string;
}

interface InvoiceState {
  invoices: Invoice[];
  settings: InvoiceSettings;
  isLoading: boolean;
  selectedInvoice: Invoice | null;
  
  // Actions
  fetchInvoices: () => Promise<void>;
  fetchInvoiceById: (id: string) => Promise<Invoice | null>;
  createInvoice: (invoice: Partial<Invoice>) => Promise<Invoice | null>;
  updateInvoiceStatus: (id: string, status: InvoiceStatus) => Promise<boolean>;
  updateSettings: (settings: Partial<InvoiceSettings>) => Promise<boolean>;
  payWithWallet: (invoiceId: string) => Promise<boolean>;
  generateInvoiceNumber: () => string;
}

// Mock Data
const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv_1',
    invoiceNumber: 'ORR-2026-0001',
    clientId: 'client_1',
    clientName: 'Acme Corp',
    clientEmail: 'billing@acme.com',
    status: 'paid',
    issueDate: '2026-04-01',
    dueDate: '2026-04-15',
    lineItems: [
      { id: 'li_1', description: 'Operational Consulting - Phase 1', quantity: 1, unitPrice: 1500, amount: 1500 },
      { id: 'li_2', description: 'System Audit', quantity: 1, unitPrice: 500, amount: 500 },
    ],
    subtotal: 2000,
    taxRate: 0.1,
    taxAmount: 200,
    totalAmount: 2200,
    currency: 'USD',
    paymentDate: '2026-04-10',
    receiptNumber: 'RCP-2026-0001'
  },
  {
    id: 'inv_2',
    invoiceNumber: 'ORR-2026-0002',
    clientId: 'client_1',
    clientName: 'Acme Corp',
    clientEmail: 'billing@acme.com',
    status: 'issued',
    issueDate: '2026-04-15',
    dueDate: '2026-04-30',
    lineItems: [
      { id: 'li_3', description: 'Monthly Maintenance', quantity: 1, unitPrice: 500, amount: 500 },
    ],
    subtotal: 500,
    taxRate: 0.1,
    taxAmount: 50,
    totalAmount: 550,
    currency: 'USD',
  },
  {
    id: 'inv_3',
    invoiceNumber: 'ORR-2026-0003',
    clientId: 'client_2',
    clientName: 'Global Systems',
    clientEmail: 'finance@globalsystems.com',
    status: 'overdue',
    issueDate: '2026-03-01',
    dueDate: '2026-03-15',
    lineItems: [
      { id: 'li_4', description: 'Risk Assessment', quantity: 1, unitPrice: 2500, amount: 2500 },
    ],
    subtotal: 2500,
    taxRate: 0.1,
    taxAmount: 250,
    totalAmount: 2750,
    currency: 'USD',
  }
];

const DEFAULT_SETTINGS: InvoiceSettings = {
  prefix: 'ORR-2026-',
  nextNumber: 4,
  companyName: 'ORR Solutions',
  companyAddress: 'Rabat, Malta',
  companyEmail: 'Info@orr.solutions',
  companyPhone: '+356 9935 3618',
  taxId: 'GB123456789',
  logoUrl: '/images/logo.svg'
};

export const useInvoiceStore = create<InvoiceState>()((set, get) => ({
  invoices: MOCK_INVOICES,
  settings: DEFAULT_SETTINGS,
  isLoading: false,
  selectedInvoice: null,

  fetchInvoices: async () => {
    set({ isLoading: true });
    // In real app: const response = await api.get('/invoices/');
    // For now, use mock
    setTimeout(() => {
      set({ invoices: MOCK_INVOICES, isLoading: false });
    }, 500);
  },

  fetchInvoiceById: async (id: string) => {
    const invoice = get().invoices.find(inv => inv.id === id) || null;
    set({ selectedInvoice: invoice });
    return invoice;
  },

  createInvoice: async (invoiceData: Partial<Invoice>) => {
    set({ isLoading: true });
    const newInvoice: Invoice = {
      id: `inv_${Math.random().toString(36).substr(2, 9)}`,
      invoiceNumber: get().generateInvoiceNumber(),
      clientId: invoiceData.clientId || '',
      clientName: invoiceData.clientName || '',
      clientEmail: invoiceData.clientEmail || '',
      status: 'draft',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: invoiceData.dueDate || '',
      lineItems: invoiceData.lineItems || [],
      subtotal: invoiceData.subtotal || 0,
      taxRate: invoiceData.taxRate || 0.1,
      taxAmount: invoiceData.taxAmount || 0,
      totalAmount: invoiceData.totalAmount || 0,
      currency: invoiceData.currency || 'USD',
      notes: invoiceData.notes,
    };

    set(state => ({
      invoices: [newInvoice, ...state.invoices],
      settings: { ...state.settings, nextNumber: state.settings.nextNumber + 1 },
      isLoading: false
    }));

    useToastStore.getState().addToast('Invoice created successfully', 'success');
    return newInvoice;
  },

  updateInvoiceStatus: async (id: string, status: InvoiceStatus) => {
    set(state => ({
      invoices: state.invoices.map(inv => 
        inv.id === id ? { ...inv, status } : inv
      )
    }));
    return true;
  },

  updateSettings: async (newSettings: Partial<InvoiceSettings>) => {
    set(state => ({
      settings: { ...state.settings, ...newSettings }
    }));
    useToastStore.getState().addToast('Settings updated successfully', 'success');
    return true;
  },

  generateInvoiceNumber: () => {
    const { prefix, nextNumber } = get().settings;
    return `${prefix}${nextNumber.toString().padStart(4, '0')}`;
  },

  payWithWallet: async (invoiceId: string) => {
    const invoice = get().invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return false;

    set({ isLoading: true });
    try {
      const { settleInvoiceWithWallet } = (await import('./walletStore')).useWalletStore.getState();
      const success = await settleInvoiceWithWallet(invoiceId, invoice.totalAmount);
      
      if (success) {
        set(state => ({
          invoices: state.invoices.map(inv => 
            inv.id === invoiceId ? { 
              ...inv, 
              status: 'paid', 
              paymentDate: new Date().toISOString().split('T')[0],
              receiptNumber: `RCP-${inv.invoiceNumber.split('-').pop()}`
            } : inv
          )
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Wallet payment error:', error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  }
}));
