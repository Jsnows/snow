"use strict"

const path = require('path');
const webpack = require('webpack');
const util = require('../tool/util.js');
const snowConfig = require(`${util.SNOW_PATH}`);
const OUTPUT_DIR = `${util.USER_DIR}/${snowConfig.outputName}`;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const os = require('os');
const HappyPack  = require('happypack');
const happThreadPool = HappyPack.ThreadPool({size: os.cpus().length}); // 采用多进程，进程数由CPU核数决定
const ExtractTextPlugin = new require('extract-text-webpack-plugin');
/**
 * 入口文件
 */
let entry = {};
snowConfig.app.map((v) => {
    entry[v] = path.join(util.USER_DIR, `/app/${v}/${v}.js`);
});
/**
 * [config alias]
 */
let alias = {
    app: `${util.USER_DIR}/app`,
    components: `${util.USER_DIR}/components`,
    snowTool: `${util.PROJECT_DIR}/src/util`,
    'vue$': `${util.USER_DIR}/node_modules/vue/dist/vue.esm.js`
};
for(let key of Object.keys(snowConfig.alias)){
    alias[key] = `${util.USER_DIR}/${snowConfig.alias[key]}`
}
/**
 * [config plugins]
 */
let plugins = [
  new webpack.DllReferencePlugin({
    context: util.USER_DIR,
    manifest: require(`${util.USER_DIR}/dll/vendor-manifest.json`),
  }),
  /* 抽取出所有通用的部分 */
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'bundle',      // 需要注意的是，chunk的name不能相同！！！
  //   filename: 'common/bundle.js',
  //   minChunks: Math.ceil(snowConfig.app.length / 2),
  // }),
  /* 插入Dll文件 */
  new AddAssetHtmlPlugin({ 
    filepath: require.resolve(`${util.USER_DIR}/dll/vendor.dll.js`), 
    includeSourcemap: false 
  }),
  /* 使用happypack */
  new HappyPack({
    id: 'js',
    loaders: ['babel-loader'],
    threadPool: happThreadPool
  })
];
/**
 * webpack打包分析
 */
if (snowConfig.analyzer) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8889,
      reportFilename: 'report.html',
      statsFilename: 'stats.json'
    })
  )
}
let node = {};
if(snowConfig.appType == 'electron'){
  node = {
    __dirname: process.env.NODE_ENV == 'development',
    __filename: process.env.NODE_ENV == 'development'
  }
}
/**
 * [config]
 */
module.exports = {
  entry,
  output: {
    path: path.join(OUTPUT_DIR),
    filename: `js/[name][hash].js`,
    chunkFilename: `js/[name].chunk.js`,
    publicPath: snowConfig.publicPath || '/',
    sourceMapFilename: '[name].map',
  },
  resolve: {
    alias,
    extensions: ['.vue', '.js', '.json'],
    modules: [`${util.PROJECT_DIR}/node_modules`, `${util.USER_DIR}/node_modules`]
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000
            }
          }
        ]
      },
      {  
        test: /\.css$/,                  
        // 将样式抽取出来为独立的文件
        loader: ExtractTextPlugin.extract({fallback:"style-loader", use:["css-loader","postcss-loader"]}),
        exclude: /node_modules/
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {  
        test: /\.scss$/,                  
        // 将样式抽取出来为独立的文件
        use:['style-loader','css-loader','autoprefixer-loader','sass-loader'], 
        exclude: /node_modules/
      },
      {
        test: /iview.src.*?js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(less|css)$/,
        use:[ 'style-loader','css-loader','less-loader'],
      },  
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.js$/,
        loader: ['happypack/loader?id=js'],
        include: [`${util.USER_DIR}/app`, `${util.USER_DIR}/clientApi`, `${util.USER_DIR}/components`, `${util.USER_DIR}/tool`]
      }
    ]
  },
  plugins,
  node
}