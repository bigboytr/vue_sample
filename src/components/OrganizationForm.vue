<template>
    <div class="row">
        <div class="col-md-12">

            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li v-for="(title, key) in locale.organization.tabTitles" :class="key == 0 ? 'active' : ''">
                    <a :href="'#tab'+(key+1)" role="tab" data-toggle="tab">{{title}}</a>
                </li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content padding-t-10">
                <div class="tab-pane fade in active" id="tab1">

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>{{locale.organization.placeholder.organizationName1}}</label>
                                <input type="text" class="form-control" name="name"
                                       v-validate.disable="'required'"
                                       v-model="dto.organizationName1">
                                <i v-show="errors.has('name')" class="icon icon-triangle-warning"></i>
                                <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label>{{locale.organization.placeholder.organizationName2}}</label>
                                <input type="text" class="form-control"
                                       v-model="dto.organizationName2">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Identification number / Tax number</label>
                                <input type="text" class="form-control" name="identification"
                                       v-validate.continues.disable="'required|digits:11'"
                                       v-model="dto.identificationNumber">
                                <i v-show="errors.has('identification')" class="icon icon-triangle-warning"></i>
                                <span v-show="errors.has('identification')" class="text-danger">{{ errors.first('identification') }}</span>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label>
                                    {{locale.organization.placeholder.legal}}
                                </label><br>
                                <toggle :checkValue="dto.isLegalEntity"
                                        :id="'chk-1'"
                                        @get-toggle="setIsLegalEntity"></toggle>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>{{locale.organization.placeholder.language}}</label>
                                <selectLanguage :selected="dto.defaultLang"
                                                @get-value="setDefaultLang"></selectLanguage>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <label>{{locale.organization.placeholder.startDate}}</label>
                            <div class="form-group">
                                <date-picker input-class="form-control"
                                             v-model="dto.organizationActivityStartDt"
                                             @input="setStartDate" lang="en" format="YYYY-MM-DD"></date-picker>
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

                <div class="tab-pane fade " id="tab2">
                    <localPlace :partyId="item.partyId" :buttons="true" v-if="item"></localPlace>
                    <p class="alert alert-info" v-if="!item">{{locale.organization.localPlaceInfo}}</p>
                </div>
                <div class="tab-pane fade" id="tab3">
                    <geoPlace :partyId="item.partyId" v-if="item"></geoPlace>
                    <p class="alert alert-info" v-if="!item">{{locale.organization.geoPlaceInfo}}</p>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    import store from '@/store/index';
    import controller from '@/controller/organizationController'
    import localPlace from '@/components/PlaceLocal'
    import geoPlace from '@/components/PlaceGeographic'
    import selectLanguage from '@/components/plugin/selectLanguage'
    import moment from 'moment';
    import toggle from '@/components/plugin/toggleSwitch'
    // import selectPartyRoleType from '@/components/plugin/selectRoleType'
    import notifyMe from '@/controller/notifyMe';
    import datePicker from 'vue2-datepicker'

    export default {
        name: 'OrganizationForm',
        props: ['item'],
        data() {
            return {
                dto: {
                    partyId: 0,

                    language: "",
                    organizationName1: "",
                    organizationName2: "",
                    organizationNameId: "",
                    organizationNameTypeCd: 0,

                    identificationNumber: "",
                    isLegalEntity: false,
                    organizationActivityStartDt: moment().format("YYYY-MM-DD")
                },

                messages: ""
            }
        }
        ,
        components: {
            localPlace,
            geoPlace,
            selectLanguage,
            toggle,
            // selectPartyRoleType,
            notifyMe,
            datePicker
        }
        ,
        mounted() {
            this.dataSetter(this.$props.item);
            const self = this;
            $('#modal').on("hide.bs.modal", function () {
                self.resetDtoForm();
            });
        }
        ,
        methods: {
            resetDtoForm() {

                this.dto.partyId = 0;
                this.dto.identificationNumber = "";
                this.dto.organizationName1 = "";
                this.dto.organizationName2 = "";
                this.dto.defaultLang = store.getters.getLang;
                this.dto.isLegalEntity = false;
                this.dto.organizationActivityStartDt = moment().format("YYYY-MM-DD");
                this.errors.clear(); // For validation errors clean
                this.$parent.$parent.detailData = null; // For watch item must be always trigger
            }
            ,
            setDefaultLang(value) {
                if (value === 0 || value === "0") {
                    this.dto.defaultLang = store.getters.getLang;
                } else {
                    this.dto.defaultLang = value;
                }
            }
            ,
            setIsLegalEntity(value) {
                this.dto.isLegalEntity = value;
            }
            ,
            submitForm() {

                let self = this;
                this.$validator.validateAll().then(function (response) {

                    if (response) {
                        controller.save(self.dto).then(function (response) {
                            self.$parent.$parent.search();
                            if (self.dto.partyId === 0) {
                                notifyMe.successNotifierGlobal(self.messages.common.statusNotification.successOrganization);
                            } else {
                                notifyMe.successNotifierGlobal(self.messages.common.statusNotification.updateOrganization);
                            }
                            self.close();

                        }).catch(function (errors) {
                            if (errors.response !== undefined) {
                                notifyMe.errorNotifier(errors.response);
                            } else {
                                notifyMe.errorNotifierGlobal(self.messages.common.statusNotification.errorNetwork);
                            }
                            console.log(errors);
                        });
                    } else {
                        notifyMe.warningNotifierGlobal(self.messages.common.statusNotification.fillForm);
                        console.log(self.$validator.errors);
                    }
                }, function () {
                    console.log(self.$validator);
                });
            }
            ,
            close() {
                this.resetDtoForm();
                $("#modal").modal("hide");
            }
            ,
            dataSetter(data) {
                if (data != null) {

                    if (data.id !== undefined && data.id !== 0) {
                        let self = this;

                        controller.getOrganizationById(data.id).then(function (response) {
                            self.dto.partyId = response.id;
                            self.dto.identificationNumber = response.identificationNumber;
                            self.dto.organizationName1 = response.organizationName1;
                            self.dto.organizationName2 = response.organizationName2;
                            self.dto.defaultLang = response.defaultLang;
                            self.dto.isLegalEntity = response.isLegalEntity;
                            self.dto.organizationActivityStartDt = moment(response.organizationActivityStartDt).format("YYYY-MM-DD");
                        });
                    }
                } else {
                    this.resetDtoForm();
                }
            }
            ,
            setStartDate(variable) {
                this.dto.organizationActivityStartDt = moment(variable).format('YYYY-MM-DD');
            }
        }
        ,
        computed: {
            langList() {
                return store.getters.getLangList;
            }
            ,
            locale() {
                return this.messages = store.getters.getLocale;
            }
            ,

        }
        ,
        watch: {
            item: {
                immediate: true,
                handler(data) {
                    this.dataSetter(data)
                }
            }
        }
    }
</script>
