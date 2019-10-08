'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //压缩css
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
//优化图
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
//按需打包

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  // 打包排除第3方库，提升首屏加载速度
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex':'Vuex',
    'axios': 'axios',
    'element-ui': 'ELEMENT',
    'qs' : 'qs'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        },
      },
      //css 插件优化
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules', 'postcss-loader'],
        }),
      },


      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract({
      //     fallback: 'vue-style-loader',
      //     use: ['css-loader']
      //   })
      // },
    ]
  },
  plugins: [
    //压缩js
    new webpack.optimize.UglifyJsPlugin({
      compress() {
        warnings: false
      }
    }),
    //提取公共js
    new CommonsChunkPlugin({
      name:"chunk",
      filename:"chunk.js"//忽略则以name为输出文件的名字，否则以此为输出文件名字
    }),
    // new ExtractTextPlugin("style.css")
    //打包模块图
    // new BundleAnalyzerPlugin({ analyzerPort: 8919 }),
    // new ExtractTextPlugin("styles.css"),
    //按需打包
    new LodashModuleReplacementPlugin,
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.optimize.UglifyJsPlugin
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
