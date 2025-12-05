import { create } from 'zustand';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

interface OnboardingData {
  jurisdiction: string;
  jurisdiction_other?: string;
  language: string;
  language_other?: string;
  keyboard_layout: string;
  keyboard_other?: string;
  date_format: string;
  time_format_24h: boolean;
  accepted_service_agreement: boolean;
  portal_interests: string;
  portal_interests_other?: string;
  user_type: string;
  user_type_other?: string;
  project_stage: string;
  orr_pillars: string;
  has_active_project: string;
  project_description: string;
  challenges?: string;
  challenges_other?: string;
  meeting_format: string;
  communication_tone: string;
  notification_preference: string;
  ai_specialist_domains?: string;
  ai_specialist_other?: string;
  additional_context?: string;
}

interface OnboardingState {
  isLoading: boolean;
  error: string | null;
  submitOnboarding: (data: OnboardingData) => Promise<void>;
  clearError: () => void;
}

export const useOnboardingStore = create<OnboardingState>()((set) => ({
  isLoading: false,
  error: null,

  submitOnboarding: async (data: OnboardingData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/onboarding/submit', {
        ...data,
        is_completed: true,
      });
      
      useToastStore.getState().addToast('Onboarding completed successfully!', 'success');
      
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
      
      set({ isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Onboarding submission failed';
      set({ error: errorMessage, isLoading: false });
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));