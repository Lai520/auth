<template>
  <div class="fund-pwd">
    <div style="height: 50px;" class="flex alcenter">
      <div class="flex1 flex" style="padding-right: 15px; justify-content: flex-end;">
        <svg class="icon" @click="$router.back(-1)" style="font-size: 24px; " color="#999" aria-hidden="true">
          <use xlink:href="#icon-guanbi"></use>
        </svg>
      </div>
    </div>
    <h1 align="center" class=""  style="line-height: 50px; margin:0; margin-bottom: 30px; text-align: left">{{$t('fundPwd')}}</h1>
    <mu-form ref="form" :model="validateForm" class="mu-demo-form">
      <mu-form-item v-if="hasPassword" :label="$t('oldPwd')" prop="oldpassword">
        <mu-text-field autoComplete="new-password"
                       :action-icon="!visibility ? ':icon-bianzubeifenx' : ':icon-kejian'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"
                       v-model="validateForm.oldpassword"
                       prop="password"></mu-text-field>
      </mu-form-item>
      <mu-form-item :label="$t('newPwd')" prop="password">
        <mu-text-field autoComplete="new-password"
                       :action-icon="!visibility ? ':icon-bianzubeifenx' : ':icon-kejian'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"
                       v-model="validateForm.password"
                       prop="password"></mu-text-field>
      </mu-form-item>
      <mu-form-item :label="$t('surePwd')" prop="re_password">
        <mu-text-field autoComplete="new-password"
                       :action-icon="!visibility ? ':icon-bianzubeifenx' : ':icon-kejian'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"
                       v-model="validateForm.re_password"
                       prop="password"></mu-text-field>
      </mu-form-item>
      <mu-button color="primary" style="width: 100%; height: 40px;" @click="submit">{{$t('lay.sure')}}</mu-button>
    </mu-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      validateForm: {
        oldpassword: '',
        password: '',
        re_password: '',
      }, // 表单
      visibility:false, // 输入框类型
      hasPassword: false
    }
  },
  mounted() {
    this.hasPwd();
  },
  methods: {
    submit() {
      let form = this.validateForm;
      if(!form.oldpassword && this.hasPassword) {
        this.$toast.error(this.$t('lay.inpwd'));
        return;
      } else if(!form.password) {
        this.$toast.error(this.$t('lay.inpwd'));
        return;
      } else if(!form.re_password) {
        this.$toast.error(this.$t('lay.repwd'));
        return;
      } else if(form.password !== form.re_password) {
        this.$toast.error(this.$t('lay.twopwd'));
        return;
      }

      let that = this;
      const loading = this.$loading();
      this.$http({
        url: '/api/safe/update_password',
        method: 'post',
        data: this.validateForm,
        headers: {Authorization: localStorage.getItem('token')}
      }).then(res => {
        loading.close();
        if (res.data.type === 'ok') {
          that.$toast.success(res.data.message);
          that.$router.go(-1);
        } else {
          that.$toast.error(res.data.message);
        }
      })
    },
    hasPwd(){
      this.$http({
        url: '/api/user/get_paypwd',
        method: 'get',
        data: {},
        headers: {Authorization: localStorage.getItem('token')}
      }).then(res => {
        if (res.data.type === 'ok') {
          this.hasPassword = true;
        }
      })
    },
  }
};
</script>
<style lang="scss" scoped>
.fund-pwd{
  padding: 20px;
}
</style>
<style>
.mu-form-item-label{
  text-align: left;
}
</style>
