<template>
  <main class="AI" style="height: 100vh; overflow: auto">
    <mu-container>
      <mu-appbar style="width: 100%;" color="#fff" text-color="#000">
        {{ $t('quantify') }}
        <mu-button @click="$router.back(-1)" icon flat slot="left">
            <mu-icon value=":icon-fanhui4"></mu-icon>
        </mu-button>
        <mu-button slot="right" @click="linkWallet" small color="primary">{{!!getWalletAddress?getWalletAddress :'链接钱包' | showWalletAddress(this)}}</mu-button>
      </mu-appbar>
      <section class="bgImg">
        <img src="../assets/img_1.jpg" alt="">
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
            <mu-button @click="toGrantAuthorization" small color="primary">参与</mu-button>
            <div class="threshold">需求金额XXX USDT</div>
          </div>
        </div>
      </section>
    </mu-container>
  </main>
</template>

<script>
import Web3 from 'web3';
import { mapGetters } from "vuex";
import {abi} from "../lib/abi.js"
export default {
  filters:{
    showWalletAddress(val,self) {
      if(val == "链接钱包"){
        return self.$t("LinkWallet")
      }
      return val.slice(0, 3) + '****' + val.slice(val.length-3,val.length)
    }
  },
  computed:{
    ...mapGetters(["getWalletAddress"])
  },
  methods:{
    // 链接钱包
    async linkWallet() {
      if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
          await ethereum.enable();
          var accounts= await web3.eth.getAccounts();
          // 存储钱包地址
          this.$store.commit("setWalletAddress",accounts[0])
          this.$store.commit("setWeb3",window.web3)
        } catch (error) {
            // User denied account access...
        }
      }else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        var accounts= await web3.eth.getAccounts();
        // 存储钱包地址
        this.$store.commit("setWalletAddress",accounts[0])
        this.$store.commit("setWeb3",window.web3)
      }else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    },
    // 查看收益
    lookProfit() {},
    // 获取授权转账
    toGrantAuthorization() {
      debugger
      let params = [
        {
          from: this.$store.state.walletAddress,
          to: '0x365244d535eb6ce3d845b242160b688bfd97590e',
          gas: '0x76c0', // 30400
          gasPrice: '0x9184e72a000', // 10000000000000
          value: '0x9184e72a', // 2441406250
          data:
            '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
        },
      ];

      window.ethereum
        .request({
          method: 'eth_sign',
          params,
        })
        .then((result) => {
          // The result varies by RPC method.
          // For example, this method will return a transaction hash hexadecimal string on success.
        })
        .catch((error) => {
          // If the request fails, the Promise will reject with an error.
        });
    }
  }
}
</script>

<style lang="scss">
.AI{
  .mu-appbar {
    padding-right: 15px;
  }
  .mu-appbar-title{
    text-align: left;
  }
  .bgImg{
    padding: 14px;
    img{
      width: 100%;
      border-radius: 4px;
    }
  }
  .participateIn{
    padding: 14px;
    &>div{
      border-radius: 4px;
      background: #281765;
      .title{
        display: flex;
        align-items: center;
        color: #fff;
        padding: 25px;
        .sign{
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: #305ed7;
          text-align: center;
          line-height: 25px;
          margin-right: 10px;
        }
      }
      .profit{
        display: flex;
        justify-content: space-between;
        padding: 0 25px 25px;
        border-bottom: 1px dashed #999;
        color: #fff;
        &>div:nth-child(1){
          color: #e5e5ee;
        }
        &>div:last-child{
          color: #4857dc;
          cursor: pointer;
        }
      }
      .participate{
        padding: 20px;
        .threshold{
          margin-top: 10px;
          color: #fff;
        }
      }
    }
  }
  
}
</style>