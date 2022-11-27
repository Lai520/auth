<template>
  <div class="wrap" style="padding: 20px; background: #ffffff">
    <div style="height: 50px" class="flex alcenter">
      <mu-button ref="buttona" icon @click="openLanguage = !openLanguage">
        <svg class="icon" aria-hidden="true">
          <use v-if="lang == 'zh'" xlink:href="#icon-zhongwen1"></use>
          <use v-if="lang == 'spa'" xlink:href="#icon-xibanya"></use>
          <use v-if="lang == 'hk'" xlink:href="#icon-taiwan"></use>
          <use v-if="lang == 'kr'" xlink:href="#icon-hanyu1"></use>
          <use v-if="lang == 'jp'" xlink:href="#icon--riyu"></use>
          <use v-if="lang == 'en'" xlink:href="#icon-yingyu1"></use>
          <use v-if="lang == 'it'" xlink:href="#icon-yidali"></use>
          <use v-if="lang == 'de'" xlink:href="#icon-deguo1"></use>
          <use v-if="lang == 'fra'" xlink:href="#icon-faguo"></use>
          <use v-if="lang == 'th'" xlink:href="#icon-taiguo"></use>
        </svg>
      </mu-button>
      <mu-popover
        class="popforlang"
        :open.sync="openLanguage"
        :trigger="trigger"
      >
        <mu-list>
          <mu-list-item
            @click="changeLang(item.lang)"
            class="flex alcenter"
            avatar
            button
            v-for="(item, index) in langArr"
            :key="index"
          >
            <mu-list-item-action>
              <mu-avatar size="20" style="border-radius: 0; background: none">
                <svg class="icon" style="font-size: 20px" aria-hidden="true">
                  <use
                    style="font-size: 12px"
                    v-if="item.lang == 'zh'"
                    xlink:href="#icon-zhongwen1"
                  ></use>
                  <use v-if="item.lang == 'jp'" xlink:href="#icon--riyu"></use>
                  <use
                    v-if="item.lang == 'spa'"
                    xlink:href="#icon-xibanya"
                  ></use>
                  <use v-if="item.lang == 'hk'" xlink:href="#icon-taiwan"></use>
                  <use v-if="item.lang == 'kr'" xlink:href="#icon-hanyu1"></use>
                  <use
                    v-if="item.lang == 'en'"
                    xlink:href="#icon-yingyu1"
                  ></use>
                  <use v-if="item.lang == 'it'" xlink:href="#icon-yidali"></use>
                  <use v-if="item.lang == 'de'" xlink:href="#icon-deguo1"></use>
                  <use v-if="item.lang == 'fra'" xlink:href="#icon-faguo"></use>
                  <use v-if="item.lang == 'th'" xlink:href="#icon-taiguo"></use>
                </svg>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-title :class="{ active: lang == item.lang }">{{
              item.text
            }}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>
      <div
        class="flex1 flex"
        style="padding-right: 15px; justify-content: flex-end"
      >
        <svg
          class="icon"
          @click="$router.push('/')"
          style="font-size: 24px"
          color="#999"
          aria-hidden="true"
        >
          <use xlink:href="#icon-guanbi"></use>
        </svg>
      </div>
    </div>
    <mu-container>
      <h1 class="H1title">
        {{ $t("login.welcome")+ getConfigInfo('webname')}}
      </h1>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item :label="$t('accounts')" prop="email">
          <mu-text-field
            v-model="validateForm.email"
            prop="email"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item :label="$t('pwd')" prop="password">
          <mu-text-field
            autoComplete="new-password"
            :action-icon="!visibility ? ':icon-bianzubeifenx' : ':icon-kejian'"
            :action-click="() => (visibility = !visibility)"
            :type="visibility ? 'text' : 'password'"
            v-model="validateForm.password"
            prop="password"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item
          v-if="getConfigInfo('login_valid') == 1"
          :label="$t('account2.code')"
          prop="captcha"
        >
          <mu-text-field v-model="validateForm.captcha" prop="captcha">
            <img
              class="imgCode"
              @click="getImgCode"
              slot="append"
              :src="imgCode"
              alt=""
            />
          </mu-text-field>
        </mu-form-item>
        <mu-form-item prop="isAgree">
          <mu-checkbox
            :label="$t('login.autologin')"
            v-model="validateForm.isAgree"
          ></mu-checkbox>
        </mu-form-item>
        <mu-button
          color="primary"
          style="width: 100%; height: 40px"
          @click="submit"
          >{{ $t("logins") }}</mu-button
        >
        <div class="flex" style="height: 50px">
          <span @click="$router.push('/forget')" class="flex1 flex alcenter"
            >{{ $t("login.forget") }}？</span
          >
          <span
            @click="$router.push({ name: 'Register' })"
            class="flex alcenter"
            >{{ $t("login.dont") }}</span
          >
        </div>
      </mu-form>
    </mu-container>
  </div>
