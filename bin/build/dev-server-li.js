"use strict"

const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const webpack = require('webpack');
const portfinder = require('portfinder');
const webpackDevMiddleware = require("webpack-dev-middleware");
const util = require('../tool/util.js');
const snowConfig = require(`${util.SNOW_PATH}`);
const opn = require('opn');
let config = require('./webpack.dev');
let defaultStatsOptions = {
  colors: true,
  hash: false,
  timings: true,
  chunks: false,
  chunkModules: false,
  modules: false,
  children: true,
  version: true,
  cached: false,
  cachedAssets: false,
  reasons: false,
  source: false,
  errorDetails: false
};
/**
 * [genScipt 生成script]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function genScipt(arr) {
  let str = '';
  arr.forEach(function(v) {
    str+= `<script src="/${v}.js"></script>`;
  });
  return str;
}
// export
module.exports = function(port) {
  if(!port){
    portfinder.getPort(function (err, oPort) {
      port = oPort;
      let app = express();
      // morgan打印请求信息的模块
      app.use(morgan('dev'));
      // static
      app.use(express.static(`${util.USER_DIR}/dll`));
      // res html
      app.use(function(req, res, next) {
        let regexp = req.originalUrl.match(/\/app\/([a-z-]+)\/([a-z-]+)\.html/);
        //   regexp数据格式如下   
        //   [ '/app/cert-list/cert-list.html',
        //     'cert-list',
        //     'cert-list',
        //      index: 0,
        //      input: '/app/cert-list/cert-list.html?' ]
        if (regexp instanceof Array && regexp[1] === regexp[2] && snowConfig.app.indexOf(regexp[2]) !== -1) {
          let str = fs.readFileSync(`${util.USER_DIR}${regexp[0]}`).toString();
          str = str.replace('</body>', `${genScipt(['vendor.dll', 'bundle' ,regexp[2]])}</body>`);
          res.send(str);
        }
        next();
      });
      // compiler
      let compiler = webpack(config);
      // output
      require('./oLog.js')(compiler,port);
      // dev-middle
      app.use(webpackDevMiddleware(compiler, {
        publicPath: "/",
        // lazy: true,
        stats: defaultStatsOptions
      }));
      app.listen(port, function (err) {
        if (err) {
          console.log(err)
          return
        }
        if(snowConfig.defaultPage){
          opn(`http://localhost:${port}/app/${snowConfig.defaultPage}/${snowConfig.defaultPage}.html`);
        }
        console.log(`Listening at http://localhost:${port}`)
      })
    });
  }
  
}