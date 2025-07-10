module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr', 'de'],
    localePath: './public/locales',
    defaultNS: 'common',
    fallbackLng: {
      'tr': ['en'],
      'de': ['en'],
      'default': ['en']
    }
  },
  react: {
    useSuspense: false
  },
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false
  },
  returnNull: false,
  returnEmptyString: false
}; 