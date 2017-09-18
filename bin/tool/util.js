'use strict'

const shelljs = require('shelljs/global');
const fs = require('fs')
const path = require('path')

/**
 * 默认打好包的zip文件名
 */
exports.HTML_ZIP = 'html.zip'
/**
 * 默认打好包的DEK文件名
 */
exports.HTML_DEK = 'html.dek'

/**
 * 获取用户所在目录
 */
exports.USER_DIR = pwd().stdout
/**
 * 获取项目根目录
 */
exports.PROJECT_DIR = path.resolve(__dirname, '../../')
/**
 * 组件目录
 */
exports.COMPONENTS_DIR = path.resolve(__dirname, '../../src/components-template')
exports.ROOT_COMPONENTS_DIR = path.resolve(__dirname, '../../src/root-components-template')
/**
 * 模板目录
 */
exports.TEMPLATES_DIR = path.resolve(__dirname, '../../src/templates')
/**
 * snow 配置文件路径
 */
exports.SNOW_PATH = `${this.USER_DIR}/snow.config.js`
/**
 * 判断命令是否在项目目录执行
 * @return {[type]} [description]
 */
exports.isRoot = () => {
	return fs.existsSync(this.SNOW_PATH)
}
/**
 * 判断文件夹是否为空
 */
exports.isEmptyDir = (dirname) => {
	let dirs = fs.readdirSync(dirname)
	let i = dirs.indexOf('.git')
	dirs.splice(i, 1)
    return !dirs.length
}
/**
 * 首字母大写
 */
exports.initial = (str) => {
	return str.replace(/(\w)/, (v) => {
		return v.toUpperCase()
	})
}
/**
 * copy 文件
 */
exports.copy = (src, to) => {
    let str = fs.readFileSync(src).toString()
    fs.writeFileSync(to, str, 'utf8')
}