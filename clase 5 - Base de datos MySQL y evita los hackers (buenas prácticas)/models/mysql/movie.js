import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      // get genre ids from database table using genre names
      const [genres] = await connection.query(
        'SELECT id, name FROM genres WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
        // los interroganste (?) lo remplaza con el elementos del array, el 1ero con el 1er elemento, el 2do con el 2do y asi..
      )

      // no genre found
      if (genres.length === 0) return []

      // get the id from the first genre result
      const [{ id }] = genres

      // get all movies ids from database table
      // la query a movie_genres
      // join

      const [movies] = await connection.query(
        `SELECT movies.title, movies.year, movies.director, movies.duration, movies.poster, movies.rate, HEX(movies.id) AS id, genres.name as genre
        FROM movie_genres 
        JOIN movies ON movies.id = movie_genres.movie_id
        JOIN genres ON genres.id = movie_genres.genre_id
        WHERE genre_id = ?;`,
        [id]
      )
      // y devolver resultados..
      return movies
    }
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, HEX(id) AS id 
      FROM movies`
    )

    return (movies)
  }

  static async getById ({ id }) {
    const [movie] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, HEX(id) AS id 
        FROM movies WHERE HEX(ID) = ?;`, [id]
    )

    // no movie found
    if (movie.length === 0) return null

    return (movie[0])
  }

  static async create ({ input }) {
    const {
      genre: genreInput, // genre is an array
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    // crypto.randomUUID()
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult
    try {
      await connection.query(
        `INSERT INTO movies (id, title, year, director, duration, poster, rate)
          VALUES (UNHEX(REPLACE("${uuid}", '-', '')), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      )
    } catch (e) {
      // puede enviarle información sensible
      throw new Error('Error creating movie')
      // enviar la traza a un servicio interno
      // sendLog(e)
    }

    genreInput.map(async (genre) => {
      const lowerCaseGenre = genre.toLowerCase()
      // get genre ids from database table using genre names
      const [genreId] = await connection.query(
        'SELECT id FROM genres WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )
      try {
        await connection.query(
          `INSERT INTO movie_genres (movie_id, genre_id)
            VALUES (UNHEX(REPLACE("${uuid}", '-', '')), ?);`,
          [genreId[0].id]
        )
      } catch (e) {
        // puede enviarle información sensible
        throw new Error('Error creating movie_genre')
        // enviar la traza a un servicio interno
        // sendLog(e)
      }
    })

    const [movie] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, HEX(id) id
          FROM movies WHERE id = UNHEX(REPLACE(?, '-', ''));`,
        [uuid]
    )
    return movie[0]
  }

  static async delete ({ id }) {
    const lowerCaseId = id.toLowerCase()
    // ejercio fácil: crear el delete
    try {
      await connection.query(
        'DELETE FROM movies WHERE HEX(LOWER(id))=?;', [lowerCaseId]
      )
      await connection.query(
        'DELETE FROM movie_genres WHERE HEX(LOWER(movie_id))=?;', [lowerCaseId]
      )
    } catch (e) {
      throw new Error('Error deleting movie')
    }
    return true
  }

  static async update ({ id, input }) {
    // ejercicio fácil: crear el update
    const {
      year
    } = input

    const lowerCaseId = id.toLowerCase()
    try {
      await connection.query(
          `UPDATE movies SET year = ?
            WHERE HEX(LOWER(id))=?;`,
          [year, lowerCaseId]
      )
    } catch (e) {
      // puede enviarle información sensible
      throw new Error('Error updating movie')
      // enviar la traza a un servicio interno
      // sendLog(e)
    }
    return true
  }
}
