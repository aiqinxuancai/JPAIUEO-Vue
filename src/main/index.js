import { app, BrowserWindow, Menu, Tray } from 'electron'
import { ipcMain } from 'electron'
import { MenuItem } from 'electron'
const os = require('os');
const storage = require('electron-json-storage');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let tray = null;
let mainWindow;
let fullDataWindow; //50音完整表的窗口
let isResizable = process.env.NODE_ENV === 'development' ? true : false;
let windowSize = process.env.NODE_ENV === 'development' ? { w: 1000, h: 500 } : { w: 150, h: 118 };
let isAlwaysOnTop = process.env.NODE_ENV === 'development' ? false : true;


global.isShowHiragana = true;
global.isShowKatakana = true;

const path = require('path');

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`


process.env.NODE_ENV === 'development'

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: windowSize.h,
    useContentSize: true,
    width: windowSize.w,
    frame: false,
    resizable: isResizable
  })

  if (isAlwaysOnTop) {
    mainWindow.setAlwaysOnTop(true);
    mainWindow.setSkipTaskbar(true);
  }

  mainWindow.loadURL(winURL);


  mainWindow.on('closed', () => {
    mainWindow = null
  })


  let trayIcon = path.join(__static, 'icons');//app是选取的目录
  tray = new Tray(path.join(trayIcon, 'icon.ico'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      click: function () {
        app.quit();
        app.quit();
      }
    }

  ])
  tray.setToolTip('JPAIUEO')
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


ipcMain.on('close', (event, arg) => {
  if (arg == "/fullDataWindow") {
    fullDataWindow.close(); //关闭对应的页面
  }
  else {
    mainWindow.close();
  }
});

ipcMain.on('more', (event) => {
  const menu = new Menu();
  menu.append(new MenuItem({
    label: '打开50音图', click: () => {
      OpenFullDataWindow();
    }
  }));
  menu.append(new MenuItem({ type: 'separator' }));
  menu.append(new MenuItem({
    label: '显示平假名', type: 'checkbox', checked: global.isShowHiragana, click: () => {
      global.isShowHiragana = !global.isShowHiragana;
      mainWindow.webContents.send('on-show-state-change', 'Update');
    }
  }));
  menu.append(new MenuItem({
    label: '显示片假名', type: 'checkbox', checked: global.isShowKatakana, click: () => {
      global.isShowKatakana = !global.isShowKatakana;
      mainWindow.webContents.send('on-show-state-change', 'Update');
    }
  }));

  menu.append(new MenuItem({ type: 'separator' }));
  menu.append(new MenuItem({
    label: '退出', click: () => {
      app.quit();
      app.quit();
    }
  }));
  const win = BrowserWindow.fromWebContents(event.sender);
  menu.popup(win);
});


function OpenFullDataWindow() {
  const modalPath = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080/#/fullDataWindow'
    : `file://${__dirname}/index.html#fullDataWindow`;
  fullDataWindow = new BrowserWindow({ width: 570, height: 700, webPreferences: { webSecurity: false }, frame: false });
  fullDataWindow.on('close', function () { fullDataWindow = null });
  fullDataWindow.loadURL(modalPath);
}


ipcMain.on('full-page', e => window.open(e));
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
