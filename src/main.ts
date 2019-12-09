const { app, BrowserWindow } = require('electron')

let win

app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  process.env.NODE_ENV === 'development' && win.webContents.openDevTools()

  const htmlPath =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:1212/dist/index.html`
      : `${__dirname}/index.html`
  win.loadFile(htmlPath)
})

app.on('close', () => {
  win = null
})
