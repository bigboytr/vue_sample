<template>
    <div class="row">
        <div class="col-md-12">

            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li v-for="(title, key) in locale.individuals.tabTitles" :class="key == 0 ? 'active' : ''">
                    <a :href="'#tab'+(key+1)" role="tab" data-toggle="tab">{{title}}</a>
                </li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div class="tab-pane fade in active" id="tab1">

                    <div class="row">

                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.common.label.name}}</label>
                                <input type="text" class="form-control" :name="locale.individuals.error.name"
                                       v-validate.disable="'required|alpha'"
                                       v-model="formModel.epIndividualDto.epIndividualNameDto.givenName">
                                <i v-show="errors.has(locale.individuals.error.name)" class="icon icon-triangle-warning"></i>
                                <span v-show="errors.has(locale.individuals.error.name)" class="text-danger">{{ errors.first(locale.individuals.error.name) }}</span>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.common.label.midname}}</label>
                                <input type="text" class="form-control" name="midname"
                                       v-validate.disable="'alpha'"
                                       v-model="formModel.epIndividualDto.epIndividualNameDto.midName">
                              <i v-show="errors.has('midname')" class="icon icon-triangle-warning"></i>
                              <span v-show="errors.has('midname')" class="text-danger">{{ errors.first('midname') }}</span>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.common.label.surname}}</label>
                                <input type="text" class="form-control" name="surname"
                                       v-validate.disable="'required|alpha'"
                                       v-model="formModel.epIndividualDto.epIndividualNameDto.familyName">
                                <i v-show="errors.has('surname')" class="icon icon-triangle-warning"></i>
                                <span v-show="errors.has('surname')" class="text-danger">{{ errors.first('surname') }}</span>
                            </div>
                        </div>

                        <div class="col-md-3">
                          <label>{{locale.individuals.placeholder.birthDate}}</label>
                          <div class="form-group">
                            <date-picker input-class="form-control" v-model="formModel.epIndividualDto.dateOfBirth"
                                         @input="setBirthDate" lang="en" format="YYYY-MM-DD" name="date"></date-picker>
                          </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.individuals.placeholder.id}}</label>
                                <input type="number" class="form-control" name="identification"
                                       v-validate.continues.disable="'required|digits:11'"
                                       v-model="formModel.epIndividualDto.identificationNumber">
                              <i v-show="errors.has('identification')" class="icon icon-triangle-warning"></i>
                              <span v-show="errors.has('identification')" class="text-danger">{{ errors.first('identification') }}</span>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.individuals.placeholder.birthPlace}}</label>
                                <input type="text" class="form-control" name="birthplace"
                                       v-validate.disable="'alpha'"
                                       v-model="formModel.epIndividualDto.placeOfBirth">
                              <i v-show="errors.has('birthplace')" class="icon icon-triangle-warning"></i>
                              <span v-show="errors.has('birthplace')" class="text-danger">{{ errors.first('birthplace') }}</span>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.individuals.placeholder.birthCountry}}</label>
                                <selectCountry @getCountryCode="setCountryCode" :selected="countryVal" ></selectCountry>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.individuals.placeholder.nation}}</label>
                                <selectNationality @getNationalityCode="setNationalityCode"
                                                   :selected="nationalityVal"></selectNationality>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.individuals.placeholder.prefix}}</label>
                                <input type="text" class="form-control"
                                       v-model="formModel.epIndividualDto.epIndividualNameDto.namePrefix">
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.individuals.placeholder.gender}}</label>
                                <selectGender @getGenderCode="setGenderCode" :selected="genderVal"></selectGender>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.individuals.placeholder.disability}}</label>
                                <selectDisabilityType @getDisabilityTypeCode="setDisabilityTypeCode"
                                                      :selected="disabilityTypeVal"></selectDisabilityType>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label>{{locale.individuals.placeholder.marital}}</label>
                                <selectMaritalStatus @getMaritalStatusCode="setMaritalStatusCode"
                                                     :selected="maritalStatusVal"></selectMaritalStatus>
                            </div>
                        </div>

                    </div>

                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group">
                          <label>{{locale.individuals.placeholder.roleType}}</label>
                          <selectPartyRoleType @getPartyRoleCode="setPartyRoleTypeCode"
                                               :selected="partyRoleTypeVal"></selectPartyRoleType>
                        </div>
                      </div>
                    </div>

                    <div class="row" v-if="!item">
                        <div class="col-md-12">
                            <label>{{locale.common.label.createUser}}</label>
                            <toggle :id="'chk1'" :checkValue="formModel.createUserAlso" @get-toggle="setCreateUserAlso" class="margin-l-20 margin-r-20"></toggle>
                            <i>{{locale.individuals.createUser[formModel.createUserAlso]}}</i>
                        </div>
                    </div>

                    <hr>

                    <div class="row">
                        <div class="col-xs-8 col-sm-6 col-md-6">
                            <div class="form-group" v-if="!formModel.createUserAlso">
                                <button class="btn btn-primary" @click="submitForm()">
                                    <i class="icon icon-arrow-right"></i>
                                    {{locale.common.button.save}}
                                </button>
                            </div>
                            <div class="form-group" v-if="formModel.createUserAlso">
                                <button class="btn btn-primary" @click="gotoUserDetails()">
                                    <i class="icon icon-user"></i>
                                    {{locale.common.label.userInfo}}
                                </button>
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-6 col-md-6">
                            <div class="form-group pull-right">
                                <button class="btn btn-danger btn-block" @click="close()">
                                    <i class="icon icon-cross"></i>
                                    {{locale.common.button.cancel}}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="tab-pane fade" id="tab2">
                    <geoPlace :partyId="item.party.id" v-if="item"></geoPlace>
                    <p class="alert alert-info" v-if="!item">{{locale.individuals.geoPlaceInfo}}</p>
                </div>

                <div class="tab-pane fade" id="tab3">
                    <userDetails v-if="item" :item="item"></userDetails>
                    <p class="alert alert-info" v-if="!item && !formModel.createUserAlso">{{locale.individuals.userDetailsInfo}}</p>

                    <!-- This form is move to here beacuse DTO in here. We have to bind the inputs to the model -->
                    <div class="row" v-if="formModel.createUserAlso">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>{{locale.common.label.username}}</label>
                                        <input type="text" class="form-control" name="userName"
                                               v-validate.disable="'required'"
                                               v-model="formModel.cbeUserDto.userName">
                                        <i v-show="errors.has('userName')" class="icon icon-triangle-warning"></i>
                                        <span v-show="errors.has('userName')" class="text-danger">{{ errors.first('userName') }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>{{locale.common.label.password}}</label>
                                        <input type="password" class="form-control" name="password" ref="password"
                                               v-validate.disable="'required'"
                                               v-model="formModel.cbeUserDto.password">
                                        <i v-show="errors.has('password')" class="icon icon-triangle-warning"></i>
                                        <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>{{locale.login.placeholder.confirmPassword}}</label>
                                        <input type="password" class="form-control" name="Repassword"
                                               v-model="passwordConfirmation"
                                               v-validate.disable="'required|confirmed:password'">
                                        <i v-show="errors.has('Repassword')" class="icon icon-triangle-warning"></i>
                                        <span v-show="errors.has('Repassword')" class="text-danger">{{ errors.first('Repassword') }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>{{locale.common.label.email}}</label>
                                        <input type="text" class="form-control" name="email"
                                               v-validate.disable="'required|email'"
                                               v-model="formModel.cbeUserDto.email">
                                        <i v-show="errors.has('email')" class="icon icon-triangle-warning"></i>
                                        <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                                    </div>
                                </div>
                            </div>

                            <hr>

                            <div class="row">

                                <div class="col-md-3">
                                    <label>
                                        {{locale.userProfiles.userDetails.locked}}
                                    </label>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <toggle :checkValue="formModel.cbeUserDto.isLocked"
                                                      :id="'chk-333'"
                                                      @get-toggle="setIsLocked" class="margin-r-20"></toggle>

                                        <i>{{locale.userProfiles.userDetails.lockedDesc[lockedDescKey]}}</i>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
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

            </div>

        </div>
    </div>
</template>

<script>
    import store from '@/store/index'
    import controller from '@/controller/individualsController'
    import geoPlace from '@/components/PlaceGeographic.vue'
    import userDetails from '@/components/UserDetails.vue'
    import moment from 'moment'
    import selectCountry from '@/components/plugin/selectCountry'
    import selectGender from '@/components/plugin/selectGender'
    import selectNationality from '@/components/plugin/selectNationality'
    import selectMaritalStatus from '@/components/plugin/selectMaritalStatus'
    import selectDisabilityType from '@/components/plugin/selectDisabilityType'
    import selectPartyRoleType from '@/components/plugin/selectRoleType'
    import toggle from '@/components/plugin/toggleSwitch'
    import notifyMe from '@/controller/notifyMe';
    import datePicker from 'vue2-datepicker';

    export default {
        name: "IndividualForm",
        props: ['item'],
        data() {
            return {
                formModel: {
                    createUserAlso: 0,
                    reason: "Ind and User Create",
                    cbeUserDto: {
                        resetPasswordRequired: false,
                        isLocked: true,
                        password: "",
                        userName: "",
                        email: ""
                    },
                    epIndividualDto: {
                        countryOfBirthCd: 0,
                        dateOfBirth: moment().format("YYYY-MM-DD"),
                        dateOfDeath: "",
                        defaultLang: "",
                        disabilityTypeCd: 0,
                        epIndividualNameDto: {
                            familyName: "",
                            givenName: "",
                            individualNameId: "",
                            maritalStatusTypeCd: 0,
                            midName: "",
                            namePrefix: "",
                            nationalityCd: 0
                        },
                        genderTypeCd: 0,
                        identificationNumber: "",
                        partyId:"",
                        placeOfBirth: ""
                    },
                    epPartyRoleDtos: [
                        {
                          partyRoleTypeCd: 0
                        }
                    ],
                    partyTypeCd: 1
                },
                passwordConfirmation:"",
                messages: "",
            }
        },
        components: {
            geoPlace,
            userDetails,
            selectCountry,
            selectGender,
            selectNationality,
            selectMaritalStatus,
            selectDisabilityType,
            selectPartyRoleType,
            toggle,
            datePicker
        },
        mounted() {
          const self = this;
          $('#modal').on("hide.bs.modal", function () {
            self.resetForm();
          });
        },
        methods: {
            resetForm(){
                this.formModel.epIndividualDto.identificationNumber = "";
                this.formModel.epIndividualDto.countryOfBirthCd = 0;
                this.formModel.epIndividualDto.placeOfBirth = "";
                this.formModel.epIndividualDto.genderTypeCd = 0;
                this.formModel.epIndividualDto.dateOfDeath = "";
                this.formModel.epIndividualDto.dateOfBirth = moment().format("YYYY-MM-DD");
                this.formModel.epIndividualDto.disabilityTypeCd = 0;
                this.formModel.epIndividualDto.epIndividualNameDto.namePrefix = "";
                this.formModel.epIndividualDto.epIndividualNameDto.givenName = "";
                this.formModel.epIndividualDto.epIndividualNameDto.midName = "";
                this.formModel.epIndividualDto.epIndividualNameDto.familyName = "";
                this.formModel.epIndividualDto.epIndividualNameDto.nationalityCd = 0;
                this.formModel.epIndividualDto.epIndividualNameDto.maritalStatusTypeCd = 0;
                this.formModel.epIndividualDto.epIndividualNameDto.individualNameId = "";
                this.formModel.createUserAlso = 0;
                this.formModel.epIndividualDto.partyId = "";
                this.formModel.cbeUserDto.email = "";
                this.formModel.cbeUserDto.isLocked = true;
                this.formModel.cbeUserDto.password = "";
                this.formModel.cbeUserDto.userName = "";
                this.formModel.epPartyRoleDtos[0].partyRoleTypeCd = 0;
                this.errors.clear(); // For validation errors clean
            },
            close() {
                this.resetForm();
                $("#modal").modal("hide");
            },
            submitForm() {
                // send formModel into controller createIndi
              let self = this;
              this.$validator.validateAll().then(function (response) {

                    if(response) {
                      controller.save(self.formModel).then(function (response) {

                        self.$parent.$parent.search();
                        if(self.formModel.epIndividualDto.partyId === "") {
                          notifyMe.successNotifierGlobal(self.messages.common.statusNotification.successIndividual);
                        }else{
                          notifyMe.successNotifierGlobal(self.messages.common.statusNotification.updateIndividual);
                        }
                        self.close();

                      }).catch(function (errors) {
                        notifyMe.errorNotifierGlobal(errors);
                        console.log(errors);
                      });
                    }else {
                        notifyMe.warningNotifierGlobal(self.messages.common.statusNotification.fillForm);
                        console.log(self.$validator.errors);
                    }
                  },function () {
                      console.log(self.$validator);
                  });
            },
            setNationalityCode(code) {
                this.formModel.epIndividualDto.epIndividualNameDto.nationalityCd = code;
            },
            setGenderCode(code) {
                this.formModel.epIndividualDto.genderTypeCd = code;
            },
            setCountryCode(code) {
                this.formModel.epIndividualDto.countryOfBirthCd = code;
            },
            setMaritalStatusCode(code) {
                this.formModel.epIndividualDto.epIndividualNameDto.maritalStatusTypeCd = code;
            },
            setDisabilityTypeCode(code) {
                this.formModel.epIndividualDto.disabilityTypeCd = code;
            },
            setPartyRoleTypeCode(code) {
                this.formModel.epPartyRoleDtos[0].partyRoleTypeCd = code;
            },
            setIsLocked(value) {
                this.formModel.cbeUserDto.isLocked = value;
            },
            setCreateUserAlso(value) {
                this.formModel.createUserAlso = value ? 1 : 0;
            },
            gotoUserDetails() {
                $('a[href="#tab3"]').tab("show");
            }
        },
        computed: {
            locale() {
                return this.messages = store.getters.getLocale;
            },
            genderVal() {
                return this.formModel.epIndividualDto.genderTypeCd;
            },
            disabilityTypeVal() {
                return this.formModel.epIndividualDto.disabilityTypeCd;
            },
            countryVal() {
                return this.formModel.epIndividualDto.countryOfBirthCd;
            },
            nationalityVal() {
                return this.formModel.epIndividualDto.epIndividualNameDto.nationalityCd;
            },
            maritalStatusVal() {
                return this.formModel.epIndividualDto.epIndividualNameDto.maritalStatusTypeCd;
            },
            partyRoleTypeVal() {
                return this.formModel.epPartyRoleDtos[0].partyRoleTypeCd;
            },
            lockedDescKey() {
                return this.formModel.cbeUserDto.isLocked;
            },
            setBirthDate(variable) {
              var context = this;
              this.$nextTick(function () {
                this.formModel.epIndividualDto.dateOfBirth = moment(variable).format('YYYY-MM-DD');
              });
            }
        },
        watch: {
          item: {
            // This method is watching props data which name is item.
            // If item object is changed somewhere then its fired.
            immediate: true,
            handler(res) {
              if (res != null) {

                this.formModel.epIndividualDto.identificationNumber = res.identificationNumber;
                this.formModel.epIndividualDto.countryOfBirthCd = res.countryOfBirthCd;
                this.formModel.epIndividualDto.placeOfBirth = res.placeOfBirth;
                this.formModel.epIndividualDto.genderTypeCd = res.genderTypeCd;
                this.formModel.epIndividualDto.dateOfDeath = res.dateOfDeath !== null ? moment(res.dateOfDeath).format("YYYY-MM-DD") : null;
                this.formModel.epIndividualDto.dateOfBirth = moment(res.dateOfBirth).format("YYYY-MM-DD");
                this.formModel.epIndividualDto.disabilityTypeCd = res.disabilityTypeCd;
                this.formModel.epIndividualDto.epIndividualNameDto.namePrefix = res.epIndividualName.namePrefix;
                this.formModel.epIndividualDto.epIndividualNameDto.givenName = res.epIndividualName.givenName;
                this.formModel.epIndividualDto.epIndividualNameDto.midName = res.epIndividualName.midName;
                this.formModel.epIndividualDto.epIndividualNameDto.familyName = res.epIndividualName.familyName;
                this.formModel.epIndividualDto.epIndividualNameDto.nationalityCd = res.epIndividualName.nationalityCd;
                this.formModel.epIndividualDto.epIndividualNameDto.maritalStatusTypeCd = res.epIndividualName.maritalStatusTypeCd;
                this.formModel.epIndividualDto.epIndividualNameDto.individualNameId = res.epIndividualName.individualNameId;
                this.formModel.epIndividualDto.partyId = res.party.id;
                this.formModel.epPartyRoleDtos[0].partyRoleTypeCd = res.party.epPartyRoles[0].partyRoleTypeCd;

              }else {
                // this.resetForm();
              }
            }
          }
        }
    }
</script>
