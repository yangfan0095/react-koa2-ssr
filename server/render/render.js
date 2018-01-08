
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from '../../client/src/App';
import { layout } from './layout';
import store from './store';
/**
 * 渲染服务端路由
 */
module.exports.render = async(ctx,next) =>{
    const context = {}
    const { store } = getCreateStore(ctx.req.url);
    const html = ReactDOMServer.renderToString(
         <Provider store={store}>
                <StaticRouter
                location={ctx.url}
                context={{}}
                >
                <App/>
                </StaticRouter>
           </Provider>
  )
  const body =  layout(html);
  console.log(body);
   ctx.body =body;
}




