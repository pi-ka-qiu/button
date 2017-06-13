# Overview
使用JavaScript制作 水波纹 特效。

## Import using script tag

``` HTML
<link rel="stylesheet" href="./ripple.css" charset="utf-8">
<script src="./ripple.js"></script>
```

```JavaScript
new Ripple({
        cName: 'md-button',
        r: 10,
        color: 'red',
        time: '0.5s',
        MaxNum: 5
    })
