//另一种拖拽计算方法：根据初始div的left值减去鼠标初始位置，计算鼠标位置与div左边距的距离差值
// 那么下一次div的left值就等于当前鼠标点减去这个距离差值
var div1 = document.createElement('div');
div1.className = 'demo';
document.body.appendChild(div1);

var dragging = false,
    X,
    Y;
div1.onmousedown = function (e) {
    dragging = true;
    X = e.clientX - div1.offsetLeft;
    Y = e.clientY - div1.offsetTop;
}
document.onmousemove = function (e) {
    if (dragging === true) {
        var resultX = e.clientX - X,
            resultY = e.clientY - Y;
        if (resultX < 0) {
            resultX = 0;
        }else if (resultX > window.innerWidth - div1.offsetWidth) {
            resultX = window.innerWidth - div1.offsetWidth;
        }
        if (resultY < 0) {
            resultY = 0;
        }else if (resultY > window.innerHeight - div1.offsetHeight) {
            resultY = window.innerHeight - div1.offsetHeight;
        }
        div1.style.left = resultX + 'px';
        div1.style.top = resultY + 'px';
    }
}
document.onmouseup = function (e) {
    dragging = false;
}
