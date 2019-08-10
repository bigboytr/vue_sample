<template>
    <div :class="statusColor()">
        <i class="icon icon-severity-cleared"></i>
    </div>
</template>

<script>
    export default {
        name: "StatusPlugin",
        props: ['param'],
        methods: {
            statusColor() {
                let css = '';
                switch (this.$props.param) {
                    case 1: css = 'text-success'; break;
                    case 2: css = 'text-warning'; break;
                    case 3: css = 'text-danger'; break;
                }
                return css;
            }
        }
    }
</script>