"use strict"

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const util = require('../tool/util.js');
const ExtractTextPlugin = new require('extract-text-webpack-plugin');
const CommonConfig = require('./webpack.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const snowConfig = require(`${util.SNOW_PATH}`);
const OUTPUT_DIR = `${util.USER_DIR}/${snowConfig.outputName}`;

// css happypack
CommonConfig.module.rules.push({
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    loaders: {
      js: 'happypack/loader?id=js' // 将loader换成happypack
    }
  }
});
/**
 * [add hot]
 * @param  {[type]} snowConfig.hot [description]
 * @return {[type]}                 [description]
 */
if(snowConfig.hot){
    let polyfill = 'eventsource-polyfill';
    let devClient = `${util.PROJECT_DIR}/bin/build/dev-client`;
    Object.keys(CommonConfig.entry).forEach(function (name, i) {
        let extras = i === 0 ? [polyfill, devClient] : [devClient]
        CommonConfig.entry[name] = extras.concat(CommonConfig.entry[name])
    });
}
/**
 * [config Merge]
 */
module.exports = Merge(CommonConfig, {
  // devtool: '#cheap-module-eval-source-map',
  cache: true,
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new ExtractTextPlugin("../[name].[contenthash].css"),
  ],
  devServer: {
    port: 3008,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: '/'
  }
})