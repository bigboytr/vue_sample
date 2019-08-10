/**
 * Created by eyoryas on 15-Apr-19.
 */
import store from '@/store/index'

export default {

  setDefaultTheme() {
    this.themeConstructor(store.getters.getTheme);
  },
  themeSwitcher() {
    const active = (store.getters.getTheme === 'light') ? "dark" : "light";
    store.dispatch("setTheme", active);
    this.themeConstructor(active);
  },
  themeConstructor(theme) {
    let b = document.querySelector("body");
    b.classList = [];
    b.classList.add(theme);
  }
}