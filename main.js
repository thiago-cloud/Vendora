const { app, BrowserWindow, nativeTheme } = require('electron')

const createWindow = () => {
    nativeTheme.themeSource = 'dark'
    const win = new BrowserWindow({
        width: 800,
        height: 600
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