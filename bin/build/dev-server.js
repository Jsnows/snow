"use strict"

const path = require('path');
const url = require('url');
let express = require('express');
let portfinder = require('portfinder')
const util = require('../tool/util.js')
const grainConfig = require(`${util.GRAIN_PATH}`)
const WMI = require('../tool/wrapMiddlewareInstance')
let hotMiddleware = null

function devServer(port){
    let app = express()

    // handle fallback for HTML5 history API
    app.use(require('connect-history-api-fallback')())

    if(grainConfig.lazy){
        app.use(function(req, res, next) {
            var reqUrl = url.parse(req.url);
            var pathName = reqUrl.pathname;
            var appName = path.basename(pathName).replace(/\..*$/, '');
            let wepackMiddlewarInstance = WMI.genWebpackMiddlewareInstance(appName);
            wepackMiddlewarInstance(req, res, next);
        });
    }else{
        app.use(WMI.fullBuildMiddlewareInstance())
    }
    
    // enable hot-reload and state-preserving
    // compilation error display
    if(grainConfig.hot){
        //app.use(hotMiddleware)
    }

    if(port){
        app.listen(port, function (err) {
            if (err) {
                console.log(err)
                return
            }
            console.log(`Listening at http://localhost:${port}`)
        })
    }else{
        portfinder.getPort(function (err, port) {
            app.listen(port, function (err) {
                if (err) {
                    console.log(err)
                    return
                }
                console.log(`Listening at http://localhost:${port}`)
            })
        });
    }
    
}
/**
 * 暂时废弃
 */
function hot() {
    if(grainConfig.hot){
        hotMiddleware = require('webpack-hot-middleware')(compiler)
        // force page reload when html-webpack-plugin template changes
        // console.log(compiler.plugin)
        compiler.plugin('compilation', function (compilation) {
            // isReload 优化多模块修改文件后的 多次reload
            // let isReload = true
            compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {

                // if(isReload){
                hotMiddleware.publish({ action: 'reload' })
                // isReload = false
                // }
                cb()

            })
        })
    }
}
module.exports = devServer


