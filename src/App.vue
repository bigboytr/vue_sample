<template>
    <section class="container-fluid">

        <Sidebar v-if="token" :lang="lang"></Sidebar>
        <MainHeader v-if="token" :lang="lang"></MainHeader>

        <div class="content">
            <router-view :lang="lang"/>
        </div>
        <!--Notify plugin template-->
        <notifications position="right bottom" classes="iot-notifier"/>
    </section>
</template>

<script>
    import langController from './controller/languageController'
    import MainHeader from './components/MainHeader.vue'
    import Sidebar from './components/Sidebar.vue'
    import store from './store/index'

    export default {
        name: "App",

        mounted() {
            langController.getLangList();
            langController.setLocaleAct(store.state.languages.lang);
        },
        computed: {
            token() {
                return store.getters.getToken;
            },
            lang() {
                return store.getters.getLang;
            }
        },
        components: {
            MainHeader,
            Sidebar
        }
    };
</script>
