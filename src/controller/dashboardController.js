import store from '@/store/index'
import axios from 'axios'
import auth from '@/controller/authController2'

export default {

  getThings(pageNumber,pageSize){
    return new Promise((res, rej) => {
      /* const data = {
        "content": [
          {
              "id": "1",
              "resourceId": "1",
              "rscResourceTypeName": "Hava sıcak olduğunda pencere açılır.",
              "name": "Pencere Aç",
              "description": "Pencere Aç",
              "resourceStatus": false
          },
          {
              "id": "2",
              "resourceId": "2",
              "rscResourceTypeName": "sanane banen ne bizene.",
              "name": "hiç bişey yapma ",
              "description": "Yat uyu",
              "resourceStatus": true
          },
          {
              "id": "3",
              "resourceId": "3",
              "rscResourceTypeName": "test1.",
              "name": "test1 ",
              "description": "test1",
              "resourceStatus": false
          }
    ],
      "pageable": {
        "sort": {
          "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "offset": 0,
          "pageSize": 10,
          "pageNumber": 0,
          "paged": true,
          "unpaged": false
      },
      "totalPages": 1,
      "last": true,
      "totalElements": 3,
      "size": 10,
      "number": 0,
      "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
      },
      "numberOfElements": 3,
      "first": true,
      "empty": false
    };

      if (data) {
        res(data);
      } else {
        rej("Null Data");
      }*/


      // let url = store.getters.getServerPath + 'api/v1/dash/things?size=100&page=0';
      // if(pageNumber && pageSize){
      //   url = url +"?page=" +pageNumber +"&size=" + pageSize;
      // }
      // axios({
      //   method: 'GET',
      //   url: url,
      //   headers: store.getters.getConfigHeaders,
      //   withCredentials: true
      // }).then(function (response) {
      //   res(response.data);
      // }).catch(function (errors) {
      //   auth.statusCodeHandler(errors);
      //   rej(errors);
      // });

    });
  },
  getResourceList() {
    return new Promise((res, rej) => {

      let page = 0;
      let size = 20;
      let method = "GET";
      let url = store.getters.getServerPath + "api/v1/dash/things" + "?page=" + page + "&size=" + size;

      axios({
        method: method,
        url: url,
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function(response) {
        res(response.data);
      }).catch(function(errors) {
        rej(errors);
      });
    });
  },
  getResourceValues(array){

    return new Promise((res, rej) => {
      let missions = [];

      array.map(item => {
        missions.push(new Promise((res, rej) => {
          axios({
            method: 'POST',
            url: store.getters.getServerPath + "api/v1/dash/get",
            headers: store.getters.getConfigHeaders,
            withCredentials: true,
            data: item
          }).then((response) => {
            return res(response.data);
          }).catch((err) => {
            return rej(err);
          });
        }));
      });
      Promise.all(missions).then(function(response) {
        return res(response);
      });
    });
  },
  getAllChannels(){
    return new Promise((res, rej) => {

      let method = "GET";
      let url = store.getters.getServerPath + "api/v1/dash/getChannels";

      axios({
        method: method,
        url: url,
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function(response) {
        res(response.data);
      }).catch(function(errors) {
        rej(errors);
      });
    });
  }
}
