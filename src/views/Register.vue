<template>
  <div class="wrap" style="padding:20px; background: #FFFFFF;">
    <div style="height: 50px;" class="flex alcenter">
      <div class="flex1 flex" style="padding-right: 15px; justify-content: flex-end;">
        <svg class="icon" @click="back" style="font-size: 24px; " color="#999" aria-hidden="true">
          <use xlink:href="#icon-guanbi"></use>
        </svg>
      </div>
    </div>
    <mu-container>
      <h1 align="left" style="line-height: 50px; margin:0; margin-bottom: 30px;">
        {{ mode == 2 ? $t('register.phone') : $t('register.email') }}</h1>
      <mu-form ref="form" :model="validateForm" v-if="stepOne" class="mu-demo-form">
        <mu-form-item v-if="false" :help-text="$t('xieyi1.first')" :label="$t('register01.country')" prop="country">
          <mu-select :no-data-text="$t('td1.nodata')" color="primary" v-model="validateForm.country">
            <mu-option color="primary" v-for="(option,index) in country" :key="index" :label="option.name_en"
                       :value="option.country_id"></mu-option>
          </mu-select>
        </mu-form-item>
        <mu-form-item :label="$t('username')" prop="username">
          <mu-text-field v-model="validateForm.username" prop="username">
          </mu-text-field>
        </mu-form-item>
        <mu-form-item :label="mode==1?$t('register.emailnum'):$t('register.phonenum')" prop="email">
          <mu-text-field v-model="validateForm.email" prop="username">
            <mu-select v-if="mode==2" style="width: 80px;" slot="prepend" color="primary"
                       v-model="validateForm.area_code">
              <mu-option color="primary" v-for="(option,index) in country" :key="index" :label="option.area_code"
                         :value="option.area_code"></mu-option>
            </mu-select>
          </mu-text-field>
        </mu-form-item>
        <mu-form-item v-if="showCode"  :label="$t('register.codenum')" prop="password">
          <mu-text-field type="number" autoComplete="new-password" v-model="validateForm.code"
                         prop="code">
            <div slot="append">
              <mu-button flat color="primary" :disabled="isSending" data-mu-loading-size="24"
                         v-loading="loadingSend" @click="sendCode">
                {{ isSending ? $t('resend', {number: seconds}) : $t('send') }}

              </mu-button>
            </div>
          </mu-text-field>
        </mu-form-item>
        <mu-form-item prop="isAgree">
          <mu-checkbox size="12" :label="$t('register.agree')" v-model="validateForm.isAgree"></mu-checkbox>
          {{ $t('register.mian') }}
        </mu-form-item>
        <mu-button color="primary"
                   :disabled="validateForm.email.length===0||!validateForm.isAgree"
                   style="width: 100%; height: 40px;" @click="submit">{{ $t('regiterStep1') }}
        </mu-button>
        <div class="flex" style="height: 50px;">
          <span @click="$router.push('/login')" class="flex1 flex alcenter">{{ $t('register.gologin') }}</span>
          <span class="flex alcenter" @click="customerPopup = true">{{$t('andKefu')}}</span>
          <span v-if="mode==1 && mobileRegister" @click="changeMode(2)" class="flex alcenter">{{$t('register.phone')}}</span>
          <span v-if="mode==2 && mobileRegister" @click="changeMode(1)" class="flex alcenter">{{$t('register.email')}}</span>
        </div>
      </mu-form>
      <mu-form ref="form" :model="validateForm" v-if="stepTwo" class="mu-demo-form">
        <mu-form-item :label="$t('register.logpwd')" prop="logpwd">
          <mu-text-field v-model="validateForm.logpwd"
                         :action-icon="!visibilitylog ? ':icon-bianzubeifenx' : ':icon-kejian'"
                         :action-click="() => (visibilitylog = !visibilitylog)"
                         :type="visibilitylog ? 'text' : 'password'"
                         prop="logpwd"></mu-text-field>
        </mu-form-item>
        <mu-form-item :label="$t('register.repwd')" prop="repwd">
          <mu-text-field v-model="validateForm.repwd"
                         :action-icon="!visibilityre ? ':icon-bianzubeifenx' : ':icon-kejian'"
                         :action-click="() => (visibilityre = !visibilityre)" :type="visibilityre ? 'text' : 'password'"
                         prop="repwd"></mu-text-field>
        </mu-form-item>
        <mu-form-item v-if="!hasCode && showInvite" :label="$t('register.invitecode')" prop="invitecode">
          <mu-text-field v-model="validateForm.invitecode" prop="invitecode"></mu-text-field>
        </mu-form-item>
        <mu-button color="primary"
                   :disabled="validateForm.email.length===0||!validateForm.isAgree"
                   style="width: 100%; height: 40px;" @click="register">{{ $t('regiterStep2') }}
        </mu-button>
        <div class="flex" style="height: 50px;">
          <span @click="$router.push('/login')" class="flex1 flex alcenter">{{ $t('register.gologin') }}</span>
          <span class="flex alcenter" @click="customerPopup = true">{{$t('andKefu')}}</span>
        </div>
      </mu-form>
    </mu-container>
    <customerPop :openPop.sync="customerPopup" />
  </div>
