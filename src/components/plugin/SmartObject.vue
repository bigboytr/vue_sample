<template>
    <div v-if="dataModel">

            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="false">
                <div class="panel panel-primary" v-for="(item, key) in dataModel.smartObjects">
                    <div class="panel-heading collapsed" role="tab" data-toggle="collapse" data-parent="#accordion"
                         :href="'#body'+key" aria-expanded="false">
                        <h4 class="panel-title">
                            {{item.name}}
                            <i class="icon collapsedIcon pull-right"></i>
                            <i class="icon expandedIcon pull-right"></i>
                        </h4>
                    </div>
                    <div :id="'body'+key" class="panel-collapse collapse" role="tabpanel">
                        <div class="panel-body">

                            <div v-for="(instance, i) in item.instances">

                                <h4 class="margin-l-0">Instance {{i}}</h4>

                                <!-- This section will shown at RULE ENGINE-->
                                <div class="row instances margin-b-5"
                                     v-for="(resource, k) in instance.resources"
                                     v-if="checkOperation(resource.operations)" >

                                    <div class="col-md-5 padding-l-25">
                                        <button class="btn btn-xs btn-link"
                                                v-if="selectButton && operation == 'R'"
                                                @click="selectInstance(item.name+' - '+resource.name, resource.targetResource)">
                                            {{resource.name}}
                                        </button>
                                        <span v-else>{{resource.name}}</span>
                                    </div>
                                    <div class="col-md-3">
                                        <button class="btn btn-xs btn-default margin-r-5"
                                                v-if="checkOperationButton(resource.operations, 'R')"
                                                @click="readMethod(resource.targetResource, resource)">
                                            Read
                                        </button>
                                        <button class="btn btn-xs btn-default margin-r-5"
                                                v-if="checkOperationButton(resource.operations, 'W')"
                                                @click="selectInstance(item.name+' - '+resource.name, resource.targetResource, 'WRITE')">
                                            Write
                                        </button>
                                        <button class="btn btn-xs btn-default margin-r-5"
                                                v-if="checkOperationButton(resource.operations, 'E')"
                                                @click="selectInstance(item.name+' - '+resource.name, resource.targetResource, 'EXECUTE')">
                                            Execute
                                        </button>
                                    </div>

                                    <div class="col-md-4">
                                        <span>{{resource.value}}</span>
                                    </div>
                                    <!--<div class="col-md-1" v-if="selectButton && operation == 'R'">
                                        <button class="btn btn-xs btn-default"
                                                @click="selectInstance(item.name+' - '+resource.name, resource.targetResource)">
                                            <i class="icon icon-arrow-left"></i>
                                        </button>
                                    </div>-->
                                </div>


                                <!-- ForEach for all operation types -->
                                <div class="row instances margin-b-5"
                                     v-for="(resource, k) in instance.resources" v-if="!operation">

                                    <div class="col-md-5 padding-l-25">{{resource.name}}</div>
                                    <div class="col-md-4">
                                        <button class="btn btn-xs btn-default margin-r-5"
                                                v-if="resource.operations.includes('R')"
                                                @click="readMethod(resource.targetResource, resource)">
                                            Read
                                        </button>
                                        <button class="btn btn-xs btn-default margin-r-5"
                                                v-if="resource.operations.includes('W')"
                                                @click="writeMethodFormShow(item.name+' - '+resource.name, resource.targetResource)">
                                            Write
                                        </button>
                                        <button class="btn btn-xs btn-default margin-r-5"
                                                v-if="resource.operations.includes('E')"
                                                @click="executeMethod(resource.targetResource)">
                                            Execute
                                        </button>
                                        <div class="btn-group" v-if="resource.operations.includes('R')">

                                            <button class="btn btn-xs" @click="observeMethod(resource, item.id, i, k)"
                                                    :class="clickedObserveButtons.hasOwnProperty(item.id.toString()+i.toString()+k.toString()) ? 'btn-success' : 'btn-default'">
                                                Observe
                                                <i class="icon icon-video-play"></i>
                                            </button>
                                            <button class="btn btn-xs btn-default"  @click="observeStop(resource)">
                                                <i class="icon icon-video-stop"></i>
                                            </button>
                                        </div>

                                    </div>
                                    <div class="col-md-3">
                                        <!-- Read value -->
                                        <!-- this span is READ value (read button) -->
                                        <span class="margin-l-10" v-if="!observeOnMessage">{{resource.value}}</span>
                                        <!-- this span is OBSERVE value (observe button)  -->
                                        <span class="margin-l-10" v-if="observeOnMessage">{{resource.observeValue}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>




        <!-- Write Method FORM -->
        <div v-if="writeMethodForm">

            <fieldset class="padding-10 padding-b-20 form-inline">
                <h4>
                    {{selectedValue}}
                </h4>

                <div class="form-group">
                    <label class="margin-r-10">Value: </label>
                    <input type="text" class="form-control" v-model="writeMethodDto.value">
                </div>

                <div class="form-group margin-l-20">
                    <button class="btn btn-sm btn-success" @click="writeMethod()">
                        <i class="icon icon-plus"></i>
                        {{locale.common.button.save}}
                    </button>
                </div>
            </fieldset>
        </div>
        <!-- Write Method FORM END-->
    </div>
</template>

<script>
    import Vue from 'vue'
    import store from '@/store/index'
    import controller from '@/controller/thingController'
    import alertMe from '@/controller/alertMe'

    export default {
        name: "SmartObject",
        props: ["dataModel", "operation", "selectButton", "resourceId"],
        data() {
            return {
                selectedValue: null,
                writeMethodForm: false,
                writeMethodDto: {
                    resource: "",
                    value: ""
                },
                index: 0,
                clickedObserveButtons: {},
                observeOnMessage: false
            }
        },
        mounted() {

            /* When closing modal, dataModel should be null*/
            /*const self = this;
            $('#modal2').on("hide.bs.modal", function () {
                self.dataModelIn = null;
            })*/
        },
        methods: {
            selectInstance(value, targetResource, operation) {
                this.$emit("get-instance", value, targetResource, operation);
            },
            checkOperation(op) {
                // this function decided to which buttons will shown to user.
                //
                if (this.$props.operation == undefined) return;
                let operationArr = this.$props.operation.split(",");
                let found = false;

                for (let x = 0; x <= operationArr.length - 1; x++) {
                    let pattern = new RegExp(operationArr[x], 'g');

                    found = pattern.test(op);
                    if (found) return true;
                }
            },
            checkOperationButton(op, buttonOp) {
                // this function is check the button types to show
                //
                if (op == undefined) return;
                let operationArr = op.split("");
                let found = false;

                for (let x = 0; x <= operationArr.length - 1; x++) {
                    let pattern = new RegExp(operationArr[x], 'g');

                    found = pattern.test(buttonOp);
                    if (found) return true;
                }

                /*
                checkOperation: Bu function, göstermek istediğimiz operation kontrolünü yapar
                R gönderdik, dönen listede operationda R içerenleri göstermek için true döner
                Fakat butonun tipi de R içermelidir ki ekranda gösterelim.

                checkOperationButton: Bu function ise önceki if ten true dönen sensörlerin
                buttonlardan hangilerini göstereceğini kontrol eder.
                R,W gönderdik, dönen listede operation E içeriyor ise execute butonu görünmez

                TODO: button types a bir kontol daha eklememiz lazım. Sadece W ise Read button gösterildiği durumlar oluyor.
                */
            },
            readMethod(endpoint, item) {
                // item must use for read data.

                const self = this;
                controller.readMethod(this.$props.resourceId, endpoint).then(function (response) {
                    self.$set(item, 'value', response.value);
                });

            },
            writeMethodFormShow(name, endpoint) {
                // When clicked the write button of sensor values, endpoint set to clicked targetResource on item
                // selectedValue is only show which button clicked. It's for FE.
                this.writeMethodForm = true;
                this.writeMethodDto.resource = endpoint;
                this.selectedValue = name;
            },
            writeMethod() {

                const self = this;
                controller.writeMethod(this.$props.resourceId, this.writeMethodDto).then(function (response) {
                    console.log(response);
                }).catch(function (errors) {

                    alertMe.errorNotify(errors);
                })
            },
            executeMethod(endpoint) {
                controller.executeMethod(this.$props.resourceId, endpoint).then(function () {

                }).catch(function (errors) {
                    alertMe.errorNotify(errors);
                });
            },
            observeMethod(item, id, i, k) {

                // TODO: ws url will get

                const self = this;

                controller.observeURLMethod(this.$props.resourceId, item.targetResource).then(function (wsUrl) {

                    let ws = new WebSocket(wsUrl); // WebSocket object

                    let key = id.toString()+i.toString()+k.toString();
                    if (!self.clickedObserveButtons.hasOwnProperty(key)) {

                        self.$set(self.clickedObserveButtons, key, key);

                        self.observeOnMessage = true;

                        ws.onmessage = (function (res) {
                            self.$set(item, 'observeValue', res.data);
                        });


                    } else {

                        self.$delete(self.clickedObserveButtons, key);

                        self.observeOnMessage = false;

                        /*ws.close();

                        ws.onclose = (function () {
                            self.$delete(item, 'value');
                        });*/
                    }
                });

            },
            observeStop(item) {
                this.$delete(item, 'value');
            }
            /*sortObject(obj) {
             return obj.sort(function (a, b) {
             return a.id - b.id;
             })
             }*/
        },
        computed: {
            locale() {
                return store.getters.getLocale;
            }
            /*sortedDataModel() {
             if (this.$props.dataModel !== null) {
             return this.$props.dataModel.sort(function (a, b) {
             return a.id - b.id;
             })
             }
             }*/
        }
    }
</script>

<style scoped>
    .panel-heading {
        cursor: pointer;
        display: block;
    }

    .panel-group .panel {
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }

    .panel-body {
        border: 1px #ddd solid;
    }

    .panel-body .table {
        margin-bottom: 0;
    }

    .panel-heading.collapsed .collapsedIcon:before {
        content: "\e920"
    }

    .panel-heading:not(.collapsed) .expandedIcon:before {
        content: "\e923"
    }

    .instances .btn-default,
    .instances .btn-success {
        border: .5px #ddd solid;
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0;
    }

    .resourceInput input[type='text']{
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0;
        height: 26px;
        width: 50%;
    }

    fieldset {
        border: 1px #ddd solid;
        background: linear-gradient(bottom, #ededed 10%, #fff 60%);
    }
</style>
