import PlayerControl from '/src/index.js'

// Obtener configuración desde el servidor
fetch('/config')
  .then(response => response.json())
  .then(config => {
    var options = {
      wsURL: config.wsURL,
      rtspURL: config.rtspURL,
      username: config.username,
      password: config.password
    }

    let player = new PlayerControl(options)
    player.on('Error', j => {
      if (j) console.log(j.errorCode)
    })

    player.init(
      document.querySelector('#canvas'),
      document.querySelector('#videoplayer')
    )

    player.connect()
  })
  .catch(err => console.error('Error al obtener configuración:', err))
