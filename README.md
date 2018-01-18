### react-koa2-ssr 
基于create-react-app 和 koa2 脚手架 搭建的 react 服务端渲染项目骨架

### start

git clone https://github.com/yangfan0095/react-koa2-ssr

npm install 

前端开发 
cd client 
npm run sart

服务端运行

先在客户端执行打包
cd client 

npm run build

进入服务端文件目录
cd server

npm run start

### 项目持续开发中...

欢迎 watch 欢迎star 交流


###  项目总结

#### react 服务端渲染梳理
* react 服务端渲染的条件
* 模板引擎
* react-router4.x 与koa2.x 路由实现同构
* redux 初始数据同构

#### 前言
 前面做了一个简单的古文网，但是项目是使用React SPA 渲染的，不利于SEO，便有了服务端渲染这个需求。 这里我想说一些同构渲染的有点和缺点，关于服务端渲染的优缺点，vue官方文档讲的最清楚，https://ssr.vuejs.org/zh/ 。 对于大部分场景最主要还是两点 1是提高首屏加载速度 2 是方便SEO.为了快速构建开发环境，于是客户端直接使用create-react-app 构建了一个客户端开发环境 ，在同级目录使用koa2.x项目脚手架生成了一个简单的koa2.x项目，作为服务端开发环境。整个项目便是以此作为基点进行开发的，目前也只是完成了最基本的需求， 还有很多Bug 和可以优化的地方， 欢迎交流。

#### 服务端渲染最基本的理论知识梳理
其实可以看 《深入React技术栈》的第七章， 介绍的非常详细。
概括来说 React 之所以可以做到服务端渲染 是因为ReactDOM提供了服务端渲染的API 
* renderToString  把一个react 元素转换成带reactid的html字符串。浏览器端接收到这段html以后不会重新去渲染DOM树，只是去做事件绑定等操作。这样就提高了首屏加载的性能。
* renderToStaticMarkup 转换成不带reactid的html字符串，如果是静态文本，用这个方法会减少大批的reactid.



 
 





