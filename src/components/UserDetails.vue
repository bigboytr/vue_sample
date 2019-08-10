<template>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label>{{locale.common.label.username}}</label>
                        <input type="text" class="form-control" name="username"
                               v-validate.disable="'required'"
                               v-model="dto.cbeUserDto.userName">
                        <i v-show="errors.has('username')" class="icon icon-triangle-warning"></i>
                        <span v-show="errors.has('username')" class="text-danger">{{ errors.first('username') }}</span>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label>{{locale.common.label.password}}</label>
                        <input type="password" class="form-control" name="password" ref="password"
                               v-validate.disable="'required'"
                               v-model="dto.cbeUserDto.password">
                        <i v-show="errors.has('password')" class="icon icon-triangle-warning"></i>
                        <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label>{{locale.login.placeholder.confirmPassword}}</label>
                        <input type="password" class="form-control" name="Repassword"
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
                        <input type="email" class="form-control" name="email"
                               v-validate.disable="'required|email'"
                               v-model="dto.cbeUserDto.email">
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
                        <toggleSwitch :checkValue="dto.cbeUserDto.isLocked"
                                      :id="'chk-6'"
                                      @get-toggle="setIsLocked" class="margin-r-20"></toggleSwitch>

                        <i>{{locale.userProfiles.userDetails.lockedDesc[lockedDescKey]}}</i>
                    </div>
                </div>
            </div>

            <!--<div class="row">

                <div class="col-md-3">
                    <label>
                        {{locale.userProfiles.userDetails.forceEmail}}
                    </label>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <toggleSwitch :checkValue="dto.cbeUserDto.forceEmail"
                                      :id="'chk-2'"
                                      @get-toggle="setForceEmail" class="margin-r-20"></toggleSwitch>
                        <i>{{locale.userProfiles.userDetails.forceEmailDesc[forceEmailDescKey]}}</i>
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="col-md-3">
                    <label>
                        {{locale.userProfiles.userDetails.forceDetails}}
                    </label>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <toggleSwitch :checkValue="dto.cbeUserDto.forceDetails"
                                      :id="'chk-3'"
                                      @get-toggle="setForceDetails" class="margin-r-20"></toggleSwitch>
                        <i>{{locale.userProfiles.userDetails.forceDetailsDesc[forceDetailsDescKey]}}</i>
                    </div>
                </div>
            </div>-->

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
</template>

<script>
    import store from '@/store/index'
    import controller from '@/controller/userController'
    import individualsController from '@/controller/individualsController'
    import toggleSwitch from '@/components/plugin/toggleSwitch'
    import notifyMe from '@/controller/notifyMe';

    export default {
        name: "UserDetails",
        props: ["item"],
        components: {
            toggleSwitch
        },
        data() {
            return {
                ids: {
                    partyId: null,
                    id: null
                },

                dto: {
                    cbeUserDto: {
                        cbeInvolvementIdRoleDtos: [
                            {
                                authorizedMethodList: [
                                    {
                                        description: "",
                                        id: "",
                                        name: ""
                                    }
                                ],
                                id: "",
                                roleName: ""
                            }
                        ],
                        email: "",
                        password: "",
                        isLocked: false,
                        /*forceEmail: false,
                        forceDetails: false,*/
                        resetPasswordRequired: false,
                        userName: ""
                    }
                },
                messages:""
            }
        },
        methods: {
            resetFormDto() {
                this.dto.cbeUserDto.email = "";
                this.dto.cbeUserDto.isLocked = false;
                this.dto.cbeUserDto.id = null;
                this.dto.cbeUserDto.password = "";
                this.dto.cbeUserDto.userName = "";
             //   this.ids.partyId = null;
                this.ids.id = null;
                this.errors.clear(); // For validation errors clean
            },
            submitForm() {

              let self = this;
              this.$validator.validateAll().then(function (response) {

                if(response) {
                  controller.save(self.dto, self.ids).then(function (response) {

                    notifyMe.successNotifier(response);
                    self.$parent.$parent.$parent.search();
                    self.close();
                  }).catch(function (errors) {

                    // TODO: error message will be implemeted later
                    notifyMe.errorNotifierGlobal(errors);
                  });
                }else {
                  notifyMe.warningNotifierGlobal(self.messages.common.statusNotification.fillForm);
                  console.log(self.$validator.errors);
                }
              },function () {
                console.log("error");
                console.log(self.$validator);
              });
            },
            close() {
              this.resetFormDto();
              $("#modal").modal("hide");
            },
            setIsLocked(value) {
                this.dto.cbeUserDto.isLocked = value;
            }
            /*,
            setForceEmail(value) {
                this.dto.cbeUserDto.forceEmail = value;
            },
            setForceDetails(value) {
                this.dto.cbeUserDto.forceDetails = value;
            }*/
        },
        computed: {
            locale() {
                return this.messages = store.getters.getLocale;
            },
            lockedDescKey() {
                return this.dto.cbeUserDto.locked ? "1" : "0"
            },
            forceEmailDescKey() {
                return this.dto.cbeUserDto.forceEmail ? "1" : "0"
            },
            forceDetailsDescKey() {
                return this.dto.cbeUserDto.forceDetails ? "1" : "0"
            }
        },
        watch: {
            item: {
                // This method is watching props data which name is item.
                // If item object is changed somewhere then its fired.
                immediate: true,
                handler(data) {
                    if (data != null) {

                        this.ids.partyId = data.party.id;
                        if(data.userInfo !== undefined && data.userInfo.id !== undefined) {
                          this.dto.cbeUserDto.userName = data.userInfo.userName;
                          this.dto.cbeUserDto.isLocked = data.userInfo.isLocked;
                          this.ids.id = data.userInfo.id;
                          this.dto.cbeUserDto.password = "";
                          this.dto.cbeUserDto.email = data.userInfo.email;
                        }else{
                          this.resetFormDto();
                        }
                    } else {
                        this.ids.partyId = null;
                        this.resetFormDto();
                    }
                }
            }
        }
    }
</script>
