<template>
    <div class="row" v-if="showMe">
        <div class="col-md-12 text-center">
            <h1 style="font-size: 100px;">
                <i class="far fa-comment"></i>
            </h1>
            <h3 v-if="!this.infoMe">{{locale.common.label.emptyList}}</h3>
            <h3 v-else="this.infoMe">{{locale.common.label.searchResult}}</h3>
        </div>
    </div>
</template>

<script>
    import store from '@/store/index'
    export default {
        name: "emptyDataset",
        props: ["list"],
        data() {
            return {
                showMe: false,
                infoMe: false
            }
        },
        watch: {
            list: {
                immediate: true,
                handler(data) {
                    switch (typeof data) {

                        case "object": {
                            //list != null && list.length == 0
                            if (data.length === undefined)
                            {
                              this.showMe = true;
                              this.infoMe = false;
                            }
                            if (data.length !== undefined && data.length === 0) {
                              this.showMe = true;
                              this.infoMe = true;
                            }
                            if (data.length !== undefined && data.length > 0){
                              this.showMe = false;
                              this.infoMe = false;
                            }

                        } break;
                        case undefined : {
                            this.showMe = true;
                            this.infoMe = false;
                        } break;


                    }
                }
            }
        },
        computed: {
          locale() {
            return store.getters.getLocale
          }
        }
    }
</script>
