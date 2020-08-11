const path = require('path');
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //使用cdn
    externals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'axios': 'axios'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@i': path.resolve(__dirname, './src/assets'),
      }
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      // 下面是下载的插件的配置
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 1024,//对1k以上的进行压缩
        minRatio: 0.8,
        deleteOriginalAssets: false//是否删除原文件
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      })
    ],
  },
  productionSourceMap: false,


}
