<template>
  <div>
    <select class="form-control" v-model="code" @change="sendId()" v-validate.disable="'excluded:0'" name="status">
        <option value="0">{{locale.common.label.selectDefaultMessage}}</option>
        <option v-for="(item, key) in list" :value="item.code">{{item.name}}</option>
    </select>
    <i v-show="errors.has('status')" class="icon icon-triangle-warning"></i>
    <span v-show="errors.has('status')" class="text-danger">{{ errors.first('status') }}</span>
  </div>
</template>

<script>
    import store from '@/store/index'
    import lookupController from '@/controller/lookupController'

    export default {
        name: "SelectStatus",
        props: ["selected"],
        inject: ['$validator'], // inject parent validator
        mounted() {
            store.dispatch("setLookupItems", "CBE_LKP_STATUS");
        },
        data() {
            return {
                code: 0
            }
        },
        computed: {
            list() {
                return store.getters.getLookupItems("CBE_LKP_STATUS");
            },
            locale() {
              return store.getters.getLocale
            }
        },
        methods: {
            sendId() {
                this.$emit("getStatusCode", this.code);
            }
        },
        watch: {
            selected: function (data) {
                this.code = data != null ? data : 0;
            }
        }
    }
</script>
