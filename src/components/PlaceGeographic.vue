<template>
    <!-- GEO Place Edit/View Form -->
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label>{{locale.placeGeographic.placeholder.addressLine1}}</label>
                    <input type="text" class="form-control" name="adres"
                           v-validate.disable="'required'"
                           v-model="dtoGeoPlace.addressLineOne">
                    <i v-show="errors.has('adres')" class="icon icon-triangle-warning"></i>
                    <span v-show="errors.has('adres')" class="text-danger">{{ errors.first('adres') }}</span>
                </div>
                <div class="form-group">
                    <label>{{locale.placeGeographic.placeholder.addressLine2}}</label>
                    <input type="text" class="form-control"
                           v-model="dtoGeoPlace.addressLineTwo">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <div class="form-group">
                    <label>{{locale.placeGeographic.placeholder.town}}</label>
                    <input type="text" class="form-control" name="town"
                           v-validate.disable="'required'"
                           v-model="dtoGeoPlace.town">
                    <i v-show="errors.has('town')" class="icon icon-triangle-warning"></i>
                    <span v-show="errors.has('town')" class="text-danger">{{ errors.first('town') }}</span>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label>{{locale.placeGeographic.placeholder.city}}</label>
                    <input type="text" class="form-control" name="city"
                           v-validate.disable="'required'"
                           v-model="dtoGeoPlace.city">
                    <i v-show="errors.has('city')" class="icon icon-triangle-warning"></i>
                    <span v-show="errors.has('city')" class="text-danger">{{ errors.first('city') }}</span>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label>{{locale.placeGeographic.placeholder.stateProvince}}</label>
                    <input type="text" class="form-control" v-model="dtoGeoPlace.stateProvince">
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label>{{locale.placeGeographic.placeholder.zipCode}}</label>
                    <input type="text" class="form-control" v-model="dtoGeoPlace.zipCode">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <div class="form-group">
                    <label>{{locale.placeGeographic.placeholder.country}}</label>
                    <selectCountry   :selected="dtoGeoPlace.countryCode" @getCountryCode="setCountryCode"></selectCountry>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label>{{locale.placeGeographic.placeholder.timeZone}}</label>
                    <selectTimezone  :selected="dtoGeoPlace.timeZoneCode" @getTimezoneCode="setTimezoneCode"></selectTimezone>
                </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label>{{locale.placeGeographic.placeholder.defaultAdress}}</label>
                <div class="form-group">
                  <toggleSwitch :checkValue="getCheckBoxValue"
                                :id="'chk-4'"
                                @get-toggle="setCheckBoxValue" class="margin-r-20"></toggleSwitch>
                </div>
              </div>
            </div>
        </div>
        <div class="row">
          <div class="col-xs-8 col-sm-6 col-md-6"  v-if="saveButtonShow()">
            <div class="form-group">
              <button class="btn btn-primary" @click="saveForm()">
                <i class="icon icon-arrow-right"></i>
                {{locale.common.button.save}}
              </button>
            </div>
          </div>
          <div class="col-xs-8 col-sm-6 col-md-6"  v-if="createButtonShow()">
            <div class="form-group">
              <button class="btn btn-primary" @click="submitForm()">
                <i class="icon icon-arrow-right"></i>
                {{locale.common.button.create}}
              </button>
            </div>
          </div>
          <div v-if="!hiddenCancelButton" class="col-xs-4 col-sm-6 col-md-6">
            <div class="form-group pull-right">
              <button class="btn btn-danger btn-block" data-dismiss="modal">
                <i class="icon icon-cross"></i>
                {{locale.common.button.cancel}}
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <hr>
            <h4>{{locale.placeGeographic.savedItem}}</h4>
            <table class="table table-bordered table-striped table-hover">
              <thead>
              <tr>
                <th width="50%">{{locale.placeGeographic.placeholder.addressLine1}}</th>
                <th width="20%">{{locale.placeGeographic.placeholder.town}}</th>
                <th width="20%">{{locale.placeGeographic.placeholder.city}}</th>
                <th width="10%"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, key) in tableList">
                <td>
                  <span v-if="key !== editKey">{{item.addressLineOne}}</span>
                  <input v-if="key === editKey" type="text" class="form-control" :value="dtoGeoPlace.addressLineOne" readonly>
                </td>
                <td>
                  <span v-if="key !== editKey">{{item.town}}</span>
                  <input v-if="key === editKey" type="text" class="form-control" :value="dtoGeoPlace.town" readonly>
                </td>
                <td>
                  <span v-if="key !== editKey">{{item.city}}</span>
                  <input v-if="key === editKey" type="text" class="form-control" :value="dtoGeoPlace.city" readonly>
                </td>
                <td width="10%">
                  <div class="button-group">
                    <button class="btn btn-xs btn-warning" @click="editMode(key, item)">
                      <i class="icon icon-edit"></i>
                    </button>
                    <button class="btn btn-xs btn-danger" @click="deleteAdressOrCancelEditMode(key, item)" >
                      <i class="icon icon-cross-small"></i>
                    </button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

    </div>

