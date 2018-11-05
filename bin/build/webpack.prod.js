"use strict"

const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const util = require('../tool/util.js');
const CommonConfig = require('./webpack.base.js');
const ExtractTextPlugin = new require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const snowConfig = require(`${util.SNOW_PATH}`);
const OUTPUT_DIR = `${util.USER_DIR}/${snowConfig.outputName}`;

// 公共文件路径
// CommonConfig.output.publicPath = 'static/';
// 输出文件名
// CommonConfig.output.filename = 'js/[name].[hash].js';
// css happypack
CommonConfig.module.rules.push({
  test: /\.vue$/,
  use: {
    loader: 'vue-loader'
  }
});
// 是否压缩js文件 可在snowConfig里面配置
if (snowConfig.zip !== false) {
  CommonConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false,
        drop_console: true,
      },
      comments: false
    })
  );
}
/**
 * 配置打包html文件。每一个html对应一个HtmlWebpackPlugin否则将会只打包出一个Html文件
 */
let htmls = [];
snowConfig.app.map((v) => {
    htmls.push(new HtmlWebpackPlugin({
      // 文件名
      filename: path.join(OUTPUT_DIR, `/app/${v}/${v}.html`),
      // 模板文件名
      template: path.join(util.USER_DIR, `/app/${v}/${v}.html`),
      // 是否引入bundle文件
      chunks: ['bundle', v],
      // 
      // chunksSortMode: 'dependency',
      // html压缩配置
      minify: { removeComments: true, collapseWhitespace: true },
      inject: true
    }));
});
/**
 * [config Merge]
 */
module.exports = Merge(CommonConfig, {
  devtool: false,
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    // pro
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // new webpack.optimize.AggressiveMergingPlugin(),
    // 提取css
    new ExtractTextPlugin({
      filename:"css/[name].css",
      allChunks: true,
    }),
    new webpack.LoaderOptionsPlugin({
      test:/\.vue$/,
      options: {  
         vue: {
            loaders: {  
               css: ExtractTextPlugin.extract({  
               fallback:'vue-style-loader',   
               use: [{
                  loader: 'css-loader',
                  options: {
                    minimize: true
                  }
               }]
             })
           }
         }  
      }  
    }),
    ...htmls
  ]
})