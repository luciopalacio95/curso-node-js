// Esto sólo en los módulos nativos
// que no tienen promesas nativas, podemos convertir callbacks en promesas 

// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)

/*fs.readFilePromise('./archivo.txt', 'utf8')
    then(text => {
        console.log("primer texto:", text);
    });
*/

const fs = require('node:fs/promises') // a partir de NODE 16, se recomienda poner node: antes del modulo

console.log('Leyendo el primer archivo...')
fs.readFile('./archivo.txt', 'utf8')
    .then(text => {
        console.log("primer texto:", text);
    }
);

console.log('--> Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')
fs.readFile('./archivo2.txt', 'utf8')
    .then(text => { 
        console.log("segundo texto:", text);
    }
);