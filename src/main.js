const path = require('path');
const { app, BrowserWindow } = require('electron');

let win;

app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(`file://${path.join(__dirname, 'index.html')}`);
});

