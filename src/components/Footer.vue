<template>
    <div class="footer" :style="getDayColor('border-color')">
        <div @click="$router.push('/')" class="flex-column" :class="active==='home'?'active':''"
             justify-content="center">
            <mu-ripple>
                <div>
                    <div class="icon-container"><i class="iconfont icon-ico_home"></i></div>
                    <div class="bold">{{ $t('header.home') }}</div>
                </div>
            </mu-ripple>
        </div>


        <div @click="gotoLegal()" v-if="false" class="flex-column" :class="active==='market'?'active':''"
             justify-content="center">
            <mu-ripple>
                <div>
                    <div class="icon-container"><i class="iconfont icon-fiat"></i></div>
                    <div class="bold">{{ $t('header.c2c') }}</div>
                </div>
            </mu-ripple>
        </div>


        <div @click="$router.push('/exchange')" class="flex-column" :class="active==='exchange'?'active':''"
             justify-content="center">
            <mu-ripple>
                <div>
                    <div class="icon-container"><i class="iconfont icon-duihuan2"></i></div>
                    <div class="bold">{{ $t('account.trade') }}</div>
                </div>
            </mu-ripple>
        </div>


        <div @click="$router.push('/trade')" class="flex-column" :class="active==='trade'?'active':''"
             justify-content="center">
            <mu-ripple>
                <div>
                    <div class="icon-container"><i class="iconfont icon-heyue"></i></div>
                    <div class="bold">{{ $t('td.trade') }}</div>
                </div>
            </mu-ripple>
        </div>

        <!--<div v-if="showIEO" @click="$router.push('/upstart')" class="flex-column" :class="active==='iepn'?'active':''"
             justify-content="center">
            <mu-ripple>
                <div>
                    <div class="icon-container"><i class="iconfont icon-qianbi"></i></div>
                    <div class="bold">{{displayName}}</div>
                </div>
            </mu-ripple>
        </div>-->

        <div @click="$router.push('/assets')" class="flex-column" :class="active==='assets'?'active':''"
             justify-content="center">
            <mu-ripple tag="div">
                <div>
                    <div class="icon-container"><i class="iconfont icon-ziyuan"></i></div>
                    <div class="bold">{{ $t('header.assets') }}</div>
                </div>
            </mu-ripple>
        </div>
    </div>
</template>

<script>
    import "animate.css"

    export default {
        name: "Footer",
        props: {

            active: {
                type: String,
                default: 'home'
            }
        },
        data(){
          return {
              showIEO:showIEO,
              displayName:plat_form_currency
          }
        },
        methods: {
            gotoLegal() {
                window.location.href = 'fiat/fiatrad.html';
            },
            getDayColor(attr) {
                // let key = attr+"-color";
                // return {
                //   key:localStorage.getItem('mode') === 'day' ? '#eee' : '#000'
                // };
                let obj = {};
                obj[attr] = localStorage.getItem('mode') === 'day' ? '#eee' : '#39393a';
                return obj;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .footer {
        height: 70px;
        line-height: 70px;
        border-top: 1px solid #eee;
        box-sizing: border-box;
        align-items: center;
        display: flex;

        .flex-column {
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;

            > div {
                position: relative;
                height: 100%;

                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
            }

            mu-ripple {
                position: relative;
            }

            .iconfont {
                font-size: 18px;
            }

            line-height: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;

            div:last-child {
                font-size: 12px;
            }

        }

        .flex-column.active {
            color: rgb(0, 129, 204);
            animation: rubberBand; /* referring directly to the animation's @keyframe declaration */
            animation-duration: 1.5s; /* don't forget to set a duration! */
        }

    }
</style>
