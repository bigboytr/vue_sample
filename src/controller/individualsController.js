/**
 * Created by eyoryas on 03-Dec-18.
 */
import store from '@/store/index';
import auth from './authController2.js';
import axios from 'axios';
import swal from 'sweetalert';
import alertMe from '@/controller/alertMe';
import lookupController from '@/controller/lookupController';
import mainVue from '../views/Individuals.vue';

export default {

  getAllIndividuals() {
    // first requested method

    let list; //store.getters.getAllIndividuals;
    axios({
      method: 'GET',
      url: store.getters.getServerPath + "api/v1/individual/all",
      headers: store.getters.getConfigHeaders,
      withCredentials: true
    }).then(function (response) {

      // Individual info
      list = response.data;

      Object.keys(list).map(function (key) {
        let item = list[key];

        list[key]["userInfo"] = {};
        // get User info from user table
        axios({
          method: 'GET',
          url: store.getters.getServerPath + "api/v1/user/bypartyid/" + item.party.partyId,
          headers: store.getters.getConfigHeaders,
          withCredentials: true
        }).then((response) => {

          // Push user info to individual
          list[key]["userInfo"] = response.data;
        });

        if (item.countryOfBirthCd) {

          list[key]['countryOfBirth'] = lookupController.getNameByCode(item.countryOfBirthCd, "countries");
        }

        if (item.disabilityTypeCd) {

          list[key]['disabilityType'] = lookupController.getNameByCode(item.disabilityTypeCd, "disabilityTypes");
        }
      });

    }).then(function () {
      // set created individual list into global store
      store.dispatch('setAllIndividuals', list);

    }).catch(function (errors) {

      // if there is an error check the status code for the behaviour.
      auth.statusCodeHandler(errors);

    });
    //}

  },

  save(dto) {

    // TODO: function behave two type, if has id, update proceed, if has no id, create proceed

    return new Promise((res, rej) => {

      const id = dto.epIndividualDto.partyId;
      let apiCall = dto.createUserAlso === 1 ? "api/v1/user/create" : "api/v1/individual";

      let mode = "create";
      let method = "POST";
      let url = store.getters.getServerPath + apiCall;

      if (id !== "") {
        mode = "update";
        method = "PUT";
        url = store.getters.getServerPath + "api/v1/individual/" + id;

      }

      axios({
        method: method,
        url: url,
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data: dto
      }).then(function (response) {

        res(response)
      }).catch(function (errors) {
        rej(errors)
      })
    });
  },

  getDetail(key) {
    return store.state.individuals.list[key];
  },

  deleteIndividuals (ids, successFunction) {
    let self = this;

    function checkAndSuccess(count, ids, successCount) {
      if (count >= ids.length) {
        successFunction(successCount);
      }
    }

    swal({
      title: 'Are you sure ?',
      text: 'Items will be deleted !',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(function (response) {
      if (response) {
        // continue to process
        // call api request with axios
        // success swal will be in axios promise
        var count = 0;
        var succussCount = 0;
        Object.assign(ids).map(function (id) {
          console.log(id);
          axios({
            method: "DELETE",
            url: store.getters.getServerPath + "api/v1/individual/" + id,
            headers: store.getters.getConfigHeaders,
            withCredentials: true
          }).then(function (response) {
            console.log(response);
            count++;
            succussCount++;
            checkAndSuccess(count, ids, succussCount);
          }).catch(function (errors) {
            count++;
            checkAndSuccess(count, ids, succussCount);
            alertMe.errorNotify(errors);
          })
        });
      }
    })
  },

  deleteIndividual (id, userId, successFuntion, failureFunction) {
    swal({
      title: 'Are you sure ?',
      text: 'Items will be deleted !',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(function (response) {
      if (response) {
        // continue to process
        // call api request with axios
        // success swal will be in axios promise
        console.log(id);
        axios({
          method: "DELETE",
          url: store.getters.getServerPath + "api/v1/individual/" + id,
          headers: store.getters.getConfigHeaders,
          withCredentials: true
        }).then(function (response) {
          console.log(response);
          if(userId !== null && userId !== undefined){
            axios({
              method: "DELETE",
              url: store.getters.getServerPath + "api/v1/user/" + userId,
              headers: store.getters.getConfigHeaders,
              withCredentials: true
            }).then(function (response) {
              successFuntion();
            }).catch(function(errors) {
              failureFunction();
            });
          }else{
            successFuntion();
          }
        }).catch(function (errors) {
          failureFunction();
        })
      }
    })
  },

 /* search(dto) {

    let url = this.searchURL(dto);

    axios({
      method: 'GET',
      url: store.getters.getServerPath + 'api/v1/searchindividual'+ url,
      headers: store.getters.getConfigHeaders,
      withCredentials: true
    }).then(function (response) {

      auth.statusCodeHandler(response);

      store.dispatch('setSearchResultIndividuals', response.data);

    }).catch(function (errors) {

      //alertMe.errorNotify(errors);
      auth.statusCodeHandler(errors);

    })
  }, */
  search(dto){
    let list;
    let url = this.searchURL(dto);

    axios({
      method: 'GET',
      url: store.getters.getServerPath + 'api/v1/searchindividual'+ url,
      headers: store.getters.getConfigHeaders,
      withCredentials: true
    }).then(function (response) {
      // Individual info
      list = response.data;

      if(list.length > 0) { // to put searcList empty

        Object.keys(list).map(function(key) {
          let item = list[key];

          list[key]["userInfo"] = {};
          // get User info from user table
          axios({
            method: 'GET',
            url: store.getters.getServerPath + "api/v1/user/bypartyid/" + item.partyId,
            headers: store.getters.getConfigHeaders,
            withCredentials: true
          }).then((responseUser) => {

            // Push user info to individual
            list[key]["userInfo"] = responseUser.data;

            store.dispatch('setSearchResultIndividuals', list);

          }).catch((error) => {

            store.dispatch('setSearchResultIndividuals', list);

          });

        });

      }else{
        store.dispatch('setSearchResultIndividuals', list);
      }

    }).catch(function (errors) {

      // if there is an error check the status code for the behaviour.
      auth.statusCodeHandler(errors);

    });
  },

  searchURL(dto) {

    // create search url by dto
    let arr = [];
    Object.keys(dto).map(function(key) {

      /*if (!isNaN(dto[key])) { */

      /*    if (dto[key] !== null && dto[key] != 0) {

            arr.push(key + '=' + dto[key]);
          } */
      if(dto[key] === null || dto[key] === "" || dto[key] === undefined || dto[key] === 0 || dto[key] === "0"){
        arr.push(key);
      }else{
        arr.push(key + '=' + dto[key]);
      }

      //  }
    });

    return (arr.length > 0) ? '?' + arr.join('&') : '';
  },

  getIndividualByPartyId(partyId){

    return new Promise((res, rej) => {

      if (partyId !== "") {
        let method = "GET";
        let url = store.getters.getServerPath + "api/v1/individual/" + partyId;

        axios({
          method: method,
          url: url,
          headers: store.getters.getConfigHeaders,
          withCredentials: true
        }).then(function (response) {
          let list = response.data;
          list["userInfo"] = {};
          // get User info from user table
          axios({
            method: 'GET',
            url: store.getters.getServerPath + "api/v1/user/bypartyid/" + list.party.id,
            headers: store.getters.getConfigHeaders,
            withCredentials: true
          }).then((responseUser) => {

            // Push user info to individual
            list["userInfo"] = responseUser.data;

            res(list);

          }).catch((error) => {
            res(list)
          });

        }).catch(function (error) {
            rej(error);
        })
      }
    });
  },

  deleteUser(userId){

    return new Promise((res, rej) => {

      if (userId !== "") {
        let method = "DELETE";
        let url = store.getters.getServerPath + "api/v1/user/" + userId;

        axios({
          method: method,
          url: url,
          headers: store.getters.getConfigHeaders,
          withCredentials: true
        }).then(function (response) {
          res(response)
        }).catch(function (errors) {
          rej(errors)
        });
      }
    });
  }

}
