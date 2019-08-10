<template>
    <div class="row">
        <div class="col-md-12">

            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label>{{locale.offers.placeholder.organization}}</label>
                        <selectOrganization @getOrganizationId="setOrganizationId"
                                            :selected="selectedOrgId"></selectOrganization>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>{{locale.offers.placeholder.product}}</label>
                        <selectProduct @getProductId="setProductId"
                                       :partyId="selectedOrgId"
                                       :selected="selectedProductId"
                                       :type="2"></selectProduct>
                    </div>
                </div>
                <div class="col-md-4">
                    <label>{{locale.service.serviceDto.serviceActive}}</label>
                    <div class="form-group">
                        <toggleSwitch :checkValue="getCheckBoxValue(dto.isServiceEnabled)"
                                      :id="'chk-3'"
                                      @get-toggle="editServiceEnabled" class="margin-r-20"></toggleSwitch>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label>{{locale.service.serviceDto.serviceName}}</label>
                        <input type="text" class="form-control" name="serviceName"
                               v-validate.disable="'required'"
                               v-model="dto.name">
                        <i v-show="errors.has('serviceName')" class="icon icon-triangle-warning"></i>
                        <span v-show="errors.has('serviceName')" class="text-danger">{{ errors.first('serviceName') }}</span>
                    </div>
                </div>

                <div class="col-md-8">
                    <div class="form-group">
                        <label>{{locale.service.serviceDto.serviceDescription}}</label>
                        <input type="text" class="form-control" v-model="dto.description">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label>{{locale.service.serviceDto.serviceCap}}</label>
                        <input type="text" class="form-control" name="capacity"
                               v-validate.continues="'required|numeric'"
                               v-model="dto.serviceCapacity">
                        <i v-show="errors.has('capacity')" class="icon icon-triangle-warning"></i>
                        <span v-show="errors.has('capacity')" class="text-danger">{{ errors.first('capacity') }}</span>
                    </div>
                </div>

                <div class="col-md-6">
                    <label>{{locale.service.serviceDto.isStatefulService}}</label>
                    <div class="form-group">
                        <toggleSwitch :checkValue="getCheckBoxValue(dto.isStatefulService)"
                                      :id="'chk-2'"
                                      @get-toggle="editStatefulService" class="margin-r-20"></toggleSwitch>
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>{{locale.service.serviceDto.serviceConfiguration}}</label>
                        <input type="text" class="form-control" v-model="dto.serviceConfiguration">
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group">
                        <label>{{locale.service.serviceDto.serviceConfigurationSpec}}</label>
                        <input type="text" class="form-control" v-model="dto.serviceConfigurationSpec">
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
                        <button class="btn btn-danger btn-block" @click="closeForm()" data-dismiss="modal">
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
    import controller from '@/controller/serviceController'
    import selectOrganization from '@/components/plugin/selectOrganization'
    import selectProduct from '../components/plugin/selectProduct.vue'
    import selectStatus from '@/components/plugin/selectStatus'
    import toggleSwitch from '@/components/plugin/toggleSwitch'
    import notifyMe from '@/controller/notifyMe';

    export default {
        name: 'ProductForm',
        props: ['itemId'],
        components: {
            selectOrganization,
            selectProduct,
            selectStatus,
            toggleSwitch
        },
        data() {
            return {
                selectedOrgId: 0,
                selectedProductId: 0,
                dto: {
                    description: "",
                    hasServiceStarted: "f",
                    isMandatory: "f",
                    isServiceEnabled: "f",
                    isStatefulService: "f",
                    name: "",
                    serviceCapacity: "",
                    serviceConfiguration: "",
                    serviceConfigurationSpec: "",
                    startModeCd: 1
                },
                item: 0,
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
                this.dto.description = "";
                this.dto.hasServiceStarted = "f";
                this.dto.isMandatory = "f";
                this.dto.isServiceEnabled = "f";
                this.dto.isStatefulService = "f";
                this.dto.name = "";
                this.dto.serviceCapacity = "";
                this.dto.serviceConfiguration = "";
                this.dto.serviceConfigurationSpec = "";
                this.dto.startModeCd = 1;

                this.selectedOrgId = 0;
                this.selectedProductId = 0;
                this.errors.clear(); // For validation errors clean
                this.$parent.$parent.itemServiceId = null;
            },
            getCheckBoxValue(value){
                return value === "t";
            },
            closeForm(){
                this.resetDtoForm();
                $(".modal").modal("hide");
            },
            submitForm() {

                const self = this;
                this.$validator.validateAll().then(function(response) {

                  if (response) {
                    controller.saveWithProductID(self.dto, self.selectedProductId).then(function(response) {

                      notifyMe.successNotifierGlobal(self.messages.common.statusNotification.successService);
                      self.closeForm();
                      self.$parent.$parent.search();
                    }).catch(function(error) {
                      notifyMe.errorNotifierGlobal(error);
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
                this.selectedOrgId = id;
                this.selectedProductId = 0;
            },
            setCheckBoxValue(value){
                return value === true ? "t" : "f";
            },
            setProductId(id) {
                this.selectedProductId = id;
            },
            editServiceEnabled(value) {
                this.dto.isServiceEnabled = this.setCheckBoxValue(value);
            },
            editStatefulService(value) {
                this.dto.isStatefulService = this.setCheckBoxValue(value);
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
            itemId: function (data) {
                // This method is watching props data which name is item.
                // If item object is changed somewhere then its fired.
                if (data != null) {

                    controller.getServiceByServiceId(data).then((response) => {

                        this.dto.description = response.description;
                        this.dto.hasServiceStarted = this.setCheckBoxValue(response.hasServiceStarted);
                        this.dto.isMandatory = this.setCheckBoxValue(response.isMandatory);
                        this.dto.isServiceEnabled = this.setCheckBoxValue(response.isServiceEnabled);
                        this.dto.isStatefulService = this.setCheckBoxValue(response.isStatefulService);
                        this.dto.name = response.name;
                        this.dto.serviceCapacity = response.serviceCapacity;
                        this.dto.serviceConfiguration = response.serviceConfiguration;
                        this.dto.serviceConfigurationSpec = response.serviceConfigurationSpec;
                        this.dto.startModeCd = response.startModeCd;
                        this.selectedOrgId = response.pdProduct.epParty.id || 0;
                        this.selectedProductId = response.pdProduct.id || 0;
                    });

                } else {
                    this.resetDtoForm();
                }

            }
        }
    }
</script>
