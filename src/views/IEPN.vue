<template>
    <mu-container class="iepn flex " style="flex-direction: column;">
        <!--        <mu-appbar style="width: 100%;" color="#fff" text-color="#000">-->
        <!--            {{currency}}-->
        <!--            <mu-button icon flat slot="left">-->

        <!--            </mu-button>-->
        <!--            <mu-button icon flat slot="right">-->
        <!--            </mu-button>-->
        <!--        </mu-appbar>-->
        <div class="flex1" style="overflow: scroll;background: linear-gradient(180deg,#a457ff 0,#4860ff)">
            <img style="width:100%;z-index: -1; height: 120px; " src="@/assets/iepntop.png"/>
            <div style="width:98%; background:#fff; margin:1%; margin-top:00px; padding-top: 10px; z-index:10; border-radius:10px;">
                <div class="flex" style="margin-top: -60px; padding-left: 20px;">
                    <img src="@/assets/iepnheader.png" style=" width:80px; height: 80px; ">
                    <div class="" style="height: 80px;padding-left: 10px;">
                        <p style="line-height: 25px; text-align: left; font-size:18px; color:#fff; padding:0; margin:0;">
                            {{currency}}</p>
                        <p style="line-height: 25px;text-align: left;color:#fff;padding:0; margin:0;">Project
                            quota:{{iepn.total}} {{currency}}</p>
                    </div>
                </div>
                <div class="tall ml20 mt15">
                    <div class="colorgray">{{$t('iepn.ieobuy')}}</div>
                    <div class="colorgray2" style="line-height: 30px;"><span class="colororange">1</span> {{currency}} =
                        <span
                                class="colororange">{{price}}</span> USDT
                    </div>
                </div>
                <div class="tall ml20 mt15">
                    <div class="colorgray">{{$t('iepn.nowprice')}}</div>
                    <div class="colorgray2" style="line-height: 30px;"><span class="colororange">1</span> {{currency}} =
                        <span
                                class="colororange">{{dprice}}</span> USDT
                    </div>
                </div>
                <div class="tall ml20 mt15">
                    <div class="colorgray">{{$t('iepn.limit')}}:</div>
                    <div class="colorgray2" style="line-height: 30px;">>=<span
                            class="colororange">{{iepn.min}}</span> {{currency}}
                    </div>
                </div>
                <div class="tall ml20 mt15">
                    <div class="colorgray">{{$t('iepn.starttime')}}:</div>
                    <div class="colorgray2" style="line-height: 30px;"><span
                            class="colororange">{{iepn.start}}</span> ~ <span
                            class="colororange">{{iepn.end}}</span></div>
                </div>
                <div class="tall ml20 mt15">
                    <div class="colorgray">{{$t('iepn.endcount')}}:</div>

                    <div class="flex colororange">
                        <div class="back">{{monthNum}}mon</div>
                        <div style="width: 5px;"></div>
                        <div class="back">{{dayNum}}</div>
                        <div class="font-14 date">d</div>
                        <div style="width: 5px;"></div>
                        <div class="back ml5">{{hourNum}}</div>
                        <div class="font-14 date">h</div>
                        <div style="width: 5px;"></div>
                        <div class="back ml5">{{minuteNum}}</div>
                        <div class="font-14 date">m</div>
                        <div style="width: 5px;"></div>
                        <div class="back ml5">{{secondNum}}</div>
                        <div class="font-14 date">s</div>
                    </div>
                </div>
                <div class="tall ml20 mt15">
                    <div class="colorgray">{{$t('iepn.remindnum')}}:</div>

                    <div class="colorgray2">
                        <span class="colorgray2">{{iepn.sy}}</span>&nbsp;{{currency}}
                    </div>
                </div>
                <div>
                    <v-chart :options="polar" width="320" height="240"/>
                </div>
                <div class="flex" v-if="false" style="padding: 0 10px; padding-bottom: 10px;">
                    <mu-button round color="success" flat style="width: 40%;">Sell</mu-button>
                    <div class="flex1"></div>
                    <mu-button round color="primary" style="width: 40%;">Buy</mu-button>
                </div>
                <div>
                    <div class="tall" style="padding: 0 16px;">

                        <mu-text-field full-width :label="$t('iepn.nowprice')" v-model="price"
                                       readonly="readonly"></mu-text-field>
                        <mu-text-field full-width :label="$t('iepn.ieoamount')"
                                       :help-text="$t('iepn.ieomaxamount')+' '+asset_list.change_balance"
                                       v-model="amount">
                        <span @click="amount=parseInt(asset_list.change_balance)"
                              slot="append">{{$t('lever.all')}}</span>
                        </mu-text-field>
                        <mu-text-field full-width :label="$t('iepn.rengouma')"
                                       v-model="subcode"
                        ></mu-text-field>
                        <mu-text-field full-width :label="$t('iepn.ieoscount')"
                                       :value="((amount>0&&price>0)?amount/price:0).toFloor(4)"
                                       readonly="readonly"></mu-text-field>

                        <mu-button round full-width @click="onSubmit" color="primary">{{$t('iepn.ieobuynow')}}
                        </mu-button>
                        <mu-tabs v-if="false" :value.sync="active1" inverse indicator-color="rgb(255, 201, 12)"
                                 color="#000"
                                 text-color="rgba(0, 0, 0, .54)" center>
                            <mu-tab>{{$t('iepn.ieobuy')}}</mu-tab>
                            <mu-tab>{{$t('iepn.ieorecord')}}</mu-tab>
                        </mu-tabs>
                        <div class="demo-text" v-if="active1 === 0">

                        </div>

                        <div class="demo-text" style="max-height: 400px; min-height: 150px; overflow: scroll;"
                             v-if="active1 === 1">
                            <mu-list>
                                <mu-list-item v-for="item in list" avatar button :ripple="false">
                                    <mu-list-item-action style="width: 200px;">
                                        {{item.created_at}}
                                    </mu-list-item-action>
                                    <mu-list-item-title>{{item.account_number}}</mu-list-item-title>
                                    <mu-list-item-action>
                                        {{item.amount}}
                                    </mu-list-item-action>
                                </mu-list-item>
                            </mu-list>
                        </div>
                    </div>
                    <mu-divider style="margin-top: 15px;"></mu-divider>
                    <mu-stepper v-if="false" :active-step="1">
                        <mu-step>
                            <mu-step-label>
                                {{$t('iepn.pstart')}}
                            </mu-step-label>
                        </mu-step>
                        <mu-step>
                            <mu-step-label>
                                {{$t('iepn.pdoing')}}
                            </mu-step-label>
                        </mu-step>
                        <mu-step>
                            <mu-step-label>
                                {{$t('iepn.pending')}}
                            </mu-step-label>
                        </mu-step>
                    </mu-stepper>
                    <div v-if="false" class="tall" style="padding: 0 16px;">
                        <div style="font-size: 18px; line-height: 45px;"><span
                                style=" border-left: 3px solid #ffc90c; padding-left: 15px; font-size: 16px;">{{
          $t('iepn.hotcommond')
        }}</span></div>
                        <div style="line-height: 1.8; padding-bottom: 20px;">
                            <div style="line-height: 2.5; font-size: 16px;">{{ $t('iepn.ctitle') }}</div>
                            <div>{{ $t('iepn.cdsp') }}</div>
                            <div class="mt5">{{ $t('iepn.starttime') }}：{{ iepn.start }} <br>{{ $t('iepn.startprice')
                                }}：{{
                                iepn.price }}
                                <br>{{ $t('iepn.endtime') }}：{{ iepn.end }}
                            </div>
                            <div v-if="false">

                                <a href="https://iepninf.com/" target="_blank">
                                    <mu-button color="info">{{ $t('iepn.seemore') }}</mu-button>
                                </a>
                                <a href="https://iepninf.com/file/IEPN%E7%99%BD%E7%9A%AE%E4%B9%A6.pdf" class="ml10"
                                   target="_blank">
                                    <mu-button flat color="info">{{ $t('iepn.baipishu') }}</mu-button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width:98%; background: #fff; margin:1%; margin-top:10px; border-radius: 10px;">
                <div style=" text-align:left; padding-left: 10px; font-size: 18px; line-height: 45px;"><span
                        style=" border-left: 3px solid #0cebff; padding-left: 15px; font-size: 16px;">{{$t('iepn.ieorecord')}}</span>
                </div>

                <mu-list>
                    <mu-list-item v-for="item in list" avatar button :ripple="false">
                        <mu-list-item-action style="width: 200px;">
                            {{item.created_at}}
                        </mu-list-item-action>
                        <mu-list-item-title>{{item.account_number}}</mu-list-item-title>
                        <mu-list-item-action>
                            {{item.amount}}
                        </mu-list-item-action>
                    </mu-list-item>
                </mu-list>
            </div>
            <div style="width:98%; background: #fff; margin:1%; margin-top:10px; border-radius: 10px;">
                <div style=" text-align:left; padding-left: 10px; font-size: 18px; line-height: 45px;"><span
                        style=" border-left: 3px solid #610cff; padding-left: 15px; font-size: 16px;">{{$t('iepn.hotcommond')}}</span>
                </div>

                <div class="tall " style="padding: 10px; line-height: 2;">
                    {{iepn.dsp}}
                </div>

            </div>
        </div>
        <Footer active="iepn"></Footer>

    </mu-container>
