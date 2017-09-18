"use strict"
let path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	config = {},
	router = []
const util = require('../tool/util.js')
const grainConfig = require(`${util.GRAIN_PATH}`)

router = grainConfig.app

config.devPlugins = []
config.prodPlugins = []

for(let moduleName in router){

	config.prodPlugins.push(new HtmlWebpackPlugin({
		filename: `../${router[moduleName]}.html`,
                chunks: ['vendors', router[moduleName]],
                template: `${util.USER_DIR}/app/${router[moduleName]}/${router[moduleName]}.html`,
                // chunksSortMode: 'dependency',
                chunksSortMode: (a, b) => {
                    if(a.names[0] === 'vendors'){
                        return -1
                    }else{
                        return 1
                    }
                },
                inject: true,
                minify: {
                    removeComments: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
	}))
}

module.exports = config