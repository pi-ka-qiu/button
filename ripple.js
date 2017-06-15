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
        /**
         * @param {Element} ele
         * @param {Int} noRM 不需要删除的子元素 index
         */
        removeAllChild: function(ele, noRM) {
            let childrenList = ele.children;
            for (let i = childrenList.length - 1; i >= 0; i--) {
                if (noRM === i) { continue }
                ele.removeChild(childrenList[i]);
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
     * r： 12 r默认是自动计算，有传入时使用自定义值;
     * time： 1000 
     * rippleMultiple: true  是否出现多个水波纹
     * MaxNum：3 最多出现多少个水波纹
     * center: true 水波纹出现的位置
     */
Circular.prototype = {
    r: 20,
    cName: 'md-button',
    color: 'rgba(0, 0, 0, 0.3)',
    time: '0.5s',
    MaxNum: 5,
    animationCName: 'ripple-animate',
    wrapperCName: 'md-wrapper',
    center: false,
    zIndex: null,
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
        this.CIRCULAR = new Circular();
        this.mouseFLAG = false; //是否可以移除
        this.animateFLAG = false; //是否可以移除, 只有集齐两个flag才能移除
        this.buttonList = null;
        this.init(obj);
        this.documentAddListener()
        this.buttonAddClickEvent();
    }
    init(obj) {

        if (!ripple_utill.isEmptyObject(obj)) {

            this.CIRCULAR.cName = obj.cName || this.CIRCULAR.cName
            this.CIRCULAR.center = obj.center || this.CIRCULAR.center
            this.CIRCULAR.r = obj.r || this.computedR()
            this.CIRCULAR.color = obj.color || this.CIRCULAR.color
            this.CIRCULAR.time = obj.time || this.CIRCULAR.time
            this.CIRCULAR.MaxNum = obj.MaxNum || this.CIRCULAR.MaxNum
            this.CIRCULAR.zIndex = obj.zIndex || this.CIRCULAR.zIndex
        }
    };
    //为所有按钮添加监听，添加span
    buttonAddClickEvent() {
        //创建button下的 span
        this.buttonList = document.getElementsByClassName(this.CIRCULAR.cName);
        for (let i = 0; i < this.buttonList.length; i++) {
            //let circular = new Circular()
            //将所有按钮设置为相对定位
            this.buttonList[i].style.position = 'relative'
            let wrapper = this.createRippleWrapper(this.CIRCULAR)
            this.buttonList[i].appendChild(wrapper)
                //添加点击监听，创建span
            this.buttonList[i].addEventListener('click', (event) => {
                    this.mouseFLAG = false;
                    this.animateFLAG = false;
                    this.reppleClick(event, this.buttonList[i], this.CIRCULAR, this.createRippleChildNode(wrapper));
                })
                //添加鼠标移出 监听。设置span为可移除状态
            this.buttonList[i].addEventListener('mouseleave', (event) => {
                this.mouseFLAG = true;
                this.removeRipple(wrapper)
            })

        }
    };
    documentAddListener() {
        document.addEventListener('touchstart', (touch) => {
            let flag = ripple_utill.hasClass(touch.target, this.CIRCULAR.cName);
            console.log(flag)
        })
    }
    createRippleWrapper(circular) {
        //在button下创建一个div作为wrapper，默认有一个span.
        let div = document.createElement('div')
        if (circular.zIndex != null) {
            div.style.zIndex = circular.zIndex;
        }
        ripple_utill.addClass(div, this.CIRCULAR.wrapperCName)
        let span = circular.createRipple('span')
        span.addEventListener('animationend', (event) => {
            this.animateFLAG = true;
            ripple_utill.removeClass(span, this.CIRCULAR.animationCName)
                //ripple_utill.removeAllChild(div, 0);
        })
        div.appendChild(span);
        return div;
    };
    createRippleChildNode(wrapper) {
        //创建wrapper子节点span时，判断wrapper下是否有span空闲(动画停止)，空闲则重用，所有都没有则新建span。
        let childrenList = wrapper.children;
        for (let i = 0; i < childrenList.length; i++) {
            let flag = ripple_utill.hasClass(childrenList[i], this.CIRCULAR.animationCName)
            if (flag == null) { //动画已经停止了
                ripple_utill.addClass(childrenList[i], 'md-ripple')
                return childrenList[i];
            } else if (flag != null && i === childrenList.length - 1 && this.CIRCULAR.MaxNum > childrenList.length) { //最后一个span && 动画没有停止&& 没有超过最多个数
                let span = this.CIRCULAR.createRipple('span');
                span.addEventListener('animationend', (event) => {
                    this.animateFLAG = true;
                    //新建的span在动画结束后，如果全部span空闲，则自身从wrapper中移除
                    ripple_utill.removeClass(span, this.CIRCULAR.animationCName)
                        //wrapper.removeChild(span)
                    this.removeRipple(wrapper)
                    console.log(event)
                })
                wrapper.appendChild(span);
                return span;
            }
        }
        return childrenList[0];
    };
    /**
     * 
     * @param {Element} wrapper 
     */
    freeElementCount(wrapper) {
        let count = 0;
        let childrenList = wrapper.children;
        for (let i = 0; i < childrenList.length; i++) {
            let flag = ripple_utill.hasClass(childrenList[i], this.CIRCULAR.animationCName)
            if (flag == null) { //动画已经停止了
                count++;
            }
        }
        return count;
    };
    /**
     * 鼠标点击时，设置span的位置
     * @param {} event 
     * @param {Button} button 
     * @param {Circular} circular 
     * @param {Element} ripple 
     */
    reppleClick(event, button, circular, ripple) {
        this.computedCircleCenter(event, button);
        //当span与原来的位置相同时，不改变位置
        if (circular.x + 'px' != ripple.style.left && ripple.style.top != circular.y + 'px') {
            ripple.style.left = circular.x + 'px';
            ripple.style.top = circular.y + 'px';
        } else {
            console.log('点击位置相同')
        }
        ripple_utill.addClass(ripple, this.CIRCULAR.animationCName)
    };
    /**
     * 计算并设置圆心的位置
     * @param {Event} event 
     * @param {Button} button 
     */
    computedCircleCenter(event, button) {
        let positionX = 0
        let positionY = 0;
        if (this.CIRCULAR.center) {
            /**按钮的中心位置  x= width/2  y= height/2 **/
            let relativeX = button.offsetWidth / 2;
            let relativeY = button.offsetHeight / 2;
            positionX = relativeX - this.CIRCULAR.r;
            positionY = relativeY - this.CIRCULAR.r;
        } else {
            /**点击的坐标相对与按钮的位置 = 点击的位置 - 获取按钮的位置 
             * x = 按钮x轴位置 - R
             */
            let relativeX = event.clientX - button.offsetLeft;
            let relativeY = event.clientY - button.offsetTop;
            positionX = relativeX - this.CIRCULAR.r;
            positionY = relativeY - this.CIRCULAR.r;
        }
        //对数字取整
        this.CIRCULAR.setX(parseInt(positionX));
        this.CIRCULAR.setY(parseInt(positionY));
    };
    //计算半径
    computedR() {
        let button = document.getElementsByClassName(this.CIRCULAR.cName)[0];
        let MaxR = button.clientHeight > button.clientWidth ? button.clientHeight : button.clientWidth;
        if (this.CIRCULAR.center) {
            return Math.ceil(MaxR / 5 / 2)
        }
        return Math.ceil(MaxR / 5);
    };
    /**
     * 移除span：
     * pc端：当鼠标移出button并且动画停止时，移除创建的span。
     * 移动端：点击button以外的地方并且动画停止时，移除span。
     */
    removeRipple(wrapper) {
        //如果可以移除span
        if (this.mouseFLAG && this.animateFLAG) {
            let count = this.freeElementCount(wrapper);
            if (count === wrapper.children.length) {
                ripple_utill.removeAllChild(wrapper, 0);
            }
        }
    }

}