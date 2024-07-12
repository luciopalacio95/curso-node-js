import { createApp } from './app.js'

import { MovieModel } from './models/local-file-system/movie.js'
// import { MovieModel } from './models/mongodb/movie.js'
// import { MovieModel } from './models/mysql/movie.js'

createApp({ movieModel: MovieModel })
