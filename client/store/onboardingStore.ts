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
  communication_tone: string | string[];
  notification_preference: string;
  ai_specialist_domains?: string;
  ai_specialist_other?: string;
  additional_context?: string;
}

interface OnboardingStatus {
  id?: number;
  created_at?: string;
  updated_at?: string;
  is_completed: boolean;
  jurisdiction?: string;
  jurisdiction_other?: string;
  language?: string;
  language_other?: string;
  keyboard_layout?: string;
  keyboard_other?: string;
  date_format?: string;
  time_format_24h?: boolean;
  accepted_service_agreement?: boolean;
  portal_interests?: string;
  portal_interests_other?: string;
  user_type?: string;
  user_type_other?: string;
  project_stage?: string;
  orr_pillars?: string;
  has_active_project?: string;
  project_description?: string;
  challenges?: string;
  challenges_other?: string;
  meeting_format?: string;
  communication_tone?: string;
  notification_preference?: string;
  ai_specialist_domains?: string;
  ai_specialist_other?: string;
  additional_context?: string;
  user?: number;
}

interface OnboardingState {
  isLoading: boolean;
  error: string | null;
  onboardingStatus: OnboardingStatus | null;
  checkOnboardingStatus: () => Promise<boolean>;
  submitOnboarding: (data: OnboardingData) => Promise<void>;
  clearError: () => void;
}

export const useOnboardingStore = create<OnboardingState>()((set) => ({
  isLoading: false,
  error: null,
  onboardingStatus: null,

  checkOnboardingStatus: async () => {
    try {
      const response = await api.get('/onboarding/me/');

      // If 204 No Content, it means onboarding is already completed or not required
      if (response.status === 204) {
        set({ onboardingStatus: { is_completed: true } });
        return true;
      }

      // Handle both { data: ... } and flat response
      const status = response.data?.data || response.data;
      set({ onboardingStatus: status });

      return !!status?.is_completed;

    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError.response?.status === 204) {
          set({ onboardingStatus: { is_completed: true } });
          return true;
        }
      }
      console.error('Failed to check onboarding status:', error);
      return false;
    }
  },

  submitOnboarding: async (data: OnboardingData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/onboarding/submit/', {
        ...data,
        is_completed: true,
      });

      useToastStore.getState().addToast('Onboarding completed successfully!', 'success');

      // Update the onboarding status in the store
      const status = response.data?.data || response.data;
      set({
        onboardingStatus: { ...status, is_completed: true },
        isLoading: false
      });

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } catch (error: unknown) {
      let errorMessage = 'Onboarding submission failed';
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
      set({ error: errorMessage, isLoading: false });
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));