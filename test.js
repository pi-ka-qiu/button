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
        this.CIRCULAR = new Circular()
        if (!ripple_utill.isEmptyObject(obj)) {
            this.CIRCULAR.r = obj.r || this.CIRCULAR.r
            this.CIRCULAR.cName = obj.cName || this.CIRCULAR.cName
            this.CIRCULAR.color = obj.color || this.CIRCULAR.color
            this.CIRCULAR.time = obj.time || this.CIRCULAR.time
            this.CIRCULAR.MaxNum = obj.MaxNum || this.CIRCULAR.MaxNum
        }
    };
    //为所有按钮添加监听，添加span
    buttonAddClickEvent() {
        //创建button下的 span
        let buttonList = document.getElementsByClassName(this.CIRCULAR.cName);
        for (let i = 0; i < buttonList.length; i++) {
            //let circular = new Circular()
            //将所有按钮设置为相对定位
            //let t = buttonList[i].style.position = 'relative'
            let wrapper = this.createRippleWrapper(this.CIRCULAR)
            buttonList[i].appendChild(wrapper)
            buttonList[i].addEventListener('click', (event) => {
                this.reppleClick(event, buttonList[i], this.CIRCULAR, this.createRippleChildNode(wrapper));
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
    createRippleChildNode(wrapper) {
        //创建wrapper子节点span时，判断wrapper下是否有span空闲(动画停止)，空闲则重用，所有都没有则新建span。
        let childrenList = wrapper.children;
        for (let i = 0; i < childrenList.length; i++) {
            let flag = ripple_utill.hasClass(childrenList[i], 'animate')
            if (flag == null) { //动画已经停止了
                ripple_utill.addClass(childrenList[i], 'md-ripple')
                return childrenList[i];
            } else if (flag != null && i === childrenList.length - 1 && this.CIRCULAR.MaxNum >= childrenList.length) { //最后一个span && 动画没有停止&& 没有超过最多个数
                let span = this.CIRCULAR.createRipple('span');
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

        let positionX = relativeX - circular.r;
        let positionY = relativeY - circular.r;

        circular.setX(positionX);
        circular.setY(positionY);

        ripple.style.left = circular.x + 'px';
        ripple.style.top = circular.y + 'px';
        ripple_utill.addClass(ripple, 'animate')
    }
}