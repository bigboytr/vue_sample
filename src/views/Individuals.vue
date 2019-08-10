<template>
    <div class="row individuals">
        <div class="col-md-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <div class="panel-title">
                        {{locale.individuals.pageTitle}}
                        <button class="btn btn-sm btn-default pull-right" @click="newForm()">
                            <i class="fas fa-plus"></i>
                            {{locale.individuals.button.new}}
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
                          <label>{{locale.individuals.placeholder.from}}</label>
                          <div class="form-group">
                            <date-picker input-class="form-control" v-model="searchDto.startD"
                                         @change="setStartDate" lang="en" format="YYYY-MM-DD"></date-picker>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <label>{{locale.organization.placeholder.to}}</label>
                          <div class="form-group">
                            <date-picker input-class="form-control" v-model="searchDto.endD" @change="setEndDate" lang="en" format="YYYY-MM-DD" ></date-picker>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>{{locale.individuals.placeholder.name}}</label>
                            <div class="form-group">
                              <input type="text" class="form-control" v-model="searchDto.givenName">
                            </div>
                          </div>
                        </div>

                        <div class="col-md-3">
                          <label>{{locale.individuals.placeholder.surname}}</label>
                          <div class="form-group">
                            <input type="text" class="form-control" v-model="searchDto.familyName">
                          </div>
                        </div>

                        <div class="col-md-3">
                          <label>{{locale.individuals.placeholder.lockedUser}}</label>
                          <div class="form-group">
                            <toggle :checkValue="searchDto.isLocked"
                                    :id="'chk3'"
                                    @get-toggle="setLockedUser" class="margin-r-20"></toggle>
                          </div>
                        </div>
                      </div>

                      <div class="collapse" id="advancedSearch">

                        <div class="row">
                          <div class="col-md-3">
                            <div class="form-group">
                              <label>{{locale.individuals.placeholder.identification}}</label>
                              <div class="form-group">
                                <input type="text" class="form-control" v-model="searchDto.identificationNumber">
                              </div>
                            </div>
                          </div>

                          <div class="col-md-3">
                            <label>{{locale.common.label.email}}</label>
                            <div class="form-group" :class="errors.has('email') ? 'has-error' : ''">
                              <input type="text" class="form-control" name="email"
                                     v-validate="'required|email'"
                                     v-model="searchDto.email">
                         <!--     <i v-show="errors.has('email')" class="icon icon-triangle-warning"></i> -->
                         <!--     <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span> -->
                            </div>
                          </div>

                          <div class="col-md-3">
                            <label>{{locale.individuals.placeholder.deActiveIndividuals}}</label>
                            <div class="form-group">
                              <toggle :checkValue="searchDto.active"
                                      :id="'chk4'"
                                      @get-toggle="setSearchActive" class="margin-r-20"></toggle>
                            </div>
                          </div>
                        </div>

                        <div class="row">

                          <div class="col-md-3">
                            <div class="form-group">
                              <label>{{locale.individuals.placeholder.username}}</label>
                              <div class="form-group">
                                <input type="text" class="form-control" v-model="searchDto.username">
                              </div>
                            </div>
                          </div>

                          <div class="col-md-3">
                            <div class="form-group">
                              <label>{{locale.individuals.placeholder.roleType}}</label>
                              <selectPartyRoleType @getPartyRoleCode="setPartyRoleTypeCode"
                                                   :selected="searchDto.roleCode"></selectPartyRoleType>
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
                            <selectCountry @getCountryCode="setCountryCode"
                                           :selected="searchDto.countryCode"></selectCountry>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <button type="button" class="btn btn-sm btn-primary" @click="search()"> <!-- TODO: Click Searchh -->
                            <i class="fas fa-search"></i>
                            {{locale.common.button.search}}
                          </button>
                          <button type="button" class="btn btn-sm btn-default margin-l-5" data-toggle="collapse"
                                  aria-expanded="false" data-target="#advancedSearch">
                            {{locale.common.button.advancedSearch}}
                          </button>
                        </div>
                      </div>

                        <hr>
                    </div>


                    <!--  LIST GEL ALL -->
                    <div class="row" v-if="!searchMode">
                        <div class="col-md-12">
                            <table class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th v-for="(field, key) in locale.individuals.tableFields">
                                        {{field}}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, key) in list">
                                    <td width="5%">{{key+1}}</td>
                                    <td>{{item.identificationNumber}}</td>
                                    <td>
                                        {{item.epIndividualName.givenName}}
                                        {{item.epIndividualName.midName}}
                                        {{item.epIndividualName.familyName}}
                                    </td>
                                    <td>
                                        <span v-if="item.placeOfBirth"> {{item.placeOfBirth}} / {{item.countryOfBirth}} </span>
                                        <span v-if="item.city"> {{item.city}} / {{item.country}} </span>
                                    </td>
                                    <td><span v-if="item.dateOfBirth"> {{dateFormat(item.dateOfBirth)}} </span></td>
                                    <td><span v-if="item.disabilityType"> {{item.disabilityType}} </span></td>
                                    <td>
                                        <span v-if="item.userInfo">{{item.userInfo.userName}}</span>
                                    </td>
                                    <td width="10%" align="center">
                                        <label>
                                            <input type="checkbox" v-model="selectedRows" :value="item.party.partyId">
                                        </label>
                                    </td>
                                    <td width="10%">
                                        <div class="button-group">
                                            <button class="btn btn-xs btn-warning" @click="showDetail(item)">
                                                <i class="icon icon-edit"></i>
                                            </button>
                                            <button class="btn btn-xs btn-danger"
                                                    @click="deleteSelectedItem(item.party.partyId,item.userInfo.id)"
                                                    v-if="!isAdmin(item.party)">
                                                <i class="icon icon-cross-small"></i>
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
                    <!-- LIST SEARCH RESULT -->
                    <div class="row" v-if="searchMode && searchResult">
                        <div class="col-md-12">
                            <table v-if="searchResult.length > 0"
                                   class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th v-for="(field, key) in locale.individuals.tableFieldsSearch">
                                        {{field}}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, key) in searchResult">
                                    <td width="5%">{{key+1}}</td>
                                    <td width="10%">{{item.identificationNumber}}</td>
                                    <td width="20%">{{item.name}} {{item.surname}}</td>
                                    <td width="15%">{{item.individualRole}}</td>
                                    <td width="15%">{{item.email}}</td>
                                    <td width="10%">{{item.city}}</td>
                                    <td width="10%"> {{item.country}}</td>
                                    <td width="5%"><locked :param="item.locked"></locked></td>
                                    <!-- <td width="10%" align="center">
                                       <label>
                                         <input type="checkbox" v-model="selectedRows" :value="item.partyId">
                                       </label>
                                     </td> -->
                                    <td width="10%">
                                        <div class="button-group">
                                            <button class="btn btn-xs btn-warning" @click="openIndividualForm(item.partyId)">
                                                <i class="icon icon-edit"></i>
                                            </button>
                                            <button class="btn btn-xs btn-danger"
                                                    @click="deleteSelectedItem(item.partyId,item.userInfo.id)">
                                                <!-- v-if="!isAdmin(item.party)"> -->
                                                <i class="icon icon-cross-small"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>

                                <!--   <tfoot v-if="selectedRows.length > 0">
                                   <tr>
                                     <td colspan="9"></td>
                                     <td align="center">
                                       <button class="btn btn-sm btn-danger" @click="deleteSelectedItems(selectedRows)">
                                         {{locale.common.button.deleteSelected}}
                                       </button>
                                     </td>
                                     <td></td>
                                   </tr>
                                   </tfoot> -->
                            </table>
                        </div>
                    </div>
                    <emptyList :list="searchResult"></emptyList>
                </div>
            </div>


            <modal :title="modalTitle" :id="'modal'" :cssClass="'modal-lg'">
                <IndividualForm :item="detailData"></IndividualForm>
            </modal>

        </div>
    </div>
