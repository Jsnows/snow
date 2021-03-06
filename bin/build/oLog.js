'use strict'

const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const chalk = require('chalk');
const util = require('../tool/util.js');
const snowConfig = require(`${util.SNOW_PATH}`);
/**
 * [ProgressPlugin webpack 编译输出]
 * @type {[type]}
 */
function main(compiler,port) {
  compiler.apply(new ProgressPlugin(function (percentage, msg, current, active, modulepath) {
    if (process.stdout.isTTY && percentage < 1) {
      process.stdout.cursorTo(0)
      modulepath = modulepath ? ' …' + modulepath.substr(modulepath.length - 30) : ''
      current = current ? ' ' + current : ''
      active = active ? ' ' + active : ''
      process.stdout.write(chalk.green(`已编译${chalk.red((percentage * 100).toFixed(0) + '% ')}${msg}${current}${active}${modulepath} `))
      process.stdout.clearLine(1)
    } else if (percentage === 1) {
      process.stdout.write('\n')
      
    }
  }))
}

module.exports = main;