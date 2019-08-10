<template>
    <!-- Local Place Edit/View Form -->
    <div>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label>{{locale.placeLocal.placeholder.compound}}</label>
                    <input type="text" class="form-control" name="compound"
                           v-validate.disable="'required'"
                           v-model="dto.compound">
                    <i v-show="errors.has('compound')" class="icon icon-triangle-warning"></i>
                    <span v-show="errors.has('compound')" class="text-danger">{{ errors.first('compound') }}</span>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>{{locale.placeLocal.placeholder.type}}</label>
                    <selectLocalPlaceType :selected="dto.placeTypeCd"
                                          :id="'selectType'"
                                          @getLocalPlaceTypeCode="setPlaceTypeCode"></selectLocalPlaceType>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>{{locale.placeLocal.placeholder.definition}}</label>
                    <input type="text" class="form-control" v-model="dto.positionDefinition">
                </div>
            </div>
        </div>
        <div class="row" v-if="buttons">
            <div class="col-md-12 form-inline">
                <div class="form-group">
                    <button class="btn btn-primary" @click="saveToParty()">
                        <i class="icon icon-arrow-right"></i>
                        <span v-if="editKey == null"> {{locale.common.button.create}} </span>
                        <span v-if="editKey != null"> {{locale.common.button.update}} </span>
                    </button>
                </div>

                <div class="form-group pull-right">
                    <button class="btn btn-danger btn-block" data-dismiss="modal" @click="listMode">
                        <i class="icon icon-cross"></i>
                        {{locale.common.button.cancel}}
                    </button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <hr>
                <h4>{{locale.placeLocal.savedItem}}</h4>
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                    <tr>
                        <th width="20%">{{locale.placeLocal.placeholder.compound}}</th>
                        <th width="20%">{{locale.placeLocal.placeholder.type}}</th>
                        <th width="50%">{{locale.placeLocal.placeholder.definition}}</th>
                        <th width="10%"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, key) in localList">
                        <td>
                            <span v-if="key !== editKey">{{item.compound}}</span>
                            <span v-if="key === editKey">{{dto.compound}}</span>
                        </td>
                        <td>
                            <span v-if="key !== editKey">{{getTypeName(item.localPlaceTypeCode)}}</span>
                            <span v-if="key === editKey">{{getTypeName(dto.placeTypeCd)}}</span>
                        </td>
                        <td>
                            <span v-if="key !== editKey">{{item.positionDefinition}}</span>
                            <span v-if="key === editKey">{{dto.positionDefinition}}</span>
                        </td>
                        <td width="10%">
                            <div class="button-group">
                                <button class="btn btn-xs btn-warning" @click="editMode(key, item)" v-if="key !== editKey">
                                    <i class="icon icon-edit"></i>
                                </button>
                                <button class="btn btn-xs btn-success" @click="saveForm()" v-if="key === editKey">
                                    <i class="icon icon-check"></i>
                                </button>
                                <button class="btn btn-xs btn-danger" @click="deleteSelected(key, item.id)">
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
    import lookup from '@/controller/lookupController'
    import store from '@/store/index'
    import selectLocalPlaceType from '@/components/plugin/selectLocalPlaceType'
    import notifyMe from '@/controller/notifyMe';


    export default {
        name: "PlaceLocal",
        props: ["partyId", "buttons"],
        data() {
            return {
                editKey: null,
                selectedRows: [], // if need, multiple delete array
                dto: {
                    id: null,
                    compound: null,
                    placeTypeCd: null,
                    positionDefinition: null
                },
                messages:""
            }
        },
        components: {
            selectLocalPlaceType
        },
        mounted() {
            controller.getLocalPlacesByParty(this.$props.partyId)
        },
        methods: {
            resetForm() {
                this.dto.id = null;
                this.dto.compound = null;
                this.dto.placeTypeCd = 0;
                this.dto.positionDefinition = null;
                this.errors.clear(); // For validation errors clean
            },
            listMode() {
                this.editKey = null;
                this.resetForm();
            },
            editMode(key, item) {
                this.editKey = key;
                this.dto.id = item.id;
                this.dto.compound = item.compound;
                this.dto.placeTypeCd = item.localPlaceTypeCode;
                this.dto.positionDefinition = item.positionDefinition;
            },
            saveToParty() {

              let self = this;
              this.$validator.validateAll().then(function (response) {
                  if(response) {
                    if (self.editKey == null) { // POST CREATE
                      controller.saveLocalPlaceToParty(self.$props.partyId, self.dto).then(function(response) {
                        controller.getLocalPlacesByParty(self.$props.partyId);
                        self.resetForm();
                        notifyMe.successNotifierGlobal(self.messages.common.statusNotification.successPlaceLocal);
                      });
                    } else {  // PUT UPDATE
                      controller.updateLocalPlace(self.dto).then(function() {
                        controller.getLocalPlacesByParty(self.$props.partyId);
                        self.listMode();
                        self.resetForm();
                        notifyMe.successNotifierGlobal(self.messages.common.statusNotification.updatePlaceLocal);
                      });
                    }
                  }else {
                    notifyMe.warningNotifierGlobal(self.messages.common.statusNotification.fillForm);
                    console.log(self.$validator.errors);
                  }
              },function () {
                console.log(self.$validator);
              });
            },
            setPlaceTypeCode(value) {
                this.dto.placeTypeCd = value
            },
            getTypeName(code) {
                return lookup.getNameByCode(code, "localPlaceType");
            },
            deleteSelected (key,id) {
              if(this.editKey == null) {
                if (id !== undefined) {
                  this.selectedRows.push(id);
                }
                const self = this;
                controller.delete(this.selectedRows).then(function(res) {

                  notifyMe.successNotifierGlobal(res + " " + self.messages.common.statusNotification.deletePlaceLocal);
                  //   self.search();
                  controller.getLocalPlacesByParty(self.$props.partyId);
                  self.selectedRows = [];
                });
              }else{
                 this.listMode();
              }
            }
        },
        computed: {
            localList() {
                return store.getters.getOrganizationLocalPlaces;
            },
            locale() {
                return this.messages = store.getters.getLocale;
            }
        },
        watch: {
            partyId: function (data) {
                controller.getLocalPlacesByParty(data)
            }
        }
    }
</script>
