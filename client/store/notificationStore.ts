import { create } from 'zustand';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

interface Notification {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface NotificationState {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  clearError: () => void;
}

export const useNotificationStore = create<NotificationState>()((set, get) => ({
  notifications: [],
  isLoading: false,
  error: null,

  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/notifications');
      const notificationsData = response.data?.data || response.data || [];
      set({ notifications: Array.isArray(notificationsData) ? notificationsData : [], isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch notifications';
      set({ error: errorMessage, isLoading: false, notifications: [] });
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  markAsRead: async (id: number) => {
    try {
      const notification = get().notifications.find(n => n.id === id);
      if (!notification) return;

      await api.put(`/notifications/${id}`, {
        title: notification.title,
        message: notification.message,
        is_read: true,
      });

      set(state => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, is_read: true } : n
        )
      }));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to mark as read';
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));