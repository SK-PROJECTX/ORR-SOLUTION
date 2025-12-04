import { create } from 'zustand';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

interface MeetingData {
  meeting_type: 'discovery' | 'first_meeting' | 'follow_up' | 'report_review';
  requested_datetime: string;
  agenda: string;
}

interface MeetingState {
  isLoading: boolean;
  error: string | null;
  createMeeting: (data: MeetingData) => Promise<void>;
  clearError: () => void;
}

export const useMeetingStore = create<MeetingState>()((set) => ({
  isLoading: false,
  error: null,

  createMeeting: async (data: MeetingData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/create-meeting', data);
      useToastStore.getState().addToast('Meeting request submitted successfully!', 'success');
      set({ isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Meeting request failed';
      set({ error: errorMessage, isLoading: false });
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));