<template>
  <main class="buyNewCurrency">
    <mu-appbar style="width: 100%" color="#fff" text-color="#000">
      {{ $t("新币申购") }}
      <mu-button @click="$router.back(-1)" icon flat slot="left">
        <mu-icon value=":icon-fanhui4"></mu-icon>
      </mu-button>
      <mu-button @click="openBuyList" flat slot="right">
        {{ $t("我的申购") }}
      </mu-button>
    </mu-appbar>
    <section class="list">
      <div
        class="listItem"
        v-for="item in list"
        :key="item.id"
        @click="buy(item)"
      >
        <header>{{ item.name }}</header>
        <div class="time">
          <div>{{ item.show_status }}</div>
          <div>
            {{ $t("锁仓期限") }}：<span class="red">{{
              computedTime(item.pub_time) + $t("day")
            }}</span>
          </div>
        </div>
        <div class="num">
          <div class="numShow">
            <div>
              <span>{{ item.buynum }}</span
              >/{{ item.pub_num }}
            </div>
            <div>剩余：{{ per(item.buynum, item.pub_num) }}%</div>
          </div>
          <div class="progress">
            <div></div>
            <div :style="{width:per(item.buynum, item.pub_num)+'%'}"></div>
          </div>
        </div>
      </div>
    </section>
    <!-- 申购记录列表 -->
    <mu-dialog
      width="360"
      :open.sync="open"
      fullscreen
      transition="slide-bottom"
    >
      <mu-appbar color="primary" :title="$t('我的申购')">
        <mu-button slot="right" icon @click="open = false">
          <mu-icon value=":icon-guanbi"></mu-icon>
        </mu-button>
      </mu-appbar>
      <main class="myBuyList">
        <section class="buyListItem" v-for="item in buyList" :key="item.id">
          <div class="name">
            <span>{{ $t("新币名称") }}：</span>{{ item.product.name }}<span>{{item.product.show_status}}</span>
          </div>
          <div>{{ $t("锁仓本金") }}：{{item.caution_money}}</div>
          <div class="num">
            <span>{{ $t("申购价格") }}：{{item.buy_price}}</span>
          </div>
          <div class="num">
            <span>{{ $t("申购量") }}：{{item.buy_num}}</span>
          </div>
          <div>{{ $t("上市价格") }}：{{item.product.status ==0?0:item.product.pub_price}}</div>
          <div>{{ $t("收益") }}：{{item.revenue}}</div>
          <div class="time">
            <span>{{ $t("申购时间") }}：{{item.show_add_time*1000 | formatMin}}</span>
          </div>
          <div class="time">
            <span>{{ $t("上市时间") }}：{{item.product.pub_time*1000 | formatMin}}</span>
          </div>
        </section>
      </main>
    </mu-dialog>
    <!-- 购买弹框 -->
    <mu-dialog max-width="100%" width="360px" :open.sync="openBuy">
      <div class="buyItem">
        <header>{{ currItem.name + $t("锁仓期限") }}</header>
        <mu-text-field
          type="number"
          v-model="buyNum"
          :suffix="currItem.name"
        ></mu-text-field>
        <div class="currItemPrice">
          <span>{{ $t("price") + ":" + currItem.curreny_price }}USDT</span>
          <span>{{ currItem.curreny_price * buyNum }} USDT</span>
        </div>
      </div>
      <mu-button @click="buySub" full-width color="info">{{
        $t("lockrank.buynow")
      }}</mu-button>
    </mu-dialog>
  </main>
</template>

<script>
export default {
  data() {
    return {
      openBuy: false,
      open: false,
      num: 50,
      buyNum: "", // 购买数量
      currItem: {}, // 当前要购买的币种
      buyList: [],
      list: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    per(num1, num2) {
      return Math.floor((100 - (num1 / num2) * 100)*100) / 100;
    },
    computedTime(time) {
      if (time * 1000 - new Date().getTime() < 0) {
        return 0;
      } else {
        return Math.ceil((time * 1000 - new Date().getTime()) / 1000 / 3600 / 24);
      }
    },
    // 打开申购列表
    openBuyList() {
      this.$http({
        url: "/api/prebuy/mybuy",
        method: "get",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.data.type == "ok") {
          this.buyList = res.data.message.data;
          this.open = true;
        } else {
          this.$toast.error(res.data.message);
        }
      });
    },
    // 购买
    buy(item) {
      if(item.status == 1){
        return
      }
      this.currItem = item;
      this.openBuy = true;
    },
    // 确认购买
    buySub() {
      this.$http({
        url: "/api/prebuy/buy",
        method: "post",
        data: { id: this.currItem.id, number: this.buyNum },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.data.type == "ok") {
          this.$toast.success(res.data.message);
          this.buyNum = "";
          this.openBuy = false;
        } else {
          this.$toast.error(res.data.message);
        }
      });
    },
    // 获取列表
    getList() {
      this.$http({
        url: "/api/prebuy/list",
        method: "get",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.data.type == "ok") {
          this.list = res.data.message;
        } else {
          this.$toast.error(res.data.message);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.myBuyList {
  padding: 15px;
  .buyListItem {
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 15px;
    font-size: 14px;
    background: linear-gradient(90deg,#218adc,#55c2ff);
    color: #fff;
    margin-bottom: 5px;
    &>div{
      margin-bottom: 2px;
    }
    .name{
      position: relative;
      span:nth-child(1){
        font-size: 15px;
      }
      span:nth-child(2){
        position: absolute;
        right: 20px;
      }
    }
    .num{
      span:nth-child(2){
        margin-left: 50px;
      }
    }
    .time{
      display: flex;
      justify-content: space-between;
    }
  }
}
.buyItem {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  font-size: 13px;
  .currItemPrice {
    display: flex;
    justify-content: space-between;
  }
}
.buyNewCurrency {
  height: 100%;
  display: flex;
  flex-direction: column;
  .list {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px 15px;
    background: #eeeeee;
    .listItem {
      background: #fff;
      padding: 15px;
      border-radius: 4px;
      text-align: left;
      margin-bottom: 10px;
      .red {
        color: orange;
      }
      header {
        font-size: 18px;
      }
      .time {
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        & > div:nth-child(1) {
          background: #e5e5e5ee;
          border-radius: 4px;
          padding: 5px 8px;
        }
      }
      .num {
        margin-top: 8px;
        .numShow {
          margin-bottom: 5px;
          display: flex;
          justify-content: space-between;
          span {
            font-weight: bold;
          }
        }
        .progress{
          position: relative;
          height: 16px;
          border-radius: 8px;
          overflow: hidden;
          &>div{
            position: absolute;
            height: 16px;
            width: 100%;
            background: orange;
          }
          &>div:nth-child(1){
            opacity: 0.3;
          }
        }
      }
    }
  }
}
</style>