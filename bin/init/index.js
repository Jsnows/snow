'use strict';

const fs = require('fs');
const util = require('../tool/util.js');
const chalk = require('chalk');
const createApp = require('../tool/createApp.js');
const createComponents = require('../tool/createComponents.js');
const {spawn} = require('child_process');
const inquirer = require('inquirer')
const configDir = [
    'snow.config.js',  //项目配置文件
    'package.json',     //包文件
    'vendorcommon.ts'   //
];
const disShowConfig = [
    'babelrc.js',         //babel配置文件
    'gitignore.js',       //git 忽略文件
    'eslintignore.js',    //eslint 忽略文件
    'eslintrc.js',        //eslint 配置文件
]

function main() {
	console.log(chalk.green('初始化项目结构'));
    // 写入显式配置文件
    configDir.map((dirName) => {
        // 文件同步读取转字符串
        let str = fs.readFileSync(`${util.PROJECT_DIR}/src/templates/config/${dirName}`).toString();
        // 文件同步写入utf-8格式
        fs.writeFileSync(`${util.USER_DIR}/${dirName}`, str, 'utf8');
    });
    // 写入隐式配置文件
    disShowConfig.map((dirName) => {
        // 文件同步读取转字符串
        let str = fs.readFileSync(`${util.PROJECT_DIR}/src/templates/config/${dirName}`).toString();
        // 文件同步写入utf-8格式
        dirName = `.${dirName.split('.')[0]}`;
        fs.writeFileSync(`${util.USER_DIR}/${dirName}`, str, 'utf8');
    })
    console.log(chalk.green('配置文件生成完成!'));
    // 创建 app 目录
    fs.mkdirSync(`${util.USER_DIR}/app`);
    // 创建 components 目录
    fs.mkdirSync(`${util.USER_DIR}/components`);
    // 创建静态资源 static 目录以及css/images目录
    fs.mkdirSync(`${util.USER_DIR}/static`);
    fs.mkdirSync(`${util.USER_DIR}/static/css`);
    fs.mkdirSync(`${util.USER_DIR}/static/images`);
    console.log(chalk.green('工程文件创建完成!'));
    let list = {
        type: 'list',
        name: 'tplType',
        message: '选择安装依赖方式',
        choices: ['手动安装（npm install）', '自动安装']
    }
    inquirer.prompt(list).then(function(ans){
        if(ans.tplType == list.choices[0]){
            console.log(chalk.green('初始化完成(请手动安装依赖包)!'));
        }else{
            // 开始安装依赖 
            console.log('开始安装依赖包');
            //等同于 npm install
            let ni = spawn('npm', ['install'], { stdio: 'inherit' });
            //监听关闭
            ni.on('close', (code) => {
                console.log(chalk.green('安装完成'));
            });
        }
    })
    
}

module.exports = main