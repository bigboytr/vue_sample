<template>
  <select class="form-control" v-model="code" @change="sendId()" id="productBinding">
    <option value="0">---------</option>
    <option v-for="(item, key) in liste" :value="item.productOfferingId">{{item.name}}</option>
  </select>
</template>

<script>
    import store from '@/store/index'
    import productController from '@/controller/productController'
    export default {
      name: "SelectProductOffer",
      props:["selected","productId", "id"],
      data() {
        return {
          liste: {},
          code: 0
        }
      },
      computed: {
        list() {

          const self = this;
          productController.getProductOfferList(this.$props.productId).then(function(response) {
              self.liste = response;
          });
        }
      },
      methods: {
        sendId() {
          this.$emit("getProductOfferCode", this.code);
        }
      },
      watch: {
        selected: function (data) {
          this.code = data != null ? data : 0;
        },
        productId: {
          immediate: true,
          handler() {
            this.list;
          }
        }

      }
    }
</script>
