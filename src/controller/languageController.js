/**
 * Created by eyoryas on 27-Nov-18.
 */
import store from '@/store/index';
import axios from 'axios';

// Flags
import en from '@/assets/images/en.svg'
import tr from '@/assets/images/tr.svg'
import de from '@/assets/images/de.svg'
import fr from '@/assets/images/fr.svg'

const flags = {
  "en": en,
  "tr": tr,
  "de": de,
  "fr": fr
};

export default {

  flag(key) {
    //Return selected language flag image
    return flags[key];
  },

  setLang(lang) {
    //Set default language of app
    store.dispatch('setLang', lang);
  },

  getLangList() {
    //Get supported language list from config json
    axios.get("/langs/langList.json")
      .then(function (data) {
        store.dispatch('setLangList', data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  setLocaleAct(lang) {
    //Get selected language file.
    //let lang2 = vm.$store.state.languages.lang;
    axios.get("/langs/" + lang + ".json")
      .then(function (data) {
        //vm.$store.commit('setLocale', data.data);
        store.dispatch('setLocale', data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

}