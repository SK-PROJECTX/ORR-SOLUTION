import { create } from 'zustand';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

interface BillingHistory {
  id: number;
  billing_date: string;
  amount: string;
  plan: string;
  users: number;
  status: string;
}

interface BillingState {
  billingHistory: BillingHistory[];
  isLoading: boolean;
  error: string | null;
  fetchBillingHistory: () => Promise<void>;
  clearError: () => void;
}

export const useBillingStore = create<BillingState>()((set) => ({
  billingHistory: [],
  isLoading: false,
  error: null,

  fetchBillingHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/billing-history');
      set({ billingHistory: response.data, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch billing history';
      set({ error: errorMessage, isLoading: false });
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));