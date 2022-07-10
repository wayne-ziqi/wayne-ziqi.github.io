function getCurrTime() {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var spl = second % 2 ? ' ' : ':';
    return hour.toString() + spl + minute.toString() + spl + second.toString();
}
setInterval(function () {
    var time = getCurrTime();
    document.getElementById("clock").innerHTML =
        '<span style="font-family: monospace; font-size: 40px">' + time + '</span>';
}, 1000);
