<template>
  <mu-container class="container-my">
    <div class="home">
      <div class="header">
        <div style="flex:1;"><h2 style="display: none">{{ $t('welcome') }}</h2>
        <img style="width: 116px;height: 33px;" src="@/assets/logo.png">
        </div>

        <div class="BtnBox">
          <mu-button @click="linkWallet" small color="primary">{{!!getWalletAddress?getWalletAddress :'链接钱包' | showWalletAddress(this)}}</mu-button>
          <mu-button @click="toLogin" icon>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gerenzhongxin_xuanzhong-copy"></use>
            </svg>
          </mu-button>

        </div>
        <div>
          <mu-button ref="buttona" icon @click="openLanguage = !openLanguage">

            <svg class="icon" aria-hidden="true">
              <use v-if="lang=='zh'" xlink:href="#icon-zhongwen1"></use>
              <use v-if="lang=='spa'" xlink:href="#icon-xibanya"></use>
              <use v-if="lang=='hk'" xlink:href="#icon-taiwan"></use>
              <use v-if="lang=='kr'" xlink:href="#icon-hanyu1"></use>
              <use v-if="lang=='jp'" xlink:href="#icon--riyu"></use>
              <use v-if="lang=='en'" xlink:href="#icon-yingyu1"></use>
              <use v-if="lang=='it'" xlink:href="#icon-yidali"></use>
              <use v-if="lang=='de'" xlink:href="#icon-deguo1"></use>
              <use v-if="lang=='fra'" xlink:href="#icon-faguo"></use>
              <use v-if="lang=='th'" xlink:href="#icon-taiguo"></use>
            </svg>
          </mu-button>
          <mu-popover class="popforlang" :open.sync="openLanguage" :trigger="trigger">
            <mu-list>
              <mu-list-item @click="changeLang(item.lang)" class="flex alcenter" avatar button v-for="item in langArr" :key="item.lang">
                <mu-list-item-action>
                  <mu-avatar size="20" style="border-radius: 0; background: none;">
                    <svg class="icon" style="font-size: 20px" aria-hidden="true">
                      <use style="font-size: 12px;" v-if="item.lang=='zh'" xlink:href="#icon-zhongwen1"></use>
                      <use v-if="item.lang=='jp'" xlink:href="#icon--riyu"></use>
                      <use v-if="item.lang=='spa'" xlink:href="#icon-xibanya"></use>
                      <use v-if="item.lang=='hk'" xlink:href="#icon-taiwan"></use>
                      <use v-if="item.lang=='kr'" xlink:href="#icon-hanyu1"></use>
                      <use v-if="item.lang=='en'" xlink:href="#icon-yingyu1"></use>
                      <use v-if="item.lang=='it'" xlink:href="#icon-yidali"></use>
                      <use v-if="item.lang=='de'" xlink:href="#icon-deguo1"></use>
                      <use v-if="item.lang=='fra'" xlink:href="#icon-faguo"></use>
                      <use v-if="item.lang=='th'" xlink:href="#icon-taiguo"></use>
                    </svg>
                  </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-title :class="{'active':lang==item.lang}">{{ item.text }}</mu-list-item-title>
              </mu-list-item>
            </mu-list>
          </mu-popover>
        </div>
      </div>
      <div class="container-my">
        <router-view style=""></router-view>
      </div>
      <div class="footer">
        <Footer></Footer>
      </div>
    </div>
  </mu-container>
</template>

<script>
import Footer from "@/components/Footer";
import getUrlKey from "@/lib/getUrlKey";
import Web3 from 'web3';
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      shift: 'home',
      openLanguage: false,
      trigger: null,
      lang: 'en',
      mode: localStorage.getItem('mode'),
      langArr: [
        // {
        //   src: require('@/assets/zh.png'),
        //   text: this.$t('lang.zh'),
        //   lang: 'zh'
        // },
        {
          src: require('@/assets/jp.png'),
          text: this.$t('lang.jp'),
          lang: 'jp'
        },
        {
          src: require('@/assets/zh.png'),
          text: this.$t('lang.hk'),
          lang: 'hk'
        },
        {
          src: require('@/assets/en.png'),
          text: this.$t('lang.en'),
          lang: 'en'
        },
        {
          src: require('@/assets/han.png'),
          text: this.$t('lang.kr'),
          lang: 'kr'
        },
        {
          src: require('@/assets/en.png'),
          text: this.$t('lang.it'),
          lang: 'it'
        },
        {
          src: require('@/assets/han.png'),
          text: this.$t('lang.de'),
          lang: 'de'
        },
        {
          src: require('@/assets/han.png'),
          text: this.$t('lang.fra'),
          lang: 'fra'
        },
        {
          src: require('@/assets/zh.png'),
          text: this.$t('lang.th'),
          lang: 'th'
        },
      ],
    }
  },
  name: 'Home',
  components: {
    Footer
  },
  mounted() {
    this.trigger = this.$refs.buttona.$el;
    this.lang = window.localStorage.getItem('lang').toLowerCase();
    // this.linkWallet()
  },
  destroyed() {
    window.ethereum.removeListener('accountsChanged', ()=>{});
  },
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
  methods: {
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
      // 监听账号变化
      window.ethereum.on("accountsChanged",(accounts)=>{
        this.linkWallet()
      })
    },
    changeLang(lang) {
      let l = window.localStorage.getItem("locale") || "en";
      if (l == lang) {
        return;
      } else {
        this.openLanguage = false;
        window.localStorage.setItem("locale", lang);
        this.$i18n.locale = lang;
        window.localStorage.setItem('lang', lang);
        this.lang = lang;
        eventBus.$emit('refresh', lang);
      }
      location.reload();
    },
    toLogin() {

      console.log('dsadsa');
      this.$router.push({name: 'Login'});
    },
    getDayColor(attr) {
      // let key = attr+"-color";
      // return {
      //   key:localStorage.getItem('mode') === 'day' ? '#eee' : '#000'
      // };
      let obj = {};
      obj[attr] = localStorage.getItem('mode') === 'day' ? '#eee' : '#39393a';
      return obj;
    }
  }
}
</script>
<style lang="scss">

.popforlang {
  .mu-icon-button {
    width: 36px !important;
    height: 36px !important;
    padding: 5px !important;
  }

  .mu-item {
    font-size: 14px;

    .mu-item-title {
      font-size: inherit;
    }

    .mu-item-action {
      min-width: 30px !important;
      height: auto !important;
    }
  }
}

.header {
  .button-wrapper {
    text-align: center;

    .mu-icon-button {
      padding: 8px !important;
    }

    .mu-button {
      margin: 8px;
      vertical-align: top;
    }
  }
  .BtnBox{
    display: flex;
    align-items: center;
  }
}

.mu-popover.transition-bottom{
  border-radius: 5px;
}

.home {
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 20px;
    box-sizing: border-box;
    padding-right: 10px;

    .icon {
      font-size: 23px;
    }

    div:first-child {
      text-align: left;
    }

    div:nth-child(2) {
      //padding: 0 5px;
    }
  }

  .container-my {
    flex: 1;
    padding: 0;
    height: calc(100% - 130px);
  }

  .mu-load-more {
    overflow: auto;
  }

}
</style>
