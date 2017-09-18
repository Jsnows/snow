"use strict"

const inquirer = require('inquirer')
const createApp = require('../tool/createApp.js')
const createComponents = require('../tool/createComponents.js')

function main(){
	let list = {
		type: 'list',
		name: 'tplType',
		message: '请选择要创建的模板类型',
		choices: ['应用(app)', '子组件(components)']
	}
	// 询问要创建组件还是页面
	inquirer.prompt(list).then(function (answers) {
		let msg
		let componentsName,
			tplType = answers.tplType
		
		msg = tplType === '应用(app)' ? '请输入应用名称' : '请输入组件名称'
		let questions = {
			type: 'input',
			name: 'componentsName',
			message: msg
		}
		// 输入要创建的页面或组件名
		inquirer.prompt(questions).then((answers) => {
			componentsName = answers.componentsName
			if(tplType === '应用(app)'){
				createApp(componentsName)
			}else if(tplType === '子组件(components)'){
				createComponents(componentsName)
			}

		})
		
	})

}

module.exports = main