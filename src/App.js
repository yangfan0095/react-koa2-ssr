/**
 * 返回一个基本的App
 */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from './containers/home';
import {  About ,Topic,Topics } from './containers/component';
import  {ConnectedRouter}  from 'react-router-redux';
import router from './router/route';
import './assets/main.less';
import imageSrc from './assets/img/icon.png';

const configRoute = (router)=>{
  return (
     <div>
      {
          router.map((route,index) =>(
            <Route key= { index + 'route-render'} path={ route.path } exact={route.exact?route.exact: false } component={route.component}  />
          ))
      }
    </div>
  )

} 
const BasicExample = () => (
    <div className="app-container">
      <img src={ imageSrc} />
      <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>
      <hr/>
      {
        configRoute(router)
      }
     </div>
    </div>
)
export default BasicExample;