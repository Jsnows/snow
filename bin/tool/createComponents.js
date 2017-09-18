"use strict"
const fs = require('fs')
const chalk = require('chalk')
const util = require('./util.js')
	

/**
 * [createComponents 创建普通组件]
 * @param  {[type]} componentsName [组件名称]
 */
function createComponents(componentsName){
	// 检测是否存在同名组件
	if(fs.existsSync(`${util.USER_DIR}/components/${componentsName}`)){
		console.log(chalk.red('已存在同名普通组件，不能重复创建'))
		return false
	}

	fs.mkdirSync(`${util.USER_DIR}/components/${componentsName}`)

	~['state', 'mutation-types', 'actions', 'getters', 'interface', 'vue'].map((v)=> {
		let str = fs.readFileSync(`${util.TEMPLATES_DIR}/com.${v}`).toString().replace(/com-name/g, componentsName);
		let sux = (v === 'vue') ? `.${v}` : `-${v}.js`;
		fs.writeFileSync(`${util.USER_DIR}/components/${componentsName}/${componentsName}${sux}`, str.replace(/comname/g, componentsName.replace(/-/g, '')), 'utf8');
	});
	console.log(chalk.green(`${componentsName}普通组件创建完成`))
}

module.exports = createComponents