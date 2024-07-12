## creacion de base de datos
DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;

##usar 
USE moviesdb;

## crear la tabla movies
CREATE TABLE movies (
	id BINARY(16) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
	duration INT NOT NULL,
	poster TEXT,
	rate DECIMAL (2, 1) UNSIGNED NOT NULL
);

## crear la tabla genre
CREATE TABLE genres (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

## crear la tabla relacion movie y genre
CREATE TABLE movie_genres(
	movie_id BINARY(16) REFERENCES movies(id),
    genre_id INT REFERENCES genres(id)
);

## insertamos datos
INSERT INTO genres (name) VALUES
("Action"),
("Crime"),
("Drama"),
("Adventure"),
("Sci-Fi"),
("Romance"),
("Biography"),
("Fantasy");

INSERT INTO movies (id, title, year, director, duration, poster, rate) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), "Inception", 2010, "Christopher Nolan", 180, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8),
(UNHEX(REPLACE(UUID(), '-', '')), "Interstellar", 2014, "Christopher Nolan", 169, "https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg", 8.6),
(UNHEX(REPLACE(UUID(), '-', '')), "The Shawshank Redemption", 1994, "Frank Darabont", 142, "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp", 9.3);

INSERT INTO movie_genres (movie_id, genre_id) 
VALUES
	((SELECT id from movies WHERE title = 'Inception'), (SELECT id from genres WHERE name = 'Sci-Fi' )),
	((SELECT id from movies WHERE title = 'Inception'), (SELECT id from genres WHERE name = 'Action' )),
	((SELECT id from movies WHERE title = 'Interstellar'), (SELECT id from genres WHERE name = 'Fantasy' )),
	((SELECT id from movies WHERE title = 'The Shawshank Redemption'), (SELECT id from genres WHERE name = 'Drama' ));
    
SELECT title, year, director, duration, poster, rate, HEX(id) AS id FROM movies;