<template>
    <select class="form-control" v-model="id" @change="sendId()">
        <option value="0">{{locale.common.label.selectDefaultMessage}}</option>
        <option v-for="(item, key) in list" :value="item.code">{{item.name}}</option>
    </select>
</template>

<script>
    import store from '@/store/index'
    import lookupController from '@/controller/lookupController'

    export default {
        name: "SelectCoreResourceType",
        props: ["selected"],
        data() {
            return {
                id: 0
            }
        },
        mounted() {
            setTimeout(lookupController.setLookupItems("RSC_IOT_CORE_RESOURCE_TYPE"), 200);

        },
        methods: {
            sendId() {
                this.$emit("getCoreResourceTypeId", this.id);
            }
        },
        computed: {
            list() {
                return store.getters.getLookupItems("iotCoreTypes")
            },
            locale() {
              return store.getters.getLocale;
            }
        },
        watch: {
            selected: function (data) {
                this.id = data != null ? data : 0;
            }
        }
    }
</script>
