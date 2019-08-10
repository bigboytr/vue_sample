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
        name: "SelectTimezone",
        props: ["selected"],
        mounted() {
            setTimeout(lookupController.setLookupItems("CBE_LKP_TIME_ZONE"), 200);

        },
        data() {
            return {
                code: 0
            }
        },
        computed: {
            list() {
                return store.getters.getLookupItems("timeZone");
            },
            locale() {
              return store.getters.getLocale
            }
        },
        methods: {
            sendId() {
                this.$emit("getTimezoneCode", this.code);
            }
        },
        watch: {
            selected: function (data) {
                this.code = data != null ? data : 0;
            }
        }
    }
</script>
