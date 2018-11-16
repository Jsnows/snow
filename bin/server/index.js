"use strict"
process.env.NODE_ENV = 'development';
function main(port){
	require('../build/dev-server-li.js')(port)
}
module.exports = main