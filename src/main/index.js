import { app, BrowserWindow, Menu, Tray } from 'electron'
import { ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let tray = null
let mainWindow


const path = require('path');

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    frame: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })


  let trayIcon = path.join(__dirname, 'icons');//app是选取的目录
  tray = new Tray(path.join(trayIcon, 'icon.ico'))
  const contextMenu = Menu.buildFromTemplate([
    // { label: 'Item1', type: 'radio' },
    // { label: 'Item2', type: 'radio' },
    // { label: 'Item3', type: 'radio', checked: true },
    // { label: 'Item4', type: 'radio' },
    {
      label: '退出',
      click: function () {
        app.quit();
        app.quit(); //因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
      }
    }

  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('min', e => mainWindow.minimize());
ipcMain.on('max', e => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
});
ipcMain.on('close', e => mainWindow.close());

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
