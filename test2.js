//圆
    var circular = {
        r: 5,
        x: 0,
        y: 0,
        color: '#fff',
        setX: function (newValue) {
            this.x = newValue;
        },
        setY: function (newValue) {
            this.y = newValue
        },
    }
    var button = document.getElementsByClassName('md-button')[0];
    button.addEventListener('click', reppleClick);
    var ripple = document.getElementsByClassName('md-ripple')[0];
    function reppleClick(event) {
        /*相对于 按钮的点击坐标
        点击的位置 - 获取按钮的位置 
        */
        let relativeX =  event.clientX - button.offsetLeft;
        let relativeY =  event.clientY - button.offsetTop;
        //圆变大后的半径 获取按钮的宽度、高度
        //circular.r = button.clientHeight > button.clientWidth? button.clientHeight: button.clientWidth;
        let positionX = relativeX - circular.r ;
        let positionY = relativeY - circular.r;

        circular.setX(positionX);
        circular.setY(positionY);

        ripple.style.left = circular.x +'px';
        ripple.style.top = circular.y + 'px';
        addClass(ripple,'animate')
        setTimeout(function (){removeClass(ripple,'animate')},1000)

    }

    function hasClass(ele, className) {
        return ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
    function addClass(ele, className) {
        if (!this.hasClass(ele, className)) { ele.className += " " + className; }
    }
    function removeClass(ele, className) {
         if (hasClass(ele, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }  
     }