</template>

<script>
import country from '../lib/country.js'
import getUrlKey from '@/lib/getUrlKey';
import customerPop from '@/components/customerPop'
export default {
  components: {
    customerPop
  },
  data() {
    return {
      mode: 1,
      showCode:showVerifyCode,
      showInvite:showInvite,
      mobileRegister:showMobileRegister,
      usernameRules: [
        {validate: (val) => !!val, message: '必須填寫用戶名'},
        {validate: (val) => val.length >= 3, message: '用戶名長度大於3位'}
      ],
      passwordRules: [
        {validate: (val) => !!val, message: '必須填寫密碼'},
        {validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
      argeeRules: [{validate: (val) => !!val, message:this.$t('register.notice')}],
      validateForm: {
        area_code: '+86',
        email: '',
        code: showVerifyCode?'':defaultCode,
        isAgree: false,
        country: 'China',
        logpwd: '',
        repwd: '',
        username: '',
        invitecode: showInvite?'':defaultInvite
      },
      isMobile: false,
      loadingSend: false,
      isSending: false,
      seconds: 60,
      country: country,
      canNext: false,
      stepOne: true,
      stepTwo: false,
      visibilitylog: false,
      visibilityre: false,
      hasCode: false,
      customerPopup: false,
    }
  },
  beforeCreate() {
    // loading = this.$loading();
  },
  mounted() {
    let code = getUrlKey('code', window.location.href);
    if (code) {
      this.validateForm.invitecode = code;
      this.hasCode = true;
    }
  },
  methods: {
    back(){
      if(this.hasCode) this.$router.push('/');
      else this.$router.back(-1);
    },
    changeMode(mode) {
      this.mode = mode;
    },
    submit() {
      let that = this;
      let url = "user/check_email";


      let data = {email_code: this.validateForm.code, username: this.validateForm.username};
      if (this.mode == 2) {
        url = "user/check_mobile";
        data.mobile_code = this.validateForm.code;
        delete data.email_code;
      }

      this.$http({
        url: "/api/" + url,
        method: "post",
        data: data
      }).then(res => {

        if (res.data.type == "ok") {
          that.stepTwo = true;
          that.stepOne = false;
        } else {
          that.$toast.info(res.data.message);
        }
      });

    },
    register() {

      if (this.validateForm.invitecode.length < 0) {
        this.$toast.error(this.$t('register.invitecode'));
        return;
      }

      if (this.validateForm.logpwd.length < 0) {
        this.$toast.error(this.$t('register.logpwd'));
        return;
      }

      if (this.validateForm.logpwd !== this.validateForm.repwd) {
        this.$toast.error(this.$t('lay.twopwd'));
        return;
      }


      let that = this;
      let data = {};

      data.type = 'email';
      data.user_string = that.validateForm.email;
      data.code = that.validateForm.code;
      data.password = that.validateForm.logpwd;
      data.re_password = that.validateForm.repwd;
      data.extension_code = that.validateForm.invitecode;
      data.country_code = that.validateForm.country;
      data.username = that.validateForm.username;

      that.$http({
        url: "/api/user/register",
        data: data,
        method: "post"
      }).then(res => {
        if (res.data.type === "ok") {
          that.$toast.success(res.data.message);
          that.$router.push("/login");
        } else {
          that.$toast.error(res.data.message);
        }
      });
    },
    sendCode() {


      let that = this;

      let url = 'sms_mail';

      if (this.mode == 1) {

        // let emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        // if (!emreg.test(this.validateForm.email)) {
        //   this.$toast.error(this.$t('register.emailnum'));
        //   return;
        // }
      } else {
        url = 'sms_send';
      }


      this.loadingSend = true;

      let data = {user_string: this.validateForm.email};
      data.lang = window.localStorage.getItem("lang");
      if (this.mode == 2) {
        data.country_code = this.validateForm.area_code
      }
      this.$http({
        url: "/api/" + url,
        method: "post",
        data: data,
        headers: {not_loading: true}
      }).then(res => {

        that.loadingSend = false;
        that.isSending = true;

        if (res.data.type !== 'error') {

          that.$toast.success(res.data.message);

          that.canNext = true;
          let interval = setInterval(x => {
            that.seconds--;
            if (that.seconds === 0) {
              that.seconds = 60;
              clearInterval(interval);
              that.isSending = false;
            }
          }, 1000);
        } else {
          that.isSending = false;
          that.$toast.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style>
  .mu-form-item .mu-button {
    margin: 0 !important;
  }

  .mu-option.is-selected .mu-item {
    color: #0b0f10 !important;
  }

  .mu-form-item-help {
    color: #9c9c9c8a !important;
  }

  .mu-checkbox-icon {
    transform: scale(0.8);
    margin-top: -2px;
    margin-right: 2px !important;
  }
</style>
<style lang="scss" scoped>
  body {
    background: #000;
    text-align: left;
    width: 100%;
  }

  .wrap {
    height: 100%;
    text-align: left
  }

  .mu-demo-form {
    width: 100%;
    max-width: 460px;
  }
</style>
<style lang="scss">
</style>
