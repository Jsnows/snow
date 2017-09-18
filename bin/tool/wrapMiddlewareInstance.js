"use strict"
const devConfig = require('../build/webpack.dev.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const util = require('../tool/util.js')
let webpack = require('webpack')
let config = devConfig.config
let devCommonEntry = config.entry

/**
 * [createHtmlWebpackPlugin 创建并返回 HtmlWebpackPlugin]
 * @param  {[String]} appName 	[应用名称]
 * @return {[Object Instance]}  [HtmlWebpackPlugin 实例]
 */
function createHtmlWebpackPlugin(appName){
    return new HtmlWebpackPlugin({
        filename: `app/${appName}/${appName}.html`,
        chunks: ['vendors', appName],
        template: `${util.USER_DIR}/app/${appName}/${appName}.html`,
        // chunksSortMode: 'dependency',
        chunksSortMode: (a, b) => {
            if(a.names[0] === 'vendors'){
                return -1
            }else{
                return 1
            }
        },
        inject: true
    })
}
/**
 * [fullBuildMiddlewareInstance 全量构建]
 * @return [Object Instance]  	webpack-dev-middleware 实例
 */
exports.fullBuildMiddlewareInstance = function (){
    for (let i in devCommonEntry) {
        config.entry[i] = devCommonEntry[i];
    }
    let appEntryKeys = Object.keys(devConfig.allEntrys)
    config.plugins = devConfig.devCommonPlugins
    appEntryKeys.forEach((appName, i, a) => {
        config.entry[appName] = devConfig.allEntrys[appName]
        config.plugins.push(createHtmlWebpackPlugin(appName))
    })
    let compiler = webpack(config)
    let devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    })
    return devMiddleware
}

/**
 * 一个应用生成一个实例
 */
let middlewareContainer = {}; //{appName : middlewareInstance}
let currInstance;
exports.genWebpackMiddlewareInstance = function (appName) {
    let instance = middlewareContainer[appName];
    if (!devConfig.allEntrys[appName]) {
        instance = currInstance;
    }
    if (!instance) {
        config.entry = {};
        for (let i in devCommonEntry) {
            config.entry[i] = devCommonEntry[i];
        }
        config.entry[appName] = devConfig.allEntrys[appName];
        config.plugins = devConfig.devCommonPlugins.concat(createHtmlWebpackPlugin(appName));
        let compiler = webpack(config)
        instance = require('webpack-dev-middleware')(compiler, {
            publicPath: config.output.publicPath,
            stats: {
                colors: true,
                chunks: false
            }
        })
        middlewareContainer[appName] = instance;
    }
    currInstance = instance;
    return instance;
}

