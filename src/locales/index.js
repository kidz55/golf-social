import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';

i18next
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        common: en,
      },
    },
  });

export default i18next;
