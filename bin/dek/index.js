"use strict"

const inquirer = require('inquirer')
const fs = require('fs')
const util = require('../tool/util.js')
const chalk = require('chalk')
const shelljs = require('shelljs/global')
const OS = require('os')
const grainConfig = require('../config/grainConfig.js');

if(!grainConfig.dekKey || grainConfig.dekKey == ''){
    grainConfig.dekKey = '@Dou$Mi&Jian$Zhi@H5!'
}
const DEK_KEY = grainConfig.dekKey;
console.log( chalk.green('DEK KEY:'+ DEK_KEY) );

function main(){
	fs.readdir(`${grainConfig.dekDir}`, (err, files) => {
		let zipFiles, list
		if(err){
			return console.error(err)
		}
		zipFiles = files.filter((file) => {
			return /\.zip$/.test(file)
		})
		if(!zipFiles.length){
			return console.log(chalk.red('没有可进行dek加密的zip包'))
		}

		if (zipFiles.length == 1){
			let zipName = zipFiles[0];
			dek(zipName)
		}
		else{
			list = {
				type: 'list',
				name: 'zipName',
				message: '请选择要进行dek加密的zip包',
				choices: zipFiles
			}
			inquirer.prompt(list).then((answers) => {
				let zipName = answers.zipName;
				dek(zipName);
			})
		}



	})
}

function dek(zipName){
	let desDekFilePath = `${grainConfig.dekDir}/${zipName.replace(/\.zip/, '')}.dek`;
	console.log(`正在删除旧文件:${desDekFilePath}`);
	rm('-rf', `${desDekFilePath}`);

    console.log("正在加密："+zipName);
	let dekName = OS.platform().toLowerCase() === 'linux'
							? 'dek_linux'
							: 'dek'
	let command = `${util.PROJECT_DIR}/bin/build/${dekName} -i ${grainConfig.dekDir}/${zipName} -k '${DEK_KEY}' -e`
	exec(command)
	fs.renameSync(`${grainConfig.dekDir}/${zipName}.dek`, `${desDekFilePath}`)
	console.log(chalk.green('加密完成'))
}

module.exports = main