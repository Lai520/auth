import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import zh from './zh'
import en from './en'
import kr from './kr'
import jp from './jp'
import hk from './hk'
import spa from './spa'
import it from './it'
import de from './de'
import fra from './fra'
import th from './th'

let locale = window.localStorage.getItem('locale') || '';
if(locale == ''){
  locale = defaultLanguage;
  window.localStorage.setItem('locale',locale);
  window.localStorage.setItem('lang',locale);
}
export default new VueI18n({
  locale:locale,
  messages:{
    zh:zh,
    en:en,
    kr:kr,
    jp:jp,
    hk:hk,
    spa:spa,
    it:it,
    de:de,
    fra:fra,
    th:th
  }
})
