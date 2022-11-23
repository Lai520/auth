<template>
    <!--  <mu-load-more @refresh="refresh"  :refreshing="refreshing" :loading="loading" @load="load">-->
    <mu-container data-mu-loading-color="primary" style="height: 100%; overflow: auto" v-loading="loadingall"
        data-mu-loading-overlay-color="rgba(255, 255,255, .9)" class="demo-loading-wrap">
        <div class="wrap">
            <div>
                <!--轮播图开始-->
                <!-- <swiper style="min-height: 100px;" :options="swiperOption">
                    <swiper-slide v-for="(slide,i) in banners" style="padding: 0 20px;" :key="i">
                        <img :src="slide.pic" style="width: 100%; border-radius: 5px; height: auto;">
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper> -->
                <!--轮播图-->
                <!--公告开始-->
                <div style="height: 40px; padding: 0 15px; overflow: hidden; display: flex;
            flex-direction: row;align-items: center; margin:15px 20px; margin-top:9px;  border-radius:20px;"
                    :style="{'background-color':mode == 'day'?'#f4f4f4':'#39393a'}">
                    <div style="line-height: 40px; display: flex; flex-direction: row; align-items: center;">
                        <svg class="icon" style="font-size: 18px; " aria-hidden="true">
                            <use xlink:href="#icon-gonggao3"></use>
                        </svg>
                    </div>
                    <div @click="$router.push('/notice')" style="height: 40px; flex: 1; overflow:hidden;">
                        <div class="textBox">
                            <transition name="slide">
                                <p class="text flex" style="padding: 0 10px; line-height: 42px; " :key="text.id"><span
                                        style="flex:1; height: 40px;display: block; overflow:hidden; text-align: left; text-overflow:ellipsis;white-space:nowrap">{{
                    text.val.title
                  }}</span>
                                    <span>{{ text.val.create_time }}</span></p>

                            </transition>
                        </div>
                    </div>
                    <div @click="$router.push('/notice')"
                        style="line-height: 40px; display: flex; align-items: center;">
                        <svg class="icon" style="font-size: 24px; " aria-hidden="true">
                            <use xlink:href="#icon-gengduo"></use>
                        </svg>
                    </div>
                </div>
                <!--end公告-->
                <!--快捷方式-->
                <div class=" flex pb10">
                    <template v-for="(item1,index) in quotationsListPrice">
                        <div style="flex:1;" :key="index" v-if="index<3">
                            <span
                                style="font-size: 14px; font-weight: bold;">{{ item1.currency_name }}/{{ item1.legal_name }}</span>
                            <br />
                            <span style="font-weight: bold; font-size: 16px;" :class="item1.change>0?'green':'red'">{{
                                item1.now_price
                            }}</span>
                            <br />
                            <span :class="item1.change>0?'green':'red'">{{ item1.change }}%</span>
                            <br />
                            <span class="bold" style="font-size: 10px;color: rgb(170, 170, 170);">
                                $ {{((item1.volume * item1.now_price) / 1000000)  | numberFixed(2) }} M
                            </span>
                        </div>
                    </template>
                </div>
                <!--快捷方式结束-->
            </div>
            <div style="width:100%; height: 5px;" :style="getDayColor('background-color')"></div>
            <div class="inner-menu flex" :style="getDayColor('border-color')" style="border-width: 0px;">
                <div @click="goPage(index,item)" class="flex-column"
                    v-for="(item,index) in shorts" justify-content="center" :key="index">
                    <mu-ripple>
                        <div class="pt5">
                            <div class="icon-container">
                                <svg class="icon" style="font-size: 18px; " aria-hidden="true">
                                    <use :xlink:href="'#'+ item.icon"></use>
                                </svg>
                            </div>
                            <template v-if="item.link == 'pledge'">
                                <div v-if="!getWalletAddress" class="bold" :style="index==3?'color:#3586fd':''">{{ item.name }}</div>
                                <div v-else class="bold grayBtn" :style="index==3?'color:#3586fd':''">{{$t("quantify")}}</div>
                            </template>
                            <div v-else class="bold" :style="index==3?'color:#3586fd':''">{{ item.name }}</div>
                        </div>
                    </mu-ripple>
                </div>
            </div>
            <div style="width:100%; height: 5px;" :style="getDayColor('background-color')"></div>
            <div style="width: 100%; min-height: 500px;">
                <mu-container>
                    <mu-tabs v-if="false" :value.sync="active1" :inverse="mode=='day'"
                        :color="mode=='day'?'black':'#303030'" :indicator-color="mode=='day'?'white':'white'" left>
                        <mu-tab style="font-weight: bold;"><span
                                style="padding: 0 5px; font-size: 16px; font-weight: bold;">{{ $t('market.quotation') }}</span>
                        </mu-tab>
                    </mu-tabs>
                    <div class="bold tall ft16" style="padding-left: 20px; line-height: 50px;">
                        {{ $t('market.quotation') }}
                    </div>
                    <div>
                        <div class=" flex alcenter bold"
                            style="border-top:1px solid #fafafa; border-width: 0; font-size:13px; padding:10px 0;">

                            <div class="flex flex-column" style="flex:1; text-align: left; padding-left: 20px;">
                                <span style="color:#aaa;">{{ $t('miscro.symbol') }}</span>
                            </div>
                            <div class="flex flex-column talc" style="flex:2">
                                <span style="color:#aaa;">{{ $t('market.lastprice') }}</span>
                            </div>
                            <div class="talr" style="width: 120px; padding-right: 20px;">
                                <span style="color:#aaa;">{{ $t('home.change') }}</span>
                            </div>
                        </div>
                        <template v-for="(item,i) in showQuotationList" >
                            <div class="flex alcenter" @click="gotoKline(item.currency_id,item.currency_name)"
                                style="border-top:1px solid #fafafa; padding-top: 10px;padding:10px 20px; padding-right: 15px;"
                                :style="{'border-color':mode=='day'?'#eee':'#39393a'}" v-if="item.is_display"
                                :key="i">
                                <div class="flex flex-column" style="flex:1; text-align: left; ">

                                    <span
                                        style="font-size: 14px; font-weight: bold; display: flex; flex-direction: row; align-items: center;">
                                        <mu-avatar style="margin-right: 5px;" :size="16">
                                            <img :src="item.logo">
                                        </mu-avatar>
                                        {{ item.currency_name }}
                                    </span>
                                    <span class="fColor1 ml10" style="color:rgb(170, 170, 170);">USDT</span>
                                </div>
                                <div class="flex flex-column flex1" style="text-align: center; flex: 2">
                                    <span style="font-weight: bold; font-size: 15px;" :class="item.change>0?'green':'red'">{{item.now_price}}</span>
                                    <span style="font-size: 10px;font-weight: bold; color:rgb(170,170,170)">
                                        $ {{((item.volume * item.now_price) / 1000000)  | numberFixed(2) }} M
                                    </span>
                                </div>
                                <div
                                    style="width: 110px; text-align: right;  display: flex;flex-direction: row;align-items: end;">
                                    <!--                <div style="height: 60px; overflow: hidden">-->
                                    <span class="ft16" :class="item.change>0?'green':'red'"
                                        style="display: block; width: 100%;animation: bounce;animation-duration: 1.5s;">{{ item.change }}%</span>
                                    <!--                  <ChartBox style="" width="120px" height="70px"-->
                                    <!--                            :color="parseFloat(item.change) >= 0?'up':'down'" peorid="60min" :count="24"-->
                                    <!--                            :symbol="item.currency_name"></ChartBox>-->
                                    <!--                </div>-->
                                </div>
                            </div>
                        </template>
                    </div>
                </mu-container>
            </div>

            <mu-alert v-if="showDownloadBtn && false" @delete="showDownloadBtn=false" color="info" delete
                style="position:fixed;left:0;bottom:70px;">
                <img @click="goDownload" style="width:40px;" src="@/assets/smalllogo.png">
                <a style="color:#fff;display: block;
    border: 1px solid #fff;
    padding: 10px 20px;
    margin-left: 10px;
    border-radius: 3px;
