import store from '@/store/index'
import axios from 'axios'
import auth from '@/controller/authController2'

export default {

  getMockRules(){
    return new Promise((res, rej) => {
      const data = [
        {
          "dto": {
            "id": "1",
            "definition": "Hava sıcak olduğunda pencere açılır.",
            "name": "Pencere Aç",
            "isActive": false
          }
        },
        {
          "dto": {
            "id": "2",
            "definition": "İçerisi çok nemli olduğunda fan çalıştırılır.",
            "name": "Fan Çalıştır",
            "isActive": true
          }
        }
      ];
      if (data) {
        res(data);
      } else {
        rej("Null Data");
      }

    });
  },
  getServiceRules(id){
    return new Promise((res, rej) => {
      const data = [
        {
          "dto": {
            "id": "3",
            "definition": "Toprak yeteri kadar nemli değil.",
            "name": "Sulamayı Aç",
            "isActive": true
          }
        },
        {
          "dto": {
            "id": "4",
            "definition": "Topraktaki besinler azalmıştır.",
            "name": "Gübreleme",
            "isActive": false
          }
        }
      ];
      if (id !== "0" && id !== null && id !== undefined) {
        res(data);
      } else {
        this.getMockRules().then((response)=> {
          res(response);
        });
      }

    });
  },

  save(dto) {
    return new Promise((res, rej) => {
     
      axios({
        method: 'POST',
        url: store.getters.getServerPath + 'api/v1/rule',
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data: dto
      }).then(function (response) {

        auth.statusCodeHandler(response);
        res(response.data);
        //  store.dispatch('setSearchResultResources', response.data);

      }).catch(function (errors) {

        //alertMe.errorNotify(errors);
        auth.statusCodeHandler(errors);
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
  
  search(dto) {

    return new Promise((res, rej) => {

      let url = this.searchURL(dto);
      
      axios({
        method: 'GET',
        url: store.getters.getServerPath + 'api/v1/searchrule' + url,
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function (response) {

        auth.statusCodeHandler(response);
        res(response.data);
        //  store.dispatch('setSearchResultResources', response.data);

      }).catch(function (errors) {

        //alertMe.errorNotify(errors);
        auth.statusCodeHandler(errors);
        rej(errors);
      });
    });
  },

  toggleIsActive(payload) {

    return new Promise((res, rej) => {

      const urlType = payload.value == true ? "activate" : "deactivate";

      axios({
        method: 'PUT',
        url: store.getters.getServerPath + 'api/v1/rule/' + payload.rowId + '/' + urlType,
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function (response) {

        auth.statusCodeHandler(response);
        res(response.data);

      }).catch(function (errors) {

        auth.statusCodeHandler(errors);
        rej(errors);
      });
    });
  },

  deleteRule(id) {

    return new Promise((res, rej) => {

      // will add confirmation

      swal({
        title: 'Are you sure ?',
        text: 'Items will be deleted !',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(function (response) {

        if (response == true) {

          axios({
            method: 'DELETE',
            url: store.getters.getServerPath + 'api/v1/rule/' + id,
            headers: store.getters.getConfigHeaders,
            withCredentials: true
          }).then(function (response) {

            auth.statusCodeHandler(response);
            res(response.data);

          }).catch(function (errors) {

            auth.statusCodeHandler(errors);
            rej(errors);
          });
        }

      });


    });
  }
}
