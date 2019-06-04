var speed = 80;//控制速度
var tab = document.getElementById("demo");    // js 转成 JQuery 变量 : tab = $(tab), 注意，没有 ""
var tab1 = document.getElementById("demo1");
var tab2 = document.getElementById("demo2");
tab2.innerHTML = tab1.innerHTML;
function Marquee(){
    if(tab.scrollTop - tab2.offsetHeight >= 0)
        tab.scrollTop -= tab1.offsetHeight;
    else {
        tab.scrollTop++;
    }
}
// 定时器
var MyMar=setInterval(Marquee,speed);
// 鼠标滑过停止滚动
tab.onmouseover=function() {
    clearInterval(MyMar);   
};
// 鼠标滑出继续滚动
tab.onmouseout=function() {
    MyMar = setInterval(Marquee,speed); // 等同于 setInterval("Marquee()", speed);
};