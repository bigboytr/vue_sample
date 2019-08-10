<template>
    <div>
        <div class="yy_row">
            <div class="yy_cell cell1" :style="indent">{{item.resourceTypeName}}</div>
            <div class="yy_cell cell2">
                <div class="button-group">
                    <button class="btn btn-xs btn-success" @click="allocateItem(item.id)">
                        <i class="icon icon-plus-small"></i>
                    </button>
                    <button class="btn btn-xs btn-danger" @click="deleteItem(item.id)">
                        <i class="icon icon-cross"></i>
                    </button>
                </div>
            </div>
        </div>

        <TreeResourceType v-for="(i, key) in item.child"
                      :depth="depth + 1"
                      :allocateMethod="$props.allocateMethod"
                      :deleteMethod="$props.deleteMethod"
                      :item="i" ></TreeResourceType>
    </div>

</template>

<script>
    export default {
        name: "TreeResourceType",
        props: ["item", "index", "depth","deleteMethod","allocateMethod"],
        computed: {
            indent() {
                if (this.$props.depth != "0")
                    return "padding-left: " + this.$props.depth * 20 + "px";
            }
        },
        methods: {
            clie(item) {
                this.$parent.showConditions(item)
            },
            deleteItem(id) {
               this.$props.deleteMethod(id);
            },
            allocateItem(id) {
                alert(id)
                this.$props.allocateMethod(id);
            }
        }
    }
</script>
