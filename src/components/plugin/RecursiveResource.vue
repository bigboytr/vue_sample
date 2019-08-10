<template>
    <div :style="indent">

        <span v-if="depth == 0">
            {{item.name}}
        </span>
        <button class="btn btn-link" @click="sendId(item.id)" v-else>
            {{item.name}}
        </button>


        <RecursiveResource v-for="(i, key) in item.child"
                           :depth="depth + 1"
                           :sendValue="$props.sendValue"
                           :item="i"></RecursiveResource>
    </div>
</template>

<script>
    export default {
        name: "RecursiveResource",
        props: ["item", "depth", "sendValue"],
        computed: {
            indent() {
                return "padding-left: " + this.$props.depth * 20 + "px";
            }
        },
        methods: {
            clie(id) {
                this.$parent.showSmartObject(id);
            },
            sendId(id) {
                //this.$emit("get-value", id);
                this.$props.sendValue(id)
            }
        }
    }
</script>