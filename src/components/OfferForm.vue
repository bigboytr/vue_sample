<template>
    <div>
        <div class="row">
            <div class="col-md-12">

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>{{locale.offers.placeholder.organization}}</label>
                            <selectOrganization @getOrganizationId="setOrganizationId"
                                                :selected="dto.pdProductOfferingDto.partyId" :disabled="disabled" ></selectOrganization>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group">
                            <label>{{locale.offers.placeholder.product}}</label>
                            <selectProduct @getProductId="setProductId"
                                           :partyId="dto.pdProductOfferingDto.partyId"
                                           :selected="dto.pdProductOfferingDto.productId" :type="2" :disabled="disabled"></selectProduct>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>{{locale.offers.placeholder.offerName}}</label>
                            <input type="text" class="form-control" name="offerName"
                                   v-validate.disable="'required'"
                                   v-model="dto.pdProductOfferingDto.name">
                            <i v-show="errors.has('offerName')" class="icon icon-triangle-warning"></i>
                            <span v-show="errors.has('offerName')" class="text-danger">{{ errors.first('offerName') }}</span>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>{{locale.offers.placeholder.offerDescription}}</label>
                            <input type="text" class="form-control" v-model="dto.pdProductOfferingDto.description">
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

    </div>
</template>

<script>
    import store from '@/store/index';
    import controller from '@/controller/offerController'
    import selectOrganization from '@/components/plugin/selectOrganization'
    import selectProduct from '@/components/plugin/selectProduct'
    import productForm from "@/components/ProductForm"
    import modal from '@/components/ModalTemplate'
    import notifyMe from '@/controller/notifyMe';

    export default {
        name: 'OfferForm',
        props: ['item'],
        components: {
            selectOrganization,
            selectProduct,
            productForm,
            modal
        },
        data() {
            return {
                dto: {
                  pdProductOfferingDto: {
                    name: null,
                    description: null,
                    productId: 0,
                    productOfferingId: 0,
                    partyId: 0
                  }
                },
                disabled : false,
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
                this.dto.pdProductOfferingDto.partyId = 0;
                this.dto.pdProductOfferingDto.productId = 0;
                this.dto.pdProductOfferingDto.productOfferingId = 0;
                this.dto.pdProductOfferingDto.name = "";
                this.dto.pdProductOfferingDto.description = "";
                this.errors.clear(); // For validation errors clean
                this.$parent.$parent.detailData = null; // For watch item must be always trigger
            },
            submitForm() {

                let self = this;
                this.$validator.validateAll().then(function(response) {

                  if (response) {
                    controller.save(self.dto).then(function(response) {

                      self.$parent.$parent.search(); // this line is load list again
                      notifyMe.successNotifierGlobal(self.messages.common.statusNotification.successOffer);
                      self.close();
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
                this.dto.pdProductOfferingDto.partyId = id;
            },
            setProductId(id) {
                this.dto.pdProductOfferingDto.productId = id;
            },
            close() {
              this.resetDtoForm();
              $("#modal").modal("hide");
            }
        },
        computed: {
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

                    this.dto.pdProductOfferingDto.partyId = data.partyId;
                    this.dto.pdProductOfferingDto.productId = data.productId;
                    this.dto.pdProductOfferingDto.productOfferingId = data.productOfferingId;
                    this.dto.pdProductOfferingDto.name = data.productOfferingName;
                    this.dto.pdProductOfferingDto.description = data.productOfferingDescription;

                } else {
                    this.resetDtoForm()
                }

            }
        }
    }
</script>
