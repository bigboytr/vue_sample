<template>
    <select class="form-control" v-model="code" @change="sendId()">
        <option value="0">{{locale.common.label.selectDefaultMessage}}</option>
        <option v-for="(item, key) in list" :value="item.code">{{item.name}}</option>
    </select>
</template>

<script>
    import store from '@/store/index'
    import lookupController from '@/controller/lookupController'

    export default {
        name: "SelectDisabilityType",
        props: ["selected"],
        mounted() {
            //setTimeout(lookupController.setLookupItems("EP_LKP_DISABILITY_TYPE"), 200);
            store.dispatch("setLookupItems", "EP_LKP_DISABILITY_TYPE");
        },
        data() {
            return {
                code: 0
            }
        },
        computed: {
            list() {
                return store.getters.getLookupItems("EP_LKP_DISABILITY_TYPE");

                //return store.getters.getLookupItems("disabilityTypes");
            },
            locale() {
              return store.getters.getLocale;
            }
        },
        methods: {
            sendId() {
                this.$emit("getDisabilityTypeCode", this.code);
            }
        },
        watch: {
            selected: function (data) {
                this.code = data != null ? data : 0;
            }
        }
    }
</script>
