'use client';

import React, { createContext, useContext, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import { useLanguageStore } from '@/store/languageStore';
import { useWalletStore } from '@/store/walletStore';
import { getTranslations, type Language } from '@/lib/i18n';

// ────────────────────────────────────────────────────────────────────────────
// Constants & Helpers
// ────────────────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'orr-language';
const ITALIAN_COUNTRIES = new Set(['IT']); // Extend if needed, e.g. CH (Switzerland)

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
// Context
// ────────────────────────────────────────────────────────────────────────────
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
  interpolate: (text: string, params?: Record<string, any>) => string;
  isDetecting: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ────────────────────────────────────────────────────────────────────────────
// Provider
// ────────────────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { 
    language, 
    isDetecting, 
    setLanguage, 
    setIsDetecting, 
    setHasHydrated 
  } = useLanguageStore();

  const { currency } = useWalletStore();

  const t = useMemo(() => {
    const baseT = getTranslations(language);
    // Create a shallow copy and then deep copy only the necessary nested path
    // to avoid expensive full JSON serialization if possible, 
    // but for simplicity and safety against mutation of the base translation:
    const modifiedT = JSON.parse(JSON.stringify(baseT));
    if (modifiedT.dashboard?.pricing) {
      modifiedT.dashboard.pricing.currency = currency === 'EUR' ? '€' : '$';
    }
    return modifiedT;
  }, [language, currency]);

  // Apply language preference and update DOM
  const applyLanguage = useCallback(
    (lang: Language) => {
      setLanguage(lang);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;
      }
    },
    [setLanguage]
  );

  // Interpolation helper: matches {key} pattern used in translations
  const interpolate = useCallback((text: string, params?: Record<string, any>) => {
    if (!text) return '';
    return text.replace(/{([\w.]+)}/g, (match, path) => {
      // 1. Check in provided params
      if (params && params[path] !== undefined) {
        return String(params[path]);
      }
      // 2. Fallback to translation dictionary (t) if path looks like a lookup
      const value = path.split('.').reduce((acc: any, curr: string) => acc?.[curr], t);
      return typeof value === 'string' ? value : match;
    });
  }, [t]);

  // Initial detection and hydration
  useEffect(() => {
    if (typeof window === 'undefined') return;

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
  }, [applyLanguage, setHasHydrated, setIsDetecting]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: applyLanguage, t, interpolate, isDetecting }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Hook
// ────────────────────────────────────────────────────────────────────────────
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

/**
 * Static interpolate function for cases where the hook is unavailable.
 * Note: Only supports params, not recursive translation lookups.
 */
export const interpolate = (text: string, params?: Record<string, any>) => {
  if (!text) return '';
  return text.replace(/{([\w.]+)}/g, (match, key) => {
    return params && params[key] !== undefined ? String(params[key]) : match;
  });
};
