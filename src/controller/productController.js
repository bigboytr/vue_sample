/**
 * Created by ebariko on 10-Dec-18.
 */
import store from '@/store/index';
import axios from 'axios'
import alertMe from '@/controller/alertMe';
import auth from '@/controller/authController2'
import swal from 'sweetalert';


export default {

  save (dto) {

    return new Promise((res, rej) => {

      const productId = dto.productId;

      let mode = "create";
      let method = "POST";
      let url = store.getters.getServerPath + "api/v1/product/" + dto.epParty.id;

      if (productId !== "" && productId !== null && productId !== 0) {
        mode = "update";
        method = "PUT";
        //url = store.getters.getServerPath + 'api/v1/product/' + productId;
      }

      axios({
        method: method,
        url: url,
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data: dto
      }).then(function (response) {

        res(response);
        //alertMe.successNotify(response);
      }).catch(function (errors) {
        //alertMe.errorNotify(errors);
        rej(errors);
      });
    });
  },

  getAll () {
    // first request for this component
    return new Promise((res, rej) => {

      axios({
        method: 'GET',
        url: store.getters.getServerPath + 'api/v1/product/all',
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function(response) {

        auth.statusCodeHandler(response);
        res(response.data);

      }).catch(function(errors) {

        auth.statusCodeHandler(errors);
        rej(errors);
      });
    });
  },

  getByPartyId (partyId) {
    // partyId: organizationId
    return new Promise((res, rej) => {

      axios({
        method: 'GET',
        url: store.getters.getServerPath + 'api/v1/product/bypartyid/'+partyId,
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function(response) {

        auth.statusCodeHandler(response);
        res(response.data);

      }).catch(function(errors) {

        auth.statusCodeHandler(errors);
        rej(errors);
      });
    });


  },

  getDetail(key) {
    return store.state.products.list[key];
  },

  search(dto) {

    let url = this.searchURL(dto);

    axios({
      method: 'GET',
      url: store.getters.getServerPath + 'api/v1/searchproducts'+url,
      headers: store.getters.getConfigHeaders,
      withCredentials: true
    }).then(function (response) {

      auth.statusCodeHandler(response);

      store.dispatch('setSearchResultProducts', response.data);

    }).catch(function (errors) {

      //alertMe.errorNotify(errors);
      auth.statusCodeHandler(errors);

    })
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

  async delete (ids) {

    const res = await swal({
      title: 'Are you sure ?',
      text: 'Items will be deleted !',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(async function (response) {
      return response;
    });

    if (res === true) {
      return await this.deleteProcess(ids);
    }
  },

  deleteProcess(ids) {

    let countS = 0;

    return Promise.all(ids.map((id) => (
        axios({
          method: "DELETE",
          url: store.getters.getServerPath + "api/v1/product/" + id,
          headers: store.getters.getConfigHeaders,
          withCredentials: true
        }).then(() => {
          countS++;
        })
      )))
      .then(() => countS);
  },

  getProductOfferList(productId){

    return new Promise((res, rej) => {

      axios({
        method: 'GET',
        url: store.getters.getServerPath + 'api/v1/productoffering/byproductid/'+ productId,
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function (response) {

        auth.statusCodeHandler(response);
        res(response.data);
      }).catch(function (errors) {

        auth.statusCodeHandler(errors);
        rej(errors)

      })
    });
  }
}
