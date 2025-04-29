const { app, BrowserWindow, nativeTheme } = require('electron')
const path = require('path');

const createWindow = () => {
    nativeTheme.themeSource = 'dark'
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'src', 'preload.js'), // opcional se quiser usar preload
            nodeIntegration: true, // Permite usar require no renderer.js
            contextIsolation: false // Permite acessar Node.js no renderer.js
          }
  }) 

  win.loadFile('./src/views/index.html')
}

app.whenReady().then(() => {
  createWindow()
  // Quando a janela for fechada ele encerra a aplicação no Mac
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quando a janela for fechada ele encerra a aplicação no windows e linux
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })