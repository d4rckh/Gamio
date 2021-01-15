const { app, BrowserWindow, ipcMain } = require('electron')
const { handleIpc } = require("./IpcHandler")

let tray = null;

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    frame: false,
  })

  win.loadFile('app/app.html')
}

app.whenReady().then(() => {
  handleIpc(ipcMain);
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
