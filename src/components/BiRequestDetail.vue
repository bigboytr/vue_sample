<template>
    <div>
        <div class="row">
            <div class="col-md-5">
                <table class="table table-striped table-bordered table-hover biDetailTable">
                    <tbody>
                    <tr>
                        <td width="35%"><strong>{{locale.biRequests.detailModal.requestDate}}</strong></td>
                        <td width="65%">{{dateFormat(item.biStartDate)}}</td>
                    </tr>
                    <tr>
                        <td><strong>{{locale.biRequests.detailModal.type}}</strong></td>
                        <td>{{item.biSpecTypeName}}</td>
                    </tr>
                    <tr>
                        <td><strong>{{locale.common.label.name}}</strong></td>
                        <td>{{item.indGivenName}}</td>
                    </tr>
                    <!--<tr>
                        <td><strong>{{locale.common.label.midname}}</strong></td>
                        <td>{{item.indMidName}}</td>
                    </tr>-->
                    <tr>
                        <td><strong>{{locale.common.label.surname}}</strong></td>
                        <td>{{item.indFamilyName}}</td>
                    </tr>
                    <!--<tr>
                        <td><strong>{{locale.common.label.username}}</strong></td>
                        <td>{{item.uuserName}}</td>
                    </tr>-->
                    <tr>
                        <td><strong>{{locale.biRequests.detailModal.description}}</strong></td>
                        <td>{{item.biDescription}}</td>
                    </tr>
                    <tr>
                        <td><strong>{{locale.common.label.email}}</strong></td>
                        <td>{{item.uemail}}</td>
                    </tr>
                    <tr>
                        <td><strong>{{locale.biRequests.detailModal.status}}</strong></td>
                        <td>
                            <status :param="item.biStatusCd"></status>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <table class="table table-bordered table-striped">
                    <tbody>
                    <tr>
                        <td width="70%">
                            <strong>{{locale.biRequests.detailModal.locked}}</strong>
                            <locked :param="epPartyDto.cbeUserDto.isLocked" class="pull-right"></locked>
                        </td>
                        <td width="30%"><toggle :id="'chk-1'"
                                                :checkValue="epPartyDto.cbeUserDto.isLocked" @get-toggle="setLocked"></toggle></td>
                    </tr>
                    <tr>
                        <td><strong>{{locale.biRequests.detailModal.placeholder.forceEmail}}</strong></td>
                        <td><toggle :id="'chk-2'"></toggle></td>
                    </tr>
                    <tr>
                        <td><strong>{{locale.biRequests.detailModal.placeholder.forceDetails}}</strong></td>
                        <td><toggle :id="'chk-3'"></toggle></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-6">
              <!--  <div class="form-group">
                    <label>{{locale.biRequests.detailModal.placeholder.assignRoles}}</label>
                    <small class="margin-l-5">({{locale.biRequests.detailModal.placeholder.multipleSelect}})</small>
                    <br>
                    <select multiple size="5" v-model="roles" class="width-75">
                        <option value="0">Opt 0</option>
                        <option value="1">Opt 1</option>
                        <option value="2">Opt 2</option>
                        <option value="3">Opt 3</option>
                        <option value="4">Opt 4</option>
                        <option value="5">Opt 5</option>
                        <option value="6">Opt 6</option>
                        <option value="7">Opt 7</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>{{locale.biRequests.detailModal.placeholder.involvementTypes}}</label>
                    <small class="margin-l-5">({{locale.biRequests.detailModal.placeholder.multipleSelect}})</small>
                    <br>
                    <select multiple size="5" v-model="involvements" class="width-75" >
                        <option v-for="(item,key) in involvementsList" :value="item.id">{{item.roleName}}</option>
                    </select>
                </div> -->

                <div class="form-group">
                  <label>{{locale.individuals.placeholder.roleType}}</label>
                  <selectPartyRoleType @getPartyRoleCode="setPartyRoleTypeCode"
                                       :selected="partyRoleTypeVal"></selectPartyRoleType>
                </div>

            </div>
        </div>
        <div class="row">
            <div class="col-xs-4 col-sm-3 col-md-2 col-md-push-5">
                <div class="form-group">
                    <button class="btn btn-primary" @click="saveUserPartyRole">
                        <i class="icon icon-arrow-right"></i>
                        {{locale.common.button.save}}
                    </button>
                </div>
            </div>
            <div class="col-xs-4 col-sm-3 col-md-2 col-md-push-8">
                <div class="form-group pull-right">
                    <button class="btn btn-danger btn-block" data-dismiss="modal">
                        <i class="icon icon-cross"></i>
                        {{locale.common.button.cancel}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import controller from '@/controller/biController';
    import locked from '@/components/plugin/locked';
    import status from '@/components/plugin/status';
    import toggle from '@/components/plugin/toggleSwitch'
    import moment from 'moment';
    import store from '@/store/index'
    import selectPartyRoleType from '@/components/plugin/selectRoleType'

    // TODO: Involvements must save
    export default {
        name: "BiRequestDetail",
        props: ["item"],
        components: {
            locked,
            status,
            toggle,
            selectPartyRoleType
        },
        data() {
            return {
                formModel: "",
                roles: [],
                involvements: [],
                cbeInvolvementIdRoleDtos: [],
                dto: {
                    id: 0,
                    description: "",
                    statusCd: 2
                },
                activateUserDto: {
                    userId: 0,
                    isLocked: null
                },
                epPartyDto : {
                  cbeUserDto: {
                    isLocked: true,
                    id: 0
                  },
                  epPartyRoleDtos: [
                    {
                      partyRoleTypeCd: 0
                    }
                  ]
                }
            }
        },
        methods: {
            dateFormat(d) {
                return moment(d).format("DD MMMM YYYY");
            },
            setLocked(value) {
                this.epPartyDto.cbeUserDto.isLocked = value;
                this.activateMe();
                this.$parent.$parent.search();
            },
            activateMe() {
                controller.activateUser(this.dto, this.epPartyDto);
            },
            setPartyRoleTypeCode(code) {
                this.epPartyDto.epPartyRoleDtos[0].partyRoleTypeCd = code;
            },
            saveUserPartyRole() {
                controller.updateUser(this.dto, this.epPartyDto);
            }
        },
        watch: {
            item: function (data) {
                // This method is watching props data which name is item.
                // If item object is changed somewhere then its fired.
                // Result; if isLocked field changed, local dto object will toggle with opposite value.
                console.log(data);
                console.log(data.uisLocked);

                this.dto.id = data.biId;
                //  this.activateUserDto.userId = data.userId;
                //  this.activateUserDto.isLocked = data.uisLocked === 't' ? true : false;
                this.epPartyDto.cbeUserDto.id = data.userId;
                this.epPartyDto.cbeUserDto.isLocked = data.uisLocked === 't' ? true : false;

                console.log(this.epPartyDto.cbeUserDto.isLocked);
            }
        },
        computed: {
            locale() {
                return store.getters.getLocale
            },
            involvementsList() {
                return store.getters.getInvolvements
            },
            partyRoleTypeVal() {
                return this.epPartyDto.epPartyRoleDtos[0].partyRoleTypeCd;
            }
        }
    }
</script>
