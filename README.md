# react-blog

## 介绍
个人博客网站

由于该项目是本人第一次使用`react`所建项目，所以有些地方代码不尽如人意，请自行斟酌使用

技术栈主要包括`react`,`redux`,`axios`,`sass`

## 网站效果
![主页](https://github.com/leedalei/react-blog/blob/master/%E6%95%88%E6%9E%9C%E5%9B%BE/1.png)
![书籍](https://github.com/leedalei/react-blog/blob/master/%E6%95%88%E6%9E%9C%E5%9B%BE/2.png)
![行博](https://github.com/leedalei/react-blog/blob/master/%E6%95%88%E6%9E%9C%E5%9B%BE/3.png)
![简介](https://github.com/leedalei/react-blog/blob/master/%E6%95%88%E6%9E%9C%E5%9B%BE/4.png)


## 项目结构
```
src
|--components 储存组件，一些早期的组件js和css分开了，比较尴尬
|  |--fonts 一些markdown文件用到的字体，后续版本已经废弃
|  |--icon-font 字体图标
|  |--http 封装axios请求
|  |--js 封装的js工具
|  |--pages 主要页面
|  |--store redux的相关文件
|  |--styles 样式文件
|  |--index.css 全局公用css
|  |--router.js 路由配置
|  |--index.js 入口js
```
## 数据
所有数据来源为fastmock,代理也是代理到了fastmock的链接。注意：这是`在线mock`


## 使用
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

## 其他一些说明
- 接口我有些留下了参数没有删除，其实mock数据用不到这些参数，我只是想提醒你，如果你自己写后台的话，那么这些参数你可以参考使用。
- 小白提醒：打包后代理是不可以用的哦，访问不到数据的嗷
- npm install安装过程中node-sass可能安装报错，请自行百度解决，或者直接使用cnpm安装
- 为什么component里有些是文件夹有些是单文件？淦，刚开始傻逼了分开放，应该把相应的组件js和css放在同一个文件夹里