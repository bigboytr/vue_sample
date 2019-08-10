<template>
  <div>
    <select class="form-control" v-model="code" @change="sendId()" v-validate.disable="'excluded:0'" name="localType">
        <option value="0">{{locale.common.label.selectDefaultMessage}}</option>
        <option v-for="(item, key) in list" :value="item.code">{{item.name}}</option>
    </select>
    <i v-show="errors.has('localType')" class="icon icon-triangle-warning"></i>
    <span v-show="errors.has('localType')" class="text-danger">{{ errors.first('localType') }}</span>
  </div>
</template>

<script>
    import store from '@/store/index'
    import lookupController from '@/controller/lookupController'

    export default {
        name: "SelectPlaceType",
        props: ["selected"],
        inject: ['$validator'], // inject parent validator
        mounted() {
            setTimeout(lookupController.setLookupItems("CBE_LKP_LOCAL_PLACE_TYPE"), 500);
        },
        data() {
            return {
                code: 0
            }
        },
        computed: {
            list() {
                return store.getters.getLookupItems("localPlaceType")
            },
            locale() {
              return store.getters.getLocale;
            }
        },
        methods: {
            sendId() {
                this.$emit("getLocalPlaceTypeCode", this.code);
            }
        },
        watch: {
            selected: function (data) {
                this.code = data != null ? data : 0;
            }
        }
    }
</script>
