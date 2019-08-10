<template>
  <select class="form-control" v-model="id" @change="sendId()">
    <option value="0">{{locale.common.label.selectDefaultMessage}}</option>
    <option v-for="(item, key) in list" :value="item.id">{{item.name}}</option>
  </select>
</template>

<script>
  import store from '@/store/index'
  import serviceController from '@/controller/serviceController'

  export default {
    name: "selectService",
    props: ["selected", "productId", "type"],
    data() {
      return {
        list: {},
        id: 0
      }
    },
    computed: {
      locale() {
        return store.getters.getLocale
      }
    },
    methods: {
      sendId() {
        this.$emit("getServiceId", this.id);
      }
    },
    watch: {
      selected: function (data) {
        this.id = data != null ? data : 0;
      },
      productId: function (id) {
        const self = this;
        serviceController.getServicesByProductId(id).then(function (response) {
          self.list = response;
        });
      }
    }
  }
</script>
