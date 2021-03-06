const path = require('path')

module.exports = {
  productionSourceMap: false,
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       prependData: `
  //         @import "@/assets/styles/_variable.scss";
  //         @import "@/assets/styles/_mixins.scss";
  //       `
  //     }
  //   }
  // },
  devServer: {
    open: true
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude
      .add(path.resolve('src/assets/svg'))
      .end()

    config.module
      .rule('svg-sprite-loader') // 添加一条规则叫做svg-sprite-loader
      .test(/\.svg$/) // 文件匹配的正则
      .include // 允许处理的
      .add(path.resolve('src/assets/svg')) // 将svg目录添加为允许处理
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  }
}
