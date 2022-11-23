<template>
  <main>
    <mu-container>
        <mu-appbar style="width: 100%;" color="#fff" text-color="#000">
            {{ $t('shop.loan') }}
            <mu-button @click="$router.back(-1)" icon flat slot="left">
                <mu-icon value=":icon-fanhui4"></mu-icon>
            </mu-button>
            <mu-button icon flat slot="right">
                <mu-icon value=":icon-fanhui40"></mu-icon>
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
                <mu-button @click="applyLoan" full-width color="primary">{{$t('startApply')}}</mu-button>
            </mu-form-item>
        </mu-form>
        <section class="cooperation">
            <div>
                <span>合作机构</span>
            </div>
            <div>
                <img src="../assets/coin1.png" alt="">
                <img src="../assets/coin2.png" alt="">
                <img src="../assets/coin3.png" alt="">
                <img src="../assets/coin4.png" alt="">
                <img src="../assets/coin5.png" alt="">
                <img src="../assets/coin6.png" alt="">
            </div>
        </section>
    </mu-container>
  </main>
</template>

<script>
export default {
    data() {
        return {
            form:{
                minimum:"",
                maximum:""
            }
        }
    },
    methods:{
        // 申请贷款提交
        applyLoan() {
            if(!this.form.minimum){
                this.$toast.message(this.$t("minEmpty"))
                return
            }
            if(!this.form.maximum) {
                this.$toast.message(this.$t("maxEmpty"))
                return
            }
            if(this.form.maximum<this.form.minimum) {
                this.$toast.message(this.$t("maxOrmin"))
                return
            }
            this.$http({
                url: '/api/loan/add',
                method: 'post',
                data:this.form,
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(res => {
                if(res.data.type == 'ok'){
                    this.$toast.success(res.data.message)
                    setTimeout(()=>{
                        this.$router.back()
                    },800)
                }else{
                    this.$toast(res.data.message)
                }
            })
        }
    }
}
</script>

<style lang="scss">
.formBox{
    padding: 20px 15px 10px;
}
.cooperation{
    padding: 0 15px;
    &>div:nth-child(1){
        border-bottom: 1px solid #ddd;
        position: relative;
        span{
            position: relative;
            padding: 0 10px;
            background: #fff;
            bottom: -10px;
        }
    }
    &>div:nth-child(2){
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;
        img{
            width: 60px;
            margin: 10px;
        }
    }
}
</style>