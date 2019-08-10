<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <div class="panel-title">
                        {{locale.products.pageTitle}}
                        <button class="btn btn-sm btn-default pull-right" @click="newItemModal()">
                            <i class="fas fa-plus"></i>
                            {{locale.products.button.new}}
                        </button>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.products.placeholder.organization}}</label>
                                <selectOrganization @getOrganizationId="setOrganizationId"></selectOrganization>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.products.placeholder.productType}}</label>
                                <selectProductType @getProductTypeCode="setProductTypeCode"></selectProductType>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>{{locale.products.placeholder.productName}}</label>
                                <input type="text" class="form-control" v-model="searchObj.productName">
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
                    <!-- TABLE LIST -->
                    <div class="row">
                        <div class="col-md-12">
                            <table v-if="list.length > 0" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th v-for="(field, key) in locale.products.tableFields">
                                        {{field}}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, key) in list">
                                    <td width="5%">{{key+1}}</td>
                                    <td width="15%">{{item.name}}</td>
                                    <td width="35%">{{item.description}}</td>
                                    <td width="10%">{{getStatus(item.statusCd)}}</td>
                                    <td width="5%">{{item.productCapacity}}</td>
                                    <!--<td width="15%">{{getType(item.productTypeCd)}}</td>-->
                                    <td width="15%">{{item.productTypeName}}</td>
                                    <td width="5%" align="center">
                                        <label>
                                            <input type="checkbox" v-model="selectedRows" :value="item.productId">
                                        </label>
                                    </td>
                                    <td width="10%">
                                        <div class="button-group">
                                            <button class="btn btn-xs btn-warning" @click="showDetail(item)">
                                                <i class="icon icon-edit"></i>
                                            </button>
                                            <button class="btn btn-xs btn-danger" @click="deleteSelected(item.productId)">
                                                <i class="icon icon-cross-small"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                                <tfoot v-if="selectedRows.length > 0">
                                <tr>
                                    <td colspan="6"></td>
                                    <td align="center">
                                        <button class="btn btn-sm btn-danger" @click="deleteSelected()">
                                            {{locale.common.button.deleteSelected}}
                                        </button>
                                    </td>
                                    <td></td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                  <emptyList :list="list"></emptyList>
                </div>
            </div>

            <modal :title="modalTitle" :id="'modal'">
                <formElem :item="detailData"></formElem>
            </modal>

        </div>
    </div>
</template>
<script>
    import store from '../store/index';
    import controller from '../controller/productController'
    import lookup from '../controller/lookupController'
    import modal from '../components/ModalTemplate.vue'
    import formElem from '../components/ProductForm.vue'
    import selectOrganization from '../components/plugin/selectOrganization.vue'
    import selectProductType from '../components/plugin/selectProductType.vue'
    import emptyList from '@/components/plugin/emptyDataset'
    import notifyMe from '@/controller/notifyMe';

    export default {
        name: 'Product',
        data () {
            return {
                modalTitle: null, // modal title set to mode, Edit/New
                detailData: null, // for edited row
                selectedRows: [], // if need, multiple delete array
                searchObj: {
                    isActive: true,
                    lang: store.getters.getLang,
                    partyId: 0, // -> organization ID
                    productType: "",
                    productName: ""
                },
                messages:""
            }
        },
        components: {
            modal,
            formElem,
            selectOrganization,
            selectProductType,
            emptyList
        },
        mounted () {
          //  controller.search(this.searchObj);
        },
        methods: {
            newItemModal() {
                this.detailData = null;
                this.modalTitle = this.locale.products.newForm;
                $('#modal').modal('show');

            },
            showDetail(item) {
                this.detailData = item;
                this.modalTitle = this.locale.products.editForm;
                $('#modal').modal('show');
            },
            search() {
                controller.search(this.searchObj);
            },
            setOrganizationId(id) {
                this.searchObj.partyId = id
            },
            setProductTypeCode(code) {
                this.searchObj.productType = code
            },
            deleteSelected (id) {
                if (id !== undefined) {
                    this.selectedRows.push(id);
                }
                const self = this;
                controller.delete(this.selectedRows).then(function (res) {
                  self.selectedRows = [];
                  if (res !== undefined) {
                    notifyMe.successNotifierGlobal(res + " " + self.messages.common.statusNotification.deleteProduct);
                    self.search();
                  }
                });
            },
            getType(code) {
                // this called in list forEach
                return lookup.getNameByCode(code, "PR_PRODUCT_TYPE")
            },
            getStatus(code) {
                // this called in list forEach
                return lookup.getNameByCode(code, "CBE_LKP_STATUS")
            }
        },
        computed: {
            list() {
                return store.getters.getSearchResultProducts
            },
            locale() {
                return this.messages = store.getters.getLocale;
            }
        }
    }
</script>
