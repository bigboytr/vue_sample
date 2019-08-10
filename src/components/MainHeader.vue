<template>
    <!-- Start Page Header -->
    <div class="row header">
        <div class="col-xs-3 col-sm-3 col-md-4">
            <router-link to="/" tag="h3" class="logo">
                {{locale.appTitle}}
            </router-link>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 text-right">

            <div class="btn-group pull-right user-info" role="group" v-if="locale.header">

                <button type="button" class="btn btn-transparent" title="Dark/Light Theme" @click="swTheme()">
                    <i class="fas fa-lightbulb text-theme"></i>
                </button>
                <div style="display: inline-block;" class="dropdown">
                    <button type="button" class="btn btn-link" data-toggle="dropdown">
                        <i class="far fa-user-circle"></i>
                        {{getUsername}} <!-- api/getUser -> Name -->
                        <i class="fas fa-chevron-down"></i>
                    </button>

                    <ul class="dropdown-menu">
                        <li>
                            <a href="javascript:void(0)" @click="routeProfilePage">

                                <i class="far fa-user-circle"></i> {{locale.header.profile}}
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <div class="text-center">
                                <i class="fas fa-flag"></i> {{locale.header.changeLanguage}}
                            </div>
                            <a href="javascript:void(0)"
                               v-for="(item, key) in locale.list"
                               v-if="item.active && key != lang"
                               @click="changeLang(key)"
                            >
                                <img :src="flag(key)" width="16">
                                {{locale.list[key].title}}
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="javascript:void(0)" class="text-danger" @click="logout">

                                <i class="fas fa-times"></i> {{locale.common.logout}}
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    </div>
    <!-- End Page Header -->
</template>
<script>
  import langController from '../controller/languageController'
  import auth from '../controller/authController2'
  //import settingsController from '../controller/settingsController'
  import store from '../store/index'
  import router from "../router";
  import tr from 'vee-validate/dist/locale/tr';
  import en from 'vee-validate/dist/locale/en';
  import de from 'vee-validate/dist/locale/de';
  import ar from 'vee-validate/dist/locale/ar';
  import fr from 'vee-validate/dist/locale/fr';
  import VeeValidate, {Validator} from 'vee-validate';
  import basicController from '@/controller/basicController'

  export default {
    name: "MainHeader",
    props: ["lang"],
    mounted() {
      //settingsController.getParentList();
      basicController.setDefaultTheme();
    },
    methods: {
      logout() {
        auth.logout(this);
      },
      flag(key) {
        return langController.flag(key);
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
        langController.setLang(key);
        langController.setLocaleAct(key);
      },
      routeProfilePage() {
        router.push('/profile');
      },
      swTheme() {
        basicController.themeSwitcher();
      }
    },
    computed: {
      getUsername() {
        return "Demo User for Vue Sample"//auth.getAuthUser();
        /*if (user) {
          //return user.body.cbeUserDto.userName;
          const nameDto = user.body.epIndividualDto.epIndividualNameDto;
          //TODO: midName null control
          if (nameDto.midName) {
            return nameDto.givenName + " " + nameDto.midName + " " + nameDto.familyName;
          } else {
            return nameDto.givenName + " " + nameDto.familyName;
          }
        }*/
      },
      locale() {
        return store.getters.getLocale
      }
    }
  }
</script>
