/**
 * 返回一个基本的App
 */
import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import Home from './containers/home';
import {  About ,Topic,Topics } from './containers/component';
import router from './router/route';

const configRoute = (router)=>{
  return (
    <div>
      {
          router.map((route) =>{
            <Route path={ route.path } exact={route.exact?route.exact: false } component={route.component}  ></Route>
          })
      }
    </div>
  )

}
const BasicExample = () => (
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
)
export default BasicExample;