import { en } from './translations/en';
import { it } from './translations/it';


export type Language = 'en' | 'it';

export const translations = { en, it, } as const;

/**
 * Returns the full translation dictionary for the given language.
 * Falls back to English if the language is not supported.
 */
export function getTranslations(lang: Language) {
  return translations[lang] ?? translations.en;
}

export { en, it };
