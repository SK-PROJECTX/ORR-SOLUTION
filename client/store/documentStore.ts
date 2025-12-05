import { create } from 'zustand';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

interface Document {
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
}

interface DocumentState {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
  fetchDocuments: () => Promise<void>;
  toggleFavorite: (documentId: number) => Promise<void>;
  downloadDocument: (documentId: number) => Promise<void>;
  clearError: () => void;
}

export const useDocumentStore = create<DocumentState>()((set, get) => ({
  documents: [],
  isLoading: false,
  error: null,

  fetchDocuments: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/client/documents');
      const documentsData = response.data?.data || response.data || [];
      set({ documents: Array.isArray(documentsData) ? documentsData : [], isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch documents';
      set({ error: errorMessage, isLoading: false, documents: [] });
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  toggleFavorite: async (documentId: number) => {
    try {
      await api.post(`/favourite/${documentId}/toggle/`);
      useToastStore.getState().addToast('Favorite updated', 'success');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to toggle favorite';
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  downloadDocument: async (documentId: number) => {
    try {
      const response = await api.get(`/client/documents/${documentId}/download`, {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `document-${documentId}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      useToastStore.getState().addToast('Download started', 'success');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to download document';
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));