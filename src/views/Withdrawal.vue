<template>
    <div style="height: 100vh; overflow: auto">
        <mu-container>
            <mu-appbar v-if="false" style="width: 100%;" color="primary">
                <!--        <mu-button icon flat slot="left">-->

                <!--        </mu-button>-->
                {{ $t('account.withdraw') }}
                <mu-button @click="$router.back(-1)" icon flat slot="right">
                    <mu-icon value=":icon-guanbi"></mu-icon>
                </mu-button>
            </mu-appbar>

            <mu-appbar style="width: 100%;" color="#fff" text-color="#000">
                {{ $t('account.withdraw') }}
                <mu-button @click="$router.back(-1)" icon flat slot="left">
                    <mu-icon value=":icon-fanhui4"></mu-icon>
                </mu-button>
                <mu-button icon flat slot="right">
                </mu-button>
            </mu-appbar>

            <mu-list>
                <mu-list-item @click="openFullscreen=true" button :ripple="false">
                    <mu-list-item-title>{{ charge }}</mu-list-item-title>
                    <mu-list-item-action style="width: 200px;">
                        <div class="flex" style="align-items: center">
                            <span>{{ $t('account.choosecoin') }}</span>
                            <mu-icon value=":icon-xiangqing"></mu-icon>
                        </div>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>

            <div v-if="charge=='USDT'" class="flex mb5">
                <div class="flex1"></div>
                <div v-if="showERC" @click="active=0" class="tabbt" :class="active===0?'active':''">
                    ERC20
                </div>
                <div v-if="showTRC" @click="active=1" class="tabbt" :class="active===1?'active':''">
                    TRC20
                </div>
                <div v-if="showOMNI" @click="active=2" class="tabbt" :class="active===2?'active':''">
                    OMNI
                </div>
                <div class="flex1"></div>
            </div>
            <div style="padding:0 20px;">
                <mu-text-field style="width: 100%;"
                               :label="$t('dep.ti_num')" :suffix="charge" v-model="wallets.change_balance"
                               readonly=""></mu-text-field>
                <mu-text-field v-if="!goBank" style="width: 100%; margin-bottom: 20px!important;" :help-text="$t('wAddress.nospace')"
                               :label="$t('wAddress.enterAddress')" v-model="address"></mu-text-field>
                <mu-text-field style="width: 100%; margin-bottom: 20px!important;"
                               :help-text="$t('lever.rate')+':'+wallets.rate + charge"
                               :label="$t('withdrawList.tibiNum')"
                               :suffix="charge" v-model="number">
                              <span class="subtitle" slot="append" color="primary" @click="alltixian"
                                    style="margin-left: 10px; border-left: 1px solid #888; padding-left: 10px;">{{ $t('lever.all') }}
                              </span>
                </mu-text-field>
                <mu-text-field style="width: 100%;" :label="$t('fundPwd')" v-model="paypwd"></mu-text-field>
                <mu-text-field v-if="0 && !goBank && showPostVerify" style="width: 100%; margin-bottom: 20px!important;"
                               :help-text="$t('sendMailInput')"
                               :label="$t('sendMail')"
                               v-model="anquancode">
                              <span class="subtitle" slot="append" color="primary" @click="sendMessage"
                                    style="margin-left: 10px; border-left: 0px solid #888; padding-left: 10px;">
                                <mu-button :disabled="sended" flat color="primary">{{ $t('send') }}</mu-button>
                              </span>
                </mu-text-field>
                <div v-if="!goBank" class="currency_title tall" style="line-height: 30px; margin-left: 0;">{{ $t('account.havenum')
                    }}<b
                            style="color:#000">{{
                        number - wallets.rate < 0 ? 0 : number - wallets.rate
                        }}</b>{{ charge }}
                </div>
                <mu-button v-if="!goBank" full-width slot="append" @click="wb(0)" color="primary"
                           style="background: linear-gradient(to right, #218adc , #55c2ff);">{{ $t('account.withdraw')}}
                </mu-button>
                <div v-if="!info && showCustomer" style="color: rgb(33 143 221);
    text-align: left;
    width: 100%;
    line-height: 2;
    margin-top: 10px;">
                    {{$t('bank.withdrawTip')}}
                </div>
                <div v-if="info"  style="color: #02341e;
    text-align: left;
    width: 100%;
    line-height: 2;
    margin-top: 10px;">
                    {{$t('bank.binded')}}<br>
                    {{info.bank_name}} :<b style="color:#331f00">********{{info.bank_account.substring(info.bank_account.length-4,info.bank_account.length)}}</b>
                </div>
                <mu-button v-if="!info" full-width @click="$router.push('/ucenter')" color="primary" style="background: linear-gradient(to right, #218adc , #55c2ff);">
                    {{ $t('bindBankCard')}}
                </mu-button>
                <mu-button v-if="goBank && info" full-width slot="append" @click="wb(1)" color="success"
                           style="margin-top:10px; background: linear-gradient(to right, #00cf66 , #035231);">{{
                    $t('bank.withdraw') }}
                </mu-button>
                <p class="tall hide">
                    <i class="currency_title">
                        {{ $t('account.a10') }}
                    </i></p>
            </div>
        </mu-container>
        <mu-dialog title="Tips" width="600" max-width="80%" :esc-press-close="false"
                   :overlay-close="false" :open.sync="openAlert">
            {{ $t('lay.confirm') }}
            <mu-button slot="actions" flat color="primary" @click="openAlert=false">{{ $t('lay.ceil') }}</mu-button>
            <mu-button slot="actions" flat color="primary" @click="submit">{{
                $t('lay.sure')
                }}
            </mu-button>
        </mu-dialog>

        <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
            <mu-appbar color="primary" :title="$t('account.choosecoin')">
                <mu-button slot="left" icon @click="$router.back(-1)">
                    <mu-icon value=":icon-fanhui4"></mu-icon>
                </mu-button>
            </mu-appbar>
            <div style="padding: 0px 0;">
                <mu-list>
                    <mu-list-item v-if="showTRX" button @click="goBank=0;charge='TRX';openFullscreen=false" :ripple="true">
                        <mu-list-item-title>TRX</mu-list-item-title>
                        <mu-list-item-action>
                            <mu-icon v-if="charge=='TRX'" color="primary" value=":icon-chenggong1"></mu-icon>
                        </mu-list-item-action>
                    </mu-list-item>
                    <mu-divider  v-if="showTRX"></mu-divider>
                    <mu-list-item  @click="goBank=0;charge='USDT';openFullscreen=false" button :ripple="true">
                        <mu-list-item-title>USDT</mu-list-item-title>
                        <mu-list-item-action>
                            <mu-icon v-if="charge=='USDT'" color="primary" value=":icon-chenggong1"></mu-icon>
                        </mu-list-item-action>
                    </mu-list-item>
                    <mu-divider></mu-divider>
                    <mu-list-item v-if="showBTC" button @click="goBank=0;charge='BTC';active=0;openFullscreen=false" :ripple="true">
                        <mu-list-item-title>BTC</mu-list-item-title>
                        <mu-list-item-action>
                            <mu-icon v-if="charge=='BTC'" color="primary" value=":icon-chenggong1"></mu-icon>
                        </mu-list-item-action>
                    </mu-list-item>
                    <mu-divider v-if="showBTC" ></mu-divider>
                    <mu-list-item  v-if="showETH"  @click="goBank=0;charge='ETH';openFullscreen=false" button :ripple="true">
                        <mu-list-item-title>ETH</mu-list-item-title>
                        <mu-list-item-action>
                            <mu-icon v-if="charge=='ETH'" color="primary" value=":icon-chenggong1"></mu-icon>
                        </mu-list-item-action>
                    </mu-list-item>
                </mu-list>
                <div class="go-w" @click="goBank=1;openFullscreen=false">{{ $t('bank.withdraw')}}</div>
            </div>
        </mu-dialog>
    </div>
