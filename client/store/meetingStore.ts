import { create } from 'zustand';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

interface MeetingData {
  meeting_type: 'discovery' | 'first_meeting' | 'follow_up' | 'report_review';
  requested_datetime: string;
  agenda: string;
  scheduling_url: string;
}

interface MeetingState {
  isLoading: boolean;
  error: string | null;
  createMeeting: (data: MeetingData) => Promise<number | null>;
  clearError: () => void;
}

export const useMeetingStore = create<MeetingState>()((set) => ({
  isLoading: false,
  error: null,

  createMeeting: async (data: MeetingData): Promise<number | null> => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/create-meeting/', data);
      console.log('API Response:', response.data);
      
      // Try different possible response structures
      const meetingId = response.data?.data?.meeting_id || 
                       response.data?.meeting_id ||
                       response.data?.data?.id || 
                       response.data?.id || 
                       response.data?.meeting?.id;
      
      console.log('Extracted meeting ID:', meetingId);
      
      useToastStore.getState().addToast('Meeting request submitted successfully!', 'success');
      set({ isLoading: false });
      return meetingId;
    } catch (error: any) {
      console.error('Meeting creation error:', error);
      const errorMessage = error.response?.data?.message || 'Meeting request failed';
      set({ error: errorMessage, isLoading: false });
      useToastStore.getState().addToast(errorMessage, 'error');
      return null;
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));