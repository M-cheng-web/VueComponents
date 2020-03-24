import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ------------------------------------------------------ 引入组件
import SvgIcon from './components/SvgIcon' // 阿里 svg图片展示

// ------------------------------------------------------ 引入资源
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/svg' // svg图

// ------------------------------------------------------ 引入模块
import apis from '@/api' // api

// ------------------------------------------------------ 全局挂载模块
Vue.prototype.$api = apis

// ------------------------------------------------------ 注册全局组件
Vue.component('svg-icon', SvgIcon)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
