<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <div class="panel-title">
                        {{locale.resources.pageTitle}}
                        <button class="btn btn-sm btn-default pull-right" @click="newModal()">
                            <i class="fas fa-plus"></i>
                            {{locale.resources.button.new}}
                        </button>
                    </div>
                </div>
                <div class="panel-body">
                    <!-- Content goes here -->
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.resources.placeholder.organization}}</label>
                                <selectOrganization @getOrganizationId="setOrganizationId"
                                                    :selected="dto.organizationId"></selectOrganization>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.resources.placeholder.product}}</label>
                                <selectProduct :selected="dto.productId" @getProductId="setProductId"
                                               :partyId="dto.organizationId" :type="2"></selectProduct>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.resources.placeholder.service}}</label>
                                <selectService @getServiceId="setServiceId" :productId="dto.productId"
                                               :selected="dto.serviceId"></selectService>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.resources.placeholder.name}}</label>
                                <input type="text" class="form-control" v-model="dto.resourceName">
                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-md-8">
                            <button type="button" class="btn btn-sm btn-primary" @click="search()">
                                <i class="fas fa-search"></i>
                                {{locale.common.button.search}}
                            </button>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div v-if="outputList.length > 0" class="col-md-12">
                            <div class="yy_table table-bordered table-striped">
                                <div class="yy_head">
                                    <div class="yy_row">
                                        <div class="yy_cell cell1">Resource Name</div>
                                        <div class="yy_cell cell2">Action</div>
                                    </div>
                                </div>

                                <div class="yy_body">
                                    <TreeResource v-for="(item, key) in outputList"
                                                  :depth="0"
                                                  :deleteMethod="deleteSelected"
                                                  :allocateMethod="addChild"
                                                  :index="key"
                                                  :sendValue="setResourceId"
                                                  :item="item"></TreeResource>
                                </div>
                            </div>
                        </div>
                    </div>
                    <emptyList :list="outputList"></emptyList>
                </div>
            </div>
        </div>

        <modal :title="modalTitle" :id="'modal'" :cssClass="'modal-lg'">
            <formElem :item="detailData" :addChild="addChildFlag"
                      :parentId="selectedParentId"
                      :parentCoreId="selectedParentCoreId"></formElem>
        </modal>

        <modal :title="'Resource Smart Object'" :id="'modal2'" :cssClass="'modal-lg'">
            <smartObject :dataModel="dataModel" :resourceId="clickedResource"></smartObject>
        </modal>
    </div>
</template>

<script>
    import store from '@/store/index'
    import router from '@/router'
    import controller from '../controller/resourceController';

    import modal from '@/components/ModalTemplate'
    import emptyList from '@/components/plugin/emptyDataset'
    import formElem from '@/components/ResourceForm'
    import smartObject from '@/components/plugin/SmartObject.vue'

    import selectOrganization from '../components/plugin/selectOrganization.vue'
    import selectProduct from '../components/plugin/selectProduct.vue'
    import selectService from '../components/plugin/selectService.vue'
    import TreeResource from "../components/plugin/TreeResource";
    import notifyMe from '@/controller/notifyMe';

    export default {
        name: "Resources",
        data() {
            return {
                detailData: null,
                modalTitle: null,
                selectedRows: [],
                addChildFlag: false,
                selectedParentId: "",
                selectedParentCoreId: "",
                dto: {
                    //      isActive: true,
                    organizationId: "0",
                    productId: "0",
                    serviceId: "0",
                    resourceName: ""
                },
                outputList: [],
                mock: {
                    resources: {}
                },
                clickedResource: null,
                dataModel: null,
                messages:""
            }
        },
        components: {
            TreeResource,
            modal,
            formElem,
            selectOrganization,
            selectProduct,
            selectService,
            emptyList,
            smartObject
        },
        methods: {
            newResourceType() {
                router.push('/resource-types')
            },
            newModal() {
                this.detailData = null;
                this.modalTitle = this.locale.resources.newForm;
                this.addChildFlag = false;
                this.selectedParentId = "";
                $('#modal').modal('show');
            },
            resetDtoForm(){
                this.dto.organizationId = 0;
                this.dto.productId = 0;
                this.dto.serviceId = 0;
            },
            setOrganizationId(id) {
                this.dto.organizationId = id;
                this.dto.productId = 0;
                this.dto.serviceId = 0;
            },
            setProductId(id) {
                this.dto.productId = id;
                this.dto.serviceId = 0;
            },
            setServiceId(id) {
                this.dto.serviceId = id;
            },
            setResourceId(id) {
                // TODO: use id to get resource's smart object tree
                const self = this;
                controller.getResourceSmartObject(id).then(function (response) {

                    self.clickedResource = id;
                    self.dataModel = response;
                    $("#modal2").modal("show");

                });
            },
            search() {
                const self = this;
                controller.searchResource(this.dto).then(function (response) {
                    controller.revertTree(response).then(function (output) {
                        self.outputList = output;
                    });
                });
            },

            deleteSelected(resourceId) {
                let self = this;
                controller.deleteResource(resourceId).then( (res) => {
                  notifyMe.successNotifierGlobal(self.messages.common.statusNotification.deleteResource);
                  this.search();
                });
            },

            addChild(itemId, coreId) {
              this.detailData = null;
              this.modalTitle = this.locale.resources.newForm;
              this.addChildFlag = true;
              this.selectedParentId = itemId;
              this.selectedParentCoreId = coreId;
              $('#modal').modal('show');
            }
        },
        computed: {
            locale() {
                return this.messages = store.getters.getLocale;
            }
        }
    }
</script>

