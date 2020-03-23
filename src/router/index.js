import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,

  // * 未添加 mode: http://localhost:8080/#/login
  // * 添加 mode: http://localhost:8080/login
  mode: 'history',

  // * 不是所有流浪器都支持 history 模式，如果遇到不支持的时候，需要设置 fallback 为 true，它会自动帮我们转成哈希去处理
  // * 如果你设置成 false，在不支持的情况下，那么单应用就会变成多应用，你每次路由跳转都会去后端然后返回新的内容，所以一般都是设置成 ture 要它去自动处理就好了
  fallback: true,

  // * 控制滚动位置
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      // 有缓存位置则下次回到原来的位置
      return savedPosition
    } else {
      // 没有缓存位置则从0开始
      return { x: 0, y: 0 }
    }
  }
})

// 导航守卫
router.beforeEach((to, from, next) => {
  console.log('beforeEach: 马上就要进入' + to.path + '页面')
  next()
})

export default router
