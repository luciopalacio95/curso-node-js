const express = require('express')
const dittoJSON = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 1234

const app = express()
// para no mostrar que usa express
app.disable('x-powered-by')

// podemos especificar la url, por ejemplo todas
// la que empiecen con pokemon
// app.use('/pokemon/*',(req, res, next) =>{})
// tambien podemos especificar una accion en concreto
// ej. todas las que sean GET
// app.get((req, res, next) =>{})

app.use((req, res, next) => {
  console.log('mi primer middleware')
  // revisar si el usuario esta logueado, revisar cookies, modificar la info de body

  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()
  // solo llegan request que son POST y que tienen el header Content-Type: application/json

  let body = ''

  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // mutar la request y meter la información en el req.body
    req.body = data
    next()
  })
})

app.get('/', (req, res) => {
  // res.status(200).send('<h1>Welcome!</h1>')
  // res.json({ message: 'Welcome mundo' })
  res.send('<h1>Welcome a mi pagina!</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJSON)
})

app.post('/pokemon', (req, res) => {
// req.body deberíamos guardar en bbdd
  res.status(201).json(req.body)
})

// la ultima a la que va a llegar
// el use es como un "*", para todas las acciones pasa por el
app.use((req, res) => {
  res.status(404).send('<h1>Error 404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
