<template>
  <div>
    <select class="form-control" v-model="code" @change="sendId()" :id="id" v-validate.disable="'excluded:0'" name="productType">
        <option value="0">{{locale.common.label.selectDefaultMessage}}</option>
        <option v-for="(item, key) in list" :value="item.code">{{item.name}}</option>
    </select>
    <i v-show="errors.has('productType')" class="icon icon-triangle-warning"></i>
    <span v-show="errors.has('productType')" class="text-danger">{{ errors.first('productType') }}</span>
  </div>
</template>

<script>
    import store from '@/store/index'
    import lookupController from '@/controller/lookupController'
    export default {
        name: "SelectProductType",
        props: ["selected", "id"],
        inject: ['$validator'], // inject parent validator
        data() {
            return {
                code: 0,
                list: null
            }
        },
        created() {
            setTimeout( () => {
                this.setList();
            }, 0 )
        },
        computed: {
            listC() {
                return store.getters.getLookupItems("PR_PRODUCT_TYPE");
            },
            locale() {
              return store.getters.getLocale;
            }
        },
        methods: {
            sendId() {
                this.$emit("getProductTypeCode", this.code);
            },
            setList() {
                this.list = this.listC;
            }
        },
        watch: {
            selected: function (data) {
                this.code = data != null ? data : 0;
            }
        }
    }
</script>
