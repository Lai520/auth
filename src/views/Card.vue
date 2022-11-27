<template>
  <mu-container style="height: 100%" class="tall">
    <div class="wrap" style="background: #ffffff; height: 100%">
      <mu-appbar color="primary" :title="$t('bank.info')">
        <mu-button slot="right" icon to="ucenter">
          <mu-icon value=":icon-guanbi"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="height: calc(100% - 56px); overflow: auto; padding: 20px">
        <h3 v-if="review_status == 0">{{ $t("bank.realfirst") }}</h3>
        <h3 v-if="review_status == 1">{{ $t("bank.realauing") }}</h3>
        <mu-form v-if="review_status == 2" :model="form" style="height: 100%">
          <mu-form-item prop="input" :label="$t('bank.address')">
            <mu-text-field v-model="form.bank_address"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="input" :label="$t('bank.name')">
            <mu-text-field v-model="form.bank_name"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="input" :label="$t('bank.branch')">
            <mu-text-field v-model="form.bank_branch"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="input" :label="$t('bank.no')">
            <mu-text-field v-model="form.bank_no"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="input" :label="$t('bank.user')">
            <mu-text-field v-model="form.real_name" readonly=""></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="input" :label="$t('bank.account')">
            <mu-text-field v-model="form.bank_account"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="input" :label="$t('bank.phone')">
            <mu-text-field v-model="form.bank_phone"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="input" :label="$t('bank.other')">
            <mu-text-field v-model="form.other_name"></mu-text-field>
          </mu-form-item>
          <mu-form-item>
            <mu-button
              v-if="showSubmit"
              class="flex1"
              color="primary"
              @click="submit"
            >
              {{ $t("bank.submit") }}
            </mu-button>
            <mu-button
              flat
              v-if="!showSubmit"
              class="flex1"
              color="primary"
              @click="customerPopup = true"
            >
              {{ $t("bank.change") }}
            </mu-button>
          </mu-form-item>
        </mu-form>
      </div>
    </div>
    <customerPop :openPop.sync="customerPopup" />
  </mu-container>
</template>
<script>
import customerPop from "@/components/customerPop";
export default {
  name: "Card",
  components: {
    customerPop,
  },
  data() {
    return {
      wallets: [],
      form: {
        bank_name: "",
        bank_no: "",
        bank_address: "",
        bank_account: "",
        bank_branch: "",
        bank_phone: "",
        real_name: "",
        other_name: "",
        account_number: false,
      },
      info: null,
      review_status: -1,
      customerPopup: false,
      showSubmit: true,
    };
  },
  watch: {
    active(val) {
      // let url = this.wallets[Object.keys(this.wallets)[val]];
      // this.qrcode(url);
    },
  },
  mounted() {
    this.getWalletsUsdt();
    this.getUserRealInfo();
  },
  methods: {
    submit() {
      this.$confirm(this.$t("bank.confirm"), "Tips", {
        type: "warning",
      }).then(({ result }) => {
        if (result) {
          let that = this;
          if (this.form.other_name) {
            this.form.real_name + "-*-" + this.form.other_name;
          }
          this.$http({
            method: "post",
            url: "/api/user/cash_save",
            data: this.form,
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }).then((res) => {
            if (res.data.type === "ok") {
              this.getWalletsUsdt();
              // that.review_status = res.data.message.review_status;
              // that.form.real_name=res.data.message.name;
            }
          });
        } else {
        }
      });
    },
    getWalletsUsdt() {
      const loading = this.$loading();
      let that = this;
      this.$http({
        url: "/api/user/cash_info",
        method: "post",
        data: {
          currency: 3,
        },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        loading.close();
        if (res.data.type === "ok") {
          if (res.data.message.account_number) {
            that.form = res.data.message;
            if (that.form.real_name.indexOf("-*-") != -1) {
              let name = this.form.real_name.split("-*-");
              this.form.real_name = name[0];
              this.form.other_name = name[1];
            }
            if (that.form.bank_no) that.showSubmit = false;
          }
        }
      });
    },
    getUserRealInfo() {
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
          that.form.real_name = res.data.message.name;
        }
      });
    },
    copy() {
      let that = this;
      let clipboard = new Clipboard(".copy");
      console.log(clipboard);
      clipboard.on("success", (res) => {
        that.$toast.success(that.$t("lay.copys"));
        res.clearSelection();
        clipboard.destroy();
      });

      clipboard.on("error", (res) => {
        that.$toast.warning(that.$t("lay.fcopy"));
      });
    },
    qrcode(url) {
      this.$refs.qrcode.innerHTML = "";
      this.qrccode = new QRCode("qrcode", {
        width: 150,
        height: 150,
        text: url,
      });
    },
  },
};
</script>
