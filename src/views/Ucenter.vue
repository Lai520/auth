<template>
    <div class="my-settings">

        <mu-container class="card-radius">
            <mu-card :raised="false" style="width: 100%; max-width: 375px; margin: 0 auto; text-align: left">
                <mu-card-header left :title="account_num" :sub-title="'ID: ' + user_id">
                    <mu-avatar slot="avatar" :color="level > 0 ? '#edff00' : 'primary'">
                        <mu-icon :color="level > 0 ? '#936825' : ''" :size="level > 0 ? 18 : 16"
                            :value="level > 0 ? ':icon-VIP' : ':icon-wode'"></mu-icon>
                        <b v-if="level > 0" style="color:#936825">3</b>
                    </mu-avatar>
                    <div slot="default" style="float: right;
               height: 40px;
               display: flex;
               flex-direction: row;
               align-items: center;">
                        <mu-button @click="$router.push('/')" icon color="primary">
                            <mu-icon size="24" value=":icon-ico_home"></mu-icon>
                        </mu-button>
                    </div>
                </mu-card-header>
                <mu-card-media :title="$t('header.center')" :sub-title="$t('welcome') + getConfigInfo('webname')">
                    <img src="@/assets/img_2.jpg">
                </mu-card-media>
                <mu-card-actions v-if="false">
                    <mu-button @click="$router.push('/recharge')" flat>
                        <mu-icon left value=":icon-chongzhi"></mu-icon>
                        {{ $t('account.charging') }}
                    </mu-button>
                    <mu-button @click="$router.push('/withdrawal')" flat>
                        <mu-icon left value=":icon-tixian"></mu-icon>
                        {{ $t('account.withdraw') }}
                    </mu-button>
                    <mu-button @click="$router.push('/transfer')" flat>
                        <mu-icon left value=":icon-huazhuan2"></mu-icon>
                        {{ $t('account.transfer') }}
                    </mu-button>
                </mu-card-actions>
            </mu-card>
            <div class="creditScore" v-if="getConfigInfo('credit_score_show')">
                <label for="">{{$t("shop.creditScore")}}</label>
                : <span>{{credit_score || 0}}</span>
            </div>
            <mu-list class="my-settings">
                <mu-list-item @click="named" button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon color="primary" value=":icon-icon"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>{{ $t('shop.truename') }}</mu-list-item-title>
                    <mu-list-item-action>
                        <mu-icon color="primary" :value="getNamed()"></mu-icon>
                    </mu-list-item-action>
                </mu-list-item>
                <!-- 银行卡设定 -->
                <mu-list-item to="card" v-if="getConfigInfo('bank_auth_show') == 1" button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon color="primary" value=":icon-yinhangka"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>{{ $t("bank.bankCer") }}</mu-list-item-title>
                    <mu-list-item-action>
                    </mu-list-item-action>
                </mu-list-item>
                <!-- 高级认证 -->
                <mu-list-item @click="heightCert" v-if="getConfigInfo('high_auth_show') == 1" button :ripple="true">
                  <mu-list-item-action>
                        <mu-icon color="primary" value=":icon-renzheng"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>{{ $t("bank.title") }}</mu-list-item-title>
                    <mu-list-item-action>
                    </mu-list-item-action>
                </mu-list-item>
                <mu-list-item v-if="getConfigInfo('loan_show') == 1" @click="loan" button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon color="primary" value=":icon-yinhangka"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>{{ $t("shop.loan") }}</mu-list-item-title>
                    <mu-list-item-action>
                    </mu-list-item-action>
                </mu-list-item>
                <mu-list-item @click="$router.push('/share')" button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon color="primary" value=":icon-yaoqinghaoyou"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>{{ $t('sgr.invite') }}</mu-list-item-title>
                </mu-list-item>
                <mu-list-item v-if="showMySon" @click="openChild" button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon color="secondary" value=":icon-gengduo1"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>{{ $t('invite.mypromotion') }}</mu-list-item-title>
                </mu-list-item>
                <mu-list-item v-if="false && is_seller" @click="goShop()" button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon color="primary" value=":icon-zichan"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>{{ $t('shop.myshop') }}</mu-list-item-title>
                </mu-list-item>
                <mu-list-item v-if="false && !is_seller" @click="goApply()" button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon color="primary" value=":icon-zhanghu"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>{{ $t('shop.apply') }}</mu-list-item-title>
                </mu-list-item>
                <mu-list-item @click="$router.push('/feedback')" button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon color="primary" value=":icon-info"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>{{ $t('miscro.complaint') }}</mu-list-item-title>
                </mu-list-item>
                <mu-divider></mu-divider>
                <mu-list-item @click="$router.push('/forget')" button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon color="primary" value=":icon-mima"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>{{ $t('lgpwd.setpwd') }}</mu-list-item-title>
                </mu-list-item>
                <mu-list-item @click="$router.push('/fundPwd')" button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon color="primary" value=":icon-mima"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>{{ $t('fundPwd') }}</mu-list-item-title>
                </mu-list-item>
                <mu-list-item @click="logout" button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon color="primary" value=":icon-tuichudenglu1"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>{{ $t('header.out') }}</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-container>
        <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openName">
            <mu-appbar color="primary" :title="$t('shop.truename')">
                <mu-button slot="right" icon @click="openName = false">
                    <mu-icon value=":icon-guanbi"></mu-icon>
                </mu-button>
            </mu-appbar>
            <div style="padding: 24px;">
                <mu-text-field full-width :label="$t('auth.truename')" v-model="truename"></mu-text-field>
                <mu-text-field full-width :label="$t('auth.truenum')" v-model="idcard"></mu-text-field>
                <div class="currency_title" style="margin:0;">{{ $t('auth.note') }}</div>
                <div class="flex alcenter mb15 mt15">
                    <div class="flex1 talc">
                        <mu-icon v-if="pic1 === ''" size="72" @click="upload1" color="#eee" value=":icon-jia"></mu-icon>
                        <mu-avatar @click="upload1" v-if="pic1 !== ''" size="72">
                            <img :src="pic1">
                        </mu-avatar>
                        <input type="file" @change="uploadFile1" ref="uploadprev" style="display: none;"/>
                    </div>
                    <div class="flex1 talc">
                        <mu-icon v-if="pic2 === ''" ref="uploadback" @click="upload2" size="72" color="#eee"
                            value=":icon-jia"></mu-icon>
                        <mu-avatar @click="upload2" v-if="pic2 !== ''" size="72">
                            <img :src="pic2">
                        </mu-avatar>
                        <input type="file" @change="uploadFile2" ref="uploadback" style="display: none;"/>
                    </div>
                </div>
                <div>
                    <mu-button @click="submit" full-width color="primary">{{ $t('auth.up') }}</mu-button>
                </div>
            </div>
        </mu-dialog>

        <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openNameH">
            <mu-appbar color="primary" :title="$t('security.idcardh')">
                <mu-button slot="right" icon @click="openNameH = false">
                    <mu-icon value=":icon-guanbi"></mu-icon>
                </mu-button>
            </mu-appbar>
            <div style="padding: 24px;">
                <mu-text-field full-width :label="$t('auth.passport')" v-model="passport"></mu-text-field>
                <mu-text-field full-width :label="$t('auth.jiashi')" v-model="jiashi"></mu-text-field>
                <div class="currency_title" style="margin:0;">{{ $t('auth.note1') }}</div>
                <div class="flex alcenter mb15 mt15">
                    <div class="flex1 talc">
                        <mu-icon v-if="pic3 === ''" size="72" @click="upload3" color="#eee" value=":icon-jia"></mu-icon>
                        <mu-avatar @click="upload3" v-if="pic3 !== ''" size="72">
                            <img :src="pic3">
                        </mu-avatar>
                        <input type="file" @change="uploadFile3" ref="upload3" style="display: none;"/>
                    </div>
                    <div class="flex1 talc">
                        <mu-icon v-if="pic4 === ''" @click="upload4" size="72" color="#eee" value=":icon-jia"></mu-icon>
                        <mu-avatar @click="upload4" v-if="pic4 !== ''" size="72">
                            <img :src="pic4">
                        </mu-avatar>
                        <input type="file" @change="uploadFile4" ref="upload4" style="display: none;"/>
                    </div>
                </div>
                <div class="flex alcenter mb15 mt15">
                    <div class="flex1 talc">
                        <mu-icon v-if="pic5 === ''" size="72" @click="upload5" color="#eee" value=":icon-jia"></mu-icon>
                        <mu-avatar @click="upload5" v-if="pic5 !== ''" size="72">
                            <img :src="pic5">
                        </mu-avatar>
                        <input type="file" @change="uploadFile5" ref="upload5" style="display: none;"/>
                    </div>
                    <div class="flex1 talc">
                        <mu-icon v-if="pic6 === ''" @click="upload6" size="72" color="#eee" value=":icon-jia"></mu-icon>
                        <mu-avatar @click="upload6" v-if="pic6 !== ''" size="72">
                            <img :src="pic6">
                        </mu-avatar>
                        <input type="file" @change="uploadFile6" ref="upload6" style="display: none;"/>
                    </div>
                </div>
                <div class="flex alcenter mb15 mt15">
                    <div class="flex1 talc">
                        <mu-icon v-if="pic7 === ''" size="72" @click="upload7" color="#eee" value=":icon-jia"></mu-icon>
                        <mu-avatar @click="upload7" v-if="pic7 !== ''" size="72">
                            <img :src="pic7">
                        </mu-avatar>
                        <input type="file" @change="uploadFile7" ref="upload7" style="display: none;"/>
                    </div>
                    <div class="flex1"></div>
                </div>
                <div>
                    <mu-button @click="submitHigh" full-width color="primary">{{ $t('auth.up') }}</mu-button>
                </div>
            </div>
        </mu-dialog>

        <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openExtension">
            <mu-appbar color="primary" :title="$t('invite.mypromotion')">
                <mu-button slot="right" icon @click="openExtension = false">
                    <mu-icon value=":icon-guanbi"></mu-icon>
                </mu-button>
            </mu-appbar>
            <div style="box-sizing:border-box; height: calc(100% - 56px); overflow: auto; padding: 10px;">
                <mu-list>
                    <mu-list-item style="border-bottom: 1px solid #f5f5f5;" v-for="(item, index) in users"
                        :ripple="false" :key="index">
                        <mu-list-item-action>
                            <mu-badge color="lightBlueA700" :content="index + 1"></mu-badge>
                        </mu-list-item-action>
                        <mu-list-item-title style="font-size: 14px;">{{ item.account }}</mu-list-item-title>
                        <mu-list-item-action style="min-width: 120px!important;">
                            <i class="currency_title">{{ item.create_date }}</i>
                        </mu-list-item-action>
                    </mu-list-item>
                </mu-list>
            </div>
        </mu-dialog>
    </div>
