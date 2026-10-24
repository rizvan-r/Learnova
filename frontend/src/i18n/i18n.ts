import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ta from './locales/ta.json'

const savedLanguage =
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
    ? window.localStorage.getItem('learnova_lang') || 'en'
    : 'en'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ta: { translation: ta },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

// Keep html tag lang attribute in sync
if (typeof document !== 'undefined') {
  document.documentElement.lang = savedLanguage
}

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    window.localStorage.setItem('learnova_lang', lng)
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng
  }
})

export default i18n
