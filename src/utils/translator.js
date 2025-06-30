// utils/translator.js
const locales = {
  en: require('../config/locales/en'),
  es: require('../config/locales/es'),
};

function t(key, lang = 'en') {
  return locales[lang][key] || key;
}

module.exports = { t };
