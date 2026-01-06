import i18n from "i18next";
import { initReactI18next } from "react-i18next";


// Importing translation files
import translationRO from "../../utils/language_controls/locales/ro/translation.json";


const write_en_obj = () => {

  let obj = {}

  Object.keys(translationRO).forEach((elem) => {
    obj = { ...obj, [elem]: elem }
    return { [elem]: elem }
  })

 return JSON.stringify(obj)

}


//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: write_en_obj(),
  },
  ro: {
    translation: translationRO,
  },
};





//i18N Initialization

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ro", //default language
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;