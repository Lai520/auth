<template>
  <div class="my-settings">
    <div class="home flex flex-column">
      <div class="header" style="height: 0; padding: 0;">
      </div>
      <div class="container container-my flex1" style="overflow: auto; height: calc(100% - 70px)">

        <mu-container class="card-radius">
          <header style="padding: 10px 10px 50px;
    background: linear-gradient(to right, #218adc , #55c2ff);">
            <div class="head-btn">
              <img class="arrow">
              <img class="set">
            </div>
            <div class="head-left">
              <div><img class="img" style="width: 80px;height: 80px;" :src="'imgs/user.png'"></div>
              <div style="color:#fff;">
                <p class="name" style="font-weight: bold;" >
                  <i v-if="level>0" class="iconfont icon-VIP" style="margin-right:5px; color: #edff00;">{{level}}</i>{{ account_num? account_num : '----' }}</p>
                <p v-if="is_mock">{{$t('mock_user')}}</p>
                <p class="user-id">ID:{{ addPreZero(user_id) }}</p>
              </div>
            </div>
          </header>
          <div style="width:100%; padding:0 20px; height: auto; margin-top:-50px;">
            <div style="width:100%; height: 100%; border-radius: 10px; border:1px solid #eee; background: #fff;">
              <p style="text-align: left; width:100%; color:#888888; padding-left: 10px;">{{$t('miscro.assetCenter')}}(USDT)</p>
              <p style="text-indent: 10px; line-height: 40px; text-align: left; padding-left: 10px; width: 100%;">≈<span style="font-size: 24px; font-weight: bold;">{{total.toFixed(2)}}</span></p>
              <div class="flex pb10">
                <div class="flex1 ft12" @click="$router.push('/recharge')"> <mu-icon size="24" color="#666" left value=":icon-chongzhi"></mu-icon><br>{{ $t('account.charging') }}</div>
                <div class="flex1 ft12" @click="$router.push('/withdrawal')">  <mu-icon size="24" color="#666" left value=":icon-chongzhi"></mu-icon><br>{{ $t('account.withdraw') }}</div>
                <div class="flex1 ft12" @click="$router.push('/transfer')">  <mu-icon size="24" color="#666" left value=":icon-huazhuan2"></mu-icon><br>{{ $t('account.transfer') }}</div>
              </div>
            </div>
          </div>
          <mu-card v-if="false" :raised="false" style="width: 100%; max-width: 375px; margin: 0 auto; text-align: left;">
            <mu-card-header left :title="account_num" :sub-title="'ID: '+ addPreZero(user_id)">
              <mu-avatar color="primary" slot="avatar">
                <mu-icon color="#fff" value=":icon-ziyuan"></mu-icon>
              </mu-avatar>
              <div slot="default" style="float: right;
               height: 40px;
               display: flex;
               flex-direction: row;
               align-items: center;">
                <mu-button @click="$router.push('/trade')" icon color="primary">
                  <mu-icon size="24" value=":icon-hangqing"></mu-icon>
                </mu-button>
              </div>
            </mu-card-header>
            <mu-card-media :title="$t('miscro.assetCenter')"
                           :sub-title="$t('account.totalassets')+' '+ total.toFixed(2) +' USDT'">
              <img
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F10861918450%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614180992&t=3d80f7aaeb676d03a8ba0e2db54a8589">
            </mu-card-media>

            <mu-card-actions>

              <mu-button @click="$router.push('/recharge')" flat>
                <mu-icon left value=":icon-chongzhi"></mu-icon>
                {{ $t('account.charging') }}
              </mu-button>
              <mu-button @click="$router.push('/withdrawal')" flat>
                <mu-icon left value=":icon-tixian"></mu-icon>
                {{ $t('account.withdraw') }}
              </mu-button>
              <mu-button @click="$router.push('/transfer')" flat>
                <mu-icon left value=":icon-huazhuan2"></mu-icon>
                {{ $t('account.transfer') }}
              </mu-button>
            </mu-card-actions>
          </mu-card>

          <mu-list class="my-settings">
            <mu-list-item @click="openFullscreen=true;type='change'" button :ripple="true">
              <mu-list-item-action>
                <mu-icon color="primary" value=":icon-duihuan"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>{{ $t('usercenter.change') }}</mu-list-item-title>
            </mu-list-item>
            <mu-list-item @click="openFullscreen=true;type='lever'" button :ripple="true">
              <mu-list-item-action>
                <mu-icon color="primary" value=":icon-heyue"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>{{ $t('usercenter.lever') }}</mu-list-item-title>
            </mu-list-item>
            <mu-list-item @click="openFullscreen=true;type='micro'" button :ripple="true">
              <mu-list-item-action>
                <mu-icon color="primary" value=":icon-shijian"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>{{ $t('account.letransaction') }}</mu-list-item-title>
            </mu-list-item>
            <mu-list-item v-if="false" @click="openFullscreen=true;type='legal'" button :ripple="true">
              <mu-list-item-action>
                <mu-icon color="primary" value=":icon-fiat"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>{{ $t('usercenter.legal') }}</mu-list-item-title>
            </mu-list-item>
            <mu-list-item @click="openRecords" button :ripple="true">
              <mu-list-item-action>
                <mu-icon color="primary" value=":icon-meiyuanqianbao"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>{{ $t('miscro.recordWithdrawal') }}</mu-list-item-title>
            </mu-list-item>
            <mu-list-item v-if="false" @click="openBuyRecords" button :ripple="true">
              <mu-list-item-action>
                <mu-icon color="primary" value=":icon-meiyuanqianbao"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>购币记录</mu-list-item-title>
            </mu-list-item>
            <mu-list-item @click="logout" button :ripple="true">
              <mu-list-item-action>
                <mu-icon color="primary" value=":icon-tuichudenglu1"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>{{ $t('header.out') }}</mu-list-item-title>
            </mu-list-item>

          </mu-list>
        </mu-container>
      </div>
      <div class="footer">
        <Footer active="assets"></Footer>
      </div>
    </div>

    <mu-dialog width="100%" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
      <mu-appbar color="primary" :title="getTypeName()">
        <mu-button slot="right" icon @click="openFullscreen=false">
          <mu-icon value=":icon-guanbi"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="height: calc(100% - 56px); overflow: auto">
        <div style="padding:20px;" v-for="item in (Object.keys(list).length>0?list[type+'_wallet'].balance:[])">
          <mu-card style="width: 100%; background-image: url('./imgs/img_7.png'); background-size: cover; border-radius: 15px; max-width: 375px; margin: 0 auto;">
            <mu-card-title class="mycard" :title="item.currency_name"
                           :sub-title="'≈' + (item[type+'_balance'] * item.usdt_price).toFixed(2) + ' USDT'"></mu-card-title>
            <mu-card-actions>
              <div class="flex">
                <div class="flex1"  style="color: #fff!important;"><i class="currency_title" style="color: #fff!important;">{{ $t('lever.canuse') }}</i><br/>{{
                    item.currency_name == 'USDT' ? Number(item[type + '_balance']).toFixed(2) : item[type + '_balance']
                  }}
                </div>
                <div class="flex1"  style="color: #fff!important;"><i
                    class="currency_title" style="color: #fff!important;">{{ $t('account.freezes') }}</i><br/>{{
                    item.currency_name == 'USDT' ? Number(item['lock_' + type + '_balance']).toFixed(2) : item['lock_' + type + '_balance']
                  }}
                </div>
              </div>
            </mu-card-actions>
          </mu-card>
        </div>
      </div>
    </mu-dialog>

    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openRecord">
      <mu-appbar color="primary" :title="$t('miscro.recordWithdrawal') ">
        <mu-button slot="right" icon @click="openRecord=false">
          <mu-icon value=":icon-guanbi"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="box-sizing:border-box; height: calc(100% - 56px); overflow: auto;">
        <mu-list textline="two-line">
          <mu-list-item v-for="(item,index) in records" :ripple="false"
                        style="padding: 0; margin: 0; border-bottom: 1px solid #f5f5f5;">

            <mu-list-item-action>
              <mu-avatar color="orange500">
                <div class="ft12">{{ item.currency_name }}</div>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content class="ml10">
              <mu-list-item-title><span :class="item.value>0?'green':'red'">{{ item.value }}</span>
              </mu-list-item-title>
              <mu-list-item-sub-title>
                {{ item.info }}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <i class="currency_title">{{ item.transaction_info }}</i>
              <i class="currency_title">{{ timeOffsetFn(item.created_time) }}</i>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </div>
    </mu-dialog>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openBuyRecord">
      <mu-appbar color="primary" :title="'购买记录'">
        <mu-button slot="right" icon @click="openBuyRecord=false">
          <mu-icon value=":icon-guanbi"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="box-sizing:border-box; height: calc(100% - 56px); overflow: auto;">
        <mu-list textline="two-line">
          <mu-list-item v-for="(item,index) in buyRecords" :ripple="false"
                        style="padding: 0; margin: 0; border-bottom: 1px solid #f5f5f5;">
            <mu-list-item-content  @click="$router.push('/Detail?id='+item.id)"  class="ml10">
              <mu-list-item-title><span :class="item.status === 2?'green':'blue'">{{ item.usdt_amount }}<span class="currency_title">USDT</span></span>
              </mu-list-item-title>
              <mu-list-item-sub-title>
                <svg class="icon" v-if="item.pay_way==='alipay'" aria-hidden="true">
                  <use xlink:href="#icon-umidd17"></use>
                </svg>
                <svg class="icon"  v-if="item.pay_way==='wechat'" aria-hidden="true">
                  <use xlink:href="#icon-weixinzhifu"></use>
                </svg>
                <svg class="icon"  v-if="item.pay_way==='bank'" aria-hidden="true">
                  <use xlink:href="#icon-yinlian"></use>
                </svg> <a class="currency_title">￥{{ item.amount }}</a>
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <i class="currency_title">{{ getStatus(item.status) }}</i>
              <i class="currency_title">{{ timeOffsetFn(item.created_at) }}</i>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </div>
    </mu-dialog>
  </div>
</template>

<style lang="scss">
.mu-dialog-body {
  overflow: auto;
  height: 100%;
}
.mycard{
  .mu-card-title,.mu-card-sub-title{
    color:#fff!important;
  }
}
.my-settings {
  height: 100%;
  overflow: auto;

  .mu-item-action {
    margin-left: 10px;
    min-width: 40px !important;
  }

  .mu-card {
    box-shadow: none !important;
    border-bottom: 1px solid #eee;
  }

  .mu-card-actions {
    text-align: center;
  }

  .mu-flat-button {
    min-width: 108px !important;
  }
}

.button-wrapper {
  text-align: center;

  .mu-button {
    margin: 8px;
    vertical-align: top;
  }
}


</style>
<script>
import BackHeader from "@/components/backHeader";
import Footer from "@/components/Footer";
import {timeOffset} from "@/lib/timeOffset";

export default {
  components: {BackHeader, Footer},
  data() {
    let user_id = window.localStorage.getItem('user_id');
    return {
      type: 'change',
      user_id: user_id,
      is_mock:false,
      openFullscreen: false,
      list: [],
      total: 0,
      account_num: window.localStorage.getItem('accountNum'),
      openRecord: false,
      records: [],
      openBuyRecord: false,
      buyRecords: [],
      level:window.localStorage.getItem('userlevel')
    }
  },
  mounted() {
    if (!window.localStorage.getItem('user_id')) {
      this.$router.push('/login');
    }
    this.is_mock = window.localStorage.getItem('mockuser')==1;
    this.loadAssets();
  },
  methods: {
    getStatus(status){
      if(status===-1)
      {
        return this.$t('c2c.canceled');
      }
      if(status===0)
      {
        return '等待付款';
      }
      if(status===1)
      {
        return this.$t('c2c.payed');
      }
      if(status===2)
      {
        return this.$t('c2c.completed');
      }
    },
    addPreZero(num, len = 7) {
      let ok = num*34*7;
      return ok.toString().substring(0,2)+num;
      let t = (num + '').length,
          s = '';

      for (let i = 0; i < len - t; i++) {
        s += '0';
      }

      return "1" + s + num;
    },
    // logout() {
    //   localStorage.removeItem('user_id');
    //   localStorage.removeItem('accountNum');
    //   this.$toast.info(this.$t('logout'));
    //   this.$router.push('/');
    // },
    openRecords() {
      const loading = this.$loading();
      let that = this;
      this.$http({
        url: '/api/charge_mention/log?limit=1000',
        method: 'get',
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        loading.close()
        if (res.data.type === 'ok') {
          that.openRecord = true;
          that.records = res.data.message.data
        }
      });
    },
    openBuyRecords() {
      const loading = this.$loading();
      let that = this;
      this.$http({
        url: '/api/legal_buy/log?limit=1000',
        method: 'get',
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        loading.close()
        if (res.data.type === 'ok') {
          that.openBuyRecord = true;
          that.buyRecords = res.data.message.data
        }
      });
    },
    loadAssets() {
      let that = this;
      this.$http({
        url: '/api/wallet/list',
        method: 'post',
        headers: {Authorization: localStorage.getItem("token")}
      }).then(res => {
        that.list = res.data.message;
        that.total = that.list.change_wallet.usdt_totle + that.list.lever_wallet.usdt_totle + that.list.legal_wallet.usdt_totle + that.list.micro_wallet.usdt_totle
      })
    },
    getTypeName() {
      switch (this.type) {
        case "lever":
        case "legal":
        case "change":
          return this.$t('usercenter.' + this.type);
          break;
        case "micro":
          return this.$t('account.letransaction');
          break;
      }
    },
    logout() {
      let that = this;
      this.$confirm(this.$t('header.out') + '?', this.$t('auth2.reminder'), {
        type: 'none',
        okLabel: this.$t('lay.sure'),
        cancelLabel: this.$t('lay.ceil')
      }).then(({result}) => {
        if (result) {
          localStorage.removeItem('user_id');
          localStorage.removeItem('accountNum');
          that.$toast.info(that.$t('header.out'));
          that.$router.push('/');
        } else {
        }
      });
    },
    // 时间时区转换
    timeOffsetFn(time){
      return timeOffset(time);
    },
  }
}
</script>
