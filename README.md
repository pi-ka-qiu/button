# Overview
使用JavaScript制作 水波纹 特效。

## Import using script tag

``` HTML
<link rel="stylesheet" href="./ripple.css" charset="utf-8">
<script src="./ripple.js"></script>
```

# Options

可选参数

| Option | Description |
| ----- | ----- |
| cName | element的className，默认为 "md-button" |
| r | 水波纹最小半径，不传此参数则为自动计算|
| color | 水波纹颜色 默认为：rgba(0, 0, 0, 0.3)|
| time | animation的时间 默认为：0.5s|
| MaxNum | 水波纹的最大数量 默认为：5|
| center |  水波纹的圆心。默认为：false|
| zIndex | 设置z-index 默认为：null,当水波纹被覆盖时，可以使用此参数|

# Usage
```HTML
<button class="md-button">文字</button>
```
```JavaScript
new Ripple({
        cName: 'md-button',
        color: 'red',
        time: '0.5s',
        MaxNum: 5
    })
```
# Demo
[demo](https://github.com/Ge-Ge/button/blob/master/demo.html) 
