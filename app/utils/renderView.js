import path from 'path';
import fs from 'fs';
import { remote } from 'electron';
import parser from './parser';

const { BrowserWindow, app } = remote;

let view = null;

view = new BrowserWindow({
  show: false,
  width: 1024,
  height: 728,
  webPreferences: {
    nodeIntegration: true
  }
});
view.webContents.on('did-finish-load', () => {
  if (!view) {
    throw new Error('"view" is not defined');
  }
  if (process.env.START_MINIMIZED) {
    view.minimize();
  }
});

view.on('closed', () => {
  view = null;
});
export default async function createViewFrame(mode, page) {
  if (mode === 'json') {
    const parsed = parser(JSON.parse(page).content);
    const html = `<html><head><title>Sharabiz Page View</title><meta http-equiv="Content-Security-Policy" content="script-src 'self';"></head><body>${parsed.toString()}</body></html>`;
    if (!fs.existsSync(path.join(app.getPath('appData'), 'sheditor'))) {
      fs.mkdirSync(path.join(app.getPath('appData'), 'sheditor'));
    }
    fs.writeFile(
      path.join(app.getPath('appData'), 'sheditor', 'view.html'),
      html,
      () => {
        if (!view) {
          view = new BrowserWindow({
            show: false,
            width: 1024,
            height: 728,
            webPreferences: {
              nodeIntegration: true
            }
          });
        }
        view.loadURL(
          path.join(app.getPath('appData'), 'sheditor', 'view.html')
        );
        view.show();
        view.focus();
      }
    );
  }
}
