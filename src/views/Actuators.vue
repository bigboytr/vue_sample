<template>
    <div class="row">
      <div class="col-md-12">

        <div class="panel panel-info">
          <div class="panel-heading">
              <div class="panel-title">
                  {{locale.actuators.pageTitle}}
                  <button class="btn btn-sm btn-default pull-right" @click="closeNewRule()">
                    <i class="icon icon-plus"></i>
                    Back to List
                  </button>
              </div>
          </div>
          <div class="panel-body">
          <!-- Content goes here -->
              <div class="row">
                <div class="col-md-7">

                    <!-- TABLE LIST -->
                    <div class="row">
                      <div class="col-md-12">
                        <table v-if="list.length > 0" class="table table-striped table-bordered table-hover">
                          <thead>
                          <tr>
                            <th v-for="(field, key) in locale.actuators.tableFields">
                              {{field}}
                            </th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="(item, key) in list">
                            <td width="5%" align="center">{{key+1}}</td>
                            <td width="70%">{{item.title}}</td>
                            <td width="25%">
                              <div class="button-group">
                                <button class="btn btn-xs btn-warning" @click="showDetail(item)">
                                  <i class="icon icon-edit"></i>
                                </button>
                                <button class="btn btn-xs btn-danger" @click="deleteSelected(item)">
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

                <div class="col-md-5">
                    <div class="row">
                    <div class="col-md-12">
                      <div class="well">

                        <div class="row">
                          <div class="col-md-12">

                            <h3>Actuator Form</h3>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-4">
                            <label>{{locale.actuators.placeholder.title}}</label>
                          </div>
                          <div class="col-md-8">
                            <div class="form-group">
                              <input type="text" class="form-control" v-model="title">
                            </div>
                          </div>

                          <div class="col-md-4">
                            <label>{{locale.actuators.placeholder.organization}}</label>
                          </div>
                          <div class="col-md-8">
                            <div class="form-group">
                              <selectOrganization @getOrganizationId="setOrganizationId"
                                                  :id="'sel-org2'"
                                                  :selected="selectedOrgId"></selectOrganization>
                            </div>
                          </div>

                          <div class="col-md-4">
                            <label>{{locale.actuators.placeholder.product}}</label>
                          </div>
                          <div class="col-md-8">
                            <div class="form-group">
                              <selectProduct @getProductId="setProductId"
                                             :partyId="selectedOrgId"
                                             :type="2"
                                             :id="'sel-prod2'"
                                             :selected="selectedProductId"></selectProduct>
                            </div>
                          </div>

                          <div class="col-md-4">
                            <label>{{locale.resources.placeholder.service}}</label>
                          </div>
                          <div class="col-md-8">
                            <div class="form-group">
                              <selectService @getServiceId="setServiceId"
                                             :productId="selectedProductId"
                                             :id="'sel-ser2'"
                                             :selected="selectedServiceId"></selectService>
                            </div>
                          </div>

                          <div class="col-md-12">
                            <p class="margin-t-5"
                               v-if="Object.keys(cases[0].actuators).length > 0"
                               v-for="(item, key) in cases[0].actuators">
                              {{item.name}} : {{item.operation}} - Value : {{item.data.value}}

                              <a href="javascript:void(0)"
                                 class="f-size-15 pull-right text-danger"
                                 @click="removeThis(cases[0].actuators, key)">
                                <i class="icon icon-cross-small"></i>
                              </a>
                            </p>
                          </div>

                          <div class="col-md-12" v-if="Object.keys(cases[0].actuators).length > 0">
                            <div class="form-group">
                              <button class="btn btn-sm btn-primary" @click="save(title)">
                                <i class="icon icon-arrow-right"></i>
                                {{locale.common.button.save}}
                              </button>
                            </div>
                          </div>
                        </div>

                        <table class="table table-bordered" v-if="selectedServiceId">
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

          </div>
        </div>

        <modal :title="!addAct ? 'Condition' : 'Action'" :id="'modal'" :cssClass="'modal-lg'">
          <RuleCondition :dataModel="resourceDataModel"
                         :operation="!addAct ? 'R' : 'W,E'"
                         @get-action="setAction"></RuleCondition>
        </modal>

      </div>
  </div>
</template>

<script>
    import store from '@/store/index'
    import RecursiveResource from '@/components/plugin/RecursiveResource'
    import resourceController from '@/controller/resourceController'
    import selectOrganization from '../components/plugin/selectOrganization.vue'
    import selectProduct from '../components/plugin/selectProduct.vue'
    import selectService from '../components/plugin/selectService.vue'
    import modal from '../components/ModalTemplate.vue';
    import emptyList from '@/components/plugin/emptyDataset'
    import notifyMe from '@/controller/notifyMe'
    import RuleCondition from '@/components/RuleCondition'


    export default {
        name: "Actuators",
        data () {
          return {
            modalTitle: "",
            addAct: true,
            isEdit: false,
            mockArray: [
              {
                title: 'Actuator 1',
                action: 'ahahaha',
                resourceId: "sfhsdfu24242"
              },
              {
                title: 'Actuator 2',
                action: 'eejeeheh',
                resourceId: "sfhsdfu24242555"
              },
              {
                title: 'Actuator 3',
                action: 'asdasdas',
                resourceId: "sfhsdfu24242344"
              },
              {
                title: 'Actuator 4',
                action: 'dffgdfgdfg',
                resourceId: "sfhsdfu24242225432"
              }],
            selectedOrgId: 0,
            selectedProductId: 0,
            selectedServiceId: 0,
            title:"",
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
          }
        },
        components: {
          modal,
          RuleCondition,
          selectOrganization,
          selectProduct,
          selectService,
          emptyList,
          notifyMe,
          RecursiveResource
        },
        computed: {
          list() {
            return this.mockArray
          },
          locale() {
            return store.getters.getLocale;
          }
        },
        methods: {
          closeNewRule() {
            this.$parent.newActuatorView = false;
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
          removeThis(collection, key) {
            // this is remove condition statement
            collection.splice(--key, 1);
          },
          setOrganizationId(id) {
            this.selectedOrgId = id;
          },
          setProductId(id) {
            this.selectedProductId = id;
          },
          setServiceId(id) {
            this.selectedServiceId = id;
            const self = this;

            let searchDto = {
              organizationId: this.selectedOrgId,
              productId: this.selectedProductId,
              serviceId: id
            };

            // this method get resource list
            resourceController.searchResource(searchDto).then(function (response) {
              resourceController.revertTree(response).then(function (output) {
                self.resources = output;
              })
            });
          },
          setAction(obj) {

            this.cases[0].actuators.push(obj);
          },
          deleteMe(id) {

          },
          editModel(key, item){
            this.modalTitle = "Edit Actuator";
            this.isEdit = true;
          //  $('#modal').modal('show');
          },
          search(){

          },
          save(title){
            let dto = {
              title: title,
              action: "deneme",
              resourceId: "denasdfsfms53445"
            };
            this.mockArray.push(dto);
          }

        }

    }

</script>


<style scoped>

</style>
