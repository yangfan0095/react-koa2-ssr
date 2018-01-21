import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from '../../src/App';
import { layout } from './layout';
import getCreateStore from './store';
import {Provider} from 'react-redux';
import {ConnectedRouter,routerMiddleware} from 'react-router-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import router from '../../src/router/route';
import {matchPath} from 'react-router-dom';

/**
 * 匹配当前请求url是否跟客户端路由一致 不一致则执行next 进行静态资源处理等
 * @param {*} routesArray 
 * @param {*} url 
 */
const getMatch=(routesArray, url)=>{
  return routesArray.some(router=>matchPath(url,{
    path: router.path,
    exact: router.exact,
  }))
}


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
    let isMatch=getMatch(router,ctx.req.url);
     if(!isMatch){
        await next();
     }else{
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
  
}




