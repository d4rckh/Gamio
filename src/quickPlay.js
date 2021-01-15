const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')
const { handleIpc } = require("./IpcHandler")
const { quickPlay } = require("./quickPlay.js")

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})



module.exports.quickPlay = () => {
    const win = new BrowserWindow({
        width: 500,
        height: 500,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        },
        frame: false,
      })
    
      win.loadFile('app/quickPlay.html')
}