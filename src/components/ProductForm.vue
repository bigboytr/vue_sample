<template>
    <div class="row">
        <div class="col-md-12">

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>{{locale.products.placeholder.organization}}</label>
                        <selectOrganization @getOrganizationId="setOrganizationId"
                                            :selected="dto.epParty.id"></selectOrganization>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <label>{{locale.products.placeholder.productType}}</label>
                        <selectProductType @getProductTypeCode="setProductTypeCode"
                                           :selected="dto.productTypeCd"></selectProductType>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-9">
                    <div class="form-group">
                        <label>{{locale.products.placeholder.productName}}</label>
                        <input type="text" class="form-control" name="name"
                               v-validate.disable="'required'"
                               data-vv-as="Product Name"
                               v-model="dto.name">
                        <i v-show="errors.has('name')" class="icon icon-triangle-warning"></i>
                        <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>{{locale.products.placeholder.productDescription}}</label>
                        <input type="text" class="form-control"
                               v-model="dto.description">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>{{locale.products.placeholder.productStatus}}</label>
                        <selectStatus @getStatusCode="setStatusCode"
                                      :selected="dto.statusCd"></selectStatus>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="form-group">
                        <label>{{locale.products.placeholder.productCapacity}}</label>
                        <input type="text" class="form-control" name="product_capacity"
                               v-validate.continues.disable="'required|numeric'"
                               data-vv-as="Product Capacity"
                               v-model="dto.productCapacity">
                        <i v-show="errors.has('product_capacity')" class="icon icon-triangle-warning"></i>
                        <span v-show="errors.has('product_capacity')" class="text-danger">{{ errors.first('product_capacity') }}</span>
                    </div>
                </div>
            </div>

            <div class="row padding-t-10">
                <div class="col-xs-8 col-sm-6 col-md-6">
                    <div class="form-group">
                        <button class="btn btn-primary" @click="submitForm()">
                            <i class="icon icon-arrow-right"></i>
                            {{locale.common.button.save}}
                        </button>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-6 col-md-6">
                    <div class="form-group pull-right">
                        <button class="btn btn-danger btn-block" data-dismiss="modal">
                            <i class="icon icon-cross"></i>
                            {{locale.common.button.cancel}}
                        </button>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    import store from '@/store/index';
    import controller from '@/controller/productController'
    import selectOrganization from '@/components/plugin/selectOrganization'
    import selectProductType from '@/components/plugin/selectProductType'
    import selectStatus from '@/components/plugin/selectStatus'
    import notifyMe from '@/controller/notifyMe';

    export default {
        name: 'ProductForm',
        props: ['item'],
        components: {
            selectOrganization,
            selectProductType,
            selectStatus
        },
        data() {
            return {
                dto: {
                    epParty: {
                        id: 0
                    },
                    description: null,
                    name: null,
                    productCapacity: null,
                    productCapacityDemand: null,
                    productId: "",
                    productTypeCd: 0,
                    statusCd: 0
                },
                messages:""

            }
        },
        mounted() {
          const self = this;
          $('#modal').on("hide.bs.modal", function () {
            self.resetDtoForm();
          });
        },
        methods: {
            resetDtoForm(){
                this.dto.epParty.id = 0;
                this.dto.description = "";
                this.dto.name = "";
                this.dto.productCapacity = "";
                this.dto.productCapacityDemand = "";
                this.dto.productId = "";
                this.dto.productTypeCd = 0;
                this.dto.statusCd = 0;
                this.errors.clear(); // For validation errors clean
                this.$parent.$parent.detailData = null; // For watch item must be always trigger
            },
            submitForm() {

                let self = this;
                this.$validator.validateAll().then(function(response) {

                  if (response) {
                    controller.save(self.dto).then(function (response) {
                      self.$parent.$parent.search();
                      notifyMe.successNotifierGlobal(self.messages.common.statusNotification.successProduct);
                      self.close();

                    }).catch(function(errors) {
                        notifyMe.errorNotifierGlobal(errors);
                    });
                  } else {
                    notifyMe.warningNotifierGlobal(self.messages.common.statusNotification.fillForm);
                    console.log(self.$validator.errors);
                  }
                }, function() {
                  console.log(self.$validator);
                });

            },
            setOrganizationId(id) {
                this.dto.epParty.id = id
            },
            setProductTypeCode(code) {
                this.dto.productTypeCd = code;
            },
            setStatusCode(code) {
                this.dto.statusCd = code;
               /*   this.errors.add({
                    field: 'status',
                    msg: 'status is already in use'
                  }); */
            },
            close() {
              this.resetDtoForm();
              $("#modal").modal("hide");
            }
        },
        computed: {
            langList() {
                return store.getters.getLangList;
            },
            locale() {
                return this.messages = store.getters.getLocale;
            }
        },
        watch: {
            item: function (data) {
                // This method is watching props data which name is item.
                // If item object is changed somewhere then its fired.
                console.log(data);
                if (data != null) {
                    this.dto.epParty.id = data.epParty.id;
                    this.dto.description = data.description;
                    this.dto.name = data.name;
                    this.dto.productCapacity = data.productCapacity;
                    this.dto.productCapacityDemand = data.productCapacityDemand;
                    this.dto.productId = data.productId;
                    this.dto.productTypeCd = data.productTypeCd;
                    this.dto.statusCd = data.statusCd;
                } else {
                    this.resetDtoForm();
                }

            }
        }
    }
</script>
