<template>
  <div>
    <select class="form-control" v-model="code" @change="sendId()" :id="id" v-validate.disable="'excluded:0'" name="roleType">
      <option value="0">{{locale.common.label.selectDefaultMessage}}</option>
      <option v-for="(item, key) in list" :value="item.code">{{item.name}}</option>
    </select>
    <i v-show="errors.has('roleType')" class="icon icon-triangle-warning"></i>
    <span v-show="errors.has('roleType')" class="text-danger">{{ errors.first('roleType') }}</span>
  </div>
</template>

<script>
  import store from '@/store/index'
  import lookupController from '@/controller/lookupController'
    export default {
      name: "SelectPartyRoleType",
      props: ["selected","id"],
      inject: ['$validator'], // inject parent validator
      mounted() {
        //setTimeout(lookupController.setLookupItems("EP_LKP_PARTY_ROLE_TYPE"), 200);
        //store.dispatch("setLookupItems", "EP_LKP_PARTY_ROLE_TYPE");


      },
      data() {
        return {
          code: 0
        }
      },
      computed: {
        list() {
          return store.getters.getLookupItems("EP_LKP_PARTY_ROLE_TYPE");
          /*store.getters.getLookupItems("EP_LKP_PARTY_ROLE_TYPE").then((response) => {
            return response;
          });*/
        },
        locale() {
          return store.getters.getLocale
        }
      },
      methods: {
        sendId() {
          this.$emit("getPartyRoleCode", this.code);
        }
      },
      watch: {
        selected: function (data) {
          this.code = data != null ? data : 0;
        }
      }
    }
</script>
