const path = require('node:path')

// barra separadora de carpetas segun S.O.
console.log(path.sep)

// unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename('/tmp/midu-secret-files/password.txt')
console.log(base)

// nombre del fiche y podemos aclarar al final, que quitarle, en este caso, muestra sin el .txt
const filename = path.basename('/tmp/midu-secret-files/password.txt', '.txt')
console.log(filename)

const extension = path.extname('my.super.image.jpg')
console.log(extension)