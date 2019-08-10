/**
 * Created by eyoryas on 27-Dec-18.
 */

/*
This controller is global lookup getter for FE.
If you need to retrieve lookup to show to user, you can use this controller.
It setting up the list for view.
*/
import store from '@/store/index'
import axios from 'axios'

export default {

  setLookups() {

    store.dispatch("setLookupItems", "EP_LKP_COUNTRY");
    store.dispatch("setLookupItems", "EP_LKP_NATIONALITY");
    store.dispatch("setLookupItems", "EP_LKP_DISABILITY_TYPE");
    store.dispatch("setLookupItems", "EP_LKP_GENDER_TYPE");
    store.dispatch("setLookupItems", "EP_LKP_MARITAL_STATUS_TYPE");
    store.dispatch("setLookupItems", "EP_LKP_PARTY_ROLE_TYPE");
    store.dispatch("setLookupItems", "PR_PRODUCT_TYPE");
    store.dispatch("setLookupItems", "CBE_LKP_STATUS");
    //PR_PRODUCT_TYPE

  },

  getNameByCode(code, target) {

    let r = "";
    if (code !== null && target !== undefined) {
      let list = store.getters.getLookupItems(target);

      Object.keys(list).map(function (key) {

        if (list[key]["code"] === code) {
          r = list[key]["name"];
        }
      });
      return r;
    }
  }
}
