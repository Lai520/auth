<template>
  <div class="customer-pop">
    <mu-dialog
      v-if="customServiceType === 1"
      width="100%"
      transition="slide-bottom"
      fullscreen
      :open.sync="openPop"
      class="pop-container"
    >
      <mu-appbar color="primary" :title="$t('customer')">
        <mu-button slot="right" icon @click="openClose">
          <mu-icon value=":icon-guanbi"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div class="serviceList">
        <a v-if="telegramAccount" :href="'https://t.me/' + telegramAccount">
          <div>
            <div><img :src="chat2" class="chat2" /></div>
            <span>Telegram</span>
          </div>
        </a>
        <a href="#" v-if="getConfigInfo('custorm_url_pc')">
          <div @click.stop="skipService">
            <div><img :src="chat1" class="2" /></div>
            <span>{{ $t("home.kefu") }}</span>
          </div>
        </a>
        <a href="#" v-if="getConfigInfo('custorm_email')">
          <div>
            <div><img src="../assets/logo-chat/email.jpg" class="2" /></div>
            <span>{{ getConfigInfo("custorm_email") }}</span>
          </div>
        </a>
      </div>
    </mu-dialog>
    <mu-dialog
      v-if="customServiceType === 2"
      width="221px"
      transition="slide-bottom"
      :open.sync="openPop"
      class="pop-container"
    >
      <div class="s-m">
        <mu-button icon @click="openClose" class="small-pop">
          <mu-icon value=":icon-guanbi"></mu-icon>
        </mu-button>
        <div class="logo-chat">
          <a :href="'whatsapp://send?phone=' + whatsappPhone + '+&text=Hello'"
            ><img :src="chat1"
          /></a>
          <a :href="'https://t.me/' + telegramAccount"
            ><img :src="chat2" class="chat2"
          /></a>
        </div>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CustomerPop",
  props: {
    openPop: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    openPop: function (val) {
      if (val && customServiceType === 1) {
        // let url = this.changeURLArg(customServiceUrl, 'visiter_name', localStorage['accountNum'] || "");
        // url = this.changeURLArg(url, 'visiter_id', localStorage['user_id'] || "");
        // window.open(url, '_blank');
        // this.openClose();
      }
    },
  },
  data() {
    return {
      url: "",
      whatsappPhone: "",
      telegramAccount: "",
      customServiceType: "",
      chat1: require("@/assets/logo-chat/1.png"),
      chat2: require("@/assets/logo-chat/2.png"),
    };
  },
  mounted() {
    this.init();
  },
  computed:{
    ...mapGetters(['getConfigInfo'])
  },
  methods: {
    init() {
      this.url = this.getConfigInfo('custorm_url_pc');
      this.whatsappPhone = this.getConfigInfo('whatsapp');
      this.telegramAccount = this.getConfigInfo('custorm_url_telegram');
      this.customServiceType = customServiceType;
    },
    // 跳转在线客服
    skipService() {
      if(this.getConfigInfo('custorm_url_pc').indexOf('visiter_name')>-1){
        let url = this.changeURLArg(
          this.getConfigInfo('custorm_url_pc'),
          "visiter_name",
          localStorage["accountNum"] || ""
        );
        url = this.changeURLArg(url, "visiter_id", localStorage["user_id"] || "");
        window.open(url, "_blank");
      }else{
        window.open(this.getConfigInfo('custorm_url_pc'), "_blank");
      }
      this.openClose();
    },
    openClose() {
      this.$emit("update:openPop", false);
    },
    /*
     * url 目标url
     * arg 需要替换的参数名称
     * arg_val 替换后的参数的值
     * return url 参数替换后的url
     */
    changeURLArg(url, arg, arg_val) {
      var pattern = arg + "=([^&]*)";
      var replaceText = arg + "=" + arg_val;
      if (url.match(pattern)) {
        var tmp = "/(" + arg + "=)([^&]*)/gi";
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
      } else {
        if (url.match("[?]")) {
          return url + "&" + replaceText;
        } else {
          return url + "?" + replaceText;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.customer-pop {
  .mu-dialog-body {
    height: calc(100% - 56px);
    overflow: auto;
  }
}
.logo-chat {
  display: flex;
  justify-content: space-between;

  img {
    width: 60px;
    height: 60px;
  }
  .chat2 {
    width: 55px;
    height: 55px;
    margin-left: 10px;
  }
}
.serviceList {
  margin: 15px;
  padding: 10px 15px;
  background: url("../assets/img_7.png");
  background-size: 100% 100%;
  & > a {
    display: block;
    margin: 20px 0;

    div {
      display: flex;
      align-items: center;
    }
    img {
      width: 40px;
    border-radius: 50%;
    }
    span {
      margin-left: 10px;
      color: #fff;
    }
  }
}
.s-m {
  position: relative;

  .small-pop {
    position: absolute;
    top: -34px;
    right: -28px;
  }
}
</style>
