<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <div class="panel-title">
                        {{locale.organization.pageTitle}}
                        <button class="btn btn-sm btn-default pull-right" @click="newItemModal()">
                            <i class="fas fa-plus"></i>
                            {{locale.organization.button.new}}
                        </button>
                        <button class="btn btn-sm btn-default pull-right margin-r-5" data-toggle="collapse"
                                aria-expanded="false" data-target="#search">
                            <i class="fas fa-filter"></i>
                            {{locale.common.label.filter}}
                        </button>
                    </div>
                </div>
                <div class="panel-body">

                    <div class="collapse margin-b-10" id="search">

                        <div class="row">
                            <div class="col-md-3">
                              <label>{{locale.organization.placeholder.from}}</label>
                              <div class="form-group">
                                   <!-- <input type="date" class="form-control" v-model="searchDto.startD"> -->
                                  <date-picker input-class="form-control" v-model="searchDto.startD" @change="setStartDate" lang="en" format="YYYY-MM-DD"></date-picker>
                                </div>

                            </div>
                            <div class="col-md-3">
                              <label>{{locale.organization.placeholder.to}}</label>
                              <div class="form-group">
                                  <!--  <input type="date" class="form-control" v-model="searchDto.endD"> -->
                                    <date-picker input-class="form-control" v-model="searchDto.endD" @change="setEndDate" lang="en" format="YYYY-MM-DD"></date-picker>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>{{locale.organization.placeholder.organizationName1}}</label>
                                    <div class="form-group">
                                        <input type="text" class="form-control" v-model="searchDto.name1">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <label>{{locale.organization.placeholder.organizationName2}}</label>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="searchDto.name2">
                                </div>
                            </div>
                        </div>

                        <div class="collapse" id="advancedSearch">
                            <div class="row">
                                <div class="col-md-3">
                                    <label> {{locale.organization.placeholder.language}}</label>
                                    <selectLanguage :selected="searchDto.lang"
                                                    @get-value="setDefaultLang"></selectLanguage>
                                </div>
                                <div class="col-md-9">
                                    <label>{{locale.organization.placeholder.deactivated}}</label>
                                    <div class="form-group">
                                        <toggle :checkValue="searchDto.active"
                                                :id="'chk1'"
                                                @get-toggle="setSearchActive" class="margin-r-20"></toggle>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <label>{{locale.organization.placeholder.identification}}</label>
                                    <div class="form-group">
                                        <input type="text" class="form-control" v-model="searchDto.identificationNumber">
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                      <label>{{locale.organization.placeholder.organizationRole}}</label>
                                      <!--<selectPartyRole @getPartyRoleCode="setPartyRoleTypeCode"
                                                   :selected="searchDto.roleCode"></selectPartyRole>-->
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <label>{{locale.organization.placeholder.city}}</label>
                                    <div class="form-group">
                                        <input type="text" class="form-control" v-model="searchDto.city">
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label> {{locale.organization.placeholder.country}}</label>
                                    <!--<selectCountry @getCountryCode="setCountryCode"
                                                   :selected="searchDto.countryCode"></selectCountry>-->
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <button type="button" class="btn btn-sm btn-primary" @click="search()">
                                    <i class="fas fa-search"></i>
                                    {{locale.common.button.search}}
                                </button>
                                <button type="button" class="btn btn-sm btn-default margin-l-5" data-toggle="collapse"
                                        aria-expanded="false" data-target="#advancedSearch">
                                    {{locale.common.button.advancedSearch}}
                                </button>
                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <table  v-if="list" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th v-for="(field, key) in locale.organization.tableFields">
                                        {{field}}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, key) in list">
                                    <td width="5%">{{key}}</td>
                                    <td width="15%">{{item.identificationNumber}}</td>
                                    <td width="20%">{{item.organizationName1}}  {{item.organizationName2}}</td>
                                    <td width="15%">{{item.defaultLang}}</td>
                                    <td width="15%">{{item.organizationActivityStartDt}}</td>
                                    <td width="5%" align="center">
                                        <label>
                                            <input type="checkbox" v-model="selectedRows" :value="item.id">
                                        </label>
                                    </td>
                                    <td width="10%">
                                        <div class="button-group">
                                            <button class="btn btn-xs btn-warning" @click="showDetail(item)">
                                                <i class="fas fa-edit fa-fw"></i>
                                            </button>
                                            <button class="btn btn-xs btn-danger"
                                                    @click="deleteSelectedItem(item.id)">
                                                <i class="fas fa-times fa-fw"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                                <tfoot v-if="selectedRows.length > 0">
                                <tr>
                                    <td colspan="7"></td>
                                    <td align="center">
                                        <button class="btn btn-sm btn-danger"
                                                @click="deleteSelectedItems(selectedRows)">
                                            {{locale.common.button.deleteSelected}}
                                        </button>
                                    </td>
                                    <td></td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <emptyList v-if="!list" :list="list"></emptyList>
                </div>
            </div>

            <modal :title="locale.organization.form" :id="'modal'" :cssClass="'modal-lg'">
                <organizationForm :item="detailData"></organizationForm>
            </modal>

        </div>
    </div>
