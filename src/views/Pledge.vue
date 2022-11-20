<template>
  <div class="my-settings">
    <div class="home flex flex-column">
      <div class="header" style="height: 0; padding: 0;">
      </div>
      <div class="container container-my flex1" style="overflow: auto; height: calc(100% - 70px)">

        <mu-container class="card-radius">
          <header style="padding: 10px 10px 50px;
    background: linear-gradient(to right, #218adc , #55c2ff);">
            <div class="head-btn talr">
              <div class="flex">

                <div style="flex:1;text-align: left">
                  <mu-icon @click="$router.push('/')" value=":icon-fanhui4" color="white"></mu-icon>
                </div>
                <div class="white bold ft18">{{ $t('header.rank') }}</div>
                <div style="flex:1;text-align: right">
                  <mu-icon @click="openFullscreen=true" value=":icon-heyue" color="white"></mu-icon>
                </div>
              </div>
            </div>
            <div class="head-left">

            </div>
          </header>
          <div style="width:100%; padding:0 20px; height: auto; margin-top:-20px;">
            <div v-for="(item,index) in products"
                 style="width:100%; height: 100%; margin-bottom: 15px; border-radius: 10px; border:1px solid #eee; background: #fff;">
              <h3 style="font-weight: bold; text-align: left; text-indent: 20px; line-height: 25px;">
                {{ item.currency_name }} {{
                  $t('lockrank.lockformoney')
                }}  {{ item.period }}{{ $t('lockrank.time') }}</h3>

              <mu-text-field readonly="" full-width type="number" style="background: #fff; padding: 0 20px;"
                             :placeholder="$t('lockrank.number') + item.min_single_limit+' - ' +item.max_single_limit"
                             v-model="item.number" :suffix="item.currency_name">
              </mu-text-field>
              <div class="ft14" style="line-height: 20px; text-indent: 20px; text-align: left;">{{
                  $t('lockrank.return')
                }}：<span class="green1 ft18 bold">{{
                    (item.min_daily_return_rate)
                  }}</span> {{ item.currency_name }}
              </div>
              <div class="flex row hide" style="line-height: 40px;color:#2196f3;">
                <div class="ft14 flex1" style=""><span
                    class="green1 ft18 bold">{{ item.min_daily_return_rate }}% <span
                    class="ft18">[{{ item.currency_name }}]</span></span>
                </div>
                <div class="bold flex1 ft18" style="align-items: center">
                  <span>{{ item.period }} {{ $t('lockrank.time') }}</span></div>
              </div>
              <mu-button :disabled="item.exists" color="success" @click="buyNow(index)" v-loading="item.loading" style="width: 100%; margin-top: 10px;">
                {{ item.exists?$t('lockrank.diyaed'):$t('lockrank.buynow') }}
              </mu-button>
            </div>
          </div>
        </mu-container>
      </div>
      <div class="footer">
        <Footer active="pledge"></Footer>
      </div>
    </div>
    <mu-dialog width="100%" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
      <mu-appbar color="primary" :title="$t('lockrank.record')">
        <mu-button slot="right" icon @click="openFullscreen=false">
          <mu-icon value=":icon-guanbi"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="height: calc(100% - 56px); overflow: auto">
        <div style="padding:20px;" v-for="item in tableData">
          <mu-card style="width: 100%;  background: linear-gradient(to right, rgb(33, 138, 220), rgb(85, 194, 255)); background-size: cover; border-radius: 15px; max-width: 375px; margin: 0 auto;">
            <mu-card-title class="mycard" :title="item.product.currency_name +' '+ item.period+$t('lockrank.time')"
                           :sub-title="$t('lockrank.status') +': '+ getStatusText(item.status) "></mu-card-title>
            <mu-card-actions style="text-indent: 0.5em;">

              <div>
                <div class="flex"  style="color: #fff!important;">
                  <i class="currency_title flex1" style="color: #fff!important;">{{$t('lockrank.dayrate')+"："}}<b class="ft18">{{(item.caution_money)}}</b></i>

                  <br/>
                </div>
              </div>
              <div>
                <i class="currency_title flex1" style="color: #fff!important;">{{$t('lockrank.returned')+"："}}<b class="ft18">{{ (item.product.min_daily_return_rate)}}</b></i>
              </div>
              <div class="flex">
                <div class="flex1"  style="color: #fff!important;"><i class="currency_title" style="color: #fff!important;">{{
                    item.show_add_time+' ~ '+item.show_end_time
                  }}</i><br/>
                </div>

              </div>
            </mu-card-actions>
          </mu-card>
        </div>
      </div>
    </mu-dialog>

  </div>
</template>
<style lang="scss">
.mu-dialog-body {
  overflow: auto;
  height: 100%;
}

.mycard {
  .mu-card-title, .mu-card-sub-title {
    color: #fff !important;
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
    border-bottom: 1px solid #eee;
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
import Footer from "@/components/Footer";

export default {
  components: {BackHeader, Footer},
  filters: {
    numFilters: function (value, num=4) {
      if (!value) {
        return '0.0000'
      }
      value = (value - 0).toFixed(parseInt(num)).toString()
      return value.slice(0) + ' '
    }
  },
  data() {
    let user_id = window.localStorage.getItem('user_id');
    return {
      openFullscreen:false,
      products: [],
      tableData: [],
      loading: null,
      dataloading: true
    }
  },
  mounted() {
    if (!window.localStorage.getItem('user_id')) {
      this.$router.push('/login');
    }
    this.getMyProducts();
  },
  methods: {
    getStatusType(status) {
      if (status == 1) {
        return 'warning';
      } else {
        return 'success';
      }
    },
    getStatusText(status) {
      if (status == 1) {
        return this.$t('lockrank.status1');
      } else {
        return this.$t('lockrank.status2');
      }
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    getProducts() {
      let that = this;
      this.$http({
        url: '/api/' + 'wealth/getProfitList',
        method: 'get',
        data: {},
      }).then(res => {
        if (res.data.type == 'ok') {
          let objs = res.data.message;
          let arr = [];
          objs.forEach(x => {
            x.total = 0;
            x.number = x.min_single_limit;
            x.loading = false;
            x.exists = false;

            let exists_arr = that.tableData.filter(y => {
              return y.wealth_product_id == x.id;
            });
            if (exists_arr.length > x.nlimit) {
              x.exists = true;
            }
            arr.push(x);
          });
          that.products = arr;
          that.loading.close();

        }
      }).catch(error => {

      })
    },
    getMyProducts() {
      let that = this;
      this.$http({
        url: '/api/' + 'wealth/getMyprofit',
        method: 'get',
        data: {},
        headers: {Authorization: localStorage.getItem("token")}
      }).then(res => {
        console.log(res);
        if (res.data.type == 'ok') {
          let objs = res.data.message.data;
          let arr = [];
          objs.forEach(x => {
            arr.push(x);
          });

          that.tableData = arr;
          that.dataloading = false;


        }

        that.getProducts();
      }).catch(error => {

      })
    },
    buyNow(index) {
      let item = this.products[index];
      if (item.loading) {
        return;
      }
      // console.log(parseFloat(item.number)<parseFloat(item.min_single_limit));
      item.number = parseFloat(item.number);
      item.min_single_limit = parseFloat(item.min_single_limit);
      item.max_single_limit = parseFloat(item.max_single_limit);

      if (item.number > item.max_single_limit || item.number < item.min_single_limit) {
        this.$message(this.$t('lockrank.d1', {
          'number': item.min_single_limit,
          'number1': item.max_single_limit,
          'currency': item.currency_name
        }))
        return;
      }


      let that = this;
      this.$confirm(this.$t('lockrank.confirmbuy'), this.$t('account.notice'), {
        confirmButtonText: this.$t('lay.sure'),
        cancelButtonText: this.$t('lay.ceil'),
        type: 'warning'
      }).then(({result}) => {
            if (result) {
              item.loading = true;
              that.$http({
                url: '/api/' + 'wealth/buyProfit',
                method: 'post',
                data: item,
                headers: {Authorization: localStorage.getItem("token")}
              }).then(res => {
                console.log(res);
                item.loading = false;
                if (res.data.type == 'ok') {
                  that.$toast.success(res.data.message)
                  // that.$message({
                  //   message: res.data.message,
                  //   type: 'success'
                  // });
                } else {
                  that.$toast.error(res.data.message)
                }
              });
            }
          }
      ).catch(() => {
      });
    }
  }
}
</script>
