const http = require('node:http') // protocolo HTTP
const fs = require('node:fs')
const desiredPort = process.env.PORT ?? 1234

// https://http.cat/ podemos consultar que significa cada status

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.end('<h1>Bienvenido a mi página</h1>')
  } else if (req.url === '/imagen-super-bonita.png') {
    fs.readFile('./status-code.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 internal server error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200 // OK
    res.end('<h1>Contacto <a href="/">inicio</a></h1>')
  } else {
    res.statusCode = 404 // Not Found
    res.end('<h1>404</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
