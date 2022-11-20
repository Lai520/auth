<template>
  <div class="customer-pop">
      <mu-dialog v-if="customServiceType === 1" width="100%" transition="slide-bottom" fullscreen :open.sync="openPop" class="pop-container">
          <mu-appbar color="primary" title="">
              <mu-button slot="right" icon @click="openClose">
                  <mu-icon value=":icon-guanbi"></mu-icon>
              </mu-button>
          </mu-appbar>
          <!--<div class="iframe">
              <iframe :src="url" frameborder="0" id="icf"></iframe>
          </div>-->
          <div style="text-align: center">LOADING...</div>
      </mu-dialog>
      <mu-dialog v-if="customServiceType === 2" width="221px" transition="slide-bottom" :open.sync="openPop" class="pop-container">
         <div class="s-m">
             <mu-button icon @click="openClose" class="small-pop">
                 <mu-icon value=":icon-guanbi"></mu-icon>
             </mu-button>
             <div class="logo-chat">
                 <a :href="'whatsapp://send?phone='+ whatsappPhone +'+&text=Hello'"><img :src="chat1"></a>
                 <a :href="'https://t.me/'+ telegramAccount"><img :src="chat2" class="chat2"></a>
             </div>
         </div>
      </mu-dialog>
  </div>
</template>

<script>
export default {
    name: "CustomerPop",
    props: {
        openPop: {
            type: Boolean,
            default: false,
        }
    },
    watch: {
        openPop: function (val) {
            if(val && customServiceType === 1) {
                let url = this.changeURLArg(customServiceUrl, 'visiter_name', localStorage['accountNum'] || "");
                url = this.changeURLArg(url, 'visiter_id', localStorage['user_id'] || "");
                window.open(url, '_blank');
                this.openClose();
            }
        }
    },
    data() {
        return {
            url: '',
            whatsappPhone: '',
            telegramAccount: '',
            customServiceType: '',
            chat1: require('@/assets/logo-chat/1.png'),
            chat2: require('@/assets/logo-chat/2.png'),
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            this.url = customServiceUrl;
            this.whatsappPhone = whatsappPhone;
            this.telegramAccount = telegramAccount;
            this.customServiceType = customServiceType;
        },
        openClose(){
            this.$emit('update:openPop', false)
        },
        /*
        * url 目标url
        * arg 需要替换的参数名称
        * arg_val 替换后的参数的值
        * return url 参数替换后的url
        */
         changeURLArg(url,arg,arg_val){
            var pattern=arg+'=([^&]*)';
            var replaceText=arg+'='+arg_val;
            if(url.match(pattern)){
                var tmp='/('+ arg+'=)([^&]*)/gi';
                tmp=url.replace(eval(tmp),replaceText);
                return tmp;
            }else{
                if(url.match('[\?]')){
                    return url+'&'+replaceText;
                }else{
                    return url+'?'+replaceText;
                }
            }
            return url+'\n'+arg+'\n'+arg_val;
        }
    }
}
</script>

<style lang="scss" scoped>
.customer-pop{
    .mu-dialog-body {
        height: calc(100% - 56px);
        overflow: auto;
    }
}
.logo-chat{
    display: flex;
    justify-content: space-between;

    img{
        width: 60px;
        height: 60px;
    }
    .chat2{
        width: 55px;
        height: 55px;
        margin-left: 10px;
    }
}
.iframe{
    height: calc(100vh - 57px);
    overflow: hidden;
    #icf{
        width: 100%;
        height: 100%;
    }
}
.s-m{
    position: relative;

    .small-pop{
        position: absolute;
        top: -34px;
        right: -28px
    }
}

</style>
