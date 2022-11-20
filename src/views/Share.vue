<template>
  <mu-container class="share">
    <div style="" style="width:24px; height:24px;top:20px;right:20px;z-index:1;position: fixed">
      <svg class="icon" @click="$router.back(-1)" style="font-size: 24px; z-index: 999;" color="#fff">
        <use xlink:href="#icon-guanbi"></use>
      </svg>
    </div>
    <mu-card :raised="false" style="width: 100%;max-width: 100%; margin: 0 auto; text-align: left">

      <mu-card-media :title="$t('sgr.invite')" :sub-title="$t('invite.welcome')">
        <img src="@/assets/img_3.jpg">
      </mu-card-media>
    </mu-card>

    <div style="margin-top:30px; width: 100%;">
      <div style="font-size: 18px; line-height: 45px;">{{ $t('security.invite') }}</div>
      <div class="flex alcenter">
        <span class="flex1"></span><span style="font-size: 28px; color: #0a8415; margin-right: 15px;">{{ code }}</span>
        <mu-icon color="primary" @click="copy('.copy1')" class="copy1" :data-clipboard-text="code" value=":icon-fuzhi-"></mu-icon>
        <span class="flex1"></span>
      </div>
    </div>
    <div>
      <div id="qrcode" ref="qrcode"></div>
    </div>
    <div>
      <div style="font-size: 18px; line-height: 45px;">{{ $t('invite.link') }}</div>
      <div class="flex alcenter">
        <span class="flex1"></span>
        <div style="border-radius:10px; line-height: 25px; padding: 0 15px; background: #f5f5f5;"><span style="font-size: 14px; margin-right: 15px;">{{ share_url }}</span>
          <mu-icon color="primary" @click="copy('.copy2')" class="copy2" :data-clipboard-text="share_url" value=":icon-fuzhi-"></mu-icon>
        </div>
        <span class="flex1"></span>
      </div>
    </div>

  </mu-container>
</template>
<script>
import QRCode from 'qrcodejs2'
import Clipboard from "clipboard"

export default {
  name: "Share",
  data() {
    return {
      url: '',
      code: '',
      share_url: ''
    }
  },
  mounted() {
    this.url = location.href.split("#")[0];
    this.code = localStorage.getItem("extension_code");
    this.share_url = `${this.url.replace("index.html","")}#/register?code=${this.code}`;
    console.log(this.url);
    this.qrcode(this.share_url);
  },
  methods: {
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
  }
}
</script>
<style lang="scss">
.share {
  .mu-card-media-title {
    //background-color: transparent !important;
    text-align: center;
    color:#fff!important;
    .mu-card-sub-title{
      color:#fff!important;
    }
  }
}
</style>