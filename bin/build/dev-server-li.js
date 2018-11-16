"use strict"

const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require("webpack-dev-middleware");
const util = require('../tool/util.js');
const snowConfig = require(`${util.SNOW_PATH}`);
const packJson = require(`${util.USER_DIR}/package.json`);
const opn = require('opn');
let config = require('./webpack.dev');
const { spawn } = require('child_process');
const electron = require('electron');
const path = require('path');
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
        port = snowConfig.serverPort;
    }
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
            str = str.replace('</body>', `${genScipt(['vendor.dll' ,regexp[2]])}</body>`);
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
            stats: defaultStatsOptions,
            watchOptions: {
            ignored: /node_modules/,
            poll: 1000,
            aggregeateTimeout:500
        }
    }));
    if(snowConfig.appType == 'electron'){
        let electronProcess = null;
        let manualRestart = false;
        function startElectron (){
            electronProcess = spawn(electron, ['--inspect=5858', path.join(util.USER_DIR, packJson.main)]);
            electronProcess.stdout.on('data', data => {
                console.log('data:')
                console.log(String(data))
            })
            electronProcess.stderr.on('data', data => {
                console.log('error:')
                console.log(String(data))
            })
            electronProcess.on('close', () => {
                if (!manualRestart) process.exit()
            })
        }
        let mainCompiler = webpack(require('./webpack.main.js'));
        let preventShake = null;
        let repeatCompiler = false;
        let compilerNum = 0;
        mainCompiler.watch({}, (err, stats) => {
            if (err) {
                console.log(err)
                console.log(stats)
                return
            }
            compilerNum++;
            if(compilerNum > 1){
                repeatCompiler = true;
                clearInterval(preventShake);
                preventShake = setTimeout(()=>{
                    repeatCompiler = false;
                },500)
            }
            if(repeatCompiler) return;
            console.log('change')
            if (electronProcess && electronProcess.kill) {
                console.log('kill')
                manualRestart = true;
                process.kill(electronProcess.pid)
                electronProcess = null
                startElectron()
                setTimeout(() => {
                    manualRestart = false
                }, 5000)
            }else{
                startElectron();
            }
        })
    }
    app.listen(port, function (err) {
        if (err) {
            console.log(err)
            return
        }
        if(snowConfig.defaultPage){
            opn(`http://127.0.0.1:${port}/app/${snowConfig.defaultPage}/${snowConfig.defaultPage}.html`);
        }
        console.log(`Listening at http://localhost:${port}`)
    })
}