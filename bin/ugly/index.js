"use strict"

const fs = require('fs')
const util = require('../tool/util')
const webpack = require('webpack')
const chalk = require('chalk')
const snowConfig = require(`${util.SNOW_PATH}`)
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
let loader = require('../tool/loader')
let prodConfig = require('../build/webpack.prod.js')
let compiler = webpack(prodConfig)

if(!snowConfig.outputName || snowConfig.outputName == ''){
    snowConfig.outputName = 'output'
}

function main(){
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

module.exports = main