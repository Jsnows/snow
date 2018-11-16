"use strict"
const path = require('path');
const fs = require('fs')
const util = require('../tool/util')
const webpack = require('webpack')
const chalk = require('chalk')
const snowConfig = require(`${util.SNOW_PATH}`)
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
let loader = require('../tool/loader')
let prodConfig = require('../build/webpack.prod.js')
let compiler = webpack(prodConfig)
let mainConfig = require('../build/webpack.main.js');
const packager = require('electron-packager');
let mainCompiler = webpack(mainConfig);
let buildConfig = {};

if(!snowConfig.outputName || snowConfig.outputName == ''){
    snowConfig.outputName = 'output'
}

function electronPacker(){
	loader.start();
	rm('-rf', `${util.USER_DIR}/${snowConfig.outputName}`);
	try{
		fs.mkdirSync(`${util.USER_DIR}/${snowConfig.outputName}`);
	}catch(e){
        console.log(e);
    }
    // 输出打包进度
    console.log(chalk.yellow(
        `开始构建render`
    ));
    compiler.apply(new ProgressPlugin(function(percentage) { 
        console.log(chalk.green(
            `已构建${chalk.red(Math.floor(percentage*100) + '%')}`
        ));
    }));
    compiler.run((err, stats) => {
        loader.end('*');
        if(err) {
            console.log('webpack:build', err);
            return false;
        } else {
            console.log('[webpack:render success!]')
            // 向构建后的项目中添加必要的文件
            // 添加 cache.manifest 文件
            console.log(chalk.yellow(
                `开始构建main`
            ));
            mainCompiler.apply(new ProgressPlugin(function(percentage) {
                console.log(chalk.green(
                    `已构建${chalk.red(Math.floor(percentage*100) + '%')}`
                ));
            }));
            mainCompiler.run(function(err,stats){
                if(err){
                    console.log('webpack:buildMain', err);
                }else{
                    console.log('[webpack:main success!]')
                    buildConfig = snowConfig.electronPackConfig;
                    packager(buildConfig, (err, appPaths) => {
                        if (err) {
                            console.log(`${chalk.yellow('`electron-packager`')} says...\n`)
                            console.log(err + '\n')
                        } else {
                            console.log('success',appPaths)
                            process.exit(0)
                        }
                    })
                }
            })
        }
    })

}

function webPacker(){
	loader.start();
	rm('-rf', `${util.USER_DIR}/${snowConfig.outputName}`);
	try{
		fs.mkdirSync(`${util.USER_DIR}/${snowConfig.outputName}`);
	}catch(e){
        console.log(e);
    }
    // 输出打包进度
    compiler.apply(new ProgressPlugin(function(percentage, msg) {
        console.log(chalk.green(
            `已构建${chalk.red(Math.floor(percentage*100) + '%')} ${msg}`
        ));
    }));
    compiler.run((err, stats) => {
        loader.end('*');
        if(err) {
            console.log('webpack:build', err);
            return false;
        } else {
            console.log('[webpack:build]', stats.toString({
                chunks: false,
                colors: true
            }))
            // 向构建后的项目中添加必要的文件
            // 添加 cache.manifest 文件
            console.log(chalk.green('build end'))
            process.exit(0)
        }
    })

}
function pack(){
    if(snowConfig.appType == 'electron'){
        electronPacker();
    }else{
        webPacker();
    }
}
module.exports = pack