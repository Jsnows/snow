#!/usr/bin/env node

"use strict"

const program = require('commander')
const pkg = require('../package.json')
const path = require('path')
const fs = require('fs')
const util = require('./tool/util.js')
const chalk = require('chalk')
const inquirer = require('inquirer')

/**
 * 描述
 */
program
	.version(pkg.version)
	.usage('[command]')
	.description('snow 开发者命令行工具')

/**
 * 初始化新项目
 */
program
	.command('init')
	.description('初始化项目')
	// .option('-n --value <a>') //cmd点后面的值得名字取决于 -- 后面的命名
	.action(function(env,opt){
		if(util.isEmptyDir(util.USER_DIR)){
			let list = {
				type: 'list',
				name: 'tplType',
				message: '当前目录不为空，是否还要继续初始化操作',
				choices: ['是', '否']
			}
			inquirer.prompt(list).then((answers) => {
				if(answers.tplType === '是'){
					require('./init')();
				}else if(answers.tplType === '否'){
					console.log(chalk.green('结束初始化操作'))
				}
			})
		}else{
			require('./init')();
		}
	});
/**
 * 创建组件
 */
program
	.command('create')
	.description('创建应用(app) 或 子组件(components)')
	.action(function(env){
		if(!util.isRoot()){
			console.log(chalk.red('请在项目根目录执行该命令'))
			return false
		}
		require('./create')()
		
	});
/**
 * 启动server
 */
program
	.command('server [env]')
	.description('启动开发server')
	.option('-p, --port <n>', '指定端口号', parseInt)
	.action(function(env, options){
		if(!util.isRoot()){
			console.log(chalk.red('请在项目根目录执行该命令'))
			return false
		}
		require('./server')(options.port)
	})

/**
 * 构建项目
 */
program
	.command('build')
	.description('构建项目')
	.action(function(env){
		if(!util.isRoot()){
			console.log(chalk.red('请在项目根目录执行该命令'))
			return false
		}
		// 用于提示输出路径
		require('./config/snowConfig')
		require('./ugly')()
		
	});
/**
 * zip压缩构建后的项目
 */
program
	.command('zip')
	.description('zip压缩构建后的项目')
	.action(function(env){
		if(!util.isRoot()){
			console.log(chalk.red('请在项目根目录执行该命令'))
			return false
		}
		require('./zip')()
		
	});

/**
 * 生成dll动态链接库
 */
program
	.command('dll')
	.description('生成dll动态链接库')
	.action(function(env){
		if(!util.isRoot()){
			console.log(chalk.red('请在项目根目录执行该命令'))
			return false
		}
		require('./dll')()
	});


/**
 * 其他命令处理
 */
program
	.command('*')
	.action(function(env){
		console.log('deploying "%s"', env);
		program.help();
	});

program.parse(process.argv);

/**
 * 当用户没有输入任何命令或选项的时候，自动提示帮助
 */
if (process.argv.slice(2).length == 0){
	program.help();
}
