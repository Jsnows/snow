"use strict"

const util = require('../tool/util.js')
const path = require('path');
const chalk = require('chalk')

if(!util.isRoot()){
    console.log(chalk.yellow('请注意：当前目录无“snow.config.js” \n您可以`snow init`初始化项目，或在已创建的项目根目录执行该命令'))
    return false
}

const snowConfig = require(`${util.SNOW_PATH}`)

if(!snowConfig.buildPath || snowConfig.buildPath == '' || path.resolve(snowConfig.buildPath) == `${util.USER_DIR}`){
    snowConfig.buildPath = 'output' //在grain config的目录下
}
snowConfig.buildPath = path.resolve(snowConfig.buildPath);
console.log( chalk.green('Build输出路径是：'+ snowConfig.buildPath) );

module.exports = snowConfig;