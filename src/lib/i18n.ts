import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from '../locales/en.json';
import trTranslations from '../locales/tr.json';
import deTranslations from '../locales/de.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  tr: {
    translation: trTranslations,
  },
  de: {
    translation: deTranslations,
  },
};

const isServer = typeof window === 'undefined';

const initOptions = {
  resources,
  fallbackLng: 'en',
  lng: isServer ? 'en' : undefined,
  debug: process.env.NODE_ENV === 'development',

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },

  detection: isServer ? undefined : {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
  },
};

if (isServer) {
  i18n.use(initReactI18next).init(initOptions);
} else {
  i18n.use(LanguageDetector).use(initReactI18next).init(initOptions);
}

export default i18n; 