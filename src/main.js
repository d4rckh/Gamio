const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')
const { handleIpc } = require("./IpcHandler")
const { quickPlay } = require("./quickPlay.js")

let tray = null;

function createWindow () {
  const win = new BrowserWindow({
    width: 1400,
    height: 1100,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    frame: false,
  })

  win.loadFile('app/app.html')
}

app.whenReady().then(() => {
  tray = new Tray('src/logo.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'normal' },
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)

  tray.on("click", () => {
    quickPlay()
  })

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
