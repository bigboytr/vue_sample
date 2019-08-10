<template>
    <div class="smart-object-container">



        <smartObject :dataModel="dataModel"
                     :operation="operation"
                     :selectButton="true"
                     :resourceId="this.$parent.$parent.clickedResource"
                     @get-instance="getInstanceForCondition"></smartObject>


        <!-- READ OPERATION FORM -- CONDITION FORM -->
        <div v-if="operation === 'R'">

            <p>
                {{locale.rules.conditionForm.infoText}}
            </p>
            <div class="condition-overlay" v-if="selectedValue">


                    <fieldset class="padding-10 padding-b-20">
                        <h4>
                            <small class="text-primary">{{locale.rules.conditionForm.label}}</small>
                            {{selectedValue}}
                        </h4>

                        <div class="form-inline">
                            <div class="form-group">
                                <select class="form-control" v-model="sendConditionData.function">
                                    <option v-for="(item, key) in locale.rules.conditionForm.cond" :value="key">{{item}}</option>
                                </select>
                            </div>

                            <span class="margin-20">IN LAST</span>
                            <div class="form-group">
                                <div class="input-group input-group-rtl">

                                    <input type="number" min="1" class="form-control" v-model="sendConditionData.period.size">
                                    <div class="input-group-addon">
                                        <select class="form-control" v-model="sendConditionData.period.unit">
                                            <option v-for="(item, key) in locale.rules.conditionForm.inTime" :value="key">{{item}}</option>
                                        </select>
                                    </div>
                                </div>

                            </div>

                            <span class="margin-20">IS</span>

                            <div class="form-group">
                                <div class="input-group input-group-ltr">
                                    <select class="form-control" v-model="sendConditionData.ruleOperand">
                                        <option v-for="(item, key) in locale.rules.conditionForm.operand" :value="key">{{item}}</option>
                                    </select>

                                    <div class="input-group-addon">
                                        <input type="number" min="1" class="form-control" v-model="sendConditionData.threshold">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group margin-l-20">
                                <button class="btn btn-sm btn-success" @click="sendCondition">
                                    <i class="icon icon-plus"></i>
                                    {{locale.rules.conditionForm.addCondition}}
                                </button>
                                <button class="btn btn-sm btn-danger margin-l-5" @click="closeOverlay">
                                    <i class="icon icon-cross-small"></i>
                                    {{locale.common.button.cancel}}
                                </button>
                            </div>
                        </div>
                    </fieldset>

            </div>


            <!--<div class="col-md-12" v-if="!selectedValue">
                <div class="alert alert-info">
                    {{locale.rules.conditionForm.infoText}}
                </div>
            </div>-->
        </div>
        <!-- READ OPERATION FORM -- CONDITION FORM END ----------------------- -->

        <!-- WRITE/EXECTE OPERATION FORM -- ACTION FORM  -->
        <div v-if="operation !== 'R'">

            <p>
                {{locale.rules.actionForm.infoText}}
            </p>
            <!-- Write Method FORM -->
            <div class="condition-overlay" v-if="selectedValue">

                <fieldset class="padding-10 padding-b-20 form-inline">
                    <h4>
                        {{selectedValue}}
                    </h4>

                    <div class="form-group">
                        <label class="margin-r-10">{{locale.rules.actionForm.valueText}}</label>
                        <input type="text" class="form-control" v-model="sendActionData.data.value">
                    </div>

                    <div class="form-group margin-l-20">
                        <button class="btn btn-sm btn-success" @click="sendAction">
                            <i class="icon icon-plus"></i>
                            {{locale.rules.actionForm.addAction}}
                        </button>
                        <button class="btn btn-sm btn-danger margin-l-5" @click="closeOverlay">
                            <i class="icon icon-cross-small"></i>
                            {{locale.common.button.cancel}}
                        </button>
                    </div>
                </fieldset>
            </div>
            <!-- Write Method FORM END-->

        </div>
        <!-- WRITE/EXECTE OPERATION FORM -- ACTION FORM END -----------------  -->

    </div>
</template>

<script>
    import store from '@/store/index'
    import smartObject from '@/components/plugin/SmartObject.vue'

    export default {
        name: "RuleCondition",
        props: ["item", "dataModel", "operation"],
        data() {
            return {
                selectedValue: null,
                sendConditionData: {
                    resource: {
                        thingId: null,
                        targetResource: null
                    },
                    "function": 0,
                    ruleOperand: 0,
                    threshold: 0,
                    period: {
                        unit: 0,
                        size: 0
                    }
                },
                sendActionData: {
                    name: null,
                    operation: null,
                    data: {
                        targetResource: null,
                        thingId: null,
                        value: null
                    }
                },
            }
        },
        components: {
            smartObject
        },
        mounted() {
            const self = this;
            $('#modal').on("hide.bs.modal", function () {

                self.reset();
            })

        },
        methods: {
            reset() {
                this.selectedValue = null;
                this.sendConditionData.ruleOperand = 0;
                this.sendConditionData.function = 0;
                this.sendConditionData.threshold = 0;
                this.sendConditionData.period.size = 0;
                this.sendConditionData.period.unit = 0;
            },
            sendCondition() {
                // emit function
                this.sendConditionData.resource.thingId = this.$parent.$parent.clickedResourceCoreThingId;
                let obj = JSON.parse(JSON.stringify(this.sendConditionData));

                this.$emit("get-condition", obj);
                $("#modal").modal("hide");
            },
            sendAction() {
                // emit function
                this.sendActionData.data.thingId = this.$parent.$parent.clickedResource;
                let obj = JSON.parse(JSON.stringify(this.sendActionData));

                this.$emit("get-action", obj);
                $("#modal").modal("hide");
            },
            getInstanceForCondition(value, targetResource, clickedButtonOperation) {
                this.sendConditionData.resource.targetResource = targetResource;
                this.sendActionData.data.targetResource = targetResource;

                this.sendActionData.operation = clickedButtonOperation;

                this.selectedValue = value; // this one is using on screen, never send to somewhere
                //this.sendConditionData.name = value; // this one use for condition - just info
                this.sendActionData.name = value; // this one use for action - just info
            },
            closeOverlay() {
                this.selectedValue = null
            }

        },
        computed: {
            locale() {
                return store.getters.getLocale;
            }
        }
    }
</script>

<style scoped lang="scss">
    /* form */
    .input-group-rtl input[type='number'] {
        text-align: right;
        width: 90px;
        border-right: 0;
    }

    .input-group-rtl select {
        border-top-right-radius: 20px !important;
        border-bottom-right-radius: 20px !important;
    }

    .input-group-rtl .input-group-addon {
        border: none;
        background-color: transparent;
        padding: 0;
    }

    .input-group-ltr input[type='number'] {
        text-align: left;
        width: 90px;
        border-left: 0;
        border-top-right-radius: 20px !important;
        border-bottom-right-radius: 20px !important;
    }

    .input-group-ltr select {
        border-top-left-radius: 20px !important;
        border-bottom-left-radius: 20px !important;
    }

    .input-group-ltr .input-group-addon {
        border: none;
        background-color: transparent;
        padding: 0;
    }

    .smart-object-container {
        position: relative;

        .condition-overlay {
            position: absolute;
            background: rgba(0, 0, 0, 0.4);
            height: 100%;
            width: 100%;

            position: absolute;
            top: 0;

            fieldset {
                width: 100%;
                position: absolute;
                border: none;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                background: linear-gradient(bottom, #ededed 10%, #fff 60%);
            }

        }
    }
</style>