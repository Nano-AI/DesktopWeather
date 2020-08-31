const { app, BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('./index.html')
    win.setFullScreen(true);
}

app.whenReady().then(createWindow)