</template>
<style lang="scss" scoped>
body {
  background: #000;
  text-align: left;
}
.imgCode {
  width: 100px;
  height: 100%;
}
.H1title {
  line-height: 50px;
  margin: 0;
  margin-bottom: 30px;
  text-align: left;
}
.wrap {
  height: 100%;
  text-align: left;
}

.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      usernameRules: [
        { validate: (val) => !!val, message: "必须填写用户名" },
        { validate: (val) => val.length >= 3, message: "用户名长度大于3" },
      ],
      passwordRules: [
        { validate: (val) => !!val, message: "必须填写密码" },
        {
          validate: (val) => val.length >= 3 && val.length <= 10,
          message: "密码长度大于3小于10",
        },
      ],
      visibility: false,
      argeeRules: [{ validate: (val) => !!val, message: "必须同意用户协议" }],
      validateForm: {
        email: "",
        password: "",
        captcha: "",
        isAgree: false,
      },
      lang: "en",
      openLanguage: false,
      customer_url: "",
      langArr: [
        // {
        //   src: require('@/assets/zh.png'),
        //   text: this.$t('lang.zh'),
        //   lang: 'zh'
        // },
        {
          src: require("@/assets/jp.png"),
          text: this.$t("lang.jp"),
          lang: "jp",
        },
        {
          src: require("@/assets/zh.png"),
          text: this.$t("lang.hk"),
          lang: "hk",
        },
        {
          src: require("@/assets/en.png"),
          text: this.$t("lang.en"),
          lang: "en",
        },
        {
          src: require("@/assets/han.png"),
          text: this.$t("lang.kr"),
          lang: "kr",
        },
        {
          src: require("@/assets/en.png"),
          text: this.$t("lang.it"),
          lang: "it",
        },
        {
          src: require("@/assets/han.png"),
          text: this.$t("lang.de"),
          lang: "de",
        },
        {
          src: require("@/assets/han.png"),
          text: this.$t("lang.fra"),
          lang: "fra",
        },
        {
          src: require("@/assets/zh.png"),
          text: this.$t("lang.th"),
          lang: "th",
        },
      ],
      imgCode: "",
    };
  },
  mounted() {
    this.trigger = this.$refs.buttona.$el;
    this.lang = window.localStorage.getItem("lang").toLowerCase();

    if (window.localStorage.getItem("user_id")) {
      // this.$toast.info('您已经登录');
      this.$router.push("/ucenter");
    }
    this.getImgCode();
  },
  computed:{
    ...mapGetters(['getConfigInfo'])
  },
  methods: {
    // 获取图片验证码
    getImgCode() {
      // '/api/captcha?'+new Date().getTime()
      this.$http({
        url: "/api/captcha",
        method: "get",
      })
        .then((res) => {
          if (res.data.type === "ok") {
            this.imgCode = res.data.message.captcha;
          } else {
            this.$toast.error(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeLang(lang) {
      let l = localStorage.getItem("locale") || this.getConfigInfo('default_lan');
      if (l == lang) {
        return;
      } else {
        this.openLanguage = false;
        window.localStorage.setItem("locale", lang);
        this.$i18n.locale = lang;
        window.localStorage.setItem("lang", lang);
        this.lang = lang;
        eventBus.$emit("refresh", lang);
      }
    },
    submit() {
      this.login();
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        email: "",
        password: "",
        captcha: "",
        isAgree: false,
      };
    },
    userInfo() {
      this.$http({
        url: "/api/user/info",
        method: "get",
        data: {},
        headers: { Authorization: localStorage.getItem("token") },
      })
        .then((res) => {
          if (res.data.type === "ok") {
            localStorage.setItem("user_id", res.data.message.id);
            localStorage.setItem(
              "extension_code",
              res.data.message.extension_code
            );
            localStorage.setItem("is_seller", res.data.message.is_seller);
            localStorage.setItem("userlevel", res.data.message.level);
            localStorage.setItem("credit_score", res.data.message.credit_score);
            eventBus.$emit("seller", res.data.message.is_seller);
            localStorage.setItem("mockuser", res.data.message.is_mock);
          }
        })
        .catch((error) => {});
    },
    login() {
      let account_number = this.validateForm.email;
      let password = this.validateForm.password;
      if (account_number.length === 0) {
        this.$toast.error(this.$t("register.emailnum"));
        return;
      }
      if (password.length < 6) {
        this.$toast.error(this.$t("register.logpwd"));
        return;
      }
      if (!this.validateForm.captcha) {
        this.$toast.error(this.$t("register.codenum"));
        return;
      }
      this.$http({
        url: "/api/user/login",
        method: "post",
        data: {
          user_string: account_number,
          password: password,
          captcha: this.validateForm.captcha,
          type: 1,
        },
      })
        .then((res) => {
          res = res.data;
          if (res.type === "ok") {
            localStorage.setItem("token", res.message);
            localStorage.setItem("accountNum", account_number);
            this.$store.commit("setAccountNum");
            this.userInfo();
            this.$router.push("/");
          } else {
            this.$toast.error(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
