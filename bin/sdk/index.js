"use strict"

const fs = require('fs')
const shelljs = require('shelljs/global')
const util = require('../tool/util')
const webpack = require('webpack')
const chalk = require('chalk')
let sdkConfig = require('../build/SDK/webpack.sdk.conf.js')
let compiler = webpack(sdkConfig)

function main(){
	compiler.run((err, stats) => {
		if(err) {
			console.log('webpack:build', err)
		}
        console.log('[webpack:build]', stats.toString({
            chunks: false,
            colors: true
        }))

        console.log(chalk.green('build SDK end'))
        process.exit(0)

	})

}

module.exports = main