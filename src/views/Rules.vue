<template>
    <div class="row">
        <div class="col-md-12">
            <div v-if="!newRuleView && !newActuatorView" class="panel panel-primary">
                <div class="panel-heading">
                    <div class="panel-title">
                        {{locale.rules.pageTitle}}
                        <button class="btn btn-sm btn-default pull-right" @click="newRule()">
                            <i class="fas fa-plus"></i>
                            {{locale.rules.button.new}}
                        </button>
                        <!--<button class="btn btn-sm btn-warning pull-right margin-r-5">
                            <i class="icon icon-arrow-right"></i>
                            {{locale.rules.button.openDashboard}}
                        </button>-->
                        <!--<button class="btn btn-sm btn-default pull-right margin-r-5" @click="newActuator()">
                          <i class="icon icon-arrow-right"></i>
                          {{locale.rules.button.actuator}}
                        </button>-->

                    </div>
                </div>
                <div class="panel-body">
                    <!-- Content goes here -->

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.rules.placeholder.organization}}</label>
                                <selectOrganization @getOrganizationId="setOrganizationId"
                                                    :selected="searchObj.partyId"></selectOrganization>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.rules.placeholder.product}}</label>
                                <selectProduct @getProductId="setProductId"
                                               :partyId="searchObj.partyId"
                                               :selected="searchObj.productId"
                                               :type="2"></selectProduct>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.rules.placeholder.service}}</label>
                                <selectService @getServiceId="setServiceId"
                                               :selected="searchObj.serviceId"
                                               :productId="searchObj.productId"></selectService>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <button class="btn btn-sm btn-primary" @click="search()">
                                    <i class="fas fa-search"></i>
                                    {{locale.common.button.search}}
                                </button>
                            </div>
                        </div>
                    </div>

                    <hr>

                    <div class="row">

                        <div class="col-md-12" v-if="list.length > 0">
                            <table class="table table-bordered table-striped table-hover">
                                <thead>
                                <tr>
                                    <th v-for="(field, key) in locale.rules.tableFields">
                                        {{field}}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, key) in list">
                                    <td width="25%">{{item.name}}</td>
                                    <td width="50%">{{item.description}}</td>
                                    <td width="15%">
                                        <toggleSwitch :checkValue="item.isActive == 't' ? true : false"
                                                     :id="item.id"
                                                     :rowId="item.id"
                                                     @get-toggle-data="toggleIsActive"></toggleSwitch>
                                    </td>
                                    <td width="10%">
                                        <div class="button-group">
                                            <!--<button class="btn btn-xs btn-warning" @click="editModel(key, item)">
                                                <i class="icon icon-edit"></i>
                                            </button>-->
                                            <button class="btn btn-xs btn-danger" @click="deleteMe(item.id)">
                                                <i class="icon icon-cross-small"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <emptyList :list="list"></emptyList>

                </div>
            </div>

            <ruleForm v-if="newRuleView"></ruleForm>
            <actuatorView v-if="newActuatorView"></actuatorView>

            <!--<modal :title="modalTitle" :id="'modal'" :cssClass="'modal-lg'">

            </modal>-->
        </div>
    </div>
</template>

<script>
    import store from '@/store/index'
    import selectOrganization from '../components/plugin/selectOrganization.vue'
    import selectProduct from '../components/plugin/selectProduct.vue'
    import selectService from '../components/plugin/selectService.vue'
    import toggleSwitch from '@/components/plugin/toggleSwitchExtended'
    import tableSwitch from '@/components/plugin/tableSwitch'
    import controller from '../controller/ruleController'
    import ruleForm from '../components/RuleForm.vue'
    import actuatorView from '../views/Actuators.vue'
    import modal from '../components/ModalTemplate.vue';
    import emptyList from '@/components/plugin/emptyDataset'
    import notifyMe from '@/controller/notifyMe'



    export default {
        name: "RuleEngine",
        data () {
            return {
                newRuleView: false,
                newActuatorView: false,
                /*selectedOrgId: 0,
                selectedProductId: 0,
                selectedServiceId: 0,*/
                serviceActivate: false,
                dto: {
                    name: "",
                    definition: "",
                    isActive: false
                },
                list: [],
                searchObj: {
                    partyId: 0,
                    productId: 0,
                    serviceId: 0
                },
                modalTitle: "",
                isEdit: false
            }
        },
        components: {
            modal,
            ruleForm,
            selectOrganization,
            selectProduct,
            selectService,
            tableSwitch,
            emptyList,
            toggleSwitch,
            actuatorView
        },
        computed: {
            locale() {
                return store.getters.getLocale;
            }
        },
        methods: {
            newRule() {
                //this.isEdit = false;
                //this.modalTitle = "New Rule";
                //$('#modal').modal('show');
                this.newRuleView = true;
            },
            newActuator() {
              //this.isEdit = false;
              //this.modalTitle = "New Rule";
              //$('#modal').modal('show');
                this.newActuatorView = true;
            },
            setOrganizationId(id) {
                //this.selectedOrgId = id;
                this.searchObj.partyId = id;
            },
            setProductId(id) {
                //this.selectedProductId = id;
                this.searchObj.productId = id;
            },
            setServiceId(id) {
                //this.selectedServiceId = id;
                this.searchObj.serviceId = id;
            },
            editModel(key, item){
                this.modalTitle = "Edit Rule";
                this.isEdit = true;
                $('#modal').modal('show');
            },
            search(){
                const self = this;
                controller.search(this.searchObj).then(function (response) {
                    self.list = response;
                });
            },
            deleteMe(id) {

                const self = this;
                controller.deleteRule(id).then(function (response) {

                    notifyMe.successNotifierGlobal(self.messages.common.statusNotification.deleteRule);
                    self.search();

                }).catch(function (errors) {

                    notifyMe.errorNotifier(errors);
                })
            },
            toggleIsActive(payload){

                controller.toggleIsActive(payload).then(function (response) {

                    notifyMe.successNotifier(response);

                }).catch(function (errors) {

                    notifyMe.errorNotifier(errors);
                })
            }
        }
    }
</script>
