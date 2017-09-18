"use strict"

const gulp = require('gulp')
const plugins = require("gulp-load-plugins")()
const util = require('../tool/util.js')
const chalk = require('chalk')
const grainConfig = require('../config/grainConfig.js');

function main(){
	let timesup = Date.parse(new Date())

	gulp.src([`${grainConfig.buildPath}/**/*`])
        .pipe(plugins.zip(`${util.HTML_ZIP}`))
        .pipe(gulp.dest(`${grainConfig.dekDir}`))
    console.log(chalk.green('zip 压缩完成'))
}

module.exports = main