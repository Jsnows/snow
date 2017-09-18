const path = require('path')
const webpack = require('webpack')
const util = require('../../tool/util.js')
const eslintFilePath = `${util.PROJECT_DIR}/bin/build/.eslintrc`

module.exports = {
    entry: {
        index: `${util.PROJECT_DIR}/bin/build/SDK/sdk-entry.js`
    },
    output: {
        path: `${util.USER_DIR}`,
        filename: 'kerkeesdk.min.js',
        library: 'kerkee',
        libraryTarget: 'umd'
    },
    resolve: {
        root: [`${util.PROJECT_DIR}/node_modules`],
        alias:{
            kerkee: `${util.PROJECT_DIR}/src/kerkee.js`,
            clientApi: `${util.PROJECT_DIR}/src/clientApi`
        },
        extensions: ['', '.js']
    },
    resolveLoader: {
        root: `${util.PROJECT_DIR}/node_modules`
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?presets=es2015',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    babel: {
        "presets": ["es2015"],
        "plugins": ["transform-runtime"]
    },
    eslint: {
        configFile: eslintFilePath,
        formatter: require('eslint-friendly-formatter')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}