" href="/mobile/download.html">App Download</a>
            </mu-alert>
            <div v-if="false"
                style="position:fixed; box-shadow:0px 0px 5px #000;  border-top:1px solid #eee; background:#fff; width:100%; height:50px; bottom:70px; left:0; display:flex;">
                <div style="flex:1;align-self: end;

    align-content: flex-start;
    text-align: left;
    text-indent: 20px;"><img style="width:140px;" src="@/assets/logo.png"></div>
                <div>
                    <mu-button @click="toLogin" icon>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-gerenzhongxin_xuanzhong-copy"></use>
                        </svg>
                    </mu-button>
                </div>

            </div>
        </div>
        <customerPop :openPop.sync="customerPopup" />
    </mu-container>
</template>

<script>
import {
    Swiper,
    SwiperSlide
} from 'vue-awesome-swiper'
import "swiper/css/swiper.min.css";
import ChartBox from "@/components/chartBox"
import Loading from "muse-ui-loading";
import getUrlKey from "@/lib/getUrlKey";
import {timeOffset} from "@/lib/timeOffset";
import customerPop from '@/components/customerPop'
import { mapGetters } from "vuex";
let instance;
// let loading = false;
export default {
    data() {
        return {
            showDownloadBtn: true,
            showCustomer: showCustomer,
            showDownload: false,
            loadingall: true,
            banners: [],
            notices: [],
            swiperOption: {
                loop: true,
                speed: 600,
                autoplay: true,
                spaceBetween: 10,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: false
                }
            },
            swiperOptionNotice: {
                autoplay: true,
                direction: 'vertical',
            },
            firstRequest: true,
            active1: 0,
            refreshing: false,
            loading: false,
            quotationsList: [],
            quotationsListChange: [],
            quotationsListPrice: [],
            quotationsListVol: [],
            number: 0,
            customer_url: '',
            showQuotationList: [],
            mode: window.localStorage.getItem('mode'),
            shorts: [],
            customerPopup: false
        }
    },
    name: "homeContent",
    components: {
        Swiper,
        SwiperSlide,
        ChartBox,
        Loading,
        customerPop
    },
    beforeCreate() {
        console.log('大');
    },
    computed: {
        ...mapGetters(["getWalletAddress"]),
        text() {
            return this.notices.length > 0 ? {
                id: this.number,
                val: this.notices.length > 0 ? this.notices[this.number] : {
                    'title': ''
                }
            } : {
                id: 0,
                val: {
                    title: this.$t("welcome")
                }
            };
        }
    },
    watch: {
        active1(val) {
            this.showQuotationList = (val === 0 ? this.quotationsListChange : (val === 1 ? this
                .quotationsListPrice : this.quotationsListVol))
        }
    },
    mounted() {

        instance = this;
        this.loadingall = true;
        this.firstRequest = true;

        this.getSwiper();
        this.subScribeMarket();
        this.startMove();
        this.showDownloadBtn = true;
        if (getUrlKey('inmobile', window.location.href)) {
            this.showDownloadBtn = false;
            window.localStorage.setItem('hidebtn', 1);
        }
        if (window.localStorage.getItem('hidebtn') == 1) {
            this.showDownloadBtn = false;
        }
        let shorts = [{
                name: this.$t('header.help'),
                icon: 'icon-bangzhu',
                link: 'help'
            },
            {
                name: this.$t('header.fastrecharge'),
                icon: 'icon-deposit',
                link: 'recharge'
            },
            {
                name: this.$t('header.rank'),
                icon: 'icon-jiqiren',
                link: 'pledge'
            }
        ];
        shorts.push(
            this.showCustomer ? {
                name: this.$t('home.down'),
                icon: 'icon-lanlvtubiaozhizuomoban-39',
                link: 'kefu'
            } : {
                name: this.$t('sgr.invite'),
                icon: 'icon-haoyou',
                link: 'share'
            });
        shorts.push({
            name: this.$t('home.kefu'),
            icon: 'icon-lanlvtubiaozhizuomoban-39',
            link: 'kefu'
        })

        this.shorts = shorts;

        eventBus.$on('refresh', () => {
            instance.getSwiper();

            let shorts1 = [{
                    name: this.$t('header.help'),
                    icon: 'icon-bangzhu',
                    link: 'help'
                },
                {
                    name: this.$t('header.fastrecharge'),
                    icon: 'icon-deposit',
                    link: 'recharge'
                },
                {
                    name: this.$t('header.rank'),
                    icon: 'icon-jiqiren',
                    link: 'pledge'
                }
            ];
            shorts1.push(
                this.showCustomer ? {
                    name: this.$t('home.kefu'),
                    icon: 'icon-lanlvtubiaozhizuomoban-39',
                    link: 'kefu'
                } : {
                    name: this.$t('sgr.invite'),
                    icon: 'icon-haoyou',
                    link: 'share'
                });

            instance.shorts = shorts1;
        });
        this.getCustomer();
    },
    methods: {
        goPage(index,item){
            if(index>2){
                this.gotoCustomer(index)
            }else{
                if(item.link == "pledge"){
                    if(this.getWalletAddress){
                        // 跳转AI量化
                        this.$router.push("/AIquantification")
                    }else{
                        // 跳转质押
                        this.$router.push('/'+item.link)
                    }
                }else{
                    this.$router.push('/'+item.link)
                }
            }
        },
        goDownload() {
            window.location.href = '/mobile/download.html'
        },
        // getCustomer() {
        //     let that = this;
        //     this.$http({
        //         url: '/api/custorm?terminal=mobile',
        //         method: 'get',
        //         headers: {
        //             Authorization: localStorage.getItem("token")
        //         }
        //     }).then(res => {
        //         //  alert(JSON.stringify(res))
        //         // that.customer_url = res.data.replace('{id}', localStorage.getItem('user_id', 1)).replace('{name}', localStorage.getItem('accountNum'));
        //         that.customer_url = "https://line.me/ti/p/IsvSqE3-iG"
        //
        //     })
        // },
        load() {
            return false;
        },
        gotoKline(id, name) {
            window.localStorage.setItem("currentCurrencyID", id);
            window.localStorage.setItem("currentCurrency", name.toUpperCase());
            this.$router.push('/kline?from=trade&mode=1')
        },
        getDayColor(attr) {
            // let key = attr+"-color";
            // return {
            //   key:localStorage.getItem('mode') === 'day' ? '#eee' : '#000'
            // };
            let obj = {};
            obj[attr] = localStorage.getItem('mode') === 'day' ? '#eee' : '#39393a';
            return obj;
        },
        startMove() {
            // eslint-disable-next-line
            let timer = setTimeout(() => {
                if (this.number === instance.banners.length - 1) {
                    this.number = 0;
                } else {
                    this.number += 1;
                }
                this.startMove();
            }, 5000); // 滚动不需要停顿则将2000改成动画持续时间
        },
        refresh() {
            this.refreshing = true;
            let that = this;
            setTimeout(() => {
                that.refreshing = false
            }, 2000)
        },
        getSwiper() {
            let that = this;
            this.$http.post("/api/news/list", {
                "c_id": 5,
                'lang': localStorage.getItem('locale')
            }).then(res => {
                if (res.data.type == "ok") {
                    let pics = [];

                    for (let i = res.data.message.list.length - 1; i >= 0; i--) {
                        let item = res.data.message.list[i];
                        pics.push({
                            sort: item.sorts,
                            id: item.id,
                            href: '',
                            pic: item.thumbnail,
                            title: item.title ? item.title : '',
                            create_time: item.create_time ? this.timeOffsetFn(item.create_time).substring(5, 10) : ''
                        });

                    }
                    pics = pics.sort((x, y) => {
                        return x.sort == y.sort ? x.id - y.id : x.sort - y.sort;
                    })
                    that.banners = pics;
                }
            });

            this.$http.post("/api/news/list", {
                "c_id": 4,
                'lang': localStorage.getItem('locale')
            }).then(res => {
                if (res.data.type == "ok") {
                    let pics = [];
                    for (let i = res.data.message.list.length - 1; i >= 0; i--) {
                        let item = res.data.message.list[i];
                        pics.push({
                            sort: item.sorts,
                            id: item.id,
                            href: '',
                            pic: item.thumbnail,
                            title: item.title ? item.title : '',
                            create_time: item.create_time ? this.timeOffsetFn(item.create_time).substring(5, 10) : ''
                        });

                    }
                    pics = pics.sort((x, y) => {
                        return x.sort == y.sort ? x.id - y.id : x.sort - y.sort;
                    })
                    that.notices = pics;
                }
            });
        },
        gotoCustomer(i) {
            if(i === 3) location.href = downAppUrl;
            else if(i === 4)  this.customerPopup = true;
            // if (this.showCustomer) {
            //     //  alert(this.customer_url)
            //     // window.location.href = this.customer_url;
            //     if (this.isIOS9()) {
            //         window.location.href = this.customer_url;
            //         return;
            //     }
            //     this.openApp(this.customer_url)
            // }
        },
        openApp(src) {
            const ifr = document.createElement('iframe');
            ifr.src = src;
            ifr.style.display = 'none';
            document.body.appendChild(ifr);
            window.setTimeout(() => {
                document.body.removeChild(ifr);
                window.location = src;
            }, 2500);
        },
        isIOS9() {
            //获取固件版本
            var getOsv = function () {
                var reg = /OS ((\d+_?){2,3})\s/;
                if (navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator
                    .userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
                    var osv = reg.exec(navigator.userAgent);
                    if (osv.length > 0) {
                        return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g,
                            '.');
                    }
                }
                return '';
            };
            var osv = getOsv();
            var osvArr = osv.split('.');
            //初始化显示ios9引导
            if (osvArr && osvArr.length > 0) {
                if (parseInt(osvArr[0]) >= 9) {
                    return true
                }
            }
            return false
        },
        subScribeMarket() {
            let that = instance;

            this.$http({
                url: "/api/" + "currency/quotation_new",
                method: "get",
                data: {}
            }).then(res => {

                if (res.data.type == "ok") {


                    let arr = [];
                    for (var i = 0; i < res.data.message.length; i++) {
                        for (var j = 0; j < res.data.message[i].quotation.length; j++) {
                            arr.push(res.data.message[i].quotation[j]);
                        }
                    }
                    that.quotationsList = arr;

                    that.showQuotationList = that.quotationsList;
                    that.loadingall = false;

                    instance.sockets.subscribe('daymarket', msg => {
                        if (msg.type == 'daymarket') {

                            for (let i = 0; i < that.quotationsList.length; i++) {
                                if (that.quotationsList[i].legal_id == msg.legal_id && that
                                    .quotationsList[i].currency_id == msg.currency_id) {

                                    that.quotationsList[i].now_price = msg.now_price;
                                    that.quotationsList[i].change = msg.change;
                                    that.quotationsList[i].volume = msg.volume;
                                    that.quotationsList[i].high = msg.high;
                                    that.quotationsList[i].low = msg.low;
                                }
                            }

                            if (instance.firstRequest) {
                                instance.firstRequest = false;
                                instance.loadingall = false;
                            }

                            // that.quotationsList.sort((x, y) => {
                            //   return x.change - y.change
                            // });

                            that.quotationsListChange = that.quotationsList; //.reverse();


                            let quotationsListPrice = that.quotationsList.slice(0);

                            that.quotationsListPrice = quotationsListPrice;

                            let quotationsListVol = that.quotationsList.slice(0);

                            that.quotationsListVol = quotationsListVol;
                            if (that.showQuotationList.length <= 0) {
                                that.showQuotationList = that.quotationsListChange;
                            }
                        }
                    });

                }

            }).catch(error => {});


        },
        // 时间时区转换
        timeOffsetFn(time){
            return timeOffset(time);
        },
    }
}
</script>
<style lang="scss">
    .swiper-slide {
        transition: all 0.6s;
    }

    .mu-tabs-inverse {
        background: #ffffff !important;
    }

    .mu-linear-progress-determinate {
        height: 1px !important;
        position: fixed !important;
    }


    .swiper-slide-prev,
    .swiper-slide-next {
        img {
            transform: scale(0.96) !important;
        }
    }

    .swiper-slide-active,
    .swiper-slide-duplicate-prev {
        img {
            transform: scale(1) !important;
        }
    }

    .swiper-pagination-bullet {
        width: 5px;
        height: 5px;
    }

    .swiper-pagination-bullet-active {
        background: #fff;
        width: 5px;
        height: 5px;
    }
</style>

<style lang="scss" scoped>
.grayBtn{
    background: #e5e5e5;
    border-radius: 2px;
    padding: 0px 5px;
}
    .mu-load-more {
        height: 100%;
    }

    .inner-menu {
        height: 70px;
        line-height: 70px;
        border-top: 1px solid #eee;
        box-sizing: border-box;
        align-items: center;
        display: flex;
        //font-weight: bold;

        .flex-column {
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;

            >div {
                position: relative;
                height: 100%;

                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
            }

            mu-ripple {
                position: relative;
            }

            .iconfont {
                font-size: 18px;
            }

            line-height: 25px;
            flex: 1;
            display: flex;
            flex-direction: column;

            div:last-child {
                font-size: 12px;
            }

        }

    }

    .wrap {
        height: 100%;
    }

    .textBox {
        width: 100%;
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        text-align: center;
    }

    .text {
        width: 100%;
        position: absolute;
        line-height: 40px;
        margin: 0;
        padding: 0;
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: all 0.5s linear;
    }

    .slide-enter {
        transform: translateY(20px) scale(1);
        opacity: 1;
    }

    .slide-leave-to {
        transform: translateY(-20px) scale(0.8);
        opacity: 0;
    }
</style>
