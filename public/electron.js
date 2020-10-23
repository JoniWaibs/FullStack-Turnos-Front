const { app , BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

//El manejador de la memoria
let appWindow;

function initApp(){
    //Configuraciones de ventana
    appWindow = new BrowserWindow({
        width: 1200,
        height: 768,
        center: true,
        show:false,
        icon : "icon.png"
    })

    //cuando se inicia la app
    appWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, "../build/index.html")}`
    )

    //cuando el programa este listo  mostrarlo en la ventana
    appWindow.once('ready-to-show', ()=>{
        appWindow.show()
    })

}

//Cuando este todo listo se abra el programa
app.on('ready' , initApp)

app.on('window-all-closed', ()=> {
    if(process.platform !== 'darwin'){
        app.quit();
    }
})
app.on('activate', ()=>{
    if(appWindow === null){
        initApp()
    }
})