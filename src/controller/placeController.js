/**
 * Created by eyoryas on 26-Dec-18.
 */
import store from '@/store/index';
import axios from 'axios'
import alertMe from '@/controller/alertMe';
import auth from '@/controller/authController2'
import swal from "sweetalert";

export default {

  getLocalPlacesByParty(id) {

    axios({
      method: 'GET',
      url: store.getters.getServerPath + 'api/v1/place/localplaces/'+id,
      headers: store.getters.getConfigHeaders,
      withCredentials: true
    }).then(function (response) {

      auth.statusCodeHandler(response);

      store.dispatch('setOrganizationLocalPlaces', response.data);

    }).catch(function (errors) {

      alertMe.errorNotify(errors);
    })

  },

  saveLocalPlaceToParty(id, dto) {

    return new Promise ((res, rej) => {
      axios({
        method: 'POST',
        url: store.getters.getServerPath + 'api/v1/place/localplace/'+id,
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data: dto
      }).then(function (response) {

        res(response);

      }).catch(function (errors) {

        rej(errors);
      })

    });

  },
  updateLocalPlace(dto) {

    return new Promise ((res, rej) => {
      axios({
        method: 'PUT',
        url: store.getters.getServerPath + 'api/v1/place/localplace/update/'+ dto.id,
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data: dto
      }).then(function (response) {

        res(response);

      }).catch(function (errors) {

        rej(errors);
      })

    });

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
          url: store.getters.getServerPath + "api/v1/place/localplace/delete/" + id,
          headers: store.getters.getConfigHeaders,
          withCredentials: true
        }).then(() => {
          countS++;
        })
      )))
        .then(() => countS);
    },
  getGeopraphicPlacesByParty(party_id) {
    return new Promise ((res, rej) => {
      axios({
        method: 'GET',
        url: store.getters.getServerPath + 'api/v1/place/geographicplaces/' + party_id,
        headers: store.getters.getConfigHeaders,
        withCredentials: true
      }).then(function (response) {
        auth.statusCodeHandler(response.status);
        store.dispatch('setOrganizationGeoPlaces', response.data);
        res(response.data);
      }).catch(function (errors) {
        alertMe.errorNotify(errors);
        rej(errors);
      })
    });
  },

  createGeopraphicPlacesToParty(dto, party_id) {
    const self = this;
    return new Promise ((res, rej) => {
      axios({
        method: 'POST',
        url: store.getters.getServerPath + 'api/v1/place/geographicplace/' + party_id,
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data:dto
      }).then(function (response) {
        res(response);
      }).catch(function (errors) {
        rej(errors);
      });
    });
  },
  saveGeopraphicPlacesToParty(dto) {
    const self = this;
    return new Promise ((res, rej) => {
     axios({
        method: 'PUT',
        url: store.getters.getServerPath + 'api/v1/place/geographicplace/update/' + dto.placeId,
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data:dto
      }).then(function (response) {
        res(response);
      }).catch(function (errors) {
        rej(errors);
      });
    });
  },
  deleteGeopraphicPlacesToParty(dto) {
    const self = this;
    return new Promise ((res, rej) => {

      swal({
        title: 'Are you sure ?',
        text: 'Items will be deleted !',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(function (responseSwal) {
        if (responseSwal) {
          // continue to process
          // call api request with axios
          // success swal will be in axios promise
          axios({
            method: 'DELETE',
            url: store.getters.getServerPath + 'api/v1/place/geographicplace/delete/' + dto.id,
            headers: store.getters.getConfigHeaders,
            withCredentials: true,
            data:dto
          }).then((responseRequest)=> {
            res(responseRequest);
          }).catch((errors)=> {
            rej(errors);
          });
        }
      })
    });
  },
}
