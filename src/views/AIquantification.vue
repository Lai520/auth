<template>
  <main class="AI" style="height: 100vh; overflow: auto">
    <mu-container>
      <mu-appbar style="width: 100%" color="#fff" text-color="#000">
        {{ $t("quantify") }}
        <mu-button @click="$router.back(-1)" icon flat slot="left">
          <mu-icon value=":icon-fanhui4"></mu-icon>
        </mu-button>
        <mu-button slot="right" @click="linkWallet" small color="primary">{{
          !!getWalletAddress
            ? getWalletAddress
            : "链接钱包" | showWalletAddress(this)
        }}</mu-button>
      </mu-appbar>
      <section class="bgImg">
        <img src="../assets/img_1.jpg" alt="" />
      </section>
      <section class="participateIn">
        <div>
          <div class="title">
            <div class="sign">($)</div>
            <span>进入挖矿</span>
          </div>
          <div class="profit">
            <div>挖矿收益</div>
            <div>查看收益</div>
          </div>
          <div class="participate">
            <mu-button @click="toGrantAuthorization" small color="primary"
              >参与</mu-button
            >
            <div class="threshold">需求金额XXX USDT</div>
          </div>
        </div>
      </section>
    </mu-container>
  </main>
</template>

<script>
import Web3 from "web3";
import { mapGetters,mapActions } from "vuex";
import { ethers } from "ethers";
export default {
  filters: {
    showWalletAddress(val, self) {
      if (val == "链接钱包") {
        return self.$t("LinkWallet");
      }
      return val.slice(0, 3) + "****" + val.slice(val.length - 3, val.length);
    },
  },
  computed: {
    ...mapGetters(["getWalletAddress"]),
  },
  methods: {
    ...mapActions(["onConnectWallert","onApprove","getBalance","onAddCoin"]),
    // 链接钱包
    async linkWallet() {
      this.onConnectWallert()
    },
    // 查看收益
    async lookProfit() {

    },
    // 获取授权转账
    async toGrantAuthorization() {
      // this.onAddCoin()
      // this.getBalance()
      this.onApprove()
    },
  },
};
</script>

<style lang="scss">
.AI {
  .mu-appbar {
    padding-right: 15px;
  }
  .mu-appbar-title {
    text-align: left;
  }
  .bgImg {
    padding: 14px;
    img {
      width: 100%;
      border-radius: 4px;
    }
  }
  .participateIn {
    padding: 14px;
    & > div {
      border-radius: 4px;
      background: #281765;
      .title {
        display: flex;
        align-items: center;
        color: #fff;
        padding: 25px;
        .sign {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: #305ed7;
          text-align: center;
          line-height: 25px;
          margin-right: 10px;
        }
      }
      .profit {
        display: flex;
        justify-content: space-between;
        padding: 0 25px 25px;
        border-bottom: 1px dashed #999;
        color: #fff;
        & > div:nth-child(1) {
          color: #e5e5ee;
        }
        & > div:last-child {
          color: #4857dc;
          cursor: pointer;
        }
      }
      .participate {
        padding: 20px;
        .threshold {
          margin-top: 10px;
          color: #fff;
        }
      }
    }
  }
}
</style>