/**
 * Created by eyoryas on 06-Dec-18.
 */
import axios from 'axios';
import store from '@/store/index';
import alertMe from '@/controller/alertMe';

export default {

  getAllUsers() {
    axios({
      method: 'GET',
      url: store.getters.getServerPath + "api/v1/user/all",
      headers: store.getters.getConfigHeaders,
      withCredentials: true
    }).then(function (response) {
      console.log(response);
      // TODO: what will gone do with all users list
    });
  },

  // Unused
  getUser(id) {
    axios({
      method: 'GET',
      url: store.getters.getServerPath + "api/v1/user/getbypartyid/" + id,
      headers: store.getters.getConfigHeaders,
      withCredentials: true
    }).then((response) => {
      //console.log(response);
      //if (response.data){
      return response.data;
      //}
    });
  },

  registerUser(dto) {
    // This function getting register user requests from login screen
    // It's unauthorized function.

    return new Promise((res, rej) => {
      axios({
        method: "POST",
        url: store.getters.getServerPath+'api/v1/user/register',
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

  save(dto, ids) {
    // This function getting requests from individual user details form
    // Create an user by party id

    console.log(dto);
    return new Promise((res, rej) => {

      let apiCall = "";
      let method = "POST";

      if (ids.partyId === null) {
        // New insert
        apiCall = "api/v1/user/create";

      } else {
        // This section is work on edit individual form

        if (ids.id === null || ids.id === undefined) {
          // add user to created individual

          apiCall = "api/v1/user/" + ids.partyId;

        } else {
          // update user info
          apiCall = "api/v1/user/" + ids.id;
          method = "PUT";
        }
      }

      axios({
        method: method,
        url: store.getters.getServerPath + apiCall,
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

  resetPassword(dto) {

    return new Promise((res, rej) => {

      axios({
        method: "POST",
        url: store.getters.getServerPath + 'api/v1/user/forgetpassword',
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data: dto
      }).then(function (response) {
        // response will be server content
        res(response)

      }).catch(function (errors) {

        rej(errors)
      });

    });

  },
  forceChangeAutoPass(dto, success) {

      axios({
        method: "POST",
        url: store.getters.getServerPath + 'api/v1/user/resetpassword',
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data: dto
      }).then(function (response) {
        // response will be server content
        alertMe.successNotify(response);
        success();

      }).catch(function (errors) {

        alertMe.errorNotify(errors);
      });


  },

  changePassword(dto) {

    axios({
      method: "POST",
      url: store.getters.getServerPath + 'api/v1/user/changepassword',
      headers: store.getters.getConfigHeaders,
      withCredentials: true,
      data: dto
    }).then(function (response) {
      // response will be server content
      alertMe.successNotify(response);

    }).catch(function (errors) {

      alertMe.errorNotify(errors);
    });

  },

  getAllInvolvements() {
    // Getting all involvements list from DB

    axios({
      method: "GET",
      url: store.getters.getServerPath + 'api/v1/user/involvements',
      headers: store.getters.getConfigHeaders,
      withCredentials: true,
    }).then(function (response) {
      // response will be server content

      store.dispatch('setInvolvements', response.data);

    }).catch(function (errors) {

      alertMe.errorNotify(errors);
    });
  },
  saveUserInfo(dto){
    return new Promise ((res, rej) => {
      axios({
        method: "PUT",
        url: store.getters.getServerPath + "api/v1/individual/"+ dto.epIndividualDto.partyId,
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
        data: dto
      }).then(function (response) {
        alertMe.successNotify(response);
        res(response);
      }).catch(function (errors) {
        alertMe.errorNotify(errors);
        rej(errors);
      })
    });
  },
  getUserInfo(partyId){
    return new Promise ((res, rej) => {
      axios({
        method: "GET",
        url: store.getters.getServerPath + "api/v1/individual/"+ partyId,
        headers: store.getters.getConfigHeaders,
        withCredentials: true,
      }).then(function (response) {
        res(response.data);
      }).catch(function (errors) {
        alertMe.errorNotify(errors);
        rej(errors);
      })
    });
  }

}
