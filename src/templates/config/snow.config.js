module.exports = {
	// 配置入口（应用入口）
	app: [
		'index'
	],
	// 默认启动server打开的页面，只能设置一个，不设置则不打开
	defaultPage:'',
	// dll
	dll: [
		'./node_modules/vue/dist/vue.esm.js',
		'./node_modules/es6-promise/dist/es6-promise.auto.js',
		'vuex',
	],
	// 别名
	alias: {
		
	},
	// webpack loaders
	loaders: [

	],
	// 输出目录的名称
	outputName: 'output',
	// 是否压缩
	zip: true,
	// 是否启用热更新
	hot: false,
	// webpack打包分析
	analyzer: false,
	// 本地server端口
	serverPort: 8000,
	// 打包资源的路径 '/'服务器路径 './'相对路径 （web应用使用/ electron使用./）
	publicPath: '/',
	// 需要打包的应用类型
	appType: 'web',
	// electron打包配置
	electronPackConfig: {
		arch: 'x64',
		asar: false,
		dir: `${__dirname}`,
		out: `${__dirname}/output`,
		//   icon: path.join(__dirname, '../build/icons/icon'),
		ignore: /(^\/(app|components|static|dll|node_modules|\.[a-z]+|README))|main\.js/,
		overwrite: true,
		platform: 'darwin'
	}
}