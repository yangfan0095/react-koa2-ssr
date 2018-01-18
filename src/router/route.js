/**
 *  路由配置
 */
import Home from '../containers/home';
import {  About ,Topic,Topics } from '../containers/component';
const router = [
  {path:'/',component:Home,exact:true},
  {path:'/about',component:Home},
  {path:'/topics',component:Topics},
];

export default router;