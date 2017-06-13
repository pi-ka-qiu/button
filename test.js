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
    /**
     * 接收参数
     * cName: 'md-button' 
     * color： ‘#fff’
     * r： 5
     * time： 1000 
     * rippleMultiple: true  是否出现多个水波纹
     * MaxNum：3 最多出现多少个水波纹
     */
Circular.prototype = {
    r: 20,
    cName: 'md-button',
    color: 'rgba(0, 0, 0, 0.3)',
    time: '0.5s',
    MaxNum: 5
}

function Circular() {
    this.x = 0;
    this.y = 0;
    this.setX = function(newValue) {
        this.x = newValue;
    };
    this.setY = function(newValue) {
        this.y = newValue
    };
    this.createRipple = function(tagName = 'span') {
        let span = document.createElement(tagName)
        ripple_utill.addClass(span, 'md-ripple')
        span.style.width = 2 * this.r + 'px';
        span.style.height = 2 * this.r + 'px';
        span.style.backgroundColor = this.color;
        span.style.animationDuration = this.time;
        return span
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
            Circular.prototype.MaxNum = obj.MaxNum || Circular.prototype.MaxNum
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
            let wrapper = this.createRippleWrapper(circular)
            buttonList[i].appendChild(wrapper)
            buttonList[i].addEventListener('click', (event) => {
                this.reppleClick(event, buttonList[i], circular, this.createRippleChildNode(circular, wrapper));
            })

        }
    };
    createRippleWrapper(circular) {
        //在button下创建一个div作为wrapper，默认有一个span.
        let div = document.createElement('div')
        ripple_utill.addClass(div, 'md-wrapper')
        let span = circular.createRipple('span')
        span.addEventListener('animationend', function(event) {
            ripple_utill.removeClass(this, 'animate')
        })
        div.appendChild(span);
        return div;
    };
    createRippleChildNode(circular, wrapper) {
        //创建wrapper子节点span时，判断wrapper下是否有span空闲(动画停止)，空闲则重用，所有都没有则新建span。
        let childrenList = wrapper.children;
        for (let i = 0; i < childrenList.length; i++) {
            let flag = ripple_utill.hasClass(childrenList[i], 'animate')
            if (flag == null) { //动画已经停止了
                ripple_utill.addClass(childrenList[i], 'md-ripple')
                return childrenList[i];
            } else if (flag != null && i === childrenList.length - 1 && circular.MaxNum >= childrenList.length) { //最后一个span && 动画没有停止&& 没有超过最多个数
                let span = circular.createRipple('span');
                span.addEventListener('animationend', function(event) {
                    //新建的span在动画结束后，从wrapper中移除
                    wrapper.removeChild(this)
                })
                wrapper.appendChild(span);
                return span;
            }
        }
        return childrenList[0];
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
    }
}