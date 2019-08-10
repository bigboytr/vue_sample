<template>
    <div class="sidebar">

        <ul class="nav">
            <li v-if="isUserAccessView('dashboard')">
                <router-link to="/">
                    <i class="fas fa-home"></i>
                    {{locale.sidebar.dashboard}}
                </router-link>
            </li>
            <li v-if="isUserAccessView('individuals')">
                <router-link to="/individuals">
                    <i class="fas fa-users"></i>
                    {{locale.sidebar.individuals}}
                </router-link>
            </li>
            <li v-if="isUserAccessView('organization')">
                <router-link to="/organization">
                    <i class="fas fa-sitemap"></i>
                    {{locale.sidebar.organizations}}
                </router-link>
            </li>
            <li v-if="isUserAccessView('products')">
                <router-link to="/products">
                    <i class="far fa-gem"></i>
                    {{locale.sidebar.products}}
                </router-link>
            </li>
            <li v-if="isUserAccessView('services')">
                <router-link to="/services">
                    <i class="fas fa-broadcast-tower"></i>
                    {{locale.sidebar.services}}
                </router-link>
            </li>
            <!--<li v-if="isUserAccessView('offers')">
                <router-link to="/offers">
                    <i class="far fa-file"></i>
                    {{locale.sidebar.offers}}
                </router-link>
            </li>-->

            <li v-if="isUserAccessView('resources')">
                <router-link to="/resources">
                    <i class="fas fa-microchip"></i>
                    {{locale.sidebar.resources}}
                </router-link>
            </li>
            <li v-if="isUserAccessView('ruleEngine')">
                <router-link to="/rule-engine">
                    <i class="fas fa-pencil-ruler"></i>
                    {{locale.sidebar.ruleEngine}}
                </router-link>
            </li>
            <!--<li v-if="isUserAccessView('settings')">
                <router-link to="/settings">
                    <i class="fas fa-cogs"></i>
                    {{locale.sidebar.settings}}
                </router-link>
            </li>
            <li v-if="isUserAccessView('requests')">
                <router-link to="/requests">
                    <i class="fas fa-cloud"></i>
                    {{locale.sidebar.requests}}
                </router-link>
            </li>-->

        </ul>
        <div class="buildNo">
            build: 010219
            <!-- Build date -->
        </div>
    </div>

</template>
<script>
    import userViewAccessController from '@/controller/userViewAccessController'
    import store from '@/store/index'

    export default {
        name: 'Sidebar',

        methods: {
            isUserAccessView(view) {
                return userViewAccessController.accessView(view);
            }
        },
        computed: {
            locale() {
                return store.getters.getLocale;
            }
        }

    }
</script>
