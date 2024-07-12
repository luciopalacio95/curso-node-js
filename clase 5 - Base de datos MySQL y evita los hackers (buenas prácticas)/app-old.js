import express, { json } from 'express'
import { randomUUID } from 'node:crypto'
import cors from 'cors'
import { validateMovie, validatePartialMovie } from './schemas/movies.js'
import { readJSON } from './utils.js'

// import movies from './movies.json' <== esto no es valido en ESmodules, no puede importarse .json así
// import movies from './movies.json' assert {type: 'json'} // <== esta sintasis era experimental, y se dejo de usar
// import movies from './movies.json' with {type: 'json'} // <== EN EL FUTURO: el import del json sera así

// como leer un json ESModules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'))

// como leer un json ESModules recomendado por ahora
const movies = readJSON('./movies.json')

const app = express()
app.use(json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'https://movies.com',
      'https://midu.dev'
    ]

    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))
app.disable('x-powered-by')

// métodos normales: GET/HEAD/POST
// métodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight (los metodos complejos tienen esto y piden options)
// OPTIONS

app.get('/', (req, res) => {
  // leer el query para de format
  /* const format = req.query.format
  if (format === 'xml') {
    res.send('<h1>XML</h1>')
  } else if (format === 'html') {
    res.send('<h1>HTML</h1>')
  } */
  res.json({ message: 'Hello world !' })
})

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'https://movies.com',
  'https://midu.dev'
]

// cada recurso se identifica con una URL
// Todos los recursos movies se identifican con /movies
app.get('/movies', (req, res) => {
  const origin = req.header('origin')
  // cuando la peticion es del mismo origin, el navegador nunca la envia en la cabecera
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-control-Allow-Origin', origin)
  }

  const { genre } = req.query
  if (genre) {
    const filterMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filterMovies)
  }
  res.json(movies)
})

// valor dinamico usamos :valor
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  // en base de datos
  const newMovie = {
    id: randomUUID(), // uuid v4 universal unique identifier
    ...result.data
  }
  // Esto no seria REST, porque estamos guardando
  // el estado de la aplicación en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie) // actualizar la cache del cliente
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie Not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }
  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
