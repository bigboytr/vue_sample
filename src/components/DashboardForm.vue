<template>
  <div class="row">
    <div class="col-md-12">
      <!-- TABLE LIST -->
      <table class="table table-striped table-bordered table-hover">
          <thead>
          <tr>
            <th v-for="(field, key) in locale.dashboard.tableChannels">
              {{field}}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, key) in list">
            <td width="10%">{{key+1}}</td>
            <td width="30%">{{item.channelId}}</td>
            <td width="50%">{{item.channelName}}</td>
            <td width="10%" align="center">
              <label>
                <input type="checkbox" v-model="selectedRows" :value="item">
              </label>
            </td>
          </tr>
          </tbody>
        </table>

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
  </div>
</template>

<script>
    import store from '@/store/index'
    import moment from 'moment';

    export default {
        name: "DashboardForm",
        props: ['item'],
        data() {
          return {
            date1: moment().add(-1, "day").valueOf(),
            date2: moment().valueOf(),
            channelList: [], // this List get AllChannelList
            chartList: [],   // this List for lineChart
            chartListName : [], // this List for names
            selectedRows:[],
            dto: {
              startTime: null,
              endTime: null,
              channelId: ""
            }
          }
        },
        components: {

        },
        methods: {
          submitForm() {

              if(this.selectedRows.length > 0) {
                let self = this;
                this.chartList = [];
                this.chartListName = [];
                this.selectedRows.forEach(function(item) {

                  let dtoNew = {
                    startTime: new Date(self.date1).getTime(),
                    endTime: new Date(self.date2).getTime(),
                    channelId: item.channelId
                  };

                  self.chartList.push(dtoNew);
                  self.chartListName.push(item.channelName);
                });

                if (this.selectedRows.length > 0) {
                  //this.selectedRows = [];
                  this.$parent.$parent.getResourceValues(this.chartList, this.chartListName);
                  this.close();
                } else {
                  // do something.
                }
              }
          },
          close() {
            this.resetForm();
            $("#modal").modal("hide");
          },
          resetForm(){
            this.chartList = [];
            this.selectedRows = [];
            this.chartListName = [];
          }
        },
        computed: {
          locale() {
            return store.getters.getLocale
          },
          list(){
            return this.channelList;
          }
        },
        watch: {
          item: function (data) {
            // This method is watching props data which name is item.
            // If item object is changed somewhere then its fired.
            if (data != null) {
                this.channelList = data;
            }
          }
        }
    }

</script>

