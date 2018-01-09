import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from '../../client/src/App';
import { layout } from './layout';
import getCreateStore from './store';
import {ConnectedRouter,routerMiddleware} from 'react-router-redux';
/**
 * 渲染服务端路由
 */
module.exports.render = async(ctx,next) =>{
    console.log(' render --- func ---')
    const context = {}
    const { store ,history} = getCreateStore(ctx);
    const html = ReactDOMServer.renderToString(
         <Provider store={store}>
             	<ConnectedRouter history={history}>
                    <StaticRouter
                    location={ctx.url}
                    context={{}}
                    >
                    <App/>
                    </StaticRouter>
               </ConnectedRouter>
           </Provider>
  )
  const body =  layout(html);
  console.log(body);
   ctx.body =body;
}




