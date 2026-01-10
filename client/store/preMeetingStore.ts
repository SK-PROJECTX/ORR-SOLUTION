import { create } from 'zustand';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

interface PreMeetingData {
  [key: string]: any; // Flexible structure for form data
}

interface PreMeetingState {
  isLoading: boolean;
  error: string | null;
  submitPreMeetingForm: (meetingId: number, data: PreMeetingData) => Promise<void>;
  clearError: () => void;
}

export const usePreMeetingStore = create<PreMeetingState>()((set) => ({
  isLoading: false,
  error: null,

  submitPreMeetingForm: async (meetingId: number, data: PreMeetingData) => {
    set({ isLoading: true, error: null });
    try {
      await api.patch(`/meeting-preform/${meetingId}`, data);
      useToastStore.getState().addToast('Pre-meeting form submitted successfully!', 'success');
      set({ isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to submit pre-meeting form';
      set({ error: errorMessage, isLoading: false });
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));