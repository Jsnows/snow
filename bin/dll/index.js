"use strict"

const fs = require('fs')
const util = require('../tool/util')
const webpack = require('webpack')
const chalk = require('chalk')
let loader = require('../tool/loader')
let dllConfig = require('./dll.config.js')


function main(){
    if(dllConfig.entry.vendor.length == 0){
        console.log(chalk.yellow('没有配置需要公共打包的文件(可在snow.config.js里配置)'));
        return
    }
    loader.start()
    rm('-rf', `${util.USER_DIR}/dll`)
    try{
        fs.mkdirSync(`${util.USER_DIR}/dll`)
    }catch(e){}
    webpack(dllConfig).run((err, stats) => {
        loader.end('*')
        if(err) {
            console.log('webpack:build', err)
        }
        console.log(chalk.yellow('打包详情'), stats.toString({
            chunks: false,
            colors: true
        }))
        console.log(chalk.yellow('公共文件打包完成'))
        process.exit(0)
    })

}

module.exports = main