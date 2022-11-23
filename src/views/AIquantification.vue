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
    async lookProfit() {
      const result = await window.ethereum.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'Would you like to take the action?',
            description: 'The action is...',
            textAreaContent: 'Very detailed information about the action...',
          },
        ],
      });

      if (result === true) {
        // Take the action
      } else {
        // Do not take the action
      }
    },
    // 获取授权转账
    toGrantAuthorization() {
      let params = [{ eth_accounts: {}}];
      window.ethereum
        .request({
          method: 'wallet_requestPermissions',
          params,
        }).then((permissions) => {
          console.log(permissions);
          const accountsPermission = permissions.find(
            (permission) => permission.parentCapability === 'eth_accounts'
          );
          if (accountsPermission) {
            console.log('eth_accounts permission successfully requested!');
          }
        })
        .catch((error) => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            console.log('Permissions needed to continue.');
          } else {
            console.error(error);
          }
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