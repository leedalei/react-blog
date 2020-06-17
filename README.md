# react-blog
个人博客网站，最近要做一次大更新，因此把第一版比较旧的版本拿出来给大家分享。
由于该项目是本人第一次使用`react`所建项目，所以有些地方代码不尽如人意，请自行斟酌使用

# 网站效果
[主页](./效果图/1.png)
[书籍](./效果图/2.png)
[行博](./效果图/3.png)
[简介](./效果图/4.png)


# 项目结构(只介绍下src下的了)
|-components 储存组件，一些早期的组件js和css分开了，比较尴尬
  |-fonts 一些markdown文件用到的字体，后续版本已经废弃
  |-icon-font 字体图标
  |-http 封装axios请求
  |-js 封装的js工具
  |-pages 主要页面
  |-store redux的相关文件
  |-styles 样式文件
  |-index.css 全局公用css
  |-router.js 路由配置
  |-index.js 入口js

# 数据
所有数据来源为fastmock,代理也是代理到了fastmock的链接。


# 使用
1. 安装依赖
  ```
  npm install
  ```
2. 开发环境启动
  ```
  npm run dev
  ```
3. 打包
  ```
  npm run build
  ```