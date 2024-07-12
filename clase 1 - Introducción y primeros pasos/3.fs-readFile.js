const fs = require('node:fs') // a partir de NODE 16, se recomienda poner node: antes del modulo

console.log('Leyendo el primer archivo...')
fs.readFile('./archivo.txt', 'utf8', (err, text) => { // <---- ejecutas este callback
  console.log('primer texto:', text)
})

console.log('--> Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')
fs.readFile('./archivo2.txt', 'utf8', (err, text) => {
  console.log('segundo texto:', text)
})
