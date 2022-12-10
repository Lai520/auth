<template>
  <main class="notice">
    <div class="closeBtn">
      <svg class="icon" @click="$router.back(-1)">
        <use xlink:href="#icon-guanbi"></use>
      </svg>
    </div>
    <div class="bgBox">
      <span>{{$t('footer.notice')}}</span>
      <img src="@/assets/img_5.png" alt="">
    </div>
    <section>
      <div @click="showDetail(item.id)" v-for="(item,i) in noticesList" :key="item.id" :class="i%2==0?'primary':'amber'">
        <div>
          <div><mu-icon value=":icon-gonggao5"></mu-icon></div>
          <div class="title">{{item.title}}</div>
        </div>
        <div>
          <div class="time">{{item.create_time}}</div>
          <div><mu-icon value=":icon-xiangqing"></mu-icon></div>
        </div>
      </div>
    </section>
    <mu-dialog width="100%" transition="slide-bottom" fullscreen :open.sync="openAlert">
      <mu-appbar color="primary" :title="showInfo.title">
        <mu-button slot="right" icon @click="openAlert=false">
          <mu-icon value=":icon-guanbi"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div v-html="showInfo.content" style="padding: 24px;">
      </div>
    </mu-dialog>
  </main>
</template>
<script>
import {timeOffset} from "@/lib/timeOffset";
export default {
  name: "Notice",
  data() {
    return {
      openAlert:false,
      noticesList: [],
      showInfo:{},
    }
  },
  created() {
    this.loadNews(4);
  },
  methods: {
    loadNews(cid) {
      const loading = this.$loading();
      this.$http.post("/api/news/list", {"c_id": cid, limit: 100, 'lang': localStorage.getItem('locale')}).then(res => {
        if (res.data.type == "ok") {
          loading.close();
          this.noticesList = [];
          for (let i = res.data.message.list.length - 1; i >= 0; i--) {
            let item = res.data.message.list[i];
            this.noticesList.push({
              sort: item.sorts,
              id: item.id,
              href: '',
              pic: item.thumbnail,
              title: item.title ? item.title : '',
              create_time: item.create_time ? this.timeOffsetFn(item.create_time).substring(0, 10) : ''
            });
          }
          this.noticesList = this.noticesList.sort((x, y) => {
            return x.sort == y.sort ? x.id - y.id : x.sort - y.sort;
          })
          console.log(this.noticesList);
          this.$forceUpdate()
        }
      });
    },
    showDetail(id){
      const loading = this.$loading();
      let that = this;
      this.$http.post("/api/news/detail", {"id": id}).then(res => {
        if (res.data.type === "ok") {
          loading.close();

          this.openAlert=true;

          that.showInfo = res.data.message;
        }
      });
    },
    // 时间时区转换
    timeOffsetFn(time){
      return timeOffset(time);
    },
  }
}
</script>
<style lang="scss">
.notice{
  position: relative;
  .closeBtn{
    position: absolute;
    right: 15px;
    top: 15px;
    color: #fff;
    font-size: 24px; 
    z-index: 999;
  }
  .bgBox{
    position: relative;
    span{
      font-size: 25px;
      color: #fff;
      position: absolute;
      bottom: 15px;
      left: 15px;
    }
    img{
      width: 100%;
    }
  }
  section{
    &>div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ddd;
      padding: 15px;
      &>div{
        display: flex;
        align-items: center;
        .title,.time{
          font-size: 16px;
        }
        .title{
          margin-left: 8px;
        }
        .time{
          margin-right: 8px;
        }

      }
    }
    .primary{
      color: #2196f3;
      background: #eeeeee;
    }
    .amber{
      color: #ffc107;
      background: #fff;
    }
  }
}
</style>
