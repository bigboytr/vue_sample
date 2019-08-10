<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <div class="panel-title">
                        {{locale.services.pageTitle}}
                        <button class="btn btn-sm btn-default pull-right" @click="newItemModal()">
                            <i class="fas fa-plus"></i>
                            {{locale.service.button.new}}
                        </button>
                    </div>
                </div>
                <div class="panel-body">
                    <!-- Content goes here -->
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.offers.placeholder.organization}}</label>
                                <selectOrganization @getOrganizationId="setOrganizationId"
                                                    :selected="selectedOrgId"></selectOrganization>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.offers.placeholder.product}}</label>
                                <selectProduct @getProductId="setProductId" :selected="selectedProductId"
                                               :partyId="selectedOrgId" :type="2"></selectProduct>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.service.name}}</label>
                                <input type="text" class="form-control" v-model="searchObj.serviceName">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label>{{locale.service.button.retrieveSwitchButton}}</label>
                            <div class="form-group">
                                <toggleSwitch :checkValue="retrieveInvalidService"
                                              :id="'chk-1'"
                                              @get-toggle="setRetrieveInvalidService"
                                              class="margin-r-20"></toggleSwitch>
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
                    <div class="row" v-if="list.length > 0">
                        <div class="col-md-12">
                            <table class="table table-bordered table-striped table-hover">
                                <thead>
                                <tr>
                                    <th width="20%">{{locale.service.tableItems.organization}}</th>
                                    <th width="20%">{{locale.service.tableItems.product}}</th>
                                    <th width="20%">{{locale.service.tableItems.service}}</th>
                                    <th width="20%">{{locale.service.tableItems.numberOfThingsConnected}}</th>
                                    <th width="20%">{{locale.service.tableItems.transactions}}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, key) in list">
                                    <td>
                                        <span>{{item.organizationName}}</span>
                                    </td>
                                    <td>
                                        <span>{{item.productName}}</span>
                                    </td>
                                    <td>
                                        <span>{{item.serviceName}}</span>
                                    </td>
                                    <td>
                                        <span>{{item.numberOfThingsConnected}}</span>
                                    </td>
                                    <td width="20%">
                                        <div class="button-group">
                                            <button class="btn btn-xs btn-warning" @click="editMode(item)">
                                                <i class="icon icon-edit"></i>
                                            </button>

                                            <button class="btn btn-xs btn-danger" @click="deleteItem(item)">
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
            <modal :title="modalTitle" :id="'modal'" :cssClass="'modal-lg'">
                <servicesForm :itemId="itemServiceId" :editForm="edit"></servicesForm>
            </modal>
        </div>
    </div>
</template>

<script>
    import store from '@/store/index'
    import selectOrganization from '../components/plugin/selectOrganization.vue'
    import selectProduct from '../components/plugin/selectProduct.vue'
    import toggleSwitch from '@/components/plugin/toggleSwitch'
    import modal from '../components/ModalTemplate.vue';
    import servicesForm from '@/components/ServicesForm';
    import controller from "../controller/serviceController";
    import emptyList from '@/components/plugin/emptyDataset';
    import notifyMe from '@/controller/notifyMe';

    export default {
        name: "Services",
        data () {
            return {
                edit: false,
                selectedOrgId: 0,
                selectedProductId: 0,
                retrieveInvalidService: false,
                modalTitle: "",
                itemServiceId: null,
                searchObj: {
                    partyId: 0,
                    productId: 0,
                    isActive: true,
                    serviceName: ""
                },
                messages:""
            }
        },
        components: {
            selectOrganization,
            selectProduct,
            toggleSwitch,
            modal,
            servicesForm,
            emptyList
        },
        computed: {
            locale() {
                return this.messages = store.getters.getLocale;
            },
            list() {
                return store.getters.getSearchResultServices;
            }
        },
        methods: {
            resetDto(){
                this.retrieveInvalidService = false;
                this.selectedProductId = 0;
                this.selectedOrgId = 0;
                this.searchObj.partyId = 0;
                this.searchObj.productId = 0;
                this.searchObj.isActive = true;
                this.searchObj.serviceName = "";
            },
            newItemModal() {
                this.edit = false;
                this.itemServiceId = null;
                this.resetDto();
                this.modalTitle = "New Service";
                $('#modal').modal('show');
            },
            setOrganizationId(id) {
                this.selectedOrgId = id;
                this.searchObj.partyId = id;
                this.selectedProductId = 0;
                this.searchObj.productId = 0;
            },
            setProductId(id) {
                this.selectedProductId = id;
                this.searchObj.productId = id;
            },
            setRetrieveInvalidService(value) {
                this.retrieveInvalidService = value;
                this.searchObj.isActive = !value;
            },
            search(){
                controller.searchService(this.searchObj);
            },
            editMode(item){
                this.edit = true;
                this.itemServiceId = item.serviceId;
                this.resetDto();
                this.modalTitle = "Update Service";
                $('#modal').modal('show');
            },
            deleteItem(item){
                const self = this;
                controller.deleteServiceByServiceId(item.serviceId).then((response) => {
                    notifyMe.successNotifierGlobal(self.messages.common.statusNotification.deleteService);
                this.resetDto();
                }).catch((errors) => {
                    notifyMe.errorNotifierGlobal(errors);
                });
            }
        },
        beforeMount() {
       /*     const self = this;
            store.dispatch('setSearchResultServices', []); */
        }
    }
</script>
