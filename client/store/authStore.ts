import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      register: async (email: string, password: string, firstName: string, lastName: string) => {
        set({ isLoading: true, error: null });
        try {
          // Generate random username as required by API
          const generateUsername = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-_+@';
            let result = '';
            for (let i = 0; i < 80; i++) {
              result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
          };

          const response = await api.post('/client/register', {
            username: generateUsername(),
            email,
            password,
            first_name: firstName,
            last_name: lastName
          });
          
          const { user, token } = response.data;
          localStorage.setItem('token', token);
          set({ user, token, isLoading: false });
          
          useToastStore.getState().addToast('Registration successful! Please check your email for confirmation.', 'success');
          
          setTimeout(() => {
            window.location.href = `/email-confirmation?email=${encodeURIComponent(email)}`;
          }, 1500);
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Registration failed';
          set({ error: errorMessage, isLoading: false });
          useToastStore.getState().addToast(errorMessage, 'error');
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/login', {
            email,
            password,
          });
          
          const { user, token } = response.data;
          localStorage.setItem('token', token);
          set({ user, token, isLoading: false });
          
          useToastStore.getState().addToast(`Welcome back, ${user.name}!`, 'success');
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Login failed';
          set({ error: errorMessage, isLoading: false });
          useToastStore.getState().addToast(errorMessage, 'error');
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
        useToastStore.getState().addToast('Logged out successfully', 'info');
        window.location.href = '/login';
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);