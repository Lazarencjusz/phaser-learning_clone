import { app, BrowserWindow } from 'electron';
import path from 'path';
import { registerTitlebarIpc } from '@misc/window/titlebarIPC';
import { inDev } from '@common/helpers';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@common/consts';

// Electron Forge automatically creates these entry points
declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;

/**
 * Create Application Window
 * @returns {BrowserWindow} Application Window Instance
 */
export function createAppWindow(): BrowserWindow {
  // Create new window instance
  appWindow = new BrowserWindow({
    width: WINDOW_WIDTH + 5,
    height: WINDOW_HEIGHT + 28,
    backgroundColor: '#202020',
    // resizable: false,
    // show: false,
    // useContentSize TODO:
    autoHideMenuBar: true,
    // frame: false,
    // titleBarStyle: 'hidden',
    icon: path.resolve('assets/images/appIcon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: false,
    },
  });

  // appWindow.on('focus', () => {
  //   appWindow.blur();
  // });

  // Probably to download something from the web:
  // appWindow.webContents.session.webRequest.onBeforeSendHeaders(
  //   (details, callback) =>
  //     callback({ requestHeaders: { ...details.requestHeaders, Origin: '*' } }),
  // );

  appWindow.webContents.session.webRequest.onHeadersReceived(
    (details, callback) =>
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': '',
        },
      }),
  );

  // Load the index.html of the app window.
  appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);

  // Show window when its ready to
  appWindow.on('ready-to-show', () => appWindow.show());

  // Register Inter Process Communication for main process
  registerMainIPC();
  if (inDev) {
    appWindow.webContents.openDevTools({
      mode: 'detach',
    });
  }
  // Close all windows when main window is closed
  appWindow.on('close', () => {
    appWindow = null;
    app.quit();
  });

  return appWindow;
}

/**
 * Register Inter Process Communication
 */
function registerMainIPC() {
  /**
   * Here you can assign IPC related codes for the application window
   * to Communicate asynchronously from the main process to renderer processes.
   */
  registerTitlebarIpc(appWindow);
}
