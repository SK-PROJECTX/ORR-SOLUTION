import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';
import { useOnboardingStore } from './onboardingStore';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
  permissions: {
    can_access_portal: boolean;
    can_request_meetings: boolean;
    can_create_tickets: boolean;
    can_view_resources: boolean;
  };
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (uid: string, token: string, newPassword: string) => Promise<boolean>;
  verifyEmail: (uid: string, token: string, email: string) => Promise<boolean>;
  validateToken: () => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
      refreshToken: typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null,
      isLoading: false,
      error: null,

      register: async (email: string, password: string, firstName: string, lastName: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/client/register/', {
            username: firstName.toLowerCase() + lastName.toLowerCase(),
            email,
            password,
            first_name: firstName,
            last_name: lastName
          });
          
          const { user, accessToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);
          set({ user, accessToken, isLoading: false });
          
          useToastStore.getState().addToast('Registration successful! Please check your email for confirmation.', 'success');
          return true;
        } catch (error: any) {
          const errorData = error.response?.data;
          let errorMessage = 'Registration failed';
          
          if (errorData?.message) {
            errorMessage = errorData.message;
          } else if (errorData?.errors) {
            errorMessage = Object.values(errorData.errors).flat().join(', ');
          } else if (typeof errorData === 'string') {
            errorMessage = errorData;
          }
          
          set({ error: errorMessage, isLoading: false });
          useToastStore.getState().addToast(errorMessage, 'error');
          return false;
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/login/', {
            email,
            password,
          });
          
          if (response.status === 200 || response.status === 201) {
            const { user, accessToken, refreshToken } = response.data.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            set({ user, accessToken, refreshToken, isLoading: false, error: null });
            
            useToastStore.getState().addToast(`Welcome back, ${user?.first_name || 'User'}!`, 'success');
            
            return true;
          } else {
            throw new Error('Login failed');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Login failed';
          set({ error: errorMessage, isLoading: false });
          useToastStore.getState().addToast(errorMessage, 'error');
          return false;
        }
      },

      forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          await api.post('/forget-password/', { email });
          useToastStore.getState().addToast('Password reset email sent!', 'success');
          set({ isLoading: false });
          return true;
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Failed to send reset email';
          set({ error: errorMessage, isLoading: false });
          useToastStore.getState().addToast(errorMessage, 'error');
          return false;
        }
      },

      resetPassword: async (uid: string, token: string, newPassword: string) => {
        set({ isLoading: true, error: null });
        try {
          await api.post(`/verify-reset-password/${uid}/${token}/`, {
            uid,
            token,
            new_password: newPassword
          });
          useToastStore.getState().addToast('Password reset successful!', 'success');
          set({ isLoading: false });
          return true;
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Password reset failed';
          set({ error: errorMessage, isLoading: false });
          useToastStore.getState().addToast(errorMessage, 'error');
          return false;
        }
      },

      verifyEmail: async (uid: string, token: string, email: string) => {
        set({ isLoading: true, error: null });
        try {
          await api.post('/verify-email/', { uid, token, email });
          useToastStore.getState().addToast('Email verified successfully!', 'success');
          set({ isLoading: false });
          return true;
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Email verification failed';
          set({ error: errorMessage, isLoading: false });
          useToastStore.getState().addToast(errorMessage, 'error');
          return false;
        }
      },

      validateToken: async () => {
        const accessToken = get().accessToken || localStorage.getItem('accessToken');
        if (!accessToken) {
          return false;
        }
        
        try {
          await api.get('/profile/');
          return true;
        } catch (error: any) {
          if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            set({ user: null, accessToken: null, refreshToken: null });
            return false;
          }
          return true;
        }
      },

      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({ user: null, accessToken: null, refreshToken: null });
        useToastStore.getState().addToast('Logged out successfully', 'info');
        window.location.href = '/login';
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, accessToken: state.accessToken, refreshToken: state.refreshToken }),
      onRehydrateStorage: () => (state) => {
        if (state && typeof window !== 'undefined') {
          const accessToken = localStorage.getItem('accessToken');
          const refreshToken = localStorage.getItem('refreshToken');
          if (accessToken && !state.accessToken) {
            state.accessToken = accessToken;
          }
          if (refreshToken && !state.refreshToken) {
            state.refreshToken = refreshToken;
          }
        }
      },
    }
  )
);