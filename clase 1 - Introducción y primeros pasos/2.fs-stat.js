const fs = require('node:fs') // a partir de NODE 16, se recomienda poner node: antes del modulo

const stats = fs.statSync('./archivo.txt')

console.log(
  stats.isFile(), // si es un fichero
  stats.isDirectory(), // si es un directorio
  stats.isSymbolicLink(), // si es un enlace simbólico
  stats.size // tamaño en bytes
)
