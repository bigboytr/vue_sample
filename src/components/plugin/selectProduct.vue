<template>
    <div>
        <select class="form-control"
                v-model="value"
                @change="sendId()"
                :id="id"
                v-validate.disable="'excluded:0'"
                name="product">
            <option value="0">
                {{locale.common.label.selectDefaultMessage}}
            </option>
            <option v-for="(item, key) in list"
                    :value="item.id"
                    v-if="(type > 0 || type !== undefined) &&
                item.productTypeCd === type &&
                item.statusCd !== 2">
                {{item.name}}
            </option>
            <option v-for="(item, key) in list"
                    :value="item.id"
                    v-if="type === undefined">
                {{item.name}}
            </option>
        </select>
        <i v-show="errors.has('product')" class="icon icon-triangle-warning"></i>
        <span v-show="errors.has('product')" class="text-danger">{{ errors.first('product') }}</span>
    </div>
</template>

<script>
    import store from '@/store/index'
    import controller from '@/controller/productController'
    import loadingBar from '@/components/plugin/loadingBar'

    export default {
        name: "SelectProduct",
        props: ["selected", "partyId", "type", "id"],
        inject: ['$validator'], // inject parent validator
        data() {
            return {
                list: {},
                showMe: false,
                value: 0
            }
        },
        components: {
            loadingBar
        },
        computed: {
            locale() {
                return store.getters.getLocale;
            }
        },
        methods: {
            sendId() {
                this.$emit("getProductId", this.value);
            }
        },
        watch: {
            selected: function (data) {
                this.value = data != null ? data : 0;
            },
            partyId: function (id) {
                let self = this;
                controller.getByPartyId(id).then(function (data) {
                    console.log(data);
                    if (data.length === 0) {
                        self.value = 0;
                    } else {
                        self.list = data;
                        self.showMe = true;
                    }
                })
                /*controller.getAll().then(function (data) {
                  self.list = controller.getByPartyId(id, data);
                  if(self.list.length === 0){
                    self.value = 0;
                  }
                });*/
            }
        }
    }
</script>