</template>
<script>
    import store from '../store/index';
    import controller from '../controller/organizationController'
    import modal from '../components/ModalTemplate.vue'
    import organizationForm from '../components/OrganizationForm.vue'
    import moment from 'moment';
    import toggle from '@/components/plugin/toggleSwitch'
    import selectCountry from '@/components/plugin/selectCountry'
    import selectLanguage from '@/components/plugin/selectLanguage'
    // import selectPartyRole from '@/components/plugin/selectRoleType'
    import emptyList from '@/components/plugin/emptyDataset'
    import notifyMe from '@/controller/notifyMe';
    import datePicker from 'vue2-datepicker'

    export default {
        name: 'Organization',
        data () {
            return {
                detailData: null,
                searchInput: '',
                selectedRows: [],
                searchDto: {
                    startD: moment().add(-1, 'month').format("YYYY-MM-DD"),
                    endD: moment().add(1, 'day').format("YYYY-MM-DD"),
                    active: true,
                    city: "",
                    code: "",
                    countryCode: "",
                    identificationNumber: "",
                    lang: store.getters.getLang,
                    name1: "",
                    name2: "",
                    roleCode:""
                },
                messages:""
            }
        },
        components: {
            modal,
            organizationForm,
            toggle,
            selectCountry,
            selectLanguage,
            //selectPartyRole,
            emptyList,
            datePicker
        },
        created(){
      //    settingsController.getParentList();
        },
        mounted () {

        },
        methods: {
            selectFirstTab() {
              $(".nav-tabs > li.active").removeClass("active");
              $(".nav-tabs > li:first").addClass("active");

              $(".tab-pane.active").removeClass("in active");
              $(".tab-pane:first").addClass("in active");
            },
            newItemModal() {
                this.detailData = null;
                $('#modal').modal('show');
            },
            showDetail(item) {
                this.detailData = item;
                $('#modal').modal('show');
                this.selectFirstTab();
            },
            deleteSelectedItem (id) {
                let self = this;
                controller.deleteOrganization(id, function () {
                    self.selectedRows = [];
                    notifyMe.successNotifierGlobal(self.messages.common.statusNotification.deleteOrganization);
                    self.search();

                }, function () {
                    self.selectedRows = [];
                    notifyMe.errorNotifierGlobal("Organization not deleted");
                    self.search();

                });
            },
            deleteSelectedItems (ids) {
                let self = this;
                controller.deleteOrganizations(ids, function (response) {
                    self.selectedRows = [];
                    const responseValue = response || 0;
                    notifyMe.successNotifierGlobal(responseValue + " " + self.messages.common.statusNotification.deleteOrganization);
                    self.search();
                }, function () {
                    self.selectedRows = [];
                    notifyMe.errorNotifierGlobal("Organization not deleted");
                    self.search();
                });
            },
            search() {
                controller.search(this.searchDto);
            },
            setSearchActive(value) {
                this.searchDto.active = value;
            },
            setCountryCode(value) {
                this.searchDto.countryCode = value;
            },
            setDefaultLang(value) {
                if(value === 0 || value === "0"){
                  this.searchDto.lang = store.getters.getLang;
                }else {
                  this.searchDto.lang = value;
                }
            },
            setPartyRoleTypeCode(code) {
                this.searchDto.roleCode = code;
            },
            customFormatter(date) {
              return moment(date).format('YYYY-MM-DD');
            },
            setStartDate(variable) {
              this.searchDto.startD = moment(variable).format('YYYY-MM-DD');
            },
            setEndDate(variable) {
              this.searchDto.endD = moment(variable).format('YYYY-MM-DD');
            }
        },
        computed: {
            list () {
                //return store.getters.getSearchResultOrganization;
                console.log(store.getters.getAllOrganizations);
                return store.getters.getAllOrganizations;
            },
            locale() {
                return this.messages = store.getters.getLocale;
            }
        }
    }
</script>
