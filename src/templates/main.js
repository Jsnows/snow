const {app,BrowserWindow} = require('electron');
function createWindw(){
    let port = require('./snow.config.js').serverPort;
    let window = new BrowserWindow({
        width:1000,
        height:1000
    })
    if(process.env.NODE_ENV == 'development'){
        window.loadURL(`http://localhost:${port}/app/index/index.html`);
    }else{
        window.loadURL(`file://${__dirname}/index.html`);
    }
    window.webContents.openDevTools();
    console.log(process.env.NODE_ENV)
}
app.on('ready',createWindw);
