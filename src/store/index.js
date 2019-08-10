/**
 * Created by eyoryas on 05-Dec-18.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/* eslint-disable */
export default new Vuex.Store({
  state: {
    config: {
      token: false,
      theme: "light",
      serverPath: (process.env.NODE_ENV === "development") ? process.env.VUE_APP_SERVER_PATH_DEV : process.env.VUE_APP_SERVER_PATH_PRODUCTION,

      headers: {
        //"content-type": "application/x-www-form-urlencoded",
        "content-type": "application/json",
        "cache-control": "no-cache"
      }
    },
    languages: {
      lang: 'en',
      langList: {},
      locale: {}
    },
    roleTypes: {
      list: {}
    },
    authUser: null,
    individuals: {
      list: {},
      searchResult: {}
    },
    services: {
      list: {},
      searchResult: {}
    },
    organizations: {
      list: {
        "0": {
          defaultLang:"tr",
          identificationNumber:"12345678900",
          isLegalEntity:false,
          language:"",
          organizationActivityStartDt:"2019-08-10",
          organizationName1:"Telekom",
          organizationName2:"",
          organizationNameId:"",
          organizationNameTypeCd:0,
          partyId:0
        },
        "1": {
          defaultLang:"tr",
          identificationNumber:"12344478900",
          isLegalEntity:false,
          language:"",
          organizationActivityStartDt:"2019-08-10",
          organizationName1:"Turkcell",
          organizationName2:"",
          organizationNameId:"",
          organizationNameTypeCd:0,
          partyId:0
        }
      },
      placesLocal: {},
      placesGeo: {},
      searchResult: {},
    //  roleTypes: {}
    },
    products: {
      list: {},
      searchResult: {}
    },
    offers: {
      list: {},
      searchResult: {}
      //selectedOrganizationProducts: {}
    },
    biRequests: {
      list: {}
    },
    settings: {
      parentList: {},
      childList: {},
      lookupList: {}
    },
    lookups: {},
    involvements: {
      list: {}
    },
    resourceTypes: {
      list: {},
      searchResult: {}
    },
    resources:{
      list: {}
    },
    dashboard:{
      dashboardId:'',
      dashboardIdList: {},
      list: {}
    }
  },

  mutations: {
    SET_THEME (state, theme) {
      state.config.theme = theme
    },
    SET_TOKEN (state, token) {
      state.config.token = token
    },
    SET_AUTH_USER (state, user) {
      state.authUser = user
    },
    SET_LANG (state, lang) {
      state.languages.lang = lang
    },
    SET_LANG_LIST (state, list) {
      state.languages.langList = list
    },
    SET_LOCALE (state, locale) {
      state.languages.locale = locale;
      state.languages.locale['list'] = state.languages.langList
    },
    SET_DASHBOARDID (state, dashboardId) {
      state.dashboard.dashboardId = dashboardId;
    },
    SET_DASHBOARD_LIST (state, dashboardIdList) {
      state.dashboard.dashboardIdList = dashboardIdList
    },
    SET_ALL_INDIVIDUALS(state, list) {
      state.individuals.list = list
    },
    SET_ALL_SERVICES(state, list) {
      state.services.list = list
    },
    SET_ALL_BIREQUESTS(state, list) {
      state.biRequests.list = list
    },
    SET_ORGANIZATION (state, list) {
      state.organizations.list = list
    },
    SET_ALL_ORGANIZATION (state, list) {
      state.organizations.list = list
    },
    SET_ORGANIZATION_LOCAL_PLACES (state, list) {
      state.organizations.placesLocal = list
    },
    SET_ORGANIZATION_GEO_PLACES (state, list) {
      state.organizations.placesGeo = list
    },
    SET_ALL_PRODUCTS (state, list) {
      state.products.list = list
    },
    SET_SEARCH_RESULT_PRODUCTS (state, list) {
      //state.products.searchResult = list
      state.products.list = list
    },
    SET_SEARCH_RESULT_ORGANIZATION (state, list) {
      state.organizations.searchResult = list
    },
    SET_SEARCH_RESULT_INDIVIDUALS (state, list){
      state.individuals.searchResult = list;
    },
    SET_SEARCH_RESULT_SERVICES (state, list){
      state.services.searchResult = list;
    },
    SET_PARTY_ROLE_TYPES (state, list) {
      state.roleTypes.list = list
    },
    SET_ALL_OFFERS (state, list) {
      state.offers.list = list
    },
    SET_SEARCH_RESULT_OFFERS (state, list){
      state.offers.list = list
    },
    SET_CHANNELS (state, list){
      state.dashboard.list = list
    },
    SET_SEARCH_RESULT_RESOURCES (state, list){
      state.resources.list = list
    },
    SET_SETTINGS_PARENT_LIST (state, list) {
      state.settings.parentList = list
    },
    SET_SETTINGS_CHILD_LIST (state, list) {
      state.settings.childList = list
    },
    SET_SETTINGS_LOOKUP_LIST(state, list) {
      state.settings.lookupList = list
    },
    SET_LOOKUP_ITEMS(state, payload) {
      state.lookups[payload.target] = payload.list
    },
    SET_INVOLVEMENTS (state, list) {
      state.involvements.list = list
    },
    SET_RESOURCE_TYPES (state, list) {
      state.resourceTypes.list = list
    }
  },

  actions: {
    setTheme ({ commit }, theme) {
      commit('SET_THEME', theme)
    },
    setToken ({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    setAuthUser ({ commit }, user) {
      commit('SET_AUTH_USER', user)
    },
    setLang ({ commit }, lang) {
      commit('SET_LANG', lang)
    },
    setLangList ({ commit }, list) {
      commit('SET_LANG_LIST', list)
    },
    setLocale ({ commit }, locale) {
      commit('SET_LOCALE', locale)
    },
    setDashboardId ({ commit }, dashboardId) {
      commit('SET_DASHBOARDID', dashboardId)
    },
    setDashboardIdList ({ commit }, list) {
      commit('SET_DASHBOARD_LIST', list)
    },
    setAllIndividuals({ commit}, list) {
      commit('SET_ALL_INDIVIDUALS', list);
    },
    setAllServices({ commit}, list) {
      commit('SET_ALL_SERVICES', list);
    },
    setAllBiRequests({ commit}, list) {
      commit('SET_ALL_BIREQUESTS', list);
    },
    setOrganization( {commit}, obj) {
      commit('SET_ORGANIZATION', obj)
    },
    setAllOrganizations ({ commit }, list) {
      commit('SET_ALL_ORGANIZATION', list)
    },
    setOrganizationLocalPlaces ({ commit }, list) {
      commit('SET_ORGANIZATION_LOCAL_PLACES', list)
    },
    setOrganizationGeoPlaces ({ commit }, list) {
      commit('SET_ORGANIZATION_GEO_PLACES', list)
    },
    setAllProducts ({ commit }, list) {
      commit('SET_ALL_PRODUCTS', list)
    },
    setSearchResultProducts ({ commit }, list) {
      commit('SET_SEARCH_RESULT_PRODUCTS', list)
    },
    setSearchResultOrganization ({ commit }, list) {
      commit('SET_SEARCH_RESULT_ORGANIZATION', list)
    },
    setSearchResultIndividuals ({ commit }, list){
      commit('SET_SEARCH_RESULT_INDIVIDUALS', list)
    },
    setSearchResultServices ({ commit }, list){
      commit('SET_SEARCH_RESULT_SERVICES', list)
    },
    setPartyRoleTypes({ commit }, list) {
      commit('SET_PARTY_ROLE_TYPES', list)
    },
    setAllOffers ({ commit }, list) {
      commit('SET_ALL_OFFERS', list)
    },
    setSearchResultOffers ({commit}, list) {
      commit('SET_SEARCH_RESULT_OFFERS', list)
    },
    setSearchResultResources ({commit}, list){
      commit('SET_SEARCH_RESULT_RESOURCES', list)
    },
    setChannels({commit}, list){
      commit('SET_CHANNELS', list)
    },
    setSettingsParentList ({ commit }, list) {
      commit('SET_SETTINGS_PARENT_LIST', list)
    },
    setSettingsChildList ({ commit }, list) {
      commit('SET_SETTINGS_CHILD_LIST', list)
    },
    setSettingsLookupList({commit }, list) {
      commit('SET_SETTINGS_LOOKUP_LIST', list)
    },
    setLookupItems({commit, state}, target) {

      const master = state.settings.parentList;
      let data;
      let list = [];
      Object.keys(master).map(function (key) {
        if (master[key]["tableName"] === target) {

          data = master[key]["lookupDtos"];

          Object.keys(data).map(function (key) {

            if (data[key]["lang"] === state.languages.lang) {
              list.push(data[key])
            }
          });

          let payload = {
            list: null,
            target: null
          };

          payload.list = list;
          payload.target = target;

          commit('SET_LOOKUP_ITEMS', payload);
        }
      });
    },
    setInvolvements({commit }, list) {
      commit('SET_INVOLVEMENTS', list)
    },
    setResourceTypes({commit }, list) {
      commit('SET_RESOURCE_TYPES', list)
    }
  },

  getters: {
    getToken(state) {
      return state.config.token;
    },
    getAuthUser(state) {
      return state.authUser;
    },
    getServerPath(state) {
      return state.config.serverPath;
    },
    getConfigHeaders(state) {
      return state.config.headers;
    },
    getLang(state) {
      return state.languages.lang;
    },
    getLangList(state) {
      return state.languages.langList;
    },
    getLocale(state) {
      return state.languages.locale;
    },
    getDashboardId(state) {
      return state.dashboard.dashboardId;
    },
    getDashboardIdList(state) {
      return state.dashboard.dashboardIdList;
    },
    getTheme(state) {
      return state.config.theme;
    },
    getAllIndividuals(state) {
      return state.individuals.list;
    },
    getAllServices(state) {
      return state.services.list;
    },
    getSearchResultServices(state) {
      return state.services.searchResult;
    },
    getAllBiRequests(state) {
      return state.biRequests.list;
    },
    getAllOrganizations (state) {
      return state.organizations.list
    },
    getOrganizationLocalPlaces (state) {
      return state.organizations.placesLocal;
    },
    getOrganizationGeoPlaces (state) {
      return state.organizations.placesGeo;
    },
    getAllProducts (state) {
      return state.products.list
    },
    getSearchResultProducts (state) {
      //return state.products.searchResult
      return state.products.list
    },
    getSearchResultOrganization (state) {
      return state.organizations.searchResult;
    },
    getSearchResultIndividuals (state) {
      return state.individuals.searchResult;
    },
    getPartyRoleTypes(state) {
      return state.organizations.roleTypes;
    },
    getAllOffers(state) {
      return state.offers.list
    },
    getSearchResultOffers(state) {
      return state.offers.list
    },
    getSearchResultResources(state) {
      return state.resources.list;
    },
    getChannels(state){
      return state.dashboard.list;
    },
    getSettingsParentList (state) {
      return state.settings.parentList;
    },
    getSettingsChildList (state) {
      return state.settings.childList;
    },
    getSettingsLookupList (state) {
      return state.settings.lookupList;
    },
    getInvolvements (state) {
      return state.involvements.list;
    },
    getLookupItems:  (state) => (target) => {

      const data = state.lookups[target];
      let list = [];

      Object.keys(data).map(function (key) {

        if (data[key]["lang"] === state.languages.lang) {
          list.push(data[key])
        }
      });

      return list;

      //return state.lookups[target]

      //return state.lookups.target;
      /*return new Promise((res, rej) => {

        const data = state.lookups;

        Object.keys(data).map(function (key) {

          if (key === target) {

            res(data[target])
          }
        });
      });*/
    },
    getAllResourceTypes (state) {
      return state.resourceTypes.list;
    }
  }
})
