/**
 * Created by eyoryas on 18-Mar-19.
 */

import Vue from 'vue'
import store from '@/store/index';
import Notification from 'vue-notification';
Vue.use(Notification);

export default {

  errorNotifier(response) {
    Vue.notify({
      duration: 5000,
      type: "error",
      title: '<i class="icon title-icon"></i> '+ store.getters.getLocale.common.statusNotification.error,
      text: response.data.errorDesc
    })
  },
  errorNotifierGlobal(response) {
    Vue.notify({
      duration: 5000,
      type: "error",
      title: '<i class="icon title-icon"></i> ' + store.getters.getLocale.common.statusNotification.error,
      text: response
    })
  },

  successNotifier(response) {
    Vue.notify({
      duration: 5000,
      type: "success",
      title: '<i class="icon title-icon"></i> ' + store.getters.getLocale.common.statusNotification.success,
      text: response.status
    })
  },

  successNotifierGlobal(response) {
    Vue.notify({
      duration: 5000,
      type: "success",
      title: '<i class="icon title-icon"></i> ' + store.getters.getLocale.common.statusNotification.success,
      text: response
    })
  },

  warningNotifier(response) {
    Vue.notify({
      duration: 5000,
      type: "warning",
      title: '<i class="icon title-icon"></i> ' + store.getters.getLocale.common.statusNotification.warning,
      text: response.data.errorDesc
    })
  },

  warningNotifierGlobal(response) {
    Vue.notify({
      duration: 5000,
      type: "warning",
      title: '<i class="icon title-icon"></i> ' + store.getters.getLocale.common.statusNotification.warning,
      text: response
    })
  },

  infoNotifier(response) {
    Vue.notify({
      duration: 5000,
      type: "info",
      title: '<i class="icon title-icon"></i> ' + store.getters.getLocale.common.statusNotification.info,
      text: response.data.errorDesc
    })
  }
}
