const path = require('path')
const webpack = require('webpack')
const util = require('../tool/util.js')
const snowConfig = require(`${util.SNOW_PATH}`)
let mainConfig = {
    entry: {
        main: path.join(util.USER_DIR, './main.js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ]
    },
    node: {
        __dirname: process.env.NODE_ENV == 'development',
        __filename: process.env.NODE_ENV == 'development'
    },
    output: {
        filename: '[name].bundle.js',
        libraryTarget: 'commonjs2',
        path: path.join(util.USER_DIR, `./${snowConfig.outputName}`)
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        extensions: ['.js', '.json', '.node']
    },
    target: 'electron-main'
}

module.exports = mainConfig
