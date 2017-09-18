"use strict"

const inquirer = require('inquirer')
const chalk = require('chalk')
const BottomBar = inquirer.ui.BottomBar

let loader = [
	'loader.',
	'loader..',
	'loader...',
	'loader....'
]
let i = 4
let timer = null
let ui = null

exports.start = () => {
	ui = new BottomBar({bottomBar: loader[i % 4]})
	timer = setInterval(() => {
		ui.updateBottomBar(loader[i++ % 4]);
	}, 100)
}

exports.end = (string) => {
	clearInterval(timer)
	ui.updateBottomBar(chalk.green(string || 'Init done!'));
}