import { en } from './translations/en';
import { it } from './translations/it';
import { ar } from './translations/ar';


export type Language = 'en' | 'it' | 'ar';

export const translations = { en, it, ar } as const;

/**
 * Returns the full translation dictionary for the given language.
 * Falls back to English if the language is not supported.
 */
export function getTranslations(lang: Language) {
  return translations[lang] ?? translations.en;
}

export { en, it };
