"use strict"

const path = require('path');
const webpack = require('webpack');
const util = require('../tool/util.js');
const snowConfig = require(`${util.SNOW_PATH}`);
const OUTPUT_DIR = `${util.USER_DIR}/dll`;

let plugins = [
    new webpack.DllPlugin({
      path: path.join(util.USER_DIR, 'dll', '[name]-manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
      context: util.USER_DIR, // 指定一个路径作为上下文环境，需要与DllReferencePlugin的context参数保持一致，建议统一设置为项目根目录
    })
];

// 压缩
if (snowConfig.dllzip !== false) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    })
  );
}

module.exports = {
  output: {
    path: OUTPUT_DIR,
    filename: '[name].dll.js',
    library: '[name]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  },
  entry: {
    /*
      指定需要打包的js模块
      或是css/less/图片/字体文件等资源，但注意要在module参数配置好相应的loader
    */
    vendor: snowConfig.dll,
  },
  plugins
};