</template>
<script>
    import ECharts from 'vue-echarts'
    import QRCode from 'qrcodejs2'
    import Clipboard from "clipboard"
    import Footer from "@/components/Footer";
    import moment from 'moment';

    export default {
        name: "IEPN",
        data() {
            return {
                dycimalPrice:true,
                dprice:0,
                amount: '',
                subcode:'',
                currency: plat_form_currency,
                currency_id: 0,
                columns: [
                    {title: this.$t('sgr.time'), width: '25%', name: 'created_at'},
                    {title: this.$t('sgr.user'), name: 'account_number', width: '25%', align: 'center', sortable: true},
                    {title: this.$t('iepn.ieoscount'), name: 'scount', width: '25%', align: 'center', sortable: true},
                    {title: this.$t('iepn.ieoamount'), name: 'amount', width: '25%', align: 'center', sortable: true},

                ],
                list: [],
                active1: 0,
                url: '',
                code: '',
                share_url: '',
                iepn: {},
                loading: false,
                polar: {
                    color: [
                        '#02a0d7',
                        '#ffc90c',
                    ],
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        top: '5%',
                        left: 'center'
                    },
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            tooltip: {
                                trigger: 'item',
                                formatter: '{b} ({d}%)'
                            },
                            label: {
                                show: true,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: false,
                                    fontSize: '40',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                {value: 40000000, name: this.$t('iepn.pushednum')},
                                {value: 1802560, name: this.$t('iepn.remindnum')}
                            ]
                        }
                    ]
                },
                asset_list: [],
                price: 0,
                change: 0,
                lang: localStorage.getItem('lang'),
                month: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                startTime: null,
                endTime: null,
                timeSetInterval: null,
                showTimeDown: false,
                showOver: false
            }
        },
        components: {'v-chart': ECharts, Footer},
        mounted() {
            var that = this;
            this.iepn = {
                total: 200000000,
                start: ieoStart,
                end: ieoEnd,
                price: ieoStartPrice
            };
            this.getdata();
            that.sockets.subscribe("kline", msg => {
                let obj = {}
                if (msg.symbol == that.currency + '/USDT') {
                    that.currency_id = msg.currency_id;
                    if (msg.period == '1min') {

                        that.price = that.dycimalPrice ? msg.close : that.iepn.price;
                        that.dprice = msg.close;
                    }
                    if (msg.period == '1day') {
                        that.change = msg.change;
                    }
                }
            });
            this.getRecord();
            this.$http({
                url: '/api/iepn',
                method: 'get'
            }).then(res => {
                that.iepn = res.data.message;
                that.polar.series[0].data[0].value = that.iepn.yfx;
                that.polar.series[0].data[0].name = that.polar.series[0].data[0].name;
                that.polar.series[0].data[1].value = that.iepn.sy;
                that.polar.series[0].data[1].name = that.polar.series[0].data[1].name;
                that.currency = that.iepn.currency;
                that.startTime = that.iepn.end;
                that.dycimalPrice=!that.iepn.fixed;
                that.price = that.dycimalPrice==false ? that.iepn.price : 0;
                // that.endTime = that.iepn.end;
                if (moment(new Date()).isBefore(that.startTime)) {
                    that.showTimeDown = true;
                    that.timeDown();
                }
                if (moment(new Date()).isAfter(that.startTime)) that.showOver = true;
            })


        },
        methods: {
            onSubmit() {
                let that = this;
                this.$confirm(this.$t('lay.confirm'), this.$t('auth2.reminder'), {
                    confirmButtonText: this.$t('lay.sure'),
                    cancelButtonText: this.$t('lay.ceil'),
                    type: 'warning'
                }).then(({result}) => {

                    if (result) {

                        if ((that.amount / that.price) < that.iepn.min) {
                            that.$toast.info(`The purchase quantity shall not be less than ${that.iepn.min} ${that.currency}`);
                            return false;
                        }

                        that.loading = this.$loading();
                        // that.loading = true;
                        that.$http({
                            url: "/api/wallet/ieo",
                            method: "post",
                            data: {currency: that.currency_id, amount: that.amount,subcode:that.subcode},
                            headers: {Authorization: window.localStorage.getItem('token')}
                        }).then(res => {
                            that.loading.close();
                            // that.loading = false;
                            if (res.data.type == "ok") {
                                // alert(res.data.message);
                                that.$toast.success(res.data.message);
                                that.amount = '';
                                that.getdata();
                                that.getRecord();
                            } else {
                                that.$toast.warning(res.data.message);
                                // return;
                            }
                        }).catch(error => {
                            that.loading.close();
                            console.log(error);
                        });
                    }
                });
            },
            getdata() {
                var that = this;
                this.$http({
                    url: "/api/wallet/list",
                    method: "post",
                    data: {},
                    headers: {Authorization: window.localStorage.getItem('token')}
                }).then(res => {
                    if (res.data.type == "ok") {
                        // alert(res.data.message);
                        res.data.message.change_wallet.balance.forEach(x => {
                            if (x.currency_name == "USDT") {
                                that.asset_list = x;
                            }
                        })
                    } else {
                        return;
                    }
                })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getRecord() {
                // https://www.s-coin.vip/api/
                let that = this;
                this.$http({
                    url: "/api/ieo/record",
                    method: "get",
                    headers: {Authorization: window.localStorage.getItem('token')}
                }).then(res => {
                    that.list = res.data;
                }).catch(res => {

                });
            },
            // gobuy() {
            //     window.localStorage.setItem('currentCurrency', 'IEPN');
            //     window.localStorage.setItem('currentCurrencyID', 18);
            //     this.$router.push('/exchange');
            // },
            copy(className) {
                let that = this;
                let clipboard = new Clipboard(className);
                console.log(clipboard);
                clipboard.on('success', res => {
                    that.$toast.success(that.$t('lay.copys'))
                    res.clearSelection();
                    clipboard.destroy();
                })

                clipboard.on('error', res => {
                    that.$toast.warning(that.$t('lay.fcopy'))
                })
            },
            qrcode(url) {
                this.$refs.qrcode.innerHTML = ''
                this.qrccode = new QRCode('qrcode', {
                    width: 150,
                    height: 150,
                    text: url, // 二维码地址
                })
            },
            timeDown() {
                this.timeSetInterval = setInterval(() => {
                    if (moment(this.startTime).isBefore(moment())) {
                        this.showTimeDown = false;
                        clearInterval(this.timeSetInterval);
                        location.reload();
                    }
                    let dur = moment.duration(moment(this.startTime) - moment(), 'ms');
                    // let month = dur.get('months');
                    this.month = dur.get('months');
                    this.days = dur.get('days');
                    // alert(month);
                    this.hours = dur.get('hours');
                    this.minutes = dur.get('minutes');
                    this.seconds = dur.get('seconds');
                }, 1000);
            }
        },
        computed: {
            monthNum() {
                if (this.month < 10) return '0' + this.month;
                return this.month;
            },
            dayNum() {
                if (this.days < 10) return '0' + this.days;
                return this.days;
            },
            hourNum() {
                if (this.hours < 10) return '0' + this.hours;
                return this.hours;
            },
            minuteNum() {
                if (this.minutes < 10) return '0' + this.minutes;
                return this.minutes;
            },
            secondNum() {
                if (this.seconds < 10) return '0' + this.seconds;
                return this.seconds;
            }
        }
    }
</script>
<style lang="scss">
    .iepn {
        height: 100%;
        overflow: auto;

        .echarts {
            width: 340px;
            height: 280px;
            margin: 0 auto;
        }

        .colorgray {
            color: #231d1d;
        }

        .colorgray2 {
            color: #888a85;
        }

        .colororange {
            color: orange;
        }

        .mu-card-media-title {
            background-color: transparent !important;
            text-align: center;

            .mu-card-title, .mu-card-sub-title {
                background-image: linear-gradient(0deg, rgb(93, 53, 176) 2.63158%, rgb(255, 255, 255) 74.5614%) !important;
                background-clip: text !important;
                text-fill-color: transparent !important;
                color: transparent !important;
            }
        }
    }
</style>
