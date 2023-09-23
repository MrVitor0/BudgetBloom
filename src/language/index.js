import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'pt', 
  fallbackLocale: 'pt',
  messages: {
    en: require('./en.json'),
    pt: require('./pt.json'),
  },
});

export default i18n;
