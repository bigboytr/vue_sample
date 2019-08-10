import store from '@/store/index';
import axios from 'axios'
import alertMe from '@/controller/alertMe';
import auth from '@/controller/authController2'
import swal from 'sweetalert';
export default {

  saveWithProductID(dto,prodID){
    return new Promise((res, rej) => {

      let method = "POST";
      let url;
      if( prodID !=="0" && prodID !==undefined && prodID !== null ){
        url = store.getters.getServerPath + "api/v1/service/" + prodID;
      }else {
        url = store.getters.getServerPath + "api/v1/service";
      }


      axios({
        method: method,
        url: url,
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data: dto
      }).then(function (response) {
        res(response);
      }).catch(function (errors) {
        rej(errors);
      });
    });
  },
  updateService(dto,selectedServiceId){
    return new Promise((res, rej) => {
      let method = "PUT";
      let url = store.getters.getServerPath + "api/v1/service/" + selectedServiceId;

      axios({
        method: method,
        url: url,
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data: dto
      }).then(function (response) {

        res(response);
        alertMe.successNotify(response);
      }).catch(function (errors) {
        alertMe.errorNotify(errors,true);
        rej(errors);
      });
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
  searchService(dto){
    let url = this.searchURL(dto);

    axios({
      method: 'GET',
      url: store.getters.getServerPath + 'api/v1/searchservices'+ url,
      headers: store.getters.getConfigHeaders,
      withCredentials: true
    }).then(function (response) {

      store.dispatch('setSearchResultServices', response.data);

    }).catch(function (errors) {

      auth.statusCodeHandler(errors);

    })
  },
  getServiceByServiceId(serviceId){
    return new Promise((res, rej) => {
      if(typeof serviceId === "string"){
        axios({
          method: 'GET',
          url: store.getters.getServerPath + 'api/v1/service/'+ serviceId,
          headers: store.getters.getConfigHeaders,
          withCredentials: true
        }).then(function (response) {

          res(response.data);

        }).catch(function (errors) {
          rej(errors);
        })
      }



    });
  },
  allocateProductWithService(serviceId,productID){
    return new Promise((res, rej) => {
      let url = store.getters.getServerPath + 'api/v1/service/'+ serviceId + "/product/" + productID;
      axios({
        method: 'PUT',
        url: url,
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function (response) {

        res(response.data);

      }).catch(function (errors) {
        rej(errors);
      })
    });
  },
  deleteServiceByServiceId(serviceId){
    return new Promise((res, rej) => {
      axios({
        method: 'DELETE',
        url: store.getters.getServerPath + 'api/v1/service/'+ serviceId,
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function (response) {
        res(response.data);
      }).catch(function (errors) {
        rej(errors);
      })
    });
  },
  getServicesByProductId(id){
    return new Promise((res, rej) => {
      axios({
        method: 'GET',
        url: store.getters.getServerPath + 'api/v1/services/'+ id,
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function (response) {

        res(response.data);

      }).catch(function (errors) {
        rej(errors);
      })
    });
  },
  getAllServices(){
    return new Promise((res, rej) => {
      axios({
        method: 'GET',
        url: store.getters.getServerPath + 'api/v1/service/all',
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function (response) {


        store.dispatch('setAllServices', response.data);
      }).catch(function (errors) {
        rej(errors);
      })
    });

  }

}
