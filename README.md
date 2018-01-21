### react-koa2-ssr 
基于create-react-app 和 koa2 脚手架 搭建的 react 服务端渲染项目骨架

## start

git clone https://github.com/yangfan0095/react-koa2-ssr

npm install 

#### 客户端运行 

npm run start

#### 服务端运行

先执行客户端打包在运行server (个人推荐使用vscode作为服务端开发工具)

npm run build 

npm run server

### 项目持续开发中...

感谢 watch 欢迎star 交流


##  项目总结

### react 服务端渲染梳理
* react 服务端渲染的条件
* react-router4.x 与koa2.x 路由实现同构
* redux 初始数据同构

#### 前言
 前面做了一个简单的古文网，但是项目是使用React SPA 渲染的，不利于SEO，便有了服务端渲染这个需求。 这里我想说一些同构渲染的有点和缺点，关于服务端渲染的优缺点，[vue服务端渲染官方文档](https://ssr.vuejs.org/zh/ )讲的最清楚，。 对于大部分场景最主要还是两点 1是提高首屏加载速度 2 是方便SEO.为了快速构建开发环境，于是客户端直接使用create-react-app 构建了一个客户端开发环境 ，在同级目录使用koa2.x项目脚手架生成了一个简单的koa2.x项目，作为服务端开发环境。整个项目便是以此作为基点进行开发的，目前也只是完成了最基本的需求， 还有很多Bug 和可以优化的地方， 欢迎交流。

### 服务端渲染最基本的理论知识梳理
#### react 服务端渲染的条件
其实可以看 《深入React技术栈》的第七章， 介绍的非常详细。
概括来说 React 之所以可以做到服务端渲染 是因为ReactDOM提供了服务端渲染的API 
* renderToString  把一个react 元素转换成带reactid的html字符串。
* renderToStaticMarkup 转换成不带reactid的html字符串，如果是静态文本，用这个方法会减少大批的reactid.
这两个方法的存在 ，实际上可以把react看做是一个模板引擎。解析jsx语法变成普通的html字符串。 

我们可以调用这两个API 实现传入ReactComponent 返回对应的html字符串到客户端。浏览器端接收到这段html以后不会重新去渲染DOM树，只是去做事件绑定等操作。这样就提高了首屏加载的性能。


#### react-router4.x  和 服务端的路由实现同构。
react-router4.x 相对于之前的版本，做了较大的改动。 整个路由变得组件化了。
可以着重看这里 官方给出了详细的[例子和文档]( https://reacttraining.com/react-router/web/guides/server-rendering)可以作为基本思想的和标准参考。

服务端渲染与客户端渲染的不同之处在于其路由是没有状态的，所以我们需要通过一个无状态的router组件 来包裹APP，通过服务端请求的url来匹配到具体的路由数组和其相关属性。
所以我们在客户端使用 BrowserRouter，服务端则使用无状态的 StaticRouter。
* BrowserRouter 使用 HTML5 提供的 history API (pushState, replaceState 和 popstate 事件) 来保持 UI 和 URL 的同步。
* StaticRouter 是一个不会改变地址的router组件 。

我们把koa的路由url传入 <StaticRouter /> ,后者会根据url 自动匹配对应的React组件，这样我们就能实现，刷新页面，服务端返回的对应路由组件与客户端一致。

参考代码如下所示：

```
// 服务端路由配置
import { createServer } from 'http'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'

createServer((req, res) => {
  const context = {}

  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App/>
    </StaticRouter>
  )

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    })
    res.end()
  } else {
    res.write(`
      <!doctype html>
      <div id="app">${html}</div>
    `)
    res.end()
  }
}).listen(3000)
And then the client:import ReactDOM from 'react-dom'

// 客户端路由配置
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('app'))

```


#### Redux 服务端同构
首先看一下官方文档的介绍吧 http://cn.redux.js.org/docs/recipes/ServerRendering.html.
其处理步骤如下：
* 1 我们根据对应的服务端请求API 得到对应的异步方法获取到异步数据。
* 2 使用异步数据生成一个初始化的store `const store = createStore(counterApp, preloadedState)`,
* 3 然后调用`const finalState = store.getState()`方法获取到store的初始化state.
* 4 将初始的initState 作为参数传递到客户端
* 5 客户端初始化的时候回去判断 window.__INITIAL_STATE__ 下面是否有数据，如果有则作为初始数据重新生成一个客户端的store.
如下面代码所示。

服务端 
```
 <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(finalState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>    
```
客户端
```
...
// 通过服务端注入的全局变量得到初始 state
const preloadedState = window.__INITIAL_STATE__

// 使用初始 state 创建 Redux store
const store = createStore(counterApp, preloadedState)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
这个基本上就是一个标准的redux同构流程， 其实更多的官方是在给我们提供一种标准化的思路，我们可以顺着这个做更多的优化。
首先我们并不需要直接通过API作为映射 服务端和客户端各搞一套异步加载的方法，这样显得非常冗余。
react-router 包里面提供了[react-router-config](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config)主要用于静态路由配置。
提供的 matchRoutes API可以根据传入的url 返回对应的路由数组。我们可以通过这个方法在服务端直接访问到对应的React组件。 如果要从路由中直接获取异步方法，我看了很多类似的同构方案，
* 主要有两种方式一种是直接在路由中增加一个thunk方法，通过这个方法直接去获取初始化的异步数据，
我觉得优点是比较明确直观，直接在路由层就把这个事情解决了。
* 第二种是利用class 的静态方法。我们可以通过路由访问到组件的类下面的static方法。 这样我们就直接可以在容器组件内部同时声明服务端初始化方法和客户端初始化方法了 这样处理的层级放到了组件里面我自己觉得更能体现组件的独立性吧。

本项目采用了第二种方案，先看一下代码：
```

/**
 * 渲染服务端路由
 */
module.exports.render = async(ctx,next) =>{
    const { store ,history} = getCreateStore(ctx);
    const branch = matchRoutes(router, ctx.req.url);
    const promises = branch.map(({route}) => {
        const fetch = route.component.fetch;
        return fetch instanceof Function ? fetch(store) : Promise.resolve(null)
    });
    await Promise.all(promises).catch((err)=>{
        console.log(err);
    }); 

    const html = ReactDOMServer.renderToString(
                <Provider store={store}>
                            <StaticRouter
                            location={ctx.url}
                            context={{}}>
                                <App/>
                            </StaticRouter>
                </Provider>
        )
        let initState=store.getState();
        const body =  layout(html,initState);
   ctx.body =body;
}

```
对应容器组件提供了一个静态的fetch方法
```
class Home extends Component {
  ...
  static fetch(store){
        return store.dispatch(fetchBookList({page:1,size:20}))
  }

```

这是我们的 actions 

```
/**
 * 获取书籍目录
 * @param {*} param 
 */
export const fetchBookList = (params) => {
    return async (dispatch, getState) => {
        await axios.get(api.url.booklist, {
            params: params
        }).then((res) => {
            dispatch(booklist(res.data.result));
        }).catch((err) => {

        })
    }
}
```
首先我们通过 matchRoutes 拿到当前路由下所有的路由，再对其遍历得到有关一个异步方法的Promise数组，这里我们所谓的异步方法就是actions中的异步方法。由于我们在服务端也初始化的store所以我们可以直接在服务端调用actions，这里我们需要给容器组件的static方法传入store ,这样我们就可以通过`store.dispatch(fetchBookList({page:1,size:20}))`调用actions了。上面的方法我们得到了一个Promise 数组。我们使用 Promise.all将异步全部执行。这个时候实际上 store的运行跟客户端是一样的。 我们在异步的过程中 将初始数据全部写入了 store中。所以我们通过`store.getState()`就可以拿到初始化数据了。客户端的初始化跟Redux官方例子是一样的。直接判断是否传入初始化state，如果传入就做为初始化数据。我们服务端的初始化异步和客户端的初始化异步 如何避免重复。 这里我们直接先获取store中的对应初始数据 ，看是否存在，如果不存在我们再进行加载。

#### 关于异步的优化方案思考
我们知道服务端渲染的
优势在于可以极快的首屏优化 ，支持SEO，与传统的SPA相比多了一种数据的处理方式。 
缺点也非常明显，服务端渲染相当于是把客户端的处理流程部分移植到了服务端，这样就增加了服务端的负载。因此要做一个好的SSR方案，缓存是必不可少的。






 
 





