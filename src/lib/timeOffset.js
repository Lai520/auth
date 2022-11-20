/* eslint-disable */
// const moment = require('moment');

export const timeOffset = function (launchStartTimeStamp) {
    // var offset = new Date() + "";     //将时间格式转为字符串
    // // console.log(offset);  //  Mon Nov 02 2020 20:57:20 GMT-0600 (北美中部标准时间)
    // let asderf = offset.indexOf('GMT');
    // let fghdfgd = offset.substring(asderf+3,asderf+8);
    // let current_time = fghdfgd;   //给了你定义的一个字段，在拿到数据后使用

    // let timeStr = moment(launchStartTimeStamp).format('YYYY-MM-DD HH:mm:ss')
    if(isNaN(launchStartTimeStamp)) return 'ErrTime';
    let len = String(launchStartTimeStamp).length;
    var date = '';
    if(len === 13) date = new Date(launchStartTimeStamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    else if(len === 10)  date = new Date(launchStartTimeStamp * 1000);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    var s = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();

    return Y+M+D+h+m+s;
}
