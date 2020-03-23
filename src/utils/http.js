import axios from 'axios'
import httpConfig from '../config/http'

/* ----------------------------------- 创建实例 ------------------------------------ */
const instance = axios.create({
  baseURL: httpConfig.url + '/api',
  timeout: httpConfig.timeout,
  headers: httpConfig.headers
})

/* ----------------------------------- 请求拦截 ------------------------------------ */
instance.interceptors.request.use(
  config => {
    config.headers.Authorization = localStorage.token || ''
    return config
  },
  error => {
    return error
  }
)

/* ----------------------------------- 响应拦截 ------------------------------------ */

/* ----------------------------------- 导出实例 ------------------------------------ */
export default instance
