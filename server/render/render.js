
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from '../../client/src/App';
import { layout } from './layout';
/**
 * 渲染服务端路由
 */
module.exports.render = async(ctx,next) =>{
    const context = {}
    const html = ReactDOMServer.renderToString(
        <StaticRouter
        location={ctx.url}
        context={{}}
        >
        <App/>
        </StaticRouter>
  )
  const body =  layout(html);
  console.log(body);
   ctx.body =body;
}



