require('dotenv').config()
const express = require('express')
const WebSocket = require('ws')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')))
app.use('/src', express.static(path.join(__dirname, 'src')))

// Crear el servidor de WebSocket
const wss = new WebSocket.Server({ noServer: true })

app.get('/config', (req, res) => {
  res.json({
    wsURL: process.env.RTSP_WS_URL,
    rtspURL: process.env.RTSP_STREAM_URL,
    username: 'admin',
    password: process.env.PASSWORD
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
