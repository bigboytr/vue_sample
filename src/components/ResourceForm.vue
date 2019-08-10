<template>

    <div class="row">
        <div class="col-md-12">

            <div class="row">
                <div class="col-md-4">
                    <div class="form-group" :class="errors.has('resName') ? 'has-error' : ''">
                        <label>{{locale.resources.placeholder.name}}</label>
                        <input type="text" name="resName" class="form-control"
                               v-validate="'required|min:3'"
                               v-model="dto.resourceDto.name">
                        <i v-show="errors.has('resName')" class="icon icon-triangle-warning"></i>
                        <span v-show="errors.has('resName')" class="text-danger">{{ errors.first('resName') }}</span>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label>{{locale.resources.placeholder.description}}</label>
                        <input type="text" class="form-control" v-model="dto.resourceDto.description">
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label>{{locale.resources.placeholder.status}}</label>
                        <selectStatus @getStatusCode="setStatusCode"
                                      :selected="dto.resourceDto.usageStateCd"></selectStatus>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label>{{locale.offers.placeholder.organization}}</label>
                        <selectOrganization @getOrganizationId="setOrganizationId"
                                            :id="'sel-org1'"
                                            :selected="resourceSelectors.orgId"></selectOrganization>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label>{{locale.offers.placeholder.product}}</label>
                        <selectProduct @getProductId="setProductId"
                                       :partyId="resourceSelectors.orgId"
                                       :type="2"
                                       :id="'sel-prod1'"
                                       :selected="resourceSelectors.prodId"></selectProduct>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label>{{locale.resources.placeholder.service}}</label>
                        <selectService @getServiceId="setServiceId"
                                       :productId="resourceSelectors.prodId"
                                       :selected="resourceSelectors.servId"></selectService>
                    </div>
                </div>
            </div>

            <div class="row" v-show="resourceSelectors.servId != '0'">

                <div class="col-md-12">
                    <hr>
                    <h4>{{locale.resources.selectType}}</h4>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label>{{locale.offers.placeholder.organization}}</label>
                        <selectOrganization @getOrganizationId="setOrganizationId2"
                                            :id="'sel-org2'"
                                            disabled
                                            :selected="resourceSelectors.orgId"></selectOrganization>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label>{{locale.offers.placeholder.product}}</label>
                        <selectProduct @getProductId="setProductId2"
                                       :partyId="resourceSelectors.orgId"
                                       :type="1"
                                       :id="'sel-prod2'"
                                       :selected="typeSelectors.prodId"></selectProduct>
                    </div>
                </div>

                <!--<div class="col-md-4">
                    <div class="form-group">
                        <label>{{locale.resources.placeholder.resourceType}}</label>
                        <selectResourceType name="resourceType"
                                            @getResourceTypeId="setResourceTypeId"
                                            :productId="typeSelectors.prodId"
                                            :selected="typeSelectors.typeId"></selectResourceType>
                    </div>
                </div>-->

                <div class="col-md-12" v-if="typeSelectors.typeId != '0'">
                    <label>&nbsp;</label>
                    <div class="form-group">
                        <button class="btn btn-default btn-sm" @click="createForm()">
                            <i class="icon icon-cpu"></i>
                            {{locale.resources.button.getConfig}}
                        </button>
                        <i class="margin-l-15"> <i class="icon icon-arrow-left"></i>
                            Please click the 'Generate Form' button to create dynamic form via selected resource type's create config field.</i>
                    </div>
                </div>

            </div>

            <hr>

            <div class="row" v-if="Object.keys(formJson).length > 0">
                <div class="col-md-12">
                    <p class="alert alert-info">
                        {{locale.resources.formInfo}}
                    </p>
                </div>
                <div class="col-md-4" v-for="(val, key) in formJson">
                    <div class="form-group">
                        <label>{{key | capitalize}}</label>
                        <input class="form-control" type="text" :name="key"
                               v-model.trim="dto.meaningOfData[slicer(val)]">
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
    import controller from '@/controller/resourceController'
    import selectOrganization from '@/components/plugin/selectOrganization'
    import selectProduct from '@/components/plugin/selectProduct'
    import selectService from '@/components/plugin/selectService'
    import selectStatus from '@/components/plugin/selectStatus'
    import notifyMe from '@/controller/notifyMe';


    export default {
        name: 'ResourceForm',
        props: ['item', "addChild", "parentId", "parentCoreId"],
        components: {
            selectOrganization,
            selectProduct,
            selectService,
            selectStatus,
        },
        data() {
            return {
                resourceSelectors: {
                    orgId: "0",
                    prodId: "0",
                    servId: "0"
                },
                typeSelectors: {
                    prodId: "0",
                    typeId: "0"
                },
                dto: {
                    meaningOfData: {},
                    resourceDto: {
                        iotCoreResourceId: this.parentCoreId,
                        usageStateCd: "0",
                        name: "",
                        description: "",
                        resourceCapacity: "1",
                        parentResourceId: this.parentId,
                        createConfig: "",
                        readConfig: "",
                        writeConfig: "",
                        writeAttrConfig: "",
                        executeConfig: "",
                        deleteConfig: "",
                        discoverConfig: "",
                        observeConfig: ""
                    }

                },
                formJson: {},
                messages:""
            }
        },
        mounted() {
            const self = this
            $('#modal').on("hide.bs.modal", function () {

                //self.dto.resourceDto.parentResourceId = null
                self.resetForm();
            });
        },
        methods: {
            resetForm(){
                // assign empty value into dto fields
                const self = this;
                Object.keys(this.dto.resourceDto).map(function (key) {

                    switch (typeof self.dto.resourceDto[key]) {
                        case "string" :  self.dto.resourceDto[key] = ""; break;
                        case "object" : self.dto.resourceDto[key] = {}; break;
                        case "array" : self.dto.resourceDto[key] = []; break;
                        default : self.dto.resourceDto[key] = null; break;
                    }
                });
                this.formJson = {};
                this.dto.resourceDto.usageStateCd = "0";
                this.resourceSelectors.orgId = "0";
                this.resourceSelectors.prodId = "0";
                this.resourceSelectors.servId = "0";
                this.typeSelectors.prodId = "0";
                this.typeSelectors.typeId = "0";

                // error bag clearance
                this.errors.clear();
            },
            submitForm() {
                let self = this;

                this.$validator.validateAll().then(function (response) {

                    if (response) {

                        // son olarak create configteki bilgileri stringify yapıyoruz.
                        self.dto.meaningOfData = JSON.stringify(self.dto.meaningOfData);

                        controller.save(self.dto,
                                self.typeSelectors.typeId.id,
                                self.resourceSelectors.servId,
                                self.$props.addChild,
                                self.$props.parentId).then(function (response) {

                            notifyMe.successNotifierGlobal(self.messages.common.statusNotification.successResource);
                           // self.resetForm();
                            self.closeForm();
                        });
                    } else {
                        notifyMe.warningNotifierGlobal(self.messages.common.statusNotification.fillForm);
                    }
                });

            },
            createForm() {
                //let json = typeController.getById(this.selectedResourceTypeId);
                //this.dto.createConfig = JSON.parse(this.selectedResourceTypeId.createConfig);

                // form oluşturmak için kullandığımız temp değişken
                let createObj = JSON.parse(this.typeSelectors.typeId.createConfig);

                const self = this;

                // form dto works
                Object.keys(createObj).map(function (key) {

                    const checkValue = createObj[key].toString();

                    if (/#/.test(checkValue)) {

                        self.$set(self.formJson, key, createObj[key]);
                    }

                });

                // REAL DTO works
                Object.keys(this.formJson).map(function (key) {

                    const oldKey = self.formJson[key].toString();

                    let newKey = oldKey.replace(/#/g, '');
                    self.$set(self.dto.meaningOfData, newKey, self.formJson[key]);


                });

                // resource typetan gelen configleri dto içine yazıyoruz.
                //this.dto.resourceDto.readConfig = JSON.stringify(this.typeSelectors.typeId.readConfig);
                 /*this.dto.writeConfig = JSON.stringify(this.selectedResourceTypeId.writeConfig);
                this.dto.observeConfig = JSON.stringify(this.selectedResourceTypeId.observeConfig);
                this.dto.deleteConfig = JSON.stringify(this.selectedResourceTypeId.deleteConfig);
                this.dto.executeConfig = JSON.stringify(this.selectedResourceTypeId.executeConfig);*/

            },
            slicer(value) {
                value = value.toString();
                return value.replace(/#/g, '');
            },
            setOrganizationId(id) {
                this.resourceSelectors.orgId = id;
            },
            setProductId(id) {
                this.resourceSelectors.prodId = id;
            },
            setServiceId(id) {
                this.resourceSelectors.servId = id;
            },
            setOrganizationId2(id) {
                this.typeSelectors.orgId = id;
            },
            setProductId2(id) {
                this.typeSelectors.prodId = id;
            },
            setStatusCode(id) {
                this.dto.resourceDto.usageStateCd = id;
            },
            setResourceTypeId(id) {
                this.typeSelectors.typeId = id; // this is selected item object. not only id
                this.formJson = {};
                this.dto.meaningOfData = {};
            },
            closeForm(){
              this.resetForm();
              $(".modal").modal("hide");
            }
        },
        computed: {
            locale() {
                return this.messages = store.getters.getLocale;
            }
        },
        filters: {
            capitalize: function (value) {
                if (!value) return '';
                value = value.toString();
                return value.charAt(0).toUpperCase() + value.slice(1);
            }
        },
        watch: {
            parentId: {
                immediate: true,
                handler(data) {
                    this.dto.resourceDto.parentResourceId = data
                }
            },
            parentCoreId: {
                immediate: true,
                handler(data) {
                    this.dto.resourceDto.iotCoreResourceId = data
                }
            },
            /*item: {
                immediate: true,
                  handler(data) {
                    // This method is watching props data which name is item.
                    // If item object is changed somewhere then its fired.
                    if (data != null) {

                        // TODO: organization selection needs to wait retrieve products
                        this.resourceSelectors.orgId = data.pdProduct.epParty.partyId;
                        this.resourceSelectors.prodId = data.pdProduct.productId;

                        const self = this;
                        Object.keys(this.dto.resourceDto).map(function (key) {
                            self.dto.resourceDto[key] = data[key];
                        })

                    } else {
                        this.resetForm()
                    }
                }
            }*/
        }
    }
</script>
