import { create } from 'zustand';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

interface FavoriteDocument {
  id: number;
  document: {
    id: number;
    title: string;
    description: string;
    document: string;
    document_type: string;
    is_visible_to_client: boolean;
    uploaded_by_name: string;
    download_count: number;
    last_accessed: string;
    created_at: string;
    file_size: string;
  };
  created_at: string;
}

interface FavoriteState {
  favorites: FavoriteDocument[];
  isLoading: boolean;
  error: string | null;
  fetchFavorites: () => Promise<void>;
  removeFavorite: (favoriteId: number) => Promise<void>;
  clearError: () => void;
}

export const useFavoriteStore = create<FavoriteState>()((set) => ({
  favorites: [],
  isLoading: false,
  error: null,

  fetchFavorites: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/favorites/');
      const favoritesData = response.data?.data || response.data || [];
      set({ favorites: Array.isArray(favoritesData) ? favoritesData : [], isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch favorites';
      set({ error: errorMessage, isLoading: false, favorites: [] });
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  removeFavorite: async (favoriteId: number) => {
    try {
      await api.delete(`/favorite/${favoriteId}/delete/`);
      set(state => ({
        favorites: state.favorites.filter(fav => fav.id !== favoriteId)
      }));
      useToastStore.getState().addToast('Removed from favorites', 'success');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to remove favorite';
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));