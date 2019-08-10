<template>
    <div class="row">
        <div class="col-md-12">

            <div class="panel panel-info">
                <div class="panel-heading">
                    <div class="panel-title">
                        New Rule
                        <button class="btn btn-sm btn-default pull-right" @click="closeNewRule()">
                            <i class="icon icon-plus"></i>
                            Back to List
                        </button>
                    </div>
                </div>
                <div class="panel-body">

                    <form-wizard title="" subtitle=""
                                 @on-complete="save"
                                 color="#0082F0"
                                 :backButtonText="locale.common.label.prevStep"
                                 :nextButtonText="locale.common.label.nextStep"
                                 :finishButtonText="locale.common.label.finishStep">

                        <tab-content title="Rule Definition" :before-change="validateStep1">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group" :class="errors.has('ruleName') ? 'has-error' : ''">
                                        <label>Rule Name</label>
                                        <input type="text" name="ruleName" class="form-control"
                                               v-validate="'required|min:5'"
                                               v-model="dto.name">
                                    </div>

                                    <div class="form-group">
                                        <label>Rule Description</label>
                                        <input type="text" class="form-control" v-model="dto.description">
                                    </div>
                                </div>
                            </div>

                        </tab-content>

                        <tab-content title="Condition / Actions" :before-change="validateStep2">

                            <div class="row">

                                <div class="col-md-8">
                                    <!-- IF BLOCK -->
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th width="15%"></th>
                                            <th width="70%">Condition / Actions</th>
                                            <th width="15%">Major Operand</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="valignTop"><h3>IF</h3></td>
                                            <td>

                                                <p class="margin-t-5"
                                                   v-if="Object.keys(cases[0].conditions).length > 0"
                                                   v-for="(item, key) in cases[0].conditions">
                                                    {{item.name}} :
                                                    {{locale.rules.conditionForm.cond[item.function]}} in last
                                                    {{item.period.size}}
                                                    {{locale.rules.conditionForm.inTime[item.period.unit]}}
                                                    is
                                                    {{locale.rules.conditionForm.operand[item.ruleOperand]}} {{item.threshold}}

                                                    <a href="javascript:void(0)"
                                                       class="f-size-15 pull-right text-danger"
                                                       @click="removeThis(cases[0].conditions, key)">
                                                        <i class="icon icon-cross-small"></i>
                                                    </a>
                                                </p>

                                                <button class="btn btn-link" @click="addCondition(0)">
                                                    -{{locale.rules.button.addCondition}}-
                                                </button>

                                            </td>
                                            <td class="valignTop" rowspan="4">
                                                <div class="form-group">
                                                    <select class="form-control" v-model="cases[0].majorOperand">
                                                        <option value="AND">AND</option>
                                                        <option value="OR">OR</option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr v-if="Object.keys(cases[0].conditions).length > 0">
                                            <td class="valignTop"><h3>THEN</h3></td>
                                            <td>

                                                <p class="margin-t-5"
                                                   v-if="Object.keys(cases[0].conditions).length > 0"
                                                   v-for="(item, key) in cases[0].actuators">
                                                    {{item.name}} : {{item.operation}} - Value : {{item.data.value}}

                                                    <a href="javascript:void(0)"
                                                       class="f-size-15 pull-right text-danger"
                                                       @click="removeThis(cases[0].actuators, key)">
                                                        <i class="icon icon-cross-small"></i>
                                                    </a>
                                                </p>

                                                <button class="btn btn-link" @click="addAction(0)">
                                                    -{{locale.rules.button.addAction}}-
                                                </button>
                                            </td>

                                        </tr>
                                        </tbody>
                                    </table>

                                    <!-- ELSE IF BLOCK -->
                                    <table class="table table-bordered"
                                           v-if="elseIfCon && key > 0"
                                           v-for="(elseIfObj, key) in cases">
                                        <thead>
                                        <tr>
                                            <th width="15%">
                                                <button class="btn btn-sm btn-danger" @click="removeElseIf(key)">
                                                    <i class="icon icon-cross-small"></i>
                                                </button>
                                            </th>
                                            <th width="70%">Condition / Actions</th>
                                            <th width="15%">Major Operand</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="valignTop"><h3>ELSE IF</h3></td>
                                            <td>

                                                <p class="margin-t-5"
                                                   v-if="Object.keys(cases[key].conditions).length > 0"
                                                   v-for="(item, i) in cases[key].conditions">
                                                    {{item.name}} :
                                                    {{locale.rules.conditionForm.cond[item.function]}} in last
                                                    {{item.period.size}}
                                                    {{locale.rules.conditionForm.inTime[item.period.unit]}}
                                                    is
                                                    {{locale.rules.conditionForm.operand[item.ruleOperand]}} {{item.threshold}}

                                                    <a href="javascript:void(0)"
                                                       class="f-size-15 pull-right text-danger"
                                                       @click="removeThis(cases[key].conditions, i)">
                                                        <i class="icon icon-cross-small"></i>
                                                    </a>
                                                </p>

                                                <button class="btn btn-link" @click="addCondition(key)">
                                                    -{{locale.rules.button.addCondition}}-
                                                </button>

                                            </td>
                                            <td class="valignTop" rowspan="4">
                                                <div class="form-group">
                                                    <select class="form-control" v-model="cases[key].majorOperand">
                                                        <option value="AND">AND</option>
                                                        <option value="OR">OR</option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr v-if="Object.keys(cases[key].conditions).length > 0">
                                            <td class="valignTop"><h3>THEN</h3></td>
                                            <td>

                                                <p class="margin-t-5"
                                                   v-if="Object.keys(cases[key].conditions).length > 0"
                                                   v-for="(item, i) in cases[key].actuators">
                                                    {{item.name}} : {{item.operation}} - Value : {{item.data.value}}

                                                    <a href="javascript:void(0)"
                                                       class="f-size-15 pull-right text-danger"
                                                       @click="removeThis(cases[key].actuators, i)">
                                                        <i class="icon icon-cross-small"></i>
                                                    </a>
                                                </p>

                                                <button class="btn btn-link" @click="addAction(key)">
                                                    -{{locale.rules.button.addAction}}-
                                                </button>
                                            </td>

                                        </tr>
                                        </tbody>
                                    </table>

                                    <button class="btn btn-block btn-sm btn-primary margin-r-5" @click="elseIfRule()"
                                            :disabled="addAct ? false : true">
                                        Add Else If Block
                                    </button>
                                </div>

                                <div class="col-md-4" v-if="addForm">

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="well">
                                                <h3 v-if="addCon && !addAct"><i class="icon icon-code"></i> Add Condition</h3>
                                                <h3 v-if="addAct"><i class="icon icon-terminal"></i> Add Action</h3>

                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>{{locale.offers.placeholder.organization}}</label>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="form-group">
                                                            <selectOrganization @getOrganizationId="setOrganizationId"
                                                                                :id="'sel-org1'"
                                                                                :selected="selectedOrgId"></selectOrganization>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <label>{{locale.offers.placeholder.product}}</label>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="form-group">
                                                            <selectProduct @getProductId="setProductId"
                                                                           :partyId="selectedOrgId"
                                                                           :type="2"
                                                                           :id="'sel-prod1'"
                                                                           :selected="selectedProdId"></selectProduct>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <label>{{locale.resources.placeholder.service}}</label>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="form-group">
                                                            <selectService @getServiceId="setServiceId"
                                                                           :productId="selectedProdId"
                                                                           :selected="dto.serviceId"></selectService>
                                                        </div>
                                                    </div>
                                                </div>

                                                <table class="table table-bordered" v-if="dto.serviceId">
                                                    <thead>
                                                    <tr>
                                                        <th>Resource Name</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <RecursiveResource v-for="(item, key) in resources"
                                                                               :depth="0"
                                                                               :sendValue="showSmartObject"
                                                                               :item="item"></RecursiveResource>

                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </tab-content>

                        <tab-content title="Summary">

                            <!-- IF BLOCK SUMMARY -->
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th width="15%"></th>
                                    <th width="70%">Condition / Actions</th>
                                    <th width="15%">Major Operand</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="valignTop"><h3>IF</h3></td>
                                    <td>

                                        <p class="margin-t-5"
                                           v-if="Object.keys(cases[0].conditions).length > 0"
                                           v-for="(item, key) in cases[0].conditions">
                                            {{item.name}} :
                                            {{locale.rules.conditionForm.cond[item.function]}} in last
                                            {{item.period.size}}
                                            {{locale.rules.conditionForm.inTime[item.period.unit]}}
                                            is
                                            {{locale.rules.conditionForm.operand[item.ruleOperand]}} {{item.threshold}}
                                        </p>
                                    </td>
                                    <td class="valignTop" rowspan="4">
                                        <h4>{{cases[0].majorOperand}}</h4>
                                    </td>
                                </tr>

                                <tr v-if="Object.keys(cases[0].conditions).length > 0">
                                    <td class="valignTop"><h3>THEN</h3></td>
                                    <td>

                                        <p class="margin-t-5"
                                           v-if="Object.keys(cases[0].conditions).length > 0"
                                           v-for="(item, key) in cases[0].actuators">
                                            {{item.name}} : {{item.operation}} - Value : {{item.data.value}}
                                        </p>
                                    </td>

                                </tr>
                                </tbody>
                            </table>

                            <!-- ELSE IF BLOCK SUMMARY -->
                            <table class="table table-bordered"
                                   v-if="elseIfCon && key > 0"
                                   v-for="(elseIfObj, key) in cases">
                                <thead>
                                <tr>
                                    <th width="15%"></th>
                                    <th width="70%">Condition / Actions</th>
                                    <th width="15%">Major Operand</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="valignTop"><h3>ELSE IF</h3></td>
                                    <td>

                                        <p class="margin-t-5"
                                           v-if="Object.keys(cases[key].conditions).length > 0"
                                           v-for="(item, i) in cases[key].conditions">
                                            {{item.name}} :
                                            {{locale.rules.conditionForm.cond[item.function]}} in last
                                            {{item.period.size}}
                                            {{locale.rules.conditionForm.inTime[item.period.unit]}}
                                            is
                                            {{locale.rules.conditionForm.operand[item.ruleOperand]}} {{item.threshold}}
                                        </p>
                                    </td>
                                    <td class="valignTop" rowspan="4">
                                        <h4>{{cases[key].majorOperand}}</h4>
                                    </td>
                                </tr>

                                <tr v-if="Object.keys(cases[key].conditions).length > 0">
                                    <td class="valignTop"><h3>THEN</h3></td>
                                    <td>

                                        <p class="margin-t-5"
                                           v-if="Object.keys(cases[key].conditions).length > 0"
                                           v-for="(item, i) in cases[key].actuators">
                                            {{item.name}} : {{item.operation}} - Value : {{item.data.value}}
                                        </p>
                                    </td>

                                </tr>
                                </tbody>
                            </table>

                            <!-- LAST PART - SAVE BUTTON -->
                            <div class="row">
                                <div class="col-md-12">
                                    <label>Enable</label>
                                    <div class="form-group">
                                        <toggle :id="'t1'" :checkValue="dto.isActive" @get-toggle="setIsActive"></toggle>
                                    </div>
                                </div>
                            </div>

                        </tab-content>
                    </form-wizard>

                </div>
            </div>


            <modal :title="!addAct ? 'Condition' : 'Action'" :id="'modal'" :cssClass="'modal-lg'">
                <RuleCondition :dataModel="resourceDataModel"
                               :operation="!addAct ? 'R' : 'W,E'"
                               @get-condition="setCondition"
                               @get-action="setAction"></RuleCondition>
            </modal>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import store from '@/store/index'
    import validate from 'vee-validate'
    import toggle from '@/components/plugin/toggleSwitch'
    import RecursiveResource from '@/components/plugin/RecursiveResource'
    import selectOrganization from '@/components/plugin/selectOrganization'
    import selectProduct from '@/components/plugin/selectProduct'
    import selectService from '@/components/plugin/selectService'
    import modal from '@/components/ModalTemplate.vue'
    import RuleCondition from '@/components/RuleCondition'
    import controller from '@/controller/ruleController'
    import resourceController from '@/controller/resourceController'
    import alertMe from '@/controller/alertMe'
    import notifyMe from '@/controller/notifyMe'

    // Form Wizard
    import VueFormWizard from 'vue-form-wizard'
    import 'vue-form-wizard/dist/vue-form-wizard.min.css'
    Vue.use(VueFormWizard);

    import {FormWizard, TabContent} from 'vue-form-wizard'

    export default {
        name: "RuleForm",
        data () {
            return {
                ifCon: false,
                elseIfCon: false,
                addCon: false,
                addAct: false,
                addForm: false,
                selectedOrgId: null,
                selectedProdId: null,
                saveTo: null,
                dto: {
                    serviceId: null,
                    description: "",
                    name: "",
                    isActive: false,
                    configuration: null
                },
                cases: [
                    { // if
                        majorOperand: "AND",
                        conditions: [],
                        actuators: []
                    }
                ],

                resources: {}, // this is used for resource list

                resourceDataModel: null, // smart object
                clickedResource: null, // which resource is clicked
                clickedResourceCoreThingId: null,

                elseIfKey: 0 // start point for else ifs
            }
        },
        components: {
            modal,
            RuleCondition,
            toggle,
            RecursiveResource,
            selectOrganization,
            selectProduct,
            selectService,
            FormWizard,
            TabContent
        },
        mounted() {
            $('#modal').on("hide.bs.modal", function () {

                // TODO: call reset form method
            })

        },
        created() {
            //this.$options.sockets.onmessage = (data) => console.log(data);
        },
        methods: {
            ifRule() {
                this.ifCon = true;
            },
            elseIfRule() {
                //this.elseIfCon = !this.elseIfCon;
                this.elseIfCon = true;
                const initObj = {
                    majorOperand: "AND",
                            conditions: [],
                            actuators: []
                };

                this.$set(this.cases, ++this.elseIfKey, initObj);
            },
            addCondition(key) {
                this.addForm = true;
                this.addCon = true;
                this.addAct = false;
                this.saveTo = key; // this key is point to if, else if statement. 0 is if, 1 is else if
            },
            addAction(key) {
                this.addForm = true;
                //this.addCon = false;
                this.addAct = true;
                this.saveTo = key;
            },
            removeElseIf(key) {
                // this method remove whole else if column
                if (this.elseIfKey >= 1) {
                    //this.$delete(this.cases, this.elseIfKey--);
                    this.$delete(this.cases, key);
                    this.elseIfKey--;
                }
            },
            closeForm() {
                this.addForm = false;
            },
            closeNewRule() {
                this.$parent.newRuleView = false;
            },
            showSaveButton() {
                return !!Object.keys(this.cases[0].conditions).length > 0 &&
                        Object.keys(this.cases[0].actuators).length > 0;
            },
            setOrganizationId(id) {
                this.selectedOrgId = id
            },
            setProductId(id) {
                this.selectedProdId = id
            },
            setIsActive(value) {
                this.dto.isActive = value
            },
            setServiceId(id) {
                this.dto.serviceId = id;
                const self = this;

                let searchDto = {
                    organizationId: this.selectedOrgId,
                    productId: this.selectedProdId,
                    serviceId: id
                };

                // this method get resource list
                resourceController.searchResource(searchDto).then(function (response) {
                    resourceController.revertTree(response).then(function (output) {
                        self.resources = output;
                    })
                });

            },
            validateStep1() {
                // IF rule title not specified doesn't go through to next step
                return this.$validator.validate("ruleName");
            },
            validateStep2() {
                return true;
            },
            showSmartObject(id) {
                // This method show resources smart object list on the modal.
                // clickedResource must set with clicked item resourceId. It needs to get sensor value requests.
                const self = this;

                // while adding condition we have to set coreThingId
                // get clicked resource detatil to get coreThingId
                if (!this.addAct) {
                    resourceController.getResourceDetail(id).then(function (response) {
                        self.clickedResourceCoreThingId = response.iotCoreResourceId;
                    });
                }

                resourceController.getResourceSmartObject(id).then(function (response) {

                    self.clickedResource = id;
                    self.resourceDataModel = response;
                    $("#modal").modal("show");

                });
            },
            setCondition(obj) {
                //this.$set(this.cases[0].conditions, this.mockConditionKey++, obj);
                this.cases[this.saveTo].conditions.push(obj); // 0 means if, 1 means else if, 2 means else
            },
            setAction(obj) {

                this.cases[this.saveTo].actuators.push(obj);
            },
            removeThis(collection, key) {
                // this is remove condition statement
                collection.splice(--key, 1);
            },
            reset() {

                // UNUSED METHOD
                // TEST IT BECAUSE RULEFORM MOUNTED EVERY SAVE BUTTON CLICKED.
                // SO THIS METHOD IS NOT NECESSARY ANYMORE

                this.ifCon = false;
                this.elseIfCon = false;
                this.addCon = false;
                this.addAct = false;
                this.addForm = false;
                this.selectedOrgId = null;
                this.selectedProdId = null;
                this.saveTo = null;
                this.dto.serviceId = null;
                this.dto.description = "";
                this.dto.name = "";
                this.dto.isActive = false;
                this.dto.configuration = null;
                this.cases[0].majorOperand = "AND";
                this.cases[0].conditions = [];
                this.cases[0].actuators = [];

                const self = this;
                this.cases.forEach(function (key, item) {
                    if (key == 0) {
                        item.majorOperand = "AND";
                        item.conditions = [];
                        item.actuators = [];
                    } else {
                        self.$delete(self.cases, key);
                    }
                })
            },
            save() {

                const temp = {}
                temp.cases = this.cases;

                this.dto.configuration = JSON.stringify(temp);

                const dto = this.dto;
                const self = this;

                this.$validator.validateAll().then(function (response) {

                    if (response) {
                        // if all validation rules are passed save function will call.

                        controller.save(dto).then(function (saveResponse) {

                            //console.log(saveResponse);
                            //alertMe.successNotify(saveResponse);
                            const notifier = {
                                status: "Process successfully"
                            }
                            notifyMe.successNotifier(notifier);
                            self.closeNewRule(); // backto list page after rule save
                            self.$parent.search(); // trigger search button to get list refresh

                        }).catch(function (saveErrors) {

                            //console.log(saveErrors);
                            alertMe.errorNotify(saveErrors);
                        })
                    }
                }).catch(function (errors) {

                    console.log(errors);
                });
            }
        },
        computed: {
            locale() {
                return store.getters.getLocale;
            }
        }
    }
</script>

<style scoped>
    .valignTop {
        vertical-align: top !important;
    }
</style>
