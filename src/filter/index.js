// 获取年月日时分秒
function getTime(value) {
    let d = new Date(Number(value));
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    month < 10 ? (month = "0" + month) : month;
    day < 10 ? (day = "0" + day) : day;
    hour < 10 ? (hour = "0" + hour) : hour;
    minutes < 10 ? (minutes = "0" + minutes) : minutes;
    seconds < 10 ? (seconds = "0" + seconds) : seconds;
    return { year, month, day, hour, minutes, seconds };
}


/* 时间戳（13位）转 2021-08-08 08:08 格式  */
export const formatMin = (value, sp = '-') => {
    if (!value || value <= 0) return '-';
    const { year, month, day, hour, minutes } = getTime(value);
    if (sp === 'cn') {
        return year + '年' + month + '月' + day + '日 ' + hour + ':' + minutes;
    } else {
        return year + sp + month + sp + day + ' ' + hour + ':' + minutes;
    }
};


/* 时间戳（13位）转 2021-08-08格式  */
export const formatDate = (value, sp = '-') => {
    if (!value || value <= 0) return '-';
    const { year, month, day } = getTime(value);
    if (sp === 'cn') {
        return year + '年' + month + '月' + day + '日';
    } else {
        return year + sp + month + sp + day;
    }
};


