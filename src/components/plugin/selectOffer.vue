<template>
  <select class="form-control" v-model="code" @change="sendId()" :id="id">
    <option value="0">{{locale.common.label.selectDefaultMessage}}</option>
    <option v-for="(item, key) in list" :value="item.code">{{item.name}}</option>
  </select>
</template>

<script>
    import store from '@/store/index'
    import lookupController from '@/controller/lookupController'
    export default {
      name: "selectOffer",
      props:["selected","id"],
      mounted() {
        setTimeout(lookupController.setLookupItems("PD_OFFER_RESPONSE"), 200);

      },
      data() {
        return {
          code: 0
        }
      },
      computed: {
        list() {
          return store.getters.getLookupItems("offers");
        }
      },
      methods: {
        sendId() {
          this.$emit("getOfferCode", this.code);
        },
        locale() {
          return store.getters.getLocale;
        }
      },
      watch: {
        selected: function (data) {
          this.code = data != null ? data : 0;
        }
      }
    }
</script>
