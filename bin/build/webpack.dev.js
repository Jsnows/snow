"use strict"

const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const util = require('../tool/util.js');
const CommonConfig = require('./webpack.base.js');
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
CommonConfig.output = {
  path: path.join(OUTPUT_DIR,'/static'),
  filename: `[name].js`,
  chunkFilename: `[name].chunk.js`,
  publicPath: '/',
  sourceMapFilename: '[name].map',
}
if(snowConfig.appType =='electron'){
  CommonConfig.target = 'electron-renderer'
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
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: '/'
  }
})