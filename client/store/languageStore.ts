import { create } from 'zustand';
import type { Language } from '@/lib/i18n';

interface LanguageState {
  language: Language;
  isDetecting: boolean;
  hasHydrated: boolean;
  setLanguage: (lang: Language) => void;
  setIsDetecting: (detecting: boolean) => void;
  setHasHydrated: (hydrated: boolean) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en',
  isDetecting: false,
  hasHydrated: false,
  setLanguage: (lang) => set({ language: lang }),
  setIsDetecting: (detecting) => set({ isDetecting: detecting }),
  setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
}));
