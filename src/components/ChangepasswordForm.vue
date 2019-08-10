<template>
    <div class="row">
        <div class="col-md-12">
            <div class="col-md-12">
                <div class="form-group">
                    <label>{{locale.common.label.oldPassword}}</label>
                    <input type="password" class="form-control"
                           v-model="dto.oldPassword">
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <label>{{locale.common.label.password}}</label>
                    <input type="password" class="form-control"
                           v-model="dto.newPassword">
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <label>{{locale.common.label.newPasswordAgain}}</label>
                    <input type="password" class="form-control"
                           v-model="newPasswordConfirm">
                </div>
            </div>
        </div>
        <div class="col-xs-8 col-sm-6 col-md-6">
            <div class="form-group">
                <button class="btn btn-primary" @click="submitForm()">
                    <i class="icon icon-arrow-right"></i>
                    {{locale.common.button.save}}
                </button>
            </div>
        </div>
        <div class="col-xs-4 col-sm-6 col-md-6">
            <div class="form-group pull-right">
                <button class="btn btn-danger btn-block" data-dismiss="modal">
                    <i class="icon icon-cross"></i>
                    {{locale.common.button.cancel}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '@/store/index'
    import controller from '@/controller/userController'
    import notifyMe from '@/controller/notifyMe';

    export default {
        name: "ChangePasswordForm",
        data() {
            return {
                dto: {
                    id: store.getters.getAuthUser.body.cbeUserDto.id,
                    newPassword: "",
                    oldPassword: ""
                },
                newPasswordConfirm: "",
                messages:""
            }
        },
        methods: {
            submitForm() {
                if (this.newPasswordConfirm === this.dto.newPassword) {
                    controller.changePassword(this.dto);
                } else {
                    notifyMe.warningNotifierGlobal(this.messages.common.statusNotification.changePassword);
                }
            }
        },
        computed: {
            locale() {
                return this.messages = store.getters.getLocale;
            }
        }
    }
</script>
