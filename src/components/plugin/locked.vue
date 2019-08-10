<template>
    <div :class="(param == 't' || param == true) ? 'f-size-18 text-danger' : 'f-size-18 text-success'">
        <i :class="(param == 't' || param == true) ? 'icon icon-lock-locked' : 'icon icon-lock-unlocked'"></i>
    </div>
</template>

<script>
    export default {
        name: "LockedPlugin",
        props: ['param']
    }
</script>