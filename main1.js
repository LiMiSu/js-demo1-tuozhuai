var div1 = document.createElement("div");
div1.className ="demo";
document.body.appendChild(div1);

var dragging = false;
var lastX, lastY;
div1.onmousedown = function (e) {
    dragging = true;//鼠标按下才开启拖动开关
    lastX = e.clientX;//鼠标按下的初始位置
    lastY = e.clientY;
}
//onmousemove事件绑定在：
// document.body.onmousemove：绑定在body上也行，但是一定要注意body的大小，body小了出范围了就失效了
// div1.onmousemove：绑定在div1上也行，但当鼠标拖动太快时，事件监听的速度跟不上鼠标移动的速度，鼠标就会移出div1使拖动事件失效

//绑定在body上时有一个bug：当把div拖出了视口之外，抬起鼠标后，按理说当抬起鼠标后拖动事件消失，div不再跟着鼠标，
//但在这种情况下移回鼠标div也跟着回来了，就好像鼠标没有抬起过一样，拖动事件一直存在，得点击一次鼠标才能取消
//解决：改成绑定在document范围上，那样的话又出现一个问题：鼠标回来了div不回来，找不到div了
//怎么阻止把div找不到呢：那就设置一个范围不要让top、left值低于或者高于边界


document.onmousemove = function (e) {
    //所以绑定在document上是最好的，解决了上面的问题
    if (dragging === true) {
        //div移动了多少个像素 = 鼠标移动了多少个像素值
        //divlastX -divfirstX的距离 = 鼠标lastX - firstX的距离
        //所以以下：deltaX = div1.style.top - left ---> div1.style.top = deltaX + left
        var deltaX = e.clientX - lastX;
        var deltaY = e.clientY - lastY;
        //.style只能取内联样式，如果没设置内联样式的话取值是空的,或者还有可能内联样式设置了auto那么parseInt得到NaN，所以要容错加上||0
        var top = parseInt(div1.style.top) || 0,
            left = parseInt(div1.style.left) || 0;
        var resultX = left + deltaX,
            resultY = top + deltaY;
        //防止div出界后找不到：
        if (resultX < 0) {
            resultX = 0;
        }
        if (resultY < 0) {
            resultY = 0;
        }
        div1.style.left = resultX + 'px';
        div1.style.top = resultY + 'px';
        lastX = e.clientX;//应该每次都是跟上一次移动的点对比
        lastY = e.clientY;
    }
}
document.onmouseup = function (e) {
    dragging = false;
}
