/**
 * Created by eyoryas on 25-Dec-18.
 */

import store from '@/store/index';
import swal from 'sweetalert';

export default {

  errorNotify(response, notHideModel) {
    const locale = store.getters.getLocale;

    swal({
      title: locale['common']['label']['error'],
      text: locale['common']['statusCode'][response.status],
      icon: "error"
    }).then(function (response) {
      if (response && !notHideModel) {
        $(".modal").modal("hide");
      }
    });
  },

  successNotify(response, notHideModel) {

    const locale = store.getters.getLocale;

    swal({
      title: locale['common']['label']['success'],
      text: locale['common']['statusCode'][response.status],
      icon: "success"
    }).then(function (response) {
      if (response && !notHideModel) {
        $(".modal").modal("hide");
      }
    });

  },

  warningNotify(response, notHideModel) {

    const locale = store.getters.getLocale;

    swal({
      title: locale['common']['label']['warning'],
      text: locale['common']['statusCode'][response.status],
      icon: "warning"
    }).then(function (response) {
      if (response && !notHideModel) {
        $(".modal").modal("hide");
      }
    });

  },

  customMessage(type, title, msg) {
    swal(title, msg, type);

  }

}
