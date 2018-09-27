/**
 * Created by BYM on 2016/8/29.
 */
var second = 0;
window.setInterval(function () {
    second ++;
}, 1000);
var tjArr = localStorage.getItem("jsArr1") ? localStorage.getItem("jsArr1") : '[{}]';
$.cookie('tjRefer', getReferrer() ,{expires:1,path:'/'});
console.log('href>>>>>',tjArr);
window.onbeforeunload = function() {
    if($.cookie('tjRefer') == ''){
        var tjT = eval('(' + localStorage.getItem("jsArr1") + ')');
        if(tjT){
            tjT[tjT.length-1].time += second;
            var jsArr1= JSON.stringify(tjT);
            localStorage.setItem("jsArr1", jsArr1);
        }
    } else {
        var tjArr = localStorage.getItem("jsArr1") ? localStorage.getItem("jsArr1") : '[{}]';
        var dataArr = {
            'url' : location.href,
            'time' : second,
            'refer' : getReferrer(),
            'timeIn' : Date.parse(new Date()),
            'timeOut' : Date.parse(new Date()) + (second * 1000)
        };
        tjArr = eval('(' + tjArr + ')');
        tjArr.push(dataArr);
        tjArr= JSON.stringify(tjArr);
        localStorage.setItem("jsArr1", tjArr);
    }
};
function getReferrer() {
    var referrer = '';
    try {
        referrer = window.top.document.referrer;
    } catch(e) {
        if(window.parent) {
            try {
                referrer = window.parent.document.referrer;
            } catch(e2) {
                referrer = '';
            }
        }
    }
    if(referrer === '') {
        referrer = document.referrer;
    }
    return referrer;
}