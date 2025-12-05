import { create } from 'zustand';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

interface ProfileData {
  full_name: string;
  nickname: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  language: string;
  timezone: string;
  bio?: string;
}

interface ProfileState {
  profile: ProfileData;
  isLoading: boolean;
  isEditing: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: ProfileData) => Promise<void>;
  setEditing: (editing: boolean) => void;
  setProfile: (profile: Partial<ProfileData>) => void;
  clearError: () => void;
}

export const useProfileStore = create<ProfileState>()((set, get) => ({
  profile: {
    full_name: '',
    nickname: '',
    gender: 'male',
    country: '',
    language: '',
    timezone: '',
    bio: '',
  },
  isLoading: false,
  isEditing: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/profile/');
      const profileData = response.data?.data || response.data || {};
      set({ profile: profileData, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch profile';
      set({ error: errorMessage, isLoading: false });
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  updateProfile: async (data: ProfileData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/profile/create/', data);
      set({ profile: data, isLoading: false, isEditing: false });
      useToastStore.getState().addToast('Profile updated successfully!', 'success');
    } catch (error: any) {
      let errorMessage = 'Profile update failed';
      
      if (error.response?.status === 401) {
        errorMessage = 'Authentication required. Please login again.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      set({ error: errorMessage, isLoading: false });
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  setEditing: (editing: boolean) => {
    set({ isEditing: editing });
  },

  setProfile: (profile: Partial<ProfileData>) => {
    set((state) => ({ profile: { ...state.profile, ...profile } }));
  },

  clearError: () => {
    set({ error: null });
  },
}));