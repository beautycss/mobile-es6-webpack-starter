# mobile-es6-webpack-starter
基于Webpack和ES6的移动端单页面脚手架工程，也可以稍作修改用于PC端单页面应用。
* 不依赖于任何JS框架
* 简单封装了JS选择器和一些公用函数
* 自带表单demo

# 目录结构
```
├── app                         // app目录
│   ├── assets                  // 静态资源目录
│   ├── css
│       ├── component.css       // 组件样式
│       ├── global.css          // 全局样式
│       └── page.css            // 页面样式
│   ├── js
│       ├── common              // 公用JS目录
│       ├── component           // JS组件目录
│       ├── index.js            // 入口JS
│       └── main.js             // 页面JS
│   └── index.html              // HTML页面
├── ...
```

# webpack说明
1. webpack已根据app目录配置好，无需修改app及其子目录结构。
2. 构建后的页面在`dist`目录下，并已将代码里引用的`assets`资源路径自动替换为相对路径。

![Screen Shot](screenshot.png)
