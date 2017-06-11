/**
 * 接收参数
 * color： ‘#fff’
 * r： 5
 * time： 1000
 */
Circular.prototype = {
    r: 5,
    cName: 'md-button',
    color: '#fff',
    time: 1000
}

function Circular() {
    this.x = 0;
    this.y = 0;
    this.setX = function(newValue) {
        this.x = newValue;
    };
    this.setY = function(newValue) {
        this.y = newValue
    }
}

function Ripple(obj) {
    this.init = function(obj) {
        if (!isEmptyObject(obj)) {
            Circular.prototype.r = obj.r || Circular.prototype.r
            Circular.prototype.cName = obj.cName || Circular.prototype.cName
            Circular.prototype.color = obj.color || Circular.prototype.color
            Circular.prototype.time = obj.time || Circular.prototype.time
        }
    };
    //为所有按钮添加监听，添加span
    this.ButtonAddClickEvent = function() {
        //创建button下的 span
        let buttonList = document.getElementsByClassName(Circular.prototype.cName);
        for (let i = 0; i < buttonList.length; i++) {
            let circular = new Circular()
            let span = this.createRippleNode()
            buttonList[i].appendChild(span)
            buttonList[i].addEventListener('click', (event) => { this.reppleClick(event, buttonList[i], circular, span) })
        }
    };
    this.createRippleNode = function(tagName = 'span') {
        let span = document.createElement(tagName)
        addClass(span, 'md-ripple')

        span.style.width = 2 * Circular.prototype.r + 'px';
        span.style.height = 2 * Circular.prototype.r + 'px';
        return span
    };
    this.reppleClick = function(event, button, circular, ripple) {
        /*相对于 按钮的点击坐标
        点击的位置 - 获取按钮的位置 
        */
        let relativeX = event.clientX - button.offsetLeft;
        let relativeY = event.clientY - button.offsetTop;
        //圆变大后的半径 获取按钮的宽度、高度
        //circular.r = button.clientHeight > button.clientWidth? button.clientHeight: button.clientWidth;
        let positionX = relativeX - circular.r;
        let positionY = relativeY - circular.r;

        circular.setX(positionX);
        circular.setY(positionY);

        ripple.style.left = circular.x + 'px';
        ripple.style.top = circular.y + 'px';
        addClass(ripple, 'animate')
        window.setTimeout(function() { removeClass(ripple, 'animate') }, circular.time)
    }
    this.init(obj)
    this.ButtonAddClickEvent()
}


function isEmptyObject(obj) {
    for (let i in obj) { return false }
    return true
}

function hasClass(ele, className) {
    return ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(ele, className) {
    if (!this.hasClass(ele, className)) { ele.className += " " + className; }
    console.log('--addClass--')
}

function removeClass(ele, className) {
    if (hasClass(ele, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}
//取得所有按钮
let test = new Ripple({
    r: 20,
    cName: 'md-button',
    color: '#fff',
    time: 1000
})