<template>
  <mu-container>
    <mu-appbar color="primary" :title="$t('shop.high')">
      <mu-button slot="right" icon to="ucenter">
        <mu-icon value=":icon-guanbi"></mu-icon>
      </mu-button>
    </mu-appbar>
    <main class="certification">
      <mu-form>
        <mu-form-item :label="$t('home.pinput')">
          <mu-text-field v-model="form.email"></mu-text-field>
        </mu-form-item>
        <mu-form-item :label="$t('register.codenum')">
          <mu-text-field v-model="form.code">
            <mu-button @click="sendCode">{{$t('forget.getcode')}}</mu-button>
          </mu-text-field>
        </mu-form-item>
      </mu-form>
      <section class="authImg">
        <div>{{ $t("auth.img") }}</div>
        <div class="imgBox">
          <div>
            <img v-if="form.front_pic" :src="form.front_pic" alt="" />
            <span @click="getFile(1)" v-else>+</span>
            <input
              @change="getImgFile($event, 1)"
              ref="front_pic"
              type="file"
              hidden
              class="fileUpload"
            />
          </div>
          <div>
            <img v-if="form.reverse_pic" :src="form.reverse_pic" alt="" />
            <span @click="getFile(2)" v-else>+</span>
            <input
              @change="getImgFile($event, 2)"
              ref="reverse_pic"
              type="file"
              hidden
              class="fileUpload"
            />
          </div>
        </div>
        <mu-button @click="submit" full-width color="primary">{{ $t("ad.up") }}</mu-button>
      </section>
    </main>
  </mu-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        code: "",
        front_pic: "",
        reverse_pic: "",
      },
      isSendEmail:false, // 是否发送过邮箱验证码
    };
  },
  methods: {
    // 提交认证信息
    submit() {
      if(!this.form.email) {
        this.$toast.error(this.$t("home.pinput"))
        return
      }
      if(!this.form.code) {
        this.$toast.error(this.$t("enterCode"))
        return
      }
      if(!this.form.front_pic || !this.form.reverse_pic){
        this.$toast.error(this.$t("auth.img"))
        return
      }
      const loading = this.$loading();
      this.$http({
        url: "/api/user/authen",
        method: "post",
        data: this.form,
        headers: { Authorization: window.localStorage.getItem("token") },
      })
        .then((res) => {
          if (res.data.type == "ok") {
            this.$toast.error(res.data.message);
          } else {
            this.$toast.error(res.data.message);
          }
          loading.close();
        })
        .catch((err) => {
          loading.close();
        });
    },
    // 获取邮箱验证码
    sendCode() {
      if(this.isSendEmail) {
        this.$toast.error(this.$t("frequently"))
        return
      }
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if(!regEmail.test(this.form.email)) {
        this.$toast.error(this.$t('emailError'))
        return
      }
      this.$http({
        url: "/api/sms_mail",
        method: "post",
        data: {
          type:"authen",
          user_string:this.form.email
        },
        headers: { Authorization: window.localStorage.getItem("token") },
      })
        .then((res) => {
          if (res.data.type == "ok") {
            this.$toast.error(res.data.message);
            this.isSendEmail = true
          } else {
            this.$toast.error(res.data.message);
          }
          loading.close();
        })
        .catch((err) => {
          loading.close();
        });
    },
    // 获取文件
    getFile(type) {
      if (type == 1) {
        this.$refs["front_pic"].click();
      } else {
        this.$refs["reverse_pic"].click();
      }
    },
    getImgFile(e, type) {
      this.uploadFile(e, type);
    },
    // 上传文件
    uploadFile(e, type) {
      const loading = this.$loading();
      // this.loading = true;
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
          let msg = res.data;
          if (msg.type == "ok") {
            if (type == 1) {
              this.form.front_pic = msg.message;
            } else {
              this.form.reverse_pic = msg.message;
            }
          } else {
            this.$toast.error(msg.message);
          }
          loading.close();
        })
        .catch((err) => {
          loading.close();
        });
    },
  },
};
</script>

<style lang="scss">
.certification {
  padding: 15px;
  .authImg {
    .imgBox {
      margin-top: 15px;
      margin-bottom: 25px;
      display: flex;
      justify-content: space-evenly;
      & > div {
        border: 1px solid #ddd;
        height: 120px;
        width: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          font-size: 60px;
          color: #ddd;
          font-weight: 100;
        }
        img{
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
}
</style>