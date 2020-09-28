const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('./index.html')
    win.setFullScreen(true);
    win.setMenu(null);
    // win.setTitle("Desktop Weahter");
}

app.whenReady().then(createWindow)
