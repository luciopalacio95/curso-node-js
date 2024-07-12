const http = require('node:http') // protocolo HTTP
const { findAvailablePort } = require('./10.free-port.js')

const desiredPort = process.env.PORT ?? 3000

// console.log(process.env)

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('hola mundo')
})

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})

// usando el 0, asigna el primer puerto libre que encuentra
/* server.listen(0, () => {
  console.log(`listening on port  http://localhost:${server.address().port}`)
})
*/
