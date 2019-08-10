/**
 * Created by eyoryas on 03-Dec-18.
 */
import store from '@/store/index';
import router from '@/router';
import axios from 'axios';
import notifyMe from '@/controller/notifyMe';
import userController from '@/controller/userController'

export default {

  login(dto, showChangeAutoPassView, messages) {

    if (!dto.username) {
      notifyMe.warningNotifierGlobal(messages.common.statusNotification.login);
      return;
    }

    const self = this;

    if (dto.username === "admin" && dto.password === "admin123") {
      store.dispatch("setAuthUser", dto);
      store.dispatch("setToken", true);
      dto.access = 1;
      self.setAuthUserToLocaleStorage(dto);
      router.push("/");
    }


  },

  statusCodeHandler(response) {
    // This handler check the Backend returned status code
    // If it's not 200 it's decide to redirect

    // error handle
    //let code = response.response !== undefined ? response.response.status : null;

    // success handle
    //code = code == null ? response.status : code;

    // if (code == null && code != undefined) {
    //   this.logout();
    // }
    //
    // const codes = [401, 403]; // -> this codes will go to login
    //
    // if (code !== 200) {
    //   if (codes.indexOf(code) !== -1) {
    //
    //     this.logout();
    //
    //   } else {
    //
    //     this.getAuthUser();
    //   }
    // } else {
    //   this.getAuthUser();
    // }
    this.getAuthUser();
  },

  setAuthUserToLocaleStorage(data) {
    localStorage.setItem('authUser', JSON.stringify(data));
  },

  getAuthUser() {
    let u = store.getters.getAuthUser;
    const lsU = JSON.parse(localStorage.getItem('authUser'));

    if (u == null) {
      // if page refreshed vuex loses the authUser info, so it's null
      if (lsU !== undefined && lsU !== null) {
        // But localStorage has user info, it will transfering to vuex

        store.dispatch("setAuthUser", lsU);
        store.dispatch("setToken", true);

        u = lsU;

      } else {
        // localStorage has no user info, so user ever logged in

        store.dispatch("setToken", false);
        store.dispatch("setAuthUser", null);
        router.push('/login');
        //this.logout(); // again reset everything and redir to login
      }
    }
    return u;
  },

  logout() {
    localStorage.removeItem('authUser');
    store.dispatch("setToken", false);
    store.dispatch("setAuthUser", null);

    /*axios({
      url: store.getters.getServerPath+'logout',
      method: "GET",
      headers: store.getters.getConfigHeaders,
      withCredentials: true
    }).then(function () {

      localStorage.removeItem('authUser');
      store.dispatch("setToken", false);
      store.dispatch("setAuthUser", null);
      router.push("/login"); // This function clear all state.. like F5

    });*/
  },


}
