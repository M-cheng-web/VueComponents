import Home from '../views/home'

// 路由懒加载 即在需要的时候进行加载，随用随载 注释内Name是打包后的名字
// const AssetAccount = () => import(/* webpackChunkName: 'assetAccount' */ '../views/asset/account')

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home/:id?',
    name: 'Home',
    component: Home,
    alias: '/b',
    meta: {
      req: true
    }
  }
]
