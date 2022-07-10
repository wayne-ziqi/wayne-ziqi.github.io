function getCurrTime() {
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getUTCFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const spl = second % 2 ? ' ' : ':';
    return year.toString() + '/' + month.toString() + '/' + day.toString() + ' ' + hour.toString() + spl + minute.toString() + spl + second.toString();
}

setInterval(function () {
    var time = getCurrTime();
    document.getElementById('header__time').innerHTML =
        '<span style="font-family: monospace; font-size: 10px">' + time + '</span>';
}, 1000);
