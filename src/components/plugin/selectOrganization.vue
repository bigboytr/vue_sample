<template>
    <div>
        <loadingBar v-show="!showMe"></loadingBar>
        <select class="form-control"
                v-model="value"
                @change="sendId()"
                :id="id"
                v-show="showMe"
                v-validate.disable="'excluded:0'"
                name="organization">
            <option value="0">
                {{locale.common.label.selectDefaultMessage}}
            </option>
            <option v-for="(item, key) in list" :value="item.partyid">
                {{item.organizationName1}}
            </option>
        </select>
        <i v-show="errors.has('organization')" class="icon icon-triangle-warning"></i>
        <span v-show="errors.has('organization')" class="text-danger">{{ errors.first('organization') }}</span>
    </div>
</template>

<script>
    import store from '@/store/index'
    import organizationController from '@/controller/organizationController'
    import loadingBar from '@/components/plugin/loadingBar'

    export default {
        name: "SelectOrganization",
        props: ["selected", "id"],
        inject: ['$validator'], // inject parent validator
        data() {
            return {
                liste: {},
                showMe: false,
                value: 0
            }
        },
        created() {
            const self = this;
            organizationController.getAll().then(function (response) {
                self.liste = response;
                self.showMe = true;
            });
        },
        components: {
            loadingBar
        },
        computed: {
            list() {
                return this.liste;
            },
            locale() {
                return store.getters.getLocale;
            }
        },
        methods: {
            sendId() {
                this.$emit("getOrganizationId", this.value);
            }
        },
        watch: {
            selected: function (data) {
                this.value = data != null ? data : 0;
            }
        }
    }
</script>
