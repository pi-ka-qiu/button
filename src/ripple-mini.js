/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./ripple.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./ripple.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0)
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
        /*this.documentAddListener()*/
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
            ripple_utill.removeClass(span, this.CIRCULAR.animationCName);
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
                    //新建的span在动画结束后，如果全部span空闲，并且鼠标移出。则新建的span从wrapper中移除
                    ripple_utill.removeClass(span, this.CIRCULAR.animationCName);
                    this.removeRipple(wrapper);
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
        if (circular.x + 'px' === ripple.style.left && ripple.style.top === circular.y + 'px') {
            console.log('点击位置相同');
        } else {
            ripple.style.left = circular.x + 'px';
            ripple.style.top = circular.y + 'px';

        }
        ripple_utill.addClass(ripple, this.CIRCULAR.animationCName);
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
window.Ripple = Ripple;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "@keyframes ripple {\n    0% {\n        opacity: 1;\n    }\n    99% {\n        opacity: 1;\n    }\n    100% {\n        opacity: 0;\n        transform: scale(5);\n    }\n}\n\n\n/*决定水波纹的动画*/\n\n.ripple-animate {\n    animation: ripple 0.65s linear;\n    animation-fill-mode: forwards;\n    border-radius: 50%;\n}\n\n\n/*决定水波纹的位置*/\n\n.md-wrapper {\n    display: block;\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    overflow: hidden;\n}\n\n.md-ripple {\n    position: absolute;\n    left: 0;\n    top: 0;\n    display: inline-block;\n    height: 20px;\n    width: 20px;\n    opacity: 0;\n    border-radius: 50%;\n}", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);