</template>
<script>
    import store from '../store/index';
    import controller from '@/controller/individualsController';
    import modal from '../components/ModalTemplate.vue';
    import IndividualForm from '@/components/IndividualForm';
    import selectPartyRoleType from '@/components/plugin/selectRoleType'
    import moment from 'moment';
    import toggle from '@/components/plugin/toggleSwitch'
    import selectCountry from '@/components/plugin/selectCountry'
    import emptyList from '@/components/plugin/emptyDataset'
    import notifyMe from '@/controller/notifyMe';
    import datePicker from 'vue2-datepicker';
    import locked from '@/components/plugin/locked';

    export default {
        name: "Individuals",
        data() {
            return {
                modalTitle: null,
                selectedRows: [],
                detailData: null,
                searchMode: false,
                searchDto: {
                  active: true,
                  city: "",
                  code: 0,
                  countryCode: 0,
                  email:"",
                  startD: moment().add(-1, 'month').format("YYYY-MM-DD"),
                  endD: moment().add(1, 'day').format("YYYY-MM-DD"),
                  familyName:"",
                  givenName:"",
                  identificationNumber: "",
                  isLocked: false,
                  lang: store.getters.getLang,
                  roleCode : 0,
                  username: "",
                },
                messages:"",
                pickerOptions: {
                  disabledDate(time) {
                    return time.getTime() > Date.now();
                  }
                }
            }
        },
        components: {
            modal,
            IndividualForm,
            selectPartyRoleType,
            toggle,
            selectCountry,
            emptyList,
            datePicker,
            locked
        },
        mounted() {
            this.searchMode = true;
        },
        methods: {
            selectFirstTab() {
                $(".nav-tabs > li.active").removeClass("active");
                $(".nav-tabs > li:first").addClass("active");

                $(".tab-pane.active").removeClass("in active");
                $(".tab-pane:first").addClass("in active");
            },
            newForm() {
                this.detailData = null;
                this.modalTitle = this.locale.individuals.newForm;
                this.selectFirstTab();
                $('#modal').modal('show');
            },
            showDetail(item) {
                this.detailData = item;
                this.modalTitle = this.locale.individuals.editForm;
                this.selectFirstTab();
                $('#modal').modal('show');
            },
            openIndividualForm(partyId){
              let self = this;
              controller.getIndividualByPartyId(partyId).then(function (response) {


                self.detailData = response;
                self.modalTitle = self.locale.individuals.editForm;
                self.selectFirstTab();
                $('#modal').modal('show');
              }).catch(function (error){
                notifyMe.errorNotifier(error);
              });
            },
            deleteSelectedItems(ids) { //TODO: This function also delete user if exist
              let self = this;
              controller.deleteIndividuals(ids, function (response) {
                self.selectedRows = [];
                const responseValue = response || 0;
                notifyMe.successNotifierGlobal(responseValue + " " + self.messages.common.statusNotification.deleteIndividuals);
              }, function () {
                self.selectedRows = [];
                notifyMe.errorNotifierGlobal("Individuals not deleted");
              });
            },
            deleteSelectedItem(id, userId) {
              let self = this;
              controller.deleteIndividual(id, userId, function () {
                  self.selectedRows = [];
                  notifyMe.successNotifierGlobal(self.messages.common.statusNotification.deleteIndividual);
                  self.search();
              }, function () {
                  self.selectedRows = [];
                  notifyMe.errorNotifierGlobal("Individuals not deleted");
                  self.search();
              });
            },
            search(){
                controller.search(this.searchDto);
                this.searchMode = true;
            },
            isAdmin(party) {
                let isAdm = false;

                if (party.epPartyRoles.length > 0) {

                    if (party.epPartyRoles[0].partyRoleTypeCd === 1) {
                        isAdm = true;
                    }
                }
                return isAdm;
            },
            dateFormat(dt) {
                return moment(dt).format("DD-MM-YYYY");
            },
            setPartyRoleTypeCode(code) {
              this.searchDto.roleCode = code;
            },
            setLockedUser(value) {
              this.searchDto.isLocked = value;
            },
            setSearchActive(value) {
              this.searchDto.active = value;
            },
            setCountryCode(value) {
              this.searchDto.countryCode = value;
            },
            setStartDate(variable) {
              this.searchDto.startD = moment(variable).format('YYYY-MM-DD');
            },
            setEndDate(variable) {
              this.searchDto.endD = moment(variable).format('YYYY-MM-DD');
            }
        },
        computed: {
            list() {
                return store.getters.getAllIndividuals;
            },
            searchResult(){
                return store.getters.getSearchResultIndividuals;
            },
            locale() {
                return this.messages = store.getters.getLocale;
            }
        }
    }
</script>
