<template>
    <select class="form-control" v-model="code" @change="sendValue()">
        <option value="0">{{locale.common.label.selectDefaultMessage}}</option>
        <option v-for="(item, key) in list" v-if="item.active" :value="key">{{item.title}}</option>
    </select>
</template>

<script>
    import store from '@/store/index'

    export default {
        name: "SelectLanguage",
        props: ["selected"],
        data() {
            return {
                code: 0
            }
        },
        computed: {
            list() {
                return store.getters.getLangList;
            },
            locale() {
              return store.getters.getLocale;
            }
        },
        methods: {
            sendValue() {
                this.$emit("get-value", this.code);
            }
        },
        watch: {
            selected: function (data) {
                this.code = data != null ? data : 0;
            }
        }
    }
</script>
