<template>
    <div>
        <div class="yy_row">
            <div class="yy_cell cell1" :class="oddRow" :style="indent">
                <span class="depth0" v-if="depth == 0">
                    {{item.name}}
                </span>
                <button class="btn btn-link" @click="sendId(item.id)" v-else>
                    {{item.name}}
                </button>
            </div>
            <div class="yy_cell cell2">
                <div class="button-group">
                    <button class="btn btn-xs btn-success" @click="allocateItem(item.id, item.iotCoreResourceId)">
                        <i class="icon icon-plus-small"></i>
                    </button>
                    <button class="btn btn-xs btn-danger" @click="deleteItem(item.id)">
                        <i class="icon icon-cross-small"></i>
                    </button>
                </div>
            </div>
        </div>

        <TreeResource v-for="(i, key) in item.child"
                      :depth="depth + 1"
                      :allocateMethod="$props.allocateMethod"
                      :deleteMethod="$props.deleteMethod"
                      :sendValue="$props.sendValue"
                      :item="i"></TreeResource>
    </div>

</template>

<script>
    export default {
        name: "TreeResource",
        props: ["item", "index", "depth", "deleteMethod", "allocateMethod", "sendValue"],
        computed: {
            indent() {
                if (this.$props.depth !== 0)
                    return "padding-left: " + this.$props.depth * 20 + "px";
            },
            oddRow() {
                //return (this.$props.depth%2 == 0) ? 'odd' : '';
            }
        },
        methods: {
            deleteItem(id) {
              this.$props.deleteMethod(id);
            },
            allocateItem(id, coreId) {
              this.$props.allocateMethod(id, coreId);
            },
            sendId(id) {
                this.$props.sendValue(id)
                //this.$emit("get-resourceId", id)
            }
        }
    }
</script>

<style scoped>
    .depth0 {
        display: inline-block;
        padding: 4px 10px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
    }
    .odd {
        background-color: #f9f9f9;
    }
</style>
