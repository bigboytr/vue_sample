<template>
    <div class="col-sm-6 col-md-4 col-md-push-3 login">
        <div class="panel panel-default" v-if="locale">
            <div class="panel-body">

                <div class="row">

                    <div class="col-md-12 pull-right margin-t-10 text-right form-inline">

                        <button class="btn btn-default form-group" @click="swTheme()">
                            <i class="icon icon-lightbulb text-theme-login"></i>
                        </button>

                        <div class="dropdown form-group">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                <i class="icon icon-language"></i>
                                {{locale.header.changeLanguage}} <i class="icon icon-chevron-down"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li>
                                    <a href="javascript:void(0)"
                                       v-for="(item, key) in locale.list"
                                       v-if="item.active && key != lang"
                                       @click="changeLang(key)"
                                    >
                                        <img :src="flag(key)" width="16">
                                        {{locale.list[key].title}}
                                    </a>
                                </li>
                            </ul>
                        </div>


                    </div>

                    <!-- Login Form -->
                    <div class="col-xs-12 col-sm-6 col-md-12" v-if="!registerForm && !resetPass">

                        <h6 class="margin-t-100 margin-b-50 hidden-xs">
                            {{locale.login.labelLogin}}
                        </h6>
                        <h6 class="margin-t-20 margin-b-20 visible-xs">
                            {{locale.login.labelLogin}}
                        </h6>
                        <div class="form-group">
                            <input type="text" class="form-control" :placeholder="locale.common.label.username"
                                   v-model="loginDto.username" v-on:input="changeLowerCase" v-on:keyup.enter="login">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" :placeholder="locale.common.label.password"
                                   v-model="loginDto.password" v-on:keyup.enter="login">
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary" @click="login()">
                                <i class="icon icon-arrow-right"></i>
                                {{locale.common.button.login}}
                            </button>
                        </div>

                        <div class="row margin-t-30">
                            <div class="col-xs-12 col-sm-6 col-md-6">
                                <div class="form-group">
                                    <button class="btn btn-default btn-block" @click="showRegisterForm()">
                                        <i class="icon icon-avatar"></i>
                                        {{locale.login.button.registerUser}}
                                    </button>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                                <div class="form-group">
                                    <button class="btn btn-default btn-block" @click="showResetForm">
                                        <i class="icon icon-notification-ring"></i>
                                        {{locale.login.button.resetPassword}}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Register Request Form -->
                    <div class="col-xs-12 col-sm-6 col-md-12" v-if="registerForm">
                        <h6 class="margin-t-30 margin-b-10">
                            {{locale.login.labelCreateUser}}
                        </h6>
                        <div class="form-group">
                            <input type="text" class="form-control"
                                   v-model="register.company" :placeholder="locale.login.placeholder.company">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" name="name"
                                   v-validate="'required'"
                                   v-model="register.name"
                                   :placeholder="locale.common.label.name">
                            <i v-show="errors.has('name')" class="icon icon-triangle-warning"></i>
                            <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" name="surname"
                                   v-validate="'required'"
                                   v-model="register.surname"
                                   :placeholder="locale.common.label.surname">
                            <i v-show="errors.has('surname')" class="icon icon-triangle-warning"></i>
                            <span v-show="errors.has('surname')"
                                  class="text-danger">{{ errors.first('surname') }}</span>
                        </div>
                        <!--<div class="form-group">
                            <input type="text" class="form-control" :placeholder="locale.login.placeholder.username">
                        </div>-->
                        <div class="form-group" :class="errors.has('email') ? 'has-error' : ''">
                            <input type="text" class="form-control" name="email"
                                   v-validate="'required|email'"
                                   v-model="register.email"
                                   v-on:input="changeLowerCaseEmail"
                                   :placeholder="locale.common.label.email">
                            <i v-show="errors.has('email')" class="icon icon-triangle-warning"></i>
                            <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                        </div>
                        <div class="form-group" :class="errors.has('pass') ? 'has-error' : ''">
                            <input type="password" class="form-control" name="password"
                                   v-validate="'required'"
                                   v-model="register.password"
                                   ref="password"
                                   :placeholder="locale.common.label.password">
                            <i v-show="errors.has('password')" class="icon icon-triangle-warning"></i>
                            <span v-show="errors.has('password')"
                                  class="text-danger">{{ errors.first('password') }}</span>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" name="confirmed_password"
                                   v-validate="'required|confirmed:password'"
                                   v-model="register.confirmedPassword"
                                   :placeholder="locale.login.placeholder.confirmPassword">
                            <i v-show="errors.has('confirmed_password')" class="icon icon-triangle-warning"></i>
                            <span v-show="errors.has('confirmed_password')" class="text-danger">{{ errors.first('confirmed_password') }}</span>
                        </div>
                        <div class="form-group">
                            <textarea class="form-control resize-off" rows="2" name="reason"
                                      v-validate="'required'"
                                      v-model="register.reason"
                                      :placeholder="locale.login.placeholder.reasonRegister"></textarea>
                            <i v-show="errors.has('reason')" class="icon icon-triangle-warning"></i>
                            <span v-show="errors.has('reason')" class="text-danger">{{ errors.first('reason') }}</span>
                        </div>
                        <div class="row">
                            <div class="col-xs-8 col-sm-6 col-md-6">
                                <div class="form-group">
                                    <button class="btn btn-primary" @click="registerUser()">
                                        <i class="icon icon-arrow-right"></i>
                                        {{locale.login.button.registerUser}}
                                    </button>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-6 col-md-6">
                                <div class="form-group pull-right">
                                    <button class="btn btn-danger btn-block" @click="showRegisterForm()">
                                        <i class="icon icon-cross"></i>
                                        {{locale.common.button.cancel}}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Reset Password Form -->
                    <div class="col-xs-12 col-sm-6 col-md-12" v-if="resetPass">
                        <h6 class="margin-t-100 margin-b-50">
                            {{locale.login.labelResetPassword}}
                        </h6>
                        <div class="form-group" :class="errors.has('usernameOrEmail') ? 'has-error' : ''">
                            <input type="text" class="form-control" name="usernameOrEmail"
                                   v-validate="'required|email'"
                                   v-model="resetPasswordDto.usernameOrEmail"
                                   v-on:input="changeLowerCaseUsernameorEmail"
                                   :placeholder="locale.login.placeholder.usernameOrEmail">
                            <i v-show="errors.has('email')" class="icon icon-triangle-warning"></i>
                            <span v-show="errors.has('usernameOrEmail')" class="text-danger">{{ errors.first('usernameOrEmail') }}</span>
                        </div>
                        <div class="row">
                            <div class="col-xs-8 col-sm-6 col-md-6">
                                <div class="form-group">
                                    <button class="btn btn-primary" @click="resetPassword()">
                                        <i class="icon icon-arrow-right"></i>
                                        {{locale.login.button.resetPassword}}
                                    </button>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-6 col-md-6">
                                <div class="form-group pull-right">
                                    <button class="btn btn-danger btn-block" @click="showResetForm()">
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
</template>

