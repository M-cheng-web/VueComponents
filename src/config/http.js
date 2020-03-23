const config = {
  devServer: 'api.zcccoin.com:81',
  proServer: 'api.zcccoin.com:81',
  timeout: '50000',
  headers: {
    'Content-Type': 'application/json'
  }
}

export default {
  // process.env.NODE_ENV  内的 NODE_ENV是 vue-cli 帮我们创建的,用于辨认是开发模式还是生产模式
  url: `http://${process.env.NODE_ENV === 'development' ? config.devServer : config.proServer}`,
  timeout: config.timeout,
  headers: config.headers
}
