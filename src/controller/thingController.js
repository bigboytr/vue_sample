/**
 * Created by eyoryas on 08-Mar-19.
 */
import Vue from 'vue'
import axios from 'axios'
import store from '@/store/index'
import auth from '@/controller/authController2'

export default {

  readMethod(thingId, endpoint) {

    return new Promise((res, rej) => {

      axios({
        method: 'POST',
        url: store.getters.getServerPath + 'api/v1/thing/' + thingId + '/resource',
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data: {
          resource: endpoint
        }
      }).then(function (response) {

        auth.statusCodeHandler(response); // check backend session

        res(response.data);

      }).catch(function (errors) {

        auth.statusCodeHandler(errors);
        rej(errors);

      })
    });


    /**/
  },

  writeMethod(thingId, dto) {

    return new Promise((res, rej) => {

      axios({
        method: 'POST',
        url: store.getters.getServerPath + 'api/v1/thing/' + thingId + '/resource/write',
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data: dto
      }).then(function (response) {

        auth.statusCodeHandler(response); // check backend session

        res(response.data);

      }).catch(function (errors) {

        auth.statusCodeHandler(errors);
        rej(errors);

      })
    });
  },

  executeMethod(thingId, endpoint) {

    return new Promise((res, rej) => {

      axios({
        method: 'POST',
        url: store.getters.getServerPath + 'api/v1/thing/' + thingId + '/resource/execute',
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data: {
          resource: endpoint
        }
      }).then(function (response) {

        auth.statusCodeHandler(response); // check backend session

        res(response.data);

      }).catch(function (errors) {

        auth.statusCodeHandler(errors);
        rej(errors);

      })
    });
  },

  observeURLMethod(thingId, endpoint) {

    // This method returs WS url for observe

    return new Promise((res, rej) => {

      axios({
        method: 'POST',
        url: store.getters.getServerPath + 'api/v1/thing/' + thingId + '/resource/observe',
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data: {
          resource: endpoint
        }
      }).then(function (response) {

        auth.statusCodeHandler(response); // check backend session

        res(response.data);

      }).catch(function (errors) {

        auth.statusCodeHandler(errors);
        rej(errors);

      })
    })
  }
}