</template>

<script>
import Clipboard from "clipboard"
export default {
    name: "Withdrawal",
    data() {
        return {
            showCustomer:showCustomerBank,
            showBTC: showBTCR,
            showETH: showETHR,
            showTRX:showTRXR,
            showPostVerify: showPostVerify,
            sended: false,
            anquancode: '',
            showERC:showErc,
            showTRC:showTrc,
            showOMNI:showOmni,
            openFullscreen: true,
            charge: "USDT",
            openAlert: false,
            active: 0,
            wallets: [],
            qrccode: false,
            address: "",
            number: 0,
            pic: '',
            select: '',
            selected: '',
            loading: false,
            currency: 1,
            obj:rArr,
            info: false,
            withdrawType: 0,
            goBank: 0,
            paypwd: '',
            hasTrancitionPassword: false
        }
    },
    watch: {
        charge(val) {
            this.currency = this.obj[val];// === 'BTC' ? 1 : 3
            this.number = 0
            this.address = ''
            this.getWallets()
        }
    },
    mounted() {
        let that=this;
        this.hasPwd();

        if (localStorage.getItem('mockuser')==1) {
            this.$toast.error(this.$t('mockuser'));
            setTimeout(()=>{
                that.$router.back();
            },1000);
        }else{
        this.currency = this.obj[this.charge];// === 'BTC' ? 1 : 3
        this.getWallets();
        this.select = this.$t('account.select')
        this.selected = this.$t('account.selected')
        }


    },
    methods: {
        choosePic() {
            this.$refs.uploads.dispatchEvent(new MouseEvent("click"));
        },

        sendMessage() {
            this.sended = true;
            var that = this;
            this.$http({
                url: "/api/sms_mail_aq",
                method: "post",
                headers: {Authorization: window.localStorage.getItem('token')}
            }).then(res => {
                if (res.data.type == 'ok') {
                    that.sended = true;
                    that.$toast.success(res.data.message);
                    setTimeout(function () {
                        that.sended = false;
                    }, 60000);
                } else {
                    that.sended = false;
                }
            });
        },
        alltixian() {
            this.number = parseFloat(this.wallets.change_balance)
        },
        getWallets() {
            const loading = this.$loading();
            let that = this;
            this.$http({
                url: '/api/wallet/get_info',
                method: 'post',
                data: {
                    currency: this.currency,
                },
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then(res => {
                loading.close();
                if (res.data.type === 'ok') {
                    that.wallets = res.data.message;
                }
            })

            this.$http({
                url: '/api/user/cash_info',
                method: 'post',
                data: {
                    currency: 3,
                },
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then(res => {
                loading.close();
                if (res.data.type === 'ok') {
                    if (res.data.message.account_number) {
                        that.info = res.data.message;
                    } else {
                        that.$toast.info(that.$t('bindBankCard'));
                    }
                }
            })
        },
        wb(type){
            if(!this.hasTrancitionPassword) {
                this.$toast.error(this.$t('ppFundPwd'));
                return;
            }
            // if(!this.address) {
            //     this.$toast.error(this.$t('wAddress.enterAddress'));
            //     return;
            // }
            if(!this.paypwd) {
                this.$toast.error(this.$t('pFundPwd'));
                return;
            }

            this.withdrawType=type;
            if(type === 0) this.submit();
            else this.submitBank();
        },
        submit() {
            let that = this;
            const loading = this.$loading();
            this.$http({
                url: '/api/wallet/out',
                method: 'post',
                data: {
                    currency: this.obj[this.charge],
                    address: this.address,
                    number: this.number,
                    type: this.active,
                    rate: this.wallets.rate,
                    safecode: this.anquancode,
                    paypwd: this.paypwd,
                },
                headers: {Authorization: localStorage.getItem('token')}
            }).then(res => {
                loading.close();
                that.openAlert = false;
                if (res.data.type === 'ok') {

                    that.$toast.success(res.data.message);
                    that.$router.push('assets');
                    that.address = '';
                    that.number = '';
                    that.sended = false;
                } else {
                    that.$toast.error(res.data.message);
                }
            })
        },
        submitBank() {
            let that = this;
            this.$confirm(this.$t('bank.confirmwidthraw'), 'Tips', {
                type: 'warning'
            }).then(({result}) => {

                if (result) {

                    const loading = this.$loading();
                    this.$http({
                        url: '/api/wallet/out',
                        method: 'post',
                        data: {
                            currency: this.charge === 'BTC' ? 1 : 3,
                            address: this.address,
                            number: this.number,
                            type: this.withdrawType,
                            // type: this.active,
                            rate: this.wallets.rate,
                            safecode: this.anquancode,
                            mode: 'bank',
                            paypwd: this.paypwd,
                        },
                        headers: {Authorization: localStorage.getItem('token')}
                    }).then(res => {
                        loading.close();
                        that.openAlert = false;

                        if (res.data.type === 'ok') {
                            that.$toast.success(res.data.message);
                            that.$router.push('assets');
                            that.address = '';
                            that.number = '';
                            that.sended = false;
                        } else {
                            that.$toast.error(res.data.message);
                        }

                    })
                }
            });

        },
        copy() {
            let that = this;
            let clipboard = new Clipboard('.copy');
            clipboard.on('success', res => {
                that.$toast.success(that.$t('lay.copys'))
                res.clearSelection();
                clipboard.destroy();
            })

            clipboard.on('error', res => {
                that.$toast.warning(that.$t('lay.fcopy'))
            })
        },
        hasPwd(){
            this.$http({
                url: '/api/user/get_paypwd',
                method: 'get',
                data: {},
                headers: {Authorization: localStorage.getItem('token')}
            }).then(res => {
                if (res.data.type === 'ok') {
                    this.hasTrancitionPassword = true;
                }
            })
        },
    }
}
</script>

<style lang="scss">
    #qrcode {
        margin: 20px;

        canvas {
            display: none;
        }

        img {
            margin: 0 auto;
            width: 50%;
        }
    }

    .mu-demo-form {
        width: 100%;
        max-width: 460px;
    }
    .go-w{
        color: #2196f3;
        margin-left: 16px;
    }
</style>
