/**
 * 接收参数
 * color： ‘#fff’
 * r： 5
 * time： 1000
 */
var ripple_utill = {
    isEmptyObject: function(obj) {
        for (let i in obj) { return false }
        return true
    },

    hasClass: function(ele, className) {
        return ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    },

    addClass: function(ele, className) {
        if (!this.hasClass(ele, className)) { ele.className += " " + className; }
        console.log('--addClass--')
    },

    removeClass: function(ele, className) {
        if (this.hasClass(ele, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            ele.className = ele.className.replace(reg, '');
        }
    },
    browserSupportEvent: function(eventName) {
        return eventName in window;
    }
}
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

class Ripple {
    constructor(obj) {
        this.init(obj);
        this.buttonAddClickEvent();
    }
    init(obj) {
        if (!ripple_utill.isEmptyObject(obj)) {
            Circular.prototype.r = obj.r || Circular.prototype.r
            Circular.prototype.cName = obj.cName || Circular.prototype.cName
            Circular.prototype.color = obj.color || Circular.prototype.color
            Circular.prototype.time = obj.time || Circular.prototype.time
        }
    };
    //为所有按钮添加监听，添加span
    buttonAddClickEvent() {
        //创建button下的 span
        let buttonList = document.getElementsByClassName(Circular.prototype.cName);
        for (let i = 0; i < buttonList.length; i++) {
            let circular = new Circular()
                //将所有按钮设置为相对定位
                //let t = buttonList[i].style.position = 'relative'
            let wrapper = this.createRippleNode()
            buttonList[i].appendChild(wrapper)
            buttonList[i].addEventListener('click', (event) => {
                this.reppleClick(event, buttonList[i], circular, this.createRippleChildNode(wrapper));
            })

        }
    };
    createRippleNode(tagName = 'span') {
        //在button下创建一个div作为wrapper，默认有一个span.
        let div = document.createElement('div');
        ripple_utill.addClass(div, 'md-wrapper')
        let span = document.createElement(tagName)
        ripple_utill.addClass(span, 'md-ripple')
        span.style.width = 2 * Circular.prototype.r + 'px';
        span.style.height = 2 * Circular.prototype.r + 'px';
        span.addEventListener('animationend', function(event) {
            ripple_utill.removeClass(this, 'animate')
        })
        div.appendChild(span);
        return div;
    };
    createRippleChildNode(wrapper) {
        //创建wrapper子节点span时，判断wrapper下是否有span空闲(动画停止)，空闲则重用，所有都没有则新建span。
        let childrenList = wrapper.children;
        for (let i = 0; i < childrenList.length; i++) {
            let flag = ripple_utill.hasClass(childrenList[i], 'animate')
            if (flag == null) { //动画已经停止了
                ripple_utill.addClass(childrenList[i], 'md-ripple')
                return childrenList[i];
            } else if (flag != null && i === childrenList.length - 1) { //最后一个span && 动画没有停止
                let span = document.createElement('span')
                ripple_utill.addClass(span, 'md-ripple')
                span.style.width = 2 * Circular.prototype.r + 'px';
                span.style.height = 2 * Circular.prototype.r + 'px';
                span.addEventListener('animationend', function(event) {
                    //新建的span在动画结束后，从wrapper中移除
                    wrapper.removeChild(this)
                })
                wrapper.appendChild(span);
                return span;
            }
        }
    };
    reppleClick(event, button, circular, ripple) {
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
        ripple_utill.addClass(ripple, 'animate')
            //添加动画后，如果浏览器不支持animationend，使用setTimeout移除
            //window.setTimeout(function() { removeClass(ripple, 'animate') }, circular.time)
    }
}

//取得所有按钮
let test = new Ripple({
    r: 20,
    cName: 'md-button',
    color: '#fff',
    time: 1000
})