</template>

<script>
    import controller from '@/controller/placeController'
    import store from '../store/index';
    import selectTimezone from '@/components/plugin/selectTimezone'
    import selectCountry from '@/components/plugin/selectCountry'
    import toggleSwitch from '@/components/plugin/toggleSwitch'
    import notifyMe from '@/controller/notifyMe';


    export default {
        name: "PlaceGeographic",
        props: ["partyId","hiddenCancelButton"],
        components: {
            selectTimezone,
            selectCountry,
            toggleSwitch
        },
        data() {
            return {

                dtoGeoPlace: {
                    placeId:null,
                    addressLineOne: null,
                    addressLineTwo: null,
                    city: null,
                    countryCode: null,
                    defaultAddress: true,
                    town: null,
                    zipCode: null,
                    stateProvince: null,
                    statusCode: 0,
                    siteName: null,
                    siteCode: null,
                    siteTypeCode: 0,
                    timeZoneCode: 0,
                    placeTypeCd: 0,
                    validFor: 0

                },
              tableList:{},
              editKey: null,
              messages:""
            }
        },
        methods: {
          resetForm(){
            this.editKey = null;
            this.dtoGeoPlace.placeId = "";
            this.dtoGeoPlace.addressLineOne = "";
            this.dtoGeoPlace.addressLineTwo = "";
            this.dtoGeoPlace.city = "";
            this.dtoGeoPlace.countryCode = 0;
            this.dtoGeoPlace.defaultAddress = true;
            this.dtoGeoPlace.town = "";
            this.dtoGeoPlace.zipCode = "";
            this.dtoGeoPlace.stateProvince = "";
            this.dtoGeoPlace.statusCode = "";
            this.dtoGeoPlace.siteName = "";
            this.dtoGeoPlace.siteCode = "";
            this.dtoGeoPlace.siteTypeCode = "";
            this.dtoGeoPlace.timeZoneCode = 0;
            this.dtoGeoPlace.placeTypeCd = "";
            this.dtoGeoPlace.validFor = "";
            this.errors.clear(); // For validation errors clean

          },
          saveButtonShow(){
            if(this.editKey!==null){
              return true;
            }else{
              return false;
            }
          },
          createButtonShow(){
            if(this.editKey === null){
              return true;
            }else{
              return false;
            }
          },
            submitForm() {

              let self = this;
              this.$validator.validateAll().then(function (response) {

                if(response) {
                  controller.createGeopraphicPlacesToParty(self.dtoGeoPlace, self.$props.partyId)
                    .then( (response)=>{
                      console.log("Success createGeopraphicPlacesToParty");
                      console.log(response);
                      console.log(store.getters.getOrganizationGeoPlaces);
                      notifyMe.successNotifierGlobal(self.messages.common.statusNotification.successPlaceGeographic);
                      self.resetForm();
                      controller.getGeopraphicPlacesByParty(self.$props.partyId).then((responce)=>{
                        console.log(responce);
                        self.tableList = self.$store.getters.getOrganizationGeoPlaces;
                      });
                    })
                    .catch((errors)=>{
                      console.log(errors);
                      notifyMe.errorNotifierGlobal(errors);
                      self.resetForm();
                    });
                }else {
                  notifyMe.warningNotifierGlobal(self.messages.common.statusNotification.fillForm);
                  console.log(self.$validator.errors);
                }
              },function () {
                console.log(self.$validator);
              });
            },
            saveForm() {

              let self = this;
              this.$validator.validateAll().then(function (response) {

                if(response) {
                  controller.saveGeopraphicPlacesToParty(self.dtoGeoPlace)
                    .then( (response)=>{
                      console.log("Success saveGeopraphicPlacesToParty");
                      notifyMe.successNotifierGlobal(self.messages.common.statusNotification.updatePlaceGeographic);
                      self.resetForm();
                      controller.getGeopraphicPlacesByParty(self.$props.partyId).then((response)=>{
                        console.log(response);
                        self.tableList = self.$store.getters.getOrganizationGeoPlaces;
                      });
                    })
                    .catch((errors)=>{
                      console.log("Failure saveGeopraphicPlacesToParty");
                      console.log(errors);
                      notifyMe.errorNotifierGlobal(errors);
                      self.resetForm();
                    });
                }else {
                  notifyMe.warningNotifierGlobal(self.messages.common.statusNotification.fillForm);
                  console.log(self.$validator.errors);
                }
              },function () {
                console.log(self.$validator);
              });
            },
            deleteAdressOrCancelEditMode(key, item) {
            if(this.editKey !== null){
              this.resetForm();
            }else{
              controller.deleteGeopraphicPlacesToParty(item)
                .then( (response)=>{
                  console.log("Success deleteGeopraphicPlacesToParty");
                  console.log(response);
                  notifyMe.successNotifierGlobal(this.messages.common.statusNotification.deletePlaceGeographic);
                  this.resetForm();
                  controller.getGeopraphicPlacesByParty(this.$props.partyId).then((responce)=>{
                    console.log(responce);
                    this.tableList = this.$store.getters.getOrganizationGeoPlaces;
                  });
                })
                .catch((errors)=>{
                  console.log("Failure deleteGeopraphicPlacesToParty");
                  console.log(errors);
                  notifyMe.errorNotifierGlobal(errors);
                  this.resetForm();
                });
              console.log(this.dtoGeoPlace);
            }

            },
            setTimezoneCode(code) {
                this.dtoGeoPlace.timeZoneCode = code
            },
            setCountryCode(code) {
                this.dtoGeoPlace.countryCode = code;
            },
            setCheckBoxValue(code){
                this.dtoGeoPlace.defaultAddress = code;
            },
            getCheckBoxValue(){
                return this.dtoGeoPlace.defaultAddress;
            },
            editMode(key, item) {
              this.editKey = key;
              this.dtoGeoPlace.placeId = item.id;
              this.dtoGeoPlace.addressLineOne = item.addressLineOne;
              this.dtoGeoPlace.addressLineTwo = item.addressLineTwo;
              this.dtoGeoPlace.city = item.city;
              this.dtoGeoPlace.countryCode = item.countryCode;
              this.dtoGeoPlace.defaultAddress = item.defaultAddress;
              this.dtoGeoPlace.town = item.town;
              this.dtoGeoPlace.zipCode = item.zipCode;
              this.dtoGeoPlace.stateProvince = item.stateProvince;
              this.dtoGeoPlace.statusCode = item.statusCode;
              this.dtoGeoPlace.siteName = item.siteName;
              this.dtoGeoPlace.siteCode = item.siteCode;
              this.dtoGeoPlace.siteTypeCode = item.siteTypeCode;
              this.dtoGeoPlace.timeZoneCode = item.timeZoneCode;
              this.dtoGeoPlace.placeTypeCd = item.placeTypeCd;
              this.dtoGeoPlace.validFor = item.validFor;
            },
            listMode() {
              this.editKey = null;
              this.resetForm();
            }
        },
        computed: {
            locale() {
                return this.messages = store.getters.getLocale;
            }
        },
      beforeMount(){
        console.log(data);
        const self = this;
        const data = self.$props.partyId;
        self.hiddenCancelButton = self.$props.hiddenCancelButton;
        self.editKey = null;
        if (data != null) {
          controller.getGeopraphicPlacesByParty(data).then(function (response) {

            self.tableList = self.$store.getters.getOrganizationGeoPlaces;

            /*  if(self.$store.getters.getOrganizationGeoPlaces.length >0){
                  self.dtoGeoPlace.addressLineOne = self.$store.getters.getOrganizationGeoPlaces[0].addressLineOne;
                  self.dtoGeoPlace.addressLineTwo = self.$store.getters.getOrganizationGeoPlaces[0].addressLineTwo;
                  self.dtoGeoPlace.city = self.$store.getters.getOrganizationGeoPlaces[0].city;
                  self.dtoGeoPlace.countryCode = self.$store.getters.getOrganizationGeoPlaces[0].countryCode;
                  self.dtoGeoPlace.town = self.$store.getters.getOrganizationGeoPlaces[0].town;
                  self.dtoGeoPlace.zipCode = self.$store.getters.getOrganizationGeoPlaces[0].zipCode;
                  self.dtoGeoPlace.stateProvince = self.$store.getters.getOrganizationGeoPlaces[0].stateProvince;
                  self.dtoGeoPlace.statusCode = self.$store.getters.getOrganizationGeoPlaces[0].statusCode;
                  self.dtoGeoPlace.siteName = self.$store.getters.getOrganizationGeoPlaces[0].siteName;
                  self.dtoGeoPlace.siteCode = self.$store.getters.getOrganizationGeoPlaces[0].siteCode;
                  self.dtoGeoPlace.siteTypeCode = self.$store.getters.getOrganizationGeoPlaces[0].siteTypeCode;
                  self.dtoGeoPlace.timeZoneCode = self.$store.getters.getOrganizationGeoPlaces[0].timeZoneCode;
                  self.dtoGeoPlace.placeTypeCd = self.$store.getters.getOrganizationGeoPlaces[0].placeTypeCd;
              }else {
                  self.resetForm();
              }
              */
          });
        }
          this.resetForm();

      },
      watch: {
        partyId: function (data) {
          // This method is watching props data which name is item.
          // If item object is changed somewhere then its fired.
          const self = this;
          self.editKey = null;
          if (data != null) {
            controller.getGeopraphicPlacesByParty(data).then(function () {

                self.tableList = self.$store.getters.getOrganizationGeoPlaces;
             /*   if(self.$store.getters.getOrganizationGeoPlaces.length >0 ){
                    self.dtoGeoPlace.addressLineOne = self.$store.getters.getOrganizationGeoPlaces[0].addressLineOne;
                    self.dtoGeoPlace.addressLineTwo = self.$store.getters.getOrganizationGeoPlaces[0].addressLineTwo;
                    self.dtoGeoPlace.city = self.$store.getters.getOrganizationGeoPlaces[0].city;
                    self.dtoGeoPlace.countryCode = self.$store.getters.getOrganizationGeoPlaces[0].countryCode;
                    self.dtoGeoPlace.town = self.$store.getters.getOrganizationGeoPlaces[0].town;
                    self.dtoGeoPlace.zipCode = self.$store.getters.getOrganizationGeoPlaces[0].zipCode;
                    self.dtoGeoPlace.stateProvince = self.$store.getters.getOrganizationGeoPlaces[0].stateProvince;
                    self.dtoGeoPlace.statusCode = self.$store.getters.getOrganizationGeoPlaces[0].statusCode;
                    self.dtoGeoPlace.siteName = self.$store.getters.getOrganizationGeoPlaces[0].siteName;
                    self.dtoGeoPlace.siteCode = self.$store.getters.getOrganizationGeoPlaces[0].siteCode;
                    self.dtoGeoPlace.siteTypeCode = self.$store.getters.getOrganizationGeoPlaces[0].siteTypeCode;
                    self.dtoGeoPlace.timeZoneCode = self.$store.getters.getOrganizationGeoPlaces[0].timeZoneCode;
                    self.dtoGeoPlace.placeTypeCd = self.$store.getters.getOrganizationGeoPlaces[0].placeTypeCd;
                }else {
                    self.resetForm();
                } */
            });
          }
          this.resetForm();
        }
      }
    }
</script>