<script>
  import Vue from 'vue'
  import auth from '../controller/authController2'
  import userController from '../controller/userController'
  import validate from 'vee-validate'
  import langSupport from '../controller/languageController'
  import alertMe from '../controller/alertMe'
  import notifyMe from '../controller/notifyMe'
  import store from '../store/index'
  import tr from 'vee-validate/dist/locale/tr'
  import en from 'vee-validate/dist/locale/en'
  import de from 'vee-validate/dist/locale/de'
  import fr from 'vee-validate/dist/locale/fr'
  import ar from 'vee-validate/dist/locale/ar'
  import VeeValidate, {Validator} from 'vee-validate'
  import Notification from 'vue-notification';
  import basicController from '@/controller/basicController'

  Vue.use(Notification);

  export default {
    name: "Login",
    props: ["lang"],
    data() {
      return {
        error: false,
        registerForm: false,
        resetPass: false,
        loginDto: {
            username: "admin",
            password: "admin123"
        },
        resetPasswordDto: {
          usernameOrEmail: null
        },
        register: {
          name: null,
          surname: null,
          company: null,
          username: null,
          email: null,
          password: null,
          confirmedPassword: null,
          reason: null,
          language: this.$props.lang
        },
        dto: {
          newPassword: "",
          oldPassword: ""
        },
        messages: ""
      }
    },
    methods: {
      flag(key) {
        return langSupport.flag(key);
      },
      changeLang(key) {
        if (key === 'tr') {
          Validator.localize('tr', tr);
        } else if (key === 'en') {
          Validator.localize('en', en);
        } else if (key === 'de') {
          Validator.localize('de', de);
        } else if (key === 'ar') {
          Validator.localize('ar', ar);
        } else if (key === 'fr') {
          Validator.localize('fr', fr);
        }
        langSupport.setLang(key);
        langSupport.setLocaleAct(key);
      },
      login() {
        auth.login(this.loginDto, this.messages);
      },
      showRegisterForm() {
        this.registerForm = !this.registerForm;
      },
      registerUser() {
        let self = this;
        this.$validator.validateAll().then(function (response) {

          if (response) {
            self.dtoUpdate;
            userController.registerUser(self.register).then(function () {

              notifyMe.successNotifier(response);
              self.showRegisterForm();

            }).catch(function (errors) {
              if (errors.response !== undefined) {
                notifyMe.errorNotifierGlobal(self.messages.common.errorCode[errors.errorCode]);
              } else {
                notifyMe.errorNotifierGlobal(self.messages.common.statusNotification.errorNetwork);
              }
            });

          } else {

            notifyMe.warningNotifierGlobal(self.messages.common.statusNotification.fillForm);
            console.log(self.$validator.errors);
          }
        }, function () {
          console.log("error");
          console.log(self.$validator);
        });

      },
      showResetForm() {
        this.resetPass = !this.resetPass;
      },
      resetPassword() {
        let self = this;
        console.log(this.resetPasswordDto);
        this.$validator.validateAll().then(function (response) {

          if (response) {
            userController.resetPassword(self.resetPasswordDto).then(function (response) {

              notifyMe.successNotifierGlobal(self.messages.common.statusNotification.resetPassword);
              self.showResetForm();

            }).catch(function (errors) {

              notifyMe.errorNotifierGlobal(errors);
            });
          }
        });
      },
      changeLowerCase() {
        this.loginDto.username = this.loginDto.username.toLowerCase();
      },
      changeLowerCaseEmail() {
        this.register.email = this.register.email.toLowerCase();
      },
      changeLowerCaseUsernameorEmail() {
        this.resetPasswordDto.usernameOrEmail = this.resetPasswordDto.usernameOrEmail.toLowerCase();
      },


      swTheme() {
        basicController.themeSwitcher();
      }

    },
    computed: {
      dtoUpdate() {
        this.register.username = this.register.email;
      },
      locale() {
        return this.messages = store.getters.getLocale
      }
    }
  }
</script>

<style scoped>

    .login .panel-body {
        padding: 0 15px;
    }

    .login .login-bg img {
        width: 100%;

        -webkit-transition: all .5s;
        -moz-transition: all .5s;
        -ms-transition: all .5s;
        -o-transition: all .5s;
        transition: all .5s;
    }

    .dark .login-bg img {
        /*-webkit-filter: invert(80%);
        filter: invert(80%);*/
        -webkit-filter: invert(80%) grayscale(100%);
        filter: invert(80%) grayscale(100%);
    }

</style>