</template>
<style lang="scss">
.creditScore {
  padding-top: 10px;
  span {
    color: red;
  }
}
.my-settings {
  height: 100%;
  overflow: auto;

  .mu-item-action {
    margin-left: 10px;
    min-width: 40px !important;
  }

  .mu-card {
    box-shadow: none !important;

    //border-bottom: 1px solid #eee;
    .mu-card-header-title {
      padding-right: 10px;
    }
  }

  .mu-card-actions {
    text-align: center;
  }

  .mu-flat-button {
    min-width: 108px !important;
  }
}

.button-wrapper {
  text-align: center;

  .mu-button {
    margin: 8px;
    vertical-align: top;
  }
}
</style>
<script>
import BackHeader from "@/components/backHeader";
import { mapGetters } from "vuex";
export default {
  components: { BackHeader },
  data() {
    let user_id = window.localStorage.getItem("user_id");
    return {
      openName: false,
      openNameH: false,
      showMySon: showSon,
      openExtension: false,
      truename: "",
      passport: "",
      jiashi: "",
      idcard: "",
      showBank: showBankFill,
      user_id: user_id,
      review_status: -1,
      hreview_status: -1,
      pic1: "",
      pic2: "",
      pic3: "",
      pic4: "",
      pic5: "",
      pic6: "",
      pic7: "",
      account_num: window.localStorage.getItem("accountNum"),
      users: [],
      is_seller: false,
      custorm_url: "",
      level: window.localStorage.getItem("userlevel"),
      credit_score: "",
      is_auth: 0, // 是否认证
    };
  },
  mounted() {
    this.loadCenter();
    this.getCustrom();
    this.credit_score = localStorage.getItem("credit_score") || 0;
  },
  computed:{
    ...mapGetters(["getConfigInfo"])
  },
  methods: {
    // 跳转到高级认证
    heightCert() {
      if (this.is_auth == 0) {
        this.$router.push('heightCer')
      } else if (this.is_auth == 1) {
        this.$toast.success(this.$t("auth2.complete2"));
      }else{
        this.$toast.success(this.$t("auth2.auing"));
      }
    },
    // 申請貸款
    loan() {
      if (this.review_status === 2) {
        // 實名跳轉申請頁面
        this.$router.push("/loan");
      } else {
        // 未實名跳轉到實名認證
        this.openName = true;
        this.$toast.warning(this.$t("auth.basefirst"));
      }
    },
    goShop() {
      window.location.href = "fiat/shop_fiatrad.html";
    },
    goApply() {
      window.location.href = this.custorm_url;
    },
    loadCenter() {
      let that = this;
      this.$http({
        method: "get",
        url: "/api/user/center",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.data.type === "ok") {
          that.review_status = res.data.message.review_status;
          that.hreview_status = res.data.message.hreview_status;
          that.is_seller = res.data.message.is_seller;
          that.is_auth = res.data.message.is_auth;
        }
      });
    },
    openChild() {
      const loading = this.$loading();
      let that = this;
      this.$http({
        method: "get",
        url: "/api/user/extension",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        loading.close();
        if (res.data.type === "ok") {
          that.openExtension = true;
          that.users = res.data.message;
        }
      });
    },
    upload1() {
      this.$refs.uploadprev.dispatchEvent(new MouseEvent("click"));
    },
    upload2() {
      this.$refs.uploadback.dispatchEvent(new MouseEvent("click"));
    },
    upload3() {
      this.$refs.upload3.dispatchEvent(new MouseEvent("click"));
    },
    upload4() {
      this.$refs.upload4.dispatchEvent(new MouseEvent("click"));
    },
    upload5() {
      this.$refs.upload5.dispatchEvent(new MouseEvent("click"));
    },
    upload6() {
      this.$refs.upload6.dispatchEvent(new MouseEvent("click"));
    },
    upload7() {
      this.$refs.upload7.dispatchEvent(new MouseEvent("click"));
    },
    uploadFile1(e) {
      let that = this;

      const loading = this.$loading();

      // that.loading = true;
      let reader = new FileReader();
      // console.log(window.event.target.files[0]);
      let file = e.target.files[0];

      reader.readAsDataURL(file);
      reader.onload = function (ed) {};
      let formData = new FormData();
      formData.append("file", file);
      this.$http
        .post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          loading.close();
          let msg = res.data;
          if (msg.type === "ok") {
            that.pic1 = msg.message;
          } else {
            that.$toast.error(msg.message);
          }
        });
    },
    uploadFile2(e) {
      let that = this;

      const loading = this.$loading();

      // that.loading = true;
      let reader = new FileReader();
      // console.log(window.event.target.files[0]);
      let file = e.target.files[0];

      reader.readAsDataURL(file);
      reader.onload = function (ed) {};
      let formData = new FormData();
      formData.append("file", file);
      this.$http
        .post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          loading.close();
          let msg = res.data;
          if (msg.type === "ok") {
            that.pic2 = msg.message;
          } else {
            that.$toast.error(msg.message);
          }
        });
    },
    uploadFile3(e) {
      let that = this;

      const loading = this.$loading();

      // that.loading = true;
      let reader = new FileReader();
      // console.log(window.event.target.files[0]);
      let file = e.target.files[0];

      reader.readAsDataURL(file);
      reader.onload = function (ed) {};
      let formData = new FormData();
      formData.append("file", file);
      this.$http
        .post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          loading.close();
          let msg = res.data;
          if (msg.type === "ok") {
            that.pic3 = msg.message;
          } else {
            that.$toast.error(msg.message);
          }
        });
    },
    uploadFile4(e) {
      let that = this;

      const loading = this.$loading();

      // that.loading = true;
      let reader = new FileReader();
      // console.log(window.event.target.files[0]);
      let file = e.target.files[0];

      reader.readAsDataURL(file);
      reader.onload = function (ed) {};
      let formData = new FormData();
      formData.append("file", file);
      this.$http
        .post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          loading.close();
          let msg = res.data;
          if (msg.type === "ok") {
            that.pic4 = msg.message;
          } else {
            that.$toast.error(msg.message);
          }
        });
    },
    uploadFile5(e) {
      let that = this;

      const loading = this.$loading();

      // that.loading = true;
      let reader = new FileReader();
      // console.log(window.event.target.files[0]);
      let file = e.target.files[0];

      reader.readAsDataURL(file);
      reader.onload = function (ed) {};
      let formData = new FormData();
      formData.append("file", file);
      this.$http
        .post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          loading.close();
          let msg = res.data;
          if (msg.type === "ok") {
            that.pic5 = msg.message;
          } else {
            that.$toast.error(msg.message);
          }
        });
    },
    uploadFile6(e) {
      let that = this;

      const loading = this.$loading();

      // that.loading = true;
      let reader = new FileReader();
      // console.log(window.event.target.files[0]);
      let file = e.target.files[0];

      reader.readAsDataURL(file);
      reader.onload = function (ed) {};
      let formData = new FormData();
      formData.append("file", file);
      this.$http
        .post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          loading.close();
          let msg = res.data;
          if (msg.type === "ok") {
            that.pic6 = msg.message;
          } else {
            that.$toast.error(msg.message);
          }
        });
    },
    uploadFile7(e) {
      let that = this;

      const loading = this.$loading();

      // that.loading = true;
      let reader = new FileReader();
      // console.log(window.event.target.files[0]);
      let file = e.target.files[0];

      reader.readAsDataURL(file);
      reader.onload = function (ed) {};
      let formData = new FormData();
      formData.append("file", file);
      this.$http
        .post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          loading.close();
          let msg = res.data;
          if (msg.type === "ok") {
            that.pic7 = msg.message;
          } else {
            that.$toast.error(msg.message);
          }
        });
    },
    submit() {
      const loading = this.$loading();
      let that = this;
      this.$http({
        url: "/api/user/real_name",
        method: "post",
        data: {
          name: this.truename,
          card_id: this.idcard,
          front_pic: this.pic1,
          reverse_pic: this.pic2,
        },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        loading.close();
        if (res.data.type === "ok") {
          that.$toast.success(res.data.message);
          that.loadCenter();
        } else {
          that.$toast.error(res.data.message);
        }
      });
    },
    submitHigh() {
      const loading = this.$loading();
      let that = this;
      this.$http({
        url: "/api/user/real_name_high",
        method: "post",
        data: {
          passport: this.passport,
          jiashi: this.jiashi,
          front_pic: this.pic3,
          passport_pic: this.pic4,
          passport_hand_pic: this.pic5,
          jiashi_pic: this.pic6,
          jiashi_hand_pic: this.pic7,
        },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        loading.close();
        if (res.data.type === "ok") {
          that.$toast.success(res.data.message);
          that.openNameH = false;
          that.loadCenter();
        } else {
          that.$toast.error(res.data.message);
        }
      });
    },
    named() {
      if (this.review_status === 0) {
        this.openName = true;
      }
      if (this.review_status === 2) {
        this.$toast.success(this.$t("auth2.complete"));
        return;
      }
      if (this.review_status === 1) {
        this.$toast.message(this.$t("security.auing"));
      }
    },
    getCustrom() {
      var that = this;
      this.$http({
        url: "/api/custorm?terminal=recharge",
        method: "get",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        that.custorm_url = res.data;
      });
    },
    getNamed() {
      if (this.review_status === 0) {
        return ":icon-weishiming";
      }
      if (this.review_status === 1) {
        return ":icon-dengdai";
      }
      if (this.review_status === 2) {
        return ":icon-renzheng";
      }
    },
    getNamedH() {
      if (this.hreview_status === 0) {
        return ":icon-weishiming";
      }
      if (this.hreview_status === 1) {
        return ":icon-dengdai";
      }
      if (this.hreview_status === 2) {
        return ":icon-renzheng";
      }
    },
    logout() {
      let that = this;
      this.$confirm(this.$t("header.out") + "?", this.$t("auth2.reminder"), {
        type: "none",
        okLabel: this.$t("lay.sure"),
        cancelLabel: this.$t("lay.ceil"),
      }).then(({ result }) => {
        if (result) {
          localStorage.removeItem("user_id");
          localStorage.removeItem("accountNum");
          that.$toast.info(that.$t("header.logout"));
          that.$router.push("/");
        } else {
        }
      });
    },
  },
};
</script>
