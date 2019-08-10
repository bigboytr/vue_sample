<template>
    <div class="row">

        <div class="col-md-12" v-if="locale" v-cloak>

            <div class="panel panel-primary">
                <div class="panel-heading">
                    <div class="panel-title">
                        {{locale.dashboard.pageTitle}}
                    </div>
                </div>
                <div class="panel-body dashboard">
                    <!--<h5>{{locale.dashboard.description}}</h5>-->

                    <div class="row">
                        <!-- Box 1 -->
                        <div class="col-md-3">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <div class="panel-title">
                                        Api Calls
                                        <span class="label label-primary pull-right">Monthly</span>
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <h3>40 886,200</h3>
                                    <span>
                                      Total income
                                      <strong class="text-primary pull-right">98% <i
                                              class="fas fa-chart-line"></i></strong>
                                  </span>
                                </div>
                            </div>
                        </div>

                        <!-- Box 2 -->
                        <div class="col-md-3">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <div class="panel-title">
                                        Active Things
                                        <span class="label label-success pull-right">Annual</span>
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <h3>275,800</h3>
                                    <span>
                                      New orders
                                      <strong class="text-success pull-right">35% <i
                                              class="fas fa-arrow-up"></i></strong>
                                  </span>
                                </div>
                            </div>
                        </div>

                        <!-- Box 3 -->
                        <div class="col-md-3">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <div class="panel-title">
                                        Visits
                                        <span class="label label-success pull-right">Today</span>
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <h3>106,120</h3>
                                    <span>
                                      New visits
                                      <strong class="text-success pull-right">25% <i
                                              class="fas fa-arrow-up"></i></strong>
                                  </span>
                                </div>
                            </div>
                        </div>

                        <!-- Box 4 -->
                        <div class="col-md-3">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <div class="panel-title">
                                        User Activity
                                        <span class="label label-danger pull-right">Low Value</span>
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <h3>80,600</h3>
                                    <span>
                                      In first month
                                      <strong class="text-danger pull-right">10% <i
                                              class="fas fa-arrow-down"></i></strong>
                                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import store from '@/store/index'

    export default {
        name: 'dynamicDashboard',

        computed: {
            locale() {
                return store.getters.getLocale
            }
        }
    }
</script>
