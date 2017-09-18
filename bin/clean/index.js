"use strict"

const util = require('../tool/util.js');
const shelljs = require('shelljs/global');

const grainConfig = require('../config/grainConfig.js');


function main(all,zip){
	// rm('-rf', `${util.USER_DIR}/${grainConfig.outputName}`)
    rm('-rf', `${grainConfig.buildPath}`);
    if (all){
        console.log("clean all .....")
        rm('-rf', `${grainConfig.dekDir}/${util.HTML_ZIP}`)
        rm('-rf', `${grainConfig.dekDir}/${util.HTML_DEK}`)
        console.log("clean all done")
    }
    else if(zip){
        console.log("clean zip .....")
        rm('-rf', `${grainConfig.dekDir}/${util.HTML_ZIP}`)
        console.log("clean zip done")
    }
}

module.exports = main