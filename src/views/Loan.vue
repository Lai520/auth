<template>
  <main class="loan">
    <mu-container>
      <mu-appbar style="width: 100%" color="#fff" text-color="#000">
        {{ $t("shop.loan") }}
        <mu-button @click="$router.back(-1)" icon flat slot="left">
          <mu-icon value=":icon-fanhui4"></mu-icon>
        </mu-button>
        <mu-button @click="lookAppRecord" flat slot="right">
          {{ $t("appRecord") }}
        </mu-button>
      </mu-appbar>
      <mu-form class="formBox" :model="form">
        <mu-form-item :label="$t('loanmin')" prop="minimum">
          <mu-text-field type="number" v-model="form.minimum"></mu-text-field>
        </mu-form-item>
        <mu-form-item :label="$t('loanmax')" prop="maximum">
          <mu-text-field type="number" v-model="form.maximum"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button @click="applyLoan" full-width color="primary">{{
            $t("startApply")
          }}</mu-button>
        </mu-form-item>
      </mu-form>
      <section class="cooperation">
        <div>
          <span>{{ $t("cooperation") }}</span>
        </div>
        <div>
          <img src="../assets/coin1.png" alt="" />
          <img src="../assets/coin2.png" alt="" />
          <img src="../assets/coin3.png" alt="" />
          <img src="../assets/coin4.png" alt="" />
          <img src="../assets/coin5.png" alt="" />
          <img src="../assets/coin6.png" alt="" />
        </div>
      </section>
    </mu-container>
    <mu-dialog
      width="360"
      transition="slide-bottom"
      fullscreen
      :open.sync="appRecord"
    >
      <mu-appbar color="primary" :title="$t('appRecord')">
        <mu-button slot="right" icon @click="appRecord = false">
          <mu-icon value=":icon-guanbi"></mu-icon>
        </mu-button>
      </mu-appbar>
      <mu-load-more
        :loaded-all="loadAll"
        @refresh="refresh"
        :refreshing="refreshing"
        :loading="loading"
        @load="load"
      >
        <mu-list>
          <mu-list-item v-for="item in recordList" :key="item.id">
            <mu-list-item-title>
              <span>{{ $t("legal.number") }}{{ item.minimum }}~{{ item.maximum }}</span>
              <span :class="[{red:item.status == 0},{blue:item.status == 1},{gray:item.status == 2}]">{{ showStatus(item.status) }}</span>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-load-more>
    </mu-dialog>
  </main>
</template>

<script>
export default {
  data() {
    return {
      form: {
        minimum: "",
        maximum: "",
      },
      appRecord: false,
      refreshing: false,
      loading: false,
      loadAll: false,
      page: 1,
      recordList: [], // 申请记录列表
    };
  },
  methods: {
    showStatus(val) {
      switch (val) {
        case 0:
          return this.$t("security.auing");
        case 1:
          return this.$t("security.pass");
        case 2:
          return this.$t("security.Fail");
      }
    },
    // 查看申请记录
    lookAppRecord() {
      this.appRecord = true;
      this.recordList = [];
      this.page = 1;
      this.getList();
    },
    // 下拉刷新
    refresh() {
      this.refreshing = true;
      this.page = 1;
      this.getList();
    },
    // 加载更多
    load() {
      this.loading = true;
      this.page++;
      this.getList();
    },
    // 获取申请列表
    getList() {
      this.$http({
        url: "/api/loan/list",
        method: "get",
        data: {
          page: this.page,
          limit: 30,
        },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.data.type == "ok") {
          this.recordList = [...this.recordList, ...res.data.message.data];
          if (this.recordList.length >= res.data.message.total) {
            this.loadAll = true;
          }
        } else {
          this.$toast(res.data.message);
        }
        this.loading = false;
        this.refreshing = false;
      });
    },
    // 申请贷款提交
    applyLoan() {
      if (!this.form.minimum) {
        this.$toast.message(this.$t("minEmpty"));
        return;
      }
      if (!this.form.maximum) {
        this.$toast.message(this.$t("maxEmpty"));
        return;
      }
      if (Number(this.form.maximum) < Number(this.form.minimum)) {
        this.$toast.message(this.$t("maxOrmin"));
        return;
      }
      this.$http({
        url: "/api/loan/add",
        method: "post",
        data: this.form,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.data.type == "ok") {
          this.$toast.success(res.data.message);
          setTimeout(() => {
            this.$router.back();
          }, 800);
        } else {
          this.$toast(res.data.message);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.loan {
  .formBox {
    padding: 20px 15px 10px;
  }
  .cooperation {
    padding: 0 15px;
    & > div:nth-child(1) {
      border-bottom: 1px solid #ddd;
      position: relative;
      span {
        position: relative;
        padding: 0 10px;
        background: #fff;
        bottom: -10px;
      }
    }
    & > div:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      margin-top: 15px;
      img {
        width: 60px;
        margin: 10px;
      }
    }
  }
}
.mu-dialog-body{
    display: flex;
    flex-direction: column;
    .mu-appbar{
        width: 100%;
    }
}
.mu-load-more{
    flex:1
}
.mu-item-wrapper {
  border-bottom: 1px solid #ddd;
}
.mu-item-title{
    display: flex;
    justify-content: space-between;
}
.red{
    color:red;
}
.blue{
    color:blue;
}
.gray{
    color:gray;
}
</style>