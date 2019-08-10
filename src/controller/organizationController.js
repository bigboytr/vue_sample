/**
 * Created by ebariko on 10-Dec-18.
 */
import store from '@/store/index';
import axios from 'axios'
import alertMe from '@/controller/alertMe';
import auth from '@/controller/authController2'


export default {

  save (dto) {

    return new Promise((res, rej) => {

      console.log(dto);
      store.dispatch('setOrganization', dto);
      /*const id = dto.partyId;

      let mode = "create";
      let method = "POST";
      let url = store.getters.getServerPath + "api/v1/organization/";

      if (id !== "" && id !== null && id !== 0) {
        mode = "update";
        method = "PUT";
        url = store.getters.getServerPath + 'api/v1/organization/' + id;
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
      })*/

    });


  },

  getAll () {
    // first request for this component

    return new Promise((res, rej) => {

      res(store.getters.getAllOrganizations);

      //let list = {};
      /*axios({
        method: 'GET',
        url: store.getters.getServerPath + 'api/v1/organization/all',
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function (response) {

        auth.statusCodeHandler(response);


        //list = response.data
        // set created individual list into global store
        //store.dispatch('setAllOrganizations', list);

        res(response.data)

      }).catch(function (errors) {

        //alertMe.errorNotify(errors);
        auth.statusCodeHandler(errors);

        rej(errors)
      })*/
    })
  },

  getDetail(key) {
    //return store.state.organizations.searchResult[key];
    return store.getters.getSearchResultOrganization[key];
  },

  deleteOrganizations (ids, successFuntion, failureFunction) {
    let self = this;

    function checkAndSuccess(count, length, successCount) {
      if (count >= length) {
        successFuntion(successCount);
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
            url: store.getters.getServerPath + "api/v1/organization/" + id,
            headers: store.getters.getConfigHeaders,
            withCredentials: true
          }).then(function (response) {

            console.log(response);
            count++;
            succussCount++;
            checkAndSuccess(count, ids.length, succussCount);
          }).catch(function (errors) {
            count++;
            checkAndSuccess(count, ids.length, succussCount);
          })

        });
      }
    })
  },

  deleteOrganization (id, successFuntion) {
    function success(count, length, successCount) {
      successFuntion();
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

        console.log(id);
        axios({
          method: "DELETE",
          url: store.getters.getServerPath + "api/v1/organization/" + id,
          headers: store.getters.getConfigHeaders,
          withCredentials: true
        }).then(function (response) {

          console.log(response);
          success();
        }).catch(function (errors) {
          alertMe.errorNotify(errors);
        })
      }
    })
  },

  search(dto) {

    return new Promise((res, rej) => {

      let url = this.searchURL(dto);

      axios({
        method: 'GET',
        url: store.getters.getServerPath + 'api/v1/searchorganization' + url,
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function(response) {

        auth.statusCodeHandler(response);
        store.dispatch('setSearchResultOrganization', response.data);
        res(response.data);

      }).catch(function(errors) {

        auth.statusCodeHandler(errors);
        rej(errors);

      })
    });
  },

  searchURL(dto) {

    // create search url by dto
    let arr = [];
    Object.keys(dto).map(function(key) {

      if(dto[key] === null || dto[key] === "" || dto[key] === undefined || dto[key] === 0 || dto[key] === "0"){
        arr.push(key);
      }else{
        arr.push(key + '=' + dto[key]);
      }
    });

    return (arr.length > 0) ? '?' + arr.join('&') : '';
  },

  getOrganizationById(organizationId){

    return new Promise((res, rej) => {

      axios({
        method: 'GET',
        url: store.getters.getServerPath + 'api/v1/organization/'+ organizationId,
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function (response) {

        auth.statusCodeHandler(response);
        res(response.data);
      }).catch(function (errors) {

        //alertMe.errorNotify(errors);
        auth.statusCodeHandler(errors);
        rej(errors)

      })
    });
  }

}
