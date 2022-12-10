import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import theme from 'muse-ui/lib/theme';
import Axios from "axios"
import VueAxios from 'vue-axios'
import i18n from './lang/lang'
import VueSocketIO from 'vue-socket.io'
import Qs from 'qs'
import store from "./store";
import Helpers from 'muse-ui/lib/Helpers';
import NProgress from 'muse-ui-progress';
import Loading from 'muse-ui-loading';
import 'muse-ui-loading/dist/muse-ui-loading.css'
import Toast from 'muse-ui-toast';
import Utils from "./lib/utils";
import Message from 'muse-ui-message';

Vue.use(Toast, {
    position: 'top',               // 弹出的位置
    time: 1000,                       // 显示的时长
    closeIcon: ':icon-guanbi',               // 关闭的图标
    close: true,                      // 是否显示关闭按钮
    successIcon: ':icon-chenggong1',      // 成功信息图标
    infoIcon: ':icon-info',                 // 信息信息图标
    warningIcon: ':icon-jinggao',     // 提醒信息图标
    errorIcon: ':icon-shibai',              // 错误信息图标
    color: '#fff'
});
Vue.use(NProgress);
Vue.use(Helpers);
Vue.use(Utils);

Number.prototype.toFloor = function (num) {
    return Math.floor(this * Math.pow(10, num)) / Math.pow(10, num);
};

//进一法
Number.prototype.toCeil = function (num) {
    return Math.ceil(this * Math.pow(10, num)) / Math.pow(10, num);
};

//四舍五入法
Number.prototype.toRound = function (num) {
    return Math.round(this * Math.pow(10, num)) / Math.pow(10, num);
};

//注册全局过滤器
import * as filters from "./filter";
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]));

theme.add('teal_day', {
    primary: '#2196f3',
    secondary: '#000000',
    success: '#4caf50',
    warning: '#fdd835',
    info: '#2196f3',
    error: '#f44336',
    track: '#bdbdbd',
    text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'gba(0, 0, 0, 0.54)',
        alternate: '#fff',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)' // 提示文字颜色
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: {
        paper: '#fff',
        chip: '#e0e0e0',
        default: '#ffffff'
    }
}, 'light');

theme.add('teal_night', {
    primary: '#1976d2',
    secondary: '#000000',
    success: '#4caf50',
    warning: '#fdd835',
    info: '#2196f3',
    error: '#f44336',
    track: '#757575',
    text: {
        primary: '#fff',
        secondary: 'rgba(255, 255, 255, 0.7)',
        alternate: '#303030',
        disabled: 'rgba(255, 255, 255, 0.3)',
        hint: 'rgba(255, 255, 255, 0.3)' // 提示文字颜色
    },
    divider: 'rgba(255, 255, 255, 0.3)',
    background: {
        paper: '#424242',
        chip: '#616161',
        default: '#303030'
    }
}, 'dark');

let theme_str = 'teal_';
if (window.localStorage.getItem('mode')) {

} else {
    window.localStorage.setItem('mode', 'day');
}
theme_str += window.localStorage.getItem('mode');
theme.use(theme_str);

if (window.localStorage.getItem('lang')) {

} else {
    window.localStorage.setItem('lang', 'hk');
}

import "@/assets/style/common.css";

/**
 * 配置接口地址和socket
 *  ip = '121.127.249.134';
 *
 *  prodOrDev : 配置请求地址开关
 */
let ip = '', sip = '';
if(process.env.NODE_ENV === 'development') {
    ip = ''; // 测试
    sip = 'hw.tokenomy.vip';  //  测试
} else {
    ip = projectIP; // 生产
    sip = projectSIP;  // 生产
}
// let [bus_host, socket_api, socket_path] = [`http://${ip}:8070`, `wss://${sip}:2050`, '/socket.io/'];
let [bus_host, socket_api, socket_path] = [`${ip}`, `wss://${sip}:2050`, '/socket.io/'];
if (process.env.NODE_ENV === 'development') {

} else {
    bus_host = "";
    // socket_api = 'wss://' + document.domain + ":2030";
    socket_api = 'wss://' + document.domain + ":2050";
    socket_path = '/wss/socket.io/';
}

Vue.use(new VueSocketIO({
    debug: false,
    connection: socket_api,
    options: {path: socket_path} //Optional options
}))

Vue.filter("numberFixed", function (x, y = 4) {
    return Number(x).toFixed(y)
})


Vue.use(Loading);
window.eventBus = new Vue()

Vue.use(MuseUI);
Vue.use(VueAxios, Axios);
Vue.use(Qs);

// let moreloading = false;
Axios.interceptors.request.use(config => {


    if (config.headers.not_loading === undefined) {
        // if (!moreloading){
        //     moreloading = eventBus.$loading();
        // }

    } else {
        delete config.headers.not_loading;
    }
    if (config.url.indexOf("transaction_in") < 0) {
        // layer.load(1);
    }
    // console.log(config.headers);
    config.headers.lang = window.localStorage.getItem('lang');
    config.url = bus_host + config.url;
    // config.url = 'https://www.skychain.vip' + config.url;
    if (config.url.indexOf('?') === -1) {
        config.url = config.url + '?_timespan=' + (new Date()).getTime()
    } else {
        config.url = config.url + '&_timespan=' + (new Date()).getTime()
    }
    // 在发送请求之前做些什么
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})
let inmessage = false;
Axios.interceptors.response.use(response => {
    // if (moreloading !== undefined) {
    //     moreloading.close();
    // }

    if (response.data.type == '999') {
        let now = router.currentRoute.name.toLowerCase();
        let jump = true;
       let lang = window.localStorage.getItem('lang');
        if (now === 'login' || now == 'home' || now == 'homecontent' || now === 'register') {
            jump = false;
        }
        if (inmessage) {

        } else {
            inmessage = true;
            setTimeout(() => {
                inmessage = false;
            }, 3000);
            if (jump) {
                let arr = {'en': 'Please login', 'zh': '请先登录', 'jp': 'まず登録してください', 'kr': '우선 로그 인 하 세 요', 'hk': '請先登錄'};
                window.eventBus.$toast.info(arr.hasOwnProperty(lang) ? arr[lang] : arr['en']);
                localStorage.removeItem('user_id');
                localStorage.removeItem('token');

                setTimeout(() => {
                    router.push("/login");
                }, 500);
            }
        }
    }
    return response
})

Vue.config.productionTip = false;


Vue.use(new VueSocketIO({
    debug: false,
    connection: socket_api,
    options: {path: socket_path} //Optional options
}))

if (window.plus) {
    plusReady()
} else {
    document.addEventListener('plusready', plusReady, false)
}

function plusReady() {
    plus.navigator.setStatusBarBackground('#ffffff');
    plus.navigator.setStatusBarStyle('dark');
}

Vue.use(Message, {
    closeIcon: ':icon-guanbi',               // 关闭的图标
    close: true,                      // 是否显示关闭按钮
    successIcon: ':icon-chenggong1',      // 成功信息图标
    infoIcon: ':icon-info',                 // 信息信息图标
    warningIcon: ':icon-jinggao',     // 提醒信息图标
    errorIcon: ':icon-shibai',              // 错误信息图标maxWidth: '80%',
    className: '',                                  // 对话框的样式
    okLabel: 'ok',                                 // 对话框确定按钮文字
    cancelLabel: 'cancel',                             // 对话框取消按钮文字
    transition: 'scale'
});

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

new Vue({
    i18n,
    router,
    store,
    Loading,
    render: h => h(App),
    created() {
        this.$progress.start();
    },
    mounted() {
        this.$progress.done();
    }
}).$mount('#app')
