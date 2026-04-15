'use client';

import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { useLanguageStore } from '@/store/languageStore';
import { getTranslations, type Language } from '@/lib/i18n';

// ────────────────────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'orr-language';
const ITALIAN_COUNTRIES = new Set(['IT']); // extend if needed, e.g. CH (Switzerland)

// ────────────────────────────────────────────────────────────────────────────
// Context
// ────────────────────────────────────────────────────────────────────────────
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: ReturnType<typeof getTranslations>;
  interpolate: (text: string, params?: Record<string, any>) => string;
  isDetecting: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// ────────────────────────────────────────────────────────────────────────────
// Geolocation helper — calls ipapi.co (free, no API key required)
// ────────────────────────────────────────────────────────────────────────────
async function detectLanguageFromIP(): Promise<Language> {
  try {
    const res = await fetch('https://ipapi.co/json/', {
      cache: 'no-store',
      signal: AbortSignal.timeout(4000), // 4-second timeout
    });
    if (!res.ok) return 'en';
    const data = (await res.json()) as { country_code?: string };
    if (data?.country_code && ITALIAN_COUNTRIES.has(data.country_code)) {
      return 'it';
    }
  } catch {
    // Network error or timeout — silently fall back to English
  }
  return 'en';
}

// ────────────────────────────────────────────────────────────────────────────
// Provider
// ────────────────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { language, isDetecting, hasHydrated, setLanguage, setIsDetecting, setHasHydrated } =
    useLanguageStore();

  const t = getTranslations(language);

  // Interpolation helper
  const interpolate = useCallback((text: string, params?: Record<string, any>) => {
    if (!text) return '';
    
    return text.replace(/{{([\w.]+)}}/g, (match, path) => {
      // 1. Check in provided params
      if (params && params[path] !== undefined) {
        return String(params[path]);
      }
      
      // 2. Check in translation dictionary (t)
      const value = path.split('.').reduce((acc: any, curr: string) => acc?.[curr], t);
      if (typeof value === 'string') {
        return value;
      }
      
      return match;
    });
  }, [t]);

  // Persist language preference & update <html lang="…"> attribute
  const applyLanguage = useCallback(
    (lang: Language) => {
      setLanguage(lang);
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    },
    [setLanguage],
  );

  // On mount: check localStorage first, then geolocation if no preference
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;

    if (saved === 'en' || saved === 'it') {
      applyLanguage(saved);
      setHasHydrated(true);
      return;
    }

    // No saved preference — auto-detect via IP geolocation
    setIsDetecting(true);
    detectLanguageFromIP().then((detected) => {
      applyLanguage(detected);
      setIsDetecting(false);
      setHasHydrated(true);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <LanguageContext.Provider value={{ language, setLanguage: applyLanguage, t, interpolate, isDetecting }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Hook
// ────────────────────────────────────────────────────────────────────────────
export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a <LanguageProvider>');
  }
  return ctx;
}
