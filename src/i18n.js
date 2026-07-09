import i18n from "i18next"
import detector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import translationEN from "./locales/eng/translation.json"
import translationFr from "./locales/fr/translation.json"
import translationHt from "./locales/ht/translation.json"
import translationZh from "./locales/zh/translation.json"
import translationRu from "./locales/ru/translation.json"
import translationEs from "./locales/es/translation.json"
// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFr,
  },
  ht: {
    translation: translationHt,
  },
  zh: {
    translation: translationZh,
  },
  ru: {
    translation: translationRu,
  },
  es: {
    translation: translationEs,
  },
}

let language

if (typeof window !== "undefined") {
  language = localStorage.getItem("I18N_LANGUAGE")

  if (!language) {
    localStorage.setItem("I18N_LANGUAGE", "en")
  }
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: language || "en",
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n

/*
const mergedLanguage = {
  ...translationEN,
  //...translationRu,
  //...translationZh,
  //...translationHt,
  ...translationFr,
}

console.log("Merged Language ", mergedLanguage)
*/
