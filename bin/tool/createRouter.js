"use strict"
const fs = require('fs')
const chalk = require('chalk')
const util = require('./util.js')

/**
 * [createApp 创建页面]
 * @param  {[type]} appName [页面名称]
 */
function createRouter(appName){
	// 检测是否存在同名页面
	if(fs.existsSync(`${util.USER_DIR}/routers/${appName}`)){
		console.log(chalk.red('已存在同名根组件，不能重复创建'))
		return false
	}
	// 创建文件 
	fs.mkdirSync(`${util.USER_DIR}/routers/${appName}`);
	// 读文件内容
	let str = fs.readFileSync(`${util.TEMPLATES_DIR}/app.vue`).toString();
	// 文件名
	let basestr = `${appName}.vue`;
	// 写入文件
	fs.writeFileSync(`${util.USER_DIR}/routers/${appName}/${basestr}`, str, 'utf8');

	console.log(chalk.green(`${appName}路由组件创建完成`))
}

module.exports = createRouter