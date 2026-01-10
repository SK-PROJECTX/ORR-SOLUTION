import { create } from 'zustand';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

interface Meeting {
  id: number;
  created_at: string;
  updated_at: string;
  meeting_type: string;
  status: string;
  requested_datetime: string;
  confirmed_datetime: string | null;
  duration_minutes: number;
  agenda: string;
  meeting_notes: string;
  internal_notes: string;
  calendar_event_id: string;
  meeting_link: string;
  client: number;
  host: number | null;
}

interface SchedulingState {
  meetings: Meeting[];
  isLoading: boolean;
  error: string | null;
  fetchMeetings: () => Promise<void>;
  clearError: () => void;
}

export const useSchedulingStore = create<SchedulingState>()((set) => ({
  meetings: [],
  isLoading: false,
  error: null,

  fetchMeetings: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/mymeetings');
      const meetingsData = response.data?.data || response.data || [];
      set({ meetings: Array.isArray(meetingsData) ? meetingsData : [], isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch meetings';
      set({ error: errorMessage, isLoading: false, meetings: [] });
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));