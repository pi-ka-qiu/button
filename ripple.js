'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var ripple_utill = {
    isEmptyObject: function isEmptyObject(obj) {
        for (var i in obj) {
            return false;
        }
        return true;
    },

    hasClass: function hasClass(ele, className) {
        return ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    },

    addClass: function addClass(ele, className) {
        if (!this.hasClass(ele, className)) {
            ele.className += " " + className;
        }
        console.log('--addClass--');
    },

    removeClass: function removeClass(ele, className) {
        if (this.hasClass(ele, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            ele.className = ele.className.replace(reg, '');
        }
    },
    /**
     * @param {Element} ele
     * @param {Int} noRM 不需要删除的子元素 index
     */
    removeAllChild: function removeAllChild(ele, noRM) {
        var childrenList = ele.children;
        for (var i = childrenList.length - 1; i >= 0; i--) {
            if (noRM === i) {
                continue;
            }
            ele.removeChild(childrenList[i]);
        }
    },
    browserSupportEvent: function browserSupportEvent(eventName) {
        return eventName in window;
    },
    /**
     * @param {Element} ele
     */
    aniEndName: function aniEndName(ele) {
        var eleStyle = ele.style;
        var verdors = ['a', 'webkitA', 'MozA', 'OA', 'msA'];
        var endEvents = ['animationend', 'webkitAnimationEnd', 'animationend', 'oAnimationEnd', 'MSAnimationEnd'];
        var animation = void 0;
        for (var i = 0, len = verdors.length; i < len; i++) {
            animation = verdors[i] + 'nimation';
            if (animation in eleStyle) {
                return endEvents[i];
            }
        }
        return 'animationend';
    },
    animationSupport: function animationSupport() {
        var eleStyle = document.createElement('span').style;
        var verdors = ['a', 'webkitA', 'MozA', 'OA', 'msA'];
        var endEvents = ['animationend', 'webkitAnimationEnd', 'animationend', 'oAnimationEnd', 'MSAnimationEnd'];
        var animation = void 0;
        for (var i = 0, len = verdors.length; i < len; i++) {
            animation = verdors[i] + 'nimation';
            if (animation in eleStyle) {
                return true;
            }
        }
        return false;
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
};
Circular.prototype = {
    r: 20,
    cName: 'md-button',
    color: 'rgba(0, 0, 0, 0.3)',
    time: '0.5s',
    MaxNum: 5,
    animationCName: 'ripple-animate',
    wrapperCName: 'md-wrapper',
    center: false,
    zIndex: null
};

function Circular() {
    this.x = 0;
    this.y = 0;
    this.setX = function (newValue) {
        this.x = newValue;
    };
    this.setY = function (newValue) {
        this.y = newValue;
    };
    this.createRipple = function () {
        var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'span';

        var span = document.createElement(tagName);
        ripple_utill.addClass(span, 'md-ripple');
        span.style.width = 2 * this.r + 'px';
        span.style.height = 2 * this.r + 'px';
        span.style.backgroundColor = this.color;
        span.style.animationDuration = this.time;
        return span;
    };
}

var Ripple = function () {
    function Ripple(obj) {
        _classCallCheck(this, Ripple);

        if (ripple_utill.animationSupport()) {
            this.CIRCULAR = new Circular();
            this.mouseFLAG = false; //是否可以移除
            this.animateFLAG = false; //是否可以移除, 只有集齐两个flag才能移除
            this.buttonList = null;
            this._init(obj);
            /*this.documentAddListener()*/
            this._buttonAddClickEvent();
            this.animationend = ripple_utill.aniEndName(this.buttonList[0]); //animationend兼容问题
        }
    }

    _createClass(Ripple, [{
        key: '_init',
        value: function _init(obj) {

            if (!ripple_utill.isEmptyObject(obj)) {

                this.CIRCULAR.cName = obj.cName || this.CIRCULAR.cName;
                this.CIRCULAR.center = obj.center || this.CIRCULAR.center;
                this.CIRCULAR.r = obj.r || this._computedR();
                this.CIRCULAR.color = obj.color || this.CIRCULAR.color;
                this.CIRCULAR.time = obj.time || this.CIRCULAR.time;
                this.CIRCULAR.MaxNum = obj.MaxNum || this.CIRCULAR.MaxNum;
                this.CIRCULAR.zIndex = obj.zIndex || this.CIRCULAR.zIndex;
            }
        }
    }, {
        key: '_buttonAddClickEvent',

        //为所有按钮添加监听，添加span
        value: function _buttonAddClickEvent() {
            var _this = this;

            //创建button下的 span
            this.buttonList = document.getElementsByClassName(this.CIRCULAR.cName);

            var _loop = function _loop(i) {
                //let circular = new Circular()
                //将所有按钮设置为相对定位
                _this.buttonList[i].style.position = 'relative';
                var wrapper = _this._createRippleWrapper(_this.CIRCULAR);
                _this.buttonList[i].appendChild(wrapper);
                //添加点击监听，创建span
                _this.buttonList[i].addEventListener('click', function (event) {
                    _this.mouseFLAG = false;
                    _this.animateFLAG = false;
                    _this._reppleClick(event, _this.buttonList[i], _this.CIRCULAR, _this._createRippleChildNode(wrapper));
                });
                //添加鼠标移出 监听。设置span为可移除状态
                _this.buttonList[i].addEventListener('mouseleave', function (event) {
                    _this.mouseFLAG = true;
                    _this._removeRipple(wrapper);
                });
            };

            for (var i = 0; i < this.buttonList.length; i++) {
                _loop(i);
            }
        }
    }, {
        key: 'documentAddListener',
        value: function documentAddListener() {
            var _this2 = this;

            document.addEventListener('touchstart', function (touch) {
                var flag = ripple_utill.hasClass(touch.target, _this2.CIRCULAR.cName);
                console.log(flag);
            });
        }
    }, {
        key: '_createRippleWrapper',
        value: function _createRippleWrapper(circular) {
            var _this3 = this;

            //在button下创建一个div作为wrapper，默认有一个span.
            var div = document.createElement('div');
            if (circular.zIndex != null) {
                div.style.zIndex = circular.zIndex;
            }
            ripple_utill.addClass(div, this.CIRCULAR.wrapperCName);
            var span = circular.createRipple('span');
            span.addEventListener(this.animationend, function (event) {
                _this3.animateFLAG = true;
                ripple_utill.removeClass(span, _this3.CIRCULAR.animationCName);
            });
            div.appendChild(span);
            return div;
        }
    }, {
        key: '_createRippleChildNode',
        value: function _createRippleChildNode(wrapper) {
            var _this4 = this;

            //创建wrapper子节点span时，判断wrapper下是否有span空闲(动画停止)，空闲则重用，所有都没有则新建span。
            var childrenList = wrapper.children;
            for (var i = 0; i < childrenList.length; i++) {
                var flag = ripple_utill.hasClass(childrenList[i], this.CIRCULAR.animationCName);
                if (flag == null) {
                    //动画已经停止了
                    ripple_utill.addClass(childrenList[i], 'md-ripple');
                    return childrenList[i];
                } else if (flag != null && i === childrenList.length - 1 && this.CIRCULAR.MaxNum > childrenList.length) {
                    var _ret2 = function () {
                        //最后一个span && 动画没有停止&& 没有超过最多个数
                        var span = _this4.CIRCULAR.createRipple('span');
                        span.addEventListener(_this4.animationend, function (event) {
                            _this4.animateFLAG = true;
                            //新建的span在动画结束后，如果全部span空闲，并且鼠标移出。则新建的span从wrapper中移除
                            ripple_utill.removeClass(span, _this4.CIRCULAR.animationCName);
                            _this4._removeRipple(wrapper);
                        });
                        wrapper.appendChild(span);
                        return {
                            v: span
                        };
                    }();

                    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
                }
            }
            return childrenList[0];
        }
    }, {
        key: '_freeElementCount',

        /**
         * 
         * @param {Element} wrapper 
         */
        value: function _freeElementCount(wrapper) {
            var count = 0;
            var childrenList = wrapper.children;
            for (var i = 0; i < childrenList.length; i++) {
                var flag = ripple_utill.hasClass(childrenList[i], this.CIRCULAR.animationCName);
                if (flag == null) {
                    //动画已经停止了
                    count++;
                }
            }
            return count;
        }
    }, {
        key: '_reppleClick',

        /**
         * 鼠标点击时，设置span的位置
         * @param {} event 
         * @param {Button} button 
         * @param {Circular} circular 
         * @param {Element} ripple 
         */
        value: function _reppleClick(event, button, circular, ripple) {
            this._computedCircleCenter(event, button);
            //当span与原来的位置相同时，不改变位置
            if (circular.x + 'px' === ripple.style.left && ripple.style.top === circular.y + 'px') {
                console.log('点击位置相同');
            } else {
                ripple.style.left = circular.x + 'px';
                ripple.style.top = circular.y + 'px';
            }
            ripple_utill.addClass(ripple, this.CIRCULAR.animationCName);
        }
    }, {
        key: '_computedCircleCenter',

        /**
         * 计算并设置圆心的位置
         * @param {Event} event 
         * @param {Button} button 
         */
        value: function _computedCircleCenter(event, button) {
            var positionX = 0;
            var positionY = 0;
            if (this.CIRCULAR.center) {
                /**按钮的中心位置  x= width/2  y= height/2 **/
                var relativeX = button.offsetWidth / 2;
                var relativeY = button.offsetHeight / 2;
                positionX = relativeX - this.CIRCULAR.r;
                positionY = relativeY - this.CIRCULAR.r;
            } else {
                /**点击的坐标相对与按钮的位置 = 点击的位置 - 获取按钮的位置 
                 * x = 按钮x轴位置 - R
                 */
                var _relativeX = event.pageX - button.offsetLeft;
                var _relativeY = event.pageY - button.offsetTop;
                positionX = _relativeX - this.CIRCULAR.r;
                positionY = _relativeY - this.CIRCULAR.r;
            }
            //对数字取整
            this.CIRCULAR.setX(parseInt(positionX));
            this.CIRCULAR.setY(parseInt(positionY));
        }
    }, {
        key: '_computedR',

        //计算半径
        value: function _computedR() {
            var button = document.getElementsByClassName(this.CIRCULAR.cName)[0];
            var MaxR = button.clientHeight > button.clientWidth ? button.clientHeight : button.clientWidth;
            if (this.CIRCULAR.center) {
                return Math.ceil(MaxR / 5 / 2);
            }
            return Math.ceil(MaxR / 5);
        }
    }, {
        key: '_removeRipple',

        /**
         * 移除span：
         * pc端：当鼠标移出button并且动画停止时，移除创建的span。
         * 移动端：点击button以外的地方并且动画停止时，移除span。
         */
        value: function _removeRipple(wrapper) {
            //如果可以移除span
            if (this.mouseFLAG && this.animateFLAG) {
                var count = this._freeElementCount(wrapper);
                if (count === wrapper.children.length) {
                    ripple_utill.removeAllChild(wrapper, 0);
                }
            }
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.CIRCULAR.r = this._computedR();
            var spanList = document.getElementsByClassName('md-ripple');
            for (var i = 0; i < spanList.length; i++) {
                spanList[i].style.width = 2 * this.CIRCULAR.r + 'px';
                spanList[i].style.height = 2 * this.CIRCULAR.r + 'px';
            }
        }
    }]);

    return Ripple;
}();