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

/**
 * 渲染服务端路由
 */
module.exports.render = async(ctx,next) =>{
    console.log(' render --- func ---:' + ctx.req.url)
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




