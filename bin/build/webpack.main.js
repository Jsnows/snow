const path = require('path')
const webpack = require('webpack')
const util = require('../tool/util.js')

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
        __dirname: true,
        __filename: true
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: path.join(util.USER_DIR, './output')
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
