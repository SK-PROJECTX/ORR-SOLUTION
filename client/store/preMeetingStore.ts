import { create } from 'zustand';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

interface PreMeetingData {
  basic_context: string;
  goals: string;
  pain_points: string;
}

interface PreMeetingState {
  isLoading: boolean;
  error: string | null;
  submitPreMeeting: (id: string, data: PreMeetingData) => Promise<void>;
  clearError: () => void;
}

export const usePreMeetingStore = create<PreMeetingState>()((set) => ({
  isLoading: false,
  error: null,

  submitPreMeeting: async (id: string, data: PreMeetingData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(`/meeting-preform/${id}`, data);
      useToastStore.getState().addToast('Pre-meeting form submitted successfully!', 'success');
      set({ isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Pre-meeting submission failed';
      set({ error: errorMessage, isLoading: false });
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));