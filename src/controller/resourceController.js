/**
 * Created by eyoryas on 11-Feb-19.
 */
import axios from 'axios'
import store from '@/store/index'
import auth from '@/controller/authController2'
import alertMe from '@/controller/alertMe';

export default {

  /*getAll () {

    axios({
      method: 'GET',
      url: store.getters.getServerPath + 'api/v1/resource/all',
      headers: store.getters.getConfigHeaders,
      withCredentials: true
    }).then(function (response) {

      auth.statusCodeHandler(response);
      // set created individual list into global store
      store.dispatch('setResourceTypes', response.data);

    }).catch(function (errors) {

      //alertMe.errorNotify(errors);
      auth.statusCodeHandler(errors);

    })
  },*/
  getResourceDetail(id) {

    return new Promise((res, rej) => {

      let method = "GET";
      let url = store.getters.getServerPath + "api/v1/resource/get/" + id;

      axios({
        method: method,
        url: url,
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function (response) {
        res(response.data);
      }).catch(function (errors) {
        rej(errors);
      });
    });
  },

  save(dto, typeId, serviceId, allocateFlag, parentId) {
    let self = this;
    return new Promise((res, rej) => {

      let method = "POST";
      let url = store.getters.getServerPath + "api/v1/resource/" + typeId + "/" + serviceId;

      axios({
        method: method,
        url: url,
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data: dto
      }).then(function (response) {
        if(allocateFlag && response.data && response.data.id){
          self.allocateResource(parentId, response.data.id);
        }else{
          res(response);
        }
      }).catch(function (errors) {
        rej(errors);
      });
    });
  },

  /*search(dto) {
    let url = this.searchURL(dto);

    axios({
      method: 'GET',
      url: store.getters.getServerPath + 'api/v1/searchResourceType' + url,
      headers: store.getters.getConfigHeaders,
      withCredentials: true
    }).then(function (response) {

      auth.statusCodeHandler(response);

      // Offers list must work with search button
      store.dispatch('setResourceTypes', response.data);

    }).catch(function (errors) {

      //alertMe.errorNotify(errors);
      auth.statusCodeHandler(errors);

    })
  },*/

  getResourcesByServiceId(id) {

    return new Promise((res, rej) => {

      axios({
        method: 'GET',
        url: store.getters.getServerPath + 'api/v1/resource/getbyservice/' + id,
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function (response) {

        auth.statusCodeHandler(response);

        res(response.data.body);

      }).catch(function (errors) {

        //alertMe.errorNotify(errors);
        auth.statusCodeHandler(errors);

        // rej(errors)
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

  searchResource(dto){

    return new Promise((res, rej) => {
      let url = this.searchURL(dto);
     //   let url = "/?partyId=&productId=&serviceId=&resourceName=ali";

      axios({
        method: 'GET',
        url: store.getters.getServerPath + 'api/v1/searchresources' + url,
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

  allocateResource(parentResourceId, childResourceId){
      return new Promise((res, rej) => {
          axios({
            method: 'PUT',
            url: store.getters.getServerPath + 'api/v1/resourceallocation/'+ parentResourceId + "/" + childResourceId,
            headers: store.getters.getConfigHeaders,
            withCredentials: true
          }).then(function (response) {

            auth.statusCodeHandler(response);
            res(response.data);
            alertMe.successNotify(response);
          }).catch(function (errors) {

            auth.statusCodeHandler(errors);
            rej(errors);
          });
      });
  },
  deleteResource(resourceId){
      return new Promise((res, rej) => {
        axios({
          method: 'DELETE',
          url: store.getters.getServerPath + 'api/v1/resource/' + resourceId,
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

  getResourceSmartObject(resourceId) {

    return new Promise((res, rej) => {

      //const url = store.getters.getServerPath + 'api/v1/thing/' + resourceId + '/resource/all';
      const url = "/smartObject.json";

      axios({
        method: 'GET',
        url: url,
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function (response) {

        auth.statusCodeHandler(response);
        //res(response.data);
        res(response.data);
        //  store.dispatch('setSearchResultResources', response.data);

      }).catch(function (errors) {

        //alertMe.errorNotify(errors);
        auth.statusCodeHandler(errors);
        rej(errors);
      });

    })
  },

  revertTree(searchList){

    return new Promise ((res, rej) => {

      let outputList = [];

      searchList.forEach(node => {
        outputList = this.getParentNode(node, outputList);
      });

      res(outputList);
    });

  },
  getParentNode(node, nodeList) {
    if (node.parent) {
      //CLONE'lamak için referans alıp değer değişiyor aksi takdirde
      let tempNode = JSON.parse(JSON.stringify(node));
      tempNode.parentResourceId = tempNode.parent.id;
      delete tempNode.parent;
      if (!node.parent.child) {
        node.parent.child = [];
      }
      node.parent.child.push(tempNode);//tree yi parent altındaki child şeklinde çevirdiği yer
      return this.getParentNode(node.parent, nodeList);
    } else {
      let index = nodeList.findIndex(item => item.id === node.id);
      //bulursa bulduğu ilk itemin indexini çevirir. bulamazsa -1 çevirir.
      if (index !== -1) {
        if (node.child) {
          nodeList[index].child = nodeList[index].child.concat(node.child);
          let data = this.singulationSameParent(nodeList[index]);
          nodeList[index] = data;
        }
      } else {
        if (!node.child) {
          node.child = []; // sonradan ekledim.
        }
        nodeList.push(node);
      }
      return nodeList;
    }
  },
  findDuplicateItems(list){
    if (list.length > 0) {
      let objects = {};
      let result = [];
      list.map((item, index) => {
        if(!objects[item.id])
        {
          objects[item.id] = {
            count: Number
          };
          objects[item.id].count = 0;
        }
        objects[item.id].count++;
        if (objects[item.id].count > 1) {
          result.push(list.findIndex(element => element.id === item.id));//first duplicated item
          result.push(index);//second duplicated item
        }
      });
      return result;//[duplicatedItemFirstIndex, duplicatedItemSecondIndex]
    }
  },
  singulationSameParent(node){
    if (node.child) {
      let duplicatedIndexList = this.findDuplicateItems(node.child);
      //NOTE: duplicatedIndexList.length is only 0 or 2
      if (duplicatedIndexList.length > 0) {
        //tekrar eden kayıt işlemleri
        if(!node.child[duplicatedIndexList[0]].child){
          node.child[duplicatedIndexList[0]].child = [];
        }
        node.child[duplicatedIndexList[0]].child = node.child[duplicatedIndexList[0]].child.concat(node.child[duplicatedIndexList[1]].child);//tekrar eden 2 kaydın childı ilk kaydın childine eklenir
        node.child.splice(duplicatedIndexList[1], 1);//listten tekrar eden kayıt silinir
        //node childleri toparlayıp getir ve childa setleyip return et
        node.child[duplicatedIndexList[0]] = this.singulationSameParent(node.child[duplicatedIndexList[0]]);
        return node;//EN SON BU ÇALIŞIR
      } else {
        //kayıt tekrar etmez ise
        //BU STACKTEN TOPLAMASININ HABERCİSİ
        return node;
      }
    } else {
      return node;
    }
  },
}
