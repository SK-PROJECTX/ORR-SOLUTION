import { create } from 'zustand';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

interface SupportTicket {
  id: number;
  name: string;
  email: string;
  website: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface SupportState {
  tickets: SupportTicket[];
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  createTicket: (data: { name: string; email: string; website: string; message: string }) => Promise<void>;
  fetchTickets: () => Promise<void>;
  clearError: () => void;
}

export const useSupportStore = create<SupportState>()((set) => ({
  tickets: [],
  isLoading: false,
  isSubmitting: false,
  error: null,

  createTicket: async (data) => {
    set({ isSubmitting: true, error: null });
    try {
      await api.post('/support', data);
      useToastStore.getState().addToast('Support ticket created successfully!', 'success');
      set({ isSubmitting: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create support ticket';
      set({ error: errorMessage, isSubmitting: false });
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  fetchTickets: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/support/history/');
      const ticketsData = response.data?.data || response.data || [];
      set({ tickets: Array.isArray(ticketsData) ? ticketsData : [], isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch support history';
      set({ error: errorMessage, isLoading: false, tickets: [